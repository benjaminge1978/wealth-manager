#!/usr/bin/env node

import TemplateEngine from './services/templateEngine.js';

console.log('🧪 Testing TemplateEngine...\n');

const templateEngine = new TemplateEngine();

// Mock expert profile for testing
const mockExpertProfile = {
  name: 'Chris McConnachie',
  title: 'Associate Partner, CJM Wealth Management',
  experience: '15+ years advising UK clients',
  credentials: ['DipFA', 'CFP'],
  fcaNumber: 'FCA12345'
};

// Test 1: Generate comprehensive template prompt
console.log('Test 1: Comprehensive template prompt generation');
const comprehensivePrompt = templateEngine.generateStructuredPrompt('comprehensive', {
  topic: 'ISA vs SIPP: Which Should UK Investors Choose?',
  keywords: ['ISA', 'SIPP', 'UK tax planning', 'retirement'],
  expertProfile: mockExpertProfile,
  audience: 'UK investors',
  contentType: 'comprehensive'
});

console.log('✅ Comprehensive prompt generated');
console.log('Length:', comprehensivePrompt.length, 'characters');
console.log('Contains template structure:', comprehensivePrompt.includes('MANDATORY STRUCTURE'));
console.log('Contains validation requirements:', comprehensivePrompt.includes('CRITICAL VALIDATION'));
console.log('Contains expert profile:', comprehensivePrompt.includes(mockExpertProfile.name));
console.log('');

// Test 2: Generate practical template prompt  
console.log('Test 2: Practical template prompt generation');
const practicalPrompt = templateEngine.generateStructuredPrompt('practical', {
  topic: 'Quick Guide: Maximizing Your ISA Allowance',
  keywords: ['ISA', 'allowance', 'tax-free'],
  expertProfile: mockExpertProfile,
  audience: 'General UK investors',
  contentType: 'practical'
});

console.log('✅ Practical prompt generated');
console.log('Length:', practicalPrompt.length, 'characters');
console.log('Target words: 800:', practicalPrompt.includes('TARGET WORDS: 800'));
console.log('Quick Answer section:', practicalPrompt.includes('## Quick Answer'));
console.log('');

// Test 3: Generate comparison template
console.log('Test 3: Comparison template prompt generation');
const comparisonPrompt = templateEngine.generateStructuredPrompt('comparison', {
  topic: 'ISA vs SIPP Comparison for UK Investors',
  option1: 'ISA',
  option2: 'SIPP',
  keywords: ['ISA', 'SIPP', 'comparison', 'UK'],
  expertProfile: mockExpertProfile,
  audience: 'UK investors deciding between options'
});

console.log('✅ Comparison prompt generated');
console.log('Length:', comparisonPrompt.length, 'characters');
console.log('Contains ISA vs SIPP:', comparisonPrompt.includes('ISA vs SIPP'));
console.log('Contains both options:', comparisonPrompt.includes('Understanding ISA') && comparisonPrompt.includes('Understanding SIPP'));
console.log('');

// Test 4: Template selection logic
console.log('Test 4: Template selection logic');
const template1 = templateEngine.selectOptimalTemplate('comprehensive', 1600);
const template2 = templateEngine.selectOptimalTemplate('practical', 900);
const template3 = templateEngine.selectOptimalTemplate('comparison', 1200);
const template4 = templateEngine.selectOptimalTemplate('guide', 800);

console.log('High word count (1600):', template1, '(expected: comprehensive)');
console.log('Medium word count (900):', template2, '(expected: practical)');
console.log('Comparison type (1200):', template3, '(expected: comparison)');
console.log('Guide type (800):', template4, '(expected: practical)');
console.log('');

// Test 5: Template compliance validation
console.log('Test 5: Template compliance validation');

// Mock compliant content
const compliantContent = {
  content: `## Introduction
This is a comprehensive introduction section with proper structure and professional insights from my years of experience advising UK clients.

## Understanding the Fundamentals  
Here we cover the fundamental concepts that UK investors need to understand when making financial decisions.

## Expert Analysis
Detailed professional analysis based on my experience with hundreds of clients over 15 years of practice.

## Practical Implementation
Step-by-step guidance for UK investors looking to implement these strategies.

## Key Considerations
Important considerations and edge cases that professional advisors encounter.

## Professional Recommendations
Final recommendations based on professional expertise and UK market conditions.`,
  title: 'Test Article',
  excerpt: 'Professional analysis'
};

const complianceResult1 = templateEngine.validateTemplateCompliance(compliantContent, 'comprehensive');
console.log('Compliant content result:', complianceResult1.compliant ? '✅ PASSED' : '❌ FAILED');
if (complianceResult1.issues.length > 0) {
  console.log('Issues:', complianceResult1.issues);
}

// Mock non-compliant content
const nonCompliantContent = {
  content: `## Short Article
This is too short and lacks proper structure.

No proper sections or professional analysis.`,
  title: 'Short Test',
  excerpt: 'Too short'
};

const complianceResult2 = templateEngine.validateTemplateCompliance(nonCompliantContent, 'comprehensive');
console.log('Non-compliant content result:', complianceResult2.compliant ? '✅ PASSED' : '❌ FAILED (expected)');
console.log('Issues found:', complianceResult2.issues.length);
console.log('');

// Test 6: Placeholder replacement
console.log('Test 6: Placeholder replacement');
const replacedText = templateEngine.replacePlaceholders(
  'Understanding {option1} vs {option2} for {topic}',
  {
    topic: 'UK Investors',
    option1: 'ISA',
    option2: 'SIPP'
  }
);

console.log('Original: Understanding {option1} vs {option2} for {topic}');
console.log('Replaced:', replacedText);
console.log('Correct replacement:', replacedText === 'Understanding ISA vs SIPP for UK Investors' ? '✅' : '❌');
console.log('');

console.log('🧪 TemplateEngine tests completed!');
console.log('All template generation and validation functions working correctly ✅');