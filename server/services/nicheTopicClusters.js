import { CONTENT_CATEGORIES } from '../types/content.js';

class NicheTopicClusters {
  constructor() {
    // Specialized UK↔US cross-border financial planning topic clusters
    this.crossBorderClusters = {
      // Core pillars for topical authority
      'uk-us-tax-planning': {
        pillarTitle: 'UK-US Cross-Border Tax Planning',
        targetAudience: 'UK↔US expats, founders, and dual citizens',
        authorityLevel: 'Expert',
        
        // Main pillar content (2000-3000 words each)
        pillarPosts: [
          {
            title: 'Complete Guide to UK-US Double Taxation: Treaties, Credits & Planning Strategies',
            keywords: ['uk us double taxation', 'tax treaty', 'foreign tax credit', 'dual citizen tax'],
            wordCount: 2500,
            difficulty: 'comprehensive',
            contentType: 'ultimate-guide'
          },
          {
            title: 'US Tax Obligations for UK Residents: Filing Requirements & Compliance Strategy', 
            keywords: ['us tax uk resident', 'fbar', 'fatca', 'form 8938'],
            wordCount: 2200,
            difficulty: 'comprehensive',
            contentType: 'compliance-guide'
          }
        ],

        // Supporting cluster content (800-1500 words each)
        supportingPosts: [
          {
            title: 'PFIC Rules Explained: UK Investment Funds for US Tax Residents',
            keywords: ['pfic rules uk', 'passive foreign investment company', 'uk funds us tax'],
            wordCount: 1200,
            difficulty: 'technical',
            linksToPillar: 'uk-us-tax-planning',
            contentType: 'technical-explainer'
          },
          {
            title: 'Remittance Basis vs Arising Basis: US Citizens in the UK',
            keywords: ['remittance basis us citizen', 'arising basis uk', 'non dom status'],
            wordCount: 1400,
            difficulty: 'advanced',
            linksToPillar: 'uk-us-tax-planning',
            contentType: 'comparison-analysis'
          },
          {
            title: 'State Tax Considerations for UK Residents with US Income',
            keywords: ['us state tax uk resident', 'california tax uk', 'new york tax planning'],
            wordCount: 1100,
            difficulty: 'technical',
            linksToPillar: 'uk-us-tax-planning',
            contentType: 'technical-guide'
          }
        ],

        // Long-tail answer content (400-800 words each)
        answerPosts: [
          {
            title: 'Do I Need to File US Taxes if I Live in the UK?',
            keywords: ['us taxes living uk', 'american expat uk taxes', 'us filing requirements'],
            wordCount: 600,
            difficulty: 'beginner',
            contentType: 'answer-card'
          },
          {
            title: 'What is the US-UK Tax Treaty and How Does it Help?',
            keywords: ['us uk tax treaty benefits', 'double taxation relief', 'treaty tie breaker'],
            wordCount: 700,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          },
          {
            title: 'Can I Contribute to Both UK Pensions and US 401k?',
            keywords: ['uk pension us 401k', 'cross border retirement', 'treaty benefits'],
            wordCount: 650,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          }
        ]
      },

      'rsu-stock-compensation': {
        pillarTitle: 'RSU and Stock Compensation for UK↔US Professionals',
        targetAudience: 'Tech professionals, executives with equity compensation',
        authorityLevel: 'Expert',

        pillarPosts: [
          {
            title: 'RSU Tax Planning for UK Residents: US vs UK Tax Treatment Complete Guide',
            keywords: ['rsu tax uk resident', 'restricted stock units uk', 'stock compensation tax'],
            wordCount: 2800,
            difficulty: 'comprehensive',
            contentType: 'ultimate-guide'
          }
        ],

        supportingPosts: [
          {
            title: 'Section 1291 PFIC Rules: How RSUs Become Tax Nightmares',
            keywords: ['section 1291 pfic', 'rsu pfic election', 'qef election timing'],
            wordCount: 1300,
            difficulty: 'expert',
            linksToPillar: 'rsu-stock-compensation',
            contentType: 'technical-deep-dive'
          },
          {
            title: 'UK Employment Income vs Capital Gains: RSU Tax Classification',
            keywords: ['rsu employment income uk', 'capital gains rsu', 'securities option uk'],
            wordCount: 1100,
            difficulty: 'advanced',
            linksToPillar: 'rsu-stock-compensation',
            contentType: 'classification-guide'
          },
          {
            title: 'Timing Strategies: When to Exercise Stock Options Across Borders',
            keywords: ['stock option exercise timing', 'iso uk tax', 'nqso cross border'],
            wordCount: 1200,
            difficulty: 'advanced',
            linksToPillar: 'rsu-stock-compensation',
            contentType: 'strategy-guide'
          }
        ],

        answerPosts: [
          {
            title: 'How are RSUs Taxed if I Move from US to UK?',
            keywords: ['rsu tax moving us to uk', 'relocation rsu tax', 'vesting cross border'],
            wordCount: 750,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          },
          {
            title: 'What Happens to My Stock Options When I Relocate?',
            keywords: ['stock options relocation', 'international assignment equity', 'vesting abroad'],
            wordCount: 600,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          }
        ]
      },

      'cross-border-pensions': {
        pillarTitle: 'UK-US Pension and Retirement Planning',
        targetAudience: 'Expats planning retirement across borders',
        authorityLevel: 'Expert',

        pillarPosts: [
          {
            title: 'Cross-Border Retirement Planning: UK Pensions, US 401k & Social Security',
            keywords: ['uk us retirement planning', 'cross border pensions', 'social security uk resident'],
            wordCount: 2600,
            difficulty: 'comprehensive',
            contentType: 'ultimate-guide'
          }
        ],

        supportingPosts: [
          {
            title: 'UK Pension Transfers to US: QROPS, SIPP and Tax Implications',
            keywords: ['uk pension transfer us', 'qrops usa', 'sipp international'],
            wordCount: 1400,
            difficulty: 'expert',
            linksToPillar: 'cross-border-pensions',
            contentType: 'transfer-guide'
          },
          {
            title: 'Social Security Totalization: Combining UK and US Credits',
            keywords: ['social security totalization uk', 'combined credits', 'uk state pension us'],
            wordCount: 1100,
            difficulty: 'advanced',
            linksToPillar: 'cross-border-pensions',
            contentType: 'benefits-guide'
          },
          {
            title: 'Roth IRA vs UK ISA: Tax-Free Savings Across Borders',
            keywords: ['roth ira uk resident', 'isa vs roth', 'tax free savings cross border'],
            wordCount: 1200,
            difficulty: 'advanced',
            linksToPillar: 'cross-border-pensions',
            contentType: 'comparison-analysis'
          }
        ],

        answerPosts: [
          {
            title: 'Can I Contribute to a UK Pension While Living in the US?',
            keywords: ['uk pension us resident', 'pension contributions abroad', 'expat pension'],
            wordCount: 650,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          },
          {
            title: 'How Do I Claim Social Security From Both Countries?',
            keywords: ['dual social security benefits', 'uk us social security', 'claiming abroad'],
            wordCount: 700,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          }
        ]
      },

      'entrepreneur-founder-planning': {
        pillarTitle: 'Tax Planning for UK↔US Entrepreneurs and Founders',
        targetAudience: 'Startup founders, business owners, entrepreneurs',
        authorityLevel: 'Expert',

        pillarPosts: [
          {
            title: 'UK-US Founder Tax Planning: Entity Structure, Exit Planning & Personal Tax',
            keywords: ['uk us founder tax', 'startup tax planning', 'cross border business'],
            wordCount: 3000,
            difficulty: 'comprehensive',
            contentType: 'ultimate-guide'
          }
        ],

        supportingPosts: [
          {
            title: 'Delaware C-Corp vs UK Limited: Entity Choice for Global Founders',
            keywords: ['delaware c corp uk', 'uk limited company us', 'entity choice founders'],
            wordCount: 1500,
            difficulty: 'expert',
            linksToPillar: 'entrepreneur-founder-planning',
            contentType: 'entity-comparison'
          },
          {
            title: 'Entrepreneurs Relief vs US Section 1202: Startup Exit Tax Planning',
            keywords: ['entrepreneurs relief uk', 'section 1202 exclusion', 'startup exit tax'],
            wordCount: 1300,
            difficulty: 'expert',
            linksToPillar: 'entrepreneur-founder-planning',
            contentType: 'exit-planning'
          },
          {
            title: 'Cross-Border R&D Credits and Innovation Incentives',
            keywords: ['uk r&d credits', 'us r&d tax credit', 'innovation incentives'],
            wordCount: 1200,
            difficulty: 'advanced',
            linksToPillar: 'entrepreneur-founder-planning',
            contentType: 'incentives-guide'
          }
        ],

        answerPosts: [
          {
            title: 'Should I Incorporate in Delaware or the UK?',
            keywords: ['incorporate delaware vs uk', 'where to incorporate startup', 'entity choice'],
            wordCount: 800,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          },
          {
            title: 'How Do I Plan for a Startup Exit Across Borders?',
            keywords: ['startup exit tax planning', 'cross border sale', 'founder exit strategy'],
            wordCount: 750,
            difficulty: 'advanced',
            contentType: 'answer-card'
          }
        ]
      },

      'property-investment-cross-border': {
        pillarTitle: 'UK-US Real Estate and Property Investment',
        targetAudience: 'Property investors, expats with real estate holdings',
        authorityLevel: 'Expert',

        pillarPosts: [
          {
            title: 'Cross-Border Property Investment: UK-US Real Estate Tax Planning Guide',
            keywords: ['uk us property investment', 'cross border real estate', 'property tax planning'],
            wordCount: 2400,
            difficulty: 'comprehensive',
            contentType: 'ultimate-guide'
          }
        ],

        supportingPosts: [
          {
            title: 'US Real Estate Taxes for UK Residents: FIRPTA, Depreciation & Planning',
            keywords: ['us property tax uk resident', 'firpta uk', 'us real estate depreciation'],
            wordCount: 1400,
            difficulty: 'advanced',
            linksToPillar: 'property-investment-cross-border',
            contentType: 'tax-guide'
          },
          {
            title: 'UK Buy-to-Let for US Residents: Tax Treatment and Reporting',
            keywords: ['uk buy to let us resident', 'uk rental income us tax', 'foreign rental'],
            wordCount: 1200,
            difficulty: 'advanced',
            linksToPillar: 'property-investment-cross-border',
            contentType: 'rental-guide'
          },
          {
            title: 'Cross-Border Mortgage Planning and Tax Deductions',
            keywords: ['cross border mortgage', 'foreign mortgage interest', 'property financing'],
            wordCount: 1100,
            difficulty: 'advanced',
            linksToPillar: 'property-investment-cross-border',
            contentType: 'financing-guide'
          }
        ],

        answerPosts: [
          {
            title: 'Can I Deduct UK Mortgage Interest on US Taxes?',
            keywords: ['uk mortgage interest us tax', 'foreign mortgage deduction', 'itemized deductions'],
            wordCount: 600,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          },
          {
            title: 'What Taxes Do I Pay on US Property as a UK Resident?',
            keywords: ['us property tax uk resident', 'foreign property taxes', 'withholding tax'],
            wordCount: 700,
            difficulty: 'intermediate',
            contentType: 'answer-card'
          }
        ]
      }
    };

    // Content calendar integration for niche topics
    this.nicheContentSchedule = {
      // Weekly themes for deep expertise demonstration
      monday: {
        theme: 'Technical Tax Analysis',
        clusters: ['uk-us-tax-planning', 'rsu-stock-compensation'],
        contentType: 'technical-deep-dive',
        targetLength: 1200,
        expertiseLevel: 'expert'
      },
      tuesday: {
        theme: 'Cross-Border Retirement Planning',
        clusters: ['cross-border-pensions'],
        contentType: 'strategy-guide',
        targetLength: 1100,
        expertiseLevel: 'advanced'
      },
      wednesday: {
        theme: 'Founder and Entrepreneur Focus',
        clusters: ['entrepreneur-founder-planning'],
        contentType: 'case-study',
        targetLength: 1300,
        expertiseLevel: 'expert'
      },
      thursday: {
        theme: 'Property and Investment',
        clusters: ['property-investment-cross-border'],
        contentType: 'analysis',
        targetLength: 1000,
        expertiseLevel: 'advanced'
      },
      friday: {
        theme: 'Q&A and Practical Advice',
        clusters: ['all'],
        contentType: 'answer-card',
        targetLength: 600,
        expertiseLevel: 'intermediate'
      }
    };
  }

