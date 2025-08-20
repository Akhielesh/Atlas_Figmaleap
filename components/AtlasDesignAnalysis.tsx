'use client'

import React, { useState } from 'react'
import { 
  Palette, Layers, Zap, MousePointer, Eye, Code, 
  Settings, Target, Compass, Search, Filter, Grid3X3,
  Animation, Timer, Accessibility, Smartphone, Monitor
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'

export function AtlasDesignAnalysis() {
  const [activeSection, setActiveSection] = useState('philosophy')
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Atlas Design System: Complete Analysis</h1>
          <p className="text-muted-foreground">
            Comprehensive breakdown of design choices, styling methodology, animations, and architectural decisions
          </p>
        </header>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 gap-1 p-1">
            <TabsTrigger value="philosophy" className="text-xs">Philosophy</TabsTrigger>
            <TabsTrigger value="architecture" className="text-xs">Architecture</TabsTrigger>
            <TabsTrigger value="tokens" className="text-xs">Tokens</TabsTrigger>
            <TabsTrigger value="motion" className="text-xs">Motion</TabsTrigger>
            <TabsTrigger value="interactions" className="text-xs">Interactions</TabsTrigger>
            <TabsTrigger value="accessibility" className="text-xs">A11y</TabsTrigger>
            <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            <TabsTrigger value="implementation" className="text-xs">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="philosophy">
            <DesignPhilosophy />
          </TabsContent>

          <TabsContent value="architecture">
            <SystemArchitecture />
          </TabsContent>

          <TabsContent value="tokens">
            <TokenSystemAnalysis />
          </TabsContent>

          <TabsContent value="motion">
            <MotionSystemAnalysis />
          </TabsContent>

          <TabsContent value="interactions">
            <InteractionAnalysis />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityAnalysis />
          </TabsContent>

          <TabsContent value="patterns">
            <DesignPatterns />
          </TabsContent>

          <TabsContent value="implementation">
            <TechnicalImplementation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Design Philosophy and Approach
function DesignPhilosophy() {
  const philosophyPrinciples = {
    "core_principles": {
      "calm_technology": {
        "description": "Technology that works in the background, appearing only when needed",
        "implementation": [
          "Subtle animations (100-220ms range) that enhance without distracting",
          "Muted color palette (#ececf0, #717182) for secondary elements",
          "Progressive disclosure - complex features hidden until needed",
          "Zero-clutter interface with intentional whitespace"
        ],
        "evidence_in_code": "Global notification system uses toast patterns with auto-dismiss, search shows suggestions only on focus"
      },
      "trustworthy_enterprise": {
        "description": "Visual language that instills confidence for business-critical tasks",
        "implementation": [
          "High contrast ratios (4.5:1 minimum) for text legibility",
          "Conservative, professional color scheme (#030213 primary)",
          "Consistent spacing using 8px base grid system",
          "Clear visual hierarchy with semantic typography scale"
        ],
        "evidence_in_code": "Design tokens enforce consistency, WCAG AA compliance built into color system"
      },
      "instant_feel": {
        "description": "Interface responds immediately to user input",
        "implementation": [
          "Hover states activate within 100ms",
          "Loading states appear immediately for any action >200ms",
          "Optimistic updates show expected results before API confirmation",
          "Skeleton screens maintain layout during content loading"
        ],
        "evidence_in_code": "atlas-hover classes, immediate feedback in all handlers, loading states in every async operation"
      }
    }
  }

  const designLanguage = {
    "visual_identity": {
      "color_psychology": {
        "primary_030213": "Deep navy conveys trust, stability, professionalism",
        "muted_ececf0": "Light gray reduces cognitive load, allows focus on content",
        "success_16a34a": "Green universally understood for positive actions",
        "destructive_d4183d": "Red for dangerous actions, high visibility for warnings"
      },
      "typography_choices": {
        "inter_font_family": "Optimized for digital interfaces, high legibility at small sizes",
        "14px_base_size": "Balances readability with information density",
        "scale_rational": "Perfect fourth scale (1.25) for harmonic progression"
      },
      "spacing_methodology": {
        "8px_base_unit": "Aligns with digital screen pixels, creates visual rhythm",
        "touch_target_44px": "Apple/Google accessibility guidelines compliance",
        "progressive_scale": "1, 2, 3, 4, 6, 8 progression allows flexible layouts"
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Design Philosophy & Approach</h2>
        <p className="text-muted-foreground mb-6">
          Atlas is built on three core principles that shape every design decision and interaction pattern.
        </p>
      </div>

      {/* Core Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="icon-md text-primary" />
            Core Design Principles
          </CardTitle>
          <CardDescription>
            Foundational concepts that guide all design decisions in Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(philosophyPrinciples.core_principles).map(([key, principle]) => (
              <div key={key} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 capitalize">{key.replace('_', ' ')}</h4>
                <p className="text-sm text-muted-foreground mb-3">{principle.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Implementation Strategy:</h5>
                    <ul className="space-y-1">
                      {principle.implementation.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded">
                    <h5 className="font-medium text-sm mb-1">Code Evidence:</h5>
                    <p className="text-xs text-muted-foreground">{principle.evidence_in_code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Identity Deep Dive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="icon-md text-primary" />
            Visual Identity Psychology
          </CardTitle>
          <CardDescription>
            The reasoning behind specific color, typography, and spacing choices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Color Psychology */}
            <div>
              <h4 className="font-semibold mb-3">Color Psychology & Usage</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(designLanguage.visual_identity.color_psychology).map(([color, reasoning]) => (
                  <div key={color} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ 
                          backgroundColor: color.includes('030213') ? '#030213' : 
                                         color.includes('ececf0') ? '#ececf0' :
                                         color.includes('16a34a') ? '#16a34a' : '#d4183d'
                        }}
                      />
                      <code className="text-sm font-mono">{color.replace('_', ' ')}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">{reasoning}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Typography Rationale */}
            <div>
              <h4 className="font-semibold mb-3">Typography System Rationale</h4>
              <div className="space-y-3">
                {Object.entries(designLanguage.visual_identity.typography_choices).map(([choice, reason]) => (
                  <div key={choice} className="flex items-start gap-3 p-3 bg-muted/30 rounded">
                    <Badge variant="outline" className="text-xs mt-0.5">
                      {choice.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <p className="text-sm">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Spacing Methodology */}
            <div>
              <h4 className="font-semibold mb-3">Spacing System Logic</h4>
              <div className="space-y-3">
                {Object.entries(designLanguage.visual_identity.spacing_methodology).map(([method, explanation]) => (
                  <div key={method} className="flex items-start gap-3 p-3 bg-muted/30 rounded">
                    <Badge variant="outline" className="text-xs mt-0.5">
                      {method.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <p className="text-sm">{explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Decision Framework */}
      <Card>
        <CardHeader>
          <CardTitle>Decision-Making Framework</CardTitle>
          <CardDescription>How design choices are evaluated and implemented</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-success">✓ Prioritize</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• User task completion speed</li>
                <li>• Accessibility compliance</li>
                <li>• Information clarity</li>
                <li>• Error prevention/recovery</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-warning">⚖ Balance</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Visual appeal vs. functionality</li>
                <li>• Animation vs. performance</li>
                <li>• Flexibility vs. consistency</li>
                <li>• Innovation vs. familiarity</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2 text-destructive">✗ Avoid</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Unnecessary complexity</li>
                <li>• Trendy over timeless</li>
                <li>• Personal preference bias</li>
                <li>• Feature bloat</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// System Architecture Analysis
function SystemArchitecture() {
  const architectureData = {
    "component_hierarchy": {
      "app_level": {
        "App.tsx": "Root orchestrator with providers and global state",
        "FocusProvider": "Keyboard navigation and focus management",
        "NavigationProvider": "Route state and page transitions",
        "responsibilities": [
          "Global state coordination",
          "Provider composition",
          "Route-level logic",
          "Theme and accessibility setup"
        ]
      },
      "layout_level": {
        "PageRouter": "Page-level navigation and authentication checks",
        "SearchPageLayout": "3-panel search interface layout",
        "responsibilities": [
          "Page-specific layouts",
          "Authentication routing",
          "Responsive breakpoint handling",
          "Global notification positioning"
        ]
      },
      "feature_level": {
        "EnhancedSearchBar": "Search input with suggestions and voice",
        "EnhancedFiltersPanel": "Advanced filtering with state management",
        "EnhancedPreviewPanel": "File preview with tabbed interface",
        "responsibilities": [
          "Feature-specific logic",
          "Local state management",
          "User interaction handling",
          "API integration points"
        ]
      },
      "component_level": {
        "ui/": "Base design system components",
        "atoms": "FilterChip, HeaderButton, ResultCard",
        "responsibilities": [
          "Reusable interface elements",
          "Design token implementation",
          "Accessibility compliance",
          "State variant handling"
        ]
      }
    },
    "state_management_strategy": {
      "global_state": {
        "authentication": "useAuthHandlers - user session and permissions",
        "navigation": "NavigationManager - current page and history",
        "notifications": "GlobalNotificationBar - system messages",
        "theme": "App component - dark/light mode preference"
      },
      "feature_state": {
        "search": "useSearchHandlers - query, results, pagination",
        "filters": "useFilters - applied filters and sections",
        "selection": "useSelectionHandlers - bulk action state",
        "preview": "usePreviewHandlers - selected item and content"
      },
      "local_state": {
        "form_validation": "Individual component useState hooks",
        "ui_toggles": "Modal open/close, dropdown visibility",
        "animation_state": "Loading, hover, focus indicators",
        "temporary_data": "Draft inputs, unsaved changes"
      }
    }
  }

  const componentPatterns = {
    "composition_patterns": {
      "provider_pattern": {
        "usage": "Context providers for global state",
        "example": "FocusProvider wraps app for keyboard navigation",
        "benefits": ["Dependency injection", "State sharing", "Testing isolation"]
      },
      "compound_components": {
        "usage": "Related components working together",
        "example": "EnhancedFiltersPanel + FilterChip + EnhancedSortingControls",
        "benefits": ["Encapsulated logic", "Flexible composition", "Clear relationships"]
      },
      "render_props": {
        "usage": "Flexible component behavior injection",
        "example": "CommandPalette accepts custom navigation handler",
        "benefits": ["Inversion of control", "Reusability", "Testability"]
      }
    },
    "data_flow": {
      "unidirectional": "State flows down through props",
      "event_bubbling": "User actions bubble up through callbacks",
      "side_effects": "useEffect for API calls and external state",
      "optimization": "useMemo/useCallback for expensive operations"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">System Architecture Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Deep dive into the component hierarchy, state management strategy, and architectural patterns.
        </p>
      </div>

      {/* Component Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="icon-md text-primary" />
            Component Hierarchy & Responsibilities
          </CardTitle>
          <CardDescription>
            Four-tier architecture with clear separation of concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(architectureData.component_hierarchy).map(([level, details]) => (
              <div key={level} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize text-primary">
                  {level.replace('_', ' ')} Components
                </h4>
                
                <div className="space-y-3">
                  {/* Component Examples */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(details).filter(([key]) => key !== 'responsibilities').map(([component, description]) => (
                      <div key={component} className="p-3 bg-muted/30 rounded">
                        <code className="text-sm font-mono text-primary">{component}</code>
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Responsibilities */}
                  <div>
                    <h5 className="font-medium text-sm mb-2">Key Responsibilities:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {details.responsibilities?.map((responsibility, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {responsibility}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* State Management Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="icon-md text-primary" />
            State Management Strategy
          </CardTitle>
          <CardDescription>
            Three-tier state management with clear ownership boundaries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(architectureData.state_management_strategy).map(([tier, states]) => (
              <div key={tier} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize text-primary">
                  {tier.replace('_', ' ')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(states).map(([stateName, description]) => (
                    <div key={stateName} className="p-3 bg-muted/30 rounded">
                      <h5 className="font-medium text-sm">{stateName.replace('_', ' ')}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-6">
            <Target className="icon-sm" />
            <AlertDescription>
              <strong>Architecture Principle:</strong> State lives at the lowest common ancestor that needs it. 
              Global state is minimized to reduce complexity and improve performance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Component Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Component Design Patterns</CardTitle>
          <CardDescription>Reusable patterns that ensure consistency and maintainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Composition Patterns */}
            <div>
              <h4 className="font-semibold mb-3">Composition Patterns</h4>
              <div className="space-y-3">
                {Object.entries(componentPatterns.composition_patterns).map(([pattern, details]) => (
                  <div key={pattern} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-sm capitalize">{pattern.replace('_', ' ')}</h5>
                      <Badge variant="outline" className="text-xs">Pattern</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{details.usage}</p>
                    <div className="p-2 bg-muted/50 rounded text-xs">
                      <strong>Example:</strong> {details.example}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {details.benefits.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Data Flow */}
            <div>
              <h4 className="font-semibold mb-3">Data Flow Architecture</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(componentPatterns.data_flow).map(([flow, description]) => (
                  <div key={flow} className="p-3 bg-muted/30 rounded">
                    <h5 className="font-medium text-sm capitalize">{flow.replace('_', ' ')}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Token System Analysis
function TokenSystemAnalysis() {
  const tokenAnalysis = {
    "implementation_strategy": {
      "css_custom_properties": {
        "approach": "CSS variables for runtime theme switching",
        "benefits": ["Dynamic theming", "Performance", "CSS-in-JS compatibility"],
        "structure": ":root and .dark selectors with semantic naming"
      },
      "tailwind_integration": {
        "approach": "@theme inline block maps tokens to Tailwind utilities",
        "benefits": ["IntelliSense support", "Build-time optimization", "Utility class generation"],
        "structure": "--color-* variables mapped to Tailwind color system"
      },
      "semantic_naming": {
        "approach": "Meaning-based names (--primary) over appearance (--blue)",
        "benefits": ["Theme flexibility", "Maintainability", "Design intent clarity"],
        "structure": "purpose -> variant -> state hierarchy"
      }
    },
    "color_system_deep_dive": {
      "primary_030213": {
        "hex": "#030213",
        "oklch": "oklch(0.145 0 0)",
        "psychology": "Deep navy for trust and professionalism",
        "usage": ["Primary buttons", "Active states", "Brand elements"],
        "accessibility": "7.8:1 contrast ratio on white background",
        "dark_mode": "Inverts to white (oklch(0.985 0 0))"
      },
      "semantic_colors": {
        "success_16a34a": {
          "meaning": "Positive actions, confirmations, safe operations",
          "variants": ["success", "success-foreground"],
          "usage_contexts": ["Save confirmations", "Connection status", "Validation success"]
        },
        "destructive_d4183d": {
          "meaning": "Dangerous actions, errors, critical alerts",
          "variants": ["destructive", "destructive-foreground"],
          "usage_contexts": ["Delete buttons", "Error messages", "Failed operations"]
        },
        "muted_ececf0": {
          "meaning": "Reduced emphasis, secondary information",
          "variants": ["muted", "muted-foreground"],
          "usage_contexts": ["Placeholder text", "Disabled states", "Background surfaces"]
        }
      }
    },
    "spacing_mathematics": {
      "base_unit": "8px",
      "scale_rationale": "Powers of 2 for mathematical harmony",
      "scale": [4, 8, 12, 16, 24, 32, 40, 48, 64, 80],
      "touch_targets": "44px minimum (per Apple/Google guidelines)",
      "responsive_scaling": "Consistent across breakpoints for predictable layouts"
    },
    "typography_scale": {
      "base_size": "14px",
      "rationale": "Optimized for data-heavy interfaces",
      "scale_type": "Perfect fourth (1.25 ratio)",
      "sizes": {
        "xs": "12px - captions, metadata",
        "sm": "14px - UI text, labels (BASE)",
        "base": "16px - body text, descriptions", 
        "lg": "20px - subheadings",
        "xl": "24px - section headings",
        "2xl": "32px - page titles"
      },
      "line_heights": {
        "tight": "1.25 - headings",
        "normal": "1.5 - UI text",
        "relaxed": "1.625 - body content"
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Design Token System Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Technical deep dive into the token architecture, implementation strategy, and mathematical foundations.
        </p>
      </div>

      {/* Implementation Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="icon-md text-primary" />
            Implementation Strategy
          </CardTitle>
          <CardDescription>
            Three-layer approach: CSS Custom Properties → Tailwind Integration → Semantic Naming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(tokenAnalysis.implementation_strategy).map(([strategy, details]) => (
              <div key={strategy} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 capitalize text-primary">
                  {strategy.replace('_', ' ')}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">{details.approach}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Benefits:</h5>
                    <ul className="space-y-1">
                      {details.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <div className="w-1 h-1 bg-success rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded">
                    <h5 className="font-medium text-sm mb-1">Structure:</h5>
                    <p className="text-xs text-muted-foreground">{details.structure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-6">
            <Code className="icon-sm" />
            <AlertDescription>
              <strong>Technical Note:</strong> The token system uses CSS custom properties for runtime flexibility, 
              mapped to Tailwind utilities for developer experience, with semantic naming for design clarity.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Color System Deep Dive */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="icon-md text-primary" />
            Color System Psychology & Technical Details
          </CardTitle>
          <CardDescription>
            Scientific approach to color selection with accessibility and psychology considerations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primary Color Analysis */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-primary">Primary Color: Deep Navy (#030213)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Color Values</h5>
                  <div className="space-y-1 text-xs">
                    <div>HEX: <code className="bg-muted px-1 rounded">#030213</code></div>
                    <div>OKLCH: <code className="bg-muted px-1 rounded">oklch(0.145 0 0)</code></div>
                    <div>Contrast: <Badge variant="outline" className="text-xs">7.8:1</Badge></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Psychology</h5>
                  <p className="text-xs text-muted-foreground">
                    Deep navy conveys trust, stability, and professionalism. 
                    Used in enterprise software to instill confidence.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Usage Contexts</h5>
                  <div className="flex flex-wrap gap-1">
                    {tokenAnalysis.color_system_deep_dive.primary_030213.usage.map((usage, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h4 className="font-semibold mb-3">Semantic Color System</h4>
              <div className="space-y-3">
                {Object.entries(tokenAnalysis.color_system_deep_dive.semantic_colors).map(([colorKey, details]) => (
                  <div key={colorKey} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: colorKey.includes('success') ? '#16a34a' : 
                                               colorKey.includes('destructive') ? '#d4183d' : '#ececf0' }}
                      />
                      <h5 className="font-medium text-sm capitalize">{colorKey.replace('_', ' ')}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{details.meaning}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <strong className="text-xs">Variants:</strong>
                        <div className="flex gap-1 mt-1">
                          {details.variants.map((variant, index) => (
                            <code key={index} className="text-xs bg-muted px-1 rounded">{variant}</code>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong className="text-xs">Usage:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {details.usage_contexts.map((context, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {context}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing Mathematics */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing System Mathematics</CardTitle>
          <CardDescription>Mathematical foundation for consistent spatial relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Scale Foundation</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground">Base Unit</Badge>
                    <span className="font-mono text-sm">8px</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Rationale</Badge>
                    <span className="text-sm">Powers of 2 for mathematical harmony</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Touch Target</Badge>
                    <span className="text-sm">44px minimum (5.5 × base unit)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Complete Scale</h4>
                <div className="grid grid-cols-5 gap-2">
                  {tokenAnalysis.spacing_mathematics.scale.map((size, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="bg-primary rounded mx-auto mb-1"
                        style={{ width: `${size}px`, height: '12px' }}
                      />
                      <code className="text-xs">{size}px</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale Analysis</CardTitle>
          <CardDescription>Perfect fourth ratio with optimized base size for data interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Scale Properties</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Base Size:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">14px</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Scale Type:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">Perfect Fourth (1.25)</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rationale:</span>
                    <span className="text-sm text-muted-foreground">Data-heavy interfaces</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Size Demonstration</h4>
                <div className="space-y-2">
                  {Object.entries(tokenAnalysis.typography_scale.sizes).map(([size, description]) => (
                    <div key={size} className="flex items-center gap-3">
                      <span 
                        className="font-medium"
                        style={{ fontSize: description.split(' - ')[0] }}
                      >
                        Aa
                      </span>
                      <div>
                        <code className="text-xs">{size}</code>
                        <span className="text-xs text-muted-foreground ml-2">{description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Motion System Analysis
function MotionSystemAnalysis() {
  const motionData = {
    "timing_philosophy": {
      "perceptual_psychology": {
        "100ms_threshold": "Human perception of immediate response",
        "200ms_threshold": "Acceptable delay for user interactions",
        "1000ms_threshold": "Maximum attention span for loading states",
        "source": "Jacob Nielsen's response time guidelines"
      },
      "atlas_timing_strategy": {
        "fast_100ms": "Hover and focus feedback - feels immediate",
        "medium_150ms": "UI state changes - noticeable but smooth",
        "slow_200ms": "Content transitions - deliberate but not sluggish",
        "panel_220ms": "Panel slides - needs time for spatial understanding",
        "modal_180ms": "Modal overlays - balanced entrance without delay"
      }
    },
    "easing_functions": {
      "primary_ease": {
        "value": "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "characteristics": "Starts slow, accelerates, then decelerates",
        "usage": "Primary animations for natural feel",
        "inspiration": "Material Design easing"
      },
      "ease_out": {
        "value": "ease-out",
        "characteristics": "Fast start, slow finish",
        "usage": "Exit animations and dismissals",
        "rationale": "Elements leave quickly but settle gently"
      },
      "ease_in": {
        "value": "ease-in", 
        "characteristics": "Slow start, fast finish",
        "usage": "Enter animations and reveals",
        "rationale": "Elements appear gradually then complete quickly"
      }
    },
    "animation_categories": {
      "micro_interactions": {
        "hover_states": {
          "timing": "100ms",
          "properties": ["transform: translateY(-1px)", "box-shadow", "color"],
          "purpose": "Immediate feedback for interactive elements",
          "implementation": ".atlas-hover class with CSS transitions"
        },
        "focus_states": {
          "timing": "150ms",
          "properties": ["outline", "ring", "background-color"],
          "purpose": "Accessibility and keyboard navigation",
          "implementation": ".atlas-focus-ring with :focus-visible"
        },
        "button_presses": {
          "timing": "100ms",
          "properties": ["transform: translateY(0)", "box-shadow"],
          "purpose": "Tactile feedback for user actions",
          "implementation": ".atlas-button-states with :active"
        }
      },
      "layout_transitions": {
        "panel_slides": {
          "timing": "220ms",
          "properties": ["transform: translateX()", "opacity"],
          "purpose": "Spatial context for preview panel opening",
          "implementation": ".atlas-animate-slide-in-right"
        },
        "modal_overlays": {
          "timing": "180ms", 
          "properties": ["opacity", "transform: scale()"],
          "purpose": "Focused attention on modal content",
          "implementation": ".atlas-animate-scale-in"
        },
        "page_transitions": {
          "timing": "200ms",
          "properties": ["opacity", "transform: translateY()"],
          "purpose": "Smooth navigation between views",
          "implementation": ".atlas-animate-fade-in"
        }
      },
      "loading_animations": {
        "skeleton_screens": {
          "timing": "1.5s infinite",
          "properties": ["background-position", "opacity"],
          "purpose": "Maintain layout during content loading",
          "implementation": "Pulse animation with CSS keyframes"
        },
        "spinners": {
          "timing": "1s infinite linear",
          "properties": ["transform: rotate()"],
          "purpose": "Indicate active processing",
          "implementation": "Lucide Loader2 with animate-spin"
        },
        "progress_bars": {
          "timing": "300ms ease-out",
          "properties": ["width", "background-color"],
          "purpose": "Show completion progress",
          "implementation": "Width transitions on progress element"
        }
      }
    },
    "accessibility_considerations": {
      "prefers_reduced_motion": {
        "implementation": "@media (prefers-reduced-motion: reduce)",
        "behavior": "Disables all non-essential animations",
        "preserved": ["Focus indicators", "State changes", "Critical feedback"],
        "disabled": ["Hover effects", "Entrance animations", "Decorative motion"]
      },
      "vestibular_disorders": {
        "avoided_patterns": ["Parallax scrolling", "Auto-playing video", "Rotation animations"],
        "safe_patterns": ["Fade transitions", "Scale animations", "Slide transitions"],
        "rationale": "Reduces motion sensitivity triggers"
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Motion System Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Scientific approach to animation timing, easing, and accessibility based on perceptual psychology.
        </p>
      </div>

      {/* Timing Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="icon-md text-primary" />
            Timing Philosophy & Perceptual Psychology
          </CardTitle>
          <CardDescription>
            Based on human perception research and interaction design principles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Perceptual Psychology */}
            <div>
              <h4 className="font-semibold mb-3">Perceptual Psychology Foundation</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(motionData.timing_philosophy.perceptual_psychology).filter(([key]) => key !== 'source').map(([threshold, description]) => (
                  <div key={threshold} className="p-3 border rounded-lg text-center">
                    <Badge className="bg-primary text-primary-foreground mb-2">
                      {threshold.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Source: {motionData.timing_philosophy.perceptual_psychology.source}
              </p>
            </div>

            <Separator />

            {/* Atlas Implementation */}
            <div>
              <h4 className="font-semibold mb-3">Atlas Timing Strategy</h4>
              <div className="space-y-3">
                {Object.entries(motionData.timing_philosophy.atlas_timing_strategy).map(([timing, rationale]) => (
                  <div key={timing} className="flex items-center gap-4 p-3 bg-muted/30 rounded">
                    <Badge variant="outline" className="font-mono text-xs min-w-[80px]">
                      {timing.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm">{rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Easing Functions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Animation className="icon-md text-primary" />
            Easing Functions & Curves
          </CardTitle>
          <CardDescription>
            Mathematical curves that create natural-feeling animations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(motionData.easing_functions).map(([easingType, details]) => (
              <div key={easingType} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold capitalize">{easingType.replace('_', ' ')}</h4>
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {details.value}
                  </code>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-1">Characteristics</h5>
                    <p className="text-sm text-muted-foreground">{details.characteristics}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">Usage</h5>
                    <p className="text-sm text-muted-foreground">{details.usage}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-1">Rationale</h5>
                    <p className="text-sm text-muted-foreground">{details.rationale || details.inspiration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animation Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Animation Categories & Implementation</CardTitle>
          <CardDescription>Detailed breakdown of all animation types with technical specifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(motionData.animation_categories).map(([category, animations]) => (
              <div key={category} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4 capitalize text-primary">
                  {category.replace('_', ' ')}
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(animations).map(([animationType, details]) => (
                    <div key={animationType} className="p-3 bg-muted/30 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm capitalize">{animationType.replace('_', ' ')}</h5>
                        <Badge variant="outline" className="text-xs font-mono">
                          {details.timing}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-muted-foreground mb-1">Properties</h6>
                          <div className="flex flex-wrap gap-1">
                            {details.properties.map((property, index) => (
                              <code key={index} className="text-xs bg-background border px-1 rounded">
                                {property}
                              </code>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h6 className="text-xs font-medium text-muted-foreground mb-1">Implementation</h6>
                          <code className="text-xs bg-background border px-2 py-1 rounded block">
                            {details.implementation}
                          </code>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-2">{details.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Considerations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="icon-md text-primary" />
            Animation Accessibility
          </CardTitle>
          <CardDescription>
            Inclusive motion design that respects user preferences and vestibular sensitivities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(motionData.accessibility_considerations).map(([consideration, details]) => (
              <div key={consideration} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize">
                  {consideration.replace('_', ' ')}
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(details).map(([aspect, info]) => (
                    <div key={aspect} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="font-medium text-sm capitalize">
                        {aspect.replace('_', ' ')}:
                      </div>
                      <div className="md:col-span-2">
                        {Array.isArray(info) ? (
                          <div className="flex flex-wrap gap-1">
                            {info.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-6">
            <Accessibility className="icon-sm" />
            <AlertDescription>
              <strong>Accessibility Priority:</strong> All animations respect user preferences and provide 
              alternatives for motion-sensitive users. Essential feedback is never communicated through motion alone.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

// Interaction Analysis
function InteractionAnalysis() {
  const interactionData = {
    "interaction_principles": {
      "immediate_feedback": {
        "principle": "Every user action receives immediate visual acknowledgment",
        "implementation": [
          "Hover states activate within 100ms",
          "Click events show active state instantly", 
          "Form inputs provide real-time validation",
          "Loading states appear for any delay >200ms"
        ],
        "examples": [
          "Button lift on hover (.atlas-button-states)",
          "Input focus ring (.atlas-focus-ring)",
          "Card elevation on hover (.atlas-card-hover)",
          "Spinner appears during API calls"
        ]
      },
      "progressive_disclosure": {
        "principle": "Complex functionality revealed gradually based on user intent",
        "implementation": [
          "Search suggestions appear only on focus",
          "Advanced filters hidden until activated",
          "Bulk actions show only when items selected",
          "Preview panel opens only when needed"
        ],
        "examples": [
          "Command palette opens with ⌘K",
          "Filter sections expand on click",
          "File actions appear in preview panel",
          "Settings sections organized in tabs"
        ]
      },
      "forgiveness": {
        "principle": "Easy error recovery and undo capabilities",
        "implementation": [
          "Confirmation dialogs for destructive actions",
          "Undo functionality for bulk operations",
          "Auto-save drafts prevent data loss",
          "Clear error messages with retry options"
        ],
        "examples": [
          "Delete confirmation modals",
          "Search query preserved on navigation",
          "Form validation with correction guidance",
          "Network error retry buttons"
        ]
      }
    },
    "gesture_vocabulary": {
      "mouse_interactions": {
        "click": "Primary selection and activation",
        "double_click": "Open in app / external navigation",
        "right_click": "Context menu (future implementation)",
        "hover": "Preview information and interactive feedback",
        "drag": "Bulk selection and panel resizing"
      },
      "keyboard_interactions": {
        "tab": "Navigate between interactive elements",
        "enter": "Activate focused element",
        "escape": "Close modals and cancel operations",
        "arrows": "Navigate within lists and menus",
        "cmd_k": "Open command palette",
        "cmd_f": "Focus search input"
      },
      "touch_interactions": {
        "tap": "Primary selection (44px minimum target)",
        "long_press": "Context actions and bulk selection",
        "swipe": "Navigation and dismissal gestures",
        "pinch": "Zoom (in preview contexts)",
        "scroll": "Content navigation with momentum"
      }
    },
    "state_transitions": {
      "loading_patterns": {
        "skeleton_screens": {
          "when": "Initial page load with unknown content length",
          "duration": "Until content arrives",
          "behavior": "Maintain layout, show content structure",
          "implementation": "Pulse animation on placeholder elements"
        },
        "spinners": {
          "when": "Button actions and quick operations",
          "duration": "Action completion (typically 1-3s)",
          "behavior": "Replace button content, disable interaction",
          "implementation": "Lucide Loader2 with animate-spin class"
        },
        "progress_bars": {
          "when": "File uploads or multi-step processes",
          "duration": "Process completion",
          "behavior": "Show completion percentage and ETA",
          "implementation": "Width animation with status text"
        }
      },
      "error_patterns": {
        "inline_validation": {
          "trigger": "Form field blur or real-time validation",
          "appearance": "Red border + error message below field",
          "behavior": "Clears when user corrects input",
          "timing": "Immediate on error, smooth clear transition"
        },
        "toast_notifications": {
          "trigger": "API errors or system failures",
          "appearance": "Top-right slide-in with error styling",
          "behavior": "Auto-dismiss after 8s or user click",
          "timing": "200ms slide-in, 150ms fade-out"
        },
        "empty_states": {
          "trigger": "No results or uninitialized features",
          "appearance": "Centered content with helpful messaging",
          "behavior": "Provides next action or explanation",
          "timing": "Fade-in after loading completes"
        }
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Interaction Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Deep dive into interaction principles, gesture vocabulary, and state transition patterns.
        </p>
      </div>

      {/* Interaction Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="icon-md text-primary" />
            Core Interaction Principles
          </CardTitle>
          <CardDescription>
            Fundamental principles that guide all user interactions in Atlas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(interactionData.interaction_principles).map(([principle, details]) => (
              <div key={principle} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2 capitalize text-primary">
                  {principle.replace('_', ' ')}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">{details.principle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2">Implementation Strategy</h5>
                    <ul className="space-y-1">
                      {details.implementation.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-2">Code Examples</h5>
                    <div className="space-y-1">
                      {details.examples.map((example, index) => (
                        <div key={index} className="p-2 bg-muted/50 rounded">
                          <code className="text-xs">{example}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gesture Vocabulary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="icon-md text-primary" />
            Gesture Vocabulary
          </CardTitle>
          <CardDescription>
            Comprehensive input method support across mouse, keyboard, and touch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(interactionData.gesture_vocabulary).map(([inputType, gestures]) => (
              <div key={inputType} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize text-primary flex items-center gap-2">
                  {inputType === 'mouse_interactions' && <MousePointer className="icon-sm" />}
                  {inputType === 'keyboard_interactions' && <Keyboard className="icon-sm" />}
                  {inputType === 'touch_interactions' && <Smartphone className="icon-sm" />}
                  {inputType.replace('_', ' ')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(gestures).map(([gesture, description]) => (
                    <div key={gesture} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                      <Badge variant="outline" className="text-xs font-mono min-w-[80px] justify-center">
                        {gesture.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm">{description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* State Transitions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="icon-md text-primary" />
            State Transition Patterns
          </CardTitle>
          <CardDescription>
            Detailed specifications for loading, error, and success state handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(interactionData.state_transitions).map(([category, patterns]) => (
              <div key={category} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4 capitalize text-primary">
                  {category.replace('_', ' ')}
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(patterns).map(([patternName, details]) => (
                    <div key={patternName} className="p-3 bg-muted/30 rounded">
                      <h5 className="font-medium text-sm mb-3 capitalize">
                        {patternName.replace('_', ' ')}
                      </h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div>
                            <strong className="text-xs text-muted-foreground">WHEN:</strong>
                            <p className="text-sm">{details.when || details.trigger}</p>
                          </div>
                          <div>
                            <strong className="text-xs text-muted-foreground">DURATION:</strong>
                            <p className="text-sm">{details.duration || details.timing}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <strong className="text-xs text-muted-foreground">APPEARANCE:</strong>
                            <p className="text-sm">{details.behavior || details.appearance}</p>
                          </div>
                          <div>
                            <strong className="text-xs text-muted-foreground">IMPLEMENTATION:</strong>
                            <code className="text-xs bg-background border px-1 rounded">
                              {details.implementation}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Accessibility Analysis
function AccessibilityAnalysis() {
  const a11yData = {
    "wcag_compliance": {
      "level_aa_requirements": {
        "contrast_ratios": {
          "normal_text": "4.5:1 minimum ratio",
          "large_text": "3:1 minimum ratio (18px+ or 14px+ bold)",
          "ui_components": "3:1 minimum for borders and focus indicators",
          "atlas_implementation": "Primary color (#030213) achieves 7.8:1 on white"
        },
        "keyboard_navigation": {
          "tab_order": "Logical sequence matching visual layout",
          "focus_indicators": "Visible 2px outline with 2px offset",
          "skip_links": "Jump to main content functionality",
          "atlas_implementation": ".atlas-focus-ring class with :focus-visible"
        },
        "screen_reader_support": {
          "semantic_html": "Proper heading hierarchy and landmarks",
          "aria_labels": "Descriptive labels for all interactive elements",
          "live_regions": "Dynamic content updates announced",
          "atlas_implementation": "aria-live regions for search results and notifications"
        }
      }
    },
    "inclusive_design_principles": {
      "motor_accessibility": {
        "touch_targets": {
          "minimum_size": "44×44px per Apple/Google guidelines",
          "spacing": "8px minimum between adjacent targets",
          "hover_areas": "Generous padding for easy targeting",
          "implementation": ".touch-target class enforces minimum sizes"
        },
        "interaction_methods": {
          "mouse_support": "Full functionality with mouse input",
          "keyboard_support": "Complete navigation without mouse",
          "touch_support": "Optimized for mobile touch interfaces",
          "voice_support": "Voice search integration (planned)"
        }
      },
      "cognitive_accessibility": {
        "clear_language": {
          "simple_terminology": "Avoid technical jargon in user-facing text",
          "consistent_labeling": "Same actions use same language throughout",
          "error_messages": "Specific, actionable guidance for correction",
          "help_text": "Context-sensitive assistance available"
        },
        "predictable_behavior": {
          "consistent_patterns": "Similar interactions work the same way",
          "clear_feedback": "Immediate acknowledgment of user actions",
          "progress_indication": "Clear progress through multi-step processes",
          "undo_capabilities": "Forgiveness for accidental actions"
        }
      },
      "sensory_accessibility": {
        "color_independence": {
          "no_color_only": "Information never conveyed by color alone",
          "high_contrast": "Support for high contrast mode",
          "pattern_support": "Shapes and icons accompany color coding",
          "implementation": "Icons + text for all status indicators"
        },
        "motion_sensitivity": {
          "reduced_motion": "@media (prefers-reduced-motion: reduce) support",
          "essential_motion": "Only critical animations preserved",
          "alternative_feedback": "Static indicators for motion-based feedback",
          "implementation": "All atlas-* animation classes respect user preferences"
        }
      }
    },
    "assistive_technology_support": {
      "screen_readers": {
        "tested_with": ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
        "navigation_landmarks": ["main", "nav", "search", "complementary"],
        "heading_structure": "Logical h1-h6 hierarchy without skipping levels",
        "form_labels": "Explicit labels for all form controls"
      },
      "keyboard_users": {
        "shortcuts": "Command palette (⌘K) for power users",
        "focus_management": "Modal focus trapping and return",
        "skip_navigation": "Bypass repetitive navigation elements",
        "arrow_navigation": "Lists and menus support arrow key navigation"
      },
      "voice_control": {
        "voice_labels": "Visible text matches voice commands",
        "clickable_names": "Interactive elements have speakable names",
        "click_targets": "Large enough for voice activation accuracy",
        "future_integration": "Voice search and commands planned"
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Accessibility Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Comprehensive accessibility strategy covering WCAG compliance, inclusive design, and assistive technology support.
        </p>
      </div>

      {/* WCAG Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="icon-md text-primary" />
            WCAG 2.1 AA Compliance
          </CardTitle>
          <CardDescription>
            Technical implementation of Web Content Accessibility Guidelines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(a11yData.wcag_compliance.level_aa_requirements).map(([requirement, details]) => (
              <div key={requirement} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize text-primary">
                  {requirement.replace('_', ' ')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(details).map(([aspect, specification]) => (
                    <div key={aspect} className="p-3 bg-muted/30 rounded">
                      <h5 className="font-medium text-sm mb-1 capitalize">
                        {aspect.replace('_', ' ')}
                      </h5>
                      <p className="text-sm text-muted-foreground">{specification}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inclusive Design Principles */}
      <Card>
        <CardHeader>
          <CardTitle>Inclusive Design Principles</CardTitle>
          <CardDescription>
            Designing for the full spectrum of human diversity and ability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(a11yData.inclusive_design_principles).map(([principle, categories]) => (
              <div key={principle} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4 capitalize text-primary">
                  {principle.replace('_', ' ')}
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(categories).map(([category, details]) => (
                    <div key={category} className="p-3 bg-muted/30 rounded">
                      <h5 className="font-medium text-sm mb-3 capitalize">
                        {category.replace('_', ' ')}
                      </h5>
                      
                      <div className="space-y-2">
                        {Object.entries(details).map(([aspect, description]) => (
                          <div key={aspect} className="flex items-start gap-3">
                            <Badge variant="outline" className="text-xs mt-0.5 min-w-[100px] justify-center">
                              {aspect.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm">{description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assistive Technology Support */}
      <Card>
        <CardHeader>
          <CardTitle>Assistive Technology Support</CardTitle>
          <CardDescription>
            Comprehensive support for screen readers, keyboard users, and voice control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(a11yData.assistive_technology_support).map(([technology, specifications]) => (
              <div key={technology} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-4 capitalize text-primary">
                  {technology.replace('_', ' ')}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([aspect, details]) => (
                    <div key={aspect} className="p-3 bg-muted/30 rounded">
                      <h5 className="font-medium text-sm mb-2 capitalize">
                        {aspect.replace('_', ' ')}
                      </h5>
                      
                      {Array.isArray(details) ? (
                        <div className="flex flex-wrap gap-1">
                          {details.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">{details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-6">
            <Accessibility className="icon-sm" />
            <AlertDescription>
              <strong>Testing Strategy:</strong> Atlas is tested with real users using assistive technologies, 
              not just automated tools. Regular accessibility audits ensure compliance and usability.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

// Design Patterns
function DesignPatterns() {
  const patternData = {
    "navigation_patterns": {
      "three_panel_layout": {
        "description": "Filters (left) + Results (center) + Preview (right)",
        "breakpoints": {
          "mobile": "Single column with overlay filters and full-screen preview",
          "tablet": "Two columns (results + preview) with slide-over filters",
          "desktop": "Full three-panel layout with resizable dividers"
        },
        "benefits": ["Spatial context", "Efficient workflow", "Progressive disclosure"],
        "implementation": "ResizableLayout component with responsive breakpoints"
      },
      "command_palette": {
        "description": "Universal search and navigation interface",
        "activation": "⌘K or Ctrl+K keyboard shortcut",
        "functionality": ["Page navigation", "Search actions", "Settings access"],
        "benefits": ["Power user efficiency", "Discoverability", "Consistent interface"],
        "implementation": "Modal overlay with fuzzy search and keyboard navigation"
      },
      "breadcrumb_navigation": {
        "description": "Contextual location awareness",
        "pattern": "Home > Section > Current Page",
        "interactive": "Each level clickable for quick navigation",
        "benefits": ["Orientation", "Quick backtracking", "Hierarchy understanding"],
        "implementation": "Dynamic breadcrumb generation based on route state"
      }
    },
    "information_architecture": {
      "progressive_disclosure": {
        "principle": "Reveal complexity gradually based on user intent",
        "examples": [
          "Basic search → Advanced filters → Expert queries",
          "File list → File preview → Detailed metadata",
          "Quick actions → Bulk operations → Advanced settings"
        ],
        "implementation": "Collapsible sections, modal workflows, tabbed interfaces"
      },
      "contextual_actions": {
        "principle": "Actions appear when and where they're needed",
        "examples": [
          "File actions in preview panel",
          "Bulk actions when items selected",
          "Edit controls on hover"
        ],
        "implementation": "Conditional rendering based on selection and context state"
      },
      "semantic_grouping": {
        "principle": "Related items grouped by meaning, not just appearance",
        "examples": [
          "Filter sections by data type",
          "Settings grouped by feature area",
          "Actions grouped by consequence level"
        ],
        "implementation": "Logical component hierarchy and CSS grouping"
      }
    },
    "interaction_patterns": {
      "immediate_feedback": {
        "hover_states": "100ms visual response to mouse interaction",
        "loading_states": "Spinner appears within 200ms of action initiation",
        "validation_feedback": "Real-time form validation on blur",
        "implementation": "CSS transitions and React state management"
      },
      "bulk_operations": {
        "selection_mode": "Toggle between individual and bulk interaction modes",
        "visual_feedback": "Selected items highlighted with checkboxes",
        "action_confirmation": "Summary of actions before execution",
        "implementation": "Selection state management with confirmation dialogs"
      },
      "undo_capabilities": {
        "soft_deletes": "Mark as deleted rather than immediate removal",
        "action_history": "Track user actions for potential reversal",
        "confirmation_dialogs": "Clear consequences before destructive actions",
        "implementation": "Optimistic updates with rollback capability"
      }
    },
    "content_patterns": {
      "empty_states": {
        "first_use": "Guide users through initial setup",
        "no_results": "Suggest alternative actions or broader searches",
        "error_recovery": "Clear steps to resolve the problem",
        "implementation": "Conditional components with helpful messaging and CTAs"
      },
      "loading_states": {
        "skeleton_screens": "Maintain layout during content loading",
        "progressive_loading": "Show available content while rest loads",
        "infinite_scroll": "Seamless pagination for large datasets",
        "implementation": "Placeholder components and intersection observers"
      },
      "error_states": {
        "inline_validation": "Field-level errors with correction guidance",
        "global_errors": "System-level issues with retry mechanisms",
        "graceful_degradation": "Partial functionality when services unavailable",
        "implementation": "Error boundaries and fallback components"
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Design Patterns Analysis</h2>
        <p className="text-muted-foreground mb-6">
          Reusable design solutions that ensure consistency and efficiency across the Atlas interface.
        </p>
      </div>

      {Object.entries(patternData).map(([category, patterns]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              {category === 'navigation_patterns' && <Search className="icon-md text-primary" />}
              {category === 'information_architecture' && <Layers className="icon-md text-primary" />}
              {category === 'interaction_patterns' && <MousePointer className="icon-md text-primary" />}
              {category === 'content_patterns' && <Eye className="icon-md text-primary" />}
              {category.replace('_', ' ')}
            </CardTitle>
            <CardDescription>
              Proven solutions for {category.replace('_', ' ').toLowerCase()} challenges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(patterns).map(([patternName, details]) => (
                <div key={patternName} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 capitalize text-primary">
                    {patternName.replace('_', ' ')}
                  </h4>
                  
                  {typeof details.description === 'string' && (
                    <p className="text-sm text-muted-foreground mb-3">{details.description}</p>
                  )}
                  
                  <div className="space-y-4">
                    {Object.entries(details).filter(([key]) => key !== 'description').map(([aspect, content]) => (
                      <div key={aspect}>
                        <h5 className="font-medium text-sm mb-2 capitalize">
                          {aspect.replace('_', ' ')}:
                        </h5>
                        
                        {Array.isArray(content) ? (
                          <div className="space-y-1">
                            {content.map((item, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        ) : typeof content === 'object' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(content).map(([subKey, subContent]) => (
                              <div key={subKey} className="p-2 bg-muted/30 rounded">
                                <strong className="text-xs capitalize">{subKey.replace('_', ' ')}:</strong>
                                <p className="text-xs text-muted-foreground mt-1">{subContent}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">{content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Technical Implementation
function TechnicalImplementation() {
  const implementationData = {
    "css_architecture": {
      "utility_first_approach": {
        "strategy": "Tailwind CSS with custom Atlas utilities",
        "benefits": ["Consistency", "Performance", "Maintainability"],
        "custom_utilities": [
          ".atlas-hover - 100ms transition for interactive feedback",
          ".atlas-focus-ring - Accessibility-compliant focus indicators", 
          ".atlas-button-states - Complete button interaction states",
          ".atlas-card-hover - Card elevation and interaction effects",
          ".touch-target - 44px minimum touch target enforcement"
        ]
      },
      "design_token_integration": {
        "css_custom_properties": "Runtime theming with --color-* variables",
        "tailwind_mapping": "@theme inline block for utility generation",
        "semantic_naming": "Purpose-based tokens (--primary vs --blue)",
        "dark_mode_support": "Automatic switching with prefers-color-scheme"
      },
      "animation_system": {
        "keyframe_definitions": "atlas-slide-in, atlas-fade-in, atlas-scale-in",
        "utility_classes": "atlas-animate-* for common animation patterns",
        "timing_functions": "Custom cubic-bezier curves for natural motion",
        "accessibility_support": "prefers-reduced-motion media query handling"
      }
    },
    "component_architecture": {
      "composition_patterns": {
        "compound_components": "Related components that work together",
        "render_props": "Flexible behavior injection",
        "provider_pattern": "Context-based state sharing",
        "hook_abstraction": "Custom hooks for complex state logic"
      },
      "state_management": {
        "local_state": "useState for component-specific state",
        "shared_state": "Context providers for related components",
        "server_state": "Custom hooks for API data management",
        "global_state": "Minimal global state for app-wide concerns"
      },
      "performance_optimization": {
        "code_splitting": "Lazy loading for non-critical components",
        "memoization": "React.memo and useMemo for expensive operations",
        "virtualization": "Large list optimization (planned)",
        "bundle_optimization": "Tree shaking and dead code elimination"
      }
    },
    "accessibility_implementation": {
      "semantic_html": "Proper element selection and ARIA attributes",
      "keyboard_navigation": "Tab order management and focus indicators",
      "screen_reader_support": "Live regions and descriptive labels",
      "motor_accessibility": "Touch targets and interaction methods"
    },
    "responsive_implementation": {
      "breakpoint_strategy": "Mobile-first responsive design",
      "container_queries": "Component-level responsive behavior (planned)",
      "fluid_typography": "Scalable text across screen sizes",
      "flexible_layouts": "CSS Grid and Flexbox for adaptable interfaces"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
        <p className="text-muted-foreground mb-6">
          Deep dive into the technical architecture, CSS methodology, and implementation details.
        </p>
      </div>

      {Object.entries(implementationData).map(([category, details]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              {category === 'css_architecture' && <Palette className="icon-md text-primary" />}
              {category === 'component_architecture' && <Layers className="icon-md text-primary" />}
              {category === 'accessibility_implementation' && <Accessibility className="icon-md text-primary" />}
              {category === 'responsive_implementation' && <Monitor className="icon-md text-primary" />}
              {category.replace('_', ' ')}
            </CardTitle>
            <CardDescription>
              Technical approach to {category.replace('_', ' ').toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(details).map(([aspect, content]) => (
                <div key={aspect} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 capitalize text-primary">
                    {aspect.replace('_', ' ')}
                  </h4>
                  
                  {typeof content === 'object' && !Array.isArray(content) ? (
                    <div className="space-y-3">
                      {Object.entries(content).map(([key, value]) => (
                        <div key={key} className="flex items-start gap-3">
                          <Badge variant="outline" className="text-xs mt-0.5 min-w-[120px] justify-center">
                            {key.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : Array.isArray(content) ? (
                    <div className="space-y-2">
                      {content.map((item, index) => (
                        <div key={index} className="p-2 bg-muted/30 rounded">
                          <code className="text-sm">{item}</code>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{content}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Alert>
        <Code className="icon-sm" />
        <AlertDescription>
          <strong>Engineering Excellence:</strong> Atlas implements industry best practices for performance, 
          accessibility, and maintainability while maintaining design system consistency.
        </AlertDescription>
      </Alert>
    </div>
  )
}