import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

export function MortgageCalculator() {
  const [inputs, setInputs] = useState({
    homePrice: "",
    downPayment: "",
    loanTerm: "30",
    interestRate: "6.5",
    propertyTax: "1.2",
    homeInsurance: "0.5",
    pmi: "0.5"
  });

  const [results, setResults] = useState<{
    monthlyPayment: number;
    principalAndInterest: number;
    propertyTax: number;
    insurance: number;
    pmi: number;
    totalInterest: number;
    loanAmount: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateMortgage = () => {
    const homePrice = parseFloat(inputs.homePrice);
    const downPayment = parseFloat(inputs.downPayment) || 0;
    const loanTerm = parseFloat(inputs.loanTerm);
    const annualRate = parseFloat(inputs.interestRate) / 100;
    const propertyTaxRate = parseFloat(inputs.propertyTax) / 100;
    const insuranceRate = parseFloat(inputs.homeInsurance) / 100;
    const pmiRate = parseFloat(inputs.pmi) / 100;

    if (!homePrice || !loanTerm || !annualRate) return;

    const loanAmount = homePrice - downPayment;
    const monthlyRate = annualRate / 12;
    const numPayments = loanTerm * 12;

    // Calculate principal and interest
    const monthlyPI = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate other monthly costs
    const monthlyPropertyTax = (homePrice * propertyTaxRate) / 12;
    const monthlyInsurance = (homePrice * insuranceRate) / 12;
    const monthlyPMI = downPayment < homePrice * 0.2 ? (loanAmount * pmiRate) / 12 : 0;

    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI;
    const totalInterest = (monthlyPI * numPayments) - loanAmount;

    setResults({
      monthlyPayment: totalMonthlyPayment,
      principalAndInterest: monthlyPI,
      propertyTax: monthlyPropertyTax,
      insurance: monthlyInsurance,
      pmi: monthlyPMI,
      totalInterest: totalInterest,
      loanAmount: loanAmount
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
          <Label htmlFor="homePrice">Home Price</Label>
          <Input
            id="homePrice"
            type="number"
            placeholder="400000"
            value={inputs.homePrice}
            onChange={(e) => handleInputChange("homePrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="downPayment">Down Payment</Label>
          <Input
            id="downPayment"
            type="number"
            placeholder="80000"
            value={inputs.downPayment}
            onChange={(e) => handleInputChange("downPayment", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              placeholder="30"
              value={inputs.loanTerm}
              onChange={(e) => handleInputChange("loanTerm", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="6.5"
              value={inputs.interestRate}
              onChange={(e) => handleInputChange("interestRate", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Additional Costs (% of home price annually)</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Property Tax (%)</Label>
              <Input
                id="propertyTax"
                type="number"
                step="0.1"
                placeholder="1.2"
                value={inputs.propertyTax}
                onChange={(e) => handleInputChange("propertyTax", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeInsurance">Home Insurance (%)</Label>
              <Input
                id="homeInsurance"
                type="number"
                step="0.1"
                placeholder="0.5"
                value={inputs.homeInsurance}
                onChange={(e) => handleInputChange("homeInsurance", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pmi">PMI (% of loan amount annually)</Label>
            <Input
              id="pmi"
              type="number"
              step="0.1"
              placeholder="0.5"
              value={inputs.pmi}
              onChange={(e) => handleInputChange("pmi", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Applied when down payment is less than 20%</p>
          </div>
        </div>

        <Button onClick={calculateMortgage} className="w-full">
          Calculate Mortgage Payment
        </Button>
      </div>

      <div>
        {results && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">Your Monthly Payment</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Monthly Payment:</span>
                  <span className="font-semibold text-lg text-primary">{formatCurrency(results.monthlyPayment)}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Principal & Interest:</span>
                    <span>{formatCurrency(results.principalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Property Tax:</span>
                    <span>{formatCurrency(results.propertyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Home Insurance:</span>
                    <span>{formatCurrency(results.insurance)}</span>
                  </div>
                  {results.pmi > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">PMI:</span>
                      <span>{formatCurrency(results.pmi)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span>{formatCurrency(results.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest Paid:</span>
                    <span>{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Down Payment Percentage:</span>
                    <span>{((parseFloat(inputs.downPayment) || 0) / parseFloat(inputs.homePrice) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This calculation includes principal, interest, taxes, insurance, and PMI. 
                  Your actual payment may vary based on specific loan terms and local rates.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}