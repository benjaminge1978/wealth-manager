#!/usr/bin/env node

// Test current generation Claude models (post-3.5 deprecation)
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
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Reply with exactly: "Working! I can generate long-form content for blog posts."'
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

async function testCurrentGenerationModels() {
  console.log('🔍 Testing CURRENT generation Claude models (post-3.5 deprecation)...\n');
  
  // Test current generation models based on research
  const currentModels = [
    // Claude 4 series (latest generation)
    'claude-sonnet-4-20250514',
    'claude-opus-4-20250514', 
    'claude-opus-4-1-20250805',
    
    // Claude 3.7 series (current generation before 4.0)
    'claude-3-7-sonnet-20250219',
    
    // Current Haiku models (working ones from our earlier test)
    'claude-3-5-haiku-20241022',
    'claude-3-haiku-20240307',
    
    // Try potential aliases
    'claude-sonnet-4',
    'claude-3-7-sonnet',
  ];

  console.log(`📊 Testing ${currentModels.length} current generation models:\n`);
  
  const results = [];
  
  for (const model of currentModels) {
    const result = await testModel(model);
    results.push(result);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n📊 RESULTS SUMMARY:\n');
  
  const working = results.filter(r => r.working);
  const notWorking = results.filter(r => !r.working);
  const accessDenied = results.filter(r => r.status === 403);
  
  if (working.length > 0) {
    console.log('✅ WORKING MODELS:');
    working.forEach(r => {
      console.log(`   - ${r.model} (${r.responseTime}ms)`);
    });
    
    // Separate long-form capable models from Haiku
    const longFormModels = working.filter(r => 
      !r.model.includes('haiku') && !r.model.includes('Haiku')
    );
    const haikuModels = working.filter(r => 
      r.model.includes('haiku') || r.model.includes('Haiku')
    );
    
    console.log('\n🎯 CONTENT GENERATION RECOMMENDATION:');
    if (longFormModels.length > 0) {
      console.log(`✅ Use for blog posts: ${longFormModels[0].model}`);
      console.log(`   Capable of 1500+ word articles`);
      if (longFormModels.length > 1) {
        console.log(`   Fallback: ${longFormModels[1].model}`);
      }
    } else {
      console.log('⚠️  Only Haiku models available - will produce short content');
    }
    
    console.log('\n🔧 RECOMMENDED CONFIGURATION:');
    if (longFormModels.length > 0) {
      console.log(`PRIMARY_CLAUDE_MODEL=${longFormModels[0].model}`);
      const fallbacks = [...longFormModels.slice(1), ...haikuModels].slice(0, 2);
      if (fallbacks.length > 0) {
        console.log(`FALLBACK_CLAUDE_MODELS=${fallbacks.map(r => r.model).join(',')}`);
      }
    } else {
      console.log('❌ No long-form models available - need account tier upgrade');
    }
  } else {
    console.log('❌ NO WORKING MODELS FOUND');
  }
  
  if (accessDenied.length > 0) {
    console.log('\n🔒 ACCESS DENIED MODELS (Account tier issue):');
    accessDenied.forEach(r => {
      console.log(`   - ${r.model}: Need higher tier/more credits`);
    });
  }
  
  if (notWorking.length > 0) {
    console.log('\n❌ NOT AVAILABLE:');
    notWorking.forEach(r => {
      console.log(`   - ${r.model}: ${r.error || 'Unknown error'}`);
    });
  }
  
  console.log('\n💡 NEXT STEPS:');
  if (working.filter(r => !r.model.includes('haiku')).length === 0) {
    console.log('   1. Check Console account credits/balance');
    console.log('   2. Consider adding credits for higher-tier model access');
    console.log('   3. Current Haiku-only setup produces brief content (76 words)');
  } else {
    console.log('   1. Update environment with working long-form models');
    console.log('   2. Test content generation quality');
    console.log('   3. Deploy for production automation');
  }
  
  return { working, notWorking, accessDenied };
}

testCurrentGenerationModels()
  .then(() => {
    console.log('\n✅ Current generation model testing complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Testing failed:', error);
    process.exit(1);
  });