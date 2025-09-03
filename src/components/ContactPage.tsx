import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { HandDrawnIcon } from "./ui/HandDrawnIcon";
import { Link } from "react-router-dom";
import bottomLeftScribble from "../assets/bottom-left-scribble.svg";
import topRightScribble from "../assets/top-right-scribble.svg";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    advisorType: '',
    message: '',
    gdprConsent: false
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
    
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must agree to the processing of your personal data';
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
      setFormData({ name: '', phone: '', advisorType: '', message: '', gdprConsent: false });
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
          <div className="relative">
            <Card className="shadow-2xl relative z-10">
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
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="gdpr-consent-contact" 
                      checked={formData.gdprConsent}
                      onCheckedChange={(checked: boolean) => handleInputChange('gdprConsent', checked)}
                      className="mt-1"
                      aria-invalid={!!errors.gdprConsent}
                      aria-describedby={errors.gdprConsent ? "gdpr-consent-error" : undefined}
                    />
                    <div className="space-y-1">
                      <Label 
                        htmlFor="gdpr-consent-contact" 
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to the processing of my personal data in accordance with the{" "}
                        <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                          Privacy Policy
                        </Link>
                        <span className="text-red-500 ml-1" aria-label="required">*</span>
                      </Label>
                      {errors.gdprConsent && (
                        <p id="gdpr-consent-error" className="text-red-500 text-sm" role="alert">
                          {errors.gdprConsent}
                        </p>
                      )}
                    </div>
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
            {/* Bottom left scribble */}
            <div className="absolute -bottom-4 w-40 h-12" style={{ left: '-2rem' }}>
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
            {/* Top right scribble */}
            <div className="absolute -top-4 w-40 h-12" style={{ right: 'calc(-2rem - 30px)' }}>
              <img 
                src={topRightScribble} 
                alt="" 
                className="w-full h-full object-contain"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(76%) sepia(57%) saturate(1598%) hue-rotate(314deg) brightness(103%) contrast(102%)',
                  opacity: 0.7,
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