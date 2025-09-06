#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import path from 'path';

const testStaticPageGeneration = () => {
  console.log('🧪 Testing comprehensive static page generation...');
  
  // Test static marketing pages
  const staticPages = [
    { file: 'dist/index.html', title: 'Netfin - Expert Financial Advisory & Wealth Management Services' },
    { file: 'dist/wealth-management/index.html', title: 'Wealth Management Services - Comprehensive Financial Planning | Netfin' },
    { file: 'dist/financial-planning/index.html', title: 'Financial Planning Services - Secure Your Financial Future | Netfin' },
    { file: 'dist/contact/index.html', title: 'Contact Netfin - Get Expert Financial Advice Today' },
    { file: 'dist/insights/index.html', title: 'Financial Insights & Expert Articles - Netfin Blog' }
  ];
  
  for (const page of staticPages) {
    const fullPath = path.resolve(page.file);
    
    if (!existsSync(fullPath)) {
      console.error(`❌ Test failed: ${page.file} does not exist`);
      process.exit(1);
    }
    
    const content = readFileSync(fullPath, 'utf8');
    
    if (!content.includes(`<title>${page.title}</title>`)) {
      console.error(`❌ Test failed: ${page.file} missing correct title`);
      process.exit(1);
    }
    
    if (!content.includes('property="og:type" content="website"')) {
      console.error(`❌ Test failed: ${page.file} missing og:type`);
      process.exit(1);
    }
    
    if (!content.includes('<div id="root"></div>')) {
      console.error(`❌ Test failed: ${page.file} missing React root div`);
      process.exit(1);
    }
    
    console.log(`✅ Static page: ${page.file}`);
  }
  
  // Test blog post from Sanity
  const blogFile = 'dist/insights/isa-vs-sipp-which-investment-vehicle-is-right-for-uk-investors-in-2025/index.html';
  const blogPath = path.resolve(blogFile);
  
  if (existsSync(blogPath)) {
    const blogContent = readFileSync(blogPath, 'utf8');
    
    const requiredBlogTags = [
      '<title>ISA vs SIPP: Which Investment Vehicle Is Right for UK Investors in 2025?</title>',
      'property="og:type" content="article"',
      'property="article:published_time"',
      'property="twitter:card" content="summary_large_image"'
    ];
    
    for (const tag of requiredBlogTags) {
      if (!blogContent.includes(tag)) {
        console.error(`❌ Test failed: Blog post missing: ${tag}`);
        process.exit(1);
      }
    }
    console.log(`✅ Blog post: ${blogFile}`);
  } else {
    console.log('⚠️  No Sanity blog posts found (expected on localhost)');
  }
  
  console.log('🎉 All tests passed! Comprehensive static page generation working correctly.');
  console.log('📊 LinkedIn Post Inspector will now see proper meta tags for ALL pages!');
  return true;
};

testStaticPageGeneration();