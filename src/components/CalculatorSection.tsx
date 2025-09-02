import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RetirementCalculator } from "./calculators/RetirementCalculator";
import { MortgageCalculator } from "./calculators/MortgageCalculator";
import { InvestmentCalculator } from "./calculators/InvestmentCalculator";
import { LoanCalculator } from "./calculators/LoanCalculator";
import { Calculator, Home, TrendingUp, CreditCard } from "lucide-react";

export function CalculatorSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <h2 className="mb-4">Financial Planning Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our interactive calculators to explore different financial scenarios and make informed decisions about your financial future.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="retirement" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="retirement" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Retirement</span>
              </TabsTrigger>
              <TabsTrigger value="mortgage" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Mortgage</span>
              </TabsTrigger>
              <TabsTrigger value="investment" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Investment</span>
              </TabsTrigger>
              <TabsTrigger value="loan" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Loan</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="retirement">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Planning Calculator</CardTitle>
                  <CardDescription>
                    Calculate how much you need to save for retirement and see if you're on track to meet your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RetirementCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mortgage">
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Payment Calculator</CardTitle>
                  <CardDescription>
                    Calculate your monthly mortgage payments and see how different loan terms affect your payments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MortgageCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investment">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Growth Calculator</CardTitle>
                  <CardDescription>
                    See how your investments could grow over time with compound interest and regular contributions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InvestmentCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loan">
              <Card>
                <CardHeader>
                  <CardTitle>Loan Payment Calculator</CardTitle>
                  <CardDescription>
                    Calculate monthly payments for personal loans, auto loans, and other financing options.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoanCalculator />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need personalized financial advice? Our calculators are just the starting point.
          </p>
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <span>✓ Professional Guidance</span>
            <span>✓ Customized Strategies</span>
            <span>✓ Ongoing Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}