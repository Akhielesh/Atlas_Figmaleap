'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

type PageView = 'home' | 'search' | 'collections' | 'insights' | 'analytics' | 'settings' | 'profile' | 'about'

interface NavigationState {
  currentPage: PageView
  previousPage: PageView | null
  history: PageView[]
}

interface NavigationContextType {
  navigationState: NavigationState
  navigateTo: (page: PageView, addToHistory?: boolean) => void
  goBack: () => void
  canGoBack: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

interface NavigationProviderProps {
  children: React.ReactNode
  initialPage?: PageView
}

export function NavigationProvider({ children, initialPage = 'home' }: NavigationProviderProps) {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentPage: initialPage,
    previousPage: null,
    history: [initialPage]
  })

  const navigateTo = (page: PageView, addToHistory = true) => {
    setNavigationState(prev => ({
      currentPage: page,
      previousPage: prev.currentPage,
      history: addToHistory 
        ? [...prev.history.slice(-10), page] // Keep last 10 pages
        : prev.history
    }))
  }

  const goBack = () => {
    if (navigationState.history.length > 1) {
      const newHistory = [...navigationState.history]
      newHistory.pop() // Remove current page
      const previousPage = newHistory[newHistory.length - 1] || 'home'
      
      setNavigationState({
        currentPage: previousPage,
        previousPage: navigationState.currentPage,
        history: newHistory
      })
    } else {
      // Fallback to home if no history
      navigateTo('home', false)
    }
  }

  const canGoBack = navigationState.history.length > 1

  return (
    <NavigationContext.Provider value={{
      navigationState,
      navigateTo,
      goBack,
      canGoBack
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

interface BackButtonProps {
  className?: string
  fallbackPage?: PageView
  showTooltip?: boolean
}

export function BackButton({ className = "", fallbackPage = 'search', showTooltip = true }: BackButtonProps) {
  const { goBack, canGoBack, navigateTo, navigationState } = useNavigation()

  const handleBack = () => {
    if (canGoBack) {
      goBack()
    } else {
      navigateTo(fallbackPage)
    }
  }

  const getBackDestination = () => {
    if (canGoBack && navigationState.history.length > 1) {
      const prevPage = navigationState.history[navigationState.history.length - 2]
      return getPageDisplayName(prevPage)
    }
    return getPageDisplayName(fallbackPage)
  }

  const button = (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`atlas-hover atlas-focus-ring touch-target ${className}`}
      aria-label={`Back to ${getBackDestination()}`}
    >
      <ArrowLeft className="icon-sm mr-2" />
      Back
    </Button>
  )

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="bottom" className="atlas-animate-fade-in">
            <p>Back to {getBackDestination()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}

function getPageDisplayName(page: PageView): string {
  const names: Record<PageView, string> = {
    home: 'Home',
    search: 'Search',
    collections: 'Collections',
    insights: 'Insights',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    about: 'About'
  }
  return names[page] || 'Previous page'
}

interface BreadcrumbsProps {
  className?: string
  maxItems?: number
}

export function Breadcrumbs({ className = "", maxItems = 3 }: BreadcrumbsProps) {
  const { navigationState, navigateTo } = useNavigation()
  
  const visibleHistory = navigationState.history.slice(-maxItems)
  
  if (visibleHistory.length <= 1) return null

  return (
    <nav className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`} aria-label="Breadcrumb">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigateTo('home')}
        className="h-6 px-2 text-xs atlas-hover atlas-focus-ring"
        aria-label="Go to home"
      >
        <Home className="icon-xs" />
      </Button>
      
      {visibleHistory.slice(0, -1).map((page, index) => (
        <React.Fragment key={`${page}-${index}`}>
          <span className="text-muted-foreground/50">/</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateTo(page)}
            className="h-6 px-2 text-xs atlas-hover atlas-focus-ring"
          >
            {getPageDisplayName(page)}
          </Button>
        </React.Fragment>
      ))}
      
      <span className="text-muted-foreground/50">/</span>
      <span className="font-medium text-foreground">
        {getPageDisplayName(navigationState.currentPage)}
      </span>
    </nav>
  )
}

// Sidebar Navigation Component
interface SidebarNavProps {
  isCollapsed?: boolean
  onToggle?: () => void
  className?: string
}

export function SidebarNav({ isCollapsed = false, onToggle, className = "" }: SidebarNavProps) {
  const { navigationState, navigateTo } = useNavigation()
  
  const navItems = [
    { page: 'search' as PageView, icon: '🔍', label: 'Search', shortcut: '/' },
    { page: 'collections' as PageView, icon: '📁', label: 'Collections', shortcut: 'C' },
    { page: 'analytics' as PageView, icon: '📊', label: 'Analytics', shortcut: 'A' },
    { page: 'settings' as PageView, icon: '⚙️', label: 'Settings', shortcut: ',' }
  ]

  return (
    <nav className={`bg-sidebar border-r border-sidebar-border ${className}`}>
      <div className="p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">
            Atlas
          </h2>
        )}
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <TooltipProvider key={item.page}>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm
                      atlas-hover atlas-focus-ring touch-target
                      ${navigationState.currentPage === item.page
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      }
                      ${isCollapsed ? 'justify-center' : 'justify-start'}
                    `}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={navigationState.currentPage === item.page ? 'page' : undefined}
                  >
                    <span className="text-base" role="img" aria-hidden="true">
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.shortcut && (
                          <kbd className="px-1 py-0.5 bg-sidebar-border text-sidebar-foreground/60 rounded text-xs">
                            {item.shortcut}
                          </kbd>
                        )}
                      </>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="atlas-animate-fade-in">
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <kbd className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </nav>
  )
}