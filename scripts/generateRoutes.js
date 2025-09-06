// Script to generate all routes for prerendering, including dynamic Sanity blog posts
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'uvt95dbx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

async function generateRoutes() {
  // Static routes
  const staticRoutes = [
    '/',
    '/wealth-management',
    '/financial-planning',
    '/financial-planning-guide-uk',
    '/risk-management',
    '/investment-advisory',
    '/education-planning',
    '/retirement-planning',
    '/how-to-choose-financial-advisor',
    '/contact',
    '/privacy',
    '/cookies',
    '/insights',
    // City advisor pages
    '/financial-advisors-london',
    '/financial-advisors-manchester',
    '/financial-advisors-edinburgh',
    '/financial-advisors-birmingham',
    '/financial-advisors-leeds',
    // Guide pages
    '/financial-advisor-selection-checklist',
    '/financial-advisor-interview-questions',
    '/fee-only-vs-commission-financial-advisors',
    // Static blog posts
    '/insights/maximizing-your-retirement-savings-2025',
    '/insights/understanding-market-volatility',
    '/insights/estate-planning-essentials',
    '/insights/tax-efficient-investment-strategies',
    '/insights/building-generational-wealth',
    '/insights/navigating-inflation-investment-strategy',
    '/insights/sustainable-investing-esg',
    '/insights/cryptocurrency-portfolio-allocation',
    '/insights/healthcare-costs-retirement',
    '/insights/financial-planning-millennials',
  ];

  try {
    // Fetch all blog posts from Sanity
    const query = `*[_type == "post" && !(_id in path("drafts.**"))] {
      "slug": slug.current
    }`;
    
    const posts = await client.fetch(query);
    
    // Add dynamic blog routes
    const blogRoutes = posts
      .filter(post => post.slug)
      .map(post => `/insights/${post.slug}`);
    
    // Combine all routes
    const allRoutes = [...staticRoutes, ...blogRoutes];
    
    // Remove duplicates
    const uniqueRoutes = [...new Set(allRoutes)];
    
    console.log(`Generated ${uniqueRoutes.length} routes for prerendering`);
    console.log('Including', blogRoutes.length, 'dynamic blog posts from Sanity');
    
    return uniqueRoutes;
  } catch (error) {
    console.error('Error fetching Sanity posts:', error);
    // Return static routes if Sanity fetch fails
    return staticRoutes;
  }
}

module.exports = { generateRoutes };

// If run directly, output the routes
if (require.main === module) {
  generateRoutes().then(routes => {
    console.log(JSON.stringify(routes, null, 2));
  });
}