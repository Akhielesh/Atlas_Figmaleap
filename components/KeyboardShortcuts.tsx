'use client'

import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { 
  Keyboard, Search, Home, Settings, User, FolderOpen, BarChart3,
  Command, Escape, ArrowUp, ArrowDown, Enter, Slash, X
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'

// Keyboard shortcut configuration
export interface KeyboardShortcut {
  id: string
  key: string
  modifiers?: ('ctrl' | 'cmd' | 'alt' | 'shift')[]
  description: string
  category: string
  action: () => void
  context?: string
  global?: boolean
}

// Focus management context
interface FocusContextType {
  focusHistory: string[]
  currentFocus: string | null
  registerFocusable: (id: string, element: HTMLElement) => void
  unregisterFocusable: (id: string) => void
  setFocus: (id: string, options?: { returnFocus?: boolean }) => void
  returnToPrevious: () => void
  trapFocus: (containerId: string) => void
  releaseFocus: () => void
}

const FocusContext = createContext<FocusContextType | null>(null)

export function useFocus() {
  const context = useContext(FocusContext)
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider')
  }
  return context
}

// Focus management provider
export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [focusHistory, setFocusHistory] = useState<string[]>([])
  const [currentFocus, setCurrentFocus] = useState<string | null>(null)
  const [focusableElements, setFocusableElements] = useState<Map<string, HTMLElement>>(new Map())
  const [focusTrapped, setFocusTrapped] = useState<string | null>(null)

  const registerFocusable = (id: string, element: HTMLElement) => {
    setFocusableElements(prev => new Map(prev).set(id, element))
  }

  const unregisterFocusable = (id: string) => {
    setFocusableElements(prev => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
  }

  const setFocus = (id: string, options: { returnFocus?: boolean } = {}) => {
    const element = focusableElements.get(id)
    if (!element) return

    if (options.returnFocus && currentFocus) {
      setFocusHistory(prev => [...prev, currentFocus])
    }

    element.focus()
    setCurrentFocus(id)
  }

  const returnToPrevious = () => {
    if (focusHistory.length === 0) return

    const previousId = focusHistory[focusHistory.length - 1]
    setFocusHistory(prev => prev.slice(0, -1))
    setFocus(previousId)
  }

  const trapFocus = (containerId: string) => {
    setFocusTrapped(containerId)
  }

  const releaseFocus = () => {
    setFocusTrapped(null)
  }

  // Handle focus trapping
  useEffect(() => {
    if (!focusTrapped) return

    const container = focusableElements.get(focusTrapped)
    if (!container) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ')

      const focusableElements = container.querySelectorAll(focusableSelectors) as NodeListOf<HTMLElement>
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusTrapped, focusableElements])

  return (
    <FocusContext.Provider value={{
      focusHistory,
      currentFocus,
      registerFocusable,
      unregisterFocusable,
      setFocus,
      returnToPrevious,
      trapFocus,
      releaseFocus
    }}>
      {children}
    </FocusContext.Provider>
  )
}

