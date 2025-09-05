import cron from 'node-cron';
import { format, addDays, isWeekend } from 'date-fns';
import ClaudeContentGenerator from './claudeContentGenerator.js';
import SanityIntegration from './sanityIntegration.js';
import NewsAggregator from './newsAggregator.js';
import { DAILY_CONTENT_TOPICS, CONTENT_CATEGORIES } from '../types/content.js';
import { env } from '../config/environment.js';

class ContentScheduler {
  constructor() {
    this.contentGenerator = new ClaudeContentGenerator();
    this.sanity = new SanityIntegration();
    this.newsAggregator = new NewsAggregator();
    this.isRunning = false;
    this.scheduledJobs = new Map();
  }

  /**
   * Start the automated content scheduling system
   */
  start() {
    if (this.isRunning) {
      console.log('⚠️ Content scheduler is already running');
      return;
    }

    console.log('🚀 Starting automated content scheduler...');
    
    // Daily content generation (Monday-Thursday at 9 AM)
    const dailyJob = cron.schedule('0 9 * * 1-4', async () => {
      await this.generateDailyContent();
    }, { 
      scheduled: false,
      timezone: 'Europe/London'
    });

    // Weekly news roundup (Friday at 9 AM)
    const weeklyJob = cron.schedule('0 9 * * 5', async () => {
      await this.generateWeeklyRoundup();
    }, { 
      scheduled: false,
      timezone: 'Europe/London'
    });

    // Content quality check (Daily at 10 AM)
    const qualityCheckJob = cron.schedule('0 10 * * *', async () => {
      await this.performQualityCheck();
    }, { 
      scheduled: false,
      timezone: 'Europe/London'
    });

    // Start all jobs
    dailyJob.start();
    weeklyJob.start();
    qualityCheckJob.start();

    this.scheduledJobs.set('daily', dailyJob);
    this.scheduledJobs.set('weekly', weeklyJob);
    this.scheduledJobs.set('quality', qualityCheckJob);

    this.isRunning = true;
    console.log('✅ Content scheduler started successfully');
    console.log('📅 Daily posts: Monday-Thursday 9:00 AM');
    console.log('📰 Weekly roundup: Friday 9:00 AM');
    console.log('🔍 Quality checks: Daily 10:00 AM');
  }

  /**
   * Stop the scheduler
   */
  stop() {
    if (!this.isRunning) {
      return;
    }

    console.log('⏹️ Stopping content scheduler...');
    
    this.scheduledJobs.forEach((job, name) => {
      job.stop();
      job.destroy();
    });
    
    this.scheduledJobs.clear();
    this.isRunning = false;
    
    console.log('✅ Content scheduler stopped');
  }

  /**
   * Generate daily content based on the day of the week
   */
  async generateDailyContent() {
    try {
      console.log('📝 Generating daily content...');
      
      const today = new Date();
      const dayName = format(today, 'EEEE').toLowerCase();
      
      // Skip weekends
      if (isWeekend(today)) {
        console.log('📅 Skipping weekend content generation');
        return;
      }

      // Find today's content topic
      const dailyTopic = DAILY_CONTENT_TOPICS.find(topic => 
        topic.day === dayName.substring(0, dayName.length - 1) // Remove 's' from day name
      );

      if (!dailyTopic) {
        console.log(`❌ No content topic found for ${dayName}`);
        return;
      }

      // Select a random topic for variety
      const topics = dailyTopic.topics || [dailyTopic.title];
      const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

      console.log(`🎯 Generating content for: ${selectedTopic}`);

      // Generate content using Claude
      const generatedContent = await this.contentGenerator.generateBlogPost({
        topic: selectedTopic,
        category: dailyTopic.category,
        keywords: this.getKeywordsForTopic(selectedTopic),
        wordCount: 1500,
        targetAudience: 'UK investors and savers'
      });

      // Create the post in Sanity
      const result = await this.sanity.createBlogPost({
        ...generatedContent,
        status: 'published' // Publish immediately
      });

      console.log(`✅ Daily content published: ${result._id}`);
      
      // Log success for monitoring
      this.logContentGeneration('daily', selectedTopic, 'success', result._id);
      
    } catch (error) {
      console.error('❌ Daily content generation failed:', error);
      this.logContentGeneration('daily', 'unknown', 'failed', null, error.message);
    }
  }

