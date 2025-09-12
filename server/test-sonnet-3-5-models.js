#!/usr/bin/env node

// Test Claude 3.5 Sonnet models specifically
import Anthropic from '@anthropic-ai/sdk';
import { env } from './config/environment.js';

const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

async function testModel(modelName) {
  try {
    console.log(`Testing ${modelName}...`);
    const start = Date.now();
    
    const message = await anthropic.messages.create({
      model: modelName,
      max_tokens: 50,
      messages: [{
        role: 'user',
        content: 'Reply with exactly: "Model working - I am Claude 3.5 Sonnet"'
      }]
    });
    
    const responseTime = Date.now() - start;
    const response = message.content[0]?.text || '';
    
    console.log(`✅ ${modelName}: Working (${responseTime}ms)`);
    console.log(`   Response: "${response}"`);
    return { model: modelName, working: true, responseTime, response };
  } catch (error) {
    if (error.status === 404) {
      console.log(`❌ ${modelName}: Not found (404)`);
    } else if (error.status === 403) {
      console.log(`❌ ${modelName}: Access denied (403) - insufficient account tier`);
    } else if (error.status === 429) {
      console.log(`❌ ${modelName}: Rate limited (429)`);
    } else {
      console.log(`❌ ${modelName}: Error - ${error.message}`);
    }
    return { model: modelName, working: false, error: error.message, status: error.status };
  }
}

async function testConsoleAccountSonnetModels() {
  console.log('🔍 Testing Claude 3.5 Sonnet models for your Console account...\n');
  
  // Test Claude 3.5 Sonnet models in order of preference
  const sonnetModels = [
    // Latest Claude 3.5 Sonnet (most recent)
    'claude-3-5-sonnet-20241022',
    
    // Previous Claude 3.5 Sonnet versions
    'claude-3-5-sonnet-20240620',
    
    // Original Claude 3 Sonnet
    'claude-3-sonnet-20240229',
    
    // Also test some potential current names
    'claude-3-5-sonnet',
    'claude-3-5-sonnet-latest',
  ];

  console.log(`📊 Testing ${sonnetModels.length} Sonnet models:\n`);
  
  const results = [];
  
  for (const model of sonnetModels) {
    const result = await testModel(model);
    results.push(result);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n📊 RESULTS SUMMARY:\n');
  
  const working = results.filter(r => r.working);
  const notWorking = results.filter(r => !r.working);
  
  if (working.length > 0) {
    console.log('✅ WORKING SONNET MODELS:');
    working.forEach(r => {
      console.log(`   - ${r.model} (${r.responseTime}ms)`);
      if (r.response && r.response.length < 100) {
        console.log(`     "${r.response}"`);
      }
    });
    
    console.log('\n🎯 RECOMMENDED CONFIGURATION:');
    console.log(`PRIMARY_CLAUDE_MODEL=${working[0].model}`);
    if (working.length > 1) {
      const fallbacks = working.slice(1, 3).map(r => r.model);
      console.log(`FALLBACK_CLAUDE_MODELS=${fallbacks.join(',')}`);
    }
  } else {
    console.log('❌ NO WORKING SONNET MODELS FOUND');
  }
  
  if (notWorking.length > 0) {
    console.log('\n❌ NOT WORKING:');
    notWorking.forEach(r => {
      console.log(`   - ${r.model}: ${r.error || 'Unknown error'}`);
    });
  }
  
  console.log('\n💡 ANALYSIS:');
  if (working.length === 0) {
    console.log('   - No Sonnet models available with current API key');
    console.log('   - This explains why we fell back to Haiku models');
    console.log('   - Need to check Console account tier/credits');
  } else {
    console.log(`   - Found ${working.length} working Sonnet model(s)!`);
    console.log('   - Can replace Haiku models in configuration');
    console.log('   - Should get much better content generation');
  }
  
  return { working, notWorking };
}

testConsoleAccountSonnetModels()
  .then(() => {
    console.log('\n✅ Sonnet model testing complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Testing failed:', error);
    process.exit(1);
  });