  /**
   * Get topic cluster for content generation
   * @param {string} day - Day of the week
   * @returns {Object} Topic cluster and content specifications
   */
  getTopicClusterForDay(day) {
    const schedule = this.nicheContentSchedule[day.toLowerCase()];
    if (!schedule) return null;

    // Select random cluster if multiple options
    let availableClusters = schedule.clusters;
    if (schedule.clusters.includes('all')) {
      availableClusters = Object.keys(this.crossBorderClusters);
    }

    const selectedCluster = availableClusters[Math.floor(Math.random() * availableClusters.length)];
    const cluster = this.crossBorderClusters[selectedCluster];

    if (!cluster) return null;

    // Select appropriate content from cluster
    const contentPool = [
      ...cluster.supportingPosts,
      ...cluster.answerPosts
    ].filter(post => 
      schedule.contentType === 'answer-card' ? 
        post.contentType === 'answer-card' :
        post.contentType !== 'answer-card'
    );

    const selectedContent = contentPool[Math.floor(Math.random() * contentPool.length)];

    return {
      cluster: selectedCluster,
      clusterInfo: cluster,
      selectedTopic: selectedContent,
      schedule: schedule,
      nicheFocus: true
    };
  }

  /**
   * Generate niche topic for specific expertise area
   * @param {string} expertiseArea - Area of specialization
   * @returns {Object} Specialized topic configuration
   */
  generateNicheTopic(expertiseArea) {
    const cluster = this.crossBorderClusters[expertiseArea];
    if (!cluster) return null;

    // Prioritize supporting posts for regular content generation
    const availableContent = [
      ...cluster.supportingPosts,
      ...cluster.answerPosts.filter(post => Math.random() > 0.5) // 50% chance for answer posts
    ];

    const selectedTopic = availableContent[Math.floor(Math.random() * availableContent.length)];

    return {
      topic: selectedTopic.title,
      keywords: selectedTopic.keywords,
      wordCount: selectedTopic.wordCount,
      difficulty: selectedTopic.difficulty,
      contentType: selectedTopic.contentType,
      cluster: expertiseArea,
      targetAudience: cluster.targetAudience,
      authorityLevel: cluster.authorityLevel,
      nicheSpecialization: true
    };
  }