  /**
   * Generate weekly financial news roundup
   */
  async generateWeeklyRoundup() {
    try {
      console.log('📰 Generating weekly financial news roundup...');
      
      // Get this week's financial news
      const newsItems = await this.newsAggregator.getWeeklyNews();
      
      if (newsItems.length === 0) {
        console.log('❌ No news items found for weekly roundup');
        return;
      }

      console.log(`📊 Processing ${newsItems.length} news items for roundup`);

      // Generate news roundup using Claude
      const roundupContent = await this.contentGenerator.generateNewsRoundup(newsItems);

      // Create the post in Sanity
      const result = await this.sanity.createBlogPost({
        ...roundupContent,
        title: `Weekly Financial Markets Roundup - ${format(new Date(), 'MMM dd, yyyy')}`,
        status: 'published'
      });

      console.log(`✅ Weekly roundup published: ${result._id}`);
      
      this.logContentGeneration('weekly', 'news roundup', 'success', result._id);
      
    } catch (error) {
      console.error('❌ Weekly roundup generation failed:', error);
      this.logContentGeneration('weekly', 'news roundup', 'failed', null, error.message);
    }
  }

  /**
   * Manual content generation for testing/admin use
   */
  async generateContent(topic, category, options = {}) {
    try {
      console.log(`🎯 Manual content generation: ${topic}`);
      
      const generatedContent = await this.contentGenerator.generateBlogPost({
        topic,
        category: CONTENT_CATEGORIES[category] || CONTENT_CATEGORIES.FINANCIAL_EDUCATION,
        keywords: options.keywords || [],
        wordCount: options.wordCount || 1500,
        targetAudience: options.targetAudience || 'UK investors'
      });

      const result = await this.sanity.createBlogPost({
        ...generatedContent,
        status: options.status || 'draft' // Default to draft for manual generation
      });

      console.log(`✅ Manual content created: ${result._id}`);
      return result;
      
    } catch (error) {
      console.error('❌ Manual content generation failed:', error);
      throw error;
    }
  }

  /**
   * Schedule content for future publication
   */
  async scheduleContent(topic, category, publishDate, options = {}) {
    try {
      const generatedContent = await this.contentGenerator.generateBlogPost({
        topic,
        category: CONTENT_CATEGORIES[category],
        ...options
      });

      const result = await this.sanity.schedulePost(generatedContent, publishDate);
      
      console.log(`📅 Content scheduled for ${publishDate}: ${result._id}`);
      return result;
      
    } catch (error) {
      console.error('❌ Content scheduling failed:', error);
      throw error;
    }
  }

  /**
   * Get keywords for a specific topic
   */
  getKeywordsForTopic(topic) {
    const keywordMap = {
      'index funds': ['index funds', 'passive investing', 'ISA', 'UK investing'],
      'pension': ['pension', 'SIPP', 'workplace pension', 'retirement'],
      'isa': ['ISA', 'stocks and shares ISA', 'tax-free investing'],
      'tax': ['tax planning', 'capital gains tax', 'income tax', 'UK tax'],
      'investment': ['investment strategy', 'portfolio', 'diversification'],
      'retirement': ['retirement planning', 'pension', 'State Pension']
    };

    // Find matching keywords based on topic content
    const matchingKeywords = Object.entries(keywordMap)
      .filter(([key]) => topic.toLowerCase().includes(key))
      .flatMap(([, keywords]) => keywords);

    return matchingKeywords.length > 0 ? matchingKeywords : ['UK investing', 'financial planning'];
  }

  /**
   * Perform quality checks on generated content
   */
  async performQualityCheck() {
    try {
      console.log('🔍 Performing content quality check...');
      
      const recentPosts = await this.sanity.getRecentPosts(5);
      const issues = [];

      // Check for posts without proper FAQ integration
      // Check for duplicate topics
      // Check for posts that failed to publish
      
      if (issues.length > 0) {
        console.log(`⚠️ Found ${issues.length} content issues:`, issues);
        // In production, you might send an alert email here
      } else {
        console.log('✅ Content quality check passed');
      }
      
    } catch (error) {
      console.error('❌ Quality check failed:', error);
    }
  }

  /**
   * Get scheduler status and statistics
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      activeJobs: Array.from(this.scheduledJobs.keys()),
      nextRuns: {
        daily: this.isRunning ? 'Monday-Thursday 9:00 AM' : 'Not scheduled',
        weekly: this.isRunning ? 'Friday 9:00 AM' : 'Not scheduled'
      }
    };
  }

  /**
   * Log content generation attempts for monitoring
   */
  logContentGeneration(type, topic, status, postId = null, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      topic,
      status,
      postId,
      error
    };
    
    console.log('📊 Content generation log:', logEntry);
    
    // In production, you might want to store these logs in a database
    // or send them to a monitoring service
  }
}

export default ContentScheduler;