/**
 * TemplateEngine - Forces AI to generate consistent, well-structured content
 * Eliminates formatting issues by enforcing strict templates
 */
class TemplateEngine {
  constructor() {
    this.templates = {
      comprehensive: this.createComprehensiveTemplate(),
      practical: this.createPracticalTemplate(),
      comparison: this.createComparisonTemplate(),
      guide: this.createGuideTemplate()
    };
  }

  /**
   * Generate content using a specific template
   * @param {string} templateType - Type of template to use
   * @param {Object} params - Template parameters
   * @returns {string} Formatted prompt with strict structure requirements
   */
  generateStructuredPrompt(templateType, params) {
    const template = this.templates[templateType] || this.templates.comprehensive;
    
    return this.buildPrompt(template, params);
  }

  /**
   * Comprehensive template for detailed analysis (1500+ words)
   */
  createComprehensiveTemplate() {
    return {
      wordTarget: 1500,
      sections: [
        {
          name: 'introduction',
          heading: 'Introduction',
          wordCount: 200,
          requirements: [
            'Start with a clear problem statement',
            'Include your professional credentials',
            'Outline what the article will cover',
            'Add a hook that engages UK investors'
          ]
        },
        {
          name: 'background',
          heading: 'Understanding the Fundamentals',
          wordCount: 250,
          requirements: [
            'Define key terms and concepts',
            'Provide essential background information',
            'Reference UK regulations where relevant',
            'Use professional expertise to explain complexity'
          ]
        },
        {
          name: 'analysis',
          heading: 'Expert Analysis',
          wordCount: 400,
          requirements: [
            'Provide detailed professional analysis',
            'Include specific examples with numbers',
            'Reference HMRC, FCA, or other authorities',
            'Use subsections (H3) for different aspects'
          ]
        },
        {
          name: 'practical',
          heading: 'Practical Implementation',
          wordCount: 300,
          requirements: [
            'Give actionable advice',
            'Include step-by-step guidance',
            'Mention common pitfalls to avoid',
            'Provide real-world scenarios'
          ]
        },
        {
          name: 'considerations',
          heading: 'Key Considerations',
          wordCount: 200,
          requirements: [
            'Cover edge cases and exceptions',
            'Discuss when professional advice is needed',
            'Address different investor types',
            'Include risk warnings where appropriate'
          ]
        },
        {
          name: 'conclusion',
          heading: 'Professional Recommendations',
          wordCount: 150,
          requirements: [
            'Summarize key takeaways',
            'Provide clear next steps',
            'Position professional consultation',
            'End with confidence-building statement'
          ]
        }
      ],
      validation: {
        minHeadings: 6,
        minParagraphs: 12,
        requiredTerms: ['professional', 'advice', 'consultation', 'UK', 'financial']
      }
    };
  }

  /**
   * Practical template for quick guides (800+ words)
   */
  createPracticalTemplate() {
    return {
      wordTarget: 800,
      sections: [
        {
          name: 'quick_answer',
          heading: 'Quick Answer',
          wordCount: 120,
          requirements: [
            'Start with direct answer to main question',
            'Keep it concise and actionable',
            'Include key numbers or dates',
            'Set expectations for detail below'
          ]
        },
        {
          name: 'key_points',
          heading: 'Key Points to Remember',
          wordCount: 200,
          requirements: [
            'List 4-6 most important points',
            'Use bullet points or numbered list',
            'Include specific figures and dates',
            'Focus on UK-specific information'
          ]
        },
        {
          name: 'detailed_guidance',
          heading: 'Detailed Guidance',
          wordCount: 300,
          requirements: [
            'Expand on the key points',
            'Provide worked examples',
            'Include professional insights',
            'Reference authoritative sources'
          ]
        },
        {
          name: 'action_steps',
          heading: 'What to Do Next',
          wordCount: 120,
          requirements: [
            'Provide clear action steps',
            'Prioritize the most important actions',
            'Include timeframes where relevant',
            'Suggest when to seek professional help'
          ]
        },
        {
          name: 'professional_insight',
          heading: 'Professional Perspective',
          wordCount: 60,
          requirements: [
            'Brief professional recommendation',
            'Position consultation as next step',
            'Build confidence in expertise'
          ]
        }
      ],
      validation: {
        minHeadings: 5,
        minParagraphs: 8,
        requiredTerms: ['UK', 'professional', 'advice']
      }
    };
  }