  /**
   * Get internal linking opportunities within cluster
   * @param {string} currentCluster - Current content cluster
   * @param {string} currentTopicTitle - Current topic being written
   * @returns {Array} Internal linking opportunities
   */
  getInternalLinkingOpportunities(currentCluster, currentTopicTitle) {
    const cluster = this.crossBorderClusters[currentCluster];
    if (!cluster) return [];

    const linkingOpportunities = [];

    // Link to pillar post
    cluster.pillarPosts.forEach(pillar => {
      if (pillar.title !== currentTopicTitle) {
        linkingOpportunities.push({
          type: 'pillar',
          title: pillar.title,
          anchor: this.generateAnchorText(pillar.keywords),
          relevance: 'high',
          keywords: pillar.keywords
        });
      }
    });

    // Link to related supporting posts
    cluster.supportingPosts.forEach(post => {
      if (post.title !== currentTopicTitle) {
        linkingOpportunities.push({
          type: 'supporting',
          title: post.title,
          anchor: this.generateAnchorText(post.keywords),
          relevance: 'medium',
          keywords: post.keywords
        });
      }
    });

    // Link to relevant answer posts
    cluster.answerPosts.forEach(answer => {
      if (answer.title !== currentTopicTitle) {
        linkingOpportunities.push({
          type: 'answer',
          title: answer.title,
          anchor: this.generateAnchorText(answer.keywords, true),
          relevance: 'medium',
          keywords: answer.keywords
        });
      }
    });

    // Cross-cluster linking for related topics
    const relatedClusters = this.findRelatedClusters(currentCluster);
    relatedClusters.forEach(clusterKey => {
      const relatedCluster = this.crossBorderClusters[clusterKey];
      relatedCluster.pillarPosts.forEach(post => {
        linkingOpportunities.push({
          type: 'cross-cluster-pillar',
          title: post.title,
          anchor: this.generateAnchorText(post.keywords),
          relevance: 'low',
          keywords: post.keywords,
          cluster: clusterKey
        });
      });
    });

    return linkingOpportunities.slice(0, 8); // Limit to 8 most relevant links
  }

