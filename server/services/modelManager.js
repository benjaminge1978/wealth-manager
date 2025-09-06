import Anthropic from '@anthropic-ai/sdk';
import { env } from '../config/environment.js';

/**
 * Resilient Claude Model Management System
 * Handles model selection, fallbacks, health checking, and monitoring
 */
class ModelManager {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
    });
    
    this.modelConfig = this.loadModelConfiguration();
    this.healthCache = new Map();
    this.performanceMetrics = new Map();
    this.lastHealthCheck = null;
    
    // Health cache TTL (5 minutes)
    this.HEALTH_CACHE_TTL = 5 * 60 * 1000;
  }

  /**
   * Load model configuration with intelligent defaults
   */
  loadModelConfiguration() {
    const primary = env.PRIMARY_CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
    const fallbacks = env.FALLBACK_CLAUDE_MODELS?.split(',') || [
      'claude-3-5-sonnet-20240620',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307'
    ];

    return {
      primary,
      fallbacks: fallbacks.map(model => model.trim()).filter(Boolean),
      all: [primary, ...fallbacks.map(model => model.trim()).filter(Boolean)]
    };
  }

  /**
   * Get the best available model through intelligent selection
   */
  async getBestAvailableModel(requireHealthCheck = false) {
    console.log('🔍 Selecting best available Claude model...');
    
    if (requireHealthCheck || this.shouldPerformHealthCheck()) {
      await this.performHealthChecks();
    }

    // Try primary model first
    if (this.isModelHealthy(this.modelConfig.primary)) {
      console.log(`✅ Using primary model: ${this.modelConfig.primary}`);
      return this.modelConfig.primary;
    }

    // Try fallback models
    for (const fallbackModel of this.modelConfig.fallbacks) {
      if (this.isModelHealthy(fallbackModel)) {
        console.log(`⚠️ Using fallback model: ${fallbackModel} (primary unavailable)`);
        return fallbackModel;
      }
    }

    // Emergency fallback - return primary and let caller handle the error
    console.warn('🚨 No healthy models found - using primary model (may fail)');
    return this.modelConfig.primary;
  }

  /**
   * Check if health checks are needed
   */
  shouldPerformHealthCheck() {
    if (!this.lastHealthCheck) return true;
    return (Date.now() - this.lastHealthCheck) > this.HEALTH_CACHE_TTL;
  }

  /**
   * Perform health checks on all configured models
   */
  async performHealthChecks() {
    console.log('🏥 Performing model health checks...');
    const startTime = Date.now();
    
    const healthPromises = this.modelConfig.all.map(async (model) => {
      try {
        const isHealthy = await this.checkModelHealth(model);
        this.healthCache.set(model, {
          healthy: isHealthy,
          lastChecked: Date.now(),
          error: null
        });
        
        if (isHealthy) {
          console.log(`✅ ${model}: Healthy`);
        } else {
          console.log(`❌ ${model}: Unhealthy`);
        }
        
        return { model, healthy: isHealthy };
      } catch (error) {
        console.log(`❌ ${model}: ${error.message}`);
        this.healthCache.set(model, {
          healthy: false,
          lastChecked: Date.now(),
          error: error.message
        });
        return { model, healthy: false, error: error.message };
      }
    });

    const results = await Promise.allSettled(healthPromises);
    this.lastHealthCheck = Date.now();
    
    const healthyCount = results.filter(r => 
      r.status === 'fulfilled' && r.value.healthy
    ).length;
    
    const checkTime = Date.now() - startTime;
    console.log(`🏥 Health check complete: ${healthyCount}/${this.modelConfig.all.length} models healthy (${checkTime}ms)`);
    
    return results;
  }

  /**
   * Check health of a specific model
   */
  async checkModelHealth(model, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const startTime = Date.now();
      
      // Simple test message to verify model availability
      const message = await this.anthropic.messages.create({
        model,
        max_tokens: 10,
        messages: [{
          role: 'user',
          content: 'Reply with just "OK"'
        }]
      }, {
        signal: controller.signal
      });

      const responseTime = Date.now() - startTime;
      const content = message.content[0]?.text?.trim();
      
      // Store performance metrics
      this.updatePerformanceMetrics(model, responseTime, true);
      
      // Model is healthy if it responds with reasonable content
      const isHealthy = content && content.length > 0;
      
      if (isHealthy) {
        console.log(`✅ Model ${model} healthy (${responseTime}ms)`);
      }
      
      return isHealthy;
      
    } catch (error) {
      this.updatePerformanceMetrics(model, null, false);
      
      if (error.name === 'AbortError') {
        throw new Error(`Health check timeout (${timeoutMs}ms)`);
      }
      
      // Parse specific error types
      if (error.status === 404) {
        throw new Error('Model not found or deprecated');
      } else if (error.status === 429) {
        throw new Error('Rate limit exceeded');
      } else if (error.status >= 500) {
        throw new Error('Anthropic service error');
      }
      
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Check if a model is currently healthy
   */
  isModelHealthy(model) {
    const health = this.healthCache.get(model);
    if (!health) return false;
    
    const isRecent = (Date.now() - health.lastChecked) < this.HEALTH_CACHE_TTL;
    return health.healthy && isRecent;
  }

  /**
   * Update performance metrics for monitoring
   */
  updatePerformanceMetrics(model, responseTime, success) {
    if (!this.performanceMetrics.has(model)) {
      this.performanceMetrics.set(model, {
        totalRequests: 0,
        successfulRequests: 0,
        totalResponseTime: 0,
        lastUpdated: Date.now()
      });
    }

    const metrics = this.performanceMetrics.get(model);
    metrics.totalRequests++;
    
    if (success) {
      metrics.successfulRequests++;
      if (responseTime) {
        metrics.totalResponseTime += responseTime;
      }
    }
    
    metrics.lastUpdated = Date.now();
  }

  /**
   * Get model performance statistics
   */
  getModelPerformance(model = null) {
    if (model) {
      const metrics = this.performanceMetrics.get(model);
      if (!metrics) return null;
      
      return {
        model,
        successRate: metrics.totalRequests > 0 ? 
          (metrics.successfulRequests / metrics.totalRequests * 100).toFixed(2) + '%' : '0%',
        averageResponseTime: metrics.successfulRequests > 0 ? 
          Math.round(metrics.totalResponseTime / metrics.successfulRequests) + 'ms' : 'N/A',
        totalRequests: metrics.totalRequests,
        lastUpdated: new Date(metrics.lastUpdated).toISOString()
      };
    }

    // Return all model performance
    const allPerformance = {};
    for (const [modelName, metrics] of this.performanceMetrics.entries()) {
      allPerformance[modelName] = this.getModelPerformance(modelName);
    }
    
    return allPerformance;
  }

  /**
   * Get comprehensive system status
   */
  getSystemStatus() {
    const healthStatus = {};
    for (const [model, health] of this.healthCache.entries()) {
      healthStatus[model] = {
        healthy: health.healthy,
        lastChecked: new Date(health.lastChecked).toISOString(),
        error: health.error
      };
    }

    return {
      timestamp: new Date().toISOString(),
      configuration: {
        primary: this.modelConfig.primary,
        fallbacks: this.modelConfig.fallbacks,
        totalModels: this.modelConfig.all.length
      },
      health: healthStatus,
      performance: this.getModelPerformance(),
      lastHealthCheck: this.lastHealthCheck ? 
        new Date(this.lastHealthCheck).toISOString() : null,
      recommendations: this.generateHealthRecommendations()
    };
  }

  /**
   * Generate health-based recommendations
   */
  generateHealthRecommendations() {
    const recommendations = [];
    
    // Check if primary model is unhealthy
    if (!this.isModelHealthy(this.modelConfig.primary)) {
      recommendations.push({
        priority: 'HIGH',
        message: `Primary model (${this.modelConfig.primary}) is unhealthy - consider updating configuration`,
        action: 'Update PRIMARY_CLAUDE_MODEL in environment'
      });
    }

    // Check if no models are healthy
    const healthyModels = this.modelConfig.all.filter(model => this.isModelHealthy(model));
    if (healthyModels.length === 0) {
      recommendations.push({
        priority: 'CRITICAL',
        message: 'No healthy models available - content generation will fail',
        action: 'Check Anthropic API status and update model configuration'
      });
    }

    // Check if only using fallbacks
    if (healthyModels.length > 0 && !healthyModels.includes(this.modelConfig.primary)) {
      recommendations.push({
        priority: 'MEDIUM',
        message: `Running on fallback models only (${healthyModels.join(', ')})`,
        action: 'Monitor primary model status for recovery'
      });
    }

    return recommendations;
  }

  /**
   * Reset health cache (for testing or manual refresh)
   */
  resetHealthCache() {
    console.log('🔄 Resetting model health cache...');
    this.healthCache.clear();
    this.lastHealthCheck = null;
  }
}

export default ModelManager;