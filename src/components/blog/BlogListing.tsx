import { useState, useMemo } from 'react';
import { BlogCard } from './BlogCard';
import { BlogSidebar } from './BlogSidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { HandDrawnIcon } from '../ui/HandDrawnIcon';
import { blogPosts } from '../../data/blogPosts';
import { useSanityData } from '../../hooks/useSanityData';
import { queries } from '../../lib/sanity';
import { BLOG_CATEGORIES } from '../../types/blog';

const POSTS_PER_PAGE = 6;

// Utility function to truncate excerpts for optimal card display
const truncateExcerpt = (text: string, maxLength: number = 150): string => {
  if (!text || text.length <= maxLength) return text;
  
  // Find last complete word within limit
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  // If no space found, just truncate at max length
  if (lastSpace === -1) return truncated + '...';
  
  return truncated.substring(0, lastSpace) + '...';
};

export function BlogListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'popular'>('date');

  // Fetch live blog posts from Sanity CMS
  const { data: sanityPosts, loading, error } = useSanityData(queries.allPosts);
  
  // Debug: Log Sanity data status in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📰 Sanity posts:', sanityPosts?.length || 0, 'Loading:', loading, 'Error:', error?.message);
    if (sanityPosts && sanityPosts.length > 0) {
      console.log('📸 First post has featuredImageUrl:', sanityPosts[0]?.featuredImageUrl);
    }
  }

  // Convert Sanity posts to BlogPost format
  const convertSanityToBlogPost = (sanityPost: any) => ({
    id: sanityPost._id,
    slug: sanityPost.slug?.current || sanityPost.slug,
    title: sanityPost.title,
    excerpt: truncateExcerpt(sanityPost.excerpt),
    content: sanityPost.body || sanityPost.content || '',
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

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    // Convert Sanity posts to BlogPost format and combine with static posts
    const convertedSanityPosts = sanityPosts ? sanityPosts.map(convertSanityToBlogPost) : [];
    const allPosts = [...convertedSanityPosts, ...blogPosts];
    
    let filtered = [...allPosts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const beforeFilter = filtered.length;
      filtered = filtered.filter(post => post.category.id === selectedCategory);
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔍 Category filter: ${beforeFilter} → ${filtered.length} posts (selected: ${selectedCategory})`);
      }
    }

    // Sort posts
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else {
      // Sort by featured status and then by date
      filtered.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Final posts to display: ${filtered.length}`);
    }
    
    return filtered;
  }, [sanityPosts, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Featured posts for hero section
  const featuredPosts = blogPosts.filter(post => post.isFeatured).slice(0, 3);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('date');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="bg-gradient-to-br from-background via-secondary/20 to-accent/30"
        style={{ 
          paddingTop: '88px',
          paddingBottom: '64px'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-medium">
              Financial Insights & Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Expert advice, market insights, and educational content to help you make informed financial decisions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                style={{
                  backgroundColor: 'white',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  height: '44px'
                }}
              />
            </div>
            
            <div className="flex gap-4 w-full lg:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger 
                  className="w-full lg:w-48"
                  style={{ backgroundColor: '#d4e5ff' }}
                >
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {BLOG_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={(value: 'date' | 'popular') => setSortBy(value)}>
                <SelectTrigger 
                  className="w-full lg:w-40"
                  style={{ backgroundColor: '#d4e5ff' }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Latest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>

              {(searchTerm || selectedCategory !== 'all') && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={clearFilters}
                  title="Clear filters"
                >
                  <HandDrawnIcon type="x" size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {searchTerm && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="px-3 py-1">
                  Category: {BLOG_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground self-center">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Blog Posts Grid */}
            <div className="lg:col-span-8">
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map(post => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                            className="w-10 h-10"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <BlogSidebar 
                recentPosts={blogPosts.slice(0, 5)}
                onCategoryClick={handleCategoryClick}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}