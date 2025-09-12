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

// Helper function to generate page-specific content
function generatePageContent(page) {
  const route = page.route;
  
  if (route === '/') {
    return `
      <section>
        <h2>Expert Financial Advisory Services</h2>
        <p>Transform your financial future with personalized wealth management strategies. Our experienced team provides comprehensive financial planning, investment advisory, and retirement planning services tailored to your unique goals.</p>
        
        <h3>Our Core Services</h3>
        <ul>
          <li><strong>Wealth Management:</strong> Comprehensive portfolio management and investment strategies</li>
          <li><strong>Financial Planning:</strong> Strategic planning for your financial goals and future security</li>
          <li><strong>Investment Advisory:</strong> Professional guidance on investment opportunities and risk management</li>
          <li><strong>Retirement Planning:</strong> Pension advice, SIPP management, and retirement income strategies</li>
        </ul>
      </section>`;
  }
  
  if (route === '/wealth-management') {
    return `
      <section>
        <h2>Comprehensive Wealth Management Services</h2>
        <p>Our wealth management services help high-net-worth individuals and families build, preserve, and transfer wealth across generations. We provide personalized investment strategies, portfolio management, and financial planning.</p>
        
        <h3>Wealth Management Solutions</h3>
        <ul>
          <li>Portfolio construction and asset allocation</li>
          <li>Risk management and diversification strategies</li>
          <li>Tax-efficient investment planning</li>
          <li>Estate planning and wealth transfer</li>
        </ul>
        
        <h3>Investment Philosophy</h3>
        <p>We believe in evidence-based investing, focusing on long-term wealth creation through diversified portfolios aligned with your risk tolerance and financial objectives.</p>
      </section>`;
  }
  
  if (route === '/financial-planning') {
    return `
      <section>
        <h2>Strategic Financial Planning</h2>
        <p>Create a roadmap to financial success with our comprehensive financial planning services. We help you set achievable goals, optimize your finances, and secure your family's future.</p>
        
        <h3>Financial Planning Services</h3>
        <ul>
          <li>Goal-based financial planning</li>
          <li>Cash flow analysis and budgeting</li>
          <li>Tax planning and optimization</li>
          <li>Insurance and protection planning</li>
          <li>Education funding strategies</li>
        </ul>
        
        <h3>Our Planning Process</h3>
        <p>We follow a structured approach: understanding your goals, analyzing your current situation, developing strategies, implementing solutions, and providing ongoing review and adjustment.</p>
      </section>`;
  }
  
  if (route === '/investment-advisory') {
    return `
      <section>
        <h2>Professional Investment Advisory</h2>
        <p>Make informed investment decisions with guidance from our experienced investment advisors. We provide research-driven investment strategies and ongoing portfolio monitoring.</p>
        
        <h3>Investment Services</h3>
        <ul>
          <li>Investment strategy development</li>
          <li>Asset allocation and portfolio construction</li>
          <li>Security selection and analysis</li>
          <li>Performance monitoring and reporting</li>
          <li>Market research and insights</li>
        </ul>
        
        <h3>Investment Approach</h3>
        <p>We combine fundamental analysis with modern portfolio theory to create diversified investment strategies that align with your risk profile and return objectives.</p>
      </section>`;
  }
  
  if (route === '/retirement-planning') {
    return `
      <section>
        <h2>Retirement Planning Expertise</h2>
        <p>Secure your retirement with comprehensive pension planning and investment strategies. Our advisors help you maximize your retirement savings and create sustainable income streams.</p>
        
        <h3>Retirement Services</h3>
        <ul>
          <li>Pension advice and SIPP management</li>
          <li>ISA and investment planning</li>
          <li>Retirement income strategies</li>
          <li>Annuity and drawdown options</li>
          <li>State pension optimization</li>
        </ul>
        
        <h3>Retirement Strategy</h3>
        <p>We help you understand your retirement options, optimize your pension contributions, and create a withdrawal strategy that provides sustainable income throughout retirement.</p>
      </section>`;
  }
  
  if (route === '/contact') {
    return `
      <section>
        <h2>Get Expert Financial Advice</h2>
        <p>Ready to take control of your financial future? Our qualified financial advisors are here to help you achieve your goals through personalized financial planning and investment strategies.</p>
        
        <h3>Why Choose Netfin?</h3>
        <ul>
          <li>FCA regulated and qualified advisors</li>
          <li>Personalized financial strategies</li>
          <li>Comprehensive service offering</li>
          <li>Ongoing support and review</li>
        </ul>
        
        <h3>Book Your Free Consultation</h3>
        <p>Contact us today to schedule a complimentary consultation with one of our experienced financial advisors. We'll discuss your goals and show you how we can help you achieve them.</p>
      </section>`;
  }
  
  // Default content for other pages
  return `
    <section>
      <h2>Professional Financial Services</h2>
      <p>Discover how our expert financial advisory services can help you achieve your financial goals. From wealth management to retirement planning, we provide comprehensive solutions tailored to your needs.</p>
    </section>`;
}

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
  
  <style>
    /* Basic SEO-friendly styles for static content */
    body { font-family: 'DM Sans', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    header { background: #1e40af; color: white; padding: 1rem 0; }
    nav { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    nav ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
    nav a { color: white; text-decoration: none; font-weight: 500; }
    main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 2.5rem; color: #1e40af; margin-bottom: 1rem; }
    h2 { font-size: 2rem; color: #1e40af; margin: 2rem 0 1rem 0; }
    h3 { font-size: 1.5rem; color: #1e40af; margin: 1.5rem 0 0.5rem 0; }
    section { margin-bottom: 3rem; }
    ul { margin: 1rem 0; padding-left: 2rem; }
    li { margin-bottom: 0.5rem; }
    a { color: #1e40af; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .cta-button { background: #1e40af; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; display: inline-block; margin-top: 1rem; }
  </style>
</head>
<body>
  <div id="root">
    <!-- Static content for SEO - React will hydrate over this -->
    <header>
      <nav>
        <a href="/" aria-label="Netfin Home">Netfin</a>
        <ul>
          <li><a href="/wealth-management">Wealth Management</a></li>
          <li><a href="/financial-planning">Financial Planning</a></li>
          <li><a href="/investment-advisory">Investment Advisory</a></li>
          <li><a href="/retirement-planning">Retirement Planning</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <h1>${page.title.replace(' | Netfin', '')}</h1>
      <p><strong>${page.description}</strong></p>
      
      ${generatePageContent(page)}
      
      <section>
        <h2>Why Choose Netfin?</h2>
        <p>Netfin provides comprehensive financial advisory services to UK investors and families. Our qualified, FCA-regulated advisors help you build wealth, plan for retirement, and achieve your financial goals through personalized investment strategies and ongoing support.</p>
        
        <ul>
          <li><strong>FCA Regulated:</strong> Fully authorized and regulated financial advisors</li>
          <li><strong>Personalized Service:</strong> Tailored strategies for your unique situation</li>
          <li><strong>Comprehensive Solutions:</strong> From wealth management to retirement planning</li>
          <li><strong>Ongoing Support:</strong> Regular reviews and strategy adjustments</li>
        </ul>
      </section>
      
      <section>
        <h2>Start Your Financial Journey Today</h2>
        <p>Ready to take control of your financial future? Contact our experienced financial advisors for a free consultation. We're here to help you make informed investment decisions and secure your financial future.</p>
        <a href="/contact" class="cta-button">Get Your Free Consultation</a>
      </section>
    </main>
  </div>
  
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
  
  <style>
    /* Basic SEO-friendly styles for static content */
    body { font-family: 'DM Sans', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    header { background: #1e40af; color: white; padding: 1rem 0; }
    nav { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
    nav ul { list-style: none; display: flex; gap: 2rem; margin: 0; padding: 0; }
    nav a { color: white; text-decoration: none; font-weight: 500; }
    main { max-width: 800px; margin: 0 auto; padding: 2rem; }
    article { margin-bottom: 3rem; }
    h1 { font-size: 2.5rem; color: #1e40af; margin-bottom: 1rem; line-height: 1.2; }
    h2 { font-size: 2rem; color: #1e40af; margin: 2rem 0 1rem 0; }
    h3 { font-size: 1.5rem; color: #1e40af; margin: 1.5rem 0 0.5rem 0; }
    .article-meta { color: #666; margin-bottom: 2rem; }
    .article-excerpt { font-size: 1.1rem; color: #555; margin-bottom: 2rem; font-style: italic; }
    section { margin-bottom: 2rem; }
    p { margin-bottom: 1rem; }
    a { color: #1e40af; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .tags { margin-top: 2rem; }
    .tag { display: inline-block; background: #f0f0f0; padding: 0.25rem 0.5rem; margin: 0.25rem; border-radius: 0.25rem; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div id="root">
    <!-- Static content for SEO - React will hydrate over this -->
    <header>
      <nav>
        <a href="/" aria-label="Netfin Home">Netfin</a>
        <ul>
          <li><a href="/insights">Articles</a></li>
          <li><a href="/wealth-management">Wealth Management</a></li>
          <li><a href="/financial-planning">Financial Planning</a></li>
          <li><a href="/investment-advisory">Investment Advisory</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <article>
        <h1>${post.title}</h1>
        
        <div class="article-meta">
          ${post.publishedDate ? `Published: ${new Date(post.publishedDate).toLocaleDateString('en-GB')}` : ''}
          ${post.author?.name ? ` • By ${post.author.name}` : ''}
        </div>
        
        <div class="article-excerpt">
          <strong>${post.excerpt}</strong>
        </div>
        
        <section>
          <h2>Expert Financial Insights</h2>
          <p>This comprehensive guide provides expert analysis and practical advice for UK investors. Our experienced financial advisors share insights to help you make informed investment decisions and optimize your financial strategy.</p>
          
          <p>At Netfin, we understand that every investor's situation is unique. That's why our articles combine market expertise with practical guidance tailored to UK regulations, tax implications, and investment opportunities.</p>
        </section>
        
        <section>
          <h2>Key Takeaways</h2>
          <p>This article covers essential considerations for UK investors, including regulatory requirements, tax implications, and strategic planning approaches. Our analysis is based on current market conditions and regulatory guidance from the FCA.</p>
          
          <p>For personalized advice based on your specific situation, we recommend consulting with one of our qualified financial advisors who can provide tailored strategies aligned with your financial goals.</p>
        </section>
        
        <section>
          <h2>Professional Financial Advice</h2>
          <p>The information provided in this article is for educational purposes and should not replace professional financial advice. Every investor's circumstances are different, and what works for one person may not be suitable for another.</p>
          
          <p>Our FCA-regulated financial advisors can provide personalized guidance based on your individual situation, risk tolerance, and financial objectives. <a href="/contact">Contact us today</a> to discuss your financial planning needs.</p>
        </section>
        
        ${post.tags && post.tags.length > 0 ? `
        <div class="tags">
          <strong>Topics:</strong>
          ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        ` : ''}
      </article>
      
      <section>
        <h2>Related Services</h2>
        <p>Interested in learning more about our financial advisory services? Explore our comprehensive offerings:</p>
        <ul>
          <li><a href="/wealth-management">Wealth Management Services</a></li>
          <li><a href="/financial-planning">Financial Planning</a></li>
          <li><a href="/investment-advisory">Investment Advisory</a></li>
          <li><a href="/retirement-planning">Retirement Planning</a></li>
        </ul>
      </section>
    </main>
  </div>
  
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