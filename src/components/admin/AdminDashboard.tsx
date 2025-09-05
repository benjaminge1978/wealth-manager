import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { HandDrawnIcon } from '../ui/HandDrawnIcon';

interface AdminDashboardProps {
  serverUrl?: string;
}

interface SystemStatus {
  scheduler: {
    isRunning: boolean;
    activeJobs: string[];
    nextRuns: {
      daily: string;
      weekly: string;
    };
  };
  environment: {
    nodeEnv: string;
    postsPerWeek: number;
    sanityProject: string;
  };
  timestamp: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  _createdAt: string;
  featured: boolean;
  author: { name: string };
}

export function AdminDashboard({ serverUrl }: AdminDashboardProps) {
  // Detect environment and set appropriate server URL
  const defaultServerUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001' 
    : 'https://web-production-7aa44.up.railway.app';
  
  const finalServerUrl = serverUrl || defaultServerUrl;
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({ username: 'admin', password: '' });
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add SEO meta tags to prevent indexing
  React.useEffect(() => {
    // Add noindex meta tag
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(metaRobots);

    // Update page title
    const originalTitle = document.title;
    document.title = 'Admin Dashboard - Content Automation';

    // Cleanup on unmount
    return () => {
      document.head.removeChild(metaRobots);
      document.title = originalTitle;
    };
  }, []);
  
  // Manual content generation form
  const [contentForm, setContentForm] = useState({
    topic: '',
    category: 'INVESTMENT',
    wordCount: 1500,
    targetAudience: 'UK investors'
  });
  
  const [generating, setGenerating] = useState(false);
  const [testingNews, setTestingNews] = useState(false);

  const categories = [
    { value: 'INVESTMENT', label: 'Investment Strategies' },
    { value: 'RETIREMENT', label: 'Retirement Planning' },
    { value: 'TAX', label: 'Tax Optimization' },
    { value: 'MARKET_INSIGHTS', label: 'Market Insights' },
    { value: 'ESTATE', label: 'Estate Planning' },
    { value: 'FINANCIAL_EDUCATION', label: 'Financial Education' }
  ];

  // Create Basic Auth header
  const authHeader = `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`;

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    if (!finalServerUrl) {
      throw new Error('Server not available in production');
    }
    
    const response = await fetch(`${finalServerUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (response.status === 401) {
      setAuthenticated(false);
      throw new Error('Authentication required');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'API call failed');
    }

    return await response.json();
  };

  const fetchStatus = async () => {
    try {
      console.log('Fetching status from:', `${serverUrl}/api/admin/status`);
      const data = await apiCall('/api/admin/status');
      setStatus(data);
      setAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.error('Status fetch error:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch status');
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await apiCall('/api/admin/posts?limit=10');
      setPosts(data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleLogin = async () => {
    if (!credentials.password) {
      setError('Password is required');
      return;
    }

    console.log('Attempting login with credentials:', { username: credentials.username, password: '***' });
    setLoading(true);
    setError(null);
    
    try {
      await fetchStatus();
      await fetchPosts();
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Authentication failed - check password and server connection');
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleScheduler = async (action: 'start' | 'stop') => {
    try {
      setError(null);
      await apiCall(`/api/admin/scheduler/${action}`, { method: 'POST' });
      await fetchStatus(); // Refresh status
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Scheduler action failed');
    }
  };

  const generateContent = async () => {
    if (!contentForm.topic) {
      setError('Topic is required');
      return;
    }

    setGenerating(true);
    setError(null);

    try {
      const result = await apiCall('/api/admin/generate-content', {
        method: 'POST',
        body: JSON.stringify({
          topic: contentForm.topic,
          category: contentForm.category,
          options: {
            wordCount: contentForm.wordCount,
            targetAudience: contentForm.targetAudience,
            status: 'draft' // Create as draft for review
          }
        })
      });

      alert(`Content generated successfully: ${result.title}`);
      setContentForm({ ...contentForm, topic: '' });
      await fetchPosts(); // Refresh posts list
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Content generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const testNews = async () => {
    setTestingNews(true);
    setError(null);

    try {
      const result = await apiCall('/api/admin/test-news');
      alert(`News aggregation test successful! Found ${result.itemCount} news items.`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'News test failed');
    } finally {
      setTestingNews(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchStatus();
      fetchPosts();
    } else {
      // Initialize loading state properly
      setLoading(false);
    }
  }, [authenticated]);

  // Initialize component state
  useEffect(() => {
    console.log('AdminDashboard initialized');
    console.log('Server URL:', finalServerUrl);
    setLoading(false);
  }, []);

  // Show production notice if no server available
  if (!finalServerUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 text-center">
          <HandDrawnIcon type="server" size={64} className="mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Content Automation Dashboard</h1>
          <p className="text-lg text-muted-foreground mb-6">
            The admin dashboard is currently available in development mode only.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">🚀 To deploy the automation system:</h3>
            <ol className="space-y-2 text-sm">
              <li><strong>1.</strong> Deploy the server to Railway, Render, or similar service</li>
              <li><strong>2.</strong> Set environment variables (ANTHROPIC_API_KEY, SANITY_TOKEN)</li>
              <li><strong>3.</strong> Update this dashboard to point to your production server</li>
            </ol>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-3">💡 Currently Active Features:</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>Blog system</strong> with 237 pre-written FAQs</li>
              <li>✅ <strong>Schema markup</strong> for AI search optimization</li>
              <li>✅ <strong>Manual content creation</strong> via Sanity CMS</li>
              <li>✅ <strong>Complete automation code</strong> ready for deployment</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <Button 
              onClick={() => window.open('https://github.com/benjaminge1978/wealth-manager/blob/main/CONTENT-AUTOMATION-SETUP.md', '_blank')}
              variant="default"
            >
              <HandDrawnIcon type="book-open" size={16} className="mr-2" />
              View Setup Guide
            </Button>
            <Button 
              onClick={() => window.location.href = '/insights'}
              variant="outline"
            >
              <HandDrawnIcon type="newspaper" size={16} className="mr-2" />
              View Blog
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Login form
  if (!authenticated && !loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <HandDrawnIcon type="settings" size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Content Automation Admin</h1>
            <p className="text-muted-foreground">Enter your admin credentials</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <Input
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter admin password"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <Button onClick={handleLogin} className="w-full">
              <HandDrawnIcon type="log-in" size={16} className="mr-2" />
              Login
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              Default password is in your .env file (ADMIN_PASSWORD)
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Content Automation Dashboard</h1>
            <p className="text-muted-foreground">Manage your automated content system</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setAuthenticated(false)}
          >
            <HandDrawnIcon type="log-out" size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setError(null)}
              className="float-right"
            >
              ×
            </Button>
          </div>
        )}

        {/* System Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">System Status</h2>
            <Badge variant={status?.scheduler.isRunning ? "default" : "secondary"}>
              {status?.scheduler.isRunning ? "Running" : "Stopped"}
            </Badge>
          </div>

          {status && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Scheduler</h3>
                <div className="space-y-2 text-sm">
                  <div>Status: {status.scheduler.isRunning ? '✅ Active' : '⏸️ Stopped'}</div>
                  <div>Daily Posts: {status.scheduler.nextRuns.daily}</div>
                  <div>Weekly Roundup: {status.scheduler.nextRuns.weekly}</div>
                  <div>Active Jobs: {status.scheduler.activeJobs.join(', ') || 'None'}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Environment</h3>
                <div className="space-y-2 text-sm">
                  <div>Mode: {status.environment.nodeEnv}</div>
                  <div>Posts/Week: {status.environment.postsPerWeek}</div>
                  <div>Sanity Project: {status.environment.sanityProject}</div>
                  <div>Last Update: {new Date(status.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button 
              onClick={() => toggleScheduler('start')}
              disabled={status?.scheduler.isRunning}
              variant={status?.scheduler.isRunning ? "secondary" : "default"}
            >
              <HandDrawnIcon type="play" size={16} className="mr-2" />
              Start Automation
            </Button>
            <Button 
              onClick={() => toggleScheduler('stop')}
              disabled={!status?.scheduler.isRunning}
              variant="outline"
            >
              <HandDrawnIcon type="pause" size={16} className="mr-2" />
              Stop Automation
            </Button>
            <Button onClick={fetchStatus} variant="outline">
              <HandDrawnIcon type="refresh-cw" size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </Card>

        {/* Manual Content Generation */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Generate Content</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <Input
                value={contentForm.topic}
                onChange={(e) => setContentForm({ ...contentForm, topic: e.target.value })}
                placeholder="e.g., How to choose between ISA and pension"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select 
                value={contentForm.category}
                onValueChange={(value) => setContentForm({ ...contentForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button 
              onClick={generateContent}
              disabled={generating || !contentForm.topic}
            >
              {generating ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              ) : (
                <HandDrawnIcon type="edit-3" size={16} className="mr-2" />
              )}
              {generating ? 'Generating...' : 'Generate Content'}
            </Button>

            <Button onClick={testNews} disabled={testingNews} variant="outline">
              {testingNews ? (
                <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full mr-2"></div>
              ) : (
                <HandDrawnIcon type="newspaper" size={16} className="mr-2" />
              )}
              {testingNews ? 'Testing...' : 'Test News Feed'}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Content will be created as draft in Sanity CMS with relevant FAQs automatically added.
          </div>
        </Card>

        {/* Recent Posts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Button onClick={fetchPosts} variant="outline" size="sm">
              <HandDrawnIcon type="refresh-cw" size={16} className="mr-2" />
              Refresh
            </Button>
          </div>

          <div className="space-y-3">
            {posts.map(post => (
              <div key={post._id} className="border rounded p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      By {post.author?.name} • Published {new Date(post.publishedAt).toLocaleDateString()}
                      {post.featured && <Badge variant="secondary" className="ml-2">Featured</Badge>}
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    Created {new Date(post._createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No posts found. Generate your first post above!
            </div>
          )}
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Recent Posts</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {posts.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">Featured Posts</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">237</div>
            <div className="text-sm text-muted-foreground">FAQ Database</div>
          </Card>
        </div>
      </div>
    </div>
  );
}