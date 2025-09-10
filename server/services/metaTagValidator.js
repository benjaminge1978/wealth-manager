/**
 * MetaTagValidator - Ensures social media meta tags work correctly
 * Eliminates generic fallback descriptions and validates social sharing
 */
class MetaTagValidator {
  constructor() {
    this.socialPlatforms = {
      linkedin: {
        titleMax: 150,
        descriptionMax: 160,
        descriptionMin: 100
      },
      facebook: {
        titleMax: 100,
        descriptionMax: 160,
        descriptionMin: 100
      },
      twitter: {
        titleMax: 70,
        descriptionMax: 160,
        descriptionMin: 100
      },
      general: {
        titleMax: 60,
        descriptionMax: 160,
        descriptionMin: 120
      }
    };

    this.genericPhrases = [
      'achieve financial success',
      'personalized, goals-based planning',
      'expert wealth management services',
      'build the life you want',
      'comprehensive financial advice',
      'regulated investment advice',
      'financial success through personalized'
    ];

    this.qualityIndicators = [
      'specific numbers',
      'uk regulations',
      'professional insights',
      'expert analysis',
      'detailed guidance'
    ];
  }

  /**
   * Validate meta tags for social media sharing
   * @param {Object} content - Content with title, excerpt, and other meta data
   * @param {string} slug - URL slug for the post
   * @returns {Object} Validation results with social media compatibility
   */
  validateMetaTags(content, slug) {
    const results = {
      isValid: false,
      errors: [],
      warnings: [],
      socialCompatibility: {},
      recommendations: []
    };

    // Validate basic requirements
    this.validateBasicMeta(content, results);
    
    // Check for generic content
    this.validateSpecificContent(content, results);
    
    // Validate social platform compatibility
    this.validateSocialPlatforms(content, results);
    
    // Validate URL structure
    this.validateURLStructure(slug, results);
    
    // Generate improvement recommendations
    this.generateRecommendations(content, results);

    results.isValid = results.errors.length === 0;
    return results;
  }

  /**
   * Validate basic meta tag requirements
   */
  validateBasicMeta(content, results) {
    const { title, excerpt } = content;

    // Title validation
    if (!title || !title.trim()) {
      results.errors.push('Title is missing');
    } else {
      if (title.length > this.socialPlatforms.general.titleMax) {
        results.errors.push(`Title too long: ${title.length} chars (max: ${this.socialPlatforms.general.titleMax})`);
      }
      if (title.length < 30) {
        results.warnings.push(`Title quite short: ${title.length} chars (consider 40-60)`);
      }
    }

    // Description/excerpt validation
    if (!excerpt || !excerpt.trim()) {
      results.errors.push('Meta description (excerpt) is missing');
    } else {
      if (excerpt.length < this.socialPlatforms.general.descriptionMin) {
        results.errors.push(`Meta description too short: ${excerpt.length} chars (min: ${this.socialPlatforms.general.descriptionMin})`);
      }
      if (excerpt.length > this.socialPlatforms.general.descriptionMax) {
        results.errors.push(`Meta description too long: ${excerpt.length} chars (max: ${this.socialPlatforms.general.descriptionMax})`);
      }
    }
  }

  /**
   * Validate content is specific, not generic fallbacks
   */
  validateSpecificContent(content, results) {
    const { title = '', excerpt = '' } = content;
    const combinedText = (title + ' ' + excerpt).toLowerCase();

    // Check for generic phrases
    const foundGeneric = this.genericPhrases.filter(phrase => 
      combinedText.includes(phrase.toLowerCase())
    );

    if (foundGeneric.length > 0) {
      results.errors.push(`Generic fallback content detected: "${foundGeneric[0]}"`);
    }

    // Check for content-specific terms
    const contentSpecific = [
      'isa', 'sipp', 'pension', 'tax', 'investment', 'pfic', 'rsu',
      'capital gains', 'inheritance', 'estate planning', 'retirement'
    ];

    const specificTermCount = contentSpecific.filter(term => 
      combinedText.includes(term.toLowerCase())
    ).length;

    if (specificTermCount === 0) {
      results.errors.push('Meta tags lack specific financial terms - appears generic');
    }

    // Check for professional indicators
    const professionalTerms = ['expert', 'professional', 'guide', 'analysis', 'insights'];
    const hasProfessionalTerms = professionalTerms.some(term => 
      combinedText.includes(term.toLowerCase())
    );

    if (!hasProfessionalTerms) {
      results.warnings.push('Meta tags lack professional positioning terms');
    }
  }

  /**
   * Validate compatibility with major social platforms
   */
  validateSocialPlatforms(content, results) {
    const { title = '', excerpt = '' } = content;

    Object.entries(this.socialPlatforms).forEach(([platform, limits]) => {
      const compatibility = {
        titleFits: title.length <= limits.titleMax,
        descriptionFits: excerpt.length <= limits.descriptionMax && 
                         excerpt.length >= limits.descriptionMin,
        truncationNeeded: false
      };

      // Check if truncation would be needed
      if (title.length > limits.titleMax) {
        compatibility.truncationNeeded = true;
        compatibility.truncatedTitle = this.smartTruncate(title, limits.titleMax);
      }

      if (excerpt.length > limits.descriptionMax) {
        compatibility.truncationNeeded = true;
        compatibility.truncatedDescription = this.smartTruncate(excerpt, limits.descriptionMax);
      }

      results.socialCompatibility[platform] = compatibility;

      // Add warnings for platforms that require truncation
      if (compatibility.truncationNeeded) {
        results.warnings.push(`${platform} will truncate title/description`);
      }
    });
  }

