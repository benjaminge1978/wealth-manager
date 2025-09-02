import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function LoanCalculator() {
  const [inputs, setInputs] = useState({
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    loanType: "personal"
  });

  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    paymentBreakdown: Array<{month: number, payment: number, principal: number, interest: number, balance: number}>
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateLoan = () => {
    const principal = parseFloat(inputs.loanAmount);
    const annualRate = parseFloat(inputs.interestRate) / 100;
    const years = parseFloat(inputs.loanTerm);

    if (!principal || !annualRate || !years) return;

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;

    // Calculate monthly payment using loan payment formula
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule (first 12 months for display)
    const paymentBreakdown = [];
    let remainingBalance = principal;

    for (let month = 1; month <= Math.min(12, numPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      paymentBreakdown.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getLoanTypeInfo = (type: string) => {
    switch (type) {
      case 'auto':
        return { name: 'Auto Loan', typicalRate: '4-8%' };
      case 'personal':
        return { name: 'Personal Loan', typicalRate: '6-16%' };
      case 'student':
        return { name: 'Student Loan', typicalRate: '3-7%' };
      case 'home-equity':
        return { name: 'Home Equity Loan', typicalRate: '5-9%' };
      default:
        return { name: 'Personal Loan', typicalRate: '6-16%' };
    }
  };

  const loanInfo = getLoanTypeInfo(inputs.loanType);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loanType">Loan Type</Label>
          <Select value={inputs.loanType} onValueChange={(value) => handleInputChange("loanType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Loan</SelectItem>
              <SelectItem value="auto">Auto Loan</SelectItem>
              <SelectItem value="student">Student Loan</SelectItem>
              <SelectItem value="home-equity">Home Equity Loan</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Typical rates: {loanInfo.typicalRate}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <Input
            id="loanAmount"
            type="number"
            placeholder="25000"
            value={inputs.loanAmount}
            onChange={(e) => handleInputChange("loanAmount", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="8.5"
              value={inputs.interestRate}
              onChange={(e) => handleInputChange("interestRate", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <Input
              id="loanTerm"
              type="number"
              step="0.5"
              placeholder="5"
              value={inputs.loanTerm}
              onChange={(e) => handleInputChange("loanTerm", e.target.value)}
            />
          </div>
        </div>

        <Button onClick={calculateLoan} className="w-full">
          Calculate Loan Payment
        </Button>
      </div>

      <div>
        {results && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4">{loanInfo.name} Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Monthly Payment:</span>
                  <span className="font-semibold text-lg text-primary">{formatCurrency(results.monthlyPayment)}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Amount Paid:</span>
                    <span>{formatCurrency(results.totalPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="text-red-600">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Interest Percentage:</span>
                    <span>{((results.totalInterest / parseFloat(inputs.loanAmount)) * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {results.paymentBreakdown.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-3">First Year Payment Breakdown</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {results.paymentBreakdown.map((payment) => (
                          <div key={payment.month} className="grid grid-cols-4 gap-2 text-xs">
                            <span className="font-medium">Month {payment.month}</span>
                            <span className="text-muted-foreground">{formatCurrency(payment.principal)}</span>
                            <span className="text-red-600">{formatCurrency(payment.interest)}</span>
                            <span className="text-muted-foreground">{formatCurrency(payment.balance)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground mt-2 pt-2 border-t">
                        <span>Month</span>
                        <span>Principal</span>
                        <span>Interest</span>
                        <span>Balance</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Actual loan terms may vary based on credit score, income, and lender requirements. 
                  This calculator provides estimates for planning purposes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}