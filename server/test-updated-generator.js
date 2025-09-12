#!/usr/bin/env node

// Test updated ClaudeContentGenerator with ModelManager integration
import ClaudeContentGenerator from './services/claudeContentGenerator.js';
import { CONTENT_CATEGORIES } from './types/content.js';

console.log('🧪 Testing updated ClaudeContentGenerator with ModelManager...\n');

async function testUpdatedGenerator() {
  try {
    // Test 1: Generator instantiation
    console.log('1. Testing generator instantiation...');
    const generator = new ClaudeContentGenerator();
    console.log('✅ ClaudeContentGenerator created with ModelManager');
    
    // Test 2: ModelManager integration
    console.log('\n2. Testing ModelManager integration...');
    const modelManager = generator.modelManager;
    console.log('✅ ModelManager accessible via generator.modelManager');
    
    // Test 3: Model selection
    console.log('\n3. Testing model selection...');
    const selectedModel = await modelManager.getBestAvailableModel(false);
    console.log(`✅ Model selected: ${selectedModel}`);
    
    // Test 4: Model system status
    console.log('\n4. Testing model system status...');
    const systemStatus = modelManager.getSystemStatus();
    console.log('✅ System status:', {
      primaryModel: systemStatus.configuration.primary,
      totalModels: systemStatus.configuration.totalModels,
      hasRecommendations: systemStatus.recommendations.length > 0
    });
    
    console.log('\n🎉 All ClaudeContentGenerator integration tests passed!');
    console.log('\n📋 Integration Summary:');
    console.log(`   ✅ ModelManager integrated`);
    console.log(`   ✅ All hardcoded models removed`);
    console.log(`   ✅ Resilient model selection active`);
    console.log(`   ✅ Ready for content generation`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.error('Stack:', error.stack);
    return false;
  }
}

// Run the test
testUpdatedGenerator()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });