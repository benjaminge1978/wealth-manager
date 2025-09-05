// Cookie consent management utilities for UK GDPR/PECR compliance
export type CookieCategory = 'strictly-necessary' | 'analytics' | 'functional' | 'third-party';

export interface CookieConsentPreferences {
  'strictly-necessary': boolean; // Always true, cannot be disabled
  'analytics': boolean;
  'functional': boolean; 
  'third-party': boolean;
}

export interface ConsentRecord {
  preferences: CookieConsentPreferences;
  timestamp: string;
  version: string; // Policy version
  userAgent: string;
  ipHash?: string; // Optional for audit trail
}

// Current cookie policy version - increment when making changes
export const COOKIE_POLICY_VERSION = '1.0.0';

// Cookie consent storage key
const CONSENT_STORAGE_KEY = 'netfin_cookie_consent';

// Default consent preferences (all optional cookies disabled by default)
export const DEFAULT_CONSENT_PREFERENCES: CookieConsentPreferences = {
  'strictly-necessary': true, // Always required
  'analytics': false,
  'functional': false,
  'third-party': false,
};

/**
 * Get current consent preferences from storage
 */
export function getConsentPreferences(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    const consentRecord: ConsentRecord = JSON.parse(stored);
    return consentRecord.preferences;
  } catch (error) {
    console.warn('Failed to parse stored consent preferences:', error);
    return null;
  }
}

/**
 * Save consent preferences to storage with audit trail
 */
export function saveConsentPreferences(preferences: CookieConsentPreferences): void {
  if (typeof window === 'undefined') return;

  const consentRecord: ConsentRecord = {
    preferences,
    timestamp: new Date().toISOString(),
    version: COOKIE_POLICY_VERSION,
    userAgent: navigator.userAgent,
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentRecord));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', {
      detail: preferences
    }));
  } catch (error) {
    console.error('Failed to save consent preferences:', error);
  }
}

/**
 * Check if user has given consent for specific category
 */
export function hasConsentFor(category: CookieCategory): boolean {
  const preferences = getConsentPreferences();
  if (!preferences) return false; // No consent given yet
  
  return preferences[category];
}

/**
 * Check if consent has been given (any preferences stored)
 */
export function hasGivenConsent(): boolean {
  return getConsentPreferences() !== null;
}

/**
 * Clear all consent data (for GDPR data subject rights)
 */
export function clearConsentData(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(CONSENT_STORAGE_KEY);
  
  // Also clear any analytics data stored
  localStorage.removeItem('blog_faq_analytics');
  localStorage.removeItem('emailCaptures');

  // Dispatch event to notify components
  window.dispatchEvent(new CustomEvent('cookieConsentCleared'));
}

/**
 * Get consent record for audit purposes
 */
export function getConsentRecord(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;

    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to parse consent record:', error);
    return null;
  }
}

/**
 * Check if consent needs to be renewed (old version or expired)
 */
export function shouldRenewConsent(): boolean {
  const record = getConsentRecord();
  if (!record) return true;

  // Check if policy version has changed
  if (record.version !== COOKIE_POLICY_VERSION) return true;

  // Check if consent is older than 13 months (UK guidance)
  const consentDate = new Date(record.timestamp);
  const thirteenMonthsAgo = new Date();
  thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);

  return consentDate < thirteenMonthsAgo;
}

/**
 * Set up cookie blocking/unblocking based on consent
 */
export function applyCookieConsent(): void {
  const preferences = getConsentPreferences();
  if (!preferences) return;

  // Block/unblock analytics
  if (!preferences.analytics) {
    // Disable Google Analytics if enabled
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  } else {
    // Enable Google Analytics if disabled
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  }

  // Handle functional cookies
  if (!preferences.functional) {
    // Clear functional data if consent withdrawn
    localStorage.removeItem('emailCaptures');
  }

  // Handle third-party cookies - this would typically involve
  // more complex integration with third-party services
}

/**
 * Initialize consent system on page load
 */
export function initializeCookieConsent(): void {
  if (typeof window === 'undefined') return;

  // Apply current consent settings
  applyCookieConsent();

  // Listen for storage changes (if user changes settings in another tab)
  window.addEventListener('storage', (event) => {
    if (event.key === CONSENT_STORAGE_KEY) {
      applyCookieConsent();
    }
  });
}

/**
 * TypeScript declarations for Google Analytics
 */
declare global {
  interface Window {
    gtag: (command: string, eventName: string, parameters: any) => void;
  }
}

/**
 * Cookie categories with descriptions for UI
 */
export const COOKIE_CATEGORIES = {
  'strictly-necessary': {
    title: 'Strictly Necessary Cookies',
    description: 'These cookies are essential for the website to function and cannot be switched off.',
    required: true,
    examples: ['Session cookies', 'Security cookies', 'Load balancing cookies']
  },
  'analytics': {
    title: 'Analytics Cookies', 
    description: 'Help us understand how visitors interact with our website.',
    required: false,
    examples: ['Google Analytics', 'FAQ interaction tracking', 'Page view statistics']
  },
  'functional': {
    title: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    required: false,
    examples: ['Email capture preferences', 'Form data persistence', 'User interface preferences']
  },
  'third-party': {
    title: 'Third-Party Cookies',
    description: 'Set by external services we use to provide functionality.',
    required: false,
    examples: ['Sanity CMS', 'Google Fonts', 'ConvertKit', 'Social media embeds']
  }
} as const;