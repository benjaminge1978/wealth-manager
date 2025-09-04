import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { HandDrawnIcon } from '../ui/HandDrawnIcon';
import { BlogPost } from '../../types/blog';
import { BLOG_CATEGORIES } from '../../types/blog';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  onCategoryClick?: (categoryId: string) => void;
  selectedCategory?: string;
}

export function BlogSidebar({ recentPosts, onCategoryClick, selectedCategory }: BlogSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const popularTags = [
    'retirement', 'investment', 'tax planning', 'estate planning',
    'market analysis', '401k', 'portfolio', 'wealth management'
  ];

  return (
    <div className="space-y-6 sticky top-24">
      {/* Newsletter and Recent Articles - 2 Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Newsletter Signup */}
        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandDrawnIcon type="mail" size={20} className="text-primary" />
              Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get weekly financial insights and market updates delivered to your inbox.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button className="w-full">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HandDrawnIcon type="trending-up" size={20} className="text-primary" />
              Recent Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="group">
                  <Link 
                    to={`/insights/${post.slug}`}
                    className="block space-y-1"
                  >
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <HandDrawnIcon type="calendar" size={12} />
                      <span>{formatDate(post.publishedDate)}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6 text-center space-y-4">
          <h3 className="font-semibold text-lg">Need Personalized Advice?</h3>
          <p className="text-sm text-muted-foreground">
            Schedule a free consultation with our financial advisors.
          </p>
          <Button className="w-full">
            Book Consultation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}