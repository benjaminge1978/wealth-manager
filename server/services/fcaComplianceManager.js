import { env } from '../config/environment.js';

class FCAComplianceManager {
  constructor() {
    // Current UK financial regulations and thresholds
    this.currentThresholds = {
      year: 2025,
      isaAllowance: 20000,
      pensionAnnualAllowance: 60000,
      pensionLifetimeAllowance: 1073100, // Frozen until April 2026
      capitalGainsTaxAllowance: 6000,
      inheritanceTaxThreshold: 325000,
      dividendAllowance: 1000,
      personalAllowance: 12570,
      higherRateThreshold: 50270
    };

    // FCA regulatory categories and their requirements
    this.regulatedCategories = {
      'investment': {
        requiresS21Approval: true,
        requiresRiskWarnings: true,
        requiresCapitalRiskWarning: true,
        requiresPastPerformanceWarning: true,
        restrictedPromotion: true
      },
      'pension': {
        requiresS21Approval: true,
        requiresRiskWarnings: true,
        requiresPensionWarnings: true,
        requiresTransferWarnings: true,
        restrictedPromotion: true
      },
      'tax': {
        requiresS21Approval: false,
        requiresPersonalAdviceWarning: true,
        requiresTaxChangeWarning: true,
        restrictedPromotion: false
      },
      'estate': {
        requiresS21Approval: false,
        requiresPersonalAdviceWarning: true,
        requiresLegalAdviceWarning: true,
        restrictedPromotion: false
      },
      'market': {
        requiresS21Approval: false,
        requiresMarketRiskWarning: true,
        requiresPredictionWarning: true,
        restrictedPromotion: false
      },
      'general': {
        requiresS21Approval: false,
        requiresPersonalAdviceWarning: true,
        restrictedPromotion: false
      }
    };

    // Professional boundary language that maintains FCA compliance while building trust
    this.professionalBoundaries = {
      general: [
        "These insights reflect my experience helping UK investors navigate similar decisions. Your specific circumstances will determine the optimal approach for your situation.",
        "This guidance draws from my practice at CJM Wealth Management. Professional consultation helps identify which strategies align with your personal objectives and constraints.",
        "The information provided reflects current understanding and professional practice, though circumstances and regulations may evolve."
      ],
      
      investment: [
        "Capital at risk. Investments can go down as well as rise and you may not get back the amount invested.",
        "Past performance is not a guide to future performance and may not be repeated.",
        "The value of investments and any income from them can fall as well as rise.",
        "Tax treatment depends on individual circumstances and may be subject to change in the future.",
        "These investment insights reflect my experience managing portfolios for UK investors. The specific approach depends on your risk capacity, time horizon, and financial objectives.",
        "Investment suitability varies significantly based on personal circumstances. Professional portfolio review ensures strategies align with your specific situation and goals."
      ],
      
      pension: [
        "Pension benefits are not guaranteed and depend on factors including investment performance and changes in legislation.",
        "Transferring out of a defined benefit pension scheme is a significant decision that could have lasting consequences.",
        "Drawing from my 7+ years as Later Life Mortgage Adviser at Legal & General, I help clients navigate these complex pension decisions with confidence.",
        "Pension legislation and tax rules can change, affecting the benefits available. Professional pension review helps adapt strategies to evolving circumstances.",
        "Early access to pension benefits may result in tax charges and reduced retirement income. This is where comprehensive retirement planning provides valuable guidance.",
        "Some pension matters require specialist advice. My role is helping you understand when professional pension consultation becomes essential."
      ],
      
      tax: [
        "Tax treatment depends on your individual circumstances and may be subject to change.",
        "Tax rules and legislation may change in the future, affecting the strategies discussed.",
        "These tax planning strategies reflect my experience helping clients optimize their position. Professional tax advice ensures implementation suits your specific circumstances.",
        "HMRC's interpretation can vary. My expertise helps navigate these complexities while maintaining compliance with current regulations.",
        "Tax reliefs and allowances are subject to limits. Professional planning identifies which opportunities apply to your situation and maximizes their effectiveness."
      ],
      
      estate: [
        "Estate planning involves complex legal and tax considerations that vary by individual circumstances.",
        "Inheritance tax rules and reliefs are subject to change and may not apply to your situation.",
        "In my comprehensive planning practice, I help clients coordinate estate strategies with qualified legal professionals to ensure optimal outcomes.",
        "Estate planning effectiveness depends on current legislation and proper implementation. Professional coordination ensures strategies adapt to changing circumstances.",
        "Trusts and estate planning structures have ongoing requirements. My role includes helping you understand these commitments and their long-term benefits."
      ],
      
      market: [
        "Market commentary reflects my experience guiding clients through various economic cycles over the past 20+ years.",
        "Economic conditions change rapidly. My analysis helps position client portfolios for different scenarios while maintaining long-term focus.",
        "Past market performance does not guarantee future results. This is why professional portfolio management focuses on strategic positioning rather than prediction.",
        "Market volatility can result in significant gains as well as losses. Professional guidance helps maintain perspective during turbulent periods.",
        "This analysis informs my approach with clients. Professional consultation determines how market insights should influence your specific investment strategy."
      ]
    };

    // Post-February 2024 gateway requirements
    this.gatewayRequirements = {
      effectiveDate: '2024-02-28',
      requiresApproval: [
        'investment-strategies',
        'retirement-planning',
        'pension-advice',
        'investment-recommendations'
      ],
      exemptions: [
        'factual-information',
        'general-education',
        'regulatory-updates',
        'market-commentary'
      ]
    };
  }

