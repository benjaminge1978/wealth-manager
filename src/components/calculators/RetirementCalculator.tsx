import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function RetirementCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: "",
    retirementAge: "",
    currentSavings: "",
    monthlyContribution: "",
    expectedReturn: "7",
    retirementGoal: ""
  });

  const [results, setResults] = useState<{
    projectedSavings: number;
    monthlyNeeded: number;
    shortfall: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateRetirement = () => {
    const currentAge = parseFloat(inputs.currentAge);
    const retirementAge = parseFloat(inputs.retirementAge);
    const currentSavings = parseFloat(inputs.currentSavings) || 0;
    const monthlyContribution = parseFloat(inputs.monthlyContribution) || 0;
    const annualReturn = parseFloat(inputs.expectedReturn) / 100;
    const retirementGoal = parseFloat(inputs.retirementGoal) || 0;

    if (!currentAge || !retirementAge || retirementAge <= currentAge) return;

    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = annualReturn / 12;

    // Future value of current savings
    const futureValueCurrent = currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);

    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);

    const totalProjected = futureValueCurrent + futureValueContributions;
    const shortfall = Math.max(0, retirementGoal - totalProjected);
    
    // Calculate monthly amount needed to reach goal
    const remainingNeeded = shortfall;
    const monthlyNeeded = remainingNeeded > 0 ? 
      (remainingNeeded * monthlyReturn) / (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) : 0;

    setResults({
      projectedSavings: totalProjected,
      monthlyNeeded: monthlyNeeded,
      shortfall: shortfall
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <Input
              id="currentAge"
              type="number"
              placeholder="35"
              value={inputs.currentAge}
              onChange={(e) => handleInputChange("currentAge", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <Input
              id="retirementAge"
              type="number"
              placeholder="65"
              value={inputs.retirementAge}
              onChange={(e) => handleInputChange("retirementAge", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentSavings">Current Retirement Savings</Label>
          <Input
            id="currentSavings"
            type="number"
            placeholder="50000"
            value={inputs.currentSavings}
            onChange={(e) => handleInputChange("currentSavings", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
          <Input
            id="monthlyContribution"
            type="number"
            placeholder="500"
            value={inputs.monthlyContribution}
            onChange={(e) => handleInputChange("monthlyContribution", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
          <Input
            id="expectedReturn"
            type="number"
            step="0.1"
            placeholder="7"
            value={inputs.expectedReturn}
            onChange={(e) => handleInputChange("expectedReturn", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retirementGoal">Retirement Goal (optional)</Label>
          <Input
            id="retirementGoal"
            type="number"
            placeholder="1000000"
            value={inputs.retirementGoal}
            onChange={(e) => handleInputChange("retirementGoal", e.target.value)}
          />
        </div>

        <Button onClick={calculateRetirement} className="w-full">
          Calculate Retirement Plan
        </Button>
      </div>

      <div>
        {results && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Your Retirement Projection</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projected Savings at Retirement:</span>
                  <span className="font-semibold text-lg">{formatCurrency(results.projectedSavings)}</span>
                </div>

                {inputs.retirementGoal && parseFloat(inputs.retirementGoal) > 0 && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Retirement Goal:</span>
                      <span>{formatCurrency(parseFloat(inputs.retirementGoal))}</span>
                    </div>
                    
                    {results.shortfall > 0 ? (
                      <>
                        <div className="flex justify-between items-center text-destructive">
                          <span>Shortfall:</span>
                          <span className="font-semibold">{formatCurrency(results.shortfall)}</span>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-2">To reach your goal, you would need to contribute an additional:</p>
                          <p className="font-semibold text-primary">{formatCurrency(results.monthlyNeeded)}/month</p>
                        </div>
                      </>
                    ) : (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-800 font-semibold">✓ You're on track to exceed your retirement goal!</p>
                        <p className="text-green-600 text-sm mt-1">
                          Surplus: {formatCurrency(results.projectedSavings - parseFloat(inputs.retirementGoal))}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on the information you provide. 
                  Actual results may vary. Consult with a financial advisor for personalized advice.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}