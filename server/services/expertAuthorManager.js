class ExpertAuthorManager {
  constructor() {
    // Expert author profiles with verified credentials for E-E-A-T compliance
    this.expertAuthors = {
      investment: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Wealth Management', 'Investment Strategies', 'ISA Planning', 'Savings Strategies', 'Tax Planning', 'Market Analysis', 'Estate Planning', 'Retirement Planning'],
        experience: '20+ years in financial services',
        bio: `Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of comprehensive experience in financial services. As a Partner Practice of St. James's Place Wealth Management, Chris provides holistic financial advice covering investments, tax planning, retirement strategies, and estate planning to professionals, business owners, and retired clients.`,
        expertise: 'Chris has extensive experience from his previous roles as Later Life Mortgage Adviser at Legal & General and Mortgage Adviser at Barclays Bank. His comprehensive expertise spans wealth management, investment strategies, tax optimization, market analysis, retirement planning, and estate planning. He specializes in creating integrated financial strategies that address all aspects of client wealth.',
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
        specializations: ['Retirement Planning', 'Later Life Planning', 'Pension Advice', 'Tax Planning', 'Estate Planning'],
        experience: '20+ years including 7+ years as Later Life Mortgage Adviser',
        bio: `Chris McConnachie brings extensive retirement planning expertise from his role as Later Life Mortgage Adviser at Legal & General. He now helps clients at CJM Wealth Management with comprehensive retirement planning, ensuring they can enjoy financial security in their later years through integrated strategies covering pensions, investments, tax optimization, and estate planning.`,
        expertise: 'With extensive experience specializing in later life financial planning at Legal & General, Chris has deep expertise in retirement income strategies, equity release, pension optimization, tax-efficient withdrawal strategies, and estate planning for retirees. His experience includes helping retirees navigate complex financial decisions across all aspects of wealth management.',
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
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Tax Planning', 'Investment Tax Optimization', 'ISA Planning', 'Pension Tax Relief'],
        experience: '20+ years in financial services including tax-efficient planning',
        bio: `Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of experience in financial services, including extensive expertise in tax-efficient financial planning. As a Partner Practice of St. James's Place Wealth Management, Chris helps clients optimize their tax position through strategic use of ISAs, pensions, and investment structures.`,
        expertise: 'Chris has extensive experience helping clients minimize their tax burden through legitimate tax planning strategies. His expertise spans ISA optimization, pension contribution strategies, capital gains tax planning, and inheritance tax considerations. He combines his investment knowledge with tax planning to create comprehensive, tax-efficient wealth strategies.',
        professionalBoundaries: [
          'Tax rules can change and their impact depends on individual circumstances.',
          'These tax strategies reflect my experience helping clients optimize their position. Professional tax consultation ensures implementation aligns with your specific circumstances.',
          'Tax optimization benefits from professional analysis of your complete financial picture. This is where comprehensive planning becomes invaluable.',
          'Tax reliefs depend upon your individual circumstances. Professional guidance identifies which opportunities apply to your situation.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=f59e0b&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      },

      market: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Market Analysis', 'Investment Strategy', 'Economic Commentary', 'Portfolio Management'],
        experience: '20+ years in financial markets and investment management',
        bio: `Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of experience in financial markets and investment management. His extensive background includes roles at Barclays Bank and Legal & General, giving him deep insights into market dynamics and economic trends that affect UK investors.`,
        expertise: 'Chris has navigated numerous market cycles throughout his 20+ year career, including the 2008 financial crisis, Brexit uncertainty, and the COVID-19 market volatility. His experience at major financial institutions provides him with comprehensive market knowledge and the ability to interpret economic data for practical investment decisions.',
        professionalBoundaries: [
          'Market analysis reflects my experience through various economic cycles. Economic predictions carry uncertainty - this is where ongoing professional guidance provides value.',
          'This market commentary draws from my investment management experience. Professional portfolio review determines how market insights should influence your specific strategy.',
          'Past market performance does not guarantee future results. My role is helping you position investments for different market scenarios.',
          'Markets can be volatile and investments can fall as well as rise in value. Professional investment management helps maintain long-term perspective during turbulent periods.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=ef4444&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      },

      estate: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Estate Planning', 'Inheritance Tax Planning', 'Trust Strategies', 'Wealth Transfer'],
        experience: '20+ years in financial services including estate planning',
        bio: `Chris McConnachie is an Associate Partner at CJM Wealth Management with over 20 years of experience in financial services, including comprehensive estate planning for high-net-worth clients. As a Partner Practice of St. James's Place Wealth Management, Chris helps clients structure their wealth to protect and transfer assets efficiently to the next generation.`,
        expertise: 'Chris has extensive experience helping clients with estate planning strategies, working closely with solicitors and tax specialists to implement comprehensive wealth transfer plans. His expertise includes inheritance tax mitigation, trust structures, and coordinating estate planning with overall financial strategies.',
        professionalBoundaries: [
          'Estate planning involves complex legal and tax considerations that benefit from coordinated professional guidance.',
          'This estate planning guidance draws from my extensive practice experience. Professional estate planning ensures strategies align with your family objectives and circumstances.',
          'Estate planning needs are highly individual. My role is helping you understand your options and coordinating with appropriate legal professionals.',
          'Tax reliefs and exemptions are subject to change. Professional estate planning adapts strategies to evolving legislation and circumstances.'
        ],
        avatar: 'https://ui-avatars.com/api/?name=Chris+McConnachie&background=7c3aed&color=fff&size=200',
        linkedIn: 'https://www.vouchedfor.co.uk/financial-advisor-ifa/raynes-park/074076-chris-mcconnachie'
      },

      education: {
        name: 'Chris McConnachie',
        title: 'Associate Partner, CJM Wealth Management',
        credentials: ['DipFA', 'Partner Practice of St. James\'s Place'],
        fcaNumber: 'FCA Regulated',
        specializations: ['Financial Education', 'First-Time Investors', 'Savings Strategies', 'Comprehensive Financial Planning'],
        experience: '20+ years in financial services',
        bio: `Chris McConnachie is a DipFA qualified financial adviser with a passion for helping individuals understand and take control of their finances. With over 20 years of experience at CJM Wealth Management, Chris is known for his clear, accessible approach to financial planning and education.`,
        expertise: 'Chris has helped clients across his 20+ year career, from first-time investors to business owners. His experience at major institutions like Barclays Bank and Legal & General provides him with deep insights into the UK financial system and the ability to explain complex concepts in accessible terms.',
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