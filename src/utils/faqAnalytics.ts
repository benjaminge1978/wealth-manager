import { FAQ } from '../data/blogFAQs';

// FAQ Analytics and Optimization Utilities

export interface FAQAnalytics {
  question: string;
  views: number;
  expansions: number;
  categoryId: string;
  keywords: string[];
  lastViewed: Date;
}

export interface FAQPerformanceMetrics {
  totalViews: number;
  totalExpansions: number;
  averageExpansionRate: number;
  topKeywords: Array<{ keyword: string; count: number }>;
  mostEngagingFAQs: Array<{ question: string; engagementRate: number }>;
}

// Track FAQ interactions for analytics
export function trackFAQView(faq: FAQ, categoryId: string): void {
  // In a real implementation, this would send data to your analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'faq_view', {
      event_category: 'Blog FAQ',
      event_label: faq.question,
      custom_parameters: {
        category_id: categoryId,
        keywords: faq.keywords.join(',')
      }
    });
  }
  
  // Local storage tracking for development/testing
  if (typeof window !== 'undefined') {
    const storageKey = 'blog_faq_analytics';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const timestamp = new Date().toISOString();
    
    existingData.push({
      type: 'view',
      question: faq.question,
      categoryId,
      keywords: faq.keywords,
      timestamp
    });
    
    // Keep only last 1000 entries to prevent storage bloat
    const recentData = existingData.slice(-1000);
    localStorage.setItem(storageKey, JSON.stringify(recentData));
  }
}

export function trackFAQExpansion(faq: FAQ, categoryId: string): void {
  // Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'faq_expand', {
      event_category: 'Blog FAQ',
      event_label: faq.question,
      custom_parameters: {
        category_id: categoryId,
        keywords: faq.keywords.join(',')
      }
    });
  }
  
  // Local storage tracking
  if (typeof window !== 'undefined') {
    const storageKey = 'blog_faq_analytics';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const timestamp = new Date().toISOString();
    
    existingData.push({
      type: 'expansion',
      question: faq.question,
      categoryId,
      keywords: faq.keywords,
      timestamp
    });
    
    const recentData = existingData.slice(-1000);
    localStorage.setItem(storageKey, JSON.stringify(recentData));
  }
}

// Get FAQ performance metrics from stored analytics data
export function getFAQPerformanceMetrics(): FAQPerformanceMetrics | null {
  if (typeof window === 'undefined') return null;
  
  const storageKey = 'blog_faq_analytics';
  const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  if (data.length === 0) return null;
  
  const views = data.filter((entry: any) => entry.type === 'view');
  const expansions = data.filter((entry: any) => entry.type === 'expansion');
  
  // Count keyword frequency
  const keywordCounts: { [key: string]: number } = {};
  data.forEach((entry: any) => {
    entry.keywords?.forEach((keyword: string) => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
    });
  });
  
  const topKeywords = Object.entries(keywordCounts)
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Calculate engagement rates by FAQ
  const faqEngagement: { [question: string]: { views: number; expansions: number } } = {};
  
  data.forEach((entry: any) => {
    if (!faqEngagement[entry.question]) {
      faqEngagement[entry.question] = { views: 0, expansions: 0 };
    }
    
    if (entry.type === 'view') {
      faqEngagement[entry.question].views++;
    } else if (entry.type === 'expansion') {
      faqEngagement[entry.question].expansions++;
    }
  });
  
  const mostEngagingFAQs = Object.entries(faqEngagement)
    .map(([question, stats]) => ({
      question,
      engagementRate: stats.views > 0 ? (stats.expansions / stats.views) * 100 : 0
    }))
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 10);
  
  return {
    totalViews: views.length,
    totalExpansions: expansions.length,
    averageExpansionRate: views.length > 0 ? (expansions.length / views.length) * 100 : 0,
    topKeywords,
    mostEngagingFAQs
  };
}