  /**
   * Determine if content requires FCA Section 21 approval
   * @param {string} contentType - Type of content being published
   * @param {string} categoryId - Content category identifier
   * @returns {Object} Compliance assessment
   */
  assessSection21Requirements(contentType, categoryId) {
    const categoryRules = this.regulatedCategories[contentType] || this.regulatedCategories.general;
    
    return {
      requiresApproval: categoryRules.requiresS21Approval,
      isRestrictedPromotion: categoryRules.restrictedPromotion,
      gatewayApplicable: this.gatewayRequirements.requiresApproval.includes(categoryId),
      effectiveDate: this.gatewayRequirements.effectiveDate,
      reasoning: this.getSection21Reasoning(contentType, categoryRules)
    };
  }

  /**
   * Get reasoning for Section 21 requirements
   */
  getSection21Reasoning(contentType, rules) {
    if (rules.requiresS21Approval) {
      return `Content relates to regulated activities under FSMA 2000. May constitute a financial promotion that invites or induces engagement with regulated investment services.`;
    }
    
    return `Content is educational/informational and does not directly promote regulated investment services.`;
  }

  /**
   * Generate appropriate professional boundaries for content type
   * @param {string} contentType - Type of content
   * @param {Object} contentMetadata - Additional content information
   * @returns {Array} Array of applicable professional boundaries
   */
  generateProfessionalBoundaries(contentType, contentMetadata = {}) {
    const categoryRules = this.regulatedCategories[contentType] || this.regulatedCategories.general;
    const boundaries = [...this.professionalBoundaries.general];

    // Add category-specific professional boundaries
    if (this.professionalBoundaries[contentType]) {
      boundaries.push(...this.professionalBoundaries[contentType]);
    }

    // Add specific regulatory warnings based on content
    if (categoryRules.requiresCapitalRiskWarning) {
      boundaries.push("Capital is at risk and you may not get back the amount invested.");
    }

    if (categoryRules.requiresPastPerformanceWarning) {
      boundaries.push("Past performance does not guarantee future results.");
    }

    if (categoryRules.requiresPensionWarnings && contentType === 'pension') {
      boundaries.push("As a qualified financial professional, I help you understand when specialist pension advice is required and ensure you receive appropriate FCA-authorized guidance.");
    }

    // Add Consumer Duty considerations with professional positioning
    boundaries.push("This guidance is designed to help you make well-informed decisions. Professional consultation ensures you receive advice tailored to your specific circumstances.");

    // Add FCA authorization statement with professional confidence
    if (categoryRules.requiresS21Approval) {
      boundaries.push(`This content reflects the expertise of CJM Wealth Management, a Partner Practice of St. James's Place Wealth Management, authorized and regulated by the Financial Conduct Authority.`);
    }

    return this.deduplicateBoundaries(boundaries);
  }

