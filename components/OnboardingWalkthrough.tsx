'use client'

import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, ArrowLeft, X, CheckCircle, Search, 
  Filter, Eye, Users, Zap, Target
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  targetSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  content: React.ReactNode
}

interface OnboardingWalkthroughProps {
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
}

interface FeatureHighlightProps {
  title: string
  description: string
  isVisible: boolean
  onDismiss: () => void
  targetSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function OnboardingWalkthrough({ isActive, onComplete, onSkip }: OnboardingWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Atlas',
      description: 'Your universal search companion',
      icon: <Zap className="icon-lg text-primary" />,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="icon-xl text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Welcome to Atlas</h2>
            <p className="text-muted-foreground">
              Atlas helps you find anything across all your connected apps and files. 
              Let's take a quick tour to get you started.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Search className="icon-md text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Universal Search</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Filter className="icon-md text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Smart Filters</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Eye className="icon-md text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Live Preview</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Users className="icon-md text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Team Sharing</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'search',
      title: 'Search Everything',
      description: 'Use the search bar to find files across all your apps',
      icon: <Search className="icon-lg text-primary" />,
      targetSelector: '[data-search-input]',
      position: 'bottom',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Search className="icon-md text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Universal Search</h3>
              <p className="text-sm text-muted-foreground">Find anything, anywhere</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            The search bar is your gateway to everything. Type to search across Google Drive, 
            OneDrive, Slack, and more. Use natural language like "Bob's contract from last month" 
            or specific terms.
          </p>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">quarterly report</Badge>
              <Badge variant="outline" className="text-xs">meeting notes</Badge>
              <Badge variant="outline" className="text-xs">design files</Badge>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'filters',
      title: 'Smart Filters',
      description: 'Narrow down results with powerful filters',
      icon: <Filter className="icon-lg text-primary" />,
      targetSelector: '[data-filters-panel]',
      position: 'right',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Filter className="icon-md text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Smart Filters</h3>
              <p className="text-sm text-muted-foreground">Refine your search</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Use filters to narrow down your search results by file type, source, owner, 
            date, and more. Filters update in real-time as you type.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Source</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>File Type</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Owner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Date</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'preview',
      title: 'Preview Panel',
      description: 'See file contents without opening them',
      icon: <Eye className="icon-lg text-primary" />,
      targetSelector: '[data-preview-panel]',
      position: 'left',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Eye className="icon-md text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Live Preview</h3>
              <p className="text-sm text-muted-foreground">See before you open</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Click on any search result to see a preview in this panel. View document contents, 
            image thumbnails, and file details without leaving Atlas.
          </p>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Preview features:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Document content and formatting</li>
              <li>• File properties and metadata</li>
              <li>• Quick actions (share, star, download)</li>
              <li>• Version history and comments</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Start searching and exploring',
      icon: <CheckCircle className="icon-lg text-success" />,
      content: (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="icon-xl text-success" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">You're All Set!</h2>
            <p className="text-muted-foreground">
              You've completed the Atlas onboarding. Start searching to discover 
              the power of universal file search.
            </p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm font-medium text-primary mb-2">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Use the command palette (⌘K) for quick navigation and actions anywhere in Atlas.
            </p>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Badge variant="outline" className="text-xs">⌘K</Badge>
            <span className="text-xs text-muted-foreground">Command Palette</span>
          </div>
        </div>
      )
    }
  ]

  // Show/hide based on isActive prop
  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      setCurrentStep(0)
    } else {
      setIsVisible(false)
    }
  }, [isActive])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
    setIsVisible(false)
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  if (!isVisible) return null

  return (
    <Dialog open={isVisible} onOpenChange={() => setIsVisible(false)}>
      <DialogContent 
        className="sm:max-w-lg atlas-animate-scale-in"
        aria-describedby="onboarding-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Atlas Onboarding</DialogTitle>
          <DialogDescription id="onboarding-description">
            Learn how to use Atlas with this interactive walkthrough covering search, filters, and preview features.
          </DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {currentStepData.icon}
                </div>
                <Badge variant="outline" className="text-xs">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="atlas-hover atlas-focus-ring"
              >
                <X className="icon-sm" />
              </Button>
            </div>
            
            <Progress value={progress} className="h-1 mb-4" />
            
            <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            {currentStepData.content}
          </CardContent>
          
          <div className="flex justify-between items-center p-6 pt-0">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="atlas-hover atlas-focus-ring"
                >
                  <ArrowLeft className="icon-sm mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="atlas-hover atlas-focus-ring"
              >
                Skip tour
              </Button>
              
              <Button
                variant="default"
                onClick={handleNext}
                className="atlas-button-states atlas-focus-ring"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Get Started
                    <CheckCircle className="icon-sm ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="icon-sm ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

// Feature Highlight Component
export function FeatureHighlight({ 
  title, 
  description, 
  isVisible, 
  onDismiss,
  targetSelector,
  position = 'bottom'
}: FeatureHighlightProps) {
  const [showHighlight, setShowHighlight] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowHighlight(true)
    } else {
      setShowHighlight(false)
    }
  }, [isVisible])

  if (!showHighlight) return null

  return (
    <Dialog open={showHighlight} onOpenChange={onDismiss}>
      <DialogContent 
        className="sm:max-w-sm atlas-animate-scale-in"
        aria-describedby="feature-highlight-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Feature Highlight</DialogTitle>
          <DialogDescription id="feature-highlight-description">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Target className="icon-md text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDismiss}
              className="atlas-hover atlas-focus-ring"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}