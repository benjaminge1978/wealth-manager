#!/usr/bin/env node

// Test 2025 model naming patterns
import Anthropic from '@anthropic-ai/sdk';
import { env } from './config/environment.js';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

async function testModel(modelName) {
  try {
    console.log(`Testing ${modelName}...`);
    const message = await anthropic.messages.create({
      model: modelName,
      max_tokens: 10,
      messages: [{
        role: 'user',
        content: 'Reply with just "OK"'
      }]
    });
    
    console.log(`✅ ${modelName}: Working`);
    return { model: modelName, working: true };
  } catch (error) {
    if (error.status === 404) {
      console.log(`❌ ${modelName}: Not found`);
    } else {
      console.log(`❌ ${modelName}: ${error.message}`);
    }
    return { model: modelName, working: false, error: error.message };
  }
}

async function findLatestModels() {
  console.log('🔍 Testing 2025 model naming patterns...\n');
  
  // Try 2025 dates and new naming patterns
  const modelsToTest = [
    // 2025 dates
    'claude-3-5-sonnet-20250101',
    'claude-3-5-sonnet-20250215', 
    'claude-3-5-sonnet-20250301',
    'claude-3-5-sonnet-20250401',
    'claude-3-5-sonnet-20250501',
    'claude-3-5-sonnet-20250601',
    'claude-3-5-sonnet-20250701',
    'claude-3-5-sonnet-20250801',
    'claude-3-5-sonnet-20250901',
    
    // Different versioning patterns
    'claude-4-sonnet',
    'claude-4-0-sonnet',
    'claude-3-6-sonnet',
    
    // Current generation with different patterns
    'claude-sonnet',
    'claude-sonnet-latest',
    'sonnet-3.5',
    
    // Try standard model names
    'gpt-4',  // Just to see if wrong API
    'claude',
    'claude-instant',
  ];

  console.log('🎯 Note: Testing systematically to find current model names...\n');
  
  const results = [];
  
  for (const model of modelsToTest) {
    const result = await testModel(model);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  const working = results.filter(r => r.working);
  
  console.log('\n✅ Working models found:');
  if (working.length > 0) {
    working.forEach(r => console.log(`   - ${r.model}`));
  } else {
    console.log('   None found using these naming patterns! 🚨');
    console.log('\n💡 Recommendations:');
    console.log('   1. Check Anthropic Console for current model names');
    console.log('   2. Use working Haiku models as temporary solution'); 
    console.log('   3. Contact Anthropic support for model availability');
  }
  
  return { working };
}

findLatestModels()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });