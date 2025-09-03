import { Card, CardContent } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Business Owner",
      content: "WealthMaster helped us plan for both business succession and personal retirement goals. Their goals-based approach made complex financial decisions much clearer.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Engineering Manager",
      content: "The personalized investment strategy has exceeded our expectations. We're now confident we'll meet our children's education goals and our retirement timeline.",
      rating: 5
    },
    {
      name: "Linda Rodriguez",
      role: "Medical Professional",
      content: "Their regulated advice gave us peace of mind during market volatility. The ongoing monitoring and adjustments have kept our portfolio on track.",
      rating: 5
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients who trusted us with their financial future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-8 space-y-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HandDrawnIcon key={i} type="star" size={20} className="fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="border-t pt-6">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}