'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { 
  Search, Home, Settings, User, FolderOpen, BarChart3, 
  FileText, Clock, Star, Command, ArrowRight, Hash
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon: React.ReactNode
  shortcut?: string
  category: 'navigation' | 'search' | 'actions' | 'recent'
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (page: string) => void
  onSearch: (query: string) => void
}

export function CommandPalette({ isOpen, onClose, onNavigate, onSearch }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Command items
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home',
      description: 'Return to the main page',
      icon: <Home className="icon-sm" />,
      shortcut: '⌘H',
      category: 'navigation',
      action: () => { onNavigate('home'); onClose() },
      keywords: ['home', 'main', 'dashboard']
    },
    {
      id: 'nav-search',
      title: 'Go to Search',
      description: 'Open the search interface',
      icon: <Search className="icon-sm" />,
      shortcut: '⌘/',
      category: 'navigation',
      action: () => { onNavigate('search'); onClose() },
      keywords: ['search', 'find', 'query']
    },
    {
      id: 'nav-collections',
      title: 'Go to Collections',
      description: 'View saved collections',
      icon: <FolderOpen className="icon-sm" />,
      shortcut: '⌘C',
      category: 'navigation',
      action: () => { onNavigate('collections'); onClose() },
      keywords: ['collections', 'saved', 'folders']
    },
    {
      id: 'nav-analytics',
      title: 'Go to Analytics',
      description: 'View search analytics',
      icon: <BarChart3 className="icon-sm" />,
      shortcut: '⌘A',
      category: 'navigation',
      action: () => { onNavigate('analytics'); onClose() },
      keywords: ['analytics', 'stats', 'metrics']
    },
    {
      id: 'nav-settings',
      title: 'Go to Settings',
      description: 'Manage preferences',
      icon: <Settings className="icon-sm" />,
      shortcut: '⌘,',
      category: 'navigation',
      action: () => { onNavigate('settings'); onClose() },
      keywords: ['settings', 'preferences', 'config']
    },
    {
      id: 'nav-profile',
      title: 'Go to Profile',
      description: 'View your profile',
      icon: <User className="icon-sm" />,
      category: 'navigation',
      action: () => { onNavigate('profile'); onClose() },
      keywords: ['profile', 'account', 'user']
    },

    // Search actions
    {
      id: 'search-documents',
      title: 'Search Documents',
      description: 'Find documents and files',
      icon: <FileText className="icon-sm" />,
      category: 'search',
      action: () => { onSearch('type:document'); onClose() },
      keywords: ['documents', 'files', 'docs']
    },
    {
      id: 'search-recent',
      title: 'Search Recent Files',
      description: 'Find recently modified files',
      icon: <Clock className="icon-sm" />,
      category: 'search',
      action: () => { onSearch('modified:recent'); onClose() },
      keywords: ['recent', 'new', 'updated']
    },
    {
      id: 'search-starred',
      title: 'Search Starred Items',
      description: 'Find your starred files',
      icon: <Star className="icon-sm" />,
      category: 'search',
      action: () => { onSearch('starred:true'); onClose() },
      keywords: ['starred', 'favorites', 'bookmarked']
    }
  ]

  // Filter commands based on query
  const filteredCommands = query.trim() === '' 
    ? commands 
    : commands.filter(command => {
        const searchTerm = query.toLowerCase()
        return command.title.toLowerCase().includes(searchTerm) ||
               command.description?.toLowerCase().includes(searchTerm) ||
               command.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      })

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {} as Record<string, CommandItem[]>)

  // Category labels
  const categoryLabels = {
    navigation: 'Navigation',
    search: 'Search',
    actions: 'Actions',
    recent: 'Recent'
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
        }
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Add keyboard listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Update selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl p-0 atlas-animate-scale-in"
        aria-describedby="command-palette-description"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Command Palette</DialogTitle>
          <DialogDescription id="command-palette-description">
            Search for commands, navigate to pages, or perform actions using keyboard shortcuts.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="icon-sm text-muted-foreground mr-3" />
          <Input
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 text-base"
            autoFocus
          />
          <div className="flex items-center gap-1 ml-3">
            <Badge variant="outline" className="text-xs px-2 py-1">
              <Command className="icon-xs mr-1" />
              K
            </Badge>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="icon-lg text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No commands found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for "home", "search", or "settings"
              </p>
            </div>
          ) : (
            <div className="p-2">
              {Object.entries(groupedCommands).map(([category, items], categoryIndex) => (
                <div key={category}>
                  {categoryIndex > 0 && <Separator className="my-2" />}
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </div>
                  {items.map((command, itemIndex) => {
                    const globalIndex = filteredCommands.indexOf(command)
                    const isSelected = globalIndex === selectedIndex
                    
                    return (
                      <Button
                        key={command.id}
                        variant="ghost"
                        className={`
                          w-full justify-start p-3 h-auto atlas-hover atlas-focus-ring
                          ${isSelected ? 'bg-accent text-accent-foreground' : ''}
                        `}
                        onClick={command.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <div className="flex items-center w-full">
                          <div className="mr-3 flex-shrink-0">
                            {command.icon}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium text-sm truncate">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-muted-foreground truncate">
                                {command.description}
                              </div>
                            )}
                          </div>
                          {command.shortcut && (
                            <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                              {command.shortcut}
                            </Badge>
                          )}
                          {isSelected && (
                            <ArrowRight className="icon-xs ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </Button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">↑↓</Badge>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">↵</Badge>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">esc</Badge>
                <span>Close</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}