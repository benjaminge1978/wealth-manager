import { env } from '../config/environment.js';

class AuthoritativeSourceManager {
  constructor() {
    // Comprehensive database of authoritative sources for UK financial content
    this.authoritativeSources = {
      // UK Government and Regulatory Bodies
      government: {
        'HM Revenue & Customs': {
          baseUrl: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
          topics: ['tax', 'pensions', 'isa', 'capital gains', 'inheritance tax', 'income tax'],
          manuals: {
            'Pensions Tax Manual': 'https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual',
            'Capital Gains Manual': 'https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual',
            'Inheritance Tax Manual': 'https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual',
            'Savings and Investment Manual': 'https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual'
          },
          reliability: 100,
          citationFormat: 'HMRC {manual}, {section} ({year})'
        },

        'Financial Conduct Authority': {
          baseUrl: 'https://www.fca.org.uk',
          topics: ['regulation', 'investment', 'advice', 'consumer protection', 'financial promotions'],
          handbooks: {
            'FCA Handbook': 'https://www.handbook.fca.org.uk',
            'Consumer Duty': 'https://www.fca.org.uk/firms/consumer-duty',
            'Financial Promotions': 'https://www.fca.org.uk/firms/financial-promotions-approval-gateway'
          },
          reliability: 100,
          citationFormat: 'FCA {handbook}, {rule} ({year})'
        },

        'The Pensions Regulator': {
          baseUrl: 'https://www.thepensionsregulator.gov.uk',
          topics: ['pensions', 'workplace pensions', 'auto-enrolment', 'pension transfers'],
          guidance: {
            'Code of Practice': 'https://www.thepensionsregulator.gov.uk/en/trustees/managing-db-benefits/funding-and-investment/investment-guidance',
            'DB Scheme Guidance': 'https://www.thepensionsregulator.gov.uk/en/trustees'
          },
          reliability: 95,
          citationFormat: 'TPR {document} ({year})'
        },

        'Office for National Statistics': {
          baseUrl: 'https://www.ons.gov.uk',
          topics: ['economic data', 'inflation', 'employment', 'housing', 'demographics'],
          datasets: {
            'Consumer Price Index': 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/l55o/cpi',
            'House Price Index': 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/housepriceindex/latest',
            'Average Earnings': 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours'
          },
          reliability: 100,
          citationFormat: 'ONS {dataset} ({year})'
        }
      },

      // Central Banking and Monetary Policy
      monetary: {
        'Bank of England': {
          baseUrl: 'https://www.bankofengland.co.uk',
          topics: ['interest rates', 'monetary policy', 'inflation', 'financial stability'],
          publications: {
            'Monetary Policy Committee': 'https://www.bankofengland.co.uk/monetary-policy/monetary-policy-committee',
            'Financial Stability Report': 'https://www.bankofengland.co.uk/financial-stability-report',
            'Inflation Report': 'https://www.bankofengland.co.uk/monetary-policy-report'
          },
          reliability: 100,
          citationFormat: 'Bank of England {publication} ({year})'
        }
      },

      // Professional Bodies and Industry Organizations
      professional: {
        'Personal Finance Society': {
          baseUrl: 'https://www.thepfs.org',
          topics: ['professional standards', 'qualifications', 'ethics', 'continuing development'],
          reliability: 85,
          citationFormat: 'Personal Finance Society {publication} ({year})'
        },

        'CFA Institute UK': {
          baseUrl: 'https://www.cfainstitute.org/en/about/governance/uk',
          topics: ['investment analysis', 'portfolio management', 'ethics'],
          reliability: 90,
          citationFormat: 'CFA Institute {publication} ({year})'
        },

        'Society of Trust and Estate Practitioners': {
          baseUrl: 'https://www.step.org',
          topics: ['estate planning', 'trusts', 'inheritance', 'wealth transfer'],
          reliability: 85,
          citationFormat: 'STEP {publication} ({year})'
        }
      },

      // Academic and Research Institutions
      academic: {
        'Institute for Fiscal Studies': {
          baseUrl: 'https://ifs.org.uk',
          topics: ['tax policy', 'public finance', 'welfare', 'pensions'],
          reliability: 95,
          citationFormat: 'Institute for Fiscal Studies {report} ({year})'
        },

        'London School of Economics': {
          baseUrl: 'https://www.lse.ac.uk',
          topics: ['economics', 'finance', 'policy research'],
          reliability: 90,
          citationFormat: 'LSE {department}, {publication} ({year})'
        }
      },

      // Financial Data and Analysis
      financial: {
        'Financial Times': {
          baseUrl: 'https://www.ft.com',
          topics: ['market analysis', 'economic commentary', 'business news'],
          reliability: 80,
          citationFormat: 'Financial Times, "{title}" ({date})'
        },

        'Morningstar': {
          baseUrl: 'https://www.morningstar.co.uk',
          topics: ['investment research', 'fund analysis', 'market data'],
          reliability: 85,
          citationFormat: 'Morningstar {analysis} ({year})'
        }
      }
    };

    // Topic-to-source mapping for automatic citation suggestions
    this.topicSourceMapping = {
      'tax': ['HM Revenue & Customs', 'Institute for Fiscal Studies'],
      'pension': ['HM Revenue & Customs', 'The Pensions Regulator'],
      'investment': ['Financial Conduct Authority', 'CFA Institute UK', 'Morningstar'],
      'regulation': ['Financial Conduct Authority', 'HM Revenue & Customs'],
      'estate': ['HM Revenue & Customs', 'Society of Trust and Estate Practitioners'],
      'market': ['Bank of England', 'Office for National Statistics', 'Financial Times'],
      'economic': ['Bank of England', 'Office for National Statistics', 'Institute for Fiscal Studies']
    };

    // Current year for citations
    this.currentYear = new Date().getFullYear();
  }

