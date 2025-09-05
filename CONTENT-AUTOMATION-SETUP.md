# Content Automation System - Setup Guide

## 🚀 Ultra-Cost-Effective Automated Content System

This system generates **daily financial blog posts** with **AEO-optimized FAQ sections** for under £150/month, leveraging your existing infrastructure.

### ✅ What's Already Built (90% Complete!)
- Production blog system with search/filtering
- 237 pre-written FAQs with smart matching algorithm
- FAQ Schema markup for AI citations (ChatGPT, Perplexity, Claude)
- Sanity CMS with complete blog schemas
- Netlify hosting with security headers

---

## 📋 Quick Start (5 Minutes)

### 1. Environment Setup

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add these **required** values:

```bash
# Get from https://console.anthropic.com/
ANTHROPIC_API_KEY=your_claude_api_key_here

# Get from https://sanity.io/manage/ -> Your Project -> API -> Tokens
SANITY_TOKEN=your_sanity_write_token_here
```

### 2. Start the Automation Server

```bash
# Start the content automation server
npm run server

# OR for development with auto-restart
npm run server:dev
```

### 3. Access Admin Dashboard

Open: `http://localhost:3001/api/admin/status`

**Login:** 
- Username: `admin` 
- Password: `changeme123` (change in .env: `ADMIN_PASSWORD`)

---

## 🎯 How It Works

### Daily Content Schedule
- **Monday-Thursday 9:00 AM**: Automated blog posts
  - Monday: Investment education
  - Tuesday: Retirement planning
  - Wednesday: Tax optimization  
  - Thursday: Market insights
- **Friday 9:00 AM**: Weekly financial news roundup

### AEO Optimization
Every generated blog post automatically includes:
- ✅ **6 relevant FAQs** from your 237-question database
- ✅ **Schema markup** for AI search engines
- ✅ **UK-specific financial content** that AI engines will cite
- ✅ **Clear structure** optimized for ChatGPT/Perplexity responses

---

## 🛠 API Endpoints

### Control the System
```bash
# Start automation
curl -X POST http://localhost:3001/api/admin/scheduler/start \
  -u admin:changeme123

# Stop automation  
curl -X POST http://localhost:3001/api/admin/scheduler/stop \
  -u admin:changeme123

# Check status
curl http://localhost:3001/api/admin/status -u admin:changeme123
```

### Manual Content Generation
```bash
# Generate a blog post now
curl -X POST http://localhost:3001/api/admin/generate-content \
  -u admin:changeme123 \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "How to choose between ISA and pension contributions",
    "category": "RETIREMENT",
    "options": {"wordCount": 1500}
  }'
```

### Test the System
```bash
# Test news aggregation
curl http://localhost:3001/api/admin/test-news -u admin:changeme123

# Test content generation
curl -X POST http://localhost:3001/api/admin/test-content \
  -u admin:changeme123 \
  -H "Content-Type: application/json" \
  -d '{"topic": "Understanding UK index funds"}'
```

---

## 💰 Cost Breakdown

| Service | Monthly Cost | Usage |
|---------|-------------|--------|
| **Claude API** | £20-50 | ~150 posts/month |
| **Existing Infrastructure** | £0 | Netlify + Sanity already paid |
| **News RSS Feeds** | £0 | Free tier initially |
| **Social Media** | £0-30 | Start free, upgrade later |
| **TOTAL** | **£20-80/month** | vs £500-4000 in original plan |

---

## 📊 Admin Dashboard Features

### Content Management
- View recent posts and scheduled content
- Generate content on-demand
- Monitor automation status
- Test news aggregation and content generation

### Monitoring  
- Scheduler status and next run times
- Content generation success/failure logs
- FAQ integration verification
- AEO optimization checks

---

## 🔧 Configuration Options

### Content Frequency
```bash
# .env file
POSTS_PER_WEEK=5        # Monday-Friday posting
CONTENT_GENERATION_TIME=09:00  # 9 AM generation time
```

### Content Categories
The system rotates through:
- Investment Strategies
- Retirement Planning  
- Tax Optimization
- Market Insights
- Estate Planning
- Financial Education

### FAQ Integration
- **Automatic matching**: Each post gets 6 relevant FAQs
- **Schema markup**: Optimized for AI citations  
- **237 pre-written FAQs**: Covering all financial topics
- **UK-specific**: Tailored for UK investors

---

## 🚀 Production Deployment

### 1. Server Deployment (Recommended: Railway/Render)

```bash
# Build for production
npm run build

# Set production environment
NODE_ENV=production npm run server
```

### 2. Environment Variables for Production
```bash
NODE_ENV=production
ADMIN_PASSWORD=secure_random_password_here
# ... other variables from .env.example
```

### 3. Auto-Start Automation
In production, the scheduler auto-starts when `NODE_ENV=production`

---

## 🔍 Troubleshooting

### Common Issues

**❌ "Missing ANTHROPIC_API_KEY"**
- Get your API key from https://console.anthropic.com/
- Add to `.env` file: `ANTHROPIC_API_KEY=your_key_here`

**❌ "Failed to create blog post in Sanity"**
- Check your `SANITY_TOKEN` has **write permissions**
- Verify `SANITY_PROJECT_ID` matches your project

**❌ "News aggregation failed"**
- RSS feeds occasionally timeout - this is normal
- System will retry on next schedule

### Debug Mode
```bash
# Run with detailed logging
DEBUG=* npm run server:dev
```

---

## 📈 Next Steps

### Phase 1 Complete ✅
- [x] Claude API integration
- [x] Sanity CMS integration  
- [x] RSS news aggregation
- [x] Automated scheduling
- [x] FAQ integration with schema markup

### Phase 2 (Optional - Week 2)
- [ ] Simple admin web dashboard 
- [ ] Social media auto-posting
- [ ] Email newsletter integration

### Phase 3 (Optional - When profitable)
- [ ] Premium news APIs (EODHD, MarketAux)
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 🎉 Success Metrics

**Within 3 months, expect:**
- 🎯 **Daily fresh content** on your site
- 📈 **Improved AEO citations** in AI search results
- 🔍 **Better SEO rankings** for long-tail financial queries  
- 💼 **More qualified leads** from educational content
- ⏰ **90% time savings** vs manual content creation

**The system leverages your existing £1000s investment in blog infrastructure and FAQs, making it incredibly cost-effective!**

---

## 🆘 Support

- **Documentation**: This file + inline code comments
- **Testing**: Use the `/api/admin/test-*` endpoints  
- **Monitoring**: Check `/api/admin/status` for system health
- **Logs**: Server outputs detailed logs for debugging

**Remember:** Start with the free tier and scale up as the system proves ROI! 🚀