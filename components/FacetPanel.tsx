'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface FacetOption {
  id: string
  label: string
  count: number
  selected: boolean
}

interface FacetSection {
  id: string
  title: string
  collapsed: boolean
  options: FacetOption[]
}

interface FacetPanelProps {
  sections: FacetSection[]
  onFacetChange: (sectionId: string, optionId: string, selected: boolean) => void
  onToggleSection: (sectionId: string) => void
  className?: string
}

export function FacetPanel({ sections, onFacetChange, onToggleSection, className = "" }: FacetPanelProps) {
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({})

  const handleSearchChange = (sectionId: string, term: string) => {
    setSearchTerms(prev => ({ ...prev, [sectionId]: term }))
  }

  const filterOptions = (options: FacetOption[], searchTerm: string) => {
    if (!searchTerm) return options
    return options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getSelectedCount = (options: FacetOption[]) => {
    return options.filter(option => option.selected).length
  }

  return (
    <div className={`w-full p-4 bg-card border-r border-border ${className}`}>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => {
          const searchTerm = searchTerms[section.id] || ''
          const filteredOptions = filterOptions(section.options, searchTerm)
          const selectedCount = getSelectedCount(section.options)

          return (
            <div 
              key={section.id} 
              className={`atlas-animate-fade-in atlas-stagger-${Math.min(sectionIndex + 1, 3)}`}
            >
              {/* Section Header */}
              <Button
                variant="ghost"
                onClick={() => onToggleSection(section.id)}
                className="w-full justify-between p-0 h-auto font-medium text-left atlas-hover atlas-focus-ring"
              >
                <div className="flex items-center gap-2">
                  <span>{section.title}</span>
                  {selectedCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-1.5 py-0.5 atlas-animate-fade-in"
                    >
                      {selectedCount}
                    </Badge>
                  )}
                </div>
                
                <div className="atlas-panel">
                  {section.collapsed ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </Button>

              {/* Section Content */}
              <div 
                className={`
                  overflow-hidden atlas-panel
                  ${section.collapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100 mt-3'}
                `}
              >
                {/* Search within section */}
                {section.options.length > 5 && (
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      placeholder={`Search ${section.title.toLowerCase()}...`}
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(section.id, e.target.value)}
                      className="pl-9 h-8 text-sm atlas-focus"
                    />
                  </div>
                )}

                {/* Options */}
                <div className="space-y-2">
                  {filteredOptions.map((option, optionIndex) => (
                    <TooltipProvider key={option.id}>
                      <Tooltip delayDuration={500}>
                        <TooltipTrigger asChild>
                          <div 
                            className={`
                              flex items-center justify-between p-2 rounded-md cursor-pointer
                              atlas-hover hover:bg-accent/50
                              atlas-animate-fade-in atlas-stagger-${Math.min(optionIndex + 1, 3)}
                            `}
                            onClick={() => onFacetChange(section.id, option.id, !option.selected)}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Checkbox
                                checked={option.selected}
                                onChange={() => {}} // Handled by parent click
                                className={`
                                  atlas-focus
                                  data-[state=checked]:bg-primary 
                                  data-[state=checked]:text-primary-foreground
                                  ${option.selected ? 'atlas-animate-scale-in' : ''}
                                `}
                              />
                              <span 
                                className={`
                                  text-sm truncate
                                  ${option.selected ? 'font-medium text-foreground' : 'text-muted-foreground'}
                                  atlas-hover
                                `}
                              >
                                {option.label}
                              </span>
                            </div>
                            
                            <Badge 
                              variant="outline" 
                              className={`
                                text-xs px-1.5 py-0.5 ml-2 flex-shrink-0
                                ${option.selected ? 'bg-primary/10 text-primary border-primary/20' : ''}
                                atlas-animate-fade-in
                              `}
                            >
                              {option.count}
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        {option.label.length > 20 && (
                          <TooltipContent side="right" className="atlas-animate-fade-in">
                            <p>{option.label}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                  
                  {filteredOptions.length === 0 && searchTerm && (
                    <div className="text-sm text-muted-foreground text-center py-4 atlas-animate-fade-in">
                      No {section.title.toLowerCase()} found for "{searchTerm}"
                    </div>
                  )}
                  
                  {section.options.length > 10 && !searchTerm && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2 text-xs atlas-hover"
                      onClick={() => {
                        // Show more options logic
                        console.log('Show more options for', section.id)
                      }}
                    >
                      Show more...
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}