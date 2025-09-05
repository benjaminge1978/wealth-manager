import { createClient } from '@sanity/client';
import { env } from '../config/environment.js';

class SanityIntegration {
  constructor() {
    this.client = createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false,
      apiVersion: env.SANITY_API_VERSION,
      token: env.SANITY_TOKEN, // Write token required for creating content
    });
  }

  /**
   * Create a new blog post in Sanity CMS
   * @param {Object} postData - Generated blog post data
   * @returns {Promise<Object>} Created document
   */
  async createBlogPost(postData) {
    try {
      console.log(`📝 Creating blog post in Sanity: ${postData.title}`);
      
      // Get or create author (use default system author for automated posts)
      const author = await this.getOrCreateAuthor();
      
      // Get or create category
      const category = await this.getOrCreateCategory(postData.category);
      
      // Create the blog post document
      const blogPost = {
        _type: 'blogPost',
        title: postData.title,
        slug: {
          _type: 'slug',
          current: this.generateSlug(postData.title)
        },
        excerpt: postData.excerpt,
        body: this.convertMarkdownToPortableText(postData.content),
        author: {
          _type: 'reference',
          _ref: author._id
        },
        categories: [{
          _type: 'reference', 
          _ref: category._id
        }],
        tags: postData.suggestedTags || [],
        publishedAt: postData.scheduledDate || new Date().toISOString(),
        readTime: postData.readTimeMinutes,
        featured: postData.featured || false,
        // Add metadata for tracking automated content
        _metadata: {
          generatedBy: postData.generatedBy || 'claude-automation',
          generatedAt: postData.generatedAt,
          automationVersion: '1.0'
        }
      };

      // Create the document
      const result = await this.client.create(blogPost);
      console.log(`✅ Blog post created: ${result._id}`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Failed to create blog post in Sanity:', error);
      throw error;
    }
  }

  /**
   * Schedule a blog post for future publication
   */
  async schedulePost(postData, publishDate) {
    const scheduledPost = {
      ...postData,
      scheduledDate: publishDate,
      status: 'scheduled'
    };
    
    return await this.createBlogPost(scheduledPost);
  }

  /**
   * Get existing author or create default automation author
   */
  async getOrCreateAuthor() {
    // First, try to find existing automation author
    const existingAuthor = await this.client.fetch(
      `*[_type == "author" && name == "AI Content Team"][0]`
    );
    
    if (existingAuthor) {
      return existingAuthor;
    }
    
    // Create default automation author
    console.log('📝 Creating default automation author');
    
    const author = await this.client.create({
      _type: 'author',
      name: 'AI Content Team',
      bio: 'Automated financial content generated using advanced AI, reviewed by qualified financial advisers.',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-ai-content-avatar' // You'd need to upload a default avatar
        }
      }
    });
    
    return author;
  }

  /**
   * Get existing category or create if needed
   */
  async getOrCreateCategory(categoryData) {
    // Try to find existing category
    const existing = await this.client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: categoryData.name }
    );
    
    if (existing) {
      return existing;
    }
    
    // Create new category
    console.log(`📝 Creating category: ${categoryData.name}`);
    
    const category = await this.client.create({
      _type: 'category',
      title: categoryData.name,
      description: `Automated content category for ${categoryData.name}`,
      color: categoryData.color || '#3b82f6'
    });
    
    return category;
  }

  /**
   * Convert markdown content to Sanity's Portable Text format
   * This is a simplified converter - you might want to use a proper markdown-to-portable-text library
   */
  convertMarkdownToPortableText(markdown) {
    // For now, create a simple block structure
    // In production, you'd use @sanity/block-tools or similar
    
    const paragraphs = markdown.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map(paragraph => {
      // Handle headings
      if (paragraph.startsWith('## ')) {
        return {
          _type: 'block',
          _key: this.generateKey(),
          style: 'h2',
          children: [{ _type: 'span', text: paragraph.replace('## ', '') }]
        };
      }
      
      if (paragraph.startsWith('### ')) {
        return {
          _type: 'block', 
          _key: this.generateKey(),
          style: 'h3',
          children: [{ _type: 'span', text: paragraph.replace('### ', '') }]
        };
      }
      
      // Regular paragraphs
      return {
        _type: 'block',
        _key: this.generateKey(),
        style: 'normal',
        children: [{ _type: 'span', text: paragraph }]
      };
    });
  }

  /**
   * Generate URL-friendly slug from title
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Generate unique key for Sanity blocks
   */
  generateKey() {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Get scheduled posts
   */
  async getScheduledPosts() {
    return await this.client.fetch(
      `*[_type == "blogPost" && publishedAt > now()] | order(publishedAt asc)`
    );
  }

  /**
   * Get recent posts for dashboard
   */
  async getRecentPosts(limit = 10) {
    return await this.client.fetch(
      `*[_type == "blogPost"] | order(_createdAt desc)[0...${limit}]{
        _id,
        title,
        slug,
        publishedAt,
        _createdAt,
        featured,
        author->{name}
      }`
    );
  }

  /**
   * Delete a post (for testing/cleanup)
   */
  async deletePost(postId) {
    return await this.client.delete(postId);
  }

  /**
   * Update post status or content
   */
  async updatePost(postId, updates) {
    return await this.client.patch(postId).set(updates).commit();
  }
}

export default SanityIntegration;