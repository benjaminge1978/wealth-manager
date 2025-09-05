// Type definitions for content automation system

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} content
 * @property {Object} author
 * @property {string} publishedDate
 * @property {number} readTime
 * @property {Object} category
 * @property {string[]} tags
 * @property {string} featuredImage
 * @property {boolean} isFeatured
 * @property {string} status - 'draft' | 'scheduled' | 'published'
 */

/**
 * @typedef {Object} ContentPrompt
 * @property {string} type - 'daily_post' | 'news_roundup' | 'guide' | 'comparison'
 * @property {string} topic
 * @property {string[]} keywords
 * @property {string} category
 * @property {Object} targetAudience
 * @property {number} wordCount
 */

/**
 * @typedef {Object} NewsItem
 * @property {string} title
 * @property {string} description
 * @property {string} url
 * @property {string} source
 * @property {Date} publishDate
 * @property {string[]} keywords
 */

/**
 * @typedef {Object} ScheduledPost
 * @property {string} id
 * @property {BlogPost} content
 * @property {Date} scheduledDate
 * @property {string} status - 'pending' | 'processing' | 'published' | 'failed'
 * @property {Object} metadata
 */

// Content categories matching existing blog system
export const CONTENT_CATEGORIES = {
  INVESTMENT: {
    id: 'investment',
    name: 'Investment Strategies',
    color: '#3b82f6'
  },
  RETIREMENT: {
    id: 'retirement', 
    name: 'Retirement Planning',
    color: '#10b981'
  },
  TAX: {
    id: 'tax',
    name: 'Tax Optimization',
    color: '#f59e0b'
  },
  MARKET_INSIGHTS: {
    id: 'market-insights',
    name: 'Market Insights',
    color: '#ef4444'
  },
  ESTATE: {
    id: 'estate',
    name: 'Estate Planning', 
    color: '#7c3aed'
  },
  FINANCIAL_EDUCATION: {
    id: 'financial-education',
    name: 'Financial Education',
    color: '#06b6d4'
  }
};

// Daily content topics for automated generation
export const DAILY_CONTENT_TOPICS = [
  // Monday - Investment Education
  {
    day: 'monday',
    category: CONTENT_CATEGORIES.INVESTMENT,
    topics: [
      'Understanding index funds for UK investors',
      'ISA vs SIPP: Which should you choose?',
      'Building a diversified portfolio in 2025',
      'Dollar cost averaging strategies',
      'Value vs growth investing explained'
    ]
  },
  // Tuesday - Retirement Planning  
  {
    day: 'tuesday',
    category: CONTENT_CATEGORIES.RETIREMENT,
    topics: [
      'Maximizing your workplace pension',
      'State pension planning strategies',
      'Early retirement: FIRE movement UK',
      'Pension transfer considerations',
      'Healthcare costs in retirement'
    ]
  },
  // Wednesday - Tax Optimization
  {
    day: 'wednesday', 
    category: CONTENT_CATEGORIES.TAX,
    topics: [
      'Utilizing your ISA allowance effectively',
      'Capital gains tax planning',
      'Salary sacrifice benefits',
      'Tax-efficient investment strategies',
      'Married couples tax optimization'
    ]
  },
  // Thursday - Market Insights
  {
    day: 'thursday',
    category: CONTENT_CATEGORIES.MARKET_INSIGHTS,
    topics: [
      'Market volatility: What investors should know',
      'Economic indicators to watch',
      'UK vs global market exposure',
      'Interest rate impact on investments',
      'Inflation hedging strategies'
    ]
  },
  // Friday - News Roundup (automated from RSS feeds)
  {
    day: 'friday',
    category: CONTENT_CATEGORIES.MARKET_INSIGHTS,
    type: 'news_roundup',
    title: 'Weekly Financial Markets Roundup'
  }
];

export default {
  CONTENT_CATEGORIES,
  DAILY_CONTENT_TOPICS
};