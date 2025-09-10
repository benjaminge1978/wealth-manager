import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'uvt95dbx',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

// Static page definitions with meta tags
const pageDefinitions = [
  {
    route: '/',
    fileName: 'index.html',
    title: 'Netfin - Expert Financial Advisory & Wealth Management Services',
    description: 'Achieve financial success through personalized, goals-based planning and regulated investment advice. Expert wealth management services to help you build the life you want.',
    keywords: 'wealth management, financial advisor, investment planning, retirement planning, financial consulting, portfolio management',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/wealth-management',
    fileName: 'wealth-management/index.html',
    title: 'Wealth Management Services - Comprehensive Financial Planning | Netfin',
    description: 'Professional wealth management services tailored to your goals. Portfolio management, investment strategy, and financial planning from experienced advisors.',
    keywords: 'wealth management, portfolio management, investment strategy, financial planning, asset allocation',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/financial-planning',
    fileName: 'financial-planning/index.html',
    title: 'Financial Planning Services - Secure Your Financial Future | Netfin',
    description: 'Comprehensive financial planning services including retirement planning, investment advice, and tax optimization strategies from qualified financial advisors.',
    keywords: 'financial planning, retirement planning, investment advice, tax planning, financial goals',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/investment-advisory',
    fileName: 'investment-advisory/index.html',
    title: 'Investment Advisory Services - Professional Portfolio Management | Netfin',
    description: 'Expert investment advisory services with personalized portfolio management, asset allocation strategies, and ongoing investment monitoring.',
    keywords: 'investment advisory, portfolio management, asset allocation, investment strategy, financial advisor',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/retirement-planning',
    fileName: 'retirement-planning/index.html',
    title: 'Retirement Planning Services - Secure Your Future | Netfin',
    description: 'Professional retirement planning services including pension advice, SIPP management, and retirement income strategies from qualified advisors.',
    keywords: 'retirement planning, pension advice, SIPP, retirement income, pension management',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/risk-management',
    fileName: 'risk-management/index.html',
    title: 'Risk Management & Protection Planning Services | Netfin',
    description: 'Comprehensive risk management and protection planning services including life insurance, critical illness cover, and income protection advice.',
    keywords: 'risk management, life insurance, critical illness, income protection, insurance advice',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/education-planning',
    fileName: 'education-planning/index.html',
    title: 'Education Planning & School Fee Planning Services | Netfin',
    description: 'Education planning services to fund your children\'s future. School fee planning, university funding, and education savings strategies.',
    keywords: 'education planning, school fees, university funding, education savings, children education',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/contact',
    fileName: 'contact/index.html',
    title: 'Contact Netfin - Get Expert Financial Advice Today',
    description: 'Contact Netfin for professional financial advice and wealth management services. Book your free consultation with our qualified financial advisors.',
    keywords: 'contact financial advisor, financial consultation, wealth management contact, financial advice',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/how-to-choose-financial-advisor',
    fileName: 'how-to-choose-financial-advisor/index.html',
    title: 'How to Choose a Financial Advisor - Complete UK Guide | Netfin',
    description: 'Comprehensive guide on choosing the right financial advisor in the UK. Learn about qualifications, fees, services, and red flags to avoid.',
    keywords: 'choose financial advisor, financial advisor guide, UK financial advice, advisor qualifications',
    image: 'https://netfin.co.uk/og-image.jpg'
  },
  {
    route: '/insights',
    fileName: 'insights/index.html',
    title: 'Financial Insights & Expert Articles - Netfin Blog',
    description: 'Expert financial insights, investment strategies, and wealth management tips from qualified financial advisors. Stay informed with our latest articles.',
    keywords: 'financial insights, investment articles, wealth management blog, financial tips, expert advice',
    image: 'https://netfin.co.uk/og-image.jpg'
  }
];

