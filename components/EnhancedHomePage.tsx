'use client'

import React, { useState } from 'react'
import { 
  Search, ArrowRight, CheckCircle, Star, Users, Shield,
  Zap, Clock, BarChart3, FileText, Globe, Smartphone
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ConnectorTile } from './ConnectorComponents'
import { ContactSalesModal } from './AuthComponents'
import { OpenInAppShowcase } from './OpenInAppButton'

interface EnhancedHomePageProps {
  onGetStarted: () => void
  onConnectDrive: () => void
  onSignIn?: () => void
  onStartTrial?: () => void
}

export function EnhancedHomePage({ 
  onGetStarted, 
  onConnectDrive, 
  onSignIn,
  onStartTrial 
}: EnhancedHomePageProps) {
  const [showContactSales, setShowContactSales] = useState(false)

  const features = [
    {
      icon: <Zap className="icon-md text-primary" />,
      title: 'AI-Powered Search',
      description: 'Find anything with natural language queries like "Bob\'s Q4 contract from last year"'
    },
    {
      icon: <Shield className="icon-md text-primary" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, SSO integration, and compliance with SOC 2 Type II'
    },
    {
      icon: <Clock className="icon-md text-primary" />,
      title: 'Real-time Sync',
      description: 'Your files are indexed instantly as they\'re created or modified'
    },
    {
      icon: <Users className="icon-md text-primary" />,
      title: 'Team Collaboration',
      description: 'Share searches, create collections, and collaborate on knowledge discovery'
    }
  ]

  const connectorConfigs = [
    {
      id: 'google-drive' as const,
      name: 'Google Drive',
      description: 'Search documents, spreadsheets, and presentations',
      icon: '📊',
      color: 'bg-blue-500',
      features: ['Documents', 'Spreadsheets', 'Presentations'],
      permissions: ['Read files', 'View metadata'],
      fileTypes: ['docs', 'sheets', 'slides']
    },
    {
      id: 'onedrive' as const,
      name: 'OneDrive',
      description: 'Search Office documents and personal files',
      icon: '☁️',
      color: 'bg-blue-600',
      features: ['Word', 'Excel', 'PowerPoint'],
      permissions: ['Read files', 'Access shared files'],
      fileTypes: ['docx', 'xlsx', 'pptx']
    },
    {
      id: 'slack' as const,
      name: 'Slack',
      description: 'Search messages and file attachments',
      icon: '💬',
      color: 'bg-purple-600',
      features: ['Messages', 'Files', 'Channels'],
      permissions: ['Read messages', 'Access files'],
      fileTypes: ['messages', 'files']
    },
    {
      id: 'dropbox' as const,
      name: 'Dropbox',
      description: 'Search all your Dropbox files and folders',
      icon: '📦',
      color: 'bg-blue-700',
      features: ['All Files', 'Paper', 'Shared Folders'],
      permissions: ['Read files', 'Access metadata'],
      fileTypes: ['all', 'paper']
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Head of Operations',
      company: 'TechFlow Inc.',
      avatar: '/api/placeholder/40/40',
      content: 'Atlas has transformed how our team finds information. What used to take 15 minutes now takes 15 seconds.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      company: 'Innovation Labs',
      avatar: '/api/placeholder/40/40',
      content: 'The natural language search is incredible. I can just type what I\'m thinking and Atlas finds exactly what I need.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Research Director',
      company: 'Global Dynamics',
      avatar: '/api/placeholder/40/40',
      content: 'We\'ve gone from scattered knowledge to a unified search experience. Game changer for our research team.',
      rating: 5
    }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '14 days',
      description: 'Perfect for individuals getting started',
      features: [
        'Connect up to 3 sources',
        'Search 10,000 files',
        'Basic filters',
        'Email support'
      ],
      cta: 'Start Free Trial',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$39',
      period: 'per month',
      description: 'For teams that need advanced search',
      features: [
        'Unlimited sources',
        'Unlimited files',
        'AI-powered search',
        'Advanced filters',
        'Priority support',
        'API access'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For large organizations with specific needs',
      features: [
        'Everything in Pro',
        'SSO integration',
        'Custom deployment',
        'Dedicated support',
        'SLA guarantees',
        'Advanced security'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-accent/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Zap className="icon-xs mr-2" />
              AI-Powered Universal Search
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Find anything across all your
              <span className="text-primary block lg:inline lg:ml-3">cloud apps</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Atlas connects to your Google Drive, OneDrive, Slack, and more to provide one search experience 
              across all your files, messages, and documents. No more switching between apps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="atlas-button-states atlas-focus-ring text-base px-8 py-6"
                onClick={onStartTrial || onGetStarted}
              >
                Start Free Trial
                <ArrowRight className="icon-sm ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="atlas-hover atlas-focus-ring text-base px-8 py-6"
                onClick={() => setShowContactSales(true)}
              >
                Schedule Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-background">
                      <AvatarImage src={`/api/placeholder/24/24?seed=${i}`} />
                      <AvatarFallback className="text-xs">U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="icon-xs fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connectors Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Connect Your Favorite Apps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Atlas integrates with the tools you already use, creating one unified search experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {connectorConfigs.map((connector) => (
              <ConnectorTile
                key={connector.id}
                connector={connector}
                state="available"
                onConnect={() => onConnectDrive()}
                className="h-full"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={onGetStarted}
              className="atlas-hover atlas-focus-ring"
            >
              Get Started - It's Free
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Teams Choose Atlas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              More than just search—Atlas transforms how your team discovers and shares knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center atlas-card-hover">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Atlas Works</h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Connect Your Apps',
                  description: 'Securely connect Google Drive, OneDrive, Slack, and more with one-click authentication.'
                },
                {
                  step: '2',
                  title: 'Automatic Indexing',
                  description: 'Atlas indexes your files in the background, making everything instantly searchable.'
                },
                {
                  step: '3',
                  title: 'Search & Discover',
                  description: 'Use natural language to find anything across all your connected apps in seconds.'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Teams Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See how Atlas is transforming knowledge discovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="atlas-card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="icon-sm fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`
                  relative atlas-card-hover
                  ${plan.highlighted ? 'border-primary shadow-lg scale-105' : ''}
                `}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="icon-xs text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="w-full atlas-button-states atlas-focus-ring"
                    onClick={plan.cta === 'Contact Sales' 
                      ? () => setShowContactSales(true)
                      : onStartTrial || onGetStarted
                    }
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              All plans include 14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Search Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams who've already revolutionized how they find and share knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="atlas-button-states atlas-focus-ring text-base px-8 py-6"
                onClick={onStartTrial || onGetStarted}
              >
                Start Free Trial
                <ArrowRight className="icon-sm ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="atlas-hover atlas-focus-ring text-base px-8 py-6"
                onClick={onSignIn}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Component Showcase - for design reference */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Component Showcase</h2>
            <p className="text-muted-foreground">
              Reference for design handoff - these would not appear in the actual app
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <OpenInAppShowcase />
          </div>
        </div>
      </section>

      {/* Contact Sales Modal */}
      <ContactSalesModal
        isOpen={showContactSales}
        onClose={() => setShowContactSales(false)}
      />
    </div>
  )
}