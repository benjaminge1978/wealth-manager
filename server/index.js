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
  console.log('🚀 Content Automation Server Started');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🏢 Sanity Project: ${env.SANITY_PROJECT_ID}`);
  console.log('\\n📋 Available endpoints:');
  console.log('  GET  /health - Health check');
  console.log('  GET  /api/admin/status - Scheduler status');
  console.log('  POST /api/admin/scheduler/start - Start automation');
  console.log('  POST /api/admin/scheduler/stop - Stop automation');
  console.log('  POST /api/admin/generate-content - Generate content');
  console.log('  GET  /api/admin/posts - View recent posts');
  console.log('  GET  /api/admin/test-news - Test news aggregation');
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