  /**
   * Get appropriate authoritative sources for a given topic
   * @param {string} topic - Content topic or category
   * @param {Array} keywords - Additional keywords to match
   * @returns {Array} Relevant authoritative sources
   */
  getSourcesForTopic(topic, keywords = []) {
    const topicLower = topic.toLowerCase();
    const keywordsLower = keywords.map(k => k.toLowerCase());
    const allSearchTerms = [topicLower, ...keywordsLower];
    
    const relevantSources = [];

    // Find sources by topic mapping
    Object.keys(this.topicSourceMapping).forEach(mappedTopic => {
      if (allSearchTerms.some(term => term.includes(mappedTopic))) {
        const sourceNames = this.topicSourceMapping[mappedTopic];
        sourceNames.forEach(sourceName => {
          const source = this.findSourceByName(sourceName);
          if (source && !relevantSources.find(s => s.name === sourceName)) {
            relevantSources.push({
              name: sourceName,
              ...source,
              relevance: this.calculateSourceRelevance(source, allSearchTerms)
            });
          }
        });
      }
    });

    // Search across all sources for keyword matches
    Object.keys(this.authoritativeSources).forEach(category => {
      Object.keys(this.authoritativeSources[category]).forEach(sourceName => {
        const source = this.authoritativeSources[category][sourceName];
        const sourceRelevance = this.calculateSourceRelevance(source, allSearchTerms);
        
        if (sourceRelevance > 0 && !relevantSources.find(s => s.name === sourceName)) {
          relevantSources.push({
            name: sourceName,
            ...source,
            relevance: sourceRelevance
          });
        }
      });
    });

    // Sort by relevance and reliability
    return relevantSources
      .sort((a, b) => (b.relevance * b.reliability) - (a.relevance * a.reliability))
      .slice(0, 5); // Return top 5 most relevant sources
  }

  /**
   * Calculate source relevance to search terms
   */
  calculateSourceRelevance(source, searchTerms) {
    if (!source.topics) return 0;
    
    let relevance = 0;
    searchTerms.forEach(term => {
      source.topics.forEach(topic => {
        if (topic.includes(term) || term.includes(topic)) {
          relevance += 1;
        }
      });
    });
    
    return relevance;
  }

