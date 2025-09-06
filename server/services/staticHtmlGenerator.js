import { createClient } from '@sanity/client';
import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { env } from '../config/environment.js';

class StaticHtmlGenerator {
  constructor() {
    this.client = createClient({
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET,
      apiVersion: '2025-01-01',
      useCdn: false,
    });
    
    this.distDir = path.resolve(process.cwd(), 'dist');
  }

  /**
   * Generate static HTML for a specific blog post
   * @param {string} postSlug - The slug of the post to generate
   * @returns {Promise<boolean>} Success status
   */
  async generateSinglePostHtml(postSlug) {
    try {
      console.log(`🔄 Generating static HTML for post: ${postSlug}`);

      // Check if dist directory exists
      if (!existsSync(this.distDir)) {
        throw new Error('Dist directory not found. Run npm run build first to generate assets.');
      }

      // Get built assets from dist directory
      const assets = this.getBuiltAssets();
      if (assets.length === 0) {
        throw new Error('No built assets found. Run npm run build first to generate assets.');
      }

      // Fetch the specific post from Sanity
      const post = await this.fetchSinglePost(postSlug);
      if (!post) {
        throw new Error(`Post with slug "${postSlug}" not found in Sanity CMS`);
      }

      // Generate HTML for the post
      const html = this.generateBlogHTML(post, assets);
      const fileName = `insights/${post.slug}/index.html`;
      const filePath = path.join(this.distDir, fileName);

      // Ensure directory exists
      const dirPath = path.dirname(filePath);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      // Write the HTML file
      writeFileSync(filePath, html, 'utf8');

      console.log(`✅ Generated static HTML: ${fileName}`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to generate static HTML for ${postSlug}:`, error.message);
      return false;
    }
  }

  /**
   * Generate static HTML for multiple posts by their slugs
   * @param {Array<string>} postSlugs - Array of post slugs
   * @returns {Promise<Object>} Results with success/failure counts
   */
  async generateMultiplePostsHtml(postSlugs) {
    const results = { success: 0, failed: 0, errors: [] };

    for (const slug of postSlugs) {
      const success = await this.generateSinglePostHtml(slug);
      if (success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push(slug);
      }
    }

    console.log(`📊 Generation complete: ${results.success} success, ${results.failed} failed`);
    return results;
  }

  /**
   * Generate static HTML for all recently created posts (within last hour)
   * @returns {Promise<Object>} Results with success/failure counts
   */
  async generateRecentPostsHtml() {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const recentPosts = await this.client.fetch(`
        *[(_type == "post" || _type == "blogPost") && _createdAt > $createdAfter && !(_id in path("drafts.**"))] {
          "slug": slug.current
        }
      `, { createdAfter: oneHourAgo });

      if (recentPosts.length === 0) {
        console.log('📝 No recent posts found to generate');
        return { success: 0, failed: 0, errors: [] };
      }

      console.log(`📝 Found ${recentPosts.length} recent posts to generate`);
      const slugs = recentPosts.map(post => post.slug).filter(Boolean);
      
      return await this.generateMultiplePostsHtml(slugs);

    } catch (error) {
      console.error('❌ Failed to generate recent posts HTML:', error.message);
      return { success: 0, failed: 1, errors: [error.message] };
    }
  }

  /**
   * Fetch a single post from Sanity by slug
   * @param {string} slug - Post slug
   * @returns {Promise<Object|null>} Post data or null if not found
   */
  async fetchSinglePost(slug) {
    const query = `*[(_type == "post" || _type == "blogPost") && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      tags,
      author->{name, role},
      featuredImageUrl,
      mainImage
    }`;

    const post = await this.client.fetch(query, { slug });
    
    if (!post) {
      return null;
    }

    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedDate: post.publishedAt,
      tags: post.tags || [],
      author: post.author,
      featuredImage: post.featuredImageUrl || post.mainImage || 'https://netfin.co.uk/og-image.jpg'
    };
  }

  /**
   * Get built assets from dist directory
   * @returns {Array} Array of asset objects with fileName property
   */
  getBuiltAssets() {
    const assets = [];
    
    try {
      // Look for assets in dist/assets directory
      const assetsDir = path.join(this.distDir, 'assets');
      if (!existsSync(assetsDir)) {
        return [];
      }

      const files = this.getAllFiles(assetsDir);
      
      for (const file of files) {
        const relativePath = path.relative(this.distDir, file);
        assets.push({ fileName: relativePath });
      }

    } catch (error) {
      console.warn('⚠️ Could not read built assets:', error.message);
    }

    return assets;
  }

  /**
   * Recursively get all files in a directory
   */
  getAllFiles(dirPath, arrayOfFiles = []) {
    const files = readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);
      if (statSync(fullPath).isDirectory()) {
        arrayOfFiles = this.getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  }

  /**
   * Generate blog HTML (copied from vite-plugin-static-blog-pages.js)
   * @param {Object} post - Post data
   * @param {Array} assets - Built assets
   * @returns {string} Generated HTML
   */
  generateBlogHTML(post, assets) {
    const jsAssets = assets.filter(asset => asset.fileName.endsWith('.js') && asset.fileName.includes('index-'));
    const cssAssets = assets.filter(asset => asset.fileName.endsWith('.css'));
    const moduleAssets = assets.filter(asset => asset.fileName.endsWith('.js') && !asset.fileName.includes('index-'));

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Blog-specific SEO Meta Tags -->
  <title>${post.title}</title>
  <meta name="title" content="${post.title}">
  <meta name="description" content="${post.excerpt}">
  <meta name="keywords" content="${post.tags?.join(', ') || 'financial advice, wealth management'}">
  <meta name="author" content="${post.author?.name || 'Netfin Team'}">
  <link rel="canonical" href="https://netfin.co.uk/insights/${post.slug}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://netfin.co.uk/insights/${post.slug}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:image" content="${post.featuredImage || 'https://netfin.co.uk/og-image.jpg'}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Netfin">
  <meta property="og:locale" content="en_US">
  
  <!-- Article specific Open Graph tags -->
  ${post.publishedDate ? `<meta property="article:published_time" content="${post.publishedDate}">` : ''}
  ${post.author?.name ? `<meta property="article:author" content="${post.author.name}">` : ''}

  <!-- Article tags and LinkedIn optimizations -->
  <meta property="article:section" content="Financial Advice">
  ${post.tags?.length > 0 ? post.tags.map(tag => `<meta property="article:tag" content="${tag}">`).join('\n  ') : ''}
  <meta property="og:image:alt" content="Netfin - ${post.title}">
  <meta property="og:updated_time" content="${post.publishedDate || new Date().toISOString()}">
  <meta name="linkedin:owner" content="netfin-co-uk">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://netfin.co.uk/insights/${post.slug}">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <meta name="twitter:image" content="${post.featuredImage || 'https://netfin.co.uk/og-image.jpg'}">
  <meta name="twitter:image:alt" content="Netfin - ${post.title}">
  <meta name="twitter:creator" content="@NetfinUK">
  <meta name="twitter:site" content="@NetfinUK">

  <!-- Standard site meta -->
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#1e40af">
  
  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2">
  <link rel="manifest" href="/site.webmanifest">
  
  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://uvt95dbx.apicdn.sanity.io">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">

  <!-- CSS Assets -->
  ${cssAssets.map(asset => `<link rel="stylesheet" crossorigin href="/${asset.fileName}">`).join('\n  ')}
  
  <!-- Module Preloads -->
  ${moduleAssets.map(asset => `<link rel="modulepreload" crossorigin href="/${asset.fileName}">`).join('\n  ')}
</head>
<body>
  <div id="root"></div>
  
  <!-- Main JS Bundle -->
  ${jsAssets.map(asset => `<script type="module" crossorigin src="/${asset.fileName}"></script>`).join('\n  ')}
</body>
</html>`;
  }
}

export default StaticHtmlGenerator;