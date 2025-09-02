import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {post.isFeatured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={post.category.color}>
            {post.category.name}
          </Badge>
        </div>
        
        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-muted-foreground text-xs">{post.author.role}</p>
            </div>
          </div>
          
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}