  /**
   * Validate content for Consumer Duty compliance
   * @param {Object} content - Content object to validate
   * @returns {Object} Validation results
   */
  validateConsumerDuty(content) {
    const issues = [];
    const recommendations = [];

    // Check for clear and fair information
    if (content.content && content.content.length < 800) {
      issues.push("Content may be too brief to provide adequate information for informed decision-making");
    }

    // Check for balanced presentation
    if (content.content && !content.content.toLowerCase().includes('risk')) {
      issues.push("Content should include discussion of relevant risks");
    }

    // Check for appropriate target audience consideration
    if (!content.targetAudience) {
      recommendations.push("Consider specifying target audience for better Consumer Duty compliance");
    }

    // Check for actionable information
    if (content.content && !content.content.toLowerCase().includes('consider') && !content.content.toLowerCase().includes('should')) {
      recommendations.push("Content could include more specific guidance for decision-making");
    }

    return {
      compliant: issues.length === 0,
      issues: issues,
      recommendations: recommendations,
      overallScore: Math.max(0, 100 - (issues.length * 25) - (recommendations.length * 10))
    };
  }

  /**
   * Generate FCA-compliant author disclosure
   * @param {Object} author - Author information
   * @returns {string} Formatted disclosure statement
   */
  generateAuthorDisclosure(author) {
    let disclosure = `**About the Author:** ${author.name} is a ${author.title}`;
    
    if (author.credentials && author.credentials.length > 0) {
      disclosure += ` holding ${author.credentials.join(', ')} qualifications`;
    }
    
    if (author.fcaNumber) {
      disclosure += `. ${author.fcaNumber}`;
    }
    
    if (author.specializations && author.specializations.length > 0) {
      disclosure += ` specializing in ${author.specializations.join(', ')}.`;
    }

    disclosure += `\n\nThis guidance reflects ${author.name}'s professional expertise and experience helping UK investors. Professional consultation allows for detailed analysis of your specific circumstances and objectives.`;

    return disclosure;
  }

  /**
   * Check if content triggers specific FCA rules
   * @param {Object} content - Content to analyze
   * @param {string} contentType - Type of content
   * @returns {Object} Rule trigger analysis
   */
  analyzeRuleTriggers(content, contentType) {
    const triggers = [];
    const contentText = (content.content || '').toLowerCase();

    // Section 21 triggers (financial promotions)
    const promotionTriggers = [
      'invest in', 'buy', 'purchase', 'returns of', 'guaranteed', 
      'profit', 'income from', 'choose us', 'our service', 'contact us'
    ];

    const hasPromotionLanguage = promotionTriggers.some(trigger => 
      contentText.includes(trigger)
    );

    if (hasPromotionLanguage && this.regulatedCategories[contentType]?.restrictedPromotion) {
      triggers.push({
        rule: 'Section 21 - Financial Promotions',
        severity: 'High',
        description: 'Content may constitute a financial promotion requiring FCA approval',
        recommendation: 'Review promotional language and ensure Section 21 compliance'
      });
    }

    // Advice vs Information boundary
    const adviceTriggers = [
      'you should', 'we recommend', 'the best option', 'you need to',
      'take action', 'do this', 'avoid this'
    ];

    const hasAdviceLanguage = adviceTriggers.some(trigger => 
      contentText.includes(trigger)
    );

    if (hasAdviceLanguage) {
      triggers.push({
        rule: 'Advice Boundary',
        severity: 'Medium',
        description: 'Content may be perceived as personal advice rather than general information',
        recommendation: 'Add disclaimers clarifying this is not personal advice'
      });
    }

    return {
      hasRegulatoryTriggers: triggers.length > 0,
      triggers: triggers,
      overallRisk: this.calculateComplianceRisk(triggers)
    };
  }

