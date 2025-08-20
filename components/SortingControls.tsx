'use client'

import React, { useState } from 'react'
import { 
  ArrowUpDown, Calendar, FileText, Download, User, 
  Star, Clock, RotateCw, TrendingUp, Grid3X3, List
} from 'lucide-react'
import { Button } from './ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from './ui/dropdown-menu'
import { Badge } from './ui/badge'

interface SortingControlsProps {
  currentSort: string
  currentOrder: 'asc' | 'desc'
  onSortChange: (sort: string, order: 'asc' | 'desc') => void
  viewMode: 'list' | 'grid'
  onViewModeChange: (mode: 'list' | 'grid') => void
  resultCount: number
  className?: string
}

export function SortingControls({ 
  currentSort, 
  currentOrder, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultCount,
  className = "" 
}: SortingControlsProps) {
  const sortOptions = [
    { 
      value: 'relevance', 
      label: 'Relevance', 
      icon: TrendingUp,
      description: 'Best matches first'
    },
    { 
      value: 'modified', 
      label: 'Last Modified', 
      icon: Calendar,
      description: 'Recently updated files'
    },
    { 
      value: 'created', 
      label: 'Date Created', 
      icon: Clock,
      description: 'Newest files first'
    },
    { 
      value: 'name', 
      label: 'Name', 
      icon: FileText,
      description: 'Alphabetical order'
    },
    { 
      value: 'size', 
      label: 'File Size', 
      icon: Download,
      description: 'Largest files first'
    },
    { 
      value: 'owner', 
      label: 'Owner', 
      icon: User,
      description: 'Grouped by file owner'
    },
    { 
      value: 'starred', 
      label: 'Starred First', 
      icon: Star,
      description: 'Your starred items'
    }
  ]

  const getCurrentSortOption = () => {
    return sortOptions.find(option => option.value === currentSort) || sortOptions[0]
  }

  const handleSortSelect = (sortValue: string) => {
    // If selecting the same sort, toggle order
    if (sortValue === currentSort) {
      onSortChange(sortValue, currentOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // New sort option, use default order
      const defaultOrder = sortValue === 'relevance' ? 'desc' : 
                          sortValue === 'name' ? 'asc' : 'desc'
      onSortChange(sortValue, defaultOrder)
    }
  }

  const currentSortOption = getCurrentSortOption()
  const CurrentIcon = currentSortOption.icon

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {resultCount.toLocaleString()} result{resultCount !== 1 ? 's' : ''}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <CurrentIcon className="w-3 h-3 mr-2" />
                {currentSortOption.label}
                <ArrowUpDown className="w-3 h-3 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuRadioGroup value={currentSort} onValueChange={handleSortSelect}>
                {sortOptions.map((option) => {
                  const OptionIcon = option.icon
                  return (
                    <DropdownMenuRadioItem 
                      key={option.value} 
                      value={option.value}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <OptionIcon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuRadioItem>
                  )
                })}
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={() => handleSortSelect(currentSort)}
                className="cursor-pointer"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                {currentOrder === 'asc' ? 'Switch to Descending' : 'Switch to Ascending'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge variant="outline" className="text-xs">
            {currentOrder === 'asc' ? '↑' : '↓'} {currentSortOption.label}
          </Badge>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center border rounded-lg p-1">
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className="h-7 w-7 p-0"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className="h-7 w-7 p-0"
        >
          <Grid3X3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}