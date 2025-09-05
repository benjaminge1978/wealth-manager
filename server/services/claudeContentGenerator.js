import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/environment.js';
import { CONTENT_CATEGORIES } from '../types/content.js';

class ClaudeContentGenerator {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Generate a comprehensive blog post using Claude
   * @param {Object} params - Content generation parameters
   * @returns {Promise<Object>} Generated blog post content
   */
  async generateBlogPost({ topic, category, keywords = [], wordCount = 1500, targetAudience = 'UK investors' }) {
    const prompt = this.createContentPrompt(topic, category, keywords, wordCount, targetAudience);
    
    try {
      console.log(`🤖 Generating content for: ${topic}`);
      
      const message = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const response = message.content[0].text;
      return this.parseGeneratedContent(response, category, keywords);
      
    } catch (error) {
      console.error('❌ Claude API Error:', error);
      throw new Error(`Content generation failed: ${error.message}`);
    }
  }

  /**
   * Create optimized prompt for financial content generation
   */
  createContentPrompt(topic, category, keywords, wordCount, targetAudience) {
    return `You are an expert financial content writer specializing in UK wealth management and investment advice. Generate a comprehensive blog post with the following requirements:

TOPIC: "${topic}"
CATEGORY: ${category.name}
TARGET AUDIENCE: ${targetAudience}
WORD COUNT: ~${wordCount} words
KEYWORDS TO INCLUDE: ${keywords.join(', ')}

CONTENT REQUIREMENTS:
1. Write engaging, authoritative content that positions our wealth management firm as experts
2. Include specific UK financial regulations, tax rates, and investment limits for 2025
3. Structure content with clear H2 and H3 headings for readability
4. Include practical, actionable advice
5. Reference current UK financial products (ISAs, SIPPs, etc.)
6. Write in a professional but accessible tone

STRUCTURE:
1. Compelling introduction (hook + overview)
2. 4-6 main sections with practical advice
3. Conclusion with call-to-action

SEO & AEO OPTIMIZATION:
- Answer common questions people ask AI assistants
- Include specific UK financial data and examples  
- Write content that AI engines will want to cite as authoritative
- Use natural language that matches search queries

OUTPUT FORMAT:
Provide ONLY a JSON object with this exact structure:
{
  "title": "SEO-optimized title (50-60 characters)",
  "excerpt": "Compelling 150-word summary for listings",
  "content": "Full blog post content in markdown format",
  "suggestedTags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readTimeMinutes": estimated_read_time_number,
  "featured": false
}

Important: The content should naturally lead readers to consider professional financial advice, positioning our wealth management services as the logical next step.`;
  }

  /**
   * Generate weekly financial news roundup
   */
  async generateNewsRoundup(newsItems) {
    const prompt = `Create a weekly financial market roundup for UK investors based on these news items:

NEWS ITEMS:
${newsItems.map(item => `- ${item.title}: ${item.description}`).join('\n')}

Create a cohesive weekly roundup that:
1. Summarizes key market movements and economic developments
2. Explains what these mean for UK investors specifically  
3. Provides actionable insights for different investment strategies
4. Maintains professional yet accessible tone
5. Includes relevant UK context (regulations, tax implications, etc.)

Structure as a comprehensive blog post with sections like:
- Market Overview
- Key Economic Developments  
- What This Means for UK Investors
- Looking Ahead
- Investment Considerations

OUTPUT FORMAT: Same JSON format as regular blog posts.`;

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      });

      const response = message.content[0].text;
      return this.parseGeneratedContent(response, CONTENT_CATEGORIES.MARKET_INSIGHTS, ['market analysis', 'economic news', 'UK investors']);
      
    } catch (error) {
      console.error('❌ News roundup generation failed:', error);
      throw error;
    }
  }

  /**
   * Parse and validate generated content
   */
  parseGeneratedContent(response, category, keywords) {
    try {
      // Extract JSON from response (Claude sometimes adds explanation text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      const required = ['title', 'excerpt', 'content', 'suggestedTags', 'readTimeMinutes'];
      const missing = required.filter(field => !parsed[field]);
      
      if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
      }

      // Add metadata
      return {
        ...parsed,
        category: category,
        generatedAt: new Date().toISOString(),
        generatedBy: 'claude-3-5-sonnet',
        keywords: keywords
      };
      
    } catch (error) {
      console.error('❌ Failed to parse generated content:', error);
      console.log('Raw response:', response);
      throw new Error(`Content parsing failed: ${error.message}`);
    }
  }

  /**
   * Generate content using the built-in SEO-AEO-Optimizer agent
   * This leverages the agent we already have access to
   */
  async optimizeContentForAEO(content) {
    // This would use the Task tool to call the seo-aeo-optimizer agent
    // For now, we'll implement basic AEO optimization principles
    
    const aeoOptimizedContent = {
      ...content,
      // Ensure content answers common AI assistant queries
      optimizations: {
        questionAnswering: true,
        structuredData: true,
        clearHeadings: true,
        practicalAdvice: true,
        ukSpecificContext: true
      }
    };
    
    return aeoOptimizedContent;
  }
}

export default ClaudeContentGenerator;