// Global keyboard shortcuts hook
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      
      // Skip if typing in input fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        // Allow specific shortcuts even in input fields
        const allowedInInputs = shortcuts.filter(s => s.global)
        
        for (const shortcut of allowedInInputs) {
          if (matchesShortcut(e, shortcut)) {
            e.preventDefault()
            shortcut.action()
            return
          }
        }
        return
      }

      // Check all shortcuts
      for (const shortcut of shortcuts) {
        if (matchesShortcut(e, shortcut)) {
          e.preventDefault()
          shortcut.action()
          return
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

// Helper function to match keyboard events to shortcuts
function matchesShortcut(e: KeyboardEvent, shortcut: KeyboardShortcut): boolean {
  const key = e.key.toLowerCase()
  const targetKey = shortcut.key.toLowerCase()
  
  if (key !== targetKey) return false
  
  const modifiers = shortcut.modifiers || []
  const hasCtrl = modifiers.includes('ctrl') || modifiers.includes('cmd')
  const hasAlt = modifiers.includes('alt')
  const hasShift = modifiers.includes('shift')
  
  return (
    (!hasCtrl || (e.ctrlKey || e.metaKey)) &&
    (!hasAlt || e.altKey) &&
    (!hasShift || e.shiftKey) &&
    (hasCtrl || !e.ctrlKey) &&
    (hasCtrl || !e.metaKey) &&
    (hasAlt || !e.altKey) &&
    (hasShift || !e.shiftKey)
  )
}

// Keyboard shortcuts help dialog
interface KeyboardShortcutsHelpProps {
  shortcuts: KeyboardShortcut[]
  trigger?: React.ReactNode
}

export function KeyboardShortcutsHelp({ shortcuts, trigger }: KeyboardShortcutsHelpProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { trapFocus, releaseFocus } = useFocus()

  useEffect(() => {
    if (isOpen) {
      trapFocus('shortcuts-dialog')
    } else {
      releaseFocus()
    }
  }, [isOpen, trapFocus, releaseFocus])

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, KeyboardShortcut[]>)

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const modifiers = shortcut.modifiers || []
    const parts = []
    
    if (modifiers.includes('cmd') || modifiers.includes('ctrl')) {
      parts.push(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl')
    }
    if (modifiers.includes('alt')) {
      parts.push(navigator.platform.includes('Mac') ? '⌥' : 'Alt')
    }
    if (modifiers.includes('shift')) {
      parts.push('⇧')
    }
    
    parts.push(shortcut.key.toUpperCase())
    
    return parts.join(' + ')
  }

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="atlas-hover atlas-focus-ring">
      <Keyboard className="icon-sm mr-2" />
      Keyboard shortcuts
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent 
        id="shortcuts-dialog"
        className="max-w-2xl max-h-[80vh] atlas-animate-scale-in"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="icon-md" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-1">
            {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
              <div key={category}>
                <h3 className="font-medium text-sm mb-3 text-muted-foreground uppercase tracking-wide">
                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryShortcuts.map((shortcut) => (
                    <div 
                      key={shortcut.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent/50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{shortcut.description}</div>
                        {shortcut.context && (
                          <div className="text-xs text-muted-foreground">{shortcut.context}</div>
                        )}
                      </div>
                      <kbd className="ml-4 px-2 py-1 bg-muted text-muted-foreground rounded text-sm font-mono">
                        {formatShortcut(shortcut)}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-end pt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="atlas-hover atlas-focus-ring"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Focusable element wrapper
interface FocusableProps {
  id: string
  children: React.ReactNode
  className?: string
  returnFocus?: boolean
}

export function Focusable({ id, children, className, returnFocus }: FocusableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { registerFocusable, unregisterFocusable } = useFocus()

  useEffect(() => {
    if (ref.current) {
      registerFocusable(id, ref.current)
      return () => unregisterFocusable(id)
    }
  }, [id, registerFocusable, unregisterFocusable])

  return (
    <div ref={ref} className={className} tabIndex={-1}>
      {children}
    </div>
  )
}

// Common shortcuts for Atlas
export function useAtlasShortcuts(
  onNavigate: (page: string) => void,
  onSearch: () => void,
  onToggleCommandPalette: () => void,
  onShowShortcuts: () => void
) {
  const shortcuts: KeyboardShortcut[] = [
    {
      id: 'search-focus',
      key: '/',
      description: 'Focus search',
      category: 'Navigation',
      action: onSearch,
      global: true
    },
    {
      id: 'command-palette',
      key: 'k',
      modifiers: ['cmd'],
      description: 'Open command palette',
      category: 'Navigation',
      action: onToggleCommandPalette,
      global: true
    },
    {
      id: 'home',
      key: 'h',
      modifiers: ['cmd'],
      description: 'Go to home',
      category: 'Navigation',
      action: () => onNavigate('home')
    },
    {
      id: 'collections',
      key: 'c',
      modifiers: ['cmd'],
      description: 'Go to collections',
      category: 'Navigation',
      action: () => onNavigate('collections')
    },
    {
      id: 'analytics',
      key: 'a',
      modifiers: ['cmd'],
      description: 'Go to analytics',
      category: 'Navigation',
      action: () => onNavigate('analytics')
    },
    {
      id: 'settings',
      key: ',',
      modifiers: ['cmd'],
      description: 'Open settings',
      category: 'Navigation',
      action: () => onNavigate('settings'),
      global: true
    },
    {
      id: 'help',
      key: '?',
      description: 'Show keyboard shortcuts',
      category: 'Help',
      action: onShowShortcuts
    },
    {
      id: 'escape',
      key: 'Escape',
      description: 'Close dialogs and panels',
      category: 'General',
      action: () => {
        // This would be handled by individual components
        const event = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(event)
      }
    }
  ]

  useKeyboardShortcuts(shortcuts)
  
  return shortcuts
}

// Status indicator for showing active shortcuts
export function ShortcutStatus({ shortcuts }: { shortcuts: KeyboardShortcut[] }) {
  const [recentShortcut, setRecentShortcut] = useState<KeyboardShortcut | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const matchedShortcut = shortcuts.find(s => matchesShortcut(e, s))
      if (matchedShortcut) {
        setRecentShortcut(matchedShortcut)
        setTimeout(() => setRecentShortcut(null), 2000)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])

  if (!recentShortcut) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 atlas-animate-slide-in">
      <Badge 
        variant="secondary" 
        className="flex items-center gap-2 px-3 py-2 shadow-lg"
      >
        <Keyboard className="icon-xs" />
        <span className="text-xs">{recentShortcut.description}</span>
      </Badge>
    </div>
  )
}

// Focus return hook for modals and panels
export function useFocusReturn(isOpen: boolean, targetId?: string) {
  const { setFocus, returnToPrevious } = useFocus()
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      if (targetId) {
        setFocus(targetId, { returnFocus: true })
      }
    } else {
      // Return focus when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      } else {
        returnToPrevious()
      }
    }
  }, [isOpen, targetId, setFocus, returnToPrevious])
}