import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOHead({
  title = 'Netfin - Expert Financial Advisory & Wealth Management Services',
  description = 'Achieve financial success through personalized, goals-based planning and regulated investment advice. Expert wealth management services to help you build the life you want.',
  image = 'https://netfin.co.uk/og-image.jpg',
  url = 'https://netfin.co.uk/',
  type = 'website',
  keywords = 'wealth management, financial advisor, investment planning, retirement planning, financial consulting, portfolio management',
  author = 'Netfin',
  publishedTime,
  modifiedTime
}: SEOHeadProps) {
  
  return (
    <Helmet>
      {/* Primary SEO Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Netfin" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@NetfinUK" />
      <meta property="twitter:site" content="@NetfinUK" />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Additional meta for better social sharing */}
      <meta property="og:image:alt" content={`${title} - Netfin Wealth Management`} />
      <meta name="twitter:image:alt" content={`${title} - Netfin Wealth Management`} />
    </Helmet>
  );
}