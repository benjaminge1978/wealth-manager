/**
 * ContentValidator - Strict pre-publication validation pipeline
 * Eliminates poor content before it reaches publication
 */
class ContentValidator {
  constructor() {
    this.rules = {
      minWordCount: 1200,
      maxWordCount: 3000,
      minExcerptLength: 120,
      maxExcerptLength: 160,
      requiredHeadings: 3,
      minParagraphs: 8,
      contamination: [
        'restructured content',
        'enhanced clarity',
        'citation potential',
        'markdown utilization',
        'json metadata',
        'content formatting'
      ]
    };
  }

  /**
   * Main validation entry point
   * @param {Object} content - Generated content to validate
   * @returns {Object} Validation results with detailed feedback
   */
  validateContent(content) {
    const results = {
      isValid: false,
      errors: [],
      warnings: [],
      metrics: {
        wordCount: 0,
        headingCount: 0,
        paragraphCount: 0,
        excerptLength: 0
      }
    };

    // Run all validations in order of importance
    this.validateWordCount(content, results);
    this.validateStructure(content, results);
    this.validateExcerpt(content, results);
    this.validateContentQuality(content, results);
    this.validateMetaData(content, results);

    // Content is valid only if no errors exist
    results.isValid = results.errors.length === 0;
    
    return results;
  }

  /**
   * Validate word count meets YMYL standards
   */
  validateWordCount(content, results) {
    const text = content.content || '';
    const wordCount = text.trim().split(/\s+/).length;
    results.metrics.wordCount = wordCount;

    if (wordCount < this.rules.minWordCount) {
      results.errors.push(`Content too short: ${wordCount} words (minimum: ${this.rules.minWordCount})`);
    } else if (wordCount > this.rules.maxWordCount) {
      results.warnings.push(`Content very long: ${wordCount} words (maximum recommended: ${this.rules.maxWordCount})`);
    }
  }

  /**
   * Validate content structure for proper formatting
   */
  validateStructure(content, results) {
    const text = content.content || '';
    
    // Count headings (H2, H3, etc.)
    const headings = (text.match(/^#{2,6}\s+.+$/gm) || []);
    results.metrics.headingCount = headings.length;

    if (headings.length < this.rules.requiredHeadings) {
      results.errors.push(`Insufficient structure: ${headings.length} headings (minimum: ${this.rules.requiredHeadings})`);
    }

    // Count paragraphs (non-heading, non-empty lines)
    const paragraphs = text
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 50 && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*');
      });
    
    results.metrics.paragraphCount = paragraphs.length;

    if (paragraphs.length < this.rules.minParagraphs) {
      results.errors.push(`Poor paragraph structure: ${paragraphs.length} paragraphs (minimum: ${this.rules.minParagraphs})`);
    }

    // Check for walls of text (paragraphs > 400 characters)
    const longParagraphs = paragraphs.filter(p => p.length > 400);
    if (longParagraphs.length > 2) {
      results.warnings.push(`${longParagraphs.length} overly long paragraphs detected`);
    }
  }

  /**
   * Validate excerpt for social media optimization
   */
  validateExcerpt(content, results) {
    const excerpt = content.excerpt || '';
    results.metrics.excerptLength = excerpt.length;

    if (!excerpt.trim()) {
      results.errors.push('Excerpt is missing');
      return;
    }

    if (excerpt.length < this.rules.minExcerptLength) {
      results.errors.push(`Excerpt too short: ${excerpt.length} chars (minimum: ${this.rules.minExcerptLength})`);
    } else if (excerpt.length > this.rules.maxExcerptLength) {
      results.errors.push(`Excerpt too long: ${excerpt.length} chars (maximum: ${this.rules.maxExcerptLength})`);
    }

    // Check excerpt quality
    if (excerpt.toLowerCase().includes('expert guide') && excerpt.toLowerCase().includes('featuring')) {
      results.warnings.push('Excerpt uses generic template language');
    }
  }

  /**
   * Validate content quality and detect contamination
   */
  validateContentQuality(content, results) {
    const text = (content.content || '').toLowerCase();
    const title = (content.title || '').toLowerCase();
    const excerpt = (content.excerpt || '').toLowerCase();

    // Check for contamination indicators
    const contaminated = this.rules.contamination.some(phrase => 
      text.includes(phrase) || title.includes(phrase) || excerpt.includes(phrase)
    );

    if (contaminated) {
      results.errors.push('Content contaminated with meta-content about content creation');
    }

    // Validate it's actually about financial topics
    const financialTerms = [
      'investment', 'pension', 'tax', 'isa', 'sipp', 'financial', 'advice', 
      'portfolio', 'retirement', 'planning', 'wealth', 'money', 'fund',
      'capital gains', 'inheritance', 'estate', 'hmrc', 'fca'
    ];

    const financialTermCount = financialTerms.filter(term => text.includes(term)).length;
    
    if (financialTermCount < 3) {
      results.errors.push(`Insufficient financial content: only ${financialTermCount} financial terms found`);
    }

    // Check for proper structure indicators
    if (!text.includes('professional') && !text.includes('advice') && !text.includes('consultation')) {
      results.warnings.push('Missing professional positioning language');
    }
  }

  /**
   * Validate metadata completeness
   */
  validateMetaData(content, results) {
    const requiredFields = ['title', 'excerpt', 'content', 'suggestedTags'];
    
    requiredFields.forEach(field => {
      if (!content[field] || (typeof content[field] === 'string' && !content[field].trim())) {
        results.errors.push(`Missing required field: ${field}`);
      }
    });

    // Validate title length for SEO
    if (content.title && content.title.length > 60) {
      results.warnings.push(`Title too long for SEO: ${content.title.length} chars (max: 60)`);
    }

    // Validate tags
    if (content.suggestedTags && content.suggestedTags.length < 3) {
      results.warnings.push('Insufficient tags for content categorization');
    }
  }

  /**
   * Generate a validation report summary
   */
  generateReport(results) {
    return {
      status: results.isValid ? 'PASS' : 'FAIL',
      score: this.calculateQualityScore(results),
      summary: {
        errors: results.errors.length,
        warnings: results.warnings.length,
        wordCount: results.metrics.wordCount,
        structure: results.metrics.headingCount >= this.rules.requiredHeadings ? 'Good' : 'Poor'
      },
      details: {
        errors: results.errors,
        warnings: results.warnings,
        metrics: results.metrics
      }
    };
  }

  /**
   * Calculate quality score based on validation results
   */
  calculateQualityScore(results) {
    let score = 100;
    
    // Deduct points for errors (critical)
    score -= results.errors.length * 20;
    
    // Deduct points for warnings (minor)
    score -= results.warnings.length * 5;
    
    // Bonus for good metrics
    if (results.metrics.wordCount >= 1500) score += 5;
    if (results.metrics.headingCount >= 5) score += 5;
    if (results.metrics.paragraphCount >= 12) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }
}

export default ContentValidator;