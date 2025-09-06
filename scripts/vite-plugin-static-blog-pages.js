import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'uvt95dbx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

function generateBlogHTML(post, assets) {
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

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://netfin.co.uk/insights/${post.slug}">
  <meta property="twitter:title" content="${post.title}">
  <meta property="twitter:description" content="${post.excerpt}">
  <meta property="twitter:image" content="${post.featuredImage || 'https://netfin.co.uk/og-image.jpg'}">
  <meta property="twitter:creator" content="@NetfinUK">
  <meta property="twitter:site" content="@NetfinUK">

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

export function staticBlogPages() {
  return {
    name: 'static-blog-pages',
    async generateBundle(options, bundle) {
      try {
        console.log('🚀 Generating static blog pages with meta tags...');
        
        const query = `*[_type == "post" && !(_id in path("drafts.**"))] {
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
        
        const posts = await client.fetch(query);
        console.log(`📝 Found ${posts.length} blog posts from Sanity`);
        
        // Get all assets for injection
        const assets = Object.keys(bundle).map(key => bundle[key]).filter(asset => asset.fileName);
        
        for (const post of posts) {
          if (!post.slug) continue;
          
          const processedPost = {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            publishedDate: post.publishedAt,
            tags: post.tags || [],
            author: post.author,
            featuredImage: post.featuredImageUrl || post.mainImage || 'https://netfin.co.uk/og-image.jpg'
          };
          
          const html = generateBlogHTML(processedPost, assets);
          const fileName = `insights/${post.slug}/index.html`;
          
          this.emitFile({
            type: 'asset',
            fileName,
            source: html
          });
          
          console.log(`✅ Generated: ${fileName}`);
        }
        
        console.log('🎉 Static blog pages generation complete!');
      } catch (error) {
        console.error('❌ Error generating static blog pages:', error);
        console.warn('⚠️  Continuing build without static blog pages');
      }
    }
  };
}