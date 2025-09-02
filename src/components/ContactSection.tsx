import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your goals';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you for your interest! We will contact you within 24 hours to schedule your consultation.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      alert('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      label: "Phone",
      value: "(555) 123-4567"
    },
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      label: "Email",
      value: "info@wealthmaster.com"
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      label: "Office",
      value: "123 Financial District, Suite 500\nNew York, NY 10004"
    },
    {
      icon: <Clock className="w-5 h-5 text-primary" />,
      label: "Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium">Get Started Today</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to take control of your financial future? Schedule a consultation to discuss your goals and learn how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Consultation</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll contact you within 24 hours to schedule your complimentary consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-red-500" aria-label="required">*</span></Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        className={errors.firstName ? "border-red-500 focus:ring-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p id="firstName-error" className="text-red-500 text-sm" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500" aria-label="required">*</span></Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        className={errors.lastName ? "border-red-500 focus:ring-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p id="lastName-error" className="text-red-500 text-sm" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone <span className="text-red-500" aria-label="required">*</span></Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(555) 123-4567"
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
                    <Label htmlFor="message">Tell us about your goals <span className="text-red-500" aria-label="required">*</span></Label>
                    <Textarea 
                      id="message" 
                      placeholder="I'm interested in retirement planning and would like to discuss my investment strategy..."
                      className={`min-h-[120px] ${errors.message ? "border-red-500 focus:ring-red-500" : ""}`}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-sm" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Submitting consultation request..." : "Schedule consultation"}
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1568649704650-a6ab20e84311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBmaW5hbmNpYWx8ZW58MXx8fHwxNzU2NTI4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern office financial district" 
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-medium mb-2">Visit Our Office</h3>
                <p className="text-white/90">Located in the heart of the financial district</p>
              </div>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-gradient-to-br from-primary/10 to-accent/20 rounded-lg">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-medium mb-1">{info.label}</div>
                    <div className="text-muted-foreground whitespace-pre-line">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="font-medium mb-2">Complimentary Consultation</h4>
                <p className="text-primary-foreground/90 text-sm">
                  Your first consultation is always complimentary. We'll review your current situation and discuss how our goals-based approach can help you achieve financial success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}