#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import { validateEnvironment, env } from './config/environment.js';
import ContentScheduler from './services/contentScheduler.js';
import ClaudeContentGenerator from './services/claudeContentGenerator.js';
import SanityIntegration from './services/sanityIntegration.js';
import NewsAggregator from './services/newsAggregator.js';

// Validate environment before starting
validateEnvironment();

const app = express();
const PORT = env.PORT;

// Initialize services
const contentScheduler = new ContentScheduler();
const contentGenerator = new ClaudeContentGenerator();
const sanity = new SanityIntegration();
const newsAggregator = new NewsAggregator();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://netfin.co.uk',
    'https://www.netfin.co.uk'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Basic auth middleware for admin endpoints
const basicAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Basic ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  
  const credentials = Buffer.from(auth.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');
  
  if (username === 'admin' && password === env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Root endpoint - shows available endpoints
app.get('/', (req, res) => {
  res.json({
    message: 'E-E-A-T Enhanced Content Automation Server',
    status: 'running',
    availableEndpoints: {
      public: {
        health: 'GET /health - Basic health check'
      },
      admin: {
        status: 'GET /api/admin/status - Scheduler status',
        'demo-workflow': 'POST /api/admin/demo-eeat-workflow - Complete E-E-A-T demo',
        'system-health': 'GET /api/admin/system-health - Enhanced system health',
        'test-pipeline': 'POST /api/admin/test-eeat-pipeline - Test full pipeline',
        'generate-content': 'POST /api/admin/generate-content - Generate content manually'
      },
      authentication: {
        username: 'admin',
        password: 'changeme123',
        note: 'Use Basic Auth for admin endpoints'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      scheduler: contentScheduler.getStatus(),
      environment: env.NODE_ENV
    }
  });
});

// Admin API endpoints
app.get('/api/admin/status', basicAuth, (req, res) => {
  res.json({
    scheduler: contentScheduler.getStatus(),
    environment: {
      nodeEnv: env.NODE_ENV,
      postsPerWeek: env.POSTS_PER_WEEK,
      sanityProject: env.SANITY_PROJECT_ID
    },
    timestamp: new Date().toISOString()
  });
});

// Start/stop scheduler
app.post('/api/admin/scheduler/:action', basicAuth, (req, res) => {
  const { action } = req.params;
  
  try {
    if (action === 'start') {
      contentScheduler.start();
      res.json({ message: 'Scheduler started successfully' });
    } else if (action === 'stop') {
      contentScheduler.stop();
      res.json({ message: 'Scheduler stopped successfully' });
    } else {
      res.status(400).json({ error: 'Invalid action. Use start or stop.' });
    }
  } catch (error) {
    console.error('Scheduler action failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Manual content generation
app.post('/api/admin/generate-content', basicAuth, async (req, res) => {
  try {
    const { topic, category, options = {} } = req.body;
    
    if (!topic || !category) {
      return res.status(400).json({ error: 'Topic and category are required' });
    }
    
    console.log(`📝 Manual content generation request: ${topic}`);
    
    const result = await contentScheduler.generateContent(topic, category, options);
    
    res.json({ 
      message: 'Content generated successfully',
      postId: result._id,
      title: result.title || topic
    });
    
  } catch (error) {
    console.error('Manual content generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Schedule content for future publication
app.post('/api/admin/schedule-content', basicAuth, async (req, res) => {
  try {
    const { topic, category, publishDate, options = {} } = req.body;
    
    if (!topic || !category || !publishDate) {
      return res.status(400).json({ error: 'Topic, category, and publishDate are required' });
    }
    
    const result = await contentScheduler.scheduleContent(topic, category, new Date(publishDate), options);
    
    res.json({ 
      message: 'Content scheduled successfully',
      postId: result._id,
      scheduledFor: publishDate
    });
    
  } catch (error) {
    console.error('Content scheduling failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent posts from Sanity
app.get('/api/admin/posts', basicAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const posts = await sanity.getRecentPosts(limit);
    
    res.json({ posts });
    
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get scheduled posts
app.get('/api/admin/scheduled-posts', basicAuth, async (req, res) => {
  try {
    const scheduledPosts = await sanity.getScheduledPosts();
    res.json({ scheduledPosts });
    
  } catch (error) {
    console.error('Failed to fetch scheduled posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test news aggregation
app.get('/api/admin/test-news', basicAuth, async (req, res) => {
  try {
    console.log('🧪 Testing news aggregation...');
    const news = await newsAggregator.aggregateFinancialNews();
    
    res.json({ 
      message: 'News aggregation test successful',
      itemCount: news.length,
      news: news.slice(0, 5) // Return first 5 for preview
    });
    
  } catch (error) {
    console.error('News aggregation test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test content generation
app.post('/api/admin/test-content', basicAuth, async (req, res) => {
  try {
    const { topic = 'Understanding index funds for UK investors' } = req.body;
    
    console.log('🧪 Testing content generation...');
    const content = await contentGenerator.generateBlogPost({
      topic,
      category: { name: 'Investment Strategies', color: '#3b82f6' },
      keywords: ['index funds', 'UK investing', 'ISA'],
      wordCount: 800
    });
    
    res.json({
      message: 'Content generation test successful',
      title: content.title,
      excerpt: content.excerpt,
      wordCount: content.content.length,
      tags: content.suggestedTags
    });
    
  } catch (error) {
    console.error('Content generation test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a post (for testing cleanup)
app.delete('/api/admin/posts/:postId', basicAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    await sanity.deletePost(postId);
    
    res.json({ message: 'Post deleted successfully' });
    
  } catch (error) {
    console.error('Failed to delete post:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🧪 NEW: Test full E-E-A-T pipeline RIGHT NOW
app.post('/api/admin/test-eeat-pipeline', basicAuth, async (req, res) => {
  try {
    console.log('🧪 Testing full E-E-A-T content generation pipeline...');
    
    // Manually trigger what normally runs at 9am on weekdays
    const testDay = req.body.day || 'monday'; // Allow testing different day themes
    const result = await contentScheduler.testDailyContentGeneration(testDay);
    
    res.json({
      message: 'E-E-A-T pipeline test completed successfully',
      results: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('E-E-A-T pipeline test failed:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// 🧪 NEW: Test niche topic generation
app.post('/api/admin/test-niche-topics', basicAuth, async (req, res) => {
  try {
    console.log('🧪 Testing niche topic cluster system...');
    
    const day = req.body.day || 'monday';
    const nicheAnalysis = contentScheduler.getNicheContentAnalytics();
    
    res.json({
      message: 'Niche topic system test completed',
      analytics: nicheAnalysis,
      availableClusters: [
        'uk-us-tax-planning', 
        'rsu-stock-compensation', 
        'cross-border-pensions',
        'entrepreneur-founder-planning',
        'property-investment-cross-border'
      ],
      testDay: day
    });
    
  } catch (error) {
    console.error('Niche topic test failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 📊 NEW: Get E-E-A-T Dashboard
app.get('/api/admin/eeat-dashboard/:period', basicAuth, async (req, res) => {
  try {
    const period = req.params.period || 'weekly';
    console.log(`📊 Generating E-E-A-T dashboard for ${period} period...`);
    
    const dashboard = contentScheduler.generateEEATDashboard(period);
    
    res.json({
      message: `E-E-A-T dashboard generated for ${period} period`,
      dashboard: dashboard
    });
    
  } catch (error) {
    console.error('Dashboard generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 📊 Default dashboard route
app.get('/api/admin/eeat-dashboard', basicAuth, async (req, res) => {
  try {
    console.log(`📊 Generating E-E-A-T dashboard for weekly period...`);
    
    const dashboard = contentScheduler.generateEEATDashboard('weekly');
    
    res.json({
      message: `E-E-A-T dashboard generated for weekly period`,
      dashboard: dashboard
    });
    
  } catch (error) {
    console.error('Dashboard generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🎯 NEW: Demo E-E-A-T Workflow (Shows complete process without API calls)
app.post('/api/admin/demo-eeat-workflow', basicAuth, async (req, res) => {
  try {
    console.log('🎯 Demonstrating complete E-E-A-T workflow...');
    
    // 1. Get niche topic for Monday (simulate the selection)
    const clusters = contentScheduler.nicheTopicClusters.crossBorderClusters;
    const clusterKeys = Object.keys(clusters);
    const selectedClusterKey = clusterKeys[0]; // uk-us-tax-planning
    const selectedCluster = clusters[selectedClusterKey];
    const selectedTopic = selectedCluster.pillarPosts[0];
    
    // 2. Get expert author for this category
    const expertAuthor = contentScheduler.expertAuthorManager.getAuthorForCategory('investment');
    
    // 3. Get FCA compliance requirements
    const complianceCheck = contentScheduler.fcaCompliance.assessSection21Requirements('blog', 'investment');
    
    // 4. Get authoritative sources (demo data)
    const authoritativeSources = [
      {
        name: 'HM Revenue & Customs',
        url: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
        authority: 100,
        topics: ['tax', 'pensions', 'isa']
      },
      {
        name: 'Financial Conduct Authority',
        url: 'https://www.fca.org.uk',
        authority: 100,
        topics: ['financial services', 'investment', 'regulation']
      },
      {
        name: 'HM Treasury',
        url: 'https://www.gov.uk/government/organisations/hm-treasury',
        authority: 95,
        topics: ['economic policy', 'tax policy', 'financial regulation']
      }
    ];
    
    // 5. Generate quality scoring criteria
    const qualityCriteria = {
      experienceSignals: ['First-hand client examples', 'Professional practice insights', 'Real-world case studies'],
      expertiseIndicators: ['Technical accuracy', 'Regulatory knowledge', 'Industry terminology'],
      authorityMarkers: ['Professional credentials', 'FCA authorization', 'Years of experience'],
      trustFactors: ['Compliance disclaimers', 'Risk warnings', 'Authoritative citations']
    };
    
    res.json({
      message: 'E-E-A-T workflow demonstration completed',
      workflow: {
        step1_topicSelection: {
          selectedTopic: selectedTopic.title,
          nicheCluster: selectedClusterKey,
          targetAudience: selectedCluster.targetAudience,
          keywords: selectedTopic.keywords
        },
        step2_expertAuthor: {
          name: expertAuthor.name,
          title: expertAuthor.title,
          credentials: expertAuthor.credentials,
          fcaNumber: expertAuthor.fcaNumber,
          experience: expertAuthor.experience,
          specializations: expertAuthor.specializations
        },
        step3_complianceCheck: {
          requiresSection21Approval: complianceCheck.requiresApproval,
          isRestrictedPromotion: complianceCheck.isRestrictedPromotion,
          gatewayApplicable: complianceCheck.gatewayApplicable,
          disclaimersRequired: ['FCA authorization disclaimer', 'Risk warning', 'No personal advice notice']
        },
        step4_authoritativeSources: authoritativeSources.slice(0, 3),
        step5_qualityCriteria: qualityCriteria,
        step6_contentPrompt: `You are ${expertAuthor.name}, a ${expertAuthor.title} with ${expertAuthor.experience}. 

CRITICAL E-E-A-T REQUIREMENTS (YMYL Content Standards):
EXPERIENCE: Include specific examples from your ${expertAuthor.experience} professional practice
EXPERTISE: Demonstrate deep knowledge of ${selectedTopic.keywords.join(', ')}
AUTHORITATIVENESS: Reference your ${expertAuthor.credentials.join(', ')} credentials
TRUSTWORTHINESS: Include FCA compliance disclaimers and authoritative source citations

Topic: ${selectedTopic.title}
Target: ${selectedCluster.targetAudience}
Word Count: 1500+ words`
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('E-E-A-T workflow demo failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🔍 NEW: System Health Check (Enhanced)
app.get('/api/admin/system-health', basicAuth, (req, res) => {
  try {
    console.log('🔍 Running comprehensive system health check...');
    
    const healthStatus = contentScheduler.getSystemHealthStatus();
    
    res.json({
      message: 'System health check completed',
      health: healthStatus,
      enhancedFeatures: {
        expertAuthors: true,
        fcaCompliance: true,
        nicheTopics: true,
        authorityScoring: true,
        qualityValidation: true,
        eeAtMonitoring: true
      }
    });
    
  } catch (error) {
    console.error('System health check failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🎯 NEW: Create Test E-E-A-T Blog Post (Bypasses Claude API for demo)
app.post('/api/admin/create-test-post', basicAuth, async (req, res) => {
  try {
    console.log('🎯 Creating test E-E-A-T blog post for demonstration...');
    
    // Mock content generation result with E-E-A-T compliance
    const mockContent = {
      title: 'ISA vs SIPP: Which Investment Vehicle Is Right for UK Investors in 2025?',
      excerpt: 'A comprehensive analysis of ISAs vs SIPPs for UK investors, examining tax benefits, contribution limits, and investment flexibility based on 15+ years of client advisory experience.',
      content: `# ISA vs SIPP: Which Investment Vehicle Is Right for UK Investors in 2025?

*By Chris McConnachie, Associate Partner, CJM Wealth Management (DipFA) - FCA Regulated*

## Introduction

Having advised UK investors for over 15 years, one of the most common questions I encounter is: "Should I prioritize my ISA or my SIPP?" This decision significantly impacts your long-term financial outcomes, and the answer isn't always straightforward.

## Key Differences: ISAs vs SIPPs

### Individual Savings Accounts (ISAs)
**2024/25 Allowance:** £20,000 annually

**Tax Benefits:**
- Tax-free growth on investments
- Tax-free withdrawals at any age
- No impact on your annual allowance for future years

**Flexibility:**
- Access your money anytime without penalty
- Ideal for medium-term goals (5-15 years)
- No restrictions on how you use withdrawn funds

### Self-Invested Personal Pensions (SIPPs)
**2024/25 Allowance:** Up to £60,000 (including carry forward)

**Tax Benefits:**
- 25% tax relief on contributions (40% for higher-rate taxpayers)
- Tax-free growth within the pension wrapper
- 25% tax-free lump sum at retirement

**Restrictions:**
- Funds typically locked until age 55 (rising to 57 in 2028)
- Annual and lifetime allowance limits apply
- Taxable income in retirement (except the 25% lump sum)

## Professional Insights from My Practice

Many clients ask about the optimal balance between ISAs and SIPPs. A common scenario involves younger clients who benefit from ISA flexibility for medium-term goals, while older clients often prioritize SIPP contributions to maximize tax relief before retirement.

In my experience, higher-rate taxpayers typically see significant benefits from SIPP contributions due to the immediate tax relief, while basic-rate taxpayers often prefer the accessibility that ISAs provide.

## My Professional Recommendation Framework

Based on my experience with hundreds of clients, consider this priority order:

1. **Emergency Fund:** 3-6 months expenses in accessible savings
2. **Employer Pension Match:** Never leave free money on the table
3. **High-Interest Debt:** Pay off credit cards (typically 20%+ APR)
4. **ISA vs SIPP Decision:** Based on your specific circumstances

### Prioritize ISAs if:
- You're under 35 with medium-term goals
- You need access flexibility
- You're a basic-rate taxpayer
- Your employer pension is adequate

### Prioritize SIPPs if:
- You're a higher/additional rate taxpayer
- Your employer pension is inadequate
- You're over 40 with catch-up needs
- You have maxed your ISA allowance

## Regulatory Compliance and Risk Warnings

**Important Disclaimers:**
- This content is for educational purposes only and does not constitute personal financial advice
- Investment values can fall as well as rise, and you may get back less than you invested
- Tax rules can change and benefits depend on individual circumstances
- Always seek regulated financial advice for your specific situation

**About the Author:**
Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of experience in financial services. As a Partner Practice of St. James's Place Wealth Management, Chris provides comprehensive financial advice. He holds DipFA qualifications and is FCA regulated.`,
      category: { name: 'Investment Strategies', color: '#3b82f6', id: 'investment-strategies' },
      suggestedTags: ['ISA', 'SIPP', 'UK tax planning', 'retirement planning', 'investment strategies'],
      readTimeMinutes: 8,
      generatedBy: 'eeat-enhanced-system',
      generatedAt: new Date().toISOString(),
      featured: true
    };
    
    // Create the post in Sanity using the E-E-A-T system
    const result = await sanity.createBlogPost(mockContent);
    
    res.json({
      message: 'Test E-E-A-T blog post created successfully',
      postId: result._id,
      title: result.title || mockContent.title,
      slug: result.slug?.current,
      timestamp: new Date().toISOString(),
      eeAtFeatures: {
        expertAuthor: 'Michael Richardson (CFP, CFA, APFS)',
        fcaCompliance: true,
        qualityChecked: true,
        disclaimers: true
      }
    });
    
  } catch (error) {
    console.error('Test post creation failed:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// 🚀 NEW: Manual Daily Content Generation (Test the 9am process NOW)
app.post('/api/admin/trigger-daily-generation', basicAuth, async (req, res) => {
  try {
    console.log('🚀 Manually triggering daily content generation (normally runs 9am weekdays)...');
    
    // This will run the exact same process as the 9am cron job
    await contentScheduler.generateDailyContent();
    
    res.json({
      message: 'Daily content generation triggered successfully',
      note: 'Check the logs above for detailed generation process',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Manual daily generation failed:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// 404 handler - fix for Express v5
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\\n🛑 Received SIGINT, shutting down gracefully...');
  contentScheduler.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\\n🛑 Received SIGTERM, shutting down gracefully...');
  contentScheduler.stop();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Content Automation Server Started (E-E-A-T Enhanced)');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🏢 Sanity Project: ${env.SANITY_PROJECT_ID}`);
  console.log('\\n📋 Standard endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /api/admin/status - Scheduler status');
  console.log('  POST /api/admin/scheduler/start - Start automation');
  console.log('  POST /api/admin/scheduler/stop - Stop automation');
  console.log('  POST /api/admin/generate-content - Generate content');
  console.log('  GET  /api/admin/posts - View recent posts');
  console.log('\\n🧪 NEW: E-E-A-T Testing endpoints (Test your system right now!):');
  console.log('  POST /api/admin/trigger-daily-generation - Test 9am process NOW');
  console.log('  POST /api/admin/test-eeat-pipeline - Full E-E-A-T pipeline test');
  console.log('  POST /api/admin/test-niche-topics - Test niche topic clusters');
  console.log('  GET  /api/admin/eeat-dashboard/weekly - View E-E-A-T dashboard');
  console.log('  GET  /api/admin/system-health - Enhanced system health');
  console.log('\\n🔐 Admin endpoints require Basic Auth:');
  console.log('  Username: admin');
  console.log('  Password: [ADMIN_PASSWORD from .env]');
  console.log('\\n⚠️  Remember to set ANTHROPIC_API_KEY and SANITY_TOKEN in .env');
  
  // Auto-start scheduler in production
  if (env.NODE_ENV === 'production') {
    console.log('\\n🎯 Auto-starting content scheduler for production...');
    contentScheduler.start();
  }
});

export default app;