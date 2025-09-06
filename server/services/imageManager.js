import { env } from '../config/environment.js';

class ImageManager {
  constructor() {
    // Unsplash Access Key (optional - can work without API key for basic usage)
    this.unsplashAccessKey = env.UNSPLASH_ACCESS_KEY;
    
    // Curated collection of financial/business images from Unsplash
    // These are verified to be appropriate and high-quality
    this.financialImages = {
      'investment-strategies': [
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop', // Charts/graphs
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop', // Stock market
        'https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=1200&h=600&fit=crop', // Investment concept
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop', // Financial growth
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop'  // Business meeting
      ],
      'retirement-planning': [
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop', // Healthcare/retirement
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop', // Planning/documents
        'https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=1200&h=600&fit=crop', // Family planning
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop', // Financial planning
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop'  // Senior planning
      ],
      'tax-optimization': [
        'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=600&fit=crop', // Tax documents
        'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&h=600&fit=crop', // Calculator/planning
        'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&h=600&fit=crop', // Tax forms
        'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=1200&h=600&fit=crop', // Business documents
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&h=600&fit=crop'  // Financial paperwork
      ],
      'market-insights': [
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop', // Market data
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop', // Economic trends
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop', // Analytics
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop', // Data visualization
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop'  // Financial charts
      ],
      'estate-planning': [
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop', // Legal documents
        'https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=1200&h=600&fit=crop', // Family legacy
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop', // Estate planning
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop', // Family consultation
        'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&h=600&fit=crop'  // Planning documents
      ],
      'financial-education': [
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop', // Learning/education
        'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=1200&h=600&fit=crop', // Financial literacy
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1200&h=600&fit=crop', // Education materials
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop', // Consultation/teaching
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop'  // Professional guidance
      ]
    };
    
    // Fallback generic financial images
    this.fallbackImages = [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop'
    ];
  }
  
  /**
   * Get appropriate image for blog post based on category and content
   * @param {Object} contentData - Blog post data
   * @returns {string} Image URL
   */
  getImageForPost(contentData) {
    const categoryId = contentData.category?.id || contentData.category?.slug || 'financial-education';
    const title = contentData.title?.toLowerCase() || '';
    const excerpt = contentData.excerpt?.toLowerCase() || '';
    const tags = (contentData.tags || []).map(tag => tag.toLowerCase());
    
    console.log(`🖼️ Selecting image for category: ${categoryId}`);
    
    // Get images for the specific category
    let categoryImages = this.financialImages[categoryId] || this.fallbackImages;
    
    // Smart selection based on content keywords
    const selectedImage = this.selectImageByKeywords(title, excerpt, tags, categoryImages);
    
    console.log(`✅ Selected image: ${selectedImage}`);
    return selectedImage;
  }
  
  /**
   * Intelligently select image based on keywords in content
   */
  selectImageByKeywords(title, excerpt, tags, categoryImages) {
    const content = `${title} ${excerpt} ${tags.join(' ')}`;
    
    // Define keyword-to-image mappings for more precise selection
    const keywordMappings = [
      {
        keywords: ['isa', 'sipp', 'pension', 'retirement', 'savings'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop'
      },
      {
        keywords: ['investment', 'portfolio', 'stocks', 'market'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop'
      },
      {
        keywords: ['tax', 'hmrc', 'capital gains', 'allowance'],
        image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=600&fit=crop'
      },
      {
        keywords: ['planning', 'strategy', 'advice', 'consultation'],
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop'
      },
      {
        keywords: ['analysis', 'data', 'charts', 'performance'],
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop'
      }
    ];
    
    // Find the best matching image based on keywords
    for (const mapping of keywordMappings) {
      if (mapping.keywords.some(keyword => content.includes(keyword))) {
        return mapping.image;
      }
    }
    
    // Fallback to random selection from category images
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }
  
  /**
   * Get a random image for a specific category
   * @param {string} category - Category slug
   * @returns {string} Image URL
   */
  getRandomImageForCategory(category) {
    const categoryImages = this.financialImages[category] || this.fallbackImages;
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }
  
  /**
   * Future: Search Unsplash API for specific images (requires API key)
   * This can be implemented later for more dynamic image selection
   */
  async searchUnsplashImages(query, category) {
    if (!this.unsplashAccessKey) {
      console.log('ℹ️ No Unsplash API key - using curated images');
      return this.getRandomImageForCategory(category);
    }
    
    try {
      // Future implementation with Unsplash API
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${this.unsplashAccessKey}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const image = data.results[0];
        return `${image.urls.regular}&w=1200&h=600&fit=crop`;
      }
      
    } catch (error) {
      console.error('❌ Unsplash API error:', error);
    }
    
    // Fallback to curated images
    return this.getRandomImageForCategory(category);
  }
  
  /**
   * Validate that an image URL is accessible
   * @param {string} imageUrl - Image URL to validate
   * @returns {Promise<boolean>} Whether image is accessible
   */
  async validateImageUrl(imageUrl) {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn(`⚠️ Image validation failed for ${imageUrl}:`, error);
      return false;
    }
  }
  
  /**
   * Get image attribution text for legal compliance
   * @param {string} imageUrl - Unsplash image URL
   * @returns {string} Attribution text
   */
  getImageAttribution(imageUrl) {
    if (imageUrl.includes('unsplash.com')) {
      return 'Photo by [Photographer Name] on Unsplash';
    }
    return null;
  }
}

export default ImageManager;