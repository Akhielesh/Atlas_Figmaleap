'use client'

import React, { useState } from 'react'
import { 
  BarChart3, TrendingUp, Clock, Users, FileText, 
  Zap, Brain, AlertTriangle, Archive, Lightbulb,
  ArrowLeft, Calendar, RefreshCw, Download, Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Chart, ChartContainer, ChartTooltip } from './ui/chart'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface InsightsPageProps {
  onBack?: () => void
  className?: string
}

export function InsightsPage({ onBack, className = "" }: InsightsPageProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedTab, setSelectedTab] = useState('overview')

  // Mock analytics data
  const searchTrends = [
    { date: 'Jan 1', searches: 45, files: 123 },
    { date: 'Jan 8', searches: 52, files: 134 },
    { date: 'Jan 15', searches: 48, files: 145 },
    { date: 'Jan 22', searches: 61, files: 156 },
    { date: 'Jan 29', searches: 55, files: 167 },
    { date: 'Feb 5', searches: 67, files: 178 },
    { date: 'Feb 12', searches: 59, files: 189 }
  ]

  const topSearches = [
    { query: 'Q4 roadmap', count: 23, trend: '+15%' },
    { query: 'design system', count: 18, trend: '+8%' },
    { query: 'user research', count: 16, trend: '-3%' },
    { query: 'API documentation', count: 14, trend: '+22%' },
    { query: 'meeting notes', count: 12, trend: '+5%' }
  ]

  const fileTypes = [
    { name: 'Documents', value: 45, color: '#3b82f6' },
    { name: 'Presentations', value: 25, color: '#10b981' },
    { name: 'Spreadsheets', value: 15, color: '#f59e0b' },
    { name: 'Images', value: 10, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ]

  const activityHeatmap = [
    { hour: '6am', mon: 2, tue: 3, wed: 1, thu: 2, fri: 4, sat: 0, sun: 1 },
    { hour: '9am', mon: 15, tue: 18, wed: 12, thu: 16, fri: 14, sat: 2, sun: 1 },
    { hour: '12pm', mon: 25, tue: 28, wed: 22, thu: 26, fri: 24, sat: 5, sun: 3 },
    { hour: '3pm', mon: 35, tue: 32, wed: 38, thu: 34, fri: 30, sat: 8, sun: 4 },
    { hour: '6pm', mon: 12, tue: 15, wed: 10, thu: 14, fri: 18, sat: 12, sun: 8 },
    { hour: '9pm', mon: 5, tue: 8, wed: 3, thu: 6, fri: 9, sat: 15, sun: 12 }
  ]

  const smartRecommendations = [
    {
      type: 'duplicate',
      title: 'Duplicate Files Detected',
      description: '15 duplicate files found across Google Drive and OneDrive',
      action: 'Review Duplicates',
      priority: 'medium',
      savings: '2.3 GB storage'
    },
    {
      type: 'archive',
      title: 'Unused Files',
      description: '43 files haven\'t been accessed in 6+ months',
      action: 'Archive Files',
      priority: 'low',
      savings: 'Declutter workspace'
    },
    {
      type: 'security',
      title: 'Permission Review',
      description: '8 files have overly broad sharing permissions',
      action: 'Review Permissions',
      priority: 'high',
      savings: 'Improve security'
    },
    {
      type: 'sync',
      title: 'Sync Issues',
      description: 'OneDrive sync is 2 days behind',
      action: 'Check Connection',
      priority: 'high',
      savings: 'Stay up to date'
    }
  ]

  const aiInsights = [
    {
      insight: 'Your most productive search time is between 2-4 PM',
      confidence: 87,
      type: 'productivity'
    },
    {
      insight: 'Design-related searches increased 45% this month',
      confidence: 92,
      type: 'trend'
    },
    {
      insight: 'You frequently search for files shared by Alice Johnson',
      confidence: 78,
      type: 'collaboration'
    },
    {
      insight: 'PDF files take 23% longer to find than other formats',
      confidence: 84,
      type: 'efficiency'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'duplicate': return <FileText className="w-5 h-5" />
      case 'archive': return <Archive className="w-5 h-5" />
      case 'security': return <AlertTriangle className="w-5 h-5" />
      case 'sync': return <RefreshCw className="w-5 h-5" />
      default: return <Lightbulb className="w-5 h-5" />
    }
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1>Search Insights</h1>
          <p className="text-muted-foreground">Understand your search patterns and discover optimization opportunities.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Search Trends</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Files Indexed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,642</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Search Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-0.4s</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.1%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Search Activity</CardTitle>
              <CardDescription>Daily search volume and file discoveries over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={searchTrends}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip />
                    <Line type="monotone" dataKey="searches" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="files" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Searches and File Types */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Search Queries</CardTitle>
                <CardDescription>Most frequently searched terms this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="font-medium">{search.query}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{search.count}</span>
                        <Badge 
                          variant={search.trend.startsWith('+') ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {search.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Type Distribution</CardTitle>
                <CardDescription>Types of files you search for most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fileTypes.map((type, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{type.name}</span>
                        <span className="text-sm text-muted-foreground">{type.value}%</span>
                      </div>
                      <Progress value={type.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Patterns</CardTitle>
              <CardDescription>When you and your team are most active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 text-xs text-center">
                  <div></div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                {activityHeatmap.map((row, index) => (
                  <div key={index} className="grid grid-cols-8 gap-2">
                    <div className="text-xs text-muted-foreground text-right pr-2">
                      {row.hour}
                    </div>
                    {Object.entries(row).slice(1).map(([day, value]) => (
                      <div
                        key={day}
                        className={`h-6 rounded ${
                          value === 0 ? 'bg-muted' :
                          value < 10 ? 'bg-blue-100' :
                          value < 20 ? 'bg-blue-200' :
                          value < 30 ? 'bg-blue-300' :
                          'bg-blue-400'
                        }`}
                        title={`${day}: ${value} searches`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Intelligent observations about your search behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Lightbulb className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{insight.insight}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {insight.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Smart Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Smart Recommendations
              </CardTitle>
              <CardDescription>
                Actions you can take to optimize your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`p-2 rounded-lg ${getPriorityColor(rec.priority)}`}>
                      {getRecommendationIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {rec.priority} priority
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {rec.savings}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Indexed data across your connected sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Google Drive</span>
                      <span className="text-sm text-muted-foreground">4.2 GB / 15 GB</span>
                    </div>
                    <Progress value={28} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>OneDrive</span>
                      <span className="text-sm text-muted-foreground">2.8 GB / 5 GB</span>
                    </div>
                    <Progress value={56} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Dropbox</span>
                      <span className="text-sm text-muted-foreground">1.1 GB / 2 GB</span>
                    </div>
                    <Progress value={55} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Performance</CardTitle>
                <CardDescription>How quickly Atlas finds what you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">2.3s</div>
                    <p className="text-sm text-muted-foreground">Average search time</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documents</span>
                      <span className="text-sm text-muted-foreground">1.8s avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Presentations</span>
                      <span className="text-sm text-muted-foreground">2.1s avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">PDFs</span>
                      <span className="text-sm text-muted-foreground">2.9s avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Images</span>
                      <span className="text-sm text-muted-foreground">1.2s avg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}