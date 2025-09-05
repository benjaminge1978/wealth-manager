import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Settings, Cookie, ShieldCheck } from 'lucide-react';
import {
  hasGivenConsent,
  shouldRenewConsent,
  saveConsentPreferences,
  DEFAULT_CONSENT_PREFERENCES,
  CookieConsentPreferences,
  COOKIE_CATEGORIES,
  CookieCategory
} from '../lib/cookieConsent';

interface CookieConsentBannerProps {
  onPreferencesOpen?: () => void;
}

export function CookieConsentBanner({ onPreferencesOpen }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(DEFAULT_CONSENT_PREFERENCES);

  useEffect(() => {
    // Show banner if no consent given or consent needs renewal
    if (!hasGivenConsent() || shouldRenewConsent()) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookieConsentPreferences = {
      'strictly-necessary': true,
      'analytics': true,
      'functional': true,
      'third-party': true,
    };
    
    saveConsentPreferences(fullConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    // Only strictly necessary cookies (cannot be rejected)
    saveConsentPreferences(DEFAULT_CONSENT_PREFERENCES);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences);
    setIsVisible(false);
  };

  const handlePreferenceChange = (category: CookieCategory, enabled: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: enabled
    }));
  };

  const handleCustomizeClick = () => {
    setShowDetails(true);
  };

  const handleCloseCustomize = () => {
    setShowDetails(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <Card className="w-full max-w-none rounded-t-xl rounded-b-none border-t border-x-0 border-b-0 shadow-2xl">
        <CardContent className="p-6">
          {!showDetails ? (
            // Main banner view
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      Your Privacy Matters
                      <Badge variant="outline" className="text-xs">
                        UK GDPR Compliant
                      </Badge>
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience, 
                      analyze website traffic, and provide personalized content. Some cookies are 
                      essential for our website to function properly, while others help us improve 
                      our services and understand how you use our site.
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">
                      <strong>Essential cookies</strong> are always enabled. 
                      You can choose to accept or reject optional cookies.
                    </p>
                    <p>
                      Read our{' '}
                      <a href="/cookies" className="text-primary hover:underline font-medium">
                        Cookie Policy
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </a>{' '}
                      for more information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons with equal prominence */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3 flex-1">
                  <Button 
                    onClick={handleAcceptAll}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Accept All Cookies
                  </Button>
                  
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1 border-2 hover:bg-muted"
                  >
                    Reject Optional Cookies
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleCustomizeClick}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Detailed preferences view
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cookie Preferences</h2>
                <Button
                  onClick={handleCloseCustomize}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Customize which cookies you'd like to accept. Essential cookies cannot be disabled 
                as they are necessary for the website to function properly.
              </p>

              <div className="space-y-4 max-h-60 overflow-y-auto">
                {Object.entries(COOKIE_CATEGORIES).map(([categoryKey, category]) => {
                  const key = categoryKey as CookieCategory;
                  const isEnabled = preferences[key];
                  const isRequired = category.required;

                  return (
                    <div key={key} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{category.title}</h3>
                            {isRequired && (
                              <Badge variant="default" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {category.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            <strong>Examples:</strong> {category.examples.join(', ')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              disabled={isRequired}
                              onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`
                              w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
                              ${isEnabled 
                                ? 'bg-primary' 
                                : 'bg-gray-300'
                              }
                              ${isRequired ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
                            `}>
                              <div className={`
                                w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out translate-y-0.5
                                ${isEnabled ? 'translate-x-5' : 'translate-x-0.5'}
                              `} />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button 
                  onClick={handleSavePreferences}
                  className="flex-1"
                >
                  Save My Preferences
                </Button>
                <Button 
                  onClick={handleAcceptAll}
                  variant="outline"
                  className="flex-1"
                >
                  Accept All
                </Button>
                <Button 
                  onClick={handleRejectAll}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Reject Optional
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                You can change these preferences at any time by clicking the "Cookie Settings" 
                link in our website footer or by visiting our{' '}
                <a href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
                </a>.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CookieConsentBanner;