  /**
   * Find source object by name
   */
  findSourceByName(sourceName) {
    for (const category of Object.values(this.authoritativeSources)) {
      if (category[sourceName]) {
        return category[sourceName];
      }
    }
    return null;
  }

  /**
   * Generate citations for specific claims in content
   * @param {string} content - Content text to analyze
   * @param {string} topic - Main topic area
   * @param {Array} keywords - Related keywords
   * @returns {Object} Citations and enhanced content
   */
  generateCitationsForContent(content, topic, keywords = []) {
    const sources = this.getSourcesForTopic(topic, keywords);
    const citations = [];
    const enhancedContent = this.addInTextCitations(content, sources, citations);
    
    return {
      enhancedContent: enhancedContent,
      citations: citations,
      bibliography: this.generateBibliography(citations),
      sourceQuality: this.assessSourceQuality(sources),
      authorityScore: this.calculateAuthorityScore(sources)
    };
  }

  /**
   * Add in-text citations to content based on claims
   * @param {string} content - Original content
   * @param {Array} sources - Available sources
   * @param {Array} citations - Array to populate with citations
   * @returns {string} Content with in-text citations
   */
  addInTextCitations(content, sources, citations) {
    let enhancedContent = content;
    const citationPatterns = {
      // Tax rates and thresholds
      'tax rate|allowance|threshold|relief': sources.find(s => s.name === 'HM Revenue & Customs'),
      // Regulatory requirements
      'fca|regulation|financial promotion|consumer duty': sources.find(s => s.name === 'Financial Conduct Authority'),
      // Economic data
      'inflation|interest rate|economic|gdp': sources.find(s => s.name === 'Bank of England' || s.name === 'Office for National Statistics'),
      // Pension regulations
      'pension|auto.enrolment|workplace pension': sources.find(s => s.name === 'The Pensions Regulator')
    };

    Object.keys(citationPatterns).forEach(pattern => {
      const source = citationPatterns[pattern];
      if (source) {
        const regex = new RegExp(`(${pattern})`, 'gi');
        const matches = content.match(regex);
        
        if (matches && matches.length > 0) {
          const citationId = citations.length + 1;
          citations.push({
            id: citationId,
            source: source.name,
            url: source.baseUrl,
            accessed: new Date().toISOString().split('T')[0],
            reliability: source.reliability
          });

          // Add citation marker after first occurrence
          enhancedContent = enhancedContent.replace(regex, `$1 [${citationId}]`);
        }
      }
    });

    return enhancedContent;
  }

  /**
   * Generate a formatted bibliography
   * @param {Array} citations - Citations to format
   * @returns {string} Formatted bibliography
   */
  generateBibliography(citations) {
    if (citations.length === 0) return '';

    let bibliography = '\n\n## References\n\n';
    
    citations.forEach(citation => {
      const source = this.findSourceByName(citation.source);
      bibliography += `[${citation.id}] ${citation.source}. Available at: ${citation.url} (Accessed: ${citation.accessed})\n\n`;
    });

    return bibliography;
  }

  /**
   * Assess overall source quality
   * @param {Array} sources - Sources to assess
   * @returns {Object} Quality assessment
   */
  assessSourceQuality(sources) {
    if (sources.length === 0) {
      return {
        score: 0,
        grade: 'Poor',
        assessment: 'No authoritative sources cited'
      };
    }

    const averageReliability = sources.reduce((sum, source) => sum + source.reliability, 0) / sources.length;
    const hasGovernmentSources = sources.some(source => 
      source.name.includes('HM Revenue') || source.name.includes('FCA') || source.name.includes('Bank of England')
    );
    
    let score = averageReliability;
    if (hasGovernmentSources) score += 10;
    if (sources.length >= 3) score += 5;

    score = Math.min(100, score);

    const grade = score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Acceptable' : 'Needs Improvement';
    
    return {
      score: Math.round(score),
      grade: grade,
      assessment: this.getSourceAssessment(score, sources),
      recommendations: this.getSourceRecommendations(sources)
    };
  }

