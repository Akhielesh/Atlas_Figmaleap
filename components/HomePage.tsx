'use client'

import React from 'react'
import { 
  Search, Zap, Eye, Shield, Puzzle, ArrowRight, 
  Play, Star, Users, CheckCircle, ExternalLink
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

interface HomePageProps {
  onGetStarted?: () => void
  onConnectDrive?: () => void
  className?: string
}

export function HomePage({ onGetStarted, onConnectDrive, className = "" }: HomePageProps) {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Unified Search',
      description: 'Search across all your connected drives, apps, and collaboration tools in one place.',
      color: 'text-blue-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Smart Filters',
      description: 'Use natural language queries and intelligent filters to find exactly what you need.',
      color: 'text-yellow-500'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'File Preview',
      description: 'Preview documents, presentations, and images without leaving Atlas.',
      color: 'text-green-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Access',
      description: 'Respects existing permissions. You only see what you already have access to.',
      color: 'text-red-500'
    },
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: 'Plugin System',
      description: 'Extend Atlas with plugins for specialized workflows and integrations.',
      color: 'text-purple-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Collaboration',
      description: 'Share searches, create collections, and collaborate with your team seamlessly.',
      color: 'text-indigo-500'
    }
  ]

  const testimonials = [
    {
      quote: "Atlas has completely transformed how our team finds and shares information. No more digging through multiple apps.",
      author: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp"
    },
    {
      quote: "The unified search is incredibly fast and accurate. It's like having a personal assistant for all our files.",
      author: "Marcus Rodriguez",
      role: "Engineering Lead",
      company: "StartupXYZ"
    },
    {
      quote: "Finally, a search tool that respects our security requirements while making everything easily discoverable.",
      author: "Elena Kowalski",
      role: "CTO",
      company: "SecureData Inc"
    }
  ]

  const quickActions = [
    { icon: '🔴', name: 'Google Drive', description: 'Connect your Google Drive account' },
    { icon: '🔵', name: 'OneDrive', description: 'Connect Microsoft OneDrive' },
    { icon: '🟦', name: 'Dropbox', description: 'Connect your Dropbox account' },
    { icon: '💬', name: 'Slack', description: 'Search your Slack conversations' }
  ]

  return (
    <div className={`${className}`}>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6" variant="secondary">
            <Star className="w-3 h-3 mr-1" />
            Trusted by 10,000+ teams
          </Badge>
          
          <h1 className="mb-6 text-4xl md:text-6xl">
            Search across all your files
            <span className="block text-muted-foreground">in one place</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Atlas brings together your Google Drive, OneDrive, Dropbox, Slack, and more 
            into a single, powerful search experience. Find anything, instantly.
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button size="lg" onClick={onGetStarted} className="h-12 px-8">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button size="lg" variant="outline" className="h-12 px-8">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Free for up to 5 connected accounts • No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Everything you need for unified search</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Atlas is designed to make information discovery effortless while 
              maintaining the highest standards of privacy and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Connect your first account</h2>
            <p className="text-xl text-muted-foreground">
              Choose from popular cloud storage and collaboration platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="h-auto p-6 justify-start"
                onClick={onConnectDrive}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{action.icon}</div>
                  <div className="text-left">
                    <p className="font-medium">{action.name}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              See All Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">How Atlas works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to unified search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Connect',
                description: 'Link your cloud storage accounts and collaboration tools securely.'
              },
              {
                step: '2',
                title: 'Index',
                description: 'Atlas creates a searchable index while respecting your existing permissions.'
              },
              {
                step: '3',
                title: 'Search',
                description: 'Find anything across all your connected services with powerful filters.'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-medium">
                  {step.step}
                </div>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Loved by teams everywhere</h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say about Atlas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-white">Ready to transform your search experience?</h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of teams who have already streamlined their workflow with Atlas.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-12 px-8"
              onClick={onGetStarted}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact Sales
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              SOC 2 compliant
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}