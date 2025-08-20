'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Search, Mic, Sparkles, Clock, User, FileText, Building, 
  Calendar, Tag, Zap, Brain, Settings2, Command, Filter
} from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export type SearchVariant = 'basic' | 'enhanced' | 'command'

interface SmartSuggestion {
  type: 'natural' | 'semantic' | 'token' | 'recent' | 'person' | 'file' | 'entity' | 'task'
  label: string
  displayText: string
  icon?: React.ReactNode
  description?: string
  confidence?: number
  aiGenerated?: boolean
}

interface UnifiedSearchBarProps {
  variant?: SearchVariant
  onSearch?: (query: string, metadata?: any) => void
  placeholder?: string
  className?: string
  showFilters?: boolean
  showVoiceSearch?: boolean
  showCommandPalette?: boolean
  autoFocus?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function UnifiedSearchBar({ 
  variant = 'enhanced',
  onSearch, 
  placeholder,
  className = "",
  showFilters = false,
  showVoiceSearch = true,
  showCommandPalette = true,
  autoFocus = false,
  value: controlledValue,
  onChange: controlledOnChange
}: UnifiedSearchBarProps) {
  const [query, setQuery] = useState(controlledValue || '')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isProcessingNL, setIsProcessingNL] = useState(false)
  const [searchMode, setSearchMode] = useState<'standard' | 'semantic' | 'natural'>('natural')
  const inputRef = useRef<HTMLInputElement>(null)

  // Get appropriate placeholder text
  const getPlaceholder = () => {
    if (placeholder) return placeholder
    
    switch (variant) {
      case 'basic':
        return 'Search files...'
      case 'command':
        return 'Type a command or search...'
      case 'enhanced':
      default:
        return "Ask Atlas anything... Try 'Find Bob's contract from last year' or 'Show me Q4 planning docs'"
    }
  }

  // Handle controlled vs uncontrolled state
  const handleValueChange = (newValue: string) => {
    if (controlledOnChange) {
      controlledOnChange(newValue)
    } else {
      setQuery(newValue)
    }
  }

  const currentValue = controlledValue !== undefined ? controlledValue : query

  // Mock natural language processing
  const processNaturalLanguage = (query: string): SmartSuggestion[] => {
    if (variant === 'basic') return []
    
    const suggestions: SmartSuggestion[] = []
    
    // Detect natural language patterns
    const patterns = [
      {
        regex: /find (.*?)'s (.*?) from (.*?)$/i,
        handler: (matches: RegExpMatchArray) => ({
          type: 'natural' as const,
          label: `owner:${matches[1]} type:${matches[2]} modified:${matches[3]}`,
          displayText: `Find ${matches[1]}'s ${matches[2]} from ${matches[3]}`,
          icon: <Brain className="icon-sm" />,
          description: 'Natural language query',
          confidence: 0.95,
          aiGenerated: true
        })
      },
      {
        regex: /show me (.*?) (documents?|files?|presentations?)$/i,
        handler: (matches: RegExpMatchArray) => ({
          type: 'natural' as const,
          label: `${matches[1]} type:${matches[2]}`,
          displayText: `Show ${matches[1]} ${matches[2]}`,
          icon: <Brain className="icon-sm" />,
          description: 'Natural language query',
          confidence: 0.92,
          aiGenerated: true
        })
      },
      {
        regex: /(meeting notes?|action items?) (.*?)$/i,
        handler: (matches: RegExpMatchArray) => ({
          type: 'task' as const,
          label: `content:"${matches[1]}" ${matches[2]}`,
          displayText: `Find ${matches[1]} about ${matches[2]}`,
          icon: <Zap className="icon-sm" />,
          description: 'Task extraction',
          confidence: 0.88,
          aiGenerated: true
        })
      }
    ]

    patterns.forEach(pattern => {
      const matches = query.match(pattern.regex)
      if (matches) {
        suggestions.push(pattern.handler(matches))
      }
    })

    return suggestions
  }

