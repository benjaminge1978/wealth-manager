import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Shield, Target, TrendingUp } from "lucide-react";
import heroImage from "../assets/wealth-management-happy-family.jpg";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Your Financial Goals,
                <span className="block text-primary">Our Expert Guidance</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                We help you achieve financial success through personalized, goals-based planning and regulated investment advice. Build the wealth you need for the life you want.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Learn Our Process
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Regulated Advice</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Goals-Based Planning</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Wealth Growth</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src={heroImage}
                alt="Couple looking at their financial future together" 
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-accent to-primary/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}