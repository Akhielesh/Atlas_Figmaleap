'use client'

import React, { useState } from 'react'
import { 
  ArrowLeft, TrendingUp, TrendingDown, Search, Clock, Users, FileText, 
  BarChart3, PieChart, Activity, Filter, Calendar, Download, Share2,
  Eye, Star, FolderOpen, Database, Zap, Target, Globe, Smartphone
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface AnalyticsPageProps {
  onBack: () => void
}

// Mock analytics data
const searchVolumeData = [
  { date: '2024-01-01', searches: 145, users: 32, avgTime: 2.4 },
  { date: '2024-01-02', searches: 189, users: 45, avgTime: 3.1 },
  { date: '2024-01-03', searches: 167, users: 38, avgTime: 2.8 },
  { date: '2024-01-04', searches: 203, users: 52, avgTime: 3.5 },
  { date: '2024-01-05', searches: 234, users: 61, avgTime: 2.9 },
  { date: '2024-01-06', searches: 178, users: 43, avgTime: 2.7 },
  { date: '2024-01-07', searches: 221, users: 56, avgTime: 3.2 }
]

const fileTypeData = [
  { name: 'Documents', value: 1234, color: '#3b82f6' },
  { name: 'Presentations', value: 567, color: '#f97316' },
  { name: 'Spreadsheets', value: 345, color: '#10b981' },
  { name: 'PDFs', value: 789, color: '#ef4444' },
  { name: 'Images', value: 456, color: '#8b5cf6' },
  { name: 'Other', value: 234, color: '#6b7280' }
]

const sourceUsageData = [
  { source: 'Google Drive', searches: 2341, files: 15670, growth: 12 },
  { source: 'OneDrive', searches: 1567, files: 9834, growth: -3 },
  { source: 'Dropbox', searches: 891, files: 5621, growth: 8 },
  { source: 'Slack', searches: 2103, files: 12450, growth: 25 },
  { source: 'GitHub', searches: 678, files: 3210, growth: 15 }
]

const topQueriesData = [
  { query: 'quarterly report', count: 234, avgTime: '00:32', success: 94 },
  { query: 'design system', count: 189, avgTime: '00:28', success: 98 },
  { query: 'meeting notes', count: 156, avgTime: '00:45', success: 87 },
  { query: 'api documentation', count: 143, avgTime: '00:41', success: 92 },
  { query: 'budget planning', count: 128, avgTime: '00:53', success: 89 },
  { query: 'user research', count: 107, avgTime: '00:36', success: 95 },
  { query: 'product roadmap', count: 98, avgTime: '00:29', success: 96 },
  { query: 'contract template', count: 87, avgTime: '00:47', success: 78 }
]

const userBehaviorData = [
  { metric: 'Avg. Session Duration', value: '4m 32s', change: 12, trend: 'up' },
  { metric: 'Searches per Session', value: '3.7', change: -2, trend: 'down' },
  { metric: 'File Preview Rate', value: '67%', change: 8, trend: 'up' },
  { metric: 'Download Rate', value: '23%', change: 5, trend: 'up' },
  { metric: 'Share Rate', value: '12%', change: -1, trend: 'down' },
  { metric: 'Save to Collection Rate', value: '19%', change: 15, trend: 'up' }
]

export function AnalyticsPage({ onBack }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('searches')

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="atlas-hover"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold">Analytics & Insights</h1>
                <p className="text-sm text-muted-foreground">
                  Search performance and user behavior analytics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 atlas-focus">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="atlas-hover">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm" className="atlas-hover">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="atlas-hover">Overview</TabsTrigger>
            <TabsTrigger value="search" className="atlas-hover">Search Analytics</TabsTrigger>
            <TabsTrigger value="content" className="atlas-hover">Content Insights</TabsTrigger>
            <TabsTrigger value="users" className="atlas-hover">User Behavior</TabsTrigger>
            <TabsTrigger value="performance" className="atlas-hover">Performance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="atlas-animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,537</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +12.3% from last week
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">287</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +8.7% from last week
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Files Indexed</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">46,785</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +234 this week
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.34s</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
                    -15ms faster
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Volume Chart */}
            <Card className="atlas-animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Search Volume Trends</CardTitle>
                    <CardDescription>Daily search activity and user engagement</CardDescription>
                  </div>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="searches">Searches</SelectItem>
                      <SelectItem value="users">Active Users</SelectItem>
                      <SelectItem value="avgTime">Avg Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={searchVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      formatter={(value, name) => [value, name === 'searches' ? 'Searches' : name === 'users' ? 'Users' : 'Avg Time (min)']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Source Usage & File Types */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="atlas-animate-fade-in">
                <CardHeader>
                  <CardTitle>Content Sources</CardTitle>
                  <CardDescription>Search activity by connected source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sourceUsageData.map((source, index) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-chart-${index + 1}`} />
                          <span className="font-medium">{source.source}</span>
                          <Badge variant={source.growth > 0 ? 'default' : 'secondary'} className="text-xs">
                            {source.growth > 0 ? '+' : ''}{source.growth}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatNumber(source.searches)}</div>
                          <div className="text-xs text-muted-foreground">{formatNumber(source.files)} files</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-1">
                <CardHeader>
                  <CardTitle>File Type Distribution</CardTitle>
                  <CardDescription>Most searched content types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <Pie
                        data={fileTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {fileTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatNumber(value as number)} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {fileTypeData.map((item, index) => (
                      <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="truncate">{item.name}</span>
                        <span className="text-muted-foreground ml-auto">{formatNumber(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Search Analytics Tab */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Queries */}
              <Card className="atlas-animate-fade-in">
                <CardHeader>
                  <CardTitle>Top Search Queries</CardTitle>
                  <CardDescription>Most popular search terms this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topQueriesData.map((query, index) => (
                      <div key={query.query} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 atlas-hover">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                            <span className="font-medium truncate">{query.query}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{query.count} searches</span>
                            <span>{query.avgTime} avg time</span>
                            <Badge variant={query.success >= 90 ? 'default' : 'secondary'} className="text-xs">
                              {query.success}% success
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Search Success Metrics */}
              <Card className="atlas-animate-fade-in atlas-stagger-1">
                <CardHeader>
                  <CardTitle>Search Performance</CardTitle>
                  <CardDescription>Query success rates and user satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Success Rate</span>
                        <span className="font-medium">91.3%</span>
                      </div>
                      <Progress value={91.3} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Zero Results Rate</span>
                        <span className="font-medium">4.2%</span>
                      </div>
                      <Progress value={4.2} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Query Reformulation Rate</span>
                        <span className="font-medium">12.7%</span>
                      </div>
                      <Progress value={12.7} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>User Satisfaction Score</span>
                        <span className="font-medium">4.6/5.0</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">↑ 8.4%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">0.31s</div>
                        <div className="text-xs text-muted-foreground">Avg Response</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Insights Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="atlas-animate-fade-in">
                <CardHeader>
                  <CardTitle>Content Freshness</CardTitle>
                  <CardDescription>How recent is your indexed content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">This week</span>
                      <span className="font-medium">1,234 files</span>
                    </div>
                    <Progress value={35} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">This month</span>
                      <span className="font-medium">4,567 files</span>
                    </div>
                    <Progress value={65} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">This quarter</span>
                      <span className="font-medium">12,890 files</span>
                    </div>
                    <Progress value={85} />
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Older</span>
                      <span className="font-medium">28,094 files</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-1">
                <CardHeader>
                  <CardTitle>Most Viewed Files</CardTitle>
                  <CardDescription>Top content by access frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Q4 Strategy Deck', views: 342, type: 'pptx' },
                      { name: 'Employee Handbook', views: 289, type: 'pdf' },
                      { name: 'API Documentation', views: 256, type: 'md' },
                      { name: 'Budget Template', views: 198, type: 'xlsx' },
                      { name: 'Brand Guidelines', views: 167, type: 'pdf' }
                    ].map((file, index) => (
                      <div key={file.name} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{file.name}</div>
                          <div className="text-xs text-muted-foreground">{file.views} views • {file.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-2">
                <CardHeader>
                  <CardTitle>Storage Distribution</CardTitle>
                  <CardDescription>Content size by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: 'Google Drive', size: '12.4 GB', percent: 45 },
                      { source: 'OneDrive', size: '8.7 GB', percent: 32 },
                      { source: 'Dropbox', size: '4.2 GB', percent: 15 },
                      { source: 'Slack', size: '2.1 GB', percent: 8 }
                    ].map((item) => (
                      <div key={item.source} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.source}</span>
                          <span className="font-medium">{item.size}</span>
                        </div>
                        <Progress value={item.percent} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Behavior Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBehaviorData.map((metric, index) => (
                <Card key={metric.metric} className={`atlas-animate-fade-in atlas-stagger-${Math.min(index + 1, 3)}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className={`flex items-center text-xs ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? '+' : ''}{metric.change}% from last week
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* User Activity Heatmap */}
            <Card className="atlas-animate-fade-in">
              <CardHeader>
                <CardTitle>Usage Patterns</CardTitle>
                <CardDescription>When users are most active (by hour)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    { hour: '6AM', activity: 12 },
                    { hour: '7AM', activity: 24 },
                    { hour: '8AM', activity: 45 },
                    { hour: '9AM', activity: 78 },
                    { hour: '10AM', activity: 89 },
                    { hour: '11AM', activity: 95 },
                    { hour: '12PM', activity: 67 },
                    { hour: '1PM', activity: 54 },
                    { hour: '2PM', activity: 87 },
                    { hour: '3PM', activity: 92 },
                    { hour: '4PM', activity: 76 },
                    { hour: '5PM', activity: 43 },
                    { hour: '6PM', activity: 28 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="activity" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="atlas-animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Index Size</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">27.3 GB</div>
                  <div className="text-xs text-muted-foreground">46,785 files indexed</div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.97%</div>
                  <div className="text-xs text-green-600">All systems operational</div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <div className="text-xs text-muted-foreground">Excellent performance</div>
                </CardContent>
              </Card>

              <Card className="atlas-animate-fade-in atlas-stagger-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Errors</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.03%</div>
                  <div className="text-xs text-green-600">Well below threshold</div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="atlas-animate-fade-in">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Storage Used</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Search Latency (p95)</span>
                      <span className="font-medium">0.43s</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Index Latency (p95)</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>API Response (p95)</span>
                      <span className="font-medium">0.18s</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Healthy</div>
                      <div className="text-sm text-muted-foreground">System Status</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Search Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Index Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>API Gateway</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Connector Sync</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}