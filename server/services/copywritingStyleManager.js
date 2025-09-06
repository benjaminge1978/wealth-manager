import { env } from '../config/environment.js';
import ExpertAuthorManager from './expertAuthorManager.js';

/**
 * Copywriting Style Manager for Chris McConnachie
 * Creates varied content approaches while maintaining single expert authority
 * Safe for Google E-E-A-T requirements - no fictional experts
 */
class CopywritingStyleManager {
  constructor() {
    this.expertAuthorManager = new ExpertAuthorManager();
    this.chrisProfile = this.expertAuthorManager.getAuthorBySpecialization('investment');
    
    // Chris McConnachie's writing styles based on his professional background
    this.writingStyles = {
      technicalAnalyst: {
        name: 'Technical Analyst Chris',
        description: 'Data-driven investment analysis drawing from advisory experience',
        tone: 'professional, analytical, evidence-based',
        approach: 'Charts, statistics, technical concepts explained clearly',
        backgroundFocus: 'Investment advisory experience, market analysis skills',
        typicalPhrases: [
          'Based on my analysis of current market conditions',
          'The data suggests',
          'From a technical perspective',
          'Historical performance indicates',
          'My analysis shows'
        ]
      },
      
      retirementSpecialist: {
        name: 'Retirement Specialist Chris',
        description: 'Later-life planning expert drawing from Legal & General background',
        tone: 'reassuring, experienced, forward-thinking',
        approach: 'Practical retirement strategies, real-world planning scenarios',
        backgroundFocus: '7+ years at Legal & General specializing in later life planning',
        typicalPhrases: [
          'In my time specializing in later life planning at Legal & General',
          'Having helped clients navigate retirement for over 7 years',
          'A common concern I hear from pre-retirees',
          'From my experience with retirement planning',
          'What I tell clients approaching retirement'
        ]
      },
      
      educationalChris: {
        name: 'Educational Chris',
        description: 'Patient teacher approach for financial education',
        tone: 'approachable, clear, encouraging',
        approach: 'Step-by-step guidance, plain English explanations',
        backgroundFocus: 'DipFA training, explaining complex concepts to clients',
        typicalPhrases: [
          'Let me break this down simply',
          'The most common question I get asked is',
          'Here\'s how I explain this to clients',
          'Think of it this way',
          'To put this in perspective'
        ]
      },
      
      marketCommentator: {
        name: 'Market Commentator Chris',
        description: 'Experienced market observer with 20+ year perspective',
        tone: 'authoritative, contextual, measured',
        approach: 'Market trends, economic analysis, historical context',
        backgroundFocus: '20+ years through multiple market cycles',
        typicalPhrases: [
          'Having guided clients through the 2008 crisis and 2020 volatility',
          'In my 20+ years of practice, I\'ve observed',
          'Market cycles have taught me',
          'This reminds me of similar conditions in',
          'Based on my experience through various market environments'
        ]
      },
      
      clientAdvisor: {
        name: 'Client Advisor Chris',
        description: 'Practical advisor sharing real client insights',
        tone: 'practical, relatable, solution-focused',
        approach: 'Common client scenarios, actionable advice',
        backgroundFocus: 'Current practice at CJM Wealth Management, St. James\'s Place',
        typicalPhrases: [
          'A typical client scenario I see',
          'Many of my clients ask about',
          'In my current practice at CJM Wealth Management',
          'What I recommend to clients in this situation',
          'As a Partner Practice of St. James\'s Place'
        ]
      }
    };
    
    // Audience-specific adaptations (still all Chris McConnachie)
    this.audienceProfiles = {
      youngProfessionals: {
        name: 'Young Professionals (25-35)',
        adaptations: {
          language: 'Modern terminology, career-focused examples',
          concerns: 'First homes, early career progression, student loans',
          chrisApproach: 'Drawing from his experience helping young professionals start their financial journey'
        }
      },
      
      preRetirees: {
        name: 'Pre-retirees (50-65)', 
        adaptations: {
          language: 'Comprehensive planning focus, legacy considerations',
          concerns: 'Pension maximization, healthcare costs, inheritance planning',
          chrisApproach: 'Leveraging his Legal & General later-life planning expertise'
        }
      },
      
      businessOwners: {
        name: 'Business Owners',
        adaptations: {
          language: 'Business-focused examples, tax efficiency emphasis',
          concerns: 'Corporate structures, dividend optimization, succession planning',
          chrisApproach: 'Drawing from his experience with entrepreneur clients'
        }
      },
      
      highNetWorth: {
        name: 'High Net Worth Individuals',
        adaptations: {
          language: 'Sophisticated strategies, complex planning scenarios',
          concerns: 'Estate planning, tax optimization, wealth preservation',
          chrisApproach: 'Utilizing his comprehensive wealth management expertise'
        }
      }
    };
    
    // Professional background contexts
    this.backgroundContexts = {
      barclaysExperience: {
        period: 'Earlier career as Mortgage Adviser at Barclays Bank',
        expertise: 'Understanding of banking products, mortgage market, first-time buyers',
        applicationAreas: ['Property investment', 'Mortgage strategies', 'Banking relationships']
      },
      
      legalGeneralExperience: {
        period: '7+ years as Later Life Mortgage Adviser at Legal & General', 
        expertise: 'Later life planning, equity release, retirement income strategies',
        applicationAreas: ['Retirement planning', 'Later life mortgages', 'Income in retirement']
      },
      
      currentPractice: {
        period: 'Current role as Associate Partner at CJM Wealth Management',
        expertise: 'Comprehensive wealth management, investment strategies, holistic financial planning',
        applicationAreas: ['Investment planning', 'Wealth management', 'Client advisory']
      },
      
      stjamesPlacePartnership: {
        period: 'Partner Practice of St. James\'s Place Wealth Management',
        expertise: 'Established wealth management processes, comprehensive advice model',
        applicationAreas: ['Wealth management', 'Investment strategies', 'Professional standards']
      }
    };
  }
  
