'use client'

import React, { useState } from 'react'
import { 
  ArrowRight, ArrowLeft, Home, Search, FolderOpen, BarChart3, 
  Settings, User, Info, Bell, ExternalLink, Modal, Route,
  ChevronRight, Play, Pause, Check, X, AlertTriangle, Loader2,
  Mouse, Keyboard, Smartphone, Monitor, Tablet
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'

export function NavigationSpecification() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Navigation & Flow Specifications</h1>
        <p className="text-muted-foreground">
          Complete interaction flows with all states, transitions, and edge cases defined.
        </p>
      </div>

      <Tabs defaultValue="flows" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flows">User Flows</TabsTrigger>
          <TabsTrigger value="states">Action States</TabsTrigger>
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Systems</TabsTrigger>
        </TabsList>

        {/* User Flows */}
        <TabsContent value="flows">
          <UserFlowSpecification 
            activeFlow={activeFlow}
            setActiveFlow={setActiveFlow}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </TabsContent>

        {/* Action States */}
        <TabsContent value="states">
          <ActionStatesSpecification />
        </TabsContent>

        {/* Routing */}
        <TabsContent value="routing">
          <RoutingSpecification />
        </TabsContent>

        {/* Feedback */}
        <TabsContent value="feedback">
          <FeedbackSpecification />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// User Flow Specification
function UserFlowSpecification({ 
  activeFlow, 
  setActiveFlow, 
  currentStep, 
  setCurrentStep 
}: {
  activeFlow: string | null
  setActiveFlow: (flow: string | null) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}) {
  const userFlows = [
    {
      id: 'auth-signin',
      title: 'Sign In Flow',
      description: 'Complete authentication journey',
      trigger: 'Home → Sign In button',
      steps: [
        {
          action: 'Click "Sign In" button',
          result: 'Navigate to /signin page',
          ui: 'Button shows loading spinner (100ms), then route change',
          fallback: 'If offline: Show "Connect to internet" message'
        },
        {
          action: 'Enter credentials',
          result: 'Real-time validation on blur',
          ui: 'Email: Check format, Password: Show/hide toggle',
          fallback: 'Invalid format: Red border + error message below'
        },
        {
          action: 'Click "Sign In"',
          result: 'Submit form with validation',
          ui: 'Button disabled + loading spinner, form fields readonly',
          fallback: 'API error: Inline error message + retry button'
        },
        {
          action: 'Authentication success',
          result: 'Navigate to /search + welcome toast',
          ui: 'Success toast (4s auto-dismiss) + fade transition',
          fallback: 'Demo account: Show specific welcome message'
        }
      ]
    },
    {
      id: 'search-flow',
      title: 'Search Experience',
      description: 'Query → Results → Preview → Actions',
      trigger: 'Search input focus or typing',
      steps: [
        {
          action: 'Focus search input',
          result: 'Show recent searches dropdown',
          ui: 'Dropdown slides down (150ms), max 5 recent queries',
          fallback: 'No recents: Show search tips instead'
        },
        {
          action: 'Type query (debounced 300ms)',
          result: 'Show live suggestions',
          ui: 'Loading spinner in input, suggestions update',
          fallback: 'No suggestions: Show "Press Enter to search"'
        },
        {
          action: 'Press Enter or click suggestion',
          result: 'Execute search',
          ui: 'Input readonly + spinner, results area shows loading skeleton',
          fallback: 'API timeout: Show retry button + error message'
        },
        {
          action: 'Results loaded',
          result: 'Display results with stagger animation',
          ui: 'Cards fade in with 50ms stagger delay',
          fallback: 'No results: Show helpful empty state with suggestions'
        },
        {
          action: 'Click result card',
          result: 'Open preview panel',
          ui: 'Panel slides in from right (220ms), focus preview content',
          fallback: 'Preview load error: Show error state with retry'
        }
      ]
    },
    {
      id: 'connector-setup',
      title: 'Connector Setup',
      description: 'Connect external data source',
      trigger: 'Connectors page → Connect button',
      steps: [
        {
          action: 'Click "Connect" on service card',
          result: 'Open permission modal',
          ui: 'Modal scales in (180ms), backdrop blur effect',
          fallback: 'Service unavailable: Show maintenance message'
        },
        {
          action: 'Review permissions',
          result: 'Show required access list',
          ui: 'Checklist with icons, "Continue to [Service]" button',
          fallback: 'Cancel: Close modal, return focus to Connect button'
        },
        {
          action: 'Click "Continue"',
          result: 'Redirect to OAuth provider',
          ui: 'Button shows loading, then external window opens',
          fallback: 'Popup blocked: Show instructions to allow popups'
        },
        {
          action: 'Complete OAuth flow',
          result: 'Return to Atlas with connection status',
          ui: 'Progress indicator during connection setup',
          fallback: 'OAuth denied: Return to modal with "try again" option'
        },
        {
          action: 'Connection successful',
          result: 'Update connector card to "Connected" state',
          ui: 'Success toast + card animates to connected appearance',
          fallback: 'Connection failed: Show error details + retry button'
        }
      ]
    },
    {
      id: 'collection-create',
      title: 'Create Collection',
      description: 'Save search results to collection',
      trigger: 'Collections page → New Collection button',
      steps: [
        {
          action: 'Click "New Collection"',
          result: 'Open creation modal',
          ui: 'Modal scales in, focus name input field',
          fallback: 'Max collections reached: Show upgrade prompt'
        },
        {
          action: 'Enter collection name',
          result: 'Real-time validation',
          ui: 'Character count, duplicate name checking',
          fallback: 'Duplicate name: Show error + suggest alternatives'
        },
        {
          action: 'Click "Save"',
          result: 'Create collection',
          ui: 'Save button disabled + spinner, form readonly',
          fallback: 'Validation error: Highlight field + error message'
        },
        {
          action: 'Collection created',
          result: 'Close modal + show new collection',
          ui: 'Modal fades out, new collection card animates in',
          fallback: 'API error: Show error in modal with retry option'
        }
      ]
    }
  ]

  const selectedFlow = activeFlow ? userFlows.find(f => f.id === activeFlow) : null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">User Flow Specifications</h2>
        <p className="text-muted-foreground">
          Step-by-step interaction flows with UI states and fallback behaviors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available Flows</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {userFlows.map((flow) => (
                <button
                  key={flow.id}
                  onClick={() => {
                    setActiveFlow(activeFlow === flow.id ? null : flow.id)
                    setCurrentStep(0)
                  }}
                  className={`
                    w-full p-4 text-left atlas-hover atlas-focus-ring rounded
                    ${activeFlow === flow.id ? 'bg-accent text-accent-foreground' : ''}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{flow.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {flow.steps.length} steps
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Trigger:</strong> {flow.trigger}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Flow Details */}
        <div className="lg:col-span-2">
          {selectedFlow ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="icon-md" />
                  {selectedFlow.title}
                </CardTitle>
                <CardDescription>
                  {selectedFlow.description} • {selectedFlow.steps.length} steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Step Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="atlas-hover atlas-focus-ring"
                    >
                      <ArrowLeft className="icon-xs mr-2" />
                      Previous
                    </Button>
                    
                    <Badge variant="outline">
                      Step {currentStep + 1} of {selectedFlow.steps.length}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep(Math.min(selectedFlow.steps.length - 1, currentStep + 1))}
                      disabled={currentStep === selectedFlow.steps.length - 1}
                      className="atlas-hover atlas-focus-ring"
                    >
                      Next
                      <ArrowRight className="icon-xs ml-2" />
                    </Button>
                  </div>

                  {/* Current Step Details */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-primary text-primary-foreground mt-1">
                        {currentStep + 1}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{selectedFlow.steps[currentStep].action}</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-success/10 border border-success/20 rounded">
                            <h5 className="font-medium text-sm text-success mb-1">Expected Result</h5>
                            <p className="text-sm">{selectedFlow.steps[currentStep].result}</p>
                          </div>
                          
                          <div className="p-3 bg-info/10 border border-info/20 rounded">
                            <h5 className="font-medium text-sm text-info mb-1">UI Behavior</h5>
                            <p className="text-sm">{selectedFlow.steps[currentStep].ui}</p>
                          </div>
                          
                          <div className="p-3 bg-warning/10 border border-warning/20 rounded">
                            <h5 className="font-medium text-sm text-warning mb-1">Error/Edge Case</h5>
                            <p className="text-sm">{selectedFlow.steps[currentStep].fallback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implementation Notes */}
                  <Alert>
                    <AlertTriangle className="icon-sm" />
                    <AlertDescription>
                      <strong>Engineering Note:</strong> Each step must implement all three scenarios: 
                      success path, UI feedback, and error handling. Test all edge cases thoroughly.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Mouse className="icon-xl text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Select a User Flow</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a flow from the list to see detailed specifications
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Action States Specification
function ActionStatesSpecification() {
  const stateCategories = [
    {
      category: 'Form Actions',
      description: 'Input validation and submission states',
      actions: [
        {
          action: 'Form Field Validation',
          states: {
            default: 'Normal input state with placeholder',
            focus: 'Border highlight + label animation',
            typing: 'Real-time validation (debounced)',
            valid: 'Green border + checkmark icon',
            invalid: 'Red border + error message below',
            disabled: 'Gray background + cursor not-allowed'
          }
        },
        {
          action: 'Form Submission',
          states: {
            default: 'Submit button enabled',
            validating: 'Button disabled during field validation',
            loading: 'Spinner + "Submitting..." text',
            success: 'Green checkmark + success message',
            error: 'Red X + error details + retry button',
            disabled: 'Grayed out when form invalid'
          }
        }
      ]
    },
    {
      category: 'File Actions',
      description: 'Operations on search results and files',
      actions: [
        {
          action: 'Open in App',
          states: {
            available: 'Blue button with external link icon',
            hover: 'Darker blue + lift animation (100ms)',
            loading: 'Spinner + "Opening..." text',
            unavailable: 'Grayed out + tooltip explaining why',
            error: 'Red border + "Failed to open" message',
            success: 'Brief "Opened" confirmation before reset'
          }
        },
        {
          action: 'Share File',
          states: {
            default: 'Share icon button',
            loading: 'Spinner in place of icon',
            success: 'Green checkmark + "Link copied" toast',
            permission_denied: 'Lock icon + "No permission" tooltip',
            error: 'Red X + error toast with details',
            unavailable: 'Grayed out for unsupported files'
          }
        },
        {
          action: 'Star/Favorite',
          states: {
            unstarred: 'Outline star icon',
            starred: 'Filled star icon (yellow/gold)',
            loading: 'Spinner during API call',
            success: 'Star fills/empties with animation',
            error: 'Reverts to previous state + error toast',
            unavailable: 'Hidden for files that can\'t be starred'
          }
        }
      ]
    },
    {
      category: 'Navigation Actions',
      description: 'Page transitions and modal behaviors',
      actions: [
        {
          action: 'Modal Open/Close',
          states: {
            closed: 'Trigger button in normal state',
            opening: 'Scale + fade in animation (180ms)',
            open: 'Modal focused, backdrop active, body scroll locked',
            loading: 'Modal content shows loading skeleton',
            error: 'Error state within modal content',
            closing: 'Scale + fade out, return focus to trigger'
          }
        },
        {
          action: 'Page Navigation',
          states: {
            default: 'Navigation link in normal state',
            hover: 'Background change + cursor pointer',
            active: 'Different styling for current page',
            loading: 'Link disabled during route change',
            error: 'Navigation failed, stay on current page',
            offline: 'Links disabled with offline indicator'
          }
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Action States Specification</h2>
        <p className="text-muted-foreground">
          Every user action must implement these states for complete UX.
        </p>
      </div>

      {stateCategories.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {category.actions.map((actionSpec, actionIndex) => (
                <div key={actionIndex} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-4">{actionSpec.action}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(actionSpec.states).map(([state, description]) => {
                      const stateConfig = {
                        default: { color: 'border-border', icon: '◯' },
                        loading: { color: 'border-blue-200 bg-blue-50', icon: '⟲' },
                        success: { color: 'border-success/50 bg-success/10', icon: '✓' },
                        error: { color: 'border-destructive/50 bg-destructive/10', icon: '✕' },
                        disabled: { color: 'border-muted bg-muted/50', icon: '⊘' },
                        focus: { color: 'border-primary bg-primary/5', icon: '◉' },
                        hover: { color: 'border-primary/50 bg-accent', icon: '◗' }
                      }
                      
                      const config = stateConfig[state as keyof typeof stateConfig] || stateConfig.default

                      return (
                        <div key={state} className={`p-3 rounded border ${config.color}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">{config.icon}</span>
                            <code className="text-xs font-medium">{state}</code>
                          </div>
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Alert>
        <Check className="icon-sm" />
        <AlertDescription>
          <strong>Implementation Requirement:</strong> Every interactive element must implement 
          default, loading, success, error, and disabled states at minimum.
        </AlertDescription>
      </Alert>
    </div>
  )
}

// Routing Specification
function RoutingSpecification() {
  const routes = [
    {
      path: '/',
      name: 'Home',
      description: 'Landing page with authentication',
      access: 'Public',
      behaviors: {
        authenticated: 'Redirect to /search automatically',
        unauthenticated: 'Show hero section + sign in options',
        loading: 'Show skeleton while checking auth state',
        offline: 'Show offline banner, allow cached content'
      }
    },
    {
      path: '/signin',
      name: 'Sign In',
      description: 'Authentication form',
      access: 'Public only',
      behaviors: {
        authenticated: 'Redirect to /search or returnUrl',
        unauthenticated: 'Show sign in form + SSO options',
        loading: 'Show form skeleton',
        error: 'Show error inline, maintain form state'
      }
    },
    {
      path: '/signup',
      name: 'Sign Up / Free Trial',
      description: 'Account creation flow',
      access: 'Public only',
      behaviors: {
        authenticated: 'Redirect to /search',
        unauthenticated: 'Show multi-step signup form',
        loading: 'Show progress indicator',
        error: 'Maintain step state, show errors inline'
      }
    },
    {
      path: '/search',
      name: 'Search',
      description: 'Main search interface',
      access: 'Authenticated',
      behaviors: {
        unauthenticated: 'Redirect to /signin?returnUrl=/search',
        authenticated: 'Show 3-panel layout with state',
        loading: 'Show layout with loading skeletons',
        no_connections: 'Show setup prompt + connector links'
      }
    },
    {
      path: '/collections',
      name: 'Collections',
      description: 'Saved file collections',
      access: 'Authenticated',
      behaviors: {
        unauthenticated: 'Redirect to /signin?returnUrl=/collections',
        authenticated: 'Show collections grid + creation UI',
        loading: 'Show grid skeleton',
        empty: 'Show empty state with creation prompt'
      }
    },
    {
      path: '/connectors',
      name: 'Connectors',
      description: 'Data source management',
      access: 'Authenticated',
      behaviors: {
        unauthenticated: 'Redirect to /signin?returnUrl=/connectors',
        authenticated: 'Show available + connected services',
        loading: 'Show service cards skeleton',
        connection_error: 'Show error states on affected cards'
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      description: 'User preferences',
      access: 'Authenticated',
      behaviors: {
        unauthenticated: 'Redirect to /signin?returnUrl=/settings',
        authenticated: 'Show settings sections',
        loading: 'Show form skeletons',
        unsaved: 'Show confirmation dialog on navigation'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      description: 'User account details',
      access: 'Authenticated',
      behaviors: {
        unauthenticated: 'Redirect to /signin?returnUrl=/profile',
        authenticated: 'Show profile info + account options',
        loading: 'Show profile skeleton',
        error: 'Show error state with retry option'
      }
    }
  ]

  const navigationRules = [
    {
      rule: 'Back Button Behavior',
      description: 'Browser back button and in-app navigation',
      specifications: [
        'Home ← Any page (if signed in)',
        'Search ← Collections, Analytics, Settings, Profile',
        'Signin ← Any public page',
        'Previous page ← Modal close (don\'t change route)',
        'Search with filters ← Clear filters (maintain route)'
      ]
    },
    {
      rule: 'Authentication Redirects',
      description: 'Route protection and redirect behavior',
      specifications: [
        'Protected route access → /signin?returnUrl=[current]',
        'Successful signin → returnUrl or /search default',
        'Already authenticated → Skip signin, go to /search',
        'Session expiry → /signin with current URL preserved',
        'Logout → /home with all state cleared'
      ]
    },
    {
      rule: 'Modal vs Route',
      description: 'When to use modals vs page navigation',
      specifications: [
        'Quick actions (share, star, delete) → Modal',
        'Complex forms (create collection) → Modal',
        'Settings changes → Stay on page, show inline feedback',
        'Deep content (file preview) → Panel, not modal',
        'Multi-step flows (signup) → Dedicated pages'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Routing & Navigation Rules</h2>
        <p className="text-muted-foreground">
          URL structure, access control, and navigation behavior specifications.
        </p>
      </div>

      {/* Route Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="icon-md" />
            Route Specifications
          </CardTitle>
          <CardDescription>
            Each route's access requirements and state behaviors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.path} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{route.name}</h4>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{route.path}</code>
                    <p className="text-sm text-muted-foreground mt-1">{route.description}</p>
                  </div>
                  <Badge 
                    variant={route.access === 'Public' ? 'secondary' : 'default'}
                    className={route.access === 'Public only' ? 'bg-warning text-warning-foreground' : ''}
                  >
                    {route.access}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(route.behaviors).map(([state, behavior]) => (
                    <div key={state} className="p-2 bg-muted rounded text-sm">
                      <code className="font-medium">{state}:</code>
                      <span className="ml-2">{behavior}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {navigationRules.map((ruleCategory) => (
          <Card key={ruleCategory.rule}>
            <CardHeader>
              <CardTitle className="text-base">{ruleCategory.rule}</CardTitle>
              <CardDescription className="text-sm">{ruleCategory.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ruleCategory.specifications.map((spec, index) => (
                  <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                    {spec}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <ExternalLink className="icon-sm" />
        <AlertDescription>
          <strong>Engineering Note:</strong> URL state must reflect current filters, search query, 
          and view mode. Users should be able to bookmark and share URLs that restore exact app state.
        </AlertDescription>
      </Alert>
    </div>
  )
}

// Feedback Specification
function FeedbackSpecification() {
  const feedbackSystems = [
    {
      system: 'Toast Notifications',
      description: 'Temporary success/error messages',
      specifications: {
        timing: '4 seconds auto-dismiss (8s for errors)',
        position: 'Top-right corner, stack vertically',
        animation: 'Slide in from right (200ms), fade out (150ms)',
        interaction: 'Click to dismiss early, hover to pause timer',
        content: 'Icon + message + optional action button',
        accessibility: 'aria-live="polite" for success, "assertive" for errors'
      },
      examples: [
        '✅ "Collection saved successfully"',
        '❌ "Failed to connect to Google Drive. Try again?"',
        'ℹ️ "Search results updated"',
        '⚠️ "Connection is slow. Results may be delayed."'
      ]
    },
    {
      system: 'Inline Validation',
      description: 'Form field feedback',
      specifications: {
        timing: 'On blur for first validation, real-time after first error',
        position: 'Below form field, left-aligned',
        animation: 'Slide down (150ms) when shown',
        interaction: 'Clears when user starts correcting',
        content: 'Error icon + specific, actionable message',
        accessibility: 'aria-describedby linking field to error'
      },
      examples: [
        '"Email is required"',
        '"Password must be at least 8 characters"',
        '"This collection name already exists"',
        '"Please select at least one file type"'
      ]
    },
    {
      system: 'Loading States',
      description: 'Progress and activity indicators',
      specifications: {
        timing: 'Immediate feedback, minimum 200ms duration',
        position: 'Replace or overlay original content',
        animation: 'Spinner (24fps) or progress bar',
        interaction: 'Disable associated controls',
        content: 'Loading text describing the action',
        accessibility: 'aria-busy="true" and aria-describedby'
      },
      examples: [
        'Button: "Saving..." with spinner',
        'Search: Skeleton cards in results area',
        'Modal: "Loading preview..." with progress',
        'Page: Loading skeleton matching final layout'
      ]
    },
    {
      system: 'Empty States',
      description: 'No content or first-use scenarios',
      specifications: {
        timing: 'After loading completes with no results',
        position: 'Center of content area',
        animation: 'Fade in (200ms)',
        interaction: 'Include primary CTA to resolve',
        content: 'Illustration + heading + description + action',
        accessibility: 'Proper heading hierarchy, descriptive text'
      },
      examples: [
        '"No search results. Try different keywords."',
        '"Connect your first data source to start searching."',
        '"Create your first collection to organize files."',
        '"No notifications yet. We\'ll show updates here."'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Feedback Systems</h2>
        <p className="text-muted-foreground">
          How the interface communicates state and provides user feedback.
        </p>
      </div>

      {feedbackSystems.map((system) => (
        <Card key={system.system}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="icon-md" />
              {system.system}
            </CardTitle>
            <CardDescription>{system.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Specifications */}
              <div>
                <h4 className="font-medium mb-3">Specifications</h4>
                <div className="space-y-3">
                  {Object.entries(system.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3">
                      <code className="text-xs bg-muted px-2 py-1 rounded min-w-[80px] text-center">
                        {key}
                      </code>
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div>
                <h4 className="font-medium mb-3">Examples</h4>
                <div className="space-y-2">
                  {system.examples.map((example, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded text-sm">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Global Feedback Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Global Feedback Rules</CardTitle>
          <CardDescription>Universal principles for all feedback types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-success">Requirements</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Every action must provide immediate feedback
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Error messages must be specific and actionable
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Success confirmations for all destructive actions
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Loading states for any action taking >200ms
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Consistent language and tone across all feedback
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-destructive">Avoid</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Generic error messages ("Something went wrong")
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Silent failures without user notification
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Blocking the UI for non-critical operations
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Multiple toasts for the same action
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Feedback that doesn't match the action taken
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}