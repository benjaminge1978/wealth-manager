// Environment configuration for content automation
import { config } from 'dotenv';

// Load environment variables
config();

export const env = {
  // Anthropic Claude API
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  
  // Sanity CMS
  SANITY_PROJECT_ID: process.env.VITE_SANITY_PROJECT_ID || 'uvt95dbx',
  SANITY_DATASET: process.env.VITE_SANITY_DATASET || 'production',
  SANITY_TOKEN: process.env.SANITY_TOKEN || '', // Write token for creating content
  SANITY_API_VERSION: '2023-05-03',
  
  // Content Settings
  POSTS_PER_WEEK: parseInt(process.env.POSTS_PER_WEEK || '5'), // Mon-Fri posting
  CONTENT_GENERATION_TIME: process.env.CONTENT_GENERATION_TIME || '09:00', // 9 AM daily
  
  // News APIs (Free tier initially)
  NEWS_RSS_FEEDS: [
    'https://feeds.reuters.com/reuters/businessNews',
    'https://feeds.bbci.co.uk/news/business/rss.xml',
    'https://finance.yahoo.com/news/rssindex',
    'https://www.ft.com/rss/home/uk'
  ],
  
  // Social Media (will implement later)
  TWITTER_API_KEY: process.env.TWITTER_API_KEY || '',
  LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY || '',
  
  // Admin Dashboard
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'changeme123',
  
  // Server
  PORT: parseInt(process.env.PORT || '3001'),
  NODE_ENV: process.env.NODE_ENV || 'development'
};

// Validation
export function validateEnvironment() {
  const required = [
    'ANTHROPIC_API_KEY',
    'SANITY_TOKEN'
  ];
  
  const missing = required.filter(key => !env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    console.log('\nPlease create a .env file with:');
    missing.forEach(key => {
      console.log(`${key}=your_${key.toLowerCase()}_here`);
    });
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
}