  /**
   * Comparison template for X vs Y articles
   */
  createComparisonTemplate() {
    return {
      wordTarget: 1200,
      sections: [
        {
          name: 'overview',
          heading: 'Overview: {option1} vs {option2}',
          wordCount: 150,
          requirements: [
            'Introduce both options clearly',
            'Explain why the comparison matters',
            'Set up decision framework',
            'Include professional context'
          ]
        },
        {
          name: 'option1_analysis',
          heading: 'Understanding {option1}',
          wordCount: 300,
          requirements: [
            'Detailed explanation of option 1',
            'Key benefits and drawbacks',
            'Specific numbers and examples',
            'UK regulatory context'
          ]
        },
        {
          name: 'option2_analysis',
          heading: 'Understanding {option2}',
          wordCount: 300,
          requirements: [
            'Detailed explanation of option 2',
            'Key benefits and drawbacks',
            'Specific numbers and examples',
            'UK regulatory context'
          ]
        },
        {
          name: 'comparison_matrix',
          heading: 'Side-by-Side Comparison',
          wordCount: 250,
          requirements: [
            'Direct comparison of key features',
            'Use clear comparison format',
            'Include specific scenarios',
            'Highlight decision factors'
          ]
        },
        {
          name: 'decision_framework',
          heading: 'Which Should You Choose?',
          wordCount: 200,
          requirements: [
            'Clear decision criteria',
            'Different scenarios for each option',
            'Professional recommendation approach',
            'When to seek expert advice'
          ]
        }
      ],
      validation: {
        minHeadings: 5,
        minParagraphs: 10,
        requiredTerms: ['comparison', 'professional', 'advice', 'UK']
      }
    };
  }

  /**
   * Guide template for how-to content
   */
  createGuideTemplate() {
    return {
      wordTarget: 1000,
      sections: [
        {
          name: 'introduction',
          heading: 'Complete Guide to {topic}',
          wordCount: 150,
          requirements: [
            'Explain what the guide covers',
            'Set expectations for complexity',
            'Include professional perspective',
            'Outline key benefits of following guide'
          ]
        },
        {
          name: 'preparation',
          heading: 'Before You Start',
          wordCount: 200,
          requirements: [
            'Prerequisites and requirements',
            'Information you\'ll need to gather',
            'Professional considerations',
            'Common mistakes to avoid'
          ]
        },
        {
          name: 'step_by_step',
          heading: 'Step-by-Step Process',
          wordCount: 400,
          requirements: [
            'Clear numbered steps',
            'Specific actions for each step',
            'Expected outcomes and timeframes',
            'Professional tips for each stage'
          ]
        },
        {
          name: 'advanced_considerations',
          heading: 'Advanced Considerations',
          wordCount: 150,
          requirements: [
            'Complex scenarios and exceptions',
            'When professional help is essential',
            'Optimization strategies',
            'Long-term considerations'
          ]
        },
        {
          name: 'next_steps',
          heading: 'Next Steps',
          wordCount: 100,
          requirements: [
            'What to do after completing the process',
            'Ongoing maintenance or review needs',
            'Professional consultation benefits'
          ]
        }
      ],
      validation: {
        minHeadings: 5,
        minParagraphs: 10,
        requiredTerms: ['step', 'professional', 'advice', 'UK']
      }
    };
  }

