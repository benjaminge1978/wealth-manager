import { env } from '../config/environment.js';

/**
 * Professional Boundary Manager for Chris McConnachie
 * Replaces generic "educational purposes only" disclaimers with trust-building professional boundary language
 * Maintains FCA compliance while enhancing authority and trustworthiness
 */
class ProfessionalBoundaryManager {
  constructor() {
    // Professional boundary templates that maintain compliance while building trust
    this.professionalBoundaries = {
      general: [
        "These are the key considerations I discuss with clients facing similar decisions. Your specific circumstances will determine which approach is most appropriate for your situation.",
        "This reflects my experience helping UK investors over the past 20+ years. Professional consultation helps identify which strategies align with your personal objectives and constraints.",
        "In my practice at CJM Wealth Management, I regularly guide clients through these decisions. The optimal approach varies based on individual circumstances, risk tolerance, and financial goals."
      ],

      investment: [
        "These are the investment principles I apply when working with clients. The specific portfolio construction and risk management approach depends on your personal circumstances, time horizon, and risk capacity.",
        "In my experience helping investors build wealth, these strategies consistently deliver value. However, investment suitability varies significantly - this is where professional portfolio review becomes invaluable.",
        "As a Partner Practice of St. James's Place, I've guided clients through various market conditions using these approaches. Professional investment consultation ensures strategies align with your specific objectives and constraints.",
        "Capital is at risk with all investments - values can fall as well as rise. My role is helping clients understand and manage these risks appropriately for their circumstances."
      ],

      retirement: [
        "Drawing from my 7+ years as Later Life Mortgage Adviser at Legal & General, these are the retirement planning considerations I prioritize with clients approaching this transition.",
        "These retirement strategies reflect my experience helping clients secure their financial futures. The optimal approach depends on your pension arrangements, expected retirement lifestyle, and healthcare considerations.",
        "In my current practice, I help clients navigate the complexity of retirement planning using these principles. Professional retirement review ensures your strategy maximizes income while managing longevity and inflation risks.",
        "Pension benefits depend on legislation, market performance, and individual circumstances. My expertise helps clients understand and plan for these variables effectively."
      ],

      tax: [
        "These tax planning strategies reflect current legislation and my experience helping clients optimize their position. Tax rules change regularly, making professional guidance essential for implementation.",
        "In my practice, I regularly help clients apply these principles to minimize their tax burden legally and effectively. The specific strategies depend on your income, investments, and family circumstances.",
        "Tax treatment varies significantly based on individual circumstances and may change with future legislation. Professional tax planning ensures strategies remain effective and compliant over time.",
        "These are the tax optimization approaches I implement with clients. HMRC interpretation can vary, making professional advice crucial for successful implementation."
      ],

      estate: [
        "Estate planning involves complex interactions between tax, legal, and financial considerations. In my experience, these strategies help clients protect and transfer wealth effectively.",
        "These estate planning principles guide my work with clients concerned about inheritance tax and wealth preservation. The optimal structures depend on family circumstances, asset values, and objectives.",
        "Drawing from my comprehensive planning experience, these approaches help clients balance current needs with legacy objectives. Professional estate planning ensures strategies remain effective as circumstances change.",
        "Estate planning effectiveness depends on current legislation and proper implementation. This complex area benefits significantly from coordinated professional advice."
      ],

      market: [
        "This market analysis reflects my experience guiding clients through various economic cycles over the past 20+ years. Economic conditions change rapidly, making ongoing professional guidance valuable.",
        "These market insights inform how I position client portfolios during different economic environments. Market timing is challenging - professional investment management focuses on long-term strategy alignment.",
        "Based on my experience through multiple market cycles, these factors influence how I adjust client strategies. Markets are unpredictable - professional guidance helps maintain long-term focus during volatility.",
        "Market predictions carry significant uncertainty. My role is helping clients position their investments to weather various scenarios while pursuing long-term objectives."
      ]
    };

    // Expert positioning statements that replace generic author disclaimers
    this.expertPositioning = {
      chrisCredentials: "Chris McConnachie is Associate Partner at CJM Wealth Management, a Partner Practice of St. James's Place Wealth Management. With over 20 years in financial services including 7+ years specializing in later life planning at Legal & General, Chris helps clients navigate complex financial decisions with confidence.",
      
      professionalApproach: "This guidance reflects the approach Chris takes with clients at CJM Wealth Management. Professional consultation allows for detailed analysis of your specific circumstances and objectives.",
      
      nextSteps: "Ready to apply these insights to your situation? Chris offers comprehensive financial consultations to help you develop and implement strategies tailored to your specific needs and goals."
    };

    // Call-to-action templates that position consultation as valuable, not compliance-driven
    this.consultationCTAs = {
      investment: [
        "Ready to build a portfolio aligned with your goals and risk tolerance? Let's discuss your investment strategy.",
        "Curious how these principles apply to your specific circumstances? Schedule a comprehensive portfolio review.",
        "Want to implement a tax-efficient investment approach? Professional portfolio construction ensures optimal alignment with your objectives."
      ],

      retirement: [
        "Approaching retirement and want to maximize your pension benefits? Let's review your retirement income strategy.",
        "Concerned about maintaining your lifestyle in retirement? Comprehensive retirement planning provides clarity and confidence.",
        "Ready to secure your financial future? Professional retirement analysis helps optimize your strategy for the years ahead."
      ],

      tax: [
        "Want to minimize your tax burden while staying compliant? Let's review your tax planning opportunities.",
        "Curious about tax-efficient strategies for your situation? Professional tax planning identifies optimization opportunities.",
        "Ready to implement sophisticated tax strategies? Comprehensive planning ensures maximum effectiveness and compliance."
      ],

      estate: [
        "Concerned about inheritance tax on your estate? Let's discuss wealth preservation strategies for your family.",
        "Want to ensure efficient wealth transfer to the next generation? Professional estate planning structures provide clarity and protection.",
        "Ready to protect your legacy? Comprehensive estate planning helps minimize tax while achieving your family objectives."
      ],

      market: [
        "Concerned about market volatility affecting your investments? Let's review your portfolio positioning and risk management.",
        "Want to align your investments with current market conditions? Professional portfolio review ensures strategic positioning.",
        "Ready to implement a market-aware investment strategy? Comprehensive analysis helps optimize your approach for various scenarios."
      ]
    };

    // Professional boundary integration for different content contexts
    this.contextualBoundaries = {
      educational: {
        opening: "This guidance reflects my approach when helping clients understand",
        closing: "Professional consultation allows us to explore how these principles apply to your specific situation."
      },
      
      strategic: {
        opening: "In my experience at CJM Wealth Management, clients benefit most when we",
        closing: "The optimal strategy depends on your circumstances - this is where detailed financial planning becomes invaluable."
      },
      
      analytical: {
        opening: "My analysis of current conditions suggests",
        closing: "Professional portfolio review helps determine how these insights should influence your investment approach."
      },
      
      planning: {
        opening: "When working with clients on similar objectives, I typically recommend",
        closing: "Professional financial planning ensures these strategies align with your complete financial picture."
      }
    };
  }

