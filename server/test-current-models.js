#!/usr/bin/env node

// Test script to find current working Claude models
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

async function findWorkingModels() {
  console.log('🔍 Testing current Claude model availability...\n');
  
  // Test likely current model names based on Anthropic's naming patterns
  const modelsToTest = [
    // Current generation models (likely working)
    'claude-3-5-sonnet-20241022',
    'claude-3-5-sonnet-20240620', 
    'claude-3-5-haiku-20241022',
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
    
    // Potential newer models
    'claude-3-5-sonnet-latest',
    'claude-3-5-sonnet',
    'claude-3-sonnet',
    'claude-3-haiku',
  ];

  const results = [];
  
  for (const model of modelsToTest) {
    const result = await testModel(model);
    results.push(result);
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 Results Summary:');
  const working = results.filter(r => r.working);
  const notWorking = results.filter(r => !r.working);
  
  console.log('\n✅ Working models:');
  working.forEach(r => console.log(`   - ${r.model}`));
  
  console.log('\n❌ Not working models:');
  notWorking.forEach(r => console.log(`   - ${r.model}`));
  
  if (working.length > 0) {
    console.log('\n🎯 Recommended configuration:');
    console.log(`PRIMARY_CLAUDE_MODEL=${working[0].model}`);
    
    const fallbacks = working.slice(1, 4); // Take up to 3 fallbacks
    if (fallbacks.length > 0) {
      console.log(`FALLBACK_CLAUDE_MODELS=${fallbacks.map(r => r.model).join(',')}`);
    }
  }
  
  return { working, notWorking };
}

findWorkingModels()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });