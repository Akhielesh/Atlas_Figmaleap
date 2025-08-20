# Atlas Design System Guidelines

## Overview

Atlas uses a comprehensive design token system that ensures consistency, accessibility, and scalability across all components and interfaces. This document outlines the complete design system architecture.

## Design Tokens

### Color System

```css
/* Primary Colors */
--primary: #030213          /* Main brand color */
--primary-foreground: #ffffff
--secondary: oklch(0.95 0.0058 264.53)
--secondary-foreground: #030213

/* Semantic Colors */
--success: #16a34a
--warning: #f59e0b  
--info: #3b82f6
--destructive: #d4183d

/* Neutral Colors */
--background: #ffffff
--foreground: oklch(0.145 0 0)
--muted: #ececf0
--muted-foreground: #717182
--accent: #e9ebef
--border: rgba(0, 0, 0, 0.1)
```

### Typography Scale

```css
/* Font Sizes */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px - Base UI text */
--text-base: 1rem     /* 16px - Body text */
--text-lg: 1.25rem    /* 20px - Subheadings */
--text-xl: 1.5rem     /* 24px - Headings */
--text-2xl: 2rem      /* 32px - Page titles */

/* Font Weights */
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700

/* Line Heights */
--leading-tight: 1.25     /* Headings */
--leading-snug: 1.375     /* Subheadings */
--leading-normal: 1.5     /* UI text */
--leading-relaxed: 1.625  /* Body text */
```

### Spacing Scale

```css
/* Spacing System (4px base unit) */
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
```

### Border Radius

```css
/* Radius Scale */
--radius-sm: 0.25rem   /* 4px - Small elements */
--radius-md: 0.5rem    /* 8px - Cards, inputs */
--radius-lg: 0.625rem  /* 10px - Panels */
--radius-xl: 0.75rem   /* 12px - Modals */
--radius-2xl: 1rem     /* 16px - Large cards */
--radius-full: 9999px  /* Pills, avatars */
```

### Icon Sizing

```css
/* Icon System */
--icon-xs: 0.75rem   /* 12px - Inline icons */
--icon-sm: 1rem      /* 16px - UI icons */
--icon-md: 1.25rem   /* 20px - Action icons */
--icon-lg: 1.5rem    /* 24px - Feature icons */
--icon-xl: 2rem      /* 32px - Hero icons */
```

## Motion System

### Timing Guidelines

```css
/* Animation Durations */
--motion-fast: 100ms      /* Hover/focus feedback */
--motion-medium: 150ms    /* UI state changes */
--motion-slow: 200ms      /* Content transitions */
--motion-panel: 220ms     /* Panel slides */
--motion-modal: 180ms     /* Modal overlays */

/* Easing Functions */
--motion-ease: cubic-bezier(0.2, 0.8, 0.2, 1)  /* Primary easing */
--motion-ease-out: ease-out
--motion-ease-in: ease-in
```

### Motion Principles

- **Hover/Focus**: ≤120ms with subtle color shifts
- **Entrance/Exit**: 120-180ms with easeOut
- **Panel Transitions**: 180-220ms with offset + fade
- **Loading States**: Pulse animations at 2s intervals

## Component Guidelines

### Buttons

#### Variants
- **Primary**: Main actions, one per section
- **Secondary**: Supporting actions
- **Ghost**: Subtle actions
- **Destructive**: Dangerous actions

#### States
```css
/* Button States */
.atlas-button-states:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.atlas-button-states:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.atlas-button-states:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

#### Touch Targets
- Minimum 44×44px for all interactive elements
- Use `touch-target` class for compliance

### Typography Hierarchy

```css
/* Heading Hierarchy */
h1 { font-size: var(--text-2xl); font-weight: var(--font-weight-semibold); }
h2 { font-size: var(--text-xl); font-weight: var(--font-weight-semibold); }
h3 { font-size: var(--text-lg); font-weight: var(--font-weight-medium); }
h4 { font-size: var(--text-base); font-weight: var(--font-weight-medium); }

/* Body Text */
p { font-size: var(--text-sm); line-height: var(--leading-relaxed); }
small { font-size: var(--text-xs); }
```

### Card Layouts

#### Padding Standards
```css
/* Card Padding System */
.card-padding-sm { padding: var(--space-3) var(--space-4); }  /* 12px 16px */
.card-padding { padding: var(--space-4) var(--space-6); }     /* 16px 24px */
.card-padding-lg { padding: var(--space-6) var(--space-8); } /* 24px 32px */
```

#### Card Hover Effects
```css
.atlas-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}
```

### Grid System

#### Responsive Grid
```css
/* Atlas Grid - Responsive by default */
.atlas-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;          /* Mobile: 1 column */
}

@media (min-width: 640px) {
  .atlas-grid { grid-template-columns: repeat(2, 1fr); }  /* Tablet: 2 columns */
}

@media (min-width: 1024px) {
  .atlas-grid { grid-template-columns: repeat(4, 1fr); }  /* Desktop: 4 columns */
}
```

## Accessibility Standards

### Focus Management
```css
/* Focus Ring System */
.atlas-focus-ring:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  .atlas-focus-ring:focus-visible {
    outline-width: 3px;
    outline-color: Highlight;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .atlas-hover,
  .atlas-focus,
  .atlas-panel,
  .atlas-modal {
    transition: none;
  }
}
```

## Icon Guidelines

### Size Standards
- **12px (xs)**: Inline with text, status indicators
- **16px (sm)**: UI controls, navigation
- **20px (md)**: Action buttons, tools
- **24px (lg)**: Feature icons, cards
- **32px (xl)**: Hero sections, empty states

### Stroke Weight
- Consistent 1.5-2px stroke weight (Lucide default)
- No custom odd sizes
- Use semantic sizing classes: `icon-sm`, `icon-md`, `icon-lg`

### Usage Context
```jsx
/* Inline with text */
<span className="flex items-center gap-2">
  <FileText className="icon-sm" />
  Document
</span>

/* Standalone action */
<Button size="sm">
  <Download className="icon-sm" />
  Download
</Button>
```

## State Management

### Component States
Every interactive component should support:
- **Default**: Normal state
- **Hover**: Interactive feedback
- **Active**: Pressed/selected state
- **Focus**: Keyboard navigation
- **Disabled**: Non-interactive state
- **Loading**: Processing state
- **Error**: Validation failure
- **Success**: Successful action

### Loading States
```jsx
/* Skeleton Loading */
<div className="animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
  <div className="h-3 bg-muted rounded w-1/2" />
</div>
```

### Empty States
- Clear illustration or icon
- Helpful message explaining the empty state
- Call-to-action when appropriate
- Use muted colors and larger spacing

## Animation Classes

### Entrance Animations
```css
/* Slide In */
.atlas-animate-slide-in { animation: atlas-slide-in 220ms ease-out; }

/* Fade In */
.atlas-animate-fade-in { animation: atlas-fade-in 150ms ease-out; }

/* Scale In */
.atlas-animate-scale-in { animation: atlas-scale-in 180ms ease-out; }
```

### Staggered Animations
```css
/* Stagger Delays */
.atlas-stagger-1 { animation-delay: 50ms; }
.atlas-stagger-2 { animation-delay: 100ms; }
.atlas-stagger-3 { animation-delay: 150ms; }
```

## Usage Examples

### Search Bar Implementation
```jsx
<UnifiedSearchBar 
  variant="enhanced"
  onSearch={handleSearch}
  showVoiceSearch={true}
  showFilters={true}
  className="atlas-focus"
/>
```

### Card with Proper States
```jsx
<div className="atlas-card-hover atlas-focus-ring card-padding rounded-lg border border-border bg-card">
  <h3 className="text-base font-medium mb-2">Card Title</h3>
  <p className="text-sm text-muted-foreground">Card description</p>
</div>
```

### Button with States
```jsx
<Button 
  variant="primary" 
  className="atlas-button-states touch-target"
  disabled={isLoading}
>
  {isLoading ? <Loader className="icon-sm animate-spin" /> : <Save className="icon-sm" />}
  Save Changes
</Button>
```

## Best Practices

### Do's
- ✅ Use design tokens consistently
- ✅ Apply proper touch targets (44px minimum)
- ✅ Include hover and focus states
- ✅ Support keyboard navigation
- ✅ Use semantic HTML elements
- ✅ Test with screen readers
- ✅ Respect reduced motion preferences

### Don'ts
- ❌ Use hardcoded values instead of tokens
- ❌ Create custom icon sizes outside the scale
- ❌ Skip focus states on interactive elements
- ❌ Use color alone to convey information
- ❌ Make touch targets smaller than 44px
- ❌ Ignore animation preferences

## Future Considerations

### Theming Support
The token system is designed to support:
- Custom brand themes
- High contrast modes
- User preference overrides
- Dynamic color schemes

### Scalability
- Component variants can be extended
- New tokens can be added without breaking changes
- Animation system supports custom timing
- Grid system adapts to new breakpoints

---

*This design system ensures Atlas maintains a cohesive, accessible, and scalable interface across all platforms and devices.*