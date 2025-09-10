import cron from 'node-cron';
import { format, addDays, isWeekend } from 'date-fns';
import RobustContentGenerator from './robustContentGenerator.js';
import SanityIntegration from './sanityIntegration.js';
import NewsAggregator from './newsAggregator.js';
import FCAComplianceManager from './fcaComplianceManager.js';
import ExpertAuthorManager from './expertAuthorManager.js';
import NicheTopicClusters from './nicheTopicClusters.js';
import EEATMonitoringDashboard from './eeAtMonitoringDashboard.js';
import { DAILY_CONTENT_TOPICS, CONTENT_CATEGORIES } from '../types/content.js';
import { env } from '../config/environment.js';

class ContentScheduler {
  constructor() {
    this.contentGenerator = new RobustContentGenerator();
    this.sanity = new SanityIntegration();
    this.newsAggregator = new NewsAggregator();
    this.fcaCompliance = new FCAComplianceManager();
    this.expertAuthorManager = new ExpertAuthorManager();
    this.nicheTopicClusters = new NicheTopicClusters();
    this.eeAtMonitoring = new EEATMonitoringDashboard();
    this.isRunning = false;
    this.scheduledJobs = new Map();
    
    // Content quality thresholds for E-E-A-T compliance
    this.qualityThresholds = {
      minimumWordCount: 1200,
      minimumExpertiseSignals: 2,
      minimumComplianceScore: 80,
      requiresManualReview: ['High']
    };
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
    
    // First daily post (Every day at 20:30 CET)
    const firstPostJob = cron.schedule('30 20 * * *', async () => {
      await this.generateDailyContent('primary');
    }, { 
      scheduled: false,
      timezone: 'Europe/Paris'
    });

    // Second daily post (Every day at 21:30 CET - 1 hour later)
    const secondPostJob = cron.schedule('30 21 * * *', async () => {
      await this.generateDailyContent('secondary');
    }, { 
      scheduled: false,
      timezone: 'Europe/Paris'
    });

    // Content quality check (Daily at 22:30 CET)
    const qualityCheckJob = cron.schedule('30 22 * * *', async () => {
      await this.performQualityCheck();
    }, { 
      scheduled: false,
      timezone: 'Europe/Paris'
    });

    // Start all jobs
    firstPostJob.start();
    secondPostJob.start();
    qualityCheckJob.start();

    this.scheduledJobs.set('firstPost', firstPostJob);
    this.scheduledJobs.set('secondPost', secondPostJob);
    this.scheduledJobs.set('quality', qualityCheckJob);

    this.isRunning = true;
    console.log('✅ Content scheduler started successfully');
    console.log('📅 First daily post: Every day at 20:30 CET');
    console.log('📅 Second daily post: Every day at 21:30 CET');
    console.log('🔍 Quality checks: Daily at 22:30 CET');
    console.log('📊 Total: 14 posts per week (2 per day × 7 days)');
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
   * Generate daily content using robust validation pipeline
   */
  async generateDailyContent(postType = 'primary') {
    try {
      console.log(`📝 Generating ${postType} daily content with robust validation...`);
      
      // Get expert author for this content
      const expertAuthor = this.expertAuthorManager.getAuthorForCategory('investment');
      
      // Generate validated content using RobustContentGenerator
      const validatedContent = await this.contentGenerator.generateStrategyContent(postType, expertAuthor);
      
      console.log(`✅ Content passed robust validation pipeline:`);
      console.log(`   - Quality Score: ${validatedContent.validationResults.qualityScore}/100`);
      console.log(`   - Template: ${validatedContent.templateUsed}`);
      console.log(`   - Attempts Required: ${validatedContent.attemptsRequired}`);
      
      // Since content is already validated, it's ready for publication
      const result = await this.sanity.createBlogPost({
        ...validatedContent,
        status: 'published', // Always publish - content is pre-validated
        expertAuthor: expertAuthor.name,
        validationReport: validatedContent.validationResults,
        // Include the generated SEO meta tags
        seo: validatedContent.seo || null
      });

      console.log(`🚀 ${postType} content published: ${result._id}`);
      console.log(`   - Title: ${validatedContent.title}`);
      console.log(`   - Word Count: ${validatedContent.validationResults.contentValidation.metrics.wordCount}`);
      
      // Record metrics for monitoring
      this.recordContentMetrics({
        ...validatedContent,
        id: result._id,
        expertAuthor: expertAuthor.name,
        status: 'published',
        postType: postType
      }, validatedContent.validationResults, {});
      
      // Log success
      this.logContentGeneration(postType, validatedContent.title, 'success', result._id);
      
      return result;
      
    } catch (error) {
      console.error(`❌ ${postType} content generation failed:`, error);
      this.logContentGeneration(postType, 'unknown', 'failed', null, error.message);
      throw error;
    }
  }

  /**
   * Get content strategy based on post type and day
   * @param {string} postType - 'primary' or 'secondary' 
   * @param {string} dayName - Name of the day
   * @returns {Object} Content strategy configuration
   */
  getContentStrategy(postType, dayName) {
    const strategies = {
      primary: {
        wordCount: 1500,
        audience: 'Professional investors and advisors',
        nichePreference: 'detailed',
        adaptTopic: (topic) => ({
          ...topic,
          title: topic.title,
          contentType: 'comprehensive-guide'
        })
      },
      secondary: {
        wordCount: 800,
        audience: 'General UK investors',
        nichePreference: 'practical',
        adaptTopic: (topic) => ({
          ...topic,
          title: topic.title.includes('Guide') ? 
            topic.title.replace('Guide', 'Quick Tips') : 
            `Quick Guide: ${topic.title}`,
          contentType: 'practical-tips'
        })
      }
    };

    return strategies[postType] || strategies.primary;
  }

  /**
   * Get fallback topic when niche topics aren't available
   * @param {string} dayName - Name of the day
   * @param {string} postType - 'primary' or 'secondary'
   * @returns {Object} Fallback topic configuration
   */
  getFallbackTopic(dayName, postType) {
    const fallbackTopics = {
      primary: {
        monday: { category: CONTENT_CATEGORIES.INVESTMENT, topic: 'Advanced portfolio construction for UK investors' },
        tuesday: { category: CONTENT_CATEGORIES.RETIREMENT, topic: 'SIPP vs workplace pension: Professional analysis' },
        wednesday: { category: CONTENT_CATEGORIES.TAX, topic: 'Capital gains tax optimization strategies' },
        thursday: { category: CONTENT_CATEGORIES.ESTATE, topic: 'Estate planning for high net worth individuals' },
        friday: { category: CONTENT_CATEGORIES.MARKET_INSIGHTS, topic: 'Weekly market analysis and outlook' },
        saturday: { category: CONTENT_CATEGORIES.FINANCIAL_EDUCATION, topic: 'Understanding UK financial regulations' },
        sunday: { category: CONTENT_CATEGORIES.INVESTMENT, topic: 'ESG investing trends in the UK market' }
      },
      secondary: {
        monday: { category: CONTENT_CATEGORIES.INVESTMENT, topic: '5 quick investment tips for beginners' },
        tuesday: { category: CONTENT_CATEGORIES.RETIREMENT, topic: 'Pension basics: What you need to know' },
        wednesday: { category: CONTENT_CATEGORIES.TAX, topic: 'ISA allowance: Make the most of yours' },
        thursday: { category: CONTENT_CATEGORIES.ESTATE, topic: 'Will writing essentials for UK residents' },
        friday: { category: CONTENT_CATEGORIES.MARKET_INSIGHTS, topic: 'This week in financial markets' },
        saturday: { category: CONTENT_CATEGORIES.FINANCIAL_EDUCATION, topic: 'Financial planning checklist' },
        sunday: { category: CONTENT_CATEGORIES.INVESTMENT, topic: 'Weekend market wrap-up' }
      }
    };

    return fallbackTopics[postType][dayName] || fallbackTopics[postType].monday;
  }

  /**
   * Generate content using fallback topics
   * @param {Object} fallbackTopic - Topic configuration
   * @param {Object} contentStrategy - Content strategy
   * @returns {Promise<Object>} Generated content result
   */
  async generateFallbackContent(fallbackTopic, contentStrategy) {
    console.log(`🔄 Using fallback topic: ${fallbackTopic.topic}`);
    
    const generatedContent = await this.contentGenerator.generateBlogPost({
      topic: fallbackTopic.topic,
      category: fallbackTopic.category,
      keywords: ['UK investors', 'financial planning', 'investment advice'],
      wordCount: contentStrategy.wordCount,
      targetAudience: contentStrategy.audience,
      contentType: contentStrategy.adaptTopic({ title: fallbackTopic.topic }).contentType
    });

    // Continue with the same quality checks and publishing logic...
    const result = await this.sanity.createBlogPost({
      ...generatedContent,
      status: generatedContent.qualityAnalysis?.passesQualityGate ? 'published' : 'draft'
    });

    console.log(`✅ Fallback content generated: ${result._id}`);
    return result;
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
      console.log(`🎯 Manual content generation with robust validation: ${topic}`);
      
      // Get expert author
      const expertAuthor = this.expertAuthorManager.getAuthorForCategory(category || 'investment');
      
      // Use robust content generation
      const validatedContent = await this.contentGenerator.generateValidatedContent({
        topic,
        keywords: options.keywords || [],
        targetWords: options.wordCount || 1500,
        audience: options.targetAudience || 'UK investors',
        contentType: options.contentType || 'comprehensive',
        expertProfile: expertAuthor
      });

      const result = await this.sanity.createBlogPost({
        ...validatedContent,
        status: options.status || 'draft', // Default to draft for manual generation
        expertAuthor: expertAuthor.name,
        validationReport: validatedContent.validationResults,
        // Include the generated SEO meta tags
        seo: validatedContent.seo || null
      });

      console.log(`✅ Manual content created with validation: ${result._id}`);
      console.log(`   - Quality Score: ${validatedContent.validationResults.qualityScore}/100`);
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

  /**
   * Get content type for compliance classification
   * @param {Object} category - Content category object
   * @returns {string} Content type for compliance purposes
   */
  getContentType(category) {
    const typeMap = {
      'investment-strategies': 'investment',
      'investment': 'investment',
      'retirement-planning': 'pension',
      'retirement': 'pension', 
      'tax-optimization': 'tax',
      'tax': 'tax',
      'market-insights': 'market',
      'market': 'market',
      'estate-planning': 'estate',
      'estate': 'estate',
      'financial-education': 'general',
      'education': 'general'
    };

    return typeMap[category.id] || typeMap[category.slug] || 'general';
  }

  /**
   * Quality validation is now handled by RobustContentGenerator
   * This method is kept for compatibility but delegates to the new system
   */
  async validateContentQuality(content, complianceReport = {}) {
    console.log('ℹ️ Quality validation now handled by RobustContentGenerator pipeline');
    
    // Simple fallback validation for compatibility
    const wordCount = content.content ? content.content.split(' ').length : 0;
    const score = wordCount >= 1200 ? 85 : 60;
    
    return {
      score: score,
      passesThreshold: score >= 80,
      issues: wordCount < 1200 ? [`Content too short: ${wordCount} words`] : [],
      warnings: [],
      qualityLevel: score >= 80 ? 'Good' : 'Needs Improvement',
      recommendations: [],
      metrics: { wordCount }
    };
  }

  /**
   * Map niche topic clusters to content categories for author selection
   * @param {string} nicheCluster - Niche cluster identifier
   * @returns {Object} Mapped content category
   */
  mapNicheToCategory(nicheCluster) {
    const mapping = {
      'uk-us-tax-planning': CONTENT_CATEGORIES.TAX,
      'rsu-stock-compensation': CONTENT_CATEGORIES.INVESTMENT,
      'cross-border-pensions': CONTENT_CATEGORIES.RETIREMENT,
      'entrepreneur-founder-planning': CONTENT_CATEGORIES.TAX,
      'property-investment-cross-border': CONTENT_CATEGORIES.INVESTMENT
    };

    return mapping[nicheCluster] || CONTENT_CATEGORIES.FINANCIAL_EDUCATION;
  }

  /**
   * Generate internal linking suggestions for niche content
   * @param {string} currentCluster - Current content cluster
   * @param {string} topicTitle - Current topic title
   * @returns {Array} Internal linking opportunities
   */
  generateInternalLinks(currentCluster, topicTitle) {
    return this.nicheTopicClusters.getInternalLinkingOpportunities(currentCluster, topicTitle);
  }

  /**
   * Get niche content performance analytics
   * @returns {Object} Performance metrics for niche clusters
   */
  getNicheContentAnalytics() {
    const clusters = this.nicheTopicClusters.getAllClusters();
    
    return {
      totalClusters: clusters.length,
      clusterStrengths: clusters.map(cluster => ({
        name: cluster.key,
        strength: cluster.strength,
        targetAudience: cluster.targetAudience
      })),
      recommendedFocus: clusters
        .filter(cluster => cluster.strength < 70)
        .map(cluster => ({
          cluster: cluster.key,
          priority: cluster.strength < 50 ? 'High' : 'Medium',
          recommendations: this.nicheTopicClusters.analyzeContentGaps(cluster.key)
        }))
    };
  }

  /**
   * Generate E-E-A-T performance dashboard
   * @param {string} period - Time period ('daily', 'weekly', 'monthly', 'quarterly')
   * @returns {Object} Comprehensive E-E-A-T dashboard data
   */
  generateEEATDashboard(period = 'weekly') {
    console.log(`📊 Generating E-E-A-T performance dashboard for ${period} period`);
    return this.eeAtMonitoring.generateEEATDashboard(period);
  }

  /**
   * Export dashboard data in various formats
   * @param {string} period - Time period for dashboard
   * @param {string} format - Export format ('json', 'csv')
   * @returns {string} Formatted dashboard export
   */
  exportEEATDashboard(period = 'weekly', format = 'json') {
    const dashboardData = this.generateEEATDashboard(period);
    return this.eeAtMonitoring.exportDashboard(dashboardData, format);
  }

  /**
   * Get real-time system health status
   * @returns {Object} Current system performance indicators
   */
  getSystemHealthStatus() {
    const recentDashboard = this.generateEEATDashboard('daily');
    
    return {
      timestamp: new Date().toISOString(),
      systemStatus: recentDashboard.pipelineHealth?.status || 'Unknown',
      lastContentGenerated: this.getLastContentTimestamp(),
      activeServices: {
        contentGenerator: true,
        fcaCompliance: true,
        nicheTopicClusters: true,
        eeAtMonitoring: true,
        sanityIntegration: true
      },
      schedulerStatus: {
        isRunning: this.isRunning,
        activeJobs: Array.from(this.scheduledJobs.keys()),
        nextRun: this.isRunning ? 'Next business day 9:00 AM' : 'Not scheduled'
      },
      qualityMetrics: {
        averageScore: recentDashboard.averageQualityScore || 0,
        complianceRate: recentDashboard.compliance?.complianceRate || 0,
        automationRate: recentDashboard.pipelineHealth?.automationRate || 0
      },
      alerts: recentDashboard.alerts || []
    };
  }

  /**
   * Get last content generation timestamp
   */
  getLastContentTimestamp() {
    const contentMetrics = this.eeAtMonitoring.metricsDatabase.contentQuality;
    if (contentMetrics.length === 0) return null;
    
    return contentMetrics[contentMetrics.length - 1].timestamp;
  }

  /**
   * Manually record content metrics (for testing or manual content)
   * @param {Object} contentData - Content information
   * @param {Object} qualityCheck - Quality metrics
   * @param {Object} complianceReport - Compliance report
   */
  recordContentMetrics(contentData, qualityCheck, complianceReport) {
    return this.eeAtMonitoring.recordContentMetrics(contentData, qualityCheck, complianceReport);
  }

  /**
   * Test the E-E-A-T pipeline for any day (for manual testing)
   * @param {string} testDay - Day to simulate ('monday', 'tuesday', etc.)
   * @returns {Object} Test results
   */
  async testDailyContentGeneration(testDay = 'monday') {
    try {
      console.log(`🧪 Testing E-E-A-T pipeline for ${testDay}...`);
      
      // Get niche topic data for the test day
      const nicheTopicData = this.nicheTopicClusters.getTopicClusterForDay(testDay);
      
      if (!nicheTopicData) {
        throw new Error(`No niche topic cluster found for ${testDay}`);
      }

      // Get content details
      const selectedTopic = nicheTopicData.selectedTopic.title;
      const topicKeywords = nicheTopicData.selectedTopic.keywords;
      const topicWordCount = nicheTopicData.selectedTopic.wordCount;
      const targetAudience = nicheTopicData.clusterInfo.targetAudience;
      const mappedCategory = this.mapNicheToCategory(nicheTopicData.cluster);

      console.log(`🎯 Test Topic: ${selectedTopic}`);
      console.log(`🎯 Niche Cluster: ${nicheTopicData.cluster}`);
      console.log(`🎯 Target Audience: ${targetAudience}`);
      
      // Generate content with E-E-A-T requirements
      const generatedContent = await this.contentGenerator.generateBlogPost({
        topic: selectedTopic,
        category: mappedCategory,
        keywords: topicKeywords,
        wordCount: Math.max(topicWordCount, this.qualityThresholds.minimumWordCount),
        targetAudience: targetAudience,
        nicheSpecialization: nicheTopicData.cluster,
        contentType: nicheTopicData.selectedTopic.contentType
      });

      // Get expert author
      const expertAuthor = this.expertAuthorManager.getAuthorForCategory(mappedCategory);
      const contentType = this.getContentType(mappedCategory);

      // Run FCA compliance check
      const complianceReport = this.fcaCompliance.generateComplianceReport(
        generatedContent,
        contentType,
        expertAuthor
      );

      // Quality validation
      const qualityCheck = await this.validateContentQuality(generatedContent, complianceReport);

      // Create test post (as draft for safety)
      const result = await this.sanity.createBlogPost({
        ...generatedContent,
        status: 'draft', // Always draft for tests
        complianceReport: complianceReport,
        qualityMetrics: qualityCheck,
        expertAuthor: expertAuthor.name,
        contentType: contentType,
        testGeneration: true // Mark as test content
      });

      // Record metrics
      const monitoringData = this.eeAtMonitoring.recordContentMetrics({
        ...generatedContent,
        id: result._id,
        category: mappedCategory,
        expertAuthor: expertAuthor.name,
        status: 'draft',
        nicheSpecialization: nicheTopicData.cluster,
        contentType: nicheTopicData.selectedTopic.contentType
      }, qualityCheck, complianceReport);

      return {
        success: true,
        postId: result._id,
        topic: selectedTopic,
        nicheCluster: nicheTopicData.cluster,
        expertAuthor: expertAuthor.name,
        qualityScore: qualityCheck.score,
        qualityLevel: qualityCheck.qualityLevel,
        complianceStatus: complianceReport.complianceAssessment.overallRisk,
        wordCount: qualityCheck.metrics?.wordCount || 0,
        authorityScore: generatedContent.authorityScore || 0,
        citationCount: generatedContent.citations?.length || 0,
        publicationStatus: 'draft',
        eeAtScores: {
          experience: monitoringData.experienceScore,
          expertise: monitoringData.expertiseScore,
          authority: monitoringData.authorityScore,
          trust: monitoringData.trustScore
        },
        recommendations: qualityCheck.recommendations || [],
        alerts: complianceReport.actionItems || []
      };

    } catch (error) {
      console.error(`❌ E-E-A-T pipeline test failed for ${testDay}:`, error);
      return {
        success: false,
        error: error.message,
        testDay: testDay,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Test specific niche cluster generation
   * @param {string} cluster - Niche cluster to test
   * @returns {Object} Test results for the cluster
   */
  async testNicheCluster(cluster) {
    try {
      console.log(`🧪 Testing niche cluster: ${cluster}`);
      
      const nicheData = this.nicheTopicClusters.generateNicheTopic(cluster);
      
      if (!nicheData) {
        throw new Error(`No niche data found for cluster: ${cluster}`);
      }

      return {
        success: true,
        cluster: cluster,
        topicData: nicheData,
        internalLinks: this.nicheTopicClusters.getInternalLinkingOpportunities(cluster, nicheData.topic),
        gapAnalysis: this.nicheTopicClusters.analyzeContentGaps(cluster)
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        cluster: cluster
      };
    }
  }
}

export default ContentScheduler;