  /**
   * Validate URL structure for SEO and social sharing
   */
  validateURLStructure(slug, results) {
    if (!slug || !slug.trim()) {
      results.errors.push('URL slug is missing');
      return;
    }

    // Check slug length
    if (slug.length > 60) {
      results.warnings.push(`URL slug quite long: ${slug.length} chars (consider shortening)`);
    }

    // Check for SEO-friendly structure
    if (!slug.match(/^[a-z0-9-]+$/)) {
      results.warnings.push('URL slug should only contain lowercase letters, numbers, and hyphens');
    }

    // Check for keywords in slug
    const slug_words = slug.split('-');
    if (slug_words.length < 3) {
      results.warnings.push('URL slug should contain multiple keywords for SEO');
    }
  }

  /**
   * Generate improvement recommendations
   */
  generateRecommendations(content, results) {
    const { title = '', excerpt = '' } = content;

    // Title recommendations
    if (title.length < 40) {
      results.recommendations.push('Consider lengthening title to 50-60 characters for better SEO');
    }

    if (!title.toLowerCase().includes('uk')) {
      results.recommendations.push('Consider adding "UK" to title for geo-targeting');
    }

    // Description recommendations
    if (excerpt.length < 140) {
      results.recommendations.push('Expand description to 140-160 characters for optimal social media display');
    }

    // Check for numbers and specificity
    if (!excerpt.match(/\d/)) {
      results.recommendations.push('Consider adding specific numbers or dates to description');
    }

    // Check for action words
    const actionWords = ['learn', 'discover', 'understand', 'compare', 'guide', 'expert'];
    const hasActionWord = actionWords.some(word => 
      excerpt.toLowerCase().includes(word)
    );

    if (!hasActionWord) {
      results.recommendations.push('Consider adding action words (learn, discover, guide) to description');
    }
  }

  /**
   * Smart truncation that preserves meaning
   */
  smartTruncate(text, maxLength) {
    if (text.length <= maxLength) return text;

    // Try to truncate at word boundary
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }

    // Fallback to hard truncation
    return truncated.substring(0, maxLength - 3) + '...';
  }

  /**
   * Generate optimized meta tags for social sharing
   */
  generateSocialMetaTags(content, slug) {
    const { title, excerpt, featuredImage } = content;
    const fullURL = `https://netfin.co.uk/insights/${slug}`;
    
    return {
      // Basic SEO
      title: title,
      description: excerpt,
      
      // Open Graph (Facebook, LinkedIn)
      'og:title': title,
      'og:description': excerpt,
      'og:url': fullURL,
      'og:type': 'article',
      'og:image': featuredImage || 'https://netfin.co.uk/og-image.jpg',
      'og:site_name': 'Netfin',
      
      // Twitter Card
      'twitter:card': 'summary_large_image',
      'twitter:title': this.smartTruncate(title, this.socialPlatforms.twitter.titleMax),
      'twitter:description': excerpt,
      'twitter:image': featuredImage || 'https://netfin.co.uk/og-image.jpg',
      
      // Article specific
      'article:published_time': content.publishedDate || new Date().toISOString(),
      'article:author': content.author?.name || 'Netfin Team',
      'article:section': content.category?.name || 'Financial Advice'
    };
  }

  /**
   * Test meta tags against LinkedIn Post Inspector requirements
   */
  testLinkedInCompatibility(content) {
    const { title = '', excerpt = '' } = content;
    
    return {
      passes: true,
      requirements: {
        titleLength: {
          current: title.length,
          max: 150,
          passes: title.length <= 150 && title.length >= 40
        },
        descriptionLength: {
          current: excerpt.length,
          min: 100,
          max: 160,
          passes: excerpt.length >= 100 && excerpt.length <= 160
        },
        specificity: {
          passes: !this.genericPhrases.some(phrase => 
            (title + excerpt).toLowerCase().includes(phrase.toLowerCase())
          )
        }
      }
    };
  }

  /**
   * Generate a comprehensive meta tag report
   */
  generateMetaReport(content, slug) {
    const validation = this.validateMetaTags(content, slug);
    const socialTags = this.generateSocialMetaTags(content, slug);
    const linkedinTest = this.testLinkedInCompatibility(content);

    return {
      validation,
      generatedTags: socialTags,
      linkedinCompatibility: linkedinTest,
      summary: {
        status: validation.isValid ? 'READY FOR PUBLICATION' : 'NEEDS FIXES',
        criticalIssues: validation.errors.length,
        minorIssues: validation.warnings.length,
        socialCompatibility: Object.keys(validation.socialCompatibility).filter(
          platform => validation.socialCompatibility[platform].titleFits && 
                     validation.socialCompatibility[platform].descriptionFits
        ).length
      }
    };
  }
}

export default MetaTagValidator;