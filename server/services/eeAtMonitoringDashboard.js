import { env } from '../config/environment.js';

class EEATMonitoringDashboard {
  constructor() {
    // Core E-E-A-T metrics tracking
    this.metricsDatabase = {
      contentQuality: [],
      authoritySignals: [],
      complianceScores: [],
      aiCitationTracking: [],
      userEngagementSignals: [],
      technicalSEOMetrics: []
    };

    // Performance thresholds for alerting
    this.qualityThresholds = {
      excellent: 90,
      good: 80,
      acceptable: 70,
      needsImprovement: 60,
      critical: 50
    };

    // E-E-A-T scoring weights
    this.eeAtWeights = {
      experience: 0.25,      // First-hand professional experience
      expertise: 0.30,       // Technical knowledge and credentials
      authoritativeness: 0.25, // Citations and source quality
      trustworthiness: 0.20   // Compliance and transparency
    };

    // Tracking periods
    this.trackingPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      quarterly: 90
    };
  }

  /**
   * Record content quality metrics for a published post
   * @param {Object} contentData - Content and quality metrics
   * @param {Object} qualityCheck - Quality validation results
   * @param {Object} complianceReport - FCA compliance report
   */
  recordContentMetrics(contentData, qualityCheck, complianceReport) {
    const timestamp = new Date().toISOString();
    const contentId = contentData.id || this.generateContentId();

    // Record overall quality metrics
    const qualityRecord = {
      id: contentId,
      timestamp: timestamp,
      title: contentData.title,
      category: contentData.category?.name,
      author: contentData.expertAuthor,
      
      // E-E-A-T Component Scores
      experienceScore: this.calculateExperienceScore(contentData, qualityCheck),
      expertiseScore: this.calculateExpertiseScore(contentData, qualityCheck),
      authorityScore: contentData.authorityScore || 0,
      trustScore: this.calculateTrustScore(complianceReport, qualityCheck),
      
      // Overall metrics
      overallScore: qualityCheck.score,
      qualityLevel: qualityCheck.qualityLevel,
      wordCount: qualityCheck.metrics?.wordCount || 0,
      readTime: contentData.readTimeMinutes || 0,
      
      // Technical indicators
      hasExpertiseSignals: qualityCheck.metrics?.hasExperienceIndicators || false,
      hasAuthoritativeSources: qualityCheck.metrics?.hasAuthoritativeSources || false,
      citationCount: contentData.citations?.length || 0,
      complianceScore: complianceReport?.complianceAssessment?.consumerDuty?.overallScore || 0,
      
      // Content classification
      contentType: contentData.contentType,
      nicheSpecialization: contentData.nicheSpecialization,
      targetAudience: contentData.targetAudience,
      
      // Publication status
      publicationStatus: contentData.status,
      requiresReview: complianceReport?.complianceAssessment?.requiresManualReview || false,
      
      // Performance placeholders (to be updated later)
      views: 0,
      timeOnPage: 0,
      bounceRate: 0,
      socialShares: 0,
      aiCitations: 0
    };

    this.metricsDatabase.contentQuality.push(qualityRecord);
    
    // Trigger alerts if quality is below threshold
    if (qualityRecord.overallScore < this.qualityThresholds.acceptable) {
      this.triggerQualityAlert(qualityRecord);
    }

    return qualityRecord;
  }

  /**
   * Calculate experience score based on content indicators
   */
  calculateExperienceScore(contentData, qualityCheck) {
    let score = 0;
    
    // Check for experience indicators in content
    if (qualityCheck.metrics?.hasExperienceIndicators) {
      score += 30;
    }
    
    // Author experience level
    const authorExp = this.getAuthorExperienceLevel(contentData.expertAuthor);
    score += authorExp;
    
    // Professional anecdotes and case studies
    const contentText = (contentData.content || '').toLowerCase();
    if (contentText.includes('client') || contentText.includes('case')) {
      score += 20;
    }
    
    // Years of experience mentioned
    if (contentText.includes('years') && contentText.includes('experience')) {
      score += 15;
    }
    
    return Math.min(100, score);
  }

  /**
   * Calculate expertise score based on technical depth
   */
  calculateExpertiseScore(contentData, qualityCheck) {
    let score = 0;
    
    // Author credentials
    if (contentData.authorCredentials && contentData.authorCredentials.length > 0) {
      score += 25;
    }
    
    // Technical accuracy indicators
    if (qualityCheck.metrics?.technicalAccuracyScore >= 3) {
      score += 25;
    }
    
    // Content depth (word count)
    const wordCount = qualityCheck.metrics?.wordCount || 0;
    if (wordCount >= 1500) {
      score += 20;
    } else if (wordCount >= 1200) {
      score += 15;
    }
    
    // Expertise signals
    const expertiseSignals = contentData.expertiseSignals?.length || 0;
    score += Math.min(20, expertiseSignals * 5);
    
    // Specialized terminology usage
    const contentText = (contentData.content || '').toLowerCase();
    const technicalTerms = ['regulation', 'compliance', 'fca', 'hmrc', 'section', 'allowance'];
    const termCount = technicalTerms.reduce((count, term) => 
      count + (contentText.includes(term) ? 1 : 0), 0
    );
    score += Math.min(10, termCount * 2);
    
    return Math.min(100, score);
  }

  /**
   * Calculate trust score based on compliance and transparency
   */
  calculateTrustScore(complianceReport, qualityCheck) {
    let score = 0;
    
    // FCA compliance
    if (complianceReport?.complianceAssessment?.consumerDuty?.compliant) {
      score += 30;
    }
    
    // Appropriate disclaimers
    if (qualityCheck.metrics?.complianceScore > 80) {
      score += 25;
    }
    
    // No regulatory triggers
    if (complianceReport?.complianceAssessment?.ruleTriggers?.overallRisk === 'Low') {
      score += 20;
    }
    
    // Transparent authorship
    if (complianceReport?.authorDisclosure) {
      score += 15;
    }
    
    // Citation transparency
    const citationCount = complianceReport?.citations?.length || 0;
    if (citationCount > 0) {
      score += 10;
    }
    
    return Math.min(100, score);
  }

  /**
   * Get author experience level for scoring
   */
  getAuthorExperienceLevel(authorName) {
    // This would integrate with the ExpertAuthorManager in production
    const experienceLevels = {
      'Michael Richardson': 35, // 15+ years
      'Sarah Williams': 40,    // 18+ years  
      'David Chen': 30,        // 12+ years
      'Emma Thompson': 45,     // 20+ years
      'Robert Clarke': 50,     // 25+ years
      'Jennifer Walsh': 25     // 10+ years
    };
    
    return experienceLevels[authorName] || 20;
  }

  /**
   * Generate comprehensive E-E-A-T performance dashboard
   * @param {string} period - Time period for analysis ('daily', 'weekly', 'monthly', 'quarterly')
   * @returns {Object} Dashboard data with metrics and insights
   */
  generateEEATDashboard(period = 'weekly') {
    const cutoffDate = this.getCutoffDate(period);
    const recentContent = this.metricsDatabase.contentQuality.filter(
      record => new Date(record.timestamp) >= cutoffDate
    );

    if (recentContent.length === 0) {
      return this.getEmptyDashboard(period);
    }

    // Calculate overall E-E-A-T scores
    const eeAtScores = this.calculateOverallEEATScores(recentContent);
    
    // Content quality distribution
    const qualityDistribution = this.calculateQualityDistribution(recentContent);
    
    // Performance trends
    const trends = this.calculateTrends(recentContent, period);
    
    // Compliance overview
    const complianceOverview = this.calculateComplianceOverview(recentContent);
    
    // Author performance
    const authorPerformance = this.calculateAuthorPerformance(recentContent);
    
    // Niche specialization analysis
    const nicheAnalysis = this.calculateNichePerformance(recentContent);
    
    // Alerts and recommendations
    const alertsAndRecommendations = this.generateAlertsAndRecommendations(recentContent, eeAtScores);

    return {
      period: period,
      dateRange: {
        from: cutoffDate.toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
      },
      totalContent: recentContent.length,
      
      // Core E-E-A-T Metrics
      eeAtScores: eeAtScores,
      
      // Quality Analysis
      qualityDistribution: qualityDistribution,
      averageQualityScore: this.calculateAverage(recentContent.map(r => r.overallScore)),
      
      // Performance Trends  
      trends: trends,
      
      // Compliance Status
      compliance: complianceOverview,
      
      // Author Analysis
      authorPerformance: authorPerformance,
      
      // Niche Specialization
      nicheAnalysis: nicheAnalysis,
      
      // Actionable Insights
      alerts: alertsAndRecommendations.alerts,
      recommendations: alertsAndRecommendations.recommendations,
      
      // Content Pipeline Health
      pipelineHealth: this.calculatePipelineHealth(recentContent),
      
      // Timestamp
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * Calculate overall E-E-A-T scores using weighted components
   */
  calculateOverallEEATScores(content) {
    const avgExperience = this.calculateAverage(content.map(r => r.experienceScore));
    const avgExpertise = this.calculateAverage(content.map(r => r.expertiseScore));
    const avgAuthority = this.calculateAverage(content.map(r => r.authorityScore));
    const avgTrust = this.calculateAverage(content.map(r => r.trustScore));
    
    const compositeScore = 
      (avgExperience * this.eeAtWeights.experience) +
      (avgExpertise * this.eeAtWeights.expertise) +
      (avgAuthority * this.eeAtWeights.authoritativeness) +
      (avgTrust * this.eeAtWeights.trustworthiness);

    return {
      experience: Math.round(avgExperience),
      expertise: Math.round(avgExpertise), 
      authoritativeness: Math.round(avgAuthority),
      trustworthiness: Math.round(avgTrust),
      composite: Math.round(compositeScore),
      grade: this.getGradeFromScore(compositeScore)
    };
  }

  /**
   * Calculate quality distribution across threshold bands
   */
  calculateQualityDistribution(content) {
    const distribution = {
      excellent: 0,
      good: 0,
      acceptable: 0,
      needsImprovement: 0,
      critical: 0
    };

    content.forEach(record => {
      const score = record.overallScore;
      if (score >= this.qualityThresholds.excellent) {
        distribution.excellent++;
      } else if (score >= this.qualityThresholds.good) {
        distribution.good++;
      } else if (score >= this.qualityThresholds.acceptable) {
        distribution.acceptable++;
      } else if (score >= this.qualityThresholds.needsImprovement) {
        distribution.needsImprovement++;
      } else {
        distribution.critical++;
      }
    });

    // Calculate percentages
    const total = content.length;
    return {
      counts: distribution,
      percentages: {
        excellent: Math.round((distribution.excellent / total) * 100),
        good: Math.round((distribution.good / total) * 100),
        acceptable: Math.round((distribution.acceptable / total) * 100),
        needsImprovement: Math.round((distribution.needsImprovement / total) * 100),
        critical: Math.round((distribution.critical / total) * 100)
      }
    };
  }

  /**
   * Calculate performance trends over time
   */
  calculateTrends(content, period) {
    // Group content by time buckets
    const buckets = this.groupContentByTimeBuckets(content, period);
    
    const trendData = buckets.map(bucket => ({
      date: bucket.date,
      contentCount: bucket.content.length,
      averageQuality: this.calculateAverage(bucket.content.map(r => r.overallScore)),
      averageEEAT: this.calculateAverage(bucket.content.map(r => r.experienceScore + r.expertiseScore + r.authorityScore + r.trustScore) / 4),
      complianceRate: (bucket.content.filter(r => r.complianceScore >= 80).length / bucket.content.length) * 100
    }));

    return {
      data: trendData,
      qualityTrend: this.calculateTrendDirection(trendData.map(d => d.averageQuality)),
      eeAtTrend: this.calculateTrendDirection(trendData.map(d => d.averageEEAT)),
      complianceTrend: this.calculateTrendDirection(trendData.map(d => d.complianceRate))
    };
  }

  /**
   * Calculate compliance overview metrics
   */
  calculateComplianceOverview(content) {
    const totalContent = content.length;
    const compliantContent = content.filter(r => r.complianceScore >= 80).length;
    const requiresReview = content.filter(r => r.requiresReview).length;
    const published = content.filter(r => r.publicationStatus === 'published').length;

    return {
      complianceRate: Math.round((compliantContent / totalContent) * 100),
      reviewRequired: requiresReview,
      autoPublished: published,
      draftedForReview: totalContent - published,
      averageComplianceScore: Math.round(this.calculateAverage(content.map(r => r.complianceScore)))
    };
  }

  /**
   * Calculate author performance metrics
   */
  calculateAuthorPerformance(content) {
    const authorStats = {};
    
    content.forEach(record => {
      if (!authorStats[record.author]) {
        authorStats[record.author] = {
          contentCount: 0,
          totalQuality: 0,
          totalEEAT: 0,
          specializations: new Set(),
          complianceIssues: 0
        };
      }
      
      const stats = authorStats[record.author];
      stats.contentCount++;
      stats.totalQuality += record.overallScore;
      stats.totalEEAT += (record.experienceScore + record.expertiseScore + record.authorityScore + record.trustScore) / 4;
      stats.specializations.add(record.category);
      
      if (record.requiresReview) {
        stats.complianceIssues++;
      }
    });

    // Calculate averages and format results
    const performance = Object.keys(authorStats).map(author => ({
      author: author,
      contentCount: authorStats[author].contentCount,
      averageQuality: Math.round(authorStats[author].totalQuality / authorStats[author].contentCount),
      averageEEAT: Math.round(authorStats[author].totalEEAT / authorStats[author].contentCount),
      specializations: Array.from(authorStats[author].specializations),
      complianceRate: Math.round((1 - (authorStats[author].complianceIssues / authorStats[author].contentCount)) * 100)
    })).sort((a, b) => b.averageEEAT - a.averageEEAT);

    return performance;
  }

  /**
   * Calculate niche specialization performance
   */
  calculateNichePerformance(content) {
    const nicheContent = content.filter(r => r.nicheSpecialization);
    if (nicheContent.length === 0) {
      return { enabled: false, message: 'No niche specialization content found' };
    }

    const nicheStats = {};
    nicheContent.forEach(record => {
      if (!nicheStats[record.nicheSpecialization]) {
        nicheStats[record.nicheSpecialization] = {
          contentCount: 0,
          totalQuality: 0,
          authorityScores: [],
          audiences: new Set()
        };
      }
      
      const stats = nicheStats[record.nicheSpecialization];
      stats.contentCount++;
      stats.totalQuality += record.overallScore;
      stats.authorityScores.push(record.authorityScore);
      stats.audiences.add(record.targetAudience);
    });

    const nichePerformance = Object.keys(nicheStats).map(niche => ({
      niche: niche,
      contentCount: nicheStats[niche].contentCount,
      averageQuality: Math.round(nicheStats[niche].totalQuality / nicheStats[niche].contentCount),
      averageAuthority: Math.round(this.calculateAverage(nicheStats[niche].authorityScores)),
      targetAudiences: Array.from(nicheStats[niche].audiences),
      topicalStrength: this.calculateTopicalStrength(nicheStats[niche])
    })).sort((a, b) => b.averageAuthority - a.averageAuthority);

    return {
      enabled: true,
      performance: nichePerformance,
      totalNiches: Object.keys(nicheStats).length,
      averageNicheQuality: Math.round(this.calculateAverage(nichePerformance.map(n => n.averageQuality)))
    };
  }

  /**
   * Generate alerts and recommendations based on performance
   */
  generateAlertsAndRecommendations(content, eeAtScores) {
    const alerts = [];
    const recommendations = [];

    // Quality alerts
    const lowQualityContent = content.filter(r => r.overallScore < this.qualityThresholds.acceptable).length;
    if (lowQualityContent > 0) {
      alerts.push({
        type: 'quality',
        severity: lowQualityContent > content.length * 0.2 ? 'high' : 'medium',
        message: `${lowQualityContent} posts below acceptable quality threshold`,
        action: 'Review content generation prompts and quality controls'
      });
    }

    // E-E-A-T component alerts
    if (eeAtScores.experience < this.qualityThresholds.good) {
      alerts.push({
        type: 'experience',
        severity: 'medium',
        message: `Experience score (${eeAtScores.experience}) below target`,
        action: 'Increase first-hand professional anecdotes and case studies'
      });
    }

    if (eeAtScores.authoritativeness < this.qualityThresholds.good) {
      alerts.push({
        type: 'authority',
        severity: 'medium', 
        message: `Authority score (${eeAtScores.authoritativeness}) needs improvement`,
        action: 'Add more authoritative source citations and regulatory references'
      });
    }

    // Compliance alerts
    const complianceIssues = content.filter(r => r.requiresReview).length;
    if (complianceIssues > 0) {
      alerts.push({
        type: 'compliance',
        severity: complianceIssues > content.length * 0.1 ? 'high' : 'low',
        message: `${complianceIssues} posts require manual compliance review`,
        action: 'Review FCA compliance automation rules'
      });
    }

    // Generate recommendations
    recommendations.push(...this.generateQualityRecommendations(content, eeAtScores));

    return { alerts, recommendations };
  }

  /**
   * Generate quality improvement recommendations
   */
  generateQualityRecommendations(content, eeAtScores) {
    const recommendations = [];
    
    // Experience improvements
    if (eeAtScores.experience < this.qualityThresholds.excellent) {
      recommendations.push({
        category: 'experience',
        priority: 'medium',
        recommendation: 'Enhance author prompts to include more specific professional experiences and client scenarios',
        expectedImpact: 'Increase experience scores by 10-15 points'
      });
    }

    // Expertise improvements
    if (eeAtScores.expertise < this.qualityThresholds.excellent) {
      recommendations.push({
        category: 'expertise',
        priority: 'medium',
        recommendation: 'Increase technical depth with more specific regulatory references and calculations',
        expectedImpact: 'Improve expertise demonstration and technical authority'
      });
    }

    // Authority improvements
    const avgCitations = this.calculateAverage(content.map(r => r.citationCount));
    if (avgCitations < 3) {
      recommendations.push({
        category: 'authority',
        priority: 'high',
        recommendation: 'Increase authoritative source citations - target minimum 3 per article',
        expectedImpact: 'Significantly boost authoritativeness scores'
      });
    }

    return recommendations;
  }

  /**
   * Calculate pipeline health metrics
   */
  calculatePipelineHealth(content) {
    const totalContent = content.length;
    const highQuality = content.filter(r => r.overallScore >= this.qualityThresholds.good).length;
    const autoPublished = content.filter(r => r.publicationStatus === 'published').length;
    const avgProcessingTime = this.calculateAverage(content.map(r => r.readTime || 0));

    const healthScore = Math.round(
      (highQuality / totalContent * 0.4 + 
       autoPublished / totalContent * 0.3 + 
       (totalContent > 0 ? 0.3 : 0)) * 100
    );

    return {
      healthScore: healthScore,
      status: healthScore >= 80 ? 'Excellent' : healthScore >= 70 ? 'Good' : 'Needs Attention',
      qualityRate: Math.round((highQuality / totalContent) * 100),
      automationRate: Math.round((autoPublished / totalContent) * 100),
      averageProcessingTime: Math.round(avgProcessingTime)
    };
  }

  // Utility methods
  getCutoffDate(period) {
    const now = new Date();
    const days = this.trackingPeriods[period];
    return new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
  }

  calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
  }

  getGradeFromScore(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B'; 
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  calculateTrendDirection(values) {
    if (values.length < 2) return 'stable';
    const latest = values[values.length - 1];
    const previous = values[values.length - 2];
    const diff = latest - previous;
    
    if (Math.abs(diff) < 2) return 'stable';
    return diff > 0 ? 'improving' : 'declining';
  }

  groupContentByTimeBuckets(content, period) {
    // Implementation depends on period granularity
    // For now, return daily buckets
    const buckets = {};
    
    content.forEach(record => {
      const date = new Date(record.timestamp).toISOString().split('T')[0];
      if (!buckets[date]) {
        buckets[date] = { date, content: [] };
      }
      buckets[date].content.push(record);
    });

    return Object.values(buckets).sort((a, b) => a.date.localeCompare(b.date));
  }

  calculateTopicalStrength(nicheStats) {
    // Simple calculation - in production would be more sophisticated
    return Math.min(100, (nicheStats.contentCount * 10) + (nicheStats.totalQuality / nicheStats.contentCount));
  }

  generateContentId() {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getEmptyDashboard(period) {
    return {
      period: period,
      totalContent: 0,
      message: `No content found for ${period} period`,
      generatedAt: new Date().toISOString()
    };
  }

  triggerQualityAlert(qualityRecord) {
    console.warn(`🚨 Quality Alert: Content "${qualityRecord.title}" scored ${qualityRecord.overallScore}/100`);
    console.warn(`📋 Issues: Quality below acceptable threshold for YMYL content`);
    
    // In production, this would integrate with alerting systems
    // (email, Slack, monitoring tools, etc.)
  }

  /**
   * Export dashboard data for external reporting
   * @param {Object} dashboardData - Dashboard data to export
   * @param {string} format - Export format ('json', 'csv')
   * @returns {string} Formatted export data
   */
  exportDashboard(dashboardData, format = 'json') {
    if (format === 'json') {
      return JSON.stringify(dashboardData, null, 2);
    }
    
    if (format === 'csv') {
      // CSV export implementation
      return this.convertToCSV(dashboardData);
    }
    
    throw new Error(`Unsupported export format: ${format}`);
  }

  convertToCSV(data) {
    // Simple CSV conversion - in production would be more comprehensive
    const headers = ['Date', 'Content Count', 'Average Quality', 'E-E-A-T Score', 'Compliance Rate'];
    const rows = data.trends?.data?.map(row => [
      row.date,
      row.contentCount,
      row.averageQuality,
      row.averageEEAT,
      row.complianceRate
    ]) || [];
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

export default EEATMonitoringDashboard;