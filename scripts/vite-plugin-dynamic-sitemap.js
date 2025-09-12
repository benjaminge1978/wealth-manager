import { createClient } from '@sanity/client';
import { writeFileSync } from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'uvt95dbx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

// Static page definitions (matches static blog plugin)
const staticPages = [
  {
    url: 'https://netfin.co.uk/',
    lastmod: '2025-01-05',
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: 'https://netfin.co.uk/wealth-management',
    lastmod: '2025-01-05', 
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/financial-planning',
    lastmod: '2025-01-05',
    changefreq: 'monthly', 
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/risk-management',
    lastmod: '2025-01-05',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/investment-advisory', 
    lastmod: '2025-01-05',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/education-planning',
    lastmod: '2025-01-05',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/retirement-planning',
    lastmod: '2025-01-05',
    changefreq: 'monthly', 
    priority: 0.9
  },
  {
    url: 'https://netfin.co.uk/contact',
    lastmod: '2025-01-05',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: 'https://netfin.co.uk/insights',
    lastmod: '2025-01-05',
    changefreq: 'weekly',
    priority: 0.8
  }
];

// Calculate priority based on publish date
function calculateBlogPriority(publishDate) {
  if (!publishDate) return 0.7;
  
  const now = new Date();
  const published = new Date(publishDate);
  const daysSincePublished = (now - published) / (1000 * 60 * 60 * 24);
  
  // Recent posts (within 30 days) get higher priority
  if (daysSincePublished <= 30) return 0.8;
  
  // Older posts get standard priority
  return 0.7;
}

// Format date for sitemap (ISO 8601)
function formatSitemapDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  
  return new Date(date).toISOString().split('T')[0];
}

// Generate sitemap XML
function generateSitemapXML(pages) {
  const urlEntries = pages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export function dynamicSitemap() {
  return {
    name: 'dynamic-sitemap',
    async generateBundle() {
      console.log('🗺️  Generating dynamic sitemap with blog posts...');
      
      let allPages = [...staticPages];
      
      try {
        // Fetch blog posts from Sanity (same query as static blog plugin)
        const query = `*[(_type == "post" || _type == "blogPost") && !(_id in path("drafts.**"))] {
          _id,
          title,
          "slug": slug.current,
          publishedAt
        }`;
        
        const posts = await client.fetch(query);
        console.log(`📝 Found ${posts.length} blog posts to include in sitemap`);
        
        // Add blog posts to sitemap
        const blogPages = posts
          .filter(post => post.slug) // Only include posts with valid slugs
          .map(post => ({
            url: `https://netfin.co.uk/insights/${post.slug}`,
            lastmod: formatSitemapDate(post.publishedAt),
            changefreq: 'weekly',
            priority: calculateBlogPriority(post.publishedAt)
          }));
        
        allPages.push(...blogPages);
        
        console.log(`✅ Sitemap includes ${staticPages.length} static pages + ${blogPages.length} blog posts`);
        
      } catch (sanityError) {
        console.warn('⚠️  Failed to fetch blog posts from Sanity:', sanityError.message);
        console.warn('⚠️  Sitemap will include only static pages');
      }
      
      // Sort by priority (highest first), then by URL
      allPages.sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return a.url.localeCompare(b.url);
      });
      
      // Generate and write sitemap
      const sitemapContent = generateSitemapXML(allPages);
      const sitemapPath = path.resolve('public/sitemap.xml');
      
      try {
        writeFileSync(sitemapPath, sitemapContent, 'utf8');
        console.log(`🎯 Dynamic sitemap generated with ${allPages.length} URLs`);
        console.log(`📍 Sitemap written to: ${sitemapPath}`);
      } catch (writeError) {
        console.error('❌ Failed to write sitemap:', writeError.message);
      }
    }
  };
}