  /**
   * Generate source quality assessment text
   */
  getSourceAssessment(score, sources) {
    if (score >= 90) {
      return 'Excellent use of highly authoritative sources including government and regulatory bodies';
    } else if (score >= 80) {
      return 'Good source quality with mix of authoritative references';
    } else if (score >= 70) {
      return 'Acceptable source quality but could benefit from more authoritative references';
    } else {
      return 'Source quality needs improvement - add more government and regulatory sources';
    }
  }

  /**
   * Generate recommendations for improving source quality
   */
  getSourceRecommendations(sources) {
    const recommendations = [];
    
    const hasHMRC = sources.some(s => s.name === 'HM Revenue & Customs');
    const hasFCA = sources.some(s => s.name === 'Financial Conduct Authority');
    const hasBoE = sources.some(s => s.name === 'Bank of England');
    const hasONS = sources.some(s => s.name === 'Office for National Statistics');

    if (!hasHMRC) {
      recommendations.push('Add HMRC guidance for tax-related claims');
    }
    if (!hasFCA) {
      recommendations.push('Include FCA handbook references for regulatory matters');
    }
    if (!hasBoE) {
      recommendations.push('Reference Bank of England for monetary policy and economic data');
    }
    if (!hasONS) {
      recommendations.push('Use ONS data for statistical claims and economic figures');
    }

    if (sources.length < 3) {
      recommendations.push('Increase number of authoritative sources to strengthen credibility');
    }

    return recommendations;
  }

  /**
   * Calculate authority score for E-E-A-T compliance
   * @param {Array} sources - Sources used
   * @returns {number} Authority score (0-100)
   */
  calculateAuthorityScore(sources) {
    if (sources.length === 0) return 0;

    let score = 0;
    const weights = {
      'HM Revenue & Customs': 25,
      'Financial Conduct Authority': 25,
      'Bank of England': 20,
      'Office for National Statistics': 20,
      'The Pensions Regulator': 15,
      'Institute for Fiscal Studies': 10,
      'CFA Institute UK': 10,
      'Personal Finance Society': 8,
      'Society of Trust and Estate Practitioners': 8
    };

    sources.forEach(source => {
      const weight = weights[source.name] || 5;
      score += weight;
    });

    // Bonus for source diversity
    if (sources.length >= 3) score += 10;
    if (sources.length >= 5) score += 5;

    return Math.min(100, score);
  }

  /**
   * Get specific guidance URLs for common topics
   * @param {string} topic - Topic to get guidance for
   * @returns {Array} Specific guidance URLs
   */
  getSpecificGuidanceUrls(topic) {
    const guidanceMap = {
      'isa': [
        'https://www.gov.uk/individual-savings-accounts',
        'https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual/saim10010'
      ],
      'pension': [
        'https://www.gov.uk/workplace-pensions',
        'https://www.thepensionsregulator.gov.uk/en/trustees'
      ],
      'inheritance-tax': [
        'https://www.gov.uk/inheritance-tax',
        'https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual'
      ],
      'capital-gains': [
        'https://www.gov.uk/capital-gains-tax',
        'https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual'
      ]
    };

    return guidanceMap[topic] || [];
  }

  /**
   * Validate citations for accuracy and accessibility
   * @param {Array} citations - Citations to validate
   * @returns {Object} Validation results
   */
  async validateCitations(citations) {
    const validationResults = {
      valid: [],
      invalid: [],
      warnings: []
    };

    // In a production environment, this would check URL accessibility
    // For now, we'll do basic validation
    citations.forEach(citation => {
      const source = this.findSourceByName(citation.source);
      
      if (!source) {
        validationResults.invalid.push({
          citation: citation,
          reason: 'Source not in authoritative database'
        });
      } else if (source.reliability < 70) {
        validationResults.warnings.push({
          citation: citation,
          reason: 'Source reliability below recommended threshold'
        });
      } else {
        validationResults.valid.push(citation);
      }
    });

    return validationResults;
  }
}

export default AuthoritativeSourceManager;