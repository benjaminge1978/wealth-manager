#!/usr/bin/env node

// Test more recent Claude model names based on 2024 patterns
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

async function findCurrentSonnetModels() {
  console.log('🔍 Testing for current Sonnet models...\n');
  
  // Try more recent date patterns and naming conventions
  const modelsToTest = [
    // Recent Sonnet models with different date patterns
    'claude-3-5-sonnet-20241025',
    'claude-3-5-sonnet-20241024', 
    'claude-3-5-sonnet-20241023',
    'claude-3-5-sonnet-20240830',
    'claude-3-5-sonnet-20240815',
    'claude-3-5-sonnet-20240801',
    'claude-3-5-sonnet-20240715',
    'claude-3-5-sonnet-20240701',
    
    // Try v2 versioning
    'claude-3-5-sonnet-v2',
    'claude-3-5-sonnet-v1',
    
    // Try newer naming patterns
    'claude-3.5-sonnet',
    'claude-3.5-sonnet-20241022',
    
    // Try without dates (current versions)
    'claude-sonnet-3.5',
    'claude-sonnet-3-5',
  ];

  const results = [];
  
  for (const model of modelsToTest) {
    const result = await testModel(model);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  const working = results.filter(r => r.working);
  const notWorking = results.filter(r => !r.working);
  
  console.log('\n✅ Working Sonnet models:');
  working.forEach(r => console.log(`   - ${r.model}`));
  
  if (working.length === 0) {
    console.log('   None found! 🚨');
    console.log('\n🔍 This suggests Anthropic may have changed their model naming convention.');
    console.log('📚 Check: https://docs.anthropic.com/en/docs/about-claude/models');
  }
  
  return { working, notWorking };
}

findCurrentSonnetModels()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });