#!/usr/bin/env node

import SanityIntegration from './services/sanityIntegration.js';

console.log('🧪 Testing Markdown Conversion Fix...\n');

const sanity = new SanityIntegration();

// Test markdown that might cause the truncation issue
const testMarkdown = `# Complete Guide to UK Investments

## Understanding the Fundamental Differences

This section explains the key differences between investment options available to UK investors.

## Detailed Tax Comparison Analysis

Here we provide a comprehensive analysis of tax implications for different investment vehicles.

### Key Benefits and Considerations

Some additional content here to test paragraph handling.

## Professional Recommendations

Final recommendations based on our analysis.
`;

console.log('Original markdown:');
console.log('---');
console.log(testMarkdown);
console.log('---\n');

const portableText = sanity.convertMarkdownToPortableText(testMarkdown);

console.log('Converted to Portable Text:');
console.log('---');
portableText.forEach((block, index) => {
  const style = block.style || 'normal';
  const text = block.children?.[0]?.text || '';
  console.log(`${index + 1}. [${style}] "${text}"`);
});
console.log('---\n');

// Check for any single character blocks (the bug we're fixing)
const singleCharBlocks = portableText.filter(block => {
  const text = block.children?.[0]?.text || '';
  return text.length === 1 && /[a-zA-Z]/.test(text);
});

if (singleCharBlocks.length > 0) {
  console.log('❌ Found single character blocks (bug still present):');
  singleCharBlocks.forEach(block => {
    console.log(`   - "${block.children[0].text}"`);
  });
} else {
  console.log('✅ No single character blocks found - fix appears to be working!');
}

// Check for truncated headings
const headingBlocks = portableText.filter(block => 
  block.style && block.style.startsWith('h')
);

console.log('\nHeading analysis:');
headingBlocks.forEach(block => {
  const text = block.children?.[0]?.text || '';
  const endsWithS = text.endsWith('s') && text.length > 1;
  console.log(`${block.style}: "${text}" ${endsWithS ? '✅' : '⚠️'}`);
});

console.log('\n🧪 Markdown conversion test completed!');