'use client'

import React, { useState } from 'react'
import { 
  ArrowUpDown, ArrowUp, ArrowDown, List, Grid, 
  Calendar, FileText, User, Star, Zap, Clock, Hash
} from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

export type SortOption = 'relevance' | 'modified' | 'created' | 'name' | 'size' | 'owner' | 'starred'
export type SortOrder = 'asc' | 'desc'
export type ViewMode = 'list' | 'grid'
export type DensityMode = 'comfortable' | 'compact'

interface SortConfig {
  id: SortOption
  label: string
  icon: React.ReactNode
  description: string
  supportsOrder: boolean
  defaultOrder: SortOrder
}

const SORT_OPTIONS: SortConfig[] = [
  {
    id: 'relevance',
    label: 'Relevance',
    icon: <Zap className="icon-sm" />,
    description: 'Most relevant results first',
    supportsOrder: false,
    defaultOrder: 'desc'
  },
  {
    id: 'modified',
    label: 'Last Modified',
    icon: <Clock className="icon-sm" />,
    description: 'Recently modified files first',
    supportsOrder: true,
    defaultOrder: 'desc'
  },
  {
    id: 'created',
    label: 'Date Created',
    icon: <Calendar className="icon-sm" />,
    description: 'Recently created files first',
    supportsOrder: true,
    defaultOrder: 'desc'
  },
  {
    id: 'name',
    label: 'Name',
    icon: <FileText className="icon-sm" />,
    description: 'Alphabetical order',
    supportsOrder: true,
    defaultOrder: 'asc'
  },
  {
    id: 'size',
    label: 'File Size',
    icon: <Hash className="icon-sm" />,
    description: 'Largest files first',
    supportsOrder: true,
    defaultOrder: 'desc'
  },
  {
    id: 'owner',
    label: 'Owner',
    icon: <User className="icon-sm" />,
    description: 'Grouped by file owner',
    supportsOrder: true,
    defaultOrder: 'asc'
  },
  {
    id: 'starred',
    label: 'Starred',
    icon: <Star className="icon-sm" />,
    description: 'Starred files first',
    supportsOrder: true,
    defaultOrder: 'desc'
  }
]

interface EnhancedSortingControlsProps {
  currentSort: SortOption
  currentOrder: SortOrder
  viewMode: ViewMode
  density?: DensityMode
  resultCount: number
  isLoading?: boolean
  onSortChange: (sort: SortOption, order: SortOrder) => void
  onViewModeChange: (mode: ViewMode) => void
  onDensityChange?: (density: DensityMode) => void
  showDensityControl?: boolean
  className?: string
}

