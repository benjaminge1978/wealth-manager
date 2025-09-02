export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: number;
  category: BlogCategory;
  tags: string[];
  featuredImage: string;
  isFeatured: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: '1',
    name: 'Investment Strategies',
    slug: 'investment-strategies',
    description: 'Expert insights on building and managing your investment portfolio',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: '2',
    name: 'Retirement Planning',
    slug: 'retirement-planning',
    description: 'Comprehensive guides for securing your financial future',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: '3',
    name: 'Tax Optimization',
    slug: 'tax-optimization',
    description: 'Strategies to minimize your tax burden legally',
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: '4',
    name: 'Market Insights',
    slug: 'market-insights',
    description: 'Analysis and commentary on current market conditions',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: '5',
    name: 'Estate Planning',
    slug: 'estate-planning',
    description: 'Protecting and transferring your wealth to future generations',
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: '6',
    name: 'Financial Education',
    slug: 'financial-education',
    description: 'Building your financial knowledge and literacy',
    color: 'bg-pink-100 text-pink-800'
  }
];