import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Cookie, Shield, BarChart3, Settings, Globe } from 'lucide-react';
import {
  getConsentPreferences,
  saveConsentPreferences,
  clearConsentData,
  DEFAULT_CONSENT_PREFERENCES,
  CookieConsentPreferences,
  COOKIE_CATEGORIES,
  CookieCategory,
  getConsentRecord
} from '../lib/cookieConsent';

interface CookiePreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons = {
  'strictly-necessary': Shield,
  'analytics': BarChart3,
  'functional': Settings,
  'third-party': Globe,
} as const;

export function CookiePreferences({ isOpen, onClose }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(DEFAULT_CONSENT_PREFERENCES);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load current preferences when dialog opens
      const currentPreferences = getConsentPreferences() || DEFAULT_CONSENT_PREFERENCES;
      setPreferences(currentPreferences);
      setHasChanges(false);
    }
  }, [isOpen]);

  const handlePreferenceChange = (category: CookieCategory, enabled: boolean) => {
    setPreferences(prev => {
      const updated = { ...prev, [category]: enabled };
      setHasChanges(true);
      return updated;
    });
  };

  const handleSave = () => {
    saveConsentPreferences(preferences);
    setHasChanges(false);
    onClose();
  };

  const handleAcceptAll = () => {
    const fullConsent: CookieConsentPreferences = {
      'strictly-necessary': true,
      'analytics': true,
      'functional': true,
      'third-party': true,
    };
    
    saveConsentPreferences(fullConsent);
    setHasChanges(false);
    onClose();
  };

  const handleRejectAll = () => {
    saveConsentPreferences(DEFAULT_CONSENT_PREFERENCES);
    setHasChanges(false);
    onClose();
  };

  const handleClearAllData = () => {
    clearConsentData();
    setShowConfirmClear(false);
    onClose();
    // Refresh the page to reset any loaded scripts
    window.location.reload();
  };

  const consentRecord = getConsentRecord();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Manage your cookie preferences and data privacy settings. Changes take effect immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!showConfirmClear ? (
            <>
              {/* Current consent info */}
              {consentRecord && (
                <Card>
                  <CardHeader className="pb-3">
                    <h3 className="font-medium text-sm">Current Settings</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Consent given: {new Date(consentRecord.timestamp).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                      <p>Policy version: {consentRecord.version}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cookie categories */}
              <div className="space-y-4">
                {Object.entries(COOKIE_CATEGORIES).map(([categoryKey, category]) => {
                  const key = categoryKey as CookieCategory;
                  const isEnabled = preferences[key];
                  const isRequired = category.required;
                  const Icon = categoryIcons[key];

                  return (
                    <Card key={key} className={`transition-colors ${isEnabled ? 'ring-1 ring-primary/20' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-4 w-4 text-primary" />
                              <h3 className="font-medium">{category.title}</h3>
                              {isRequired && (
                                <Badge variant="default" className="text-xs">
                                  Always Active
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">
                              {category.description}
                            </p>
                            
                            <div className="text-xs text-muted-foreground">
                              <p className="font-medium mb-1">Examples:</p>
                              <ul className="list-disc list-inside space-y-0.5">
                                {category.examples.map((example, index) => (
                                  <li key={index}>{example}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="ml-4 flex-shrink-0">
                            <label className="flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={isEnabled}
                                disabled={isRequired}
                                onChange={(e) => handlePreferenceChange(key, e.target.checked)}
                                className="sr-only"
                              />
                              <div className={`
                                relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out
                                ${isEnabled 
                                  ? 'bg-primary shadow-lg' 
                                  : 'bg-gray-300 hover:bg-gray-400'
                                }
                                ${isRequired 
                                  ? 'opacity-75 cursor-not-allowed' 
                                  : 'cursor-pointer group-hover:shadow-md'
                                }
                              `}>
                                <div className={`
                                  absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md 
                                  transform transition-transform duration-300 ease-in-out
                                  ${isEnabled ? 'translate-x-6' : 'translate-x-0'}
                                `} />
                              </div>
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSave}
                    className="flex-1"
                    disabled={!hasChanges}
                  >
                    {hasChanges ? 'Save Changes' : 'No Changes'}
                  </Button>
                  <Button 
                    onClick={handleAcceptAll}
                    variant="outline"
                    className="flex-1"
                  >
                    Accept All
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={handleRejectAll}
                    variant="ghost"
                    className="flex-1"
                  >
                    Reject Optional Cookies
                  </Button>
                  <Button 
                    onClick={() => setShowConfirmClear(true)}
                    variant="ghost" 
                    className="flex-1 text-destructive hover:text-destructive"
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>

              {/* Information */}
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="mb-2">
                  <strong>Your Rights:</strong> Under UK GDPR, you have the right to withdraw consent 
                  at any time, access your data, and request deletion.
                </p>
                <p>
                  For more information, visit our{' '}
                  <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>
                  {' '}or{' '}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </>
          ) : (
            /* Clear data confirmation */
            <Card className="border-destructive">
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-destructive mb-3">Clear All Cookie Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This will remove all stored cookie preferences and analytics data. 
                  You'll need to set your preferences again on your next visit.
                </p>
                <p className="text-sm font-medium mb-6">
                  Are you sure you want to continue?
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleClearAllData}
                    variant="destructive"
                    className="flex-1"
                  >
                    Yes, Clear All Data
                  </Button>
                  <Button
                    onClick={() => setShowConfirmClear(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}