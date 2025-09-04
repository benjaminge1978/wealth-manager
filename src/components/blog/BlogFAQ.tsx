import { useState } from 'react';
import { Card } from '../ui/card';
import { HandDrawnIcon } from '../ui/HandDrawnIcon';
import { BlogPost } from '../../types/blog';
import { getRelevantFAQs } from '../../data/blogFAQs';

interface BlogFAQProps {
  post: BlogPost;
  maxFAQs?: number;
}

export function BlogFAQ({ post, maxFAQs = 6 }: BlogFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = getRelevantFAQs(post, maxFAQs);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for AI engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t">
      {/* FAQ Schema Markup for AI Optimization */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-none">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-medium mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Common questions related to this topic, answered by our financial experts
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:border-primary/20 transition-colors overflow-hidden"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(index);
                  }
                }}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <HandDrawnIcon 
                      type="help-circle" 
                      size={20} 
                      color="#3b82f6" 
                      className="mt-1 flex-shrink-0" 
                    />
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <HandDrawnIcon 
                    type={openIndex === index ? "minus" : "plus"} 
                    size={20} 
                    color="#3b82f6" 
                    className="flex-shrink-0 transition-transform duration-200"
                  />
                </div>
              </div>
              {openIndex === index && (
                <div 
                  id={`faq-answer-${index}`}
                  className="animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed pl-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Need Personalized Advice?</h3>
            <p className="text-muted-foreground mb-4">
              Our qualified financial advisers can provide tailored guidance specific to your situation.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Get Professional Advice
              <HandDrawnIcon type="arrow-right" size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}