'use client'

import React, { useState } from 'react'
import { 
  X, ChevronDown, ChevronUp, Filter, Trash2, 
  CheckSquare, Square, Minus, AlertCircle
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Alert, AlertDescription } from './ui/alert'
import { useNotifications } from './GlobalNotificationBar'

export interface FilterOption {
  id: string
  label: string
  count: number
  selected: boolean
  disabled?: boolean
  disabledReason?: string
}

export interface FilterSection {
  id: string
  title: string
  collapsed: boolean
  options: FilterOption[]
  multiSelect?: boolean
  required?: boolean
}

export interface AppliedFilter {
  id: string
  sectionId: string
  optionId: string
  label: string
  value: string
  removable?: boolean
}

interface EnhancedFiltersPanelProps {
  sections: FilterSection[]
  appliedFilters: AppliedFilter[]
  onFilterChange: (sectionId: string, optionId: string, selected: boolean) => void
  onToggleSection: (sectionId: string) => void
  onRemoveFilter: (filterId: string) => void
  onClearAll: () => void
  isLoading?: boolean
  className?: string
}

export function EnhancedFiltersPanel({
  sections,
  appliedFilters,
  onFilterChange,
  onToggleSection,
  onRemoveFilter,
  onClearAll,
  isLoading = false,
  className = ""
}: EnhancedFiltersPanelProps) {
  const [isConfirmingClear, setIsConfirmingClear] = useState(false)
  const { showSuccess, showInfo } = useNotifications()

  const handleClearAll = () => {
    if (appliedFilters.length === 0) return

    if (!isConfirmingClear) {
      setIsConfirmingClear(true)
      setTimeout(() => setIsConfirmingClear(false), 3000) // Auto-cancel after 3s
      return
    }

    onClearAll()
    setIsConfirmingClear(false)
    showSuccess(`Cleared ${appliedFilters.length} filters`)
  }

  const getSelectionState = (section: FilterSection) => {
    const selectedCount = section.options.filter(opt => opt.selected).length
    const totalCount = section.options.length
    
    if (selectedCount === 0) return 'none'
    if (selectedCount === totalCount) return 'all'
    return 'some'
  }

  const handleSectionSelectAll = (section: FilterSection) => {
    const state = getSelectionState(section)
    const newSelected = state !== 'all'
    
    section.options.forEach(option => {
      if (!option.disabled) {
        onFilterChange(section.id, option.id, newSelected)
      }
    })
  }

  return (
    <div className={`w-64 bg-card border-r border-border h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium text-sm flex items-center gap-2">
            <Filter className="icon-sm" />
            Filters
          </h2>
          
          {appliedFilters.length > 0 && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className={`
                      h-7 px-2 text-xs atlas-hover atlas-focus-ring
                      ${isConfirmingClear 
                        ? 'bg-destructive/10 text-destructive border-destructive/20' 
                        : 'text-muted-foreground hover:text-destructive'
                      }
                    `}
                  >
                    <Trash2 className="icon-xs mr-1" />
                    {isConfirmingClear ? 'Confirm' : 'Clear all'}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isConfirmingClear 
                      ? 'Click again to confirm clearing all filters' 
                      : `Clear all ${appliedFilters.length} filters`
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Applied filters count */}
        {appliedFilters.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {appliedFilters.length} filter{appliedFilters.length !== 1 ? 's' : ''} applied
          </div>
        )}
      </div>

      {/* Applied filters */}
      {appliedFilters.length > 0 && (
        <div className="p-4 border-b border-border bg-accent/30">
          <h3 className="text-xs font-medium text-muted-foreground mb-2">Active Filters</h3>
          <div className="space-y-2">
            {appliedFilters.map((filter) => (
              <AppliedFilterBadge
                key={filter.id}
                filter={filter}
                onRemove={() => onRemoveFilter(filter.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Filter sections */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {/* Loading skeleton */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                <div className="space-y-1">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-3 bg-muted rounded w-full animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {sections.map((section, index) => (
              <FilterSectionComponent
                key={section.id}
                section={section}
                onFilterChange={onFilterChange}
                onToggleSection={onToggleSection}
                onSelectAll={handleSectionSelectAll}
                isFirst={index === 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* No results warning */}
      {appliedFilters.length > 0 && (
        <div className="p-4 border-t border-border">
          <Alert>
            <AlertCircle className="icon-sm" />
            <AlertDescription className="text-xs">
              Some options may be disabled when they would result in no matches.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}

// Applied filter badge component
interface AppliedFilterBadgeProps {
  filter: AppliedFilter
  onRemove: () => void
}

function AppliedFilterBadge({ filter, onRemove }: AppliedFilterBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className="flex items-center gap-1 text-xs py-1 pl-2 pr-1 group atlas-hover"
    >
      <span className="flex items-center gap-1">
        <span className="font-medium text-muted-foreground">{filter.label}</span>
        <span>{filter.value}</span>
      </span>
      
      {filter.removable !== false && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-4 w-4 p-0 opacity-60 group-hover:opacity-100 atlas-hover atlas-focus-ring"
          aria-label={`Remove ${filter.label} ${filter.value} filter`}
        >
          <X className="icon-xs" />
        </Button>
      )}
    </Badge>
  )
}

// Individual filter section component
interface FilterSectionComponentProps {
  section: FilterSection
  onFilterChange: (sectionId: string, optionId: string, selected: boolean) => void
  onToggleSection: (sectionId: string) => void
  onSelectAll: (section: FilterSection) => void
  isFirst: boolean
}

function FilterSectionComponent({
  section,
  onFilterChange,
  onToggleSection,
  onSelectAll,
  isFirst
}: FilterSectionComponentProps) {
  const selectionState = getSelectionState(section)
  const selectedCount = section.options.filter(opt => opt.selected).length

  return (
    <div className={!isFirst ? 'pt-4 border-t border-border' : ''}>
      <Collapsible open={!section.collapsed} onOpenChange={() => onToggleSection(section.id)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-medium text-sm atlas-hover atlas-focus-ring"
          >
            <div className="flex items-center gap-2">
              <span>{section.title}</span>
              {selectedCount > 0 && (
                <Badge variant="outline" className="text-xs px-1 ml-1">
                  {selectedCount}
                </Badge>
              )}
              {section.required && (
                <span className="text-destructive text-xs">*</span>
              )}
            </div>
            {section.collapsed ? (
              <ChevronDown className="icon-sm text-muted-foreground" />
            ) : (
              <ChevronUp className="icon-sm text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3 space-y-2">
          {/* Select all option for multi-select sections */}
          {section.multiSelect && section.options.length > 1 && (
            <>
              <div className="flex items-center gap-2 py-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectAll(section)}
                  className="h-auto p-0 justify-start atlas-hover atlas-focus-ring"
                >
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    {selectionState === 'all' ? (
                      <CheckSquare className="icon-sm text-primary" />
                    ) : selectionState === 'some' ? (
                      <Minus className="icon-sm text-primary" />
                    ) : (
                      <Square className="icon-sm text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {selectionState === 'all' ? 'Deselect all' : 'Select all'}
                  </span>
                </Button>
              </div>
              <Separator />
            </>
          )}

          {/* Filter options */}
          {section.options.map((option) => (
            <FilterOptionComponent
              key={option.id}
              section={section}
              option={option}
              onFilterChange={onFilterChange}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

// Individual filter option component
interface FilterOptionComponentProps {
  section: FilterSection
  option: FilterOption
  onFilterChange: (sectionId: string, optionId: string, selected: boolean) => void
}

function FilterOptionComponent({ section, option, onFilterChange }: FilterOptionComponentProps) {
  const handleClick = () => {
    if (option.disabled) return
    onFilterChange(section.id, option.id, !option.selected)
  }

  const optionContent = (
    <div 
      className={`
        flex items-center justify-between py-1 cursor-pointer group
        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'atlas-hover'}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Checkbox
          checked={option.selected}
          disabled={option.disabled}
          className="atlas-focus-ring"
          aria-label={`Filter by ${option.label}`}
        />
        <span className={`text-sm truncate ${option.disabled ? 'text-muted-foreground' : ''}`}>
          {option.label}
        </span>
      </div>
      
      {option.count > 0 && (
        <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
          {option.count.toLocaleString()}
        </span>
      )}
    </div>
  )

  if (option.disabled && option.disabledReason) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div>
              {optionContent}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{option.disabledReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return optionContent
}

// Helper function used by multiple components
function getSelectionState(section: FilterSection) {
  const selectedCount = section.options.filter(opt => opt.selected).length
  const totalCount = section.options.length
  
  if (selectedCount === 0) return 'none'
  if (selectedCount === totalCount) return 'all'
  return 'some'
}

// Hook for managing filter state
export function useFilters(initialSections: FilterSection[]) {
  const [sections, setSections] = useState(initialSections)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const handleFilterChange = (sectionId: string, optionId: string, selected: boolean) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            options: section.options.map(option =>
              option.id === optionId ? { ...option, selected } : option
            )
          }
        : section
    ))

    if (selected) {
      const section = sections.find(s => s.id === sectionId)
      const option = section?.options.find(o => o.id === optionId)
      if (section && option) {
        setAppliedFilters(prev => [...prev, {
          id: `${sectionId}-${optionId}`,
          sectionId,
          optionId,
          label: `${section.title}:`,
          value: option.label,
          removable: true
        }])
      }
    } else {
      setAppliedFilters(prev => prev.filter(f => f.id !== `${sectionId}-${optionId}`))
    }
  }

  const handleToggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, collapsed: !section.collapsed }
        : section
    ))
  }

  const handleRemoveFilter = (filterId: string) => {
    const filter = appliedFilters.find(f => f.id === filterId)
    if (filter) {
      handleFilterChange(filter.sectionId, filter.optionId, false)
    }
  }

  const handleClearAll = () => {
    setSections(prev => prev.map(section => ({
      ...section,
      options: section.options.map(option => ({ ...option, selected: false }))
    })))
    setAppliedFilters([])
  }

  return {
    sections,
    appliedFilters,
    handleFilterChange,
    handleToggleSection,
    handleRemoveFilter,
    handleClearAll
  }
}