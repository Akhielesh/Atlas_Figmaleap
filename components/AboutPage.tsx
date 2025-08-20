'use client'

import React from 'react'
import { 
  Info, Users, GitBranch, HelpCircle, MessageCircle, 
  ExternalLink, Shield, Cookie, FileText, ArrowLeft,
  Github, Twitter, Mail, Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

interface AboutPageProps {
  onBack?: () => void
  className?: string
}

export function AboutPage({ onBack, className = "" }: AboutPageProps) {
  const teamMembers = [
    { name: 'Sarah Chen', role: 'Founder & CEO', avatar: 'SC' },
    { name: 'Marcus Rodriguez', role: 'Lead Engineer', avatar: 'MR' },
    { name: 'Elena Kowalski', role: 'Head of Design', avatar: 'EK' },
    { name: 'David Park', role: 'Data Scientist', avatar: 'DP' }
  ]

  const features = [
    { name: 'Unified Search', description: 'Search across all your connected drives and apps' },
    { name: 'Smart Filters', description: 'Intelligent filtering with natural language queries' },
    { name: 'File Preview', description: 'Preview documents without opening external apps' },
    { name: 'Secure Access', description: 'Respect existing permissions and security settings' },
    { name: 'Plugin System', description: 'Extensible architecture for third-party integrations' }
  ]

  const changelog = [
    { version: '2.1.0', date: 'January 15, 2024', highlights: ['New plugin system', 'Improved search relevance', 'Dark mode enhancements'] },
    { version: '2.0.5', date: 'December 20, 2023', highlights: ['Bug fixes', 'Performance improvements', 'Security updates'] },
    { version: '2.0.0', date: 'November 30, 2023', highlights: ['Major UI refresh', 'New preview panel', 'Enhanced accessibility'] }
  ]

  return (
    <div className={`max-w-4xl mx-auto p-6 space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1>About Atlas</h1>
          <p className="text-muted-foreground">Learn more about our mission and the team behind Atlas.</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2">Simplify Information Discovery</h3>
            <p className="text-muted-foreground">
              Atlas is built on the belief that finding information shouldn't be fragmented across 
              dozens of apps and platforms. We're creating a calm, unified search experience that 
              respects your privacy while making your digital workspace more efficient.
            </p>
          </div>

          <div>
            <h3 className="mb-2">Privacy-First Design</h3>
            <p className="text-muted-foreground">
              We never store your file contents on our servers. Atlas respects existing permissions 
              and only shows you what you already have access to. Your data stays where it belongs – 
              with you and your chosen providers.
            </p>
          </div>

          <div>
            <h3 className="mb-2">Accessible by Design</h3>
            <p className="text-muted-foreground">
              Every feature in Atlas is built with accessibility in mind. From keyboard navigation 
              to screen readers, high contrast themes to reduced motion options – we ensure everyone 
              can benefit from unified search.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
          <CardDescription>
            What makes Atlas different from other search tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="mb-2">{feature.name}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Meet the Team
          </CardTitle>
          <CardDescription>
            The people building Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 font-medium">
                  {member.avatar}
                </div>
                <h4 className="mb-1">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Version & Changelog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Version Information
          </CardTitle>
          <CardDescription>
            Current version and recent updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4>Atlas Version 2.1.0</h4>
              <p className="text-sm text-muted-foreground">Released January 15, 2024</p>
            </div>
            <Badge>Latest</Badge>
          </div>

          <div>
            <h4 className="mb-4">Recent Updates</h4>
            <div className="space-y-4">
              {changelog.map((release, index) => (
                <div key={index} className="border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h5>Version {release.version}</h5>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {release.highlights.map((highlight, i) => (
                      <li key={i}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Changelog
          </Button>
        </CardContent>
      </Card>

      {/* Support Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Support & Resources
          </CardTitle>
          <CardDescription>
            Get help and connect with the Atlas community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Help Center</p>
                  <p className="text-sm text-muted-foreground">Guides and tutorials</p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Community Forum</p>
                  <p className="text-sm text-muted-foreground">Connect with other users</p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Contact Support</p>
                  <p className="text-sm text-muted-foreground">Get direct help</p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">Open source contributions</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Connect With Us</CardTitle>
          <CardDescription>
            Follow us for updates and announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              Website
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Legal & Privacy
          </CardTitle>
          <CardDescription>
            Important information about your rights and our commitments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Terms of Service</p>
                  <p className="text-sm text-muted-foreground">Updated Jan 2024</p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Privacy Policy</p>
                  <p className="text-sm text-muted-foreground">Updated Jan 2024</p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Cookie Settings</p>
                  <p className="text-sm text-muted-foreground">Manage preferences</p>
                </div>
              </div>
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Atlas. All rights reserved.</p>
            <p className="mt-1">Made with ❤️ for teams who value organized information.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}