  /**
   * Generate writing style prompt for Chris McConnachie based on content type
   * @param {string} styleType - Type of writing style to use
   * @param {string} audienceType - Target audience 
   * @param {Object} contentParams - Content generation parameters
   * @returns {Object} Style configuration for content generation
   */
  getWritingStyleConfig(styleType, audienceType = 'general', contentParams = {}) {
    const style = this.writingStyles[styleType];
    const audience = this.audienceProfiles[audienceType];
    
    if (!style) {
      throw new Error(`Unknown writing style: ${styleType}`);
    }
    
    console.log(`📝 Selected writing style: ${style.name} for ${audienceType || 'general'} audience`);
    
    return {
      styleName: style.name,
      authorName: this.chrisProfile.name,
      authorCredentials: this.chrisProfile.credentials,
      tone: style.tone,
      approach: style.approach,
      backgroundFocus: style.backgroundFocus,
      typicalPhrases: style.typicalPhrases,
      audienceAdaptation: audience?.adaptations,
      professionalContext: this.getRelevantBackgroundContext(contentParams.category, styleType)
    };
  }
  
  /**
   * Get relevant professional background context based on content category
   * @param {Object} category - Content category
   * @param {string} styleType - Writing style type
   * @returns {Object} Relevant background context
   */
  getRelevantBackgroundContext(category, styleType) {
    const categoryId = category?.id || category?.slug || 'general';
    
    // Map content categories to Chris's background experiences
    const categoryBackgroundMap = {
      'retirement-planning': 'legalGeneralExperience',
      'retirement': 'legalGeneralExperience', 
      'investment-strategies': 'currentPractice',
      'investment': 'currentPractice',
      'market-insights': 'currentPractice',
      'tax-optimization': 'stjamesPlacePartnership',
      'estate-planning': 'legalGeneralExperience',
      'financial-education': 'currentPractice'
    };
    
    // Special cases based on writing style
    if (styleType === 'retirementSpecialist') {
      return this.backgroundContexts.legalGeneralExperience;
    }
    
    if (styleType === 'marketCommentator') {
      return this.backgroundContexts.currentPractice;
    }
    
    const contextKey = categoryBackgroundMap[categoryId] || 'currentPractice';
    return this.backgroundContexts[contextKey];
  }
  
