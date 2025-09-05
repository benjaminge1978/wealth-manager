import ReactGA from 'react-ga4';

// Get the GA4 Measurement ID from environment variables
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Flag to track if analytics has been initialized
let isInitialized = false;

/**
 * Initialize Google Analytics 4
 * This should be called once when the app starts and user has consented to cookies
 */
export const initializeAnalytics = (): void => {
  if (!GA4_MEASUREMENT_ID) {
    console.warn('GA4 Measurement ID not found. Analytics will not be initialized.');
    return;
  }

  if (isInitialized) {
    console.warn('Analytics already initialized');
    return;
  }

  try {
    ReactGA.initialize(GA4_MEASUREMENT_ID, {
      testMode: import.meta.env.DEV, // Enable test mode in development
      gtagOptions: {
        // Respect user privacy preferences
        anonymize_ip: true,
        cookie_expires: 60 * 60 * 24 * 365, // 1 year
      }
    });

    isInitialized = true;
    console.log('Google Analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

/**
 * Track page views
 * This should be called on route changes
 */
export const trackPageView = (page?: string): void => {
  if (!isInitialized) {
    console.warn('Analytics not initialized. Cannot track page view.');
    return;
  }

  try {
    ReactGA.send({
      hitType: 'pageview',
      page: page || window.location.pathname + window.location.search
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Track custom events
 * Useful for tracking conversions, form submissions, etc.
 */
export const trackEvent = (eventName: string, parameters?: Record<string, any>): void => {
  if (!isInitialized) {
    console.warn('Analytics not initialized. Cannot track event.');
    return;
  }

  try {
    ReactGA.event(eventName, parameters);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Check if analytics is available and initialized
 */
export const isAnalyticsInitialized = (): boolean => {
  return isInitialized && !!GA4_MEASUREMENT_ID;
};

/**
 * Disable analytics (for privacy compliance)
 */
export const disableAnalytics = (): void => {
  if (isInitialized) {
    // Set window property to disable GA
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
    console.log('Google Analytics disabled');
  }
};

/**
 * Enable analytics (when user consents)
 */
export const enableAnalytics = (): void => {
  if (GA4_MEASUREMENT_ID) {
    // Remove disable flag
    window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
    
    // Initialize if not already done
    if (!isInitialized) {
      initializeAnalytics();
    }
  }
};