  /**
   * Generate natural anchor text from keywords
   */
  generateAnchorText(keywords, isQuestion = false) {
    if (isQuestion) {
      return keywords[0]; // Use first keyword as-is for questions
    }
    
    // Transform keyword into natural anchor text
    const primary = keywords[0];
    const variations = [
      `complete guide to ${primary}`,
      `${primary} explained`,
      `understanding ${primary}`,
      primary
    ];

    return variations[Math.floor(Math.random() * variations.length)];
  }

  /**
   * Find related clusters for cross-linking
   */
  findRelatedClusters(currentCluster) {
    const relationships = {
      'uk-us-tax-planning': ['rsu-stock-compensation', 'entrepreneur-founder-planning'],
      'rsu-stock-compensation': ['uk-us-tax-planning', 'entrepreneur-founder-planning'],
      'cross-border-pensions': ['uk-us-tax-planning', 'property-investment-cross-border'],
      'entrepreneur-founder-planning': ['uk-us-tax-planning', 'rsu-stock-compensation'],
      'property-investment-cross-border': ['uk-us-tax-planning', 'cross-border-pensions']
    };

    return relationships[currentCluster] || [];
  }

  /**
   * Get content gap analysis for cluster development
   * @param {string} clusterKey - Cluster to analyze
   * @returns {Object} Gap analysis and recommendations
   */
  analyzeContentGaps(clusterKey) {
    const cluster = this.crossBorderClusters[clusterKey];
    if (!cluster) return null;

    const gaps = [];
    const recommendations = [];

    // Check pillar post coverage
    if (cluster.pillarPosts.length < 2) {
      gaps.push('Insufficient pillar content for topic authority');
      recommendations.push('Create additional comprehensive guides (2000+ words)');
    }

    // Check supporting post density
    if (cluster.supportingPosts.length < 5) {
      gaps.push('Need more supporting content for cluster depth');
      recommendations.push('Add technical deep-dives and comparison articles');
    }

    // Check answer post coverage
    if (cluster.answerPosts.length < 8) {
      gaps.push('Insufficient coverage of common questions');
      recommendations.push('Research and answer more specific user queries');
    }

    // Check keyword coverage
    const totalKeywords = [
      ...cluster.pillarPosts.flatMap(p => p.keywords),
      ...cluster.supportingPosts.flatMap(p => p.keywords),
      ...cluster.answerPosts.flatMap(p => p.keywords)
    ];

    if (totalKeywords.length < 30) {
      gaps.push('Limited keyword coverage for topical authority');
      recommendations.push('Expand keyword targeting with long-tail variations');
    }

    return {
      cluster: clusterKey,
      gaps: gaps,
      recommendations: recommendations,
      currentStrength: this.calculateClusterStrength(cluster),
      suggestedNextTopics: this.suggestNextTopics(cluster, gaps)
    };
  }

