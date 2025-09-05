import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  initializeAnalytics, 
  trackPageView, 
  trackEvent, 
  isAnalyticsInitialized,
  enableAnalytics,
  disableAnalytics
} from '../lib/analytics';

interface UseAnalyticsReturn {
  trackPage: (page?: string) => void;
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  isInitialized: boolean;
  enableAnalytics: () => void;
  disableAnalytics: () => void;
}

/**
 * Hook for managing Google Analytics in React components
 * Automatically tracks route changes and provides methods for custom tracking
 */
export const useAnalytics = (options?: { 
  enableAutoPageTracking?: boolean;
  trackInitialPage?: boolean;
}): UseAnalyticsReturn => {
  const location = useLocation();
  const { 
    enableAutoPageTracking = true, 
    trackInitialPage = true 
  } = options || {};

  // Track page views automatically on route changes
  useEffect(() => {
    if (enableAutoPageTracking && isAnalyticsInitialized()) {
      const page = location.pathname + location.search;
      trackPageView(page);
    }
  }, [location, enableAutoPageTracking]);

  // Track initial page view
  useEffect(() => {
    if (trackInitialPage && isAnalyticsInitialized()) {
      trackPageView();
    }
  }, []); // Only run once on mount

  const handleTrackPage = useCallback((page?: string) => {
    trackPageView(page);
  }, []);

  const handleTrackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  }, []);

  return {
    trackPage: handleTrackPage,
    trackEvent: handleTrackEvent,
    isInitialized: isAnalyticsInitialized(),
    enableAnalytics,
    disableAnalytics,
  };
};

/**
 * Hook specifically for tracking common website events
 * Provides pre-configured event tracking for typical conversion actions
 */
export const useConversionTracking = () => {
  const { trackEvent } = useAnalytics({ enableAutoPageTracking: false });

  return {
    trackFormSubmission: (formName: string, additionalData?: Record<string, any>) => {
      trackEvent('form_submit', {
        form_name: formName,
        ...additionalData
      });
    },
    
    trackContactAttempt: (method: 'email' | 'phone' | 'form', additionalData?: Record<string, any>) => {
      trackEvent('contact_attempt', {
        contact_method: method,
        ...additionalData
      });
    },
    
    trackCalculatorUsage: (calculatorType: string, additionalData?: Record<string, any>) => {
      trackEvent('calculator_usage', {
        calculator_type: calculatorType,
        ...additionalData
      });
    },
    
    trackResourceDownload: (resourceType: string, resourceName: string) => {
      trackEvent('resource_download', {
        resource_type: resourceType,
        resource_name: resourceName
      });
    },
    
    trackServiceInterest: (serviceName: string, additionalData?: Record<string, any>) => {
      trackEvent('service_interest', {
        service_name: serviceName,
        ...additionalData
      });
    }
  };
};