  // Generate smart suggestions
  const generateSmartSuggestions = (value: string) => {
    if (variant === 'basic') return []
    
    const suggestions: SmartSuggestion[] = []
    
    // Natural language processing
    if (value.length > 10 && variant === 'enhanced') {
      const nlSuggestions = processNaturalLanguage(value)
      suggestions.push(...nlSuggestions)
    }

    // Semantic similarity (mock)
    const semanticSuggestions = [
      {
        type: 'semantic' as const,
        label: value,
        displayText: `Similar: "quarterly business review documents"`,
        icon: <Sparkles className="icon-sm" />,
        description: 'Semantic search',
        confidence: 0.85,
        aiGenerated: true
      },
      {
        type: 'semantic' as const,
        label: value,
        displayText: `Related: "project planning materials"`,
        icon: <Sparkles className="icon-sm" />,
        description: 'Semantic search',
        confidence: 0.78,
        aiGenerated: true
      }
    ]

    if (value.length > 5 && variant === 'enhanced') {
      suggestions.push(...semanticSuggestions.slice(0, 1))
    }

    // Entity extraction
    const entityPatterns = [
      { regex: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/, type: 'person', icon: <User className="icon-sm" /> },
      { regex: /\b(Q[1-4]|quarter|quarterly)\b/i, type: 'time', icon: <Calendar className="icon-sm" /> },
      { regex: /\b(contract|agreement|proposal)\b/i, type: 'document', icon: <FileText className="icon-sm" /> },
      { regex: /\b[A-Z][a-z]+\s?(Corp|Inc|LLC|Ltd)\b/, type: 'company', icon: <Building className="icon-sm" /> }
    ]

    entityPatterns.forEach(pattern => {
      const matches = value.match(pattern.regex)
      if (matches && variant === 'enhanced') {
        suggestions.push({
          type: 'entity' as const,
          label: `${pattern.type}:"${matches[0]}"`,
          displayText: `Search by ${pattern.type}: ${matches[0]}`,
          icon: pattern.icon,
          description: 'Entity detected',
          confidence: 0.82,
          aiGenerated: true
        })
      }
    })

    // Recent searches
    const recentSearches = [
      'Q4 roadmap presentation',
      'design system guidelines',
      'user research findings',
      'API documentation'
    ]

    if (value.length <= 3) {
      recentSearches.forEach(recent => {
        suggestions.push({
          type: 'recent' as const,
          label: recent,
          displayText: recent,
          icon: <Clock className="icon-sm" />,
          description: 'Recent search'
        })
      })
    }

    // Command palette suggestions
    if (variant === 'command' && value.startsWith('/')) {
      const commands = [
        { label: '/search', displayText: 'Search files', icon: <Search className="icon-sm" /> },
        { label: '/collections', displayText: 'Open Collections', icon: <Tag className="icon-sm" /> },
        { label: '/settings', displayText: 'Open Settings', icon: <Settings2 className="icon-sm" /> }
      ]
      
      commands.forEach(cmd => {
        if (cmd.label.startsWith(value)) {
          suggestions.push({
            type: 'task' as const,
            label: cmd.label,
            displayText: cmd.displayText,
            icon: cmd.icon,
            description: 'Command'
          })
        }
      })
    }

    return suggestions.slice(0, 8)
  }

  // Auto-focus support
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    handleValueChange(value)
    
