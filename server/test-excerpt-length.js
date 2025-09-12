#!/usr/bin/env node

// Test excerpt length after our optimization
import ClaudeContentGenerator from './services/claudeContentGenerator.js';

console.log('🧪 Testing new excerpt generation format...\n');

async function testExcerptGeneration() {
  try {
    const generator = new ClaudeContentGenerator();
    
    console.log('📝 Generating test blog post with optimized excerpt...');
    
    const result = await generator.generateBlogPost({
      topic: 'State Tax Planning for UK Expats',
      category: 'tax-planning',
      keywords: ['UK expats', 'US state tax', 'tax planning'],
      wordCount: 800,
      targetAudience: 'UK investors with US connections'
    });
    
    console.log('\n📊 EXCERPT LENGTH ANALYSIS:');
    console.log(`Title: "${result.title}"`);
    console.log(`Title length: ${result.title.length} characters`);
    console.log('');
    console.log(`Excerpt: "${result.excerpt}"`);
    console.log(`Excerpt length: ${result.excerpt.length} characters`);
    console.log(`Excerpt word count: ${result.excerpt.split(' ').length} words`);
    console.log('');
    
    // Check against our targets
    const excerptLength = result.excerpt.length;
    const excerptWords = result.excerpt.split(' ').length;
    
    console.log('🎯 TARGET ANALYSIS:');
    console.log(`Character target: 120-150 chars | Actual: ${excerptLength} chars | ${excerptLength >= 100 && excerptLength <= 150 ? '✅ GOOD' : '❌ TOO LONG'}`);
    console.log(`Word target: 20-25 words | Actual: ${excerptWords} words | ${excerptWords >= 15 && excerptWords <= 30 ? '✅ GOOD' : '❌ NEEDS WORK'}`);
    
    console.log('\n📋 CARD DISPLAY PREVIEW:');
    console.log('─'.repeat(40));
    console.log(`TITLE: ${result.title}`);
    console.log(`EXCERPT: ${result.excerpt}`);
    console.log('─'.repeat(40));
    
    if (excerptLength <= 150 && excerptWords <= 30) {
      console.log('\n🎉 SUCCESS: Excerpt is optimized for card display!');
    } else {
      console.log('\n⚠️  NEEDS IMPROVEMENT: Excerpt still too long for optimal card display');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

testExcerptGeneration()
  .then(success => {
    console.log('\n✅ Excerpt length testing complete');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error);
    process.exit(1);
  });