import Parser from 'rss-parser';
import { env } from '../config/environment.js';

class NewsAggregator {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: ['category', 'media:content', 'media:thumbnail']
      }
    });
    this.rssFeeds = env.NEWS_RSS_FEEDS;
  }

  /**
   * Fetch and aggregate news from multiple RSS sources
   * @returns {Promise<Array>} Array of news items
   */
  async aggregateFinancialNews() {
    console.log('📰 Fetching financial news from RSS feeds...');
    
    const allNews = [];
    
    for (const feedUrl of this.rssFeeds) {
      try {
        console.log(`📡 Fetching from: ${feedUrl}`);
        const feed = await this.parser.parseURL(feedUrl);
        
        const relevantItems = feed.items
          .filter(item => this.isFinanciallyRelevant(item))
          .slice(0, 10) // Limit per source
          .map(item => ({
            title: item.title,
            description: item.contentSnippet || item.summary || '',
            url: item.link,
            source: this.extractSourceName(feedUrl),
            publishDate: new Date(item.pubDate),
            keywords: this.extractKeywords(item),
            category: item.category || [],
            guid: item.guid
          }));
          
        allNews.push(...relevantItems);
        
      } catch (error) {
        console.warn(`⚠️ Failed to fetch from ${feedUrl}:`, error.message);
        continue;
      }
    }
    
    // Sort by publish date and remove duplicates
    const uniqueNews = this.removeDuplicates(allNews);
    const sortedNews = uniqueNews
      .sort((a, b) => b.publishDate - a.publishDate)
      .slice(0, 20); // Keep top 20 most recent
      
    console.log(`✅ Aggregated ${sortedNews.length} relevant news items`);
    return sortedNews;
  }

  /**
   * Check if news item is financially relevant
   */
  isFinanciallyRelevant(item) {
    const text = `${item.title} ${item.contentSnippet || item.summary || ''}`.toLowerCase();
    
    const financialKeywords = [
      // UK specific
      'uk economy', 'british economy', 'boe', 'bank of england', 'hmrc',
      'isa', 'pension', 'gilt', 'ftse', 'london stock exchange',
      
      // Investment terms
      'investment', 'investing', 'portfolio', 'stocks', 'shares', 'bonds',
      'mutual funds', 'etf', 'index fund', 'dividend',
      
      // Economic indicators
      'inflation', 'interest rate', 'gdp', 'unemployment', 'recession',
      'market', 'economy', 'economic', 'financial',
      
      // Wealth management
      'wealth', 'asset', 'retirement', 'savings', 'tax',
      'property', 'mortgage', 'insurance', 'planning',
      
      // Market movements
      'bull market', 'bear market', 'volatility', 'rally', 'correction',
      'earnings', 'revenue', 'profit'
    ];
    
    // Filter out irrelevant topics
    const irrelevantKeywords = [
      'sports', 'entertainment', 'celebrity', 'music', 'film', 'movie',
      'weather', 'crime', 'accident', 'health', 'medical'
    ];
    
    const hasRelevantKeywords = financialKeywords.some(keyword => 
      text.includes(keyword)
    );
    
    const hasIrrelevantKeywords = irrelevantKeywords.some(keyword =>
      text.includes(keyword)
    );
    
    return hasRelevantKeywords && !hasIrrelevantKeywords;
  }

  /**
   * Extract source name from RSS feed URL
   */
  extractSourceName(feedUrl) {
    const urlMap = {
      'feeds.reuters.com': 'Reuters',
      'feeds.bbci.co.uk': 'BBC News',
      'finance.yahoo.com': 'Yahoo Finance',
      'www.ft.com': 'Financial Times'
    };
    
    for (const [domain, name] of Object.entries(urlMap)) {
      if (feedUrl.includes(domain)) {
        return name;
      }
    }
    
    // Extract domain as fallback
    try {
      const url = new URL(feedUrl);
      return url.hostname.replace('www.', '');
    } catch {
      return 'Unknown Source';
    }
  }

  /**
   * Extract relevant keywords from news item
   */
  extractKeywords(item) {
    const text = `${item.title} ${item.contentSnippet || ''}`.toLowerCase();
    
    const keywordPatterns = [
      // UK specific
      /uk|britain|british/gi,
      /boe|bank of england/gi,
      /ftse|london stock exchange/gi,
      
      // Investment types
      /stocks?|shares?|equities/gi,
      /bonds?|gilts?/gi,
      /etf|index fund/gi,
      /pension|isa|sipp/gi,
      
      // Economic indicators
      /inflation|interest rates?/gi,
      /gdp|unemployment/gi,
      /recession|growth/gi,
      
      // Market sentiment
      /bull market|bear market/gi,
      /volatility|correction/gi,
      /rally|decline/gi
    ];
    
    const keywords = [];
    keywordPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        keywords.push(...matches.map(m => m.toLowerCase()));
      }
    });
    
    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Remove duplicate news items based on title similarity
   */
  removeDuplicates(newsItems) {
    const seen = new Set();
    return newsItems.filter(item => {
      // Create a simplified version of the title for comparison
      const normalizedTitle = item.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
        
      if (seen.has(normalizedTitle)) {
        return false;
      }
      
      seen.add(normalizedTitle);
      return true;
    });
  }

  /**
   * Get news items from the last week for weekly roundup
   */
  async getWeeklyNews() {
    const allNews = await this.aggregateFinancialNews();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return allNews
      .filter(item => item.publishDate >= weekAgo)
      .slice(0, 15); // Limit for roundup
  }

  /**
   * Get top news stories for today
   */
  async getTodaysTopStories(limit = 5) {
    const allNews = await this.aggregateFinancialNews();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return allNews
      .filter(item => item.publishDate >= today)
      .slice(0, limit);
  }
}

export default NewsAggregator;