import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    advisorType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.advisorType) {
      newErrors.advisorType = 'Please select an advisor type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', advisorType: '', message: '' });
      setErrors({});
    } catch (error) {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const benefits = [
    "FREE consultations with certified advisors",
    "We call you within one hour guaranteed", 
    "Personalized wealth strategy in 30 minutes"
  ];

  const advisorTypes = [
    { value: "pensions", label: "Pensions Advisor" },
    { value: "financial", label: "Financial Advisor" },
    { value: "mortgage", label: "Mortgage Broker" },
    { value: "insurance", label: "Insurance Broker" }
  ];

  if (isSubmitted) {
    return (
      <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <HandDrawnIcon type="check-circle" size={80} color="#0065ff" className="mx-auto text-primary" />
              <h1 className="text-4xl lg:text-5xl font-medium leading-tight">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground">
                Thank you for contacting us. We'll be with you within the hour.
              </p>
              <p className="text-lg text-muted-foreground">
                One of our certified advisors will contact you at <span className="font-medium text-foreground">{formData.phone}</span> to discuss your financial goals.
              </p>
            </div>
            <div className="pt-8">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                Get Your <span className="text-primary">FREE</span> Financial Consultation
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Speak with a regulated advisor within one hour - no obligation required
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <HandDrawnIcon type="check-circle" size={24} color="#0065ff" className="text-primary flex-shrink-0" />
                  <p className="text-lg font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center gap-3">
                <HandDrawnIcon type="mail" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email us directly</p>
                  <a href="mailto:contact@netfin.co.uk" className="text-lg font-medium text-primary hover:underline">
                    contact@netfin.co.uk
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <HandDrawnIcon type="award" size={32} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-2">Trusted by 500+ Families</h3>
                  <p className="text-sm text-muted-foreground">
                    "Professional, knowledgeable, and always puts our needs first. Highly recommended!"
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">- Sarah M., London</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Your FREE Consultation</CardTitle>
                <p className="text-muted-foreground">
                  We'll contact you within one hour to schedule your complimentary consultation.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Best Phone Number <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="020 7123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={errors.phone ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="advisorType">Which advisor can help you most? <span className="text-red-500" aria-label="required">*</span></Label>
                    <Select 
                      value={formData.advisorType} 
                      onValueChange={(value) => handleInputChange('advisorType', value)}
                    >
                      <SelectTrigger 
                        className={errors.advisorType ? "border-red-500 focus:ring-red-500" : ""}
                        aria-invalid={!!errors.advisorType}
                        aria-describedby={errors.advisorType ? "advisorType-error" : undefined}
                      >
                        <SelectValue placeholder="Select an advisor type" />
                      </SelectTrigger>
                      <SelectContent>
                        {advisorTypes.map((advisor) => (
                          <SelectItem key={advisor.value} value={advisor.value}>
                            {advisor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.advisorType && (
                      <p id="advisorType-error" className="text-red-500 text-sm" role="alert">
                        {errors.advisorType}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your goals (optional)</Label>
                    <Textarea 
                      id="message" 
                      placeholder="I'm interested in retirement planning and would like to discuss my investment strategy..."
                      className="min-h-[100px]"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Scheduling consultation..." : "Get my free consultation"}
                  >
                    {isSubmitting ? "Scheduling..." : "Get My FREE Consultation"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    100% confidential • No obligation • Usually responds within 1 hour
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}