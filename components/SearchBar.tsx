'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, Mic, Clock, User, FileText } from 'lucide-react'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface SearchSuggestion {
  type: 'token' | 'recent' | 'person' | 'file'
  label: string
  icon?: React.ReactNode
  description?: string
}

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search across your drives… Try filters like `type:pdf` or `mentions:Alice`",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchTokens = ['type:', 'source:', 'owner:', 'mentions:', 'before:', 'after:', 'shared:']
  const recentQueries = ['design system guidelines', 'Q4 roadmap', 'user research findings']
  const people = ['Alice Johnson', 'Bob Smith', 'Design Team']
  const recentFiles = ['Atlas Guidelines.pdf', 'Product Roadmap.pptx', 'Research Findings.docx']
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && e.target !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const generateSuggestions = (value: string) => {
    const lastWord = value.split(' ').pop() || ''
    const suggestions: SearchSuggestion[] = []

    // Search tokens
    if (lastWord) {
      searchTokens
        .filter(token => token.startsWith(lastWord))
        .forEach(token => {
          suggestions.push({
            type: 'token',
            label: token,
            description: `Filter by ${token.replace(':', '')}`
          })
        })
    }

    // Recent queries when empty or few characters
    if (value.length <= 2) {
      recentQueries.forEach(query => {
        suggestions.push({
          type: 'recent',
          label: query,
          icon: <Clock className="w-4 h-4" />,
          description: 'Recent search'
        })
      })
    }

    // People suggestions
    if (lastWord.length > 0) {
      people
        .filter(person => person.toLowerCase().includes(lastWord.toLowerCase()))
        .forEach(person => {
          suggestions.push({
            type: 'person',
            label: `mentions:${person}`,
            icon: <User className="w-4 h-4" />,
            description: `Find mentions of ${person}`
          })
        })
    }

    // File suggestions
    if (value.length > 2) {
      recentFiles
        .filter(file => file.toLowerCase().includes(value.toLowerCase()))
        .forEach(file => {
          suggestions.push({
            type: 'file',
            label: file,
            icon: <FileText className="w-4 h-4" />,
            description: 'Recent file'
          })
        })
    }

    return suggestions.slice(0, 8) // Limit to 8 suggestions
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setSuggestions(generateSuggestions(value))
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

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'token') {
      const words = query.split(' ')
      words[words.length - 1] = suggestion.label
      setQuery(words.join(' '))
    } else {
      setQuery(suggestion.label)
    }
    setSuggestions([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setSuggestions([])
    setSelectedIndex(-1)
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (query.length === 0) {
      setSuggestions(generateSuggestions(''))
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
        <div className={`relative transition-all duration-200 ease-out ${
          isFocused ? 'max-w-[864px]' : 'max-w-[720px]'
        }`}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="w-full pl-12 pr-20 py-3 bg-input-background border-border rounded-xl focus:bg-background transition-all duration-200"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              /
            </kbd>
            <button
              type="button"
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Voice search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Enhanced suggestions dropdown */}
      {suggestions.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-1 duration-200">
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.label}-${index}`}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${
                  index === selectedIndex 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion.icon && (
                  <div className="flex-shrink-0 text-muted-foreground">
                    {suggestion.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className={`truncate ${
                    suggestion.type === 'token' ? 'font-mono text-sm' : ''
                  }`}>
                    {suggestion.label}
                  </div>
                  {suggestion.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {suggestion.description}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}