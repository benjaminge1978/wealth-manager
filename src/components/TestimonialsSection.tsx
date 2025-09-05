import { Card, CardContent } from "./ui/card";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { memo } from "react";

const TestimonialsSection = memo(function TestimonialsSection() {
  const testimonials = [
    {
      name: "Chris's Client",
      role: "First-Time Homebuyer",
      content: "Chris made the daunting mortgage process very straightforward and went above and beyond to secure the best deal. His industry knowledge proved invaluable and nothing was too much trouble.",
      rating: 5
    },
    {
      name: "Investment Client",
      role: "Savings Planner",
      content: "Chris was extremely informative and provided great advice on managing my savings. He helped me choose the best investment plan based on my comfort level and desired outcome.",
      rating: 5
    },
    {
      name: "ISA Client",
      role: "Young Professional",
      content: "Chris explained the Lifetime ISA perfectly, talked me through the process, and set everything up. He made sure I understood all the risks and next steps clearly.",
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
});

export { TestimonialsSection };