  /**
   * Calculate cluster strength for prioritization
   */
  calculateClusterStrength(cluster) {
    let strength = 0;
    
    // Pillar posts (high value)
    strength += cluster.pillarPosts.length * 10;
    
    // Supporting posts (medium value)
    strength += cluster.supportingPosts.length * 5;
    
    // Answer posts (coverage value)
    strength += cluster.answerPosts.length * 2;
    
    // Keyword diversity bonus
    const totalKeywords = [
      ...cluster.pillarPosts.flatMap(p => p.keywords),
      ...cluster.supportingPosts.flatMap(p => p.keywords),
      ...cluster.answerPosts.flatMap(p => p.keywords)
    ];
    strength += Math.min(totalKeywords.length, 50);

    return Math.min(100, strength);
  }

  /**
   * Suggest next topics based on cluster gaps
   */
  suggestNextTopics(cluster, gaps) {
    const suggestions = [];

    if (gaps.some(gap => gap.includes('pillar content'))) {
      suggestions.push({
        type: 'pillar',
        priority: 'high',
        title: `Advanced ${cluster.pillarTitle} Strategies`,
        expectedWordCount: 2500,
        keywords: [`advanced ${cluster.pillarTitle.toLowerCase()}`]
      });
    }

    if (gaps.some(gap => gap.includes('supporting content'))) {
      suggestions.push({
        type: 'supporting',
        priority: 'medium',
        title: `Case Study: ${cluster.targetAudience} Success Story`,
        expectedWordCount: 1200,
        keywords: [`${cluster.targetAudience.toLowerCase()} case study`]
      });
    }

    return suggestions;
  }

  /**
   * Get all available niche clusters
   * @returns {Array} List of all clusters with metadata
   */
  getAllClusters() {
    return Object.keys(this.crossBorderClusters).map(key => ({
      key: key,
      ...this.crossBorderClusters[key],
      strength: this.calculateClusterStrength(this.crossBorderClusters[key])
    }));
  }
}

export default NicheTopicClusters;