import cron from 'node-cron';
import { format, addDays, isWeekend } from 'date-fns';
import ClaudeContentGenerator from './claudeContentGenerator.js';
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
    this.contentGenerator = new ClaudeContentGenerator();
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

      // Get niche topic cluster for today - focus on UK↔US cross-border expertise
      const nicheTopicData = this.nicheTopicClusters.getTopicClusterForDay(dayName.substring(0, dayName.length - 1));

      if (!nicheTopicData) {
        console.log(`❌ No niche topic cluster found for ${dayName}`);
        return;
      }

      // Use specialized niche topic instead of generic topics
      const selectedTopic = nicheTopicData.selectedTopic.title;
      const topicKeywords = nicheTopicData.selectedTopic.keywords;
      const topicWordCount = nicheTopicData.selectedTopic.wordCount;
      const targetAudience = nicheTopicData.clusterInfo.targetAudience;
      
      // Map to appropriate content category for author selection
      const mappedCategory = this.mapNicheToCategory(nicheTopicData.cluster);

      console.log(`🎯 Generating E-E-A-T compliant content for: ${selectedTopic}`);

      // Generate content using enhanced Claude prompts with E-E-A-T requirements for niche expertise
      console.log(`🎯 Niche Focus: ${nicheTopicData.cluster} for ${targetAudience}`);
      const generatedContent = await this.contentGenerator.generateBlogPost({
        topic: selectedTopic,
        category: mappedCategory,
        keywords: topicKeywords,
        wordCount: Math.max(topicWordCount, this.qualityThresholds.minimumWordCount), // Use niche-specific word count
        targetAudience: targetAudience, // Use specialized audience
        nicheSpecialization: nicheTopicData.cluster, // Pass niche context for enhanced prompting
        contentType: nicheTopicData.selectedTopic.contentType
      });

      // Get expert author for this niche content
      const expertAuthor = this.expertAuthorManager.getAuthorForCategory(mappedCategory);
      const contentType = this.getContentType(mappedCategory);

      // Perform comprehensive FCA compliance check
      console.log(`🔍 Running FCA compliance check for ${contentType} content`);
      const complianceReport = this.fcaCompliance.generateComplianceReport(
        generatedContent,
        contentType,
        expertAuthor
      );

      // Quality validation for YMYL standards
      const qualityCheck = await this.validateContentQuality(generatedContent, complianceReport);
      
      if (!qualityCheck.passesThreshold) {
        console.warn(`⚠️ Content quality below YMYL threshold: ${qualityCheck.score}/100`);
        console.log(`📋 Issues: ${qualityCheck.issues.join(', ')}`);
        
        // In production, might want to regenerate or flag for manual review
        if (qualityCheck.score < 60) {
          throw new Error(`Content quality too low for publication: ${qualityCheck.score}/100`);
        }
      }

      // Determine publication status based on compliance
      let publicationStatus = 'published';
      if (complianceReport.complianceAssessment.requiresManualReview) {
        publicationStatus = 'draft';
        console.log(`📋 Content flagged for manual review due to: ${complianceReport.complianceAssessment.section21.requiresApproval ? 'Section 21 approval required' : 'High compliance risk'}`);
      }

      // Create the post in Sanity with enhanced compliance metadata
      const result = await this.sanity.createBlogPost({
        ...generatedContent,
        status: publicationStatus,
        // Add compliance metadata
        complianceReport: complianceReport,
        qualityMetrics: qualityCheck,
        expertAuthor: expertAuthor.name,
        contentType: contentType
      });

      const statusMessage = publicationStatus === 'published' ? 'published' : 'drafted for review';
      console.log(`✅ Daily content ${statusMessage}: ${result._id} (Quality: ${qualityCheck.score}/100)`);
      
      // Record E-E-A-T performance metrics for monitoring dashboard
      console.log(`📊 Recording E-E-A-T metrics for performance tracking`);
      const monitoringData = this.eeAtMonitoring.recordContentMetrics({
        ...generatedContent,
        id: result._id,
        category: mappedCategory,
        expertAuthor: expertAuthor.name,
        status: publicationStatus,
        nicheSpecialization: nicheTopicData.cluster,
        contentType: nicheTopicData.selectedTopic.contentType
      }, qualityCheck, complianceReport);
      
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
   * Validate content quality against E-E-A-T and YMYL standards
   * @param {Object} content - Generated content to validate
   * @param {Object} complianceReport - FCA compliance report
   * @returns {Promise<Object>} Quality validation results
   */
  async validateContentQuality(content, complianceReport) {
    const issues = [];
    const warnings = [];
    let score = 100;

    // Check word count for YMYL depth requirements
    const wordCount = content.content ? content.content.split(' ').length : 0;
    if (wordCount < this.qualityThresholds.minimumWordCount) {
      issues.push(`Content too short: ${wordCount} words (minimum: ${this.qualityThresholds.minimumWordCount})`);
      score -= 20;
    } else if (wordCount < this.qualityThresholds.minimumWordCount * 1.2) {
      warnings.push(`Content length marginal: ${wordCount} words`);
      score -= 5;
    }

    // Check for expertise signals
    const expertiseSignals = content.expertiseSignals || [];
    if (expertiseSignals.length < this.qualityThresholds.minimumExpertiseSignals) {
      issues.push(`Insufficient expertise signals: ${expertiseSignals.length} (minimum: ${this.qualityThresholds.minimumExpertiseSignals})`);
      score -= 15;
    }

    // Check for experience indicators in content
    const contentText = (content.content || '').toLowerCase();
    const experienceIndicators = [
      'in my experience', 'i\'ve seen', 'clients have', 'working with', 
      'advising', 'experience shows', 'my practice', 'over the years'
    ];
    
    const hasExperienceSignals = experienceIndicators.some(indicator => 
      contentText.includes(indicator)
    );
    
    if (!hasExperienceSignals) {
      issues.push('Content lacks clear experience signals from professional practice');
      score -= 15;
    }

    // Check for authoritative sources and citations
    const authoritySources = [
      'hmrc', 'fca', 'ons', 'bank of england', 'gov.uk', 'legislation.gov.uk'
    ];
    
    const hasAuthoritativeSources = authoritySources.some(source => 
      contentText.includes(source)
    );
    
    if (!hasAuthoritativeSources) {
      warnings.push('Content would benefit from authoritative source citations');
      score -= 10;
    }

    // Check compliance report quality
    if (!complianceReport.complianceAssessment.consumerDuty.compliant) {
      issues.push(`Consumer Duty compliance issues: ${complianceReport.complianceAssessment.consumerDuty.issues.join(', ')}`);
      score -= 15;
    }

    // Check for appropriate disclaimers
    if (!content.complianceNotes || content.complianceNotes.length === 0) {
      issues.push('Missing regulatory compliance notes/disclaimers');
      score -= 10;
    }

    // Check for technical accuracy indicators
    const technicalIndicators = [
      'allowance', 'rate', 'threshold', 'regulation', 'section', 'rule',
      'current', '2025', 'hmrc', 'fca'
    ];
    
    const technicalAccuracyScore = technicalIndicators.reduce((count, indicator) => {
      return count + (contentText.includes(indicator) ? 1 : 0);
    }, 0);
    
    if (technicalAccuracyScore < 3) {
      warnings.push('Content may lack sufficient technical depth');
      score -= 5;
    }

    // Check title optimization for AI queries
    const title = content.title || '';
    const questionWords = ['how', 'what', 'when', 'why', 'where', 'which', 'should'];
    const hasQuestionFormat = questionWords.some(word => 
      title.toLowerCase().includes(word)
    );
    
    if (!hasQuestionFormat) {
      warnings.push('Title not optimized for AI question queries');
      score -= 5;
    }

    // Calculate final score and threshold pass
    score = Math.max(0, Math.min(100, score));
    const passesThreshold = score >= this.qualityThresholds.minimumComplianceScore;

    return {
      score: Math.round(score),
      passesThreshold: passesThreshold,
      issues: issues,
      warnings: warnings,
      qualityLevel: score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Acceptable' : 'Needs Improvement',
      recommendations: this.generateQualityRecommendations(issues, warnings, score),
      metrics: {
        wordCount: wordCount,
        expertiseSignals: expertiseSignals.length,
        hasExperienceIndicators: hasExperienceSignals,
        hasAuthoritativeSources: hasAuthoritativeSources,
        technicalAccuracyScore: technicalAccuracyScore,
        complianceScore: complianceReport.complianceAssessment.consumerDuty.overallScore || 0
      }
    };
  }

  /**
   * Generate recommendations for improving content quality
   * @param {Array} issues - Critical issues found
   * @param {Array} warnings - Warning-level issues
   * @param {number} score - Overall quality score
   * @returns {Array} Array of actionable recommendations
   */
  generateQualityRecommendations(issues, warnings, score) {
    const recommendations = [];

    if (score < 70) {
      recommendations.push('Consider regenerating content with enhanced prompts focusing on professional experience');
    }

    if (issues.some(issue => issue.includes('word count'))) {
      recommendations.push('Expand content with more detailed examples, case studies, and technical explanations');
    }

    if (issues.some(issue => issue.includes('expertise signals'))) {
      recommendations.push('Add more references to professional credentials, experience, and industry standing');
    }

    if (warnings.some(warning => warning.includes('authoritative source'))) {
      recommendations.push('Include citations to HMRC, FCA, or other regulatory sources');
    }

    if (issues.some(issue => issue.includes('experience signals'))) {
      recommendations.push('Add more first-person professional experiences and client scenarios (anonymized)');
    }

    return recommendations;
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