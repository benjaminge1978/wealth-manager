import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    initialInvestment: "",
    monthlyContribution: "",
    timeHorizon: "",
    expectedReturn: "7",
    compoundFrequency: "12"
  });

  const [results, setResults] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
    breakdownByYear: Array<{year: number, balance: number, contributions: number, interest: number}>
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateInvestment = () => {
    const initial = parseFloat(inputs.initialInvestment) || 0;
    const monthly = parseFloat(inputs.monthlyContribution) || 0;
    const years = parseFloat(inputs.timeHorizon);
    const annualRate = parseFloat(inputs.expectedReturn) / 100;
    const compoundFreq = parseFloat(inputs.compoundFrequency);

    if (!years || years <= 0) return;

    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // Calculate future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + annualRate / compoundFreq, compoundFreq * years);

    // Calculate future value of monthly contributions (annuity)
    const futureValueContributions = monthly * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    const finalAmount = futureValueInitial + futureValueContributions;
    const totalContributions = initial + (monthly * totalMonths);
    const totalInterest = finalAmount - totalContributions;

    // Calculate year-by-year breakdown
    const breakdown = [];
    let balance = initial;
    let cumulativeContributions = initial;

    for (let year = 1; year <= years; year++) {
      const yearStartBalance = balance;
      const yearStartContributions = cumulativeContributions;
      
      // Add monthly contributions for the year with compound growth
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthly;
        cumulativeContributions += monthly;
      }

      const yearContributions = monthly * 12;
      const yearInterest = balance - yearStartBalance - yearContributions;

      breakdown.push({
        year,
        balance: balance,
        contributions: cumulativeContributions,
        interest: balance - cumulativeContributions
      });
    }

    setResults({
      finalAmount,
      totalContributions,
      totalInterest,
      breakdownByYear: breakdown
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
        <div className="space-y-2">
          <Label htmlFor="initialInvestment">Initial Investment</Label>
          <Input
            id="initialInvestment"
            type="number"
            placeholder="10000"
            value={inputs.initialInvestment}
            onChange={(e) => handleInputChange("initialInvestment", e.target.value)}
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
          <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
          <Input
            id="timeHorizon"
            type="number"
            placeholder="20"
            value={inputs.timeHorizon}
            onChange={(e) => handleInputChange("timeHorizon", e.target.value)}
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

        <Button onClick={calculateInvestment} className="w-full">
          Calculate Investment Growth
        </Button>
      </div>

      <div>
        {results && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Investment Projection</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Final Amount:</span>
                  <span className="font-semibold text-lg text-primary">{formatCurrency(results.finalAmount)}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Contributions:</span>
                    <span>{formatCurrency(results.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest Earned:</span>
                    <span className="text-green-600 font-semibold">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Return Multiple:</span>
                    <span>{(results.finalAmount / results.totalContributions).toFixed(2)}x</span>
                  </div>
                </div>

                {results.breakdownByYear.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">Growth Timeline</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {results.breakdownByYear.filter((_, index) => 
                          index === 0 || 
                          index === Math.floor(results.breakdownByYear.length / 2) - 1 || 
                          index === results.breakdownByYear.length - 1
                        ).map((item) => (
                          <div key={item.year} className="flex justify-between text-sm">
                            <span>Year {item.year}:</span>
                            <span>{formatCurrency(item.balance)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> This calculation assumes a consistent rate of return and regular contributions. 
                  Actual investment returns will vary and may result in different outcomes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}