function generateStaticPageHTML(page, assets) {
  const jsAssets = assets.filter(asset => asset.fileName.endsWith('.js') && asset.fileName.includes('index-'));
  const cssAssets = assets.filter(asset => asset.fileName.endsWith('.css'));
  const moduleAssets = assets.filter(asset => asset.fileName.endsWith('.js') && !asset.fileName.includes('index-'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Page-specific SEO Meta Tags -->
  <title>${page.title}</title>
  <meta name="title" content="${page.title}">
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="${page.keywords}">
  <meta name="author" content="Netfin Team">
  <link rel="canonical" href="https://netfin.co.uk${page.route === '/' ? '' : page.route}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://netfin.co.uk${page.route === '/' ? '' : page.route}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${page.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Netfin">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://netfin.co.uk${page.route === '/' ? '' : page.route}">
  <meta property="twitter:title" content="${page.title}">
  <meta property="twitter:description" content="${page.description}">
  <meta property="twitter:image" content="${page.image}">
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

function generateBlogHTML(post, assets) {
  const jsAssets = assets.filter(asset => asset.fileName.endsWith('.js') && asset.fileName.includes('index-'));
  const cssAssets = assets.filter(asset => asset.fileName.endsWith('.css'));
  const moduleAssets = assets.filter(asset => asset.fileName.endsWith('.js') && !asset.fileName.includes('index-'));

  // Use custom SEO fields if available, fallback to defaults
  const seo = post.seo || {};
  const metaTitle = seo.metaTitle || post.title;
  const metaDescription = seo.metaDescription || post.excerpt;
  const ogTitle = seo.ogTitle || seo.metaTitle || post.title;
  const ogDescription = seo.ogDescription || seo.metaDescription || post.excerpt;
  const twitterTitle = seo.twitterTitle || ogTitle;
  const keywords = seo.seoKeywords?.join(', ') || post.tags?.join(', ') || 'financial advice, wealth management';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Blog-specific SEO Meta Tags -->
  <title>${metaTitle}</title>
  <meta name="title" content="${metaTitle}">
  <meta name="description" content="${metaDescription}">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="${post.author?.name || 'Netfin Team'}">
  ${seo.focusKeyword ? `<meta name="focus-keyword" content="${seo.focusKeyword}">` : ''}
  <link rel="canonical" href="https://netfin.co.uk/insights/${post.slug}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://netfin.co.uk/insights/${post.slug}">
  <meta property="og:title" content="${ogTitle}">
  <meta property="og:description" content="${ogDescription}">
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
  <meta property="twitter:title" content="${twitterTitle}">
  <meta property="twitter:description" content="${ogDescription}">
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

export function staticPages() {
  return {
    name: 'static-pages',
    async generateBundle(options, bundle) {
      try {
        console.log('🚀 Generating static pages with meta tags...');
        
        // Get all assets for injection
        const assets = Object.keys(bundle).map(key => bundle[key]).filter(asset => asset.fileName);
        
        // Generate static marketing pages
        console.log(`📄 Generating ${pageDefinitions.length} static pages...`);
        for (const page of pageDefinitions) {
          const html = generateStaticPageHTML(page, assets);
          
          this.emitFile({
            type: 'asset',
            fileName: page.fileName,
            source: html
          });
          
          console.log(`✅ Generated: ${page.fileName}`);
        }
        
        // Generate dynamic blog pages from Sanity
        try {
          const query = `*[(_type == "post" || _type == "blogPost") && !(_id in path("drafts.**"))] {
            _id,
            title,
            "slug": slug.current,
            excerpt,
            publishedAt,
            tags,
            author->{name, role},
            featuredImageUrl,
            mainImage,
            seo
          }`;
          
          const posts = await client.fetch(query);
          console.log(`📝 Generating ${posts.length} blog posts from Sanity...`);
          
          for (const post of posts) {
            if (!post.slug) continue;
            
            const processedPost = {
              title: post.title,
              slug: post.slug,
              excerpt: post.excerpt,
              publishedDate: post.publishedAt,
              tags: post.tags || [],
              author: post.author,
              featuredImage: post.featuredImageUrl || post.mainImage || 'https://netfin.co.uk/og-image.jpg',
              seo: post.seo || null
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
        } catch (sanityError) {
          console.error('❌ Error fetching Sanity posts:', sanityError);
          console.warn('⚠️  Continuing without dynamic blog pages');
        }
        
        console.log('🎉 Static page generation complete!');
      } catch (error) {
        console.error('❌ Error generating static pages:', error);
        console.warn('⚠️  Continuing build without static pages');
      }
    }
  };
}