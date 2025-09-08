import { createClient } from '@sanity/client';
import { env } from '../config/environment.js';
import ExpertAuthorManager from './expertAuthorManager.js';
import ImageManager from './imageManager.js';
import NetlifyBuildHook from './netlifyBuildHook.js';

class SanityIntegration {
  constructor() {
    this.client = createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      useCdn: false,
      apiVersion: env.SANITY_API_VERSION,
      token: env.SANITY_TOKEN, // Write token required for creating content
    });
    
    // Initialize expert author manager for E-E-A-T compliance
    this.expertAuthorManager = new ExpertAuthorManager();
    
    // Initialize image manager for automated image selection
    this.imageManager = new ImageManager();
    
    // Initialize Netlify build hook for triggering site rebuilds after new posts
    this.netlifyBuildHook = new NetlifyBuildHook();
  }

  /**
   * Create a new blog post in Sanity CMS
   * @param {Object} postData - Generated blog post data
   * @returns {Promise<Object>} Created document
   */
  async createBlogPost(postData) {
    try {
      console.log(`📝 Creating blog post in Sanity: ${postData.title}`);
      
      // Get or create expert author
      const author = await this.getOrCreateExpertAuthor(postData.category);
      
      // Get appropriate featured image for the post
      const featuredImage = this.imageManager.getImageForPost(postData);
      console.log(`📸 Selected featured image: ${featuredImage}`);

      // Create blog post document (compatible with existing schema)
      const blogPost = {
        _type: 'blogPost',
        title: postData.title,
        slug: {
          _type: 'slug',
          current: this.generateSlug(postData.title)
        },
        excerpt: postData.excerpt,
        body: this.convertMarkdownToPortableText(postData.content),
        publishedAt: postData.scheduledDate || new Date().toISOString(),
        // Schema-compliant fields only
        tags: postData.suggestedTags || [],
        featured: postData.featured || false,
        readTime: postData.readTimeMinutes || 5,
        author: {
          _type: 'reference',
          _ref: author._id
        },
        // Add featured image as external URL reference
        // Note: For external URLs, we store as a custom field or skip for now
        // Sanity image assets expect uploaded images, not external URLs
        featuredImageUrl: featuredImage // Custom field for external image URL
      };

      // Create the document
      const result = await this.client.create(blogPost);
      console.log(`✅ Blog post created: ${result._id}`);
      
      // Trigger Netlify build to generate static HTML with proper meta tags
      try {
        const postSlug = this.generateSlug(postData.title);
        console.log(`🔄 Triggering Netlify build for new post: ${postSlug}`);
        
        const buildTriggered = await this.netlifyBuildHook.triggerBuildForPost({
          title: postData.title,
          slug: postSlug
        });
        
        if (buildTriggered) {
          console.log(`🎉 Netlify build triggered successfully for ${postSlug}`);
          console.log(`🔗 Static HTML will be generated with proper meta tags for LinkedIn/social sharing`);
          console.log(`📅 Build typically completes in 2-3 minutes`);
        } else {
          console.warn(`⚠️  Netlify build trigger failed for ${postSlug} - may need manual rebuild`);
          if (!this.netlifyBuildHook.isConfigured()) {
            console.warn('📝 NETLIFY_BUILD_HOOK_URL not configured in environment variables');
          }
        }
      } catch (buildError) {
        console.warn(`⚠️  Netlify build trigger error for ${postSlug}:`, buildError.message);
        console.warn('🔧 Post created successfully, but static HTML generation may be delayed');
      }
      
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
   * Get or create expert author based on content category for E-E-A-T compliance
   * @param {Object} category - Content category object
   * @returns {Promise<Object>} Expert author document
   */
  async getOrCreateExpertAuthor(category) {
    // Get appropriate expert author profile
    const expertProfile = this.expertAuthorManager.getAuthorForCategory(category);
    
    if (!expertProfile) {
      throw new Error(`No expert author found for category: ${category.name}`);
    }
    
    // Check if author already exists in Sanity
    const existingAuthor = await this.client.fetch(
      `*[_type == "author" && name == $name][0]`,
      { name: expertProfile.name }
    );
    
    if (existingAuthor) {
      return existingAuthor;
    }
    
    // Create new expert author with existing schema
    console.log(`📝 Creating expert author: ${expertProfile.name}`);
    
    const authorData = {
      _type: 'author',
      name: expertProfile.name,
      slug: {
        _type: 'slug',
        current: this.generateSlug(expertProfile.name)
      },
      role: expertProfile.title,
      bio: this.expertAuthorManager.createEEATBio(expertProfile),
      // Add social links if LinkedIn available
      socialLinks: expertProfile.linkedIn ? [
        {
          platform: 'LinkedIn',
          url: expertProfile.linkedIn
        }
      ] : []
    };
    
    const author = await this.client.create(authorData);
    
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
    // Convert markdown to portable text blocks for Sanity
    const lines = markdown.split('\n');
    const blocks = [];
    let currentParagraph = '';
    
    for (const line of lines) {
      // Handle headings
      if (line.startsWith('# ')) {
        if (currentParagraph) {
          blocks.push({
            _type: 'block',
            _key: this.generateKey(),
            style: 'normal',
            children: [{ _type: 'span', text: currentParagraph.trim() }]
          });
          currentParagraph = '';
        }
        blocks.push({
          _type: 'block',
          _key: this.generateKey(),
          style: 'h1',
          children: [{ _type: 'span', text: line.replace('# ', '').trim() }]
        });
      } else if (line.startsWith('## ')) {
        if (currentParagraph) {
          blocks.push({
            _type: 'block',
            _key: this.generateKey(),
            style: 'normal',
            children: [{ _type: 'span', text: currentParagraph.trim() }]
          });
          currentParagraph = '';
        }
        blocks.push({
          _type: 'block',
          _key: this.generateKey(),
          style: 'h2',
          children: [{ _type: 'span', text: line.replace('## ', '').trim() }]
        });
      } else if (line.startsWith('### ')) {
        if (currentParagraph) {
          blocks.push({
            _type: 'block',
            _key: this.generateKey(),
            style: 'normal',
            children: [{ _type: 'span', text: currentParagraph.trim() }]
          });
          currentParagraph = '';
        }
        blocks.push({
          _type: 'block', 
          _key: this.generateKey(),
          style: 'h3',
          children: [{ _type: 'span', text: line.replace('### ', '').trim() }]
        });
      } else if (line.trim() === '') {
        // Empty line - end current paragraph
        if (currentParagraph) {
          blocks.push({
            _type: 'block',
            _key: this.generateKey(),
            style: 'normal',
            children: [{ _type: 'span', text: currentParagraph.trim() }]
          });
          currentParagraph = '';
        }
      } else {
        // Add to current paragraph
        currentParagraph += (currentParagraph ? ' ' : '') + line.trim();
      }
    }
    
    // Add any remaining paragraph
    if (currentParagraph) {
      blocks.push({
        _type: 'block',
        _key: this.generateKey(),
        style: 'normal',
        children: [{ _type: 'span', text: currentParagraph.trim() }]
      });
    }
    
    return blocks.length > 0 ? blocks : [{
      _type: 'block',
      _key: this.generateKey(),
      style: 'normal',
      children: [{ _type: 'span', text: markdown }]
    }];
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
        excerpt,
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

  /**
   * Determine content type for compliance purposes
   * @param {Object} category - Content category
   * @returns {string} Content type classification
   */
  getContentType(category) {
    const typeMap = {
      'investment-strategies': 'investment',
      'investment': 'investment',
      'retirement-planning': 'pension',
      'retirement': 'pension', 
      'tax-optimization': 'tax',
      'tax': 'tax',
      'market-insights': 'general',
      'market': 'general',
      'estate-planning': 'estate',
      'estate': 'estate',
      'financial-education': 'general',
      'education': 'general'
    };

    return typeMap[category.id] || typeMap[category.slug] || 'general';
  }

  /**
   * Determine if content requires FCA approval (Section 21 compliance)
   * @param {Object} category - Content category
   * @returns {boolean} Whether FCA approval is required
   */
  requiresFCAApproval(category) {
    // Content that invites or induces engagement with regulated products
    const regulatedCategories = [
      'investment-strategies',
      'investment', 
      'retirement-planning',
      'retirement'
    ];

    return regulatedCategories.includes(category.id) || regulatedCategories.includes(category.slug);
  }

  /**
   * Add compliance disclaimers to content
   * @param {string} content - Original content
   * @param {Array} disclaimers - Array of disclaimer strings
   * @returns {string} Content with disclaimers appended
   */
  addComplianceDisclaimers(content, disclaimers) {
    const disclaimerSection = `

## Important Disclaimers

${disclaimers.map(disclaimer => `• ${disclaimer}`).join('\n')}

---

*This article was written by a qualified financial professional. The author holds relevant professional qualifications and is authorized to provide financial guidance in the UK. However, this content is for educational purposes only and should not be considered as personalized financial advice.*`;

    return content + disclaimerSection;
  }

  /**
   * Enhanced convertMarkdownToPortableText with compliance disclaimers
   */
  convertMarkdownToPortableTextWithCompliance(markdown, disclaimers = []) {
    // Add disclaimers to content before conversion
    const contentWithDisclaimers = disclaimers.length > 0 ? 
      this.addComplianceDisclaimers(markdown, disclaimers) : markdown;
      
    return this.convertMarkdownToPortableText(contentWithDisclaimers);
  }
}

export default SanityIntegration;