  /**
   * Calculate overall compliance risk score
   */
  calculateComplianceRisk(triggers) {
    const riskScore = triggers.reduce((total, trigger) => {
      const severityScores = { 'High': 30, 'Medium': 15, 'Low': 5 };
      return total + (severityScores[trigger.severity] || 0);
    }, 0);

    if (riskScore >= 30) return 'High';
    if (riskScore >= 15) return 'Medium';
    return 'Low';
  }

  /**
   * Generate comprehensive compliance report
   * @param {Object} content - Content to analyze
   * @param {string} contentType - Content category
   * @param {Object} author - Author information
   * @returns {Object} Complete compliance assessment
   */
  generateComplianceReport(content, contentType, author) {
    const s21Assessment = this.assessSection21Requirements(contentType, content.category?.id);
    const professionalBoundaries = this.generateProfessionalBoundaries(contentType, content);
    const consumerDutyValidation = this.validateConsumerDuty(content);
    const ruleTriggers = this.analyzeRuleTriggers(content, contentType);
    const authorDisclosure = this.generateAuthorDisclosure(author);

    return {
      timestamp: new Date().toISOString(),
      contentTitle: content.title,
      contentType: contentType,
      complianceAssessment: {
        section21: s21Assessment,
        consumerDuty: consumerDutyValidation,
        ruleTriggers: ruleTriggers,
        overallRisk: ruleTriggers.overallRisk,
        requiresManualReview: s21Assessment.requiresApproval || ruleTriggers.overallRisk === 'High'
      },
      professionalBoundaries: professionalBoundaries,
      authorDisclosure: authorDisclosure,
      regulatoryNotes: this.generateRegulatoryNotes(s21Assessment, ruleTriggers),
      actionItems: this.generateActionItems(s21Assessment, consumerDutyValidation, ruleTriggers)
    };
  }

  /**
   * Generate regulatory notes for compliance team
   */
  generateRegulatoryNotes(s21Assessment, ruleTriggers) {
    const notes = [];

    if (s21Assessment.requiresApproval) {
      notes.push(`Section 21 approval required. Content constitutes a financial promotion.`);
    }

    if (s21Assessment.gatewayApplicable) {
      notes.push(`Post-February 2024 gateway rules apply. Enhanced approval process required.`);
    }

    if (ruleTriggers.hasRegulatoryTriggers) {
      notes.push(`Regulatory triggers detected: ${ruleTriggers.triggers.map(t => t.rule).join(', ')}`);
    }

    return notes;
  }

  /**
   * Generate action items for compliance
   */
  generateActionItems(s21Assessment, consumerDuty, ruleTriggers) {
    const actions = [];

    if (s21Assessment.requiresApproval) {
      actions.push({
        priority: 'High',
        action: 'Obtain Section 21 approval from authorized person before publication',
        deadline: '24 hours'
      });
    }

    if (!consumerDuty.compliant) {
      actions.push({
        priority: 'Medium',
        action: `Address Consumer Duty issues: ${consumerDuty.issues.join(', ')}`,
        deadline: '2 hours'
      });
    }

    if (ruleTriggers.overallRisk === 'High') {
      actions.push({
        priority: 'High',
        action: 'Compliance team review required before publication',
        deadline: '4 hours'
      });
    }

    return actions;
  }

  /**
   * Remove duplicate professional boundaries
   */
  deduplicateBoundaries(boundaries) {
    return [...new Set(boundaries)];
  }

  /**
   * Get current UK regulatory thresholds
   * @returns {Object} Current thresholds for 2025
   */
  getCurrentThresholds() {
    return this.currentThresholds;
  }

  /**
   * Update regulatory thresholds (for annual updates)
   * @param {Object} newThresholds - Updated threshold values
   */
  updateThresholds(newThresholds) {
    this.currentThresholds = { ...this.currentThresholds, ...newThresholds };
    console.log(`📋 Updated FCA compliance thresholds for ${newThresholds.year || 'current year'}`);
  }
}

export default FCAComplianceManager;