export function EnhancedSortingControls({
  currentSort,
  currentOrder,
  viewMode,
  density = 'comfortable',
  resultCount,
  isLoading = false,
  onSortChange,
  onViewModeChange,
  onDensityChange,
  showDensityControl = true,
  className = ""
}: EnhancedSortingControlsProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const currentSortConfig = SORT_OPTIONS.find(option => option.id === currentSort)
  
  const handleSortChange = (newSort: SortOption) => {
    const sortConfig = SORT_OPTIONS.find(option => option.id === newSort)
    if (!sortConfig) return
    
    if (newSort === currentSort && sortConfig.supportsOrder) {
      // Toggle order if same sort is selected
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc'
      onSortChange(newSort, newOrder)
    } else {
      // Use default order for new sort
      onSortChange(newSort, sortConfig.defaultOrder)
    }
  }

  const getSortTooltip = () => {
    if (!currentSortConfig) return 'Sort results'
    
    const baseText = `Sorted by ${currentSortConfig.label}`
    if (!currentSortConfig.supportsOrder) return baseText
    
    const orderText = currentOrder === 'asc' ? 'Ascending' : 'Descending'
    return `${baseText} • ${orderText}`
  }

  const getOrderIcon = () => {
    if (!currentSortConfig?.supportsOrder) return null
    return currentOrder === 'asc' ? <ArrowUp className="icon-xs" /> : <ArrowDown className="icon-xs" />
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Left side - Result count and sort */}
      <div className="flex items-center gap-4">
        {/* Result count */}
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              Searching...
            </span>
          ) : (
            <span>
              {resultCount === 0 ? 'No results' : `${resultCount.toLocaleString()} result${resultCount !== 1 ? 's' : ''}`}
            </span>
          )}
        </div>

        <Separator orientation="vertical" className="h-4" />

        {/* Sort controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Select value={currentSort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-auto h-8 gap-2 border-0 bg-transparent hover:bg-accent atlas-focus-ring">
                      <SelectValue asChild>
                        <div className="flex items-center gap-2">
                          {currentSortConfig?.icon}
                          <span className="text-sm font-medium">{currentSortConfig?.label}</span>
                          {getOrderIcon()}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="min-w-[200px]">
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.id} 
                          value={option.id}
                          className="flex items-center gap-2 py-2"
                        >
                          <div className="flex items-center gap-2 w-full">
                            {option.icon}
                            <div className="flex-1">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {option.description}
                              </div>
                            </div>
                            {option.id === currentSort && getOrderIcon()}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getSortTooltip()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Order toggle button for sortable fields */}
          {currentSortConfig?.supportsOrder && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSortChange(currentSort, currentOrder === 'asc' ? 'desc' : 'asc')}
                    className="h-8 w-8 p-0 atlas-hover atlas-focus-ring touch-target"
                    aria-label={`Sort ${currentOrder === 'asc' ? 'descending' : 'ascending'}`}
                  >
                    <ArrowUpDown className="icon-sm" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle sort order ({currentOrder === 'asc' ? 'ascending' : 'descending'})</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      {/* Right side - View and density controls */}
      <div className="flex items-center gap-2">
        {/* Density control */}
        {showDensityControl && onDensityChange && (
          <>
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Select value={density} onValueChange={onDensityChange}>
                    <SelectTrigger className="w-auto h-8 gap-1 border-0 bg-transparent hover:bg-accent atlas-focus-ring">
                      <SelectValue asChild>
                        <Badge variant="outline" className="text-xs px-2">
                          {density === 'comfortable' ? 'Comfortable' : 'Compact'}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comfortable">
                        <div>
                          <div className="font-medium">Comfortable</div>
                          <div className="text-xs text-muted-foreground">More spacing</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="compact">
                        <div>
                          <div className="font-medium">Compact</div>
                          <div className="text-xs text-muted-foreground">Less spacing</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Result density: {density}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-4" />
          </>
        )}

        {/* View mode toggle */}
        <div className="flex items-center border border-border rounded-md">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                  className="h-8 w-8 p-0 rounded-r-none atlas-hover atlas-focus-ring touch-target"
                  aria-label="List view"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>List view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewModeChange('grid')}
                  className="h-8 w-8 p-0 rounded-l-none atlas-hover atlas-focus-ring touch-target"
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grid view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

// Sort indicator component for use in headers
interface SortIndicatorProps {
  active: boolean
  order?: SortOrder
  onClick?: () => void
  label: string
  className?: string
}

export function SortIndicator({ 
  active, 
  order, 
  onClick, 
  label, 
  className = "" 
}: SortIndicatorProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={`
              h-auto p-0 justify-start font-medium atlas-hover atlas-focus-ring
              ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              ${className}
            `}
          >
            <span>{label}</span>
            {active && order && (
              <span className="ml-1">
                {order === 'asc' ? <ArrowUp className="icon-xs" /> : <ArrowDown className="icon-xs" />}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {active 
              ? `Sorted by ${label} (${order === 'asc' ? 'ascending' : 'descending'})` 
              : `Sort by ${label}`
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Hook for managing sort state
export function useSorting(initialSort: SortOption = 'relevance', initialOrder: SortOrder = 'desc') {
  const [currentSort, setCurrentSort] = useState(initialSort)
  const [currentOrder, setCurrentOrder] = useState(initialOrder)

  const handleSortChange = (sort: SortOption, order: SortOrder) => {
    setCurrentSort(sort)
    setCurrentOrder(order)
  }

  const getSortFunction = <T extends Record<string, any>>(
    getField: (item: T, field: SortOption) => any
  ) => {
    return (a: T, b: T): number => {
      if (currentSort === 'relevance') return 0 // Maintain original order for relevance
      
      const aValue = getField(a, currentSort)
      const bValue = getField(b, currentSort)
      
      let comparison = 0
      if (aValue < bValue) comparison = -1
      if (aValue > bValue) comparison = 1
      
      return currentOrder === 'asc' ? comparison : -comparison
    }
  }

  return {
    currentSort,
    currentOrder,
    handleSortChange,
    getSortFunction
  }
}