// Generate FAQ performance report for content optimization
export function generateFAQReport(): string {
  const metrics = getFAQPerformanceMetrics();
  
  if (!metrics) {
    return "No FAQ analytics data available yet.";
  }
  
  return `
FAQ Performance Report
=====================

Total FAQ Views: ${metrics.totalViews}
Total FAQ Expansions: ${metrics.totalExpansions}
Average Expansion Rate: ${metrics.averageExpansionRate.toFixed(2)}%

Top Keywords:
${metrics.topKeywords.map(k => `• ${k.keyword}: ${k.count} interactions`).join('\n')}

Most Engaging FAQs:
${metrics.mostEngagingFAQs.map(f => `• ${f.question} (${f.engagementRate.toFixed(1)}% expansion rate)`).join('\n')}

Recommendations:
${metrics.averageExpansionRate < 20 ? '• Consider making FAQ questions more compelling or relevant' : '• FAQ engagement is healthy'}
${metrics.topKeywords.length > 5 ? '• Consider creating dedicated content around top-performing keywords' : ''}
${metrics.mostEngagingFAQs.some(f => f.engagementRate > 50) ? '• High-performing FAQs could be expanded into full blog posts' : ''}
  `.trim();
}

// SEO optimization utilities
export function generateFAQSitemapData(faqs: FAQ[]): Array<{
  question: string;
  url: string;
  keywords: string[];
  lastmod: string;
}> {
  return faqs.map(faq => ({
    question: faq.question,
    url: `/insights/faq/${encodeURIComponent(faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`,
    keywords: faq.keywords,
    lastmod: new Date().toISOString().split('T')[0]
  }));
}

// Voice search optimization
export function optimizeForVoiceSearch(faq: FAQ): {
  voiceQuery: string;
  quickAnswer: string;
  followUpQuestions: string[];
} {
  // Extract the first sentence as a quick answer
  const sentences = faq.answer.split('.');
  const quickAnswer = sentences[0] + '.';
  
  // Generate potential voice queries
  const voiceQuery = faq.question.startsWith('What') || faq.question.startsWith('How')
    ? faq.question
    : `What ${faq.question.charAt(0).toLowerCase() + faq.question.slice(1)}`;
  
  // Generate follow-up questions based on keywords
  const followUpQuestions = faq.keywords.slice(0, 3).map(keyword => 
    `Tell me more about ${keyword} in the UK`
  );
  
  return {
    voiceQuery,
    quickAnswer,
    followUpQuestions
  };
}

// A/B testing utilities for FAQ optimization
export function generateFAQVariants(faq: FAQ): {
  original: FAQ;
  variants: Array<{ version: string; question: string; hypothesis: string }>;
} {
  return {
    original: faq,
    variants: [
      {
        version: 'A',
        question: faq.question.replace(/^What/, 'How can I understand'),
        hypothesis: 'More actionable phrasing may increase engagement'
      },
      {
        version: 'B', 
        question: faq.question + ' in 2025',
        hypothesis: 'Adding current year may improve relevance'
      },
      {
        version: 'C',
        question: faq.question.replace(/\?$/, ' for beginners?'),
        hypothesis: 'Targeting beginners may increase accessibility'
      }
    ]
  };
}

// Export performance data for external analytics tools
export function exportFAQAnalytics(): string {
  const data = localStorage.getItem('blog_faq_analytics') || '[]';
  const parsedData = JSON.parse(data);
  
  // Convert to CSV format
  const csvData = [
    'Timestamp,Type,Question,Category,Keywords',
    ...parsedData.map((entry: any) => 
      `"${entry.timestamp}","${entry.type}","${entry.question}","${entry.categoryId}","${entry.keywords?.join(';')}"`
    )
  ].join('\n');
  
  return csvData;
}

// Clear analytics data (for GDPR compliance)
export function clearFAQAnalytics(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blog_faq_analytics');
  }
}

// TypeScript declarations for Google Analytics
declare global {
  interface Window {
    gtag: (command: string, eventName: string, parameters: any) => void;
  }
}