    if (value.trim() && variant !== 'basic') {
      setIsProcessingNL(true)
      // Simulate AI processing delay
      setTimeout(() => {
        setSuggestions(generateSmartSuggestions(value))
        setIsProcessingNL(false)
      }, variant === 'enhanced' ? 300 : 100)
    } else {
      setSuggestions(variant !== 'basic' ? generateSmartSuggestions('') : [])
      setIsProcessingNL(false)
    }
    
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex])
        } else {
          handleSubmit(e as any)
        }
        break
      case 'Escape':
        setSuggestions([])
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const selectSuggestion = (suggestion: SmartSuggestion) => {
    handleValueChange(suggestion.label)
    setSuggestions([])
    setSelectedIndex(-1)
    
    // Pass metadata about the search type
    onSearch?.(suggestion.label, {
      type: suggestion.type,
      aiGenerated: suggestion.aiGenerated,
      confidence: suggestion.confidence,
      originalQuery: currentValue
    })
    
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(currentValue, { type: 'standard' })
    setSuggestions([])
    setSelectedIndex(-1)
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (currentValue.length === 0 && variant !== 'basic') {
      setSuggestions(generateSmartSuggestions(''))
    }
  }

  const handleBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      setIsFocused(false)
      setSuggestions([])
      setSelectedIndex(-1)
    }, 200)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative atlas-focus
          ${isFocused 
            ? 'max-w-[864px] scale-[1.02]' 
            : variant === 'command' 
              ? 'max-w-[600px] scale-100' 
              : 'max-w-[720px] scale-100'
          }
        `}>
          {/* Left section - Icon and AI indicator */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {variant === 'command' ? (
              <Command className="icon-md text-muted-foreground" />
            ) : (
              <Search className="icon-md text-muted-foreground" />
            )}
            {isProcessingNL && variant === 'enhanced' && (
              <div className="flex items-center gap-1">
                <Sparkles className="icon-xs text-primary animate-pulse" />
                <span className="text-xs text-primary">AI</span>
              </div>
            )}
          </div>
          
          {/* Input field */}
          <Input
            ref={inputRef}
            type="text"
            value={currentValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={getPlaceholder()}
            className={`
              w-full pl-16 pr-32 py-3 border-border rounded-xl atlas-focus atlas-focus-ring
              touch-target
              ${isFocused 
                ? 'bg-background shadow-lg shadow-primary/5 ring-2 ring-primary/20' 
                : 'bg-input-background hover:bg-background/80'
              }
            `}
            aria-label="Search input"
            aria-expanded={suggestions.length > 0}
            aria-haspopup="listbox"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
          />
          
          {/* Right section - Controls */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {/* Search mode toggle (enhanced only) */}
            {variant === 'enhanced' && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 atlas-hover atlas-focus-ring touch-target"
                      onClick={() => {
                        const modes = ['natural', 'semantic', 'standard'] as const
                        const currentIndex = modes.indexOf(searchMode)
                        setSearchMode(modes[(currentIndex + 1) % modes.length])
                      }}
                    >
                      {searchMode === 'natural' && <Brain className="icon-xs" />}
                      {searchMode === 'semantic' && <Sparkles className="icon-xs" />}
                      {searchMode === 'standard' && <Search className="icon-xs" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Search mode: {searchMode}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {/* Filters toggle */}
            {showFilters && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 atlas-hover atlas-focus-ring touch-target"
                      aria-label="Toggle filters"
                    >
                      <Filter className="icon-xs" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Toggle filters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {/* Keyboard shortcut indicator */}
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              /
            </kbd>
            
            {/* Voice search */}
            {showVoiceSearch && (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 atlas-hover atlas-focus-ring touch-target"
                      aria-label="Voice search"
                    >
                      <Mic className="icon-xs" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Voice search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </form>

      {/* Enhanced suggestions dropdown */}
      {suggestions.length > 0 && isFocused && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 atlas-animate-slide-in"
          role="listbox"
          aria-label="Search suggestions"
        >
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${index}`}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 atlas-hover touch-target
                  ${index === selectedIndex 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/50'
                  }
                `}
                onClick={() => selectSuggestion(suggestion)}
              >
                <div className="flex-shrink-0 text-muted-foreground atlas-animate-fade-in">
                  {suggestion.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{suggestion.displayText}</span>
                    {suggestion.aiGenerated && (
                      <div className="flex items-center gap-1">
                        <Sparkles className="icon-xs text-primary" />
                        <Badge variant="secondary" className="text-xs px-1 atlas-animate-fade-in">
                          AI
                        </Badge>
                      </div>
                    )}
                    {suggestion.confidence && (
                      <Badge variant="outline" className="text-xs atlas-animate-fade-in">
                        {Math.round(suggestion.confidence * 100)}%
                      </Badge>
                    )}
                  </div>
                  {suggestion.description && (
                    <div className="text-xs text-muted-foreground truncate mt-1">
                      {suggestion.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
            
            {currentValue.length > 3 && variant === 'enhanced' && (
              <>
                <Separator className="my-2" />
                <div className="px-4 py-2 text-xs text-muted-foreground flex items-center gap-2">
                  <Settings2 className="icon-xs" />
                  <span>Advanced search powered by AI • Press Tab for more options</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Export the component with different presets
export const BasicSearchBar = (props: Omit<UnifiedSearchBarProps, 'variant'>) => (
  <UnifiedSearchBar {...props} variant="basic" />
)

export const EnhancedSearchBar = (props: Omit<UnifiedSearchBarProps, 'variant'>) => (
  <UnifiedSearchBar {...props} variant="enhanced" />
)

export const CommandSearchBar = (props: Omit<UnifiedSearchBarProps, 'variant'>) => (
  <UnifiedSearchBar {...props} variant="command" />
)