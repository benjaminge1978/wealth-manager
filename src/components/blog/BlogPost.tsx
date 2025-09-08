import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BlogSidebar } from './BlogSidebar';
import { BlogFAQ } from './BlogFAQ';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { 
  Calendar, Clock, ArrowLeft, Share2, 
  Facebook, Twitter, Linkedin, Link2,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import { BlogPost as BlogPostType } from '../../types/blog';
import { useSanityData } from '../../hooks/useSanityData';
import { queries } from '../../lib/sanity';
import { BLOG_CATEGORIES } from '../../types/blog';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import ReactMarkdown from 'react-markdown';
import { SEOHead } from '../SEOHead';

// Helper function to convert Sanity's Portable Text to Markdown
function convertPortableTextToMarkdown(blocks: any[]): string {
  return blocks.map(block => {
    if (!block._type || block._type !== 'block') return '';
    
    const text = block.children?.map((child: any) => child.text || '').join('') || '';
    
    switch (block.style) {
      case 'h1':
        return `# ${text}`;
      case 'h2':
        return `## ${text}`;
      case 'h3':
        return `### ${text}`;
      case 'h4':
        return `#### ${text}`;
      case 'h5':
        return `##### ${text}`;
      case 'h6':
        return `###### ${text}`;
      case 'normal':
      default:
        return text;
    }
  }).join('\n\n');
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Fetch Sanity posts
  const { data: sanityPosts, loading: sanityLoading, error: sanityError } = useSanityData(queries.allPosts);
  
  
  // Convert Sanity post to BlogPost format (same as in BlogListing)
  const convertSanityToBlogPost = (sanityPost: any): BlogPostType => ({
    id: sanityPost._id,
    slug: sanityPost.slug?.current || sanityPost.slug,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    content: sanityPost.body ? convertPortableTextToMarkdown(sanityPost.body) : (sanityPost.content || ''),
    author: {
      name: sanityPost.author?.name || 'NetFin Team',
      role: sanityPost.author?.role || 'Financial Advisor',
      avatar: sanityPost.author?.image || '/images/team/default-avatar.jpg'
    },
    publishedDate: sanityPost.publishedAt,
    readTime: sanityPost.readTime || 5,
    category: BLOG_CATEGORIES.find(cat => cat.slug === 'investment-strategies') || BLOG_CATEGORIES[0],
    tags: sanityPost.tags || [],
    featuredImage: sanityPost.featuredImageUrl || sanityPost.mainImage || '/images/blog/default-featured.jpg',
    isFeatured: sanityPost.featured || false
  });
  
  // Search in both Sanity posts and static posts
  let post: BlogPostType | undefined;
  
  // First try to find in Sanity posts
  if (sanityPosts) {
    const convertedSanityPosts = sanityPosts.map(convertSanityToBlogPost);
    post = convertedSanityPosts.find(p => p.slug === slug);
  }
  
  // If not found in Sanity, try static posts
  if (!post) {
    post = blogPosts.find(p => p.slug === slug);
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  // Show loading while Sanity data is being fetched
  if (sanityLoading && !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  // Only show "not found" after loading is complete and post is not found
  if (!sanityLoading && !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium">Article Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/insights')}>
            Back to Insights
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category.id === post.category.id)
    .slice(0, 3);

  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const seoData = {
    title: post?.title || 'Blog Post - Netfin',
    description: post?.excerpt || 'Expert financial insights and advice from Netfin.',
    image: post?.featuredImage || 'https://netfin.co.uk/og-image.jpg',
    author: post?.author?.name || 'Netfin Team',
    publishedTime: post?.publishedDate,
    type: "article" as const,
    url: `https://netfin.co.uk/insights/${post?.slug || ''}`,
    keywords: post?.tags?.join(', ') || 'financial advice, wealth management'
  };

  return (
    <div className="bg-background pb-24">
      <SEOHead {...seoData} />
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-background via-secondary/20 to-accent/30"
        style={{ 
          paddingTop: '88px',
          paddingBottom: '64px'
        }}
      >
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
            <Button
              variant="ghost"
              onClick={() => navigate('/insights')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Button>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={post.category.color}>
                  {post.category.name}
                </Badge>
                {post.isFeatured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-medium leading-tight">
                {post.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
            {/* Article Content */}
            <article className="w-full">
              <div className="bg-card rounded-lg overflow-hidden mb-8">
                <ImageWithFallback
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-semibold mt-8 mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
                    h5: ({children}) => <h5 className="text-base font-semibold mt-3 mb-2">{children}</h5>,
                    h6: ({children}) => <h6 className="text-sm font-semibold mt-2 mb-1">{children}</h6>,
                    p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
                    ol: ({children}) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
                    li: ({children}) => <li className="leading-relaxed">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
              
              {/* FAQ Section */}
              <BlogFAQ post={post} maxFAQs={6} />
              
              {/* Tags */}
              <div className="mt-8 border-t" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">Tags:</span>
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleShare('copy')}
                    >
                      {copied ? (
                        <span className="text-xs">✓</span>
                      ) : (
                        <Link2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Navigation to prev/next posts */}
              <div className="mt-8 pt-8 border-t">
                <div className="grid sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      to={`/insights/${prevPost.slug}`}
                      className="group flex items-center gap-2 p-4 rounded-lg border hover:border-primary transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <p className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                          {prevPost.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  
                  {nextPost ? (
                    <Link
                      to={`/insights/${nextPost.slug}`}
                      className="group flex items-center gap-2 p-4 rounded-lg border hover:border-primary transition-colors justify-end text-right"
                    >
                      <div>
                        <p className="text-xs text-muted-foreground">Next</p>
                        <p className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                          {nextPost.title}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              
            </article>
        </div>
      </section>


      {/* Related Posts Section */}
      <section className="pt-8" style={{ paddingBottom: '6rem' }}>
        <div 
          className="mx-auto px-4"
          style={{ maxWidth: '50rem' }}
        >
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/insights/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="space-y-2">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedPost.readTime} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}