  /**
   * Generate professional boundary statements for specific content type
   * @param {string} contentType - Type of content (investment, retirement, etc.)
   * @param {string} context - Context type (educational, strategic, etc.)
   * @param {number} count - Number of statements to return
   * @returns {Array} Professional boundary statements
   */
  generateProfessionalBoundaries(contentType, context = 'general', count = 2) {
    const boundaries = this.professionalBoundaries[contentType] || this.professionalBoundaries.general;
    
    // Shuffle and return requested number of statements
    const shuffled = [...boundaries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Generate expert positioning statement
   * @param {string} focus - Focus area for positioning (credentials, approach, or nextSteps)
   * @returns {string} Expert positioning statement
   */
  generateExpertPositioning(focus = 'professionalApproach') {
    return this.expertPositioning[focus] || this.expertPositioning.professionalApproach;
  }

  /**
   * Generate consultation call-to-action
   * @param {string} contentType - Type of content for relevant CTA
   * @returns {string} Professional consultation CTA
   */
  generateConsultationCTA(contentType) {
    const ctas = this.consultationCTAs[contentType] || this.consultationCTAs.investment;
    const randomIndex = Math.floor(Math.random() * ctas.length);
    return ctas[randomIndex];
  }

  /**
   * Generate contextual boundary language for content integration
   * @param {string} context - Context type (educational, strategic, etc.)
   * @param {string} topic - Specific topic being discussed
   * @returns {Object} Opening and closing boundary language
   */
  generateContextualBoundary(context = 'educational', topic = 'financial planning') {
    const template = this.contextualBoundaries[context] || this.contextualBoundaries.educational;
    
    return {
      opening: `${template.opening} ${topic}.`,
      closing: template.closing
    };
  }

  /**
   * Create comprehensive professional boundary content for a blog post
   * @param {string} contentType - Content type (investment, retirement, etc.)
   * @param {string} topic - Specific topic
   * @param {boolean} includeCTA - Whether to include consultation CTA
   * @returns {Object} Complete boundary content package
   */
  createComprehensiveBoundary(contentType, topic, includeCTA = true) {
    const boundaries = this.generateProfessionalBoundaries(contentType, 'general', 1);
    const positioning = this.generateExpertPositioning('professionalApproach');
    const cta = includeCTA ? this.generateConsultationCTA(contentType) : null;
    
    return {
      professionalBoundary: boundaries[0],
      expertPositioning: positioning,
      consultationCTA: cta,
      formattedBoundary: this.formatBoundaryForContent(boundaries[0], positioning, cta)
    };
  }

  /**
   * Format boundary content for integration into blog posts
   * @param {string} boundary - Professional boundary statement
   * @param {string} positioning - Expert positioning
   * @param {string} cta - Call-to-action (optional)
   * @returns {string} Formatted boundary content
   */
  formatBoundaryForContent(boundary, positioning, cta = null) {
    let formatted = `\n\n---\n\n**Professional Guidance:** ${boundary}\n\n${positioning}`;
    
    if (cta) {
      formatted += `\n\n**Next Steps:** ${cta}`;
    }
    
    return formatted;
  }

  /**
   * Validate that professional boundaries maintain FCA compliance
   * @param {string} contentType - Type of content being validated
   * @returns {Object} Compliance validation results
   */
  validateFCACompliance(contentType) {
    // Check that professional boundaries include appropriate regulatory considerations
    const boundaries = this.professionalBoundaries[contentType] || [];
    
    const complianceFactors = {
      acknowledgesPersonalCircumstances: boundaries.some(b => 
        b.includes('your circumstances') || b.includes('individual circumstances')
      ),
      positionsConsultationAsValuable: boundaries.some(b => 
        b.includes('professional') && (b.includes('consultation') || b.includes('review'))
      ),
      maintainsExpertAuthority: boundaries.some(b => 
        b.includes('experience') || b.includes('clients') || b.includes('practice')
      ),
      includesRiskConsiderations: contentType === 'investment' ? boundaries.some(b => 
        b.includes('risk') || b.includes('values can fall')
      ) : true
    };

    const compliant = Object.values(complianceFactors).every(factor => factor === true);

    return {
      compliant,
      factors: complianceFactors,
      recommendations: compliant ? [] : this.generateComplianceRecommendations(complianceFactors)
    };
  }

  /**
   * Generate compliance recommendations if validation fails
   * @param {Object} factors - Compliance factors that failed
   * @returns {Array} Recommendations for improvement
   */
  generateComplianceRecommendations(factors) {
    const recommendations = [];

    if (!factors.acknowledgesPersonalCircumstances) {
      recommendations.push('Add language acknowledging individual circumstances vary');
    }

    if (!factors.positionsConsultationAsValuable) {
      recommendations.push('Position professional consultation as valuable rather than required');
    }

    if (!factors.maintainsExpertAuthority) {
      recommendations.push('Include references to professional experience and expertise');
    }

    if (!factors.includesRiskConsiderations) {
      recommendations.push('Add appropriate risk considerations for investment content');
    }

    return recommendations;
  }

  /**
   * Get all available content types for boundary generation
   * @returns {Array} Available content types
   */
  getAvailableContentTypes() {
    return Object.keys(this.professionalBoundaries);
  }

  /**
   * Get all available contextual boundary types
   * @returns {Array} Available context types
   */
  getAvailableContextTypes() {
    return Object.keys(this.contextualBoundaries);
  }
}

export default ProfessionalBoundaryManager;