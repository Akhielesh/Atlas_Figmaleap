'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface FilterChip {
  id: string
  label: string
  value: string
}

interface FilterChipProps {
  filter: FilterChip
  onRemove: (id: string) => void
}

function FilterChip({ filter, onRemove }: FilterChipProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    // Delay removal to show animation
    setTimeout(() => {
      onRemove(filter.id)
    }, 150)
  }

  return (
    <Badge 
      variant="secondary" 
      className={`
        flex items-center gap-2 px-3 py-1.5 text-sm
        atlas-hover hover:bg-accent hover:shadow-sm
        ${isRemoving ? 'animate-out scale-out-95 fade-out-0 duration-150' : 'atlas-animate-scale-in'}
      `}
    >
      <span className="font-medium text-muted-foreground">
        {filter.label}
      </span>
      <span className="text-foreground">
        {filter.value}
      </span>
      
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className={`
                h-4 w-4 p-0 ml-1 text-muted-foreground 
                atlas-hover hover:text-destructive hover:bg-destructive/10
                rounded-full
              `}
              aria-label={`Remove ${filter.label}${filter.value} filter`}
            >
              <X className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="atlas-animate-fade-in">
            <p>Remove filter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  )
}

interface FilterChipGroupProps {
  filters: FilterChip[]
  onRemoveFilter: (id: string) => void
  className?: string
}

export function FilterChipGroup({ 
  filters, 
  onRemoveFilter, 
  className = "" 
}: FilterChipGroupProps) {
  if (filters.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground self-center atlas-animate-fade-in">
        Active filters:
      </span>
      
      {filters.map((filter, index) => (
        <div
          key={filter.id}
          className={`atlas-animate-slide-in atlas-stagger-${Math.min(index + 1, 3)}`}
        >
          <FilterChip 
            filter={filter} 
            onRemove={onRemoveFilter} 
          />
        </div>
      ))}
      
      {filters.length > 1 && (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => filters.forEach(f => onRemoveFilter(f.id))}
                className="h-7 px-2 text-xs text-muted-foreground atlas-hover hover:text-destructive"
              >
                Clear all
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="atlas-animate-fade-in">
              <p>Remove all filters</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}