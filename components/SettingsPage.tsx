'use client'

import React, { useState } from 'react'
import { 
  Moon, Sun, Monitor, Eye, Zap, Languages, Database, Trash2, 
  Bell, Mail, Smartphone, Lock, Key, Download, UserX,
  Keyboard, Puzzle, CreditCard, ArrowLeft, Check, ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Alert, AlertDescription } from './ui/alert'
import { Progress } from './ui/progress'

interface SettingsPageProps {
  onBack?: () => void
  className?: string
}

export function SettingsPage({ onBack, className = "" }: SettingsPageProps) {
  const [theme, setTheme] = useState('system')
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState([100])
  const [sortOrder, setSortOrder] = useState('relevance')
  const [language, setLanguage] = useState('en')
  const [indexFullText, setIndexFullText] = useState(true)
  const [cacheSize] = useState(2.4) // GB
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [digestFrequency, setDigestFrequency] = useState('daily')
  const [twoFactor, setTwoFactor] = useState(false)

  const notificationTypes = [
    { id: 'new-file', label: 'New file shared', enabled: true },
    { id: 'permissions', label: 'Permission changes', enabled: true },
    { id: 'comments', label: 'Comments & mentions', enabled: false },
    { id: 'system', label: 'System updates', enabled: true }
  ]

  const shortcuts = [
    { key: '/', action: 'Focus search', customizable: true },
    { key: '⌘K', action: 'Command palette', customizable: false },
    { key: 'Esc', action: 'Close panel', customizable: false },
    { key: '⌘,', action: 'Open settings', customizable: true }
  ]

  const plugins = [
    { id: 'gmail', name: 'Gmail Integration', enabled: true, hasUpdate: false },
    { id: 'notion', name: 'Notion Connector', enabled: false, hasUpdate: true },
    { id: 'figma', name: 'Figma Files', enabled: true, hasUpdate: false }
  ]

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground">Manage your Atlas preferences and account settings.</p>
        </div>
      </div>

      {/* Theme & Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Theme & Appearance
          </CardTitle>
          <CardDescription>
            Customize how Atlas looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="font-medium">Color Theme</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    System Default
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">High Contrast Mode</label>
              <p className="text-sm text-muted-foreground">Increase contrast for better accessibility</p>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Reduced Motion</label>
              <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium">Font Size</label>
              <span className="text-sm text-muted-foreground">{fontSize[0]}%</span>
            </div>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={75}
              max={150}
              step={25}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Small</span>
              <span>Default</span>
              <span>Large</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Indexing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Search & Indexing
          </CardTitle>
          <CardDescription>
            Configure how Atlas searches and indexes your files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium">Default Sort Order</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date Modified</SelectItem>
                  <SelectItem value="name">File Name</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Index Full Text</label>
              <p className="text-sm text-muted-foreground">
                Enable full-text search for better results (uses more storage)
              </p>
            </div>
            <Switch checked={indexFullText} onCheckedChange={setIndexFullText} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium">Cache Storage</label>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={(cacheSize / 5) * 100} className="flex-1" />
              <span className="text-sm text-muted-foreground">{cacheSize} GB / 5 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Control how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="font-medium">Email</span>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="font-medium">Push</span>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="font-medium">In-app</span>
              </div>
              <Switch checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <label className="font-medium">Alert Types</label>
            {notificationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <span>{type.label}</span>
                <Switch defaultChecked={type.enabled} />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="font-medium">Digest Frequency</label>
            <Select value={digestFrequency} onValueChange={setDigestFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your account security and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Two-Factor Authentication</span>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Active Sessions</label>
                <p className="text-sm text-muted-foreground">3 devices currently signed in</p>
              </div>
              <Button variant="outline" size="sm">
                Manage Sessions
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Activity Logs</label>
                <p className="text-sm text-muted-foreground">Download your account activity</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Separator />

          <Alert>
            <UserX className="w-4 h-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>Delete your account and all associated data</span>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </CardTitle>
          <CardDescription>
            View and customize keyboard shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <span>{shortcut.action}</span>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">
                  {shortcut.key}
                </kbd>
                {shortcut.customizable && (
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Plugins & Extensions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Puzzle className="w-5 h-5" />
            Plugins & Extensions
          </CardTitle>
          <CardDescription>
            Manage installed plugins and extensions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {plugins.map((plugin) => (
            <div key={plugin.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <span className="font-medium">{plugin.name}</span>
                {plugin.hasUpdate && (
                  <Badge variant="secondary">Update Available</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={plugin.enabled} />
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            <Puzzle className="w-4 h-4 mr-2" />
            Browse Plugin Store
          </Button>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing & Usage
          </CardTitle>
          <CardDescription>
            Manage your subscription and view usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Free Plan</span>
              <Badge>Current Plan</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              5 connected accounts • 1,000 files indexed • 5 GB storage
            </p>
            <Button size="sm">Upgrade to Pro</Button>
          </div>

          <div className="space-y-3">
            <label className="font-medium">Usage This Month</label>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Files Indexed</span>
                <span>847 / 1,000</span>
              </div>
              <Progress value={84.7} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Storage Used</span>
                <span>2.4 GB / 5 GB</span>
              </div>
              <Progress value={48} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Invoice History</span>
            <Button variant="outline" size="sm">
              View Invoices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}