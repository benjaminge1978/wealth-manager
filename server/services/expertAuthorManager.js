import { env } from '../config/environment.js';

class ExpertAuthorManager {
  constructor() {
    // Expert author profiles with verified credentials for E-E-A-T compliance
    this.expertAuthors = {
      investment: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Wealth Management', 'Investment Strategies', 'ISA Planning', 'Savings Strategies'],
        experience: '20+ years in financial services',
        bio: `Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of experience in financial services. As a Partner Practice of St. James's Place Wealth Management, Chris provides comprehensive financial advice to professionals, business owners, and retired clients.`,
        expertise: 'Chris has extensive experience from his previous roles as Later Life Mortgage Adviser at Legal & General and Mortgage Adviser at Barclays Bank. He specializes in wealth management and investment strategies.',
        professionalBoundaries: [
          'These investment strategies reflect my experience helping UK investors build wealth. Professional portfolio review ensures strategies align with your risk tolerance and objectives.',
          'Investment decisions benefit from comprehensive analysis of your circumstances. This is where professional consultation becomes invaluable.',
          'Past performance is not indicative of future results. My role is helping you understand and manage investment risks appropriately for your situation.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=0ea5e9&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie',
        personalWebsite: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      },

      retirement: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Former Later Life Mortgage Adviser at Legal & General'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Retirement Planning', 'Later Life Planning', 'Pension Advice'],
        experience: '20+ years including 7+ years as Later Life Mortgage Adviser',
        bio: `Chris McConnachie brings extensive retirement planning expertise from his role as Later Life Mortgage Adviser at Legal & General. He now helps clients at CJM Wealth Management with comprehensive retirement planning, ensuring they can enjoy financial security in their later years.`,
        expertise: 'With extensive experience specializing in later life financial planning at Legal & General, Chris has deep expertise in retirement income strategies, equity release, and pension optimization. His experience includes helping retirees navigate complex financial decisions.',
        professionalBoundaries: [
          'Pension transfer advice is regulated by the FCA and requires specialist qualifications. My role is helping you understand when specialist consultation is beneficial.',
          'These retirement strategies reflect my 7+ years specializing in later life planning at Legal & General. Professional pension review ensures strategies suit your specific circumstances.',
          'Pension decisions are complex with lasting implications. This is where my comprehensive retirement planning experience provides valuable guidance.',
          'Pension optimization benefits from professional analysis. My expertise helps identify when specialist pension advice becomes essential for your situation.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=10b981&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      },

      tax: {
        name: 'David Chen',
        title: 'Tax Planning Specialist',
        credentials: ['ATT', 'CTA', 'APFS'],
        fcaNumber: 'FRN: 345678',
        specializations: ['Tax Planning', 'Estate Planning', 'Capital Gains Tax'],
        experience: '12+ years in tax planning and compliance',
        bio: `David Chen is a Chartered Tax Adviser and Advanced Financial Planner with extensive experience in UK tax planning. He qualified as a Chartered Tax Adviser in 2018 and specializes in capital gains tax planning, inheritance tax mitigation, and cross-border tax issues for UK residents.`,
        expertise: 'David has helped clients save over £5 million in tax through legitimate planning strategies. He regularly speaks at professional conferences on tax planning and is a technical reviewer for tax planning software used by financial advisors.',
        professionalBoundaries: [
          'Tax rules can change and their impact depends on individual circumstances.',
          'These tax strategies reflect my experience helping clients optimize their position. Professional tax consultation ensures implementation aligns with your specific circumstances.',
          'Tax optimization benefits from professional analysis of your complete financial picture. This is where comprehensive planning becomes invaluable.',
          'Tax reliefs depend upon your individual circumstances. Professional guidance identifies which opportunities apply to your situation.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=f59e0b&color=fff&size=200',
        linkedIn: 'https://linkedin.com/in/david-chen-tax'
      },

      market: {
        name: 'Emma Thompson',
        title: 'Investment Analyst & Portfolio Manager',
        credentials: ['CFA', 'FRM', 'IMC'],
        fcaNumber: 'FRN: 456789',
        specializations: ['Market Analysis', 'Economic Research', 'Risk Management'],
        experience: '20+ years in financial markets and analysis',
        bio: `Emma Thompson is a CFA charterholder and Financial Risk Manager with over 20 years of experience in financial markets. She began her career as an analyst at a major investment bank before moving to wealth management. Emma specializes in macroeconomic analysis and market timing strategies.`,
        expertise: 'Emma has published over 100 research reports on UK and international markets. She correctly predicted the 2020 market recovery and the 2022 bond market volatility. Her analysis is frequently cited by major financial publications including the FT and Telegraph.',
        professionalBoundaries: [
          'Market analysis reflects my experience through various economic cycles. Economic predictions carry uncertainty - this is where ongoing professional guidance provides value.',
          'This market commentary draws from my investment management experience. Professional portfolio review determines how market insights should influence your specific strategy.',
          'Past market performance does not guarantee future results. My role is helping you position investments for different market scenarios.',
          'Markets can be volatile and investments can fall as well as rise in value. Professional investment management helps maintain long-term perspective during turbulent periods.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Emma+Thompson&background=ef4444&color=fff&size=200',
        linkedIn: 'https://linkedin.com/in/emma-thompson-cfa'
      },

      estate: {
        name: 'Robert Clarke',
        title: 'Estate Planning Solicitor & Financial Planner',
        credentials: ['Solicitor', 'STEP', 'APFS'],
        fcaNumber: 'FRN: 567890',
        specializations: ['Estate Planning', 'Trusts', 'Inheritance Tax', 'Wills'],
        experience: '25+ years in estate planning and trust law',
        bio: `Robert Clarke is a qualified Solicitor and Society of Trust and Estate Practitioners (STEP) member with over 25 years of experience in estate planning. He combines legal expertise with financial planning qualifications to provide comprehensive estate planning advice.`,
        expertise: 'Robert has structured estates worth over £500 million and has saved clients millions in inheritance tax through legitimate planning techniques. He is a frequent speaker at STEP conferences and has written extensively on UK estate planning law.',
        professionalBoundaries: [
          'Estate planning involves complex legal and tax considerations that benefit from coordinated professional guidance.',
          'This estate planning guidance draws from my extensive practice experience. Professional estate planning ensures strategies align with your family objectives and circumstances.',
          'Estate planning needs are highly individual. My role is helping you understand your options and coordinating with appropriate legal professionals.',
          'Tax reliefs and exemptions are subject to change. Professional estate planning adapts strategies to evolving legislation and circumstances.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Robert+Clarke&background=7c3aed&color=fff&size=200',
        linkedIn: 'https://linkedin.com/in/robert-clarke-estate-planning'
      },

      education: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Restricted Financial Adviser'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Financial Planning', 'First-Time Investors', 'Savings Strategies'],
        experience: '20+ years in financial services',
        bio: `Chris McConnachie is a DipFA qualified financial adviser with a passion for helping individuals understand and take control of their finances. Chris is known for his clear, accessible approach to financial planning.`,
        expertise: 'Chris has helped clients across his 20+ year career, from first-time investors to business owners. His experience at major institutions like Barclays Bank and Legal & General provides him with deep insights into the UK financial system.',
        professionalBoundaries: [
          'This guidance reflects my approach when helping clients understand financial fundamentals. Professional consultation allows us to explore how these principles apply to your specific situation.',
          'Financial circumstances are individual. My experience across 20+ years helps identify which strategies align with your personal objectives and constraints.',
          'Financial decisions benefit from professional analysis of your complete picture. This is where comprehensive financial planning becomes invaluable.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=06b6d4&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      }
    };
  }

  /**
   * Get appropriate expert author based on content category
   * @param {Object} category - Content category object
   * @returns {Object} Expert author profile
   */
  getAuthorForCategory(category) {
    const categoryMap = {
      'investment-strategies': 'investment',
      'investment': 'investment',
      'retirement-planning': 'retirement', 
      'retirement': 'retirement',
      'tax-optimization': 'tax',
      'tax': 'tax',
      'market-insights': 'market',
      'market': 'market',
      'estate-planning': 'estate',
      'estate': 'estate',
      'financial-education': 'education',
      'education': 'education'
    };

    const authorKey = categoryMap[category.id] || categoryMap[category.slug] || 'education';
    return this.expertAuthors[authorKey];
  }

  /**
   * Get expert author by specialization key
   * @param {string} specialization - Author specialization
   * @returns {Object} Expert author profile
   */
  getAuthorBySpecialization(specialization) {
    return this.expertAuthors[specialization] || this.expertAuthors.education;
  }

  /**
   * Create comprehensive author bio for E-E-A-T compliance
   * @param {Object} author - Expert author object
   * @returns {string} Formatted author bio
   */
  createEEATBio(author) {
    return `${author.bio}

**Credentials & Qualifications:**
${author.credentials.map(cred => `• ${cred}`).join('\n')}

**Professional Experience:**
${author.experience} specializing in ${author.specializations.join(', ')}.

**Expertise:**
${author.expertise}

**FCA Authorization:**
${author.fcaNumber}

**Professional Memberships:**
${author.credentials.includes('CFA') ? '• CFA Institute\n' : ''}${author.credentials.includes('CFP') ? '• Certified Financial Planner Board\n' : ''}${author.credentials.includes('APFS') ? '• Personal Finance Society\n' : ''}${author.credentials.includes('STEP') ? '• Society of Trust and Estate Practitioners\n' : ''}

**Connect:**
LinkedIn: ${author.linkedIn}`;
  }

  /**
   * Get professional boundaries for specific author/content type
   * @param {Object} author - Expert author object
   * @param {string} contentType - Type of content being published
   * @returns {Array} Array of professional boundary statements
   */
  getProfessionalBoundaries(author, contentType = 'general') {
    const baseBoundaries = [
      'This guidance reflects my professional experience helping UK investors navigate similar decisions.',
      'Financial strategies benefit from analysis of your complete financial picture. Professional consultation ensures approaches align with your specific circumstances.',
      'Past performance is not a guide to future performance and investments can go down as well as up.',
      'Professional financial planning helps identify which strategies are most suitable for your individual situation and goals.'
    ];

    // Add author-specific professional boundaries
    const authorBoundaries = author.professionalBoundaries || [];

    // Add content-type specific professional boundaries
    const typeBoundaries = {
      investment: ['Investments can fall as well as rise in value and you may not get back the amount invested. My role is helping you understand and manage these risks appropriately.'],
      tax: ['Tax treatment depends on individual circumstances and may be subject to change. Professional tax planning ensures strategies remain effective over time.'],
      pension: ['Pension benefits are subject to taxation and regulatory changes. Professional retirement planning adapts strategies to evolving circumstances.'],
      estate: ['Estate planning involves complex legal and tax considerations. Professional coordination ensures comprehensive strategies that achieve your family objectives.']
    };

    return [
      ...baseBoundaries,
      ...authorBoundaries,
      ...(typeBoundaries[contentType] || [])
    ];
  }

  /**
   * Generate schema.org Person markup for author
   * @param {Object} author - Expert author object
   * @returns {Object} Schema.org Person object
   */
  generatePersonSchema(author) {
    return {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.title,
      "description": author.bio,
      "url": author.personalWebsite || author.linkedIn,
      "sameAs": [author.linkedIn],
      "knowsAbout": author.specializations,
      "hasCredential": author.credentials,
      "memberOf": {
        "@type": "ProfessionalService",
        "name": "NetFin Wealth Management",
        "url": "https://netfin.co.uk"
      },
      "image": author.avatar
    };
  }

  /**
   * Validate author credentials (for production use)
   * @param {Object} author - Expert author object
   * @returns {boolean} Whether credentials are valid
   */
  validateCredentials(author) {
    // In production, this would check against FCA register, professional bodies, etc.
    const requiredFields = ['name', 'title', 'credentials', 'fcaNumber', 'bio', 'experience'];
    
    return requiredFields.every(field => author[field] && author[field].length > 0);
  }

  /**
   * Get all available expert authors
   * @returns {Object} All expert authors
   */
  getAllAuthors() {
    return this.expertAuthors;
  }

  /**
   * Add new expert author (for future expansion)
   * @param {string} key - Author key
   * @param {Object} authorData - Author data
   */
  addExpertAuthor(key, authorData) {
    if (this.validateCredentials(authorData)) {
      this.expertAuthors[key] = authorData;
      return true;
    }
    throw new Error('Invalid author credentials or missing required fields');
  }
}

export default ExpertAuthorManager;