  /**
   * Create style-specific prompt additions for content generation
   * @param {Object} styleConfig - Style configuration from getWritingStyleConfig
   * @returns {string} Additional prompt text for style
   */
  createStylePrompt(styleConfig) {
    const professionalContext = styleConfig.professionalContext;
    
    return `
WRITING STYLE APPROACH - ${styleConfig.styleName.toUpperCase()}:
- Tone: ${styleConfig.tone}
- Approach: ${styleConfig.approach}
- Background Focus: ${styleConfig.backgroundFocus}
- Professional Context: ${professionalContext.period}
- Relevant Expertise: ${professionalContext.expertise}

STYLE-SPECIFIC LANGUAGE PATTERNS:
${styleConfig.typicalPhrases.map(phrase => `- "${phrase}"`).join('\n')}

${styleConfig.audienceAdaptation ? `
AUDIENCE ADAPTATION (${styleConfig.audienceAdaptation}):
- Language Style: ${styleConfig.audienceAdaptation.language}
- Key Concerns: ${styleConfig.audienceAdaptation.concerns}
- Chris's Approach: ${styleConfig.audienceAdaptation.chrisApproach}
` : ''}

BACKGROUND INTEGRATION:
Write from the perspective of your ${professionalContext.period}, drawing on your expertise in ${professionalContext.expertise}. This experience is directly relevant to ${professionalContext.applicationAreas.join(', ')}.

AUTHENTICITY REQUIREMENTS:
- All content must reflect genuine professional experience and qualifications
- Use real market conditions and regulatory changes you've navigated
- Reference actual professional background without fictional elements
- Maintain consistency with your established professional reputation`;
  }
  
  /**
   * Suggest appropriate writing style based on content topic and category
   * @param {string} topic - Content topic
   * @param {Object} category - Content category
   * @param {Array} keywords - Content keywords
   * @returns {string} Recommended writing style
   */
  suggestWritingStyle(topic, category, keywords = []) {
    const topicLower = topic.toLowerCase();
    const keywordString = keywords.join(' ').toLowerCase();
    const categoryId = category?.id || category?.slug || '';
    
    // Retirement/pension content
    if (topicLower.includes('retirement') || topicLower.includes('pension') || 
        topicLower.includes('sipp') || categoryId.includes('retirement')) {
      return 'retirementSpecialist';
    }
    
    // Market analysis content
    if (topicLower.includes('market') || topicLower.includes('volatility') || 
        topicLower.includes('economic') || categoryId.includes('market')) {
      return 'marketCommentator';
    }
    
    // Technical/complex investment content
    if (topicLower.includes('analysis') || topicLower.includes('strategy') ||
        keywordString.includes('technical') || keywordString.includes('portfolio')) {
      return 'technicalAnalyst';
    }
    
    // Educational/beginner content
    if (topicLower.includes('guide') || topicLower.includes('explained') || 
        topicLower.includes('basics') || topicLower.includes('understanding')) {
      return 'educationalChris';
    }
    
    // Default to client advisor approach
    return 'clientAdvisor';
  }
  
  /**
   * Get all available writing styles for Chris McConnachie
   * @returns {Object} All writing style configurations
   */
  getAllWritingStyles() {
    return this.writingStyles;
  }
  
  /**
   * Get all audience profiles
   * @returns {Object} All audience configurations  
   */
  getAllAudienceProfiles() {
    return this.audienceProfiles;
  }
}

export default CopywritingStyleManager;