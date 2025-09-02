import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Shield, Target, TrendingUp } from "lucide-react";
import { useHeroData } from "../hooks/useSanityData";
import { getImageUrl } from "../lib/sanity";
import heroImage from "../assets/wealth-management-happy-family.jpg";
import { HeroData } from "../types/sanity";

// Icon mapping for dynamic icons
const iconMap = {
  Shield,
  Target,
  TrendingUp,
} as const;

export function HeroSection() {
  const { data: heroData, loading, error } = useHeroData();
  
  // Log for debugging
  console.log('Hero component state:', { heroData, loading, error });

  // Fallback data when CMS data is not available
  const fallbackData: HeroData = {
    headline: "Find the right financial advisor for you",
    highlightedText: "right financial advisor",
    subheadline: "We help you achieve financial success through personalized, goals-based planning and regulated investment advice. Build the wealth you need for the life you want.",
    primaryButtonText: "Schedule Consultation",
    secondaryButtonText: "Learn Our Process",
    heroImage: null as any,
    features: [
      { icon: "Shield", text: "Regulated Advice" },
      { icon: "Target", text: "Goals-Based Planning" },
      { icon: "TrendingUp", text: "Wealth Growth" },
    ]
  };

  const displayData = heroData || fallbackData;

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-muted animate-pulse rounded-lg"></div>
                <div className="h-12 w-40 bg-muted animate-pulse rounded-lg"></div>
              </div>
            </div>
            <div className="h-[500px] bg-muted animate-pulse rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                {displayData.headline}
                {displayData.highlightedText && (
                  <>
                    {' '}
                    <span className="text-primary">{displayData.highlightedText}</span>
                  </>
                )}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                {displayData.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => displayData.primaryButtonLink && window.open(displayData.primaryButtonLink)}>
                {displayData.primaryButtonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              {displayData.secondaryButtonText && (
                <Button variant="outline" size="lg" onClick={() => displayData.secondaryButtonLink && window.open(displayData.secondaryButtonLink)}>
                  {displayData.secondaryButtonText}
                </Button>
              )}
            </div>

            {displayData.features && displayData.features.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                {displayData.features.map((feature, index) => {
                  const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback 
                src={displayData.heroImage ? getImageUrl(displayData.heroImage, 800, 500) : heroImage}
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