  /**
   * Build the final prompt with template structure
   */
  buildPrompt(template, params) {
    const {
      topic,
      keywords = [],
      expertProfile,
      audience = 'UK investors',
      contentType = 'comprehensive'
    } = params;

    // Replace placeholders in template
    const processedSections = template.sections.map(section => ({
      ...section,
      heading: this.replacePlaceholders(section.heading, params)
    }));

    return `You are ${expertProfile.name}, ${expertProfile.title} with ${expertProfile.experience}.

TOPIC: "${topic}"
AUDIENCE: ${audience}
CONTENT TYPE: ${contentType}
TARGET WORDS: ${template.wordTarget}
KEYWORDS: ${keywords.join(', ')}

MANDATORY STRUCTURE - YOU MUST FOLLOW THIS EXACTLY:

${processedSections.map((section, index) => `
${index + 1}. ## ${section.heading}
   TARGET: ${section.wordCount} words
   REQUIREMENTS:
   ${section.requirements.map(req => `   - ${req}`).join('\n')}
`).join('')}

CRITICAL VALIDATION REQUIREMENTS:
- MINIMUM ${template.wordTarget} words total
- EXACTLY ${template.validation.minHeadings} H2/H3 headings
- AT LEAST ${template.validation.minParagraphs} substantial paragraphs
- MUST include these terms: ${template.validation.requiredTerms.join(', ')}
- NO meta-content about content creation
- Focus ONLY on actual financial advice

WRITING RULES:
1. Write from YOUR professional perspective using "I" and "my practice"
2. Include specific UK regulations with section numbers
3. Use real numbers, dates, and current rates
4. Provide worked examples with calculations
5. Structure each section with clear H2/H3 headings
6. Write substantial paragraphs (80+ words each)
7. Include professional boundary language naturally

EXCERPT REQUIREMENTS:
- EXACTLY 120-160 characters
- Must be relevant to the content
- Include key benefit or insight
- Professional and engaging tone

OUTPUT FORMAT:
Return ONLY a JSON object with:
{
  "title": "SEO-optimized title (50-60 characters)",
  "excerpt": "EXACTLY 120-160 characters describing key insights",
  "content": "Full structured content following the template above",
  "suggestedTags": ["relevant", "UK-specific", "professional", "tags"],
  "readTimeMinutes": estimated_reading_time,
  "templateUsed": "${contentType}",
  "structureValidation": {
    "sectionsCount": number_of_sections,
    "estimatedWordCount": estimated_words
  }
}

Generate comprehensive, professional financial content following this structure EXACTLY.`;
  }

  /**
   * Replace placeholders in template strings
   */
  replacePlaceholders(text, params) {
    return text
      .replace('{topic}', params.topic || 'Financial Topic')
      .replace('{option1}', params.option1 || 'Option 1')
      .replace('{option2}', params.option2 || 'Option 2');
  }

  /**
   * Get template by content type and word count
   */
  selectOptimalTemplate(contentType, targetWords) {
    if (targetWords >= 1400) return 'comprehensive';
    if (targetWords >= 1000) return 'guide';
    if (contentType === 'comparison') return 'comparison';
    return 'practical';
  }

  /**
   * Validate that generated content follows template structure
   */
  validateTemplateCompliance(content, templateType) {
    const template = this.templates[templateType];
    const issues = [];

    // Check word count
    const wordCount = (content.content || '').split(/\s+/).length;
    if (wordCount < template.wordTarget * 0.8) {
      issues.push(`Word count too low: ${wordCount} (expected: ${template.wordTarget})`);
    }

    // Check heading count
    const headings = (content.content || '').match(/^#{2,3}\s+.+$/gm) || [];
    if (headings.length < template.validation.minHeadings) {
      issues.push(`Insufficient headings: ${headings.length} (expected: ${template.validation.minHeadings})`);
    }

    // Check required terms
    const text = (content.content || '').toLowerCase();
    const missingTerms = template.validation.requiredTerms.filter(term => 
      !text.includes(term.toLowerCase())
    );
    
    if (missingTerms.length > 0) {
      issues.push(`Missing required terms: ${missingTerms.join(', ')}`);
    }

    return {
      compliant: issues.length === 0,
      issues,
      template: templateType
    };
  }
}

export default TemplateEngine;