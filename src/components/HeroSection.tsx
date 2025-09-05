import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { useHeroData } from "../hooks/useSanityData";
import { getImageUrl } from "../lib/sanity";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/wealth-management-happy-family.jpg";
import bottomLeftScribble from "../assets/bottom-left-scribble.svg";
import topRightScribble from "../assets/top-right-scribble.svg";
import { HeroData } from "../types/sanity";

// Icon mapping for dynamic icons
const iconMap = {
  Shield: 'shield' as const,
  Target: 'target' as const,
  TrendingUp: 'trending-up' as const,
};

export function HeroSection() {
  const { data: heroData, loading, error } = useHeroData();
  const navigate = useNavigate();

  // Fallback data when CMS data is not available
  const fallbackData: HeroData = {
    headline: "Build the wealth plan you need for the life that you want",
    highlightedText: "",
    subheadline: "We help you achieve financial success through personalized, goals-based planning and regulated investment advice.",
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
            <div className="space-y-8 lg:order-1 order-2">
              <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
              <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
              <div className="flex gap-4">
                <div className="h-12 w-40 bg-muted animate-pulse rounded-lg"></div>
                <div className="h-12 w-40 bg-muted animate-pulse rounded-lg"></div>
              </div>
            </div>
            <div className="h-[500px] bg-muted animate-pulse rounded-lg lg:order-2 order-1"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:order-1 order-2">
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
              <div className="flex items-center gap-2">
                <HandDrawnIcon type="check-circle" size={20} color="#3b82f6" className="text-blue-500" />
                <p className="text-black font-semibold text-lg">All consultations with our advisors are FREE and without obligation.</p>
              </div>
              <p className="text-lg text-muted-foreground max-w-lg">
                {displayData.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" onClick={() => navigate('/contact')}>
                {displayData.primaryButtonText}
                <span className="ml-2 text-lg transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              {displayData.secondaryButtonText && (
                <Button variant="outline" size="lg" onClick={() => navigate('/how-to-choose-financial-advisor')}>
                  {displayData.secondaryButtonText}
                </Button>
              )}
            </div>

            {displayData.features && displayData.features.length > 0 && (
              <div className="grid grid-cols-3 gap-6 pt-8 border-t">
                {displayData.features.map((feature, index) => {
                  const iconType = iconMap[feature.icon as keyof typeof iconMap] || 'shield';
                  return (
                    <div key={index} className="text-center">
                      <HandDrawnIcon type={iconType} size={32} className="text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative lg:order-2 order-1">
            <div className="relative z-10">
              <ImageWithFallback 
                src={displayData.heroImage ? getImageUrl(displayData.heroImage, 800, 600, 'auto') : heroImage}
                alt="Couple looking at their financial future together" 
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg shadow-2xl"
                priority={true}
                width={800}
                height={600}
              />
            </div>
            <div className="absolute -bottom-4 w-52 h-16" style={{ left: '-6.25rem' }}>
              <img 
                src={bottomLeftScribble} 
                alt="" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(89%) sepia(43%) saturate(463%) hue-rotate(320deg) brightness(101%) contrast(97%)',
                  opacity: 0.8,
                  transform: 'rotate(45deg)'
                }}
                role="presentation"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}