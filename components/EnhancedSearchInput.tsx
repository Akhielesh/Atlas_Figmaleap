'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, X, Clock, Filter, Command, ArrowUp, ArrowDown, 
  Sparkles, FileText, User, Building, Calendar, Tag
} from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface SearchSuggestion {
  id: string
  type: 'recent' | 'filter' | 'entity' | 'saved' | 'command'
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  category?: string
}

interface EnhancedSearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string, metadata?: any) => void
  onClear?: () => void
  placeholder?: string
  suggestions?: SearchSuggestion[]
  showSuggestions?: boolean
  isLoading?: boolean
  hasFilters?: boolean
  onToggleFilters?: () => void
  className?: string
}

export function EnhancedSearchInput({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search files and content...",
  suggestions = [],
  showSuggestions = true,
  isLoading = false,
  hasFilters = false,
  onToggleFilters,
  className = ""
}: EnhancedSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Generate default suggestions
  const defaultSuggestions: SearchSuggestion[] = [
    {
      id: 'recent-1',
      type: 'recent',
      label: 'quarterly report',
      icon: <Clock className="icon-sm text-muted-foreground" />,
      category: 'Recent searches'
    },
    {
      id: 'recent-2',
      type: 'recent',
      label: 'design system guidelines',
      icon: <Clock className="icon-sm text-muted-foreground" />,
      category: 'Recent searches'
    },
    {
      id: 'filter-1',
      type: 'filter',
      label: 'type:pdf',
      description: 'Show only PDF files',
      icon: <FileText className="icon-sm text-blue-600" />,
      category: 'Quick filters'
    },
    {
      id: 'filter-2',
      type: 'filter',
      label: 'source:google-drive',
      description: 'Show only Google Drive files',
      icon: <Filter className="icon-sm text-green-600" />,
      category: 'Quick filters'
    },
    {
      id: 'filter-3',
      type: 'filter',
      label: 'starred:true',
      description: 'Show only starred files',
      icon: <Filter className="icon-sm text-yellow-600" />,
      category: 'Quick filters'
    },
    {
      id: 'command-1',
      type: 'command',
      label: 'Open Collections',
      icon: <Command className="icon-sm text-primary" />,
      shortcut: '⌘K',
      category: 'Commands'
    }
  ]

  const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions
  const filteredSuggestions = value 
    ? allSuggestions.filter(s => 
        s.label.toLowerCase().includes(value.toLowerCase()) ||
        s.description?.toLowerCase().includes(value.toLowerCase())
      )
    : allSuggestions

  // Group suggestions by category
  const groupedSuggestions = filteredSuggestions.reduce((acc, suggestion) => {
    const category = suggestion.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(suggestion)
    return acc
  }, {} as Record<string, SearchSuggestion[]>)

  useEffect(() => {
    if (isFocused && (value.length === 0 || filteredSuggestions.length > 0)) {
      setShowDropdown(showSuggestions)
    } else {
      setShowDropdown(false)
    }
  }, [isFocused, value, filteredSuggestions.length, showSuggestions])

  useEffect(() => {
    // Reset selection when suggestions change
    setSelectedIndex(-1)
  }, [filteredSuggestions])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSubmit()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex])
        } else {
          handleSubmit()
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
      case 'Tab':
        if (selectedIndex >= 0) {
          e.preventDefault()
          handleSuggestionSelect(filteredSuggestions[selectedIndex])
        }
        break
    }
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'recent':
      case 'filter':
        onChange(suggestion.label)
        onSearch(suggestion.label, { type: suggestion.type, id: suggestion.id })
        break
      case 'command':
        // Handle command actions
        console.log('Execute command:', suggestion.label)
        break
      default:
        onChange(suggestion.label)
        onSearch(suggestion.label)
    }
    
    setShowDropdown(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleSubmit = () => {
    if (value.trim()) {
      onSearch(value.trim())
      setShowDropdown(false)
    }
  }

  const handleClear = () => {
    onChange('')
    onClear?.()
    setShowDropdown(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Don't hide dropdown if clicking on a suggestion
    if (dropdownRef.current?.contains(e.relatedTarget as Node)) {
      return
    }
    
    setTimeout(() => {
      setIsFocused(false)
      setShowDropdown(false)
      setSelectedIndex(-1)
    }, 150)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 icon-sm text-muted-foreground" />
          
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              pl-10 pr-20 h-11 text-sm atlas-focus-ring
              ${isFocused 
                ? 'ring-2 ring-primary/20 border-primary' 
                : 'border-border'
              }
            `}
            aria-label="Search input"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          />

          {/* Right side controls */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {/* Clear button */}
            {value && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="h-7 w-7 p-0 atlas-hover atlas-focus-ring touch-target"
                      aria-label="Clear search"
                    >
                      <X className="icon-xs" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Filters toggle */}
            {onToggleFilters && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onToggleFilters}
                      className={`
                        h-7 w-7 p-0 atlas-hover atlas-focus-ring touch-target
                        ${hasFilters ? 'text-primary bg-primary/10' : ''}
                      `}
                      aria-label="Toggle filters"
                      aria-pressed={hasFilters}
                    >
                      <Filter className="icon-xs" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{hasFilters ? 'Hide filters' : 'Show filters'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="h-7 w-7 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Keyboard shortcut indicator */}
        <div className="absolute right-24 top-1/2 transform -translate-y-1/2">
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            /
          </kbd>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto atlas-animate-slide-in"
          role="listbox"
          aria-label="Search suggestions"
        >
          {Object.keys(groupedSuggestions).length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No suggestions found
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(groupedSuggestions).map(([category, items], categoryIndex) => (
                <div key={category}>
                  {categoryIndex > 0 && <Separator className="my-2" />}
                  
                  <div className="px-3 py-1 text-xs font-medium text-muted-foreground">
                    {category}
                  </div>
                  
                  {items.map((suggestion, index) => {
                    const globalIndex = Object.values(groupedSuggestions)
                      .slice(0, categoryIndex)
                      .flat().length + index
                    
                    return (
                      <button
                        key={suggestion.id}
                        id={`suggestion-${globalIndex}`}
                        role="option"
                        aria-selected={globalIndex === selectedIndex}
                        className={`
                          w-full px-3 py-2 text-left flex items-center gap-3 atlas-hover touch-target
                          ${globalIndex === selectedIndex 
                            ? 'bg-accent text-accent-foreground' 
                            : 'hover:bg-accent/50'
                          }
                        `}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        {suggestion.icon && (
                          <div className="flex-shrink-0">
                            {suggestion.icon}
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium text-sm">
                              {suggestion.label}
                            </span>
                            {suggestion.type === 'filter' && (
                              <Badge variant="secondary" className="text-xs px-1">
                                Filter
                              </Badge>
                            )}
                            {suggestion.type === 'command' && (
                              <Badge variant="outline" className="text-xs px-1">
                                Cmd
                              </Badge>
                            )}
                          </div>
                          
                          {suggestion.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {suggestion.description}
                            </div>
                          )}
                        </div>

                        {suggestion.shortcut && (
                          <kbd className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                            {suggestion.shortcut}
                          </kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
              
              {/* Search tips */}
              <Separator className="my-2" />
              <div className="px-3 py-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="icon-xs" />
                  <span className="font-medium">Search tips:</span>
                </div>
                <div className="space-y-1 ml-5">
                  <div>Use quotes for exact matches: "project plan"</div>
                  <div>Filter by type: type:pdf, source:gdrive</div>
                  <div>Find recent files: modified:today</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Empty query state component
interface EmptyQueryStateProps {
  onSuggestionClick: (query: string) => void
  recentSearches?: string[]
  className?: string
}

export function EmptyQueryState({ 
  onSuggestionClick, 
  recentSearches = [],
  className = "" 
}: EmptyQueryStateProps) {
  const defaultSuggestions = [
    'quarterly reports',
    'meeting notes',
    'design files',
    'api documentation',
    'budget planning'
  ]

  const suggestions = recentSearches.length > 0 ? recentSearches : defaultSuggestions

  return (
    <div className={`p-8 text-center ${className}`}>
      <div className="max-w-md mx-auto">
        <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
        
        <h3 className="text-lg font-medium mb-2">Search your files</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Find documents, presentations, and files across all your connected sources
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3 text-left">
              {recentSearches.length > 0 ? 'Recent searches' : 'Try searching for:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="px-3 py-1.5 text-sm border border-border rounded-md atlas-hover hover:bg-accent touch-target"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3 text-left">Quick filters:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Today\'s files', query: 'modified:today' },
                { label: 'Starred files', query: 'starred:true' },
                { label: 'PDF documents', query: 'type:pdf' },
                { label: 'Shared with me', query: 'shared:true' }
              ].map((filter) => (
                <button
                  key={filter.query}
                  onClick={() => onSuggestionClick(filter.query)}
                  className="px-3 py-1.5 text-sm bg-accent text-accent-foreground rounded-md atlas-hover hover:bg-accent/80 touch-target"
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border text-xs text-muted-foreground text-left">
            <div className="space-y-1">
              <div><strong>Search tips:</strong></div>
              <div>• Use quotes for exact phrases: "project plan"</div>
              <div>• Filter by type: type:pdf, type:image</div>
              <div>• Filter by source: source:gdrive, source:slack</div>
              <div>• Filter by date: modified:today, created:week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}