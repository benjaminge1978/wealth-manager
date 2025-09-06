#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const testStaticBlogGeneration = () => {
  console.log('🧪 Testing static blog page generation...');
  
  const expectedFile = 'dist/insights/isa-vs-sipp-which-investment-vehicle-is-right-for-uk-investors-in-2025/index.html';
  const fullPath = path.resolve(expectedFile);
  
  // Test 1: File exists
  if (!existsSync(fullPath)) {
    console.error('❌ Test failed: Generated HTML file does not exist');
    process.exit(1);
  }
  console.log('✅ Static HTML file exists');
  
  // Test 2: Contains proper meta tags
  const content = readFileSync(fullPath, 'utf8');
  
  const requiredTags = [
    '<title>ISA vs SIPP: Which Investment Vehicle Is Right for UK Investors in 2025?</title>',
    'property="og:type" content="article"',
    'property="og:title" content="ISA vs SIPP: Which Investment Vehicle Is Right for UK Investors in 2025?"',
    'property="article:published_time"',
    'property="twitter:card" content="summary_large_image"',
    '<div id="root"></div>',
    'type="module"'
  ];
  
  for (const tag of requiredTags) {
    if (!content.includes(tag)) {
      console.error(`❌ Test failed: Missing required tag: ${tag}`);
      process.exit(1);
    }
  }
  console.log('✅ All required meta tags present');
  
  // Test 3: Contains SPA JavaScript
  if (!content.includes('script type="module"')) {
    console.error('❌ Test failed: Missing SPA JavaScript');
    process.exit(1);
  }
  console.log('✅ SPA JavaScript included');
  
  console.log('🎉 All tests passed! Static blog page generation working correctly.');
  return true;
};

testStaticBlogGeneration();