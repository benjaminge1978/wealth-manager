#!/usr/bin/env node

// Debug model configuration loading
import ModelManager from './services/modelManager.js';
import { env } from './config/environment.js';

console.log('🔍 Debugging ModelManager configuration...\n');

console.log('📋 Environment Variables:');
console.log(`PRIMARY_CLAUDE_MODEL: "${env.PRIMARY_CLAUDE_MODEL}"`);
console.log(`FALLBACK_CLAUDE_MODELS: "${env.FALLBACK_CLAUDE_MODELS}"`);
console.log('');

const modelManager = new ModelManager();

console.log('🤖 ModelManager Configuration:');
console.log('Primary:', modelManager.modelConfig.primary);
console.log('Fallbacks:', modelManager.modelConfig.fallbacks);
console.log('All models:', modelManager.modelConfig.all);
console.log(`Total models: ${modelManager.modelConfig.all.length}`);
console.log('');

console.log('🧪 Testing each configured model individually...');

for (const model of modelManager.modelConfig.all) {
  try {
    console.log(`\nTesting: ${model}`);
    const isHealthy = await modelManager.checkModelHealth(model);
    console.log(`Result: ${isHealthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`);
  } catch (error) {
    console.log(`Result: ❌ ERROR - ${error.message}`);
  }
}

console.log('\n✅ Debug complete');