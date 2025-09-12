#!/usr/bin/env node

// Test script for ModelManager class
import ModelManager from './services/modelManager.js';
import { env } from './config/environment.js';

console.log('🧪 Testing ModelManager class...\n');

async function testModelManager() {
  try {
    // Test 1: Class instantiation
    console.log('1. Testing ModelManager instantiation...');
    const modelManager = new ModelManager();
    console.log('✅ ModelManager created successfully');
    
    // Test 2: Configuration loading
    console.log('\n2. Testing configuration loading...');
    const config = modelManager.modelConfig;
    console.log('✅ Configuration loaded:', {
      primary: config.primary,
      fallbacks: config.fallbacks,
      totalModels: config.all.length
    });
    
    // Test 3: System status (without health checks)
    console.log('\n3. Testing system status...');
    const status = modelManager.getSystemStatus();
    console.log('✅ System status generated:', {
      primaryModel: status.configuration.primary,
      totalModels: status.configuration.totalModels,
      hasRecommendations: status.recommendations.length > 0
    });
    
    // Test 4: Performance metrics (empty initially)
    console.log('\n4. Testing performance metrics...');
    const performance = modelManager.getModelPerformance();
    console.log('✅ Performance metrics accessible:', Object.keys(performance).length === 0 ? 'Empty (expected)' : Object.keys(performance));
    
    // Test 5: Best model selection (without actual API call)
    console.log('\n5. Testing model selection (cached only)...');
    const bestModel = await modelManager.getBestAvailableModel(false);
    console.log('✅ Model selection works:', bestModel);
    
    console.log('\n🎉 All ModelManager tests passed!');
    console.log('\n📋 Configuration Summary:');
    console.log(`   Primary: ${config.primary}`);
    console.log(`   Fallbacks: ${config.fallbacks.join(', ')}`);
    console.log(`   Environment: ${env.NODE_ENV || 'development'}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ ModelManager test failed:', error.message);
    console.error('Stack:', error.stack);
    return false;
  }
}

// Run the test
testModelManager()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });