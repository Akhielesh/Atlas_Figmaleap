'use client'

import React, { useState } from 'react'
import { 
  User, Edit, Camera, Globe, Clock, MapPin, Eye, EyeOff,
  CheckCircle, AlertCircle, RefreshCw, Unlink, Plus,
  Star, Search, FolderPlus, ArrowLeft, Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'

interface ProfilePageProps {
  onBack?: () => void
  className?: string
}

export function ProfilePage({ onBack, className = "" }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Alex Thompson')
  const [email] = useState('alex.thompson@company.com')
  const [role, setRole] = useState('Product Designer')
  const [status, setStatus] = useState('online')
  const [statusMessage, setStatusMessage] = useState('Working on Atlas design system')
  const [timezone, setTimezone] = useState('America/New_York')
  const [language, setLanguage] = useState('en')
  const [dateFormat, setDateFormat] = useState('MM/dd/yyyy')
  const [defaultPage, setDefaultPage] = useState('search')
  const [shareStarred, setShareStarred] = useState(false)
  const [shareShared, setShareShared] = useState(true)
  const [analytics, setAnalytics] = useState(true)

  const connectedAccounts = [
    {
      id: 'google-drive',
      name: 'Google Drive',
      email: 'alex@company.com',
      status: 'healthy',
      lastSync: '2 minutes ago',
      filesCount: 1247,
      logo: '🔴' // Would be actual logos in real app
    },
    {
      id: 'onedrive',
      name: 'Microsoft OneDrive',
      email: 'alex.thompson@company.com',
      status: 'needs-auth',
      lastSync: '3 days ago',
      filesCount: 892,
      logo: '🔵'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      email: 'alex.work@company.com',
      status: 'healthy',
      lastSync: '15 minutes ago',
      filesCount: 543,
      logo: '🟦'
    },
    {
      id: 'slack',
      name: 'Slack',
      email: 'alex@company.com',
      status: 'paused',
      lastSync: '1 hour ago',
      filesCount: 2341,
      logo: '💬'
    }
  ]

  const recentActivity = [
    { type: 'search', action: 'Searched for "design system"', time: '5 minutes ago' },
    { type: 'star', action: 'Starred "Atlas Guidelines.pdf"', time: '1 hour ago' },
    { type: 'collection', action: 'Created collection "Q1 Planning"', time: '2 hours ago' },
    { type: 'search', action: 'Searched for "roadmap"', time: '3 hours ago' },
    { type: 'star', action: 'Starred "User Research Findings"', time: '1 day ago' }
  ]

  const securityEvents = [
    { event: 'Login from MacBook Pro', location: 'New York, NY', time: '2 hours ago' },
    { event: 'Login from iPhone', location: 'New York, NY', time: '1 day ago' },
    { event: 'Password changed', location: 'New York, NY', time: '1 week ago' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500'
      case 'needs-auth': return 'bg-yellow-500'
      case 'paused': return 'bg-gray-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'needs-auth': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'paused': return <AlertCircle className="w-4 h-4 text-gray-500" />
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return <Search className="w-4 h-4" />
      case 'star': return <Star className="w-4 h-4" />
      case 'collection': return <FolderPlus className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1>Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences.</p>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Your profile information visible to your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/api/placeholder/80/80" alt={name} />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Full Name</label>
                  {isEditing ? (
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  ) : (
                    <p>{name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Email</label>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Role / Title</label>
                {isEditing ? (
                  <Input value={role} onChange={(e) => setRole(e.target.value)} />
                ) : (
                  <p>{role}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & Presence */}
      <Card>
        <CardHeader>
          <CardTitle>Status & Presence</CardTitle>
          <CardDescription>
            Set your availability and status message
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-500' : status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Status Message</label>
            <Textarea 
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              placeholder="What are you working on?"
              className="resize-none"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your linked cloud storage and collaboration tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{account.logo}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{account.name}</span>
                    {getStatusIcon(account.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{account.email}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Last sync: {account.lastSync}</span>
                    <span>{account.filesCount.toLocaleString()} files</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {account.status === 'needs-auth' && (
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Re-auth
                  </Button>
                )}
                {account.status === 'paused' && (
                  <Button size="sm" variant="outline">
                    Resume
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  <Unlink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Connect New Account
          </Button>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your recent searches, stars, and collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className="flex-shrink-0 text-muted-foreground">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Preferences
          </CardTitle>
          <CardDescription>
            Customize your Atlas experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Time Zone</label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Date Format</label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Default Homepage</label>
              <Select value={defaultPage} onValueChange={setDefaultPage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="files">Files</SelectItem>
                  <SelectItem value="collections">Collections</SelectItem>
                  <SelectItem value="recent">Recent Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Privacy Controls
          </CardTitle>
          <CardDescription>
            Control who can see your activity and files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Share Starred Files</label>
              <p className="text-sm text-muted-foreground">Allow others to see files you've starred</p>
            </div>
            <Switch checked={shareStarred} onCheckedChange={setShareStarred} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Share "Shared with Me" Files</label>
              <p className="text-sm text-muted-foreground">Show files shared with you in team visibility</p>
            </div>
            <Switch checked={shareShared} onCheckedChange={setShareShared} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Analytics & Telemetry</label>
              <p className="text-sm text-muted-foreground">Help improve Atlas by sharing anonymous usage data</p>
            </div>
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </div>
        </CardContent>
      </Card>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
          <CardDescription>
            Recent logins and security events for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
                <span className="text-sm text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}