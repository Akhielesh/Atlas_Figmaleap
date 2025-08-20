'use client'

import React, { useState } from 'react'
import { 
  Palette, Type, Layout, Zap, MousePointer, Smartphone, 
  Eye, Check, X, AlertTriangle, Loader2, ChevronDown,
  Settings, Search, User, Home, BarChart3, FolderOpen,
  Bell, Share, Star, Download, ExternalLink, Copy, Trash2,
  Plus, Minus, Filter, Grid3X3, List, SortAsc, SortDesc,
  Play, Pause, RefreshCw, ArrowRight, ArrowLeft, Info
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

// Design System Documentation Component
export function DesignSystemSpecification() {
  const [activeTab, setActiveTab] = useState('tokens')
  const [selectedComponent, setSelectedComponent] = useState('button')
  const [showStateDemo, setShowStateDemo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Atlas Design System</h1>
          <p className="text-muted-foreground">
            Interaction-complete specification for engineering implementation
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 gap-2 p-1">
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Palette className="icon-xs" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Layout className="icon-xs" />
              Components
            </TabsTrigger>
            <TabsTrigger value="flows" className="flex items-center gap-2">
              <Zap className="icon-xs" />
              Flows
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center gap-2">
              <MousePointer className="icon-xs" />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="responsive" className="flex items-center gap-2">
              <Smartphone className="icon-xs" />
              Responsive
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Eye className="icon-xs" />
              A11y
            </TabsTrigger>
            <TabsTrigger value="checklist" className="flex items-center gap-2">
              <Check className="icon-xs" />
              Checklist
            </TabsTrigger>
          </TabsList>

          {/* Design Tokens */}
          <TabsContent value="tokens" className="space-y-6">
            <DesignTokensSpecification />
          </TabsContent>

          {/* Component System */}
          <TabsContent value="components" className="space-y-6">
            <ComponentSystemSpecification 
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              showStateDemo={showStateDemo}
              onShowStateDemo={setShowStateDemo}
            />
          </TabsContent>

          {/* Interaction Flows */}
          <TabsContent value="flows" className="space-y-6">
            <InteractionFlowsSpecification />
          </TabsContent>

          {/* Micro-interactions */}
          <TabsContent value="interactions" className="space-y-6">
            <MicroInteractionsSpecification />
          </TabsContent>

          {/* Responsive Design */}
          <TabsContent value="responsive" className="space-y-6">
            <ResponsiveSpecification />
          </TabsContent>

          {/* Accessibility */}
          <TabsContent value="accessibility" className="space-y-6">
            <AccessibilitySpecification />
          </TabsContent>

          {/* Implementation Checklist */}
          <TabsContent value="checklist" className="space-y-6">
            <ImplementationChecklist />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Design Tokens Specification
function DesignTokensSpecification() {
  const colorTokens = [
    { name: 'Primary', value: '#030213', usage: 'Brand color, primary actions' },
    { name: 'Success', value: '#16a34a', usage: 'Success states, confirmations' },
    { name: 'Warning', value: '#f59e0b', usage: 'Warnings, cautions' },
    { name: 'Info', value: '#3b82f6', usage: 'Information, neutral alerts' },
    { name: 'Destructive', value: '#d4183d', usage: 'Errors, dangerous actions' },
    { name: 'Muted', value: '#ececf0', usage: 'Secondary backgrounds' },
    { name: 'Border', value: 'rgba(0,0,0,0.1)', usage: 'Dividers, outlines' }
  ]

  const typographyTokens = [
    { name: 'text-xs', size: '12px', usage: 'Captions, metadata' },
    { name: 'text-sm', size: '14px', usage: 'UI text, labels (BASE)' },
    { name: 'text-base', size: '16px', usage: 'Body text, descriptions' },
    { name: 'text-lg', size: '20px', usage: 'Subheadings' },
    { name: 'text-xl', size: '24px', usage: 'Section headings' },
    { name: 'text-2xl', size: '32px', usage: 'Page titles' }
  ]

  const spacingTokens = [
    { name: 'space-1', size: '4px', usage: 'Tight spacing' },
    { name: 'space-2', size: '8px', usage: 'Base spacing unit' },
    { name: 'space-3', size: '12px', usage: 'Small gaps' },
    { name: 'space-4', size: '16px', usage: 'Standard spacing' },
    { name: 'space-6', size: '24px', usage: 'Section spacing' },
    { name: 'space-8', size: '32px', usage: 'Large spacing' }
  ]

  const motionTokens = [
    { name: 'motion-fast', duration: '100ms', usage: 'Hover, focus feedback' },
    { name: 'motion-medium', duration: '150ms', usage: 'UI state changes' },
    { name: 'motion-slow', duration: '200ms', usage: 'Content transitions' },
    { name: 'motion-panel', duration: '220ms', usage: 'Panel slides' },
    { name: 'motion-modal', duration: '180ms', usage: 'Modal overlays' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Design Tokens - Single Source of Truth</h2>
        <p className="text-muted-foreground mb-6">
          All design values must use these tokens. No hardcoded values allowed in components.
        </p>
      </div>

      {/* Color System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="icon-md" />
            Color System
          </CardTitle>
          <CardDescription>
            Semantic color tokens with light/dark mode support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-3 p-3 border rounded-lg">
                <div 
                  className="w-8 h-8 rounded-md border shadow-sm" 
                  style={{ backgroundColor: token.value }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">var(--{token.name.toLowerCase()})</p>
                  <p className="text-xs text-muted-foreground">{token.usage}</p>
                  <code className="text-xs bg-muted px-1 rounded">{token.value}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="icon-md" />
            Typography Scale
          </CardTitle>
          <CardDescription>
            Font sizes, weights, and line heights with usage guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typographyTokens.map((token) => (
              <div key={token.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    var(--{token.name})
                  </code>
                  <span style={{ fontSize: token.size }} className="font-medium">
                    Sample Text
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{token.size}</p>
                  <p className="text-xs text-muted-foreground">{token.usage}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Alert className="mt-4">
            <Info className="icon-sm" />
            <AlertDescription>
              <strong>Critical:</strong> Never use Tailwind font classes (text-2xl, font-bold) unless overriding defaults. 
              Base typography is handled by globals.css.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Spacing System */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>4px base unit system for consistent spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {spacingTokens.map((token) => (
              <div key={token.name} className="flex items-center gap-4 p-3 border rounded-lg">
                <code className="font-mono text-sm bg-muted px-2 py-1 rounded min-w-[120px]">
                  var(--{token.name})
                </code>
                <div className="h-4 bg-primary rounded" style={{ width: token.size }} />
                <span className="text-sm font-medium">{token.size}</span>
                <span className="text-xs text-muted-foreground">{token.usage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motion System */}
      <Card>
        <CardHeader>
          <CardTitle>Motion System</CardTitle>
          <CardDescription>Animation timing and easing specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {motionTokens.map((token) => (
              <div key={token.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                    var(--{token.name})
                  </code>
                  <span className="text-sm font-medium">{token.duration}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm">{token.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Easing Functions</h4>
            <div className="space-y-2 text-sm">
              <div><code>cubic-bezier(0.2, 0.8, 0.2, 1)</code> - Primary easing</div>
              <div><code>ease-out</code> - Exit animations</div>
              <div><code>ease-in</code> - Enter animations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Component System Specification
function ComponentSystemSpecification({ 
  selectedComponent, 
  onSelectComponent, 
  showStateDemo, 
  onShowStateDemo 
}: {
  selectedComponent: string
  onSelectComponent: (component: string) => void
  showStateDemo: string | null
  onShowStateDemo: (state: string | null) => void
}) {
  const components = [
    { id: 'button', name: 'Button', icon: MousePointer },
    { id: 'input', name: 'Input', icon: Type },
    { id: 'select', name: 'Select', icon: ChevronDown },
    { id: 'card', name: 'Card', icon: Layout },
    { id: 'badge', name: 'Badge', icon: Badge },
    { id: 'tooltip', name: 'Tooltip', icon: Info }
  ]

  const buttonStates = [
    { state: 'default', label: 'Default', description: 'Normal resting state' },
    { state: 'hover', label: 'Hover', description: 'Mouse over state' },
    { state: 'active', label: 'Active', description: 'Pressed state' },
    { state: 'focus', label: 'Focus', description: 'Keyboard focus state' },
    { state: 'disabled', label: 'Disabled', description: 'Non-interactive state' },
    { state: 'loading', label: 'Loading', description: 'Processing state' }
  ]

  const buttonVariants = [
    { variant: 'primary', label: 'Primary', description: 'Main actions, one per section', className: 'bg-primary text-primary-foreground' },
    { variant: 'secondary', label: 'Secondary', description: 'Supporting actions', className: 'bg-secondary text-secondary-foreground' },
    { variant: 'outline', label: 'Outline', description: 'Subtle actions', className: 'border border-input bg-background' },
    { variant: 'ghost', label: 'Ghost', description: 'Low emphasis actions', className: 'hover:bg-accent hover:text-accent-foreground' },
    { variant: 'destructive', label: 'Destructive', description: 'Dangerous actions', className: 'bg-destructive text-destructive-foreground' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Component System</h2>
        <p className="text-muted-foreground mb-6">
          Complete component specifications with all variants and states defined.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Component List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Components</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => onSelectComponent(component.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left atlas-hover atlas-focus-ring
                    ${selectedComponent === component.id ? 'bg-accent text-accent-foreground' : ''}
                  `}
                >
                  <component.icon className="icon-sm" />
                  {component.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Component Details */}
        <div className="lg:col-span-3 space-y-6">
          {selectedComponent === 'button' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Button Component</CardTitle>
                  <CardDescription>
                    Primary interactive element with multiple variants and states
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Variants */}
                    <div>
                      <h4 className="font-medium mb-3">Variants</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {buttonVariants.map((variant) => (
                          <div key={variant.variant} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium">{variant.label}</h5>
                              <Button 
                                variant={variant.variant as any}
                                size="sm"
                                className="atlas-button-states atlas-focus-ring touch-target"
                              >
                                Sample
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{variant.description}</p>
                            <code className="text-xs bg-muted px-2 py-1 rounded block">
                              variant="{variant.variant}"
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* States */}
                    <div>
                      <h4 className="font-medium mb-3">Interactive States</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {buttonStates.map((state) => (
                          <div key={state.state} className="p-4 border rounded-lg">
                            <h5 className="font-medium mb-2">{state.label}</h5>
                            <p className="text-sm text-muted-foreground mb-3">{state.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={state.state === 'disabled'}
                              className={`
                                touch-target
                                ${state.state === 'loading' ? 'opacity-75 cursor-wait' : ''}
                                ${state.state === 'focus' ? 'ring-2 ring-ring ring-offset-2' : ''}
                              `}
                            >
                              {state.state === 'loading' && <Loader2 className="icon-xs animate-spin mr-2" />}
                              {state.label}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Implementation Notes */}
                    <Alert>
                      <Settings className="icon-sm" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <p><strong>Touch Targets:</strong> All buttons must have minimum 44×44px touch target</p>
                          <p><strong>Loading State:</strong> Show spinner + disable interaction during processing</p>
                          <p><strong>Focus:</strong> Visible outline for keyboard navigation</p>
                          <p><strong>Motion:</strong> Use atlas-button-states class for hover effects</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Implementation Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium mb-2">Primary Action</h5>
                      <pre className="text-xs overflow-x-auto">
{`<Button 
  variant="primary" 
  className="atlas-button-states atlas-focus-ring touch-target"
  disabled={isLoading}
>
  {isLoading ? <Loader2 className="icon-sm animate-spin mr-2" /> : null}
  Save Changes
</Button>`}
                      </pre>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium mb-2">Icon Button</h5>
                      <pre className="text-xs overflow-x-auto">
{`<Button 
  variant="ghost" 
  size="sm"
  className="atlas-hover atlas-focus-ring touch-target"
  aria-label="Settings"
>
  <Settings className="icon-sm" />
</Button>`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Add specifications for other components here */}
        </div>
      </div>
    </div>
  )
}

// Interaction Flows Specification
function InteractionFlowsSpecification() {
  const flows = [
    {
      id: 'auth',
      name: 'Authentication Flow',
      description: 'Sign in, sign up, and onboarding',
      steps: [
        'Home → Sign In button → Navigate to /signin',
        'Form validation on blur and submit',
        'Loading state with spinner (1-3s)',
        'Success: Navigate to /search + success toast',
        'Error: Show inline error message + retry'
      ]
    },
    {
      id: 'search',
      name: 'Search Loop',
      description: 'Query → Results → Preview → Actions',
      steps: [
        'Type query → Show suggestions dropdown',
        'Submit → Loading spinner + disabled state',
        'Results populate with stagger animation',
        'Click result → Preview panel slide-in (220ms)',
        'All actions have loading → success/error states'
      ]
    },
    {
      id: 'connectors',
      name: 'Connector Setup',
      description: 'Connect external data sources',
      steps: [
        'Connectors page → Available services grid',
        'Click Connect → Permission modal appears',
        'Confirm → OAuth redirect (external)',
        'Return → Loading state → Success confirmation',
        'Error: Retry button + error details'
      ]
    },
    {
      id: 'collections',
      name: 'Collections Management',
      description: 'Create and manage file collections',
      steps: [
        'Collections page → New Collection button',
        'Modal opens → Name validation on blur',
        'Save → Loading spinner → Success toast',
        'Collection card appears with fade-in',
        'Error: Inline validation message'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Interaction Flows</h2>
        <p className="text-muted-foreground mb-6">
          Complete user journey specifications with all states and transitions defined.
        </p>
      </div>

      <div className="grid gap-6">
        {flows.map((flow) => (
          <Card key={flow.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="icon-md" />
                {flow.name}
              </CardTitle>
              <CardDescription>{flow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {flow.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-0.5 text-xs min-w-[24px] justify-center">
                      {index + 1}
                    </Badge>
                    <p className="text-sm">{step}</p>
                  </div>
                ))}
              </div>
              
              <Alert className="mt-4">
                <Info className="icon-sm" />
                <AlertDescription>
                  <strong>Engineering Note:</strong> Each step must have defined loading, success, and error states. 
                  No interaction should lack feedback.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* State Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Required States for All Interactions</CardTitle>
          <CardDescription>Every user action must implement these states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Loader2 className="icon-sm text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Loading State</p>
                  <p className="text-xs text-muted-foreground">Spinner + disabled UI</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Check className="icon-sm text-success" />
                <div>
                  <p className="font-medium text-sm">Success State</p>
                  <p className="text-xs text-muted-foreground">Confirmation + next action</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <X className="icon-sm text-destructive" />
                <div>
                  <p className="font-medium text-sm">Error State</p>
                  <p className="text-xs text-muted-foreground">Clear message + retry option</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Eye className="icon-sm text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Empty State</p>
                  <p className="text-xs text-muted-foreground">Helpful message + CTA</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <AlertTriangle className="icon-sm text-warning" />
                <div>
                  <p className="font-medium text-sm">Validation State</p>
                  <p className="text-xs text-muted-foreground">Inline feedback on forms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Pause className="icon-sm text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Disabled State</p>
                  <p className="text-xs text-muted-foreground">Clear visual indication</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Micro-interactions Specification
function MicroInteractionsSpecification() {
  const [demoActive, setDemoActive] = useState<string | null>(null)

  const interactions = [
    {
      id: 'hover',
      name: 'Hover Effects',
      timing: '100ms',
      easing: 'ease-out',
      description: 'Subtle feedback for interactive elements',
      examples: ['Button lift', 'Card shadow', 'Icon color change']
    },
    {
      id: 'focus',
      name: 'Focus States',
      timing: '150ms',
      easing: 'ease-out',
      description: 'Keyboard navigation feedback',
      examples: ['Outline ring', 'Background change', 'Border highlight']
    },
    {
      id: 'modal',
      name: 'Modal Transitions',
      timing: '180ms',
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      description: 'Dialog and overlay animations',
      examples: ['Fade + scale in', 'Backdrop blur', 'Slide from center']
    },
    {
      id: 'panel',
      name: 'Panel Slides',
      timing: '220ms',
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      description: 'Sidebar and preview panels',
      examples: ['Slide from right', 'Push content', 'Stagger content']
    },
    {
      id: 'toast',
      name: 'Notifications',
      timing: '200ms',
      easing: 'ease-out',
      description: 'Toast and alert animations',
      examples: ['Slide up', 'Fade in', 'Auto dismiss (4s)']
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Micro-interactions & Motion</h2>
        <p className="text-muted-foreground mb-6">
          Precise timing and easing specifications for all interface animations.
        </p>
      </div>

      <div className="grid gap-4">
        {interactions.map((interaction) => (
          <Card key={interaction.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Play className="icon-sm" />
                  {interaction.name}
                </CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  {interaction.timing}
                </Badge>
              </div>
              <CardDescription>{interaction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">Timing</Label>
                    <p className="font-mono text-sm">{interaction.timing}</p>
                  </div>
                  <div>
                    <Label className="text-xs">Easing</Label>
                    <p className="font-mono text-sm">{interaction.easing}</p>
                  </div>
                  <div>
                    <Label className="text-xs">CSS Class</Label>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      atlas-{interaction.id}
                    </code>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs">Examples</Label>
                  <ul className="mt-2 space-y-1">
                    {interaction.examples.map((example, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Demo Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDemoActive(demoActive === interaction.id ? null : interaction.id)}
                className={`
                  mt-4 atlas-button-states atlas-focus-ring
                  ${interaction.id === 'hover' ? 'atlas-hover' : ''}
                  ${interaction.id === 'focus' ? 'atlas-focus' : ''}
                  ${interaction.id === 'modal' ? 'atlas-modal' : ''}
                  ${interaction.id === 'panel' ? 'atlas-panel' : ''}
                `}
              >
                <Play className="icon-xs mr-2" />
                Preview Animation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Motion Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Motion Guidelines</CardTitle>
          <CardDescription>Principles for consistent interface animation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-success">Do's</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Use consistent timing for similar interactions
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Respect prefers-reduced-motion settings
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Use easing for natural feel
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                  Provide immediate feedback
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-destructive">Don'ts</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Don't use animations longer than 300ms
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Don't animate layout properties (causes reflow)
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Don't use bounce or elastic easing
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <X className="icon-xs text-destructive mt-0.5 flex-shrink-0" />
                  Don't delay critical actions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Responsive Specification
function ResponsiveSpecification() {
  const breakpoints = [
    { name: 'Mobile', width: '< 640px', cols: 1, sidebar: 'Hidden (overlay)', padding: '16px' },
    { name: 'Tablet', width: '640px - 1023px', cols: 2, sidebar: 'Collapsible', padding: '24px' },
    { name: 'Desktop', width: '1024px - 1279px', cols: 3, sidebar: 'Fixed left', padding: '32px' },
    { name: 'Wide', width: '≥ 1280px', cols: 4, sidebar: 'Fixed left', padding: '32px' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Responsive Specifications</h2>
        <p className="text-muted-foreground mb-6">
          Breakpoint behaviors and layout rules for all screen sizes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Breakpoint System</CardTitle>
          <CardDescription>Layout behavior across different screen sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Breakpoint</th>
                  <th className="text-left p-3">Screen Width</th>
                  <th className="text-left p-3">Grid Columns</th>
                  <th className="text-left p-3">Sidebar</th>
                  <th className="text-left p-3">Container Padding</th>
                </tr>
              </thead>
              <tbody>
                {breakpoints.map((bp) => (
                  <tr key={bp.name} className="border-b">
                    <td className="p-3 font-medium">{bp.name}</td>
                    <td className="p-3 font-mono text-sm">{bp.width}</td>
                    <td className="p-3">{bp.cols} column{bp.cols > 1 ? 's' : ''}</td>
                    <td className="p-3">{bp.sidebar}</td>
                    <td className="p-3">{bp.padding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Layout Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Rules</CardTitle>
          <CardDescription>Responsive behavior specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Search Layout (3-Panel)</h4>
              <div className="grid gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Mobile (&lt; 640px)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single column layout</li>
                    <li>• Filters in bottom sheet overlay</li>
                    <li>• Preview opens as full-screen modal</li>
                    <li>• Search bar sticky at top</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Tablet (640px - 1023px)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Two-column: Results + Preview</li>
                    <li>• Filters slide over from left</li>
                    <li>• Preview panel 40% width</li>
                    <li>• Touch-optimized controls</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Desktop (&ge; 1024px)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Three-column: Filters + Results + Preview</li>
                    <li>• Fixed sidebar (280px width)</li>
                    <li>• Resizable panels with drag handles</li>
                    <li>• Keyboard navigation optimized</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Component Adaptations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Cards</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mobile: Full width, stacked</li>
                    <li>• Tablet: 2 columns, 16px gap</li>
                    <li>• Desktop: 3-4 columns, 24px gap</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Forms</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mobile: Single column, 44px touch targets</li>
                    <li>• Tablet: Two columns for short fields</li>
                    <li>• Desktop: Optimized for mouse/keyboard</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Navigation</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mobile: Bottom tab bar + hamburger</li>
                    <li>• Tablet: Collapsible sidebar</li>
                    <li>• Desktop: Fixed sidebar navigation</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-2">Modals</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Mobile: Full-screen overlays</li>
                    <li>• Tablet: Centered, max 600px width</li>
                    <li>• Desktop: Centered, max 800px width</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS Implementation */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
          <CardDescription>CSS classes and media queries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Responsive Grid</h5>
              <pre className="text-xs overflow-x-auto">
{`.atlas-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .atlas-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .atlas-grid { grid-template-columns: repeat(4, 1fr); }
}`}
              </pre>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Container Padding</h5>
              <pre className="text-xs overflow-x-auto">
{`.container {
  padding: 0 var(--space-4); /* 16px mobile */
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); } /* 24px tablet */
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); } /* 32px desktop */
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Accessibility Specification
function AccessibilitySpecification() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Accessibility Specifications</h2>
        <p className="text-muted-foreground mb-6">
          WCAG 2.1 AA compliance requirements and implementation guidelines.
        </p>
      </div>

      {/* Focus Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="icon-md" />
            Focus Management
          </CardTitle>
          <CardDescription>Keyboard navigation and focus indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Focus Ring Requirements</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 2px solid outline with 2px offset</li>
                <li>• Primary color for normal elements</li>
                <li>• High contrast mode support</li>
                <li>• Visible only on keyboard focus (:focus-visible)</li>
              </ul>
              <div className="mt-3 p-3 bg-muted rounded border-2 border-primary border-dashed">
                <code className="text-xs">.atlas-focus-ring:focus-visible</code>
                <p className="text-xs text-muted-foreground mt-1">Focus indicator example</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Tab Order</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Logical tab sequence (top to bottom, left to right)</li>
                <li>• Skip links for main content</li>
                <li>• Modal focus trapping</li>
                <li>• Return focus after modal close</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Touch Targets */}
      <Card>
        <CardHeader>
          <CardTitle>Touch Targets</CardTitle>
          <CardDescription>Minimum sizes for interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-11 h-11 bg-primary rounded flex items-center justify-center touch-target">
                  <MousePointer className="icon-sm text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Primary Button</p>
                  <code className="text-xs bg-muted px-1 rounded">44×44px minimum</code>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-11 h-11 bg-muted rounded flex items-center justify-center touch-target">
                  <Settings className="icon-sm" />
                </div>
                <div>
                  <p className="font-medium text-sm">Icon Button</p>
                  <code className="text-xs bg-muted px-1 rounded">44×44px minimum</code>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Implementation</h4>
              <div className="p-3 bg-muted rounded-lg">
                <pre className="text-xs">
{`<Button className="touch-target">
  Text Button
</Button>

<Button 
  size="sm" 
  className="touch-target"
  aria-label="Settings"
>
  <Settings className="icon-sm" />
</Button>`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARIA Labels */}
      <Card>
        <CardHeader>
          <CardTitle>ARIA Labels & Semantics</CardTitle>
          <CardDescription>Screen reader compatibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Required Labels</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Icon-only buttons need aria-label</li>
                  <li>• Form inputs need visible labels</li>
                  <li>• Complex widgets need aria-describedby</li>
                  <li>• Loading states need aria-live</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Semantic HTML</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use proper heading hierarchy (h1→h6)</li>
                  <li>• Lists for grouped content</li>
                  <li>• nav, main, aside landmarks</li>
                  <li>• button vs a for actions vs navigation</li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h5 className="font-medium mb-2">Examples</h5>
              <pre className="text-xs overflow-x-auto">
{`<!-- Icon button -->
<Button aria-label="Delete item" variant="ghost">
  <Trash2 className="icon-sm" />
</Button>

<!-- Loading state -->
<div aria-live="polite" aria-busy="true">
  Searching...
</div>

<!-- Form field -->
<Label htmlFor="search">Search files</Label>
<Input 
  id="search" 
  aria-describedby="search-help"
/>
<small id="search-help">
  Enter keywords to search across all sources
</small>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color & Contrast */}
      <Card>
        <CardHeader>
          <CardTitle>Color & Contrast</CardTitle>
          <CardDescription>Visual accessibility requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="icon-sm" />
              <AlertDescription>
                All color combinations must meet WCAG AA contrast ratio of 4.5:1 for normal text and 3:1 for large text.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3 text-success">Accessible Combinations</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded" />
                    <span className="text-sm">Primary on Background</span>
                    <Badge variant="outline" className="text-xs">7.8:1</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted-foreground rounded" />
                    <span className="text-sm">Muted Text on Background</span>
                    <Badge variant="outline" className="text-xs">4.6:1</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Additional Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Don't rely on color alone for information</li>
                  <li>• Support Windows High Contrast mode</li>
                  <li>• Provide alternative text for icons</li>
                  <li>• Use patterns/shapes alongside color coding</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Implementation Checklist
function ImplementationChecklist() {
  const sections = [
    {
      title: 'Design Tokens',
      items: [
        'All colors use CSS custom properties from globals.css',
        'Typography uses var(--text-*) tokens consistently',
        'Spacing uses var(--space-*) tokens (no hardcoded px values)',
        'Border radius uses var(--radius-*) tokens',
        'No ad-hoc sizes - everything tokenized'
      ]
    },
    {
      title: 'Component States',
      items: [
        'Every interactive element has hover state',
        'All buttons show loading spinners during async operations', 
        'Focus states visible for keyboard navigation',
        'Disabled states clearly indicated',
        'Error states show specific, actionable messages',
        'Success confirmations for all user actions'
      ]
    },
    {
      title: 'Interactive Elements',
      items: [
        'All CTAs have defined destinations (route vs modal)',
        'No dead/unlabeled interactive elements',
        'Icon-only buttons have aria-label attributes',
        'Touch targets minimum 44×44px',
        'Loading states prevent double-submission',
        'Form validation on blur and submit'
      ]
    },
    {
      title: 'Navigation & Routing',
      items: [
        'Back buttons navigate to correct parent pages',
        'Modal close returns focus to trigger element',
        'Breadcrumbs show current location',
        'Active navigation states clearly indicated',
        'Search maintains filter/sort state on navigation',
        'URL reflects current app state'
      ]
    },
    {
      title: 'Search Experience',
      items: [
        'Query typing shows immediate feedback',
        'Loading spinner during search execution',
        'Results populate with stagger animation',
        'Filter chips show applied/removable state',
        'Sorting has active indicator + toggle direction',
        'Empty states provide helpful guidance'
      ]
    },
    {
      title: 'File Actions',
      items: [
        'Preview tabs have loading states',
        'Open in App shows available/unavailable states',
        'Share/Star actions show success/error feedback',
        'Bulk actions confirm before execution',
        'Download progress indicated',
        'All actions provide undo where appropriate'
      ]
    },
    {
      title: 'Collections & Settings',
      items: [
        'Collection creation modal has name validation',
        'Settings changes show immediate Saved ✓ feedback',
        'Each setting has individual reset capability',
        'Unsaved changes warning on navigation',
        'Success toasts for setting saves',
        'Clear error messages for validation failures'
      ]
    },
    {
      title: 'Responsive Behavior',
      items: [
        'Mobile: Single column, overlay filters',
        'Tablet: Two column with slide-over filters',
        'Desktop: Three-panel resizable layout',
        'Touch targets appropriate for each breakpoint',
        'Navigation adapts to screen size',
        'Modals size appropriately across devices'
      ]
    },
    {
      title: 'Motion & Animation',
      items: [
        'All transitions use design token timing',
        'Hover effects complete within 100ms',
        'Modal animations use atlas-animate-scale-in',
        'Panel slides use atlas-animate-slide-in',
        'Respect prefers-reduced-motion setting',
        'Loading skeletons while content loads'
      ]
    },
    {
      title: 'Accessibility',
      items: [
        'Focus indicators visible and consistent',
        'Screen reader labels for all interactive elements',
        'Keyboard navigation works throughout app',
        'Color contrast meets WCAG AA standards',
        'Form validation announced to screen readers',
        'Live regions update during async operations'
      ]
    }
  ]

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (sectionTitle: string, itemIndex: number) => {
    const key = `${sectionTitle}-${itemIndex}`
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const getSectionProgress = (sectionTitle: string, itemCount: number) => {
    const checkedCount = Array.from({ length: itemCount }, (_, i) => 
      checkedItems[`${sectionTitle}-${i}`] ? 1 : 0
    ).reduce((sum, val) => sum + val, 0)
    
    return Math.round((checkedCount / itemCount) * 100)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Implementation Checklist</h2>
        <p className="text-muted-foreground mb-6">
          Verify all requirements before marking components as complete.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const progress = getSectionProgress(section.title, section.items.length)
          
          return (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {progress === 100 ? (
                      <Check className="icon-md text-success" />
                    ) : (
                      <AlertTriangle className="icon-md text-warning" />
                    )}
                    {section.title}
                  </CardTitle>
                  <Badge 
                    variant={progress === 100 ? "default" : "outline"}
                    className={progress === 100 ? "bg-success text-success-foreground" : ""}
                  >
                    {progress}% Complete
                  </Badge>
                </div>
                <Progress value={progress} className="w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item, index) => {
                    const key = `${section.title}-${index}`
                    const isChecked = checkedItems[key] || false
                    
                    return (
                      <div 
                        key={index} 
                        className={`
                          flex items-start gap-3 p-3 rounded-lg cursor-pointer atlas-hover
                          ${isChecked ? 'bg-success/10 border border-success/20' : 'bg-muted/50'}
                        `}
                        onClick={() => toggleItem(section.title, index)}
                      >
                        <div className={`
                          w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
                          ${isChecked 
                            ? 'bg-success border-success text-success-foreground' 
                            : 'border-muted-foreground'
                          }
                        `}>
                          {isChecked && <Check className="icon-xs" />}
                        </div>
                        <p className={`text-sm flex-1 ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Alert>
        <Check className="icon-sm" />
        <AlertDescription>
          <strong>Acceptance Criteria:</strong> All sections must be 100% complete before engineering handoff. 
          Each item represents a critical requirement for production readiness.
        </AlertDescription>
      </Alert>
    </div>
  )
}