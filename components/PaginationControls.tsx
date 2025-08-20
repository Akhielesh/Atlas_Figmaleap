'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal, Loader2, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Skeleton } from './ui/skeleton'

export type PaginationMode = 'traditional' | 'infinite'
export type DensityMode = 'comfortable' | 'compact'

interface PaginationData {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface PaginationControlsProps {
  mode?: PaginationMode
  density?: DensityMode
  data: PaginationData
  isLoading?: boolean
  hasError?: boolean
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  onDensityChange?: (density: DensityMode) => void
  onRetry?: () => void
  className?: string
}

export function PaginationControls({
  mode = 'traditional',
  density = 'comfortable',
  data,
  isLoading = false,
  hasError = false,
  onPageChange,
  onPageSizeChange,
  onDensityChange,
  onRetry,
  className = ""
}: PaginationControlsProps) {
  const { currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, hasPreviousPage } = data

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const formatItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return `${start.toLocaleString()}-${end.toLocaleString()} of ${totalItems.toLocaleString()}`
  }

  if (mode === 'traditional') {
    return (
      <div className={`flex items-center justify-between py-4 ${className}`}>
        {/* Left side - Density and items per page */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>View:</span>
            <Select value={density} onValueChange={onDensityChange}>
              <SelectTrigger className="w-32 h-8 text-xs atlas-focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="compact">Compact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span>Show:</span>
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => onPageSizeChange?.(parseInt(value))}
            >
              <SelectTrigger className="w-20 h-8 text-xs atlas-focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span>{formatItemRange()}</span>
        </div>

        {/* Right side - Pagination controls */}
        <div className="flex items-center gap-2">
          {hasError ? (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <span>Failed to load results</span>
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-8 px-3 text-xs atlas-hover atlas-focus-ring"
              >
                <RefreshCw className="icon-xs mr-1" />
                Retry
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={!hasPreviousPage || isLoading}
                className="h-8 px-3 text-xs atlas-hover atlas-focus-ring touch-target"
                aria-label="Previous page"
              >
                <ChevronLeft className="icon-xs mr-1" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {getVisiblePages().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <div className="flex items-center justify-center w-8 h-8">
                        <MoreHorizontal className="icon-xs text-muted-foreground" />
                      </div>
                    ) : (
                      <Button
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange?.(page as number)}
                        disabled={isLoading}
                        className={`
                          w-8 h-8 p-0 text-xs atlas-hover atlas-focus-ring touch-target
                          ${page === currentPage ? 'bg-primary text-primary-foreground' : ''}
                        `}
                        aria-label={`Page ${page}`}
                        aria-current={page === currentPage ? 'page' : undefined}
                      >
                        {page}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={!hasNextPage || isLoading}
                className="h-8 px-3 text-xs atlas-hover atlas-focus-ring touch-target"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="icon-xs ml-1" />
              </Button>
            </>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="icon-sm animate-spin" />
              <span>Loading...</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Infinite scroll mode - just show loading state at bottom
  return null
}

// Infinite scroll hook
export function useInfiniteScroll(
  hasNextPage: boolean,
  isLoading: boolean,
  onLoadMore: () => void,
  threshold = 100
) {
  const [isFetching, setIsFetching] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  const loadingRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting && hasNextPage && !isLoading && !isFetching) {
      setIsFetching(true)
      onLoadMore()
    }
  }, [hasNextPage, isLoading, isFetching, onLoadMore])

  useEffect(() => {
    if (loadingRef.current && hasNextPage) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        rootMargin: `${threshold}px`
      })
      observerRef.current.observe(loadingRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [handleObserver, hasNextPage, threshold])

  useEffect(() => {
    if (!isLoading) {
      setIsFetching(false)
    }
  }, [isLoading])

  return { loadingRef, isFetching }
}

// Infinite scroll loading indicator
interface InfiniteScrollLoaderProps {
  isVisible: boolean
  isLoading: boolean
  hasError: boolean
  onRetry?: () => void
  className?: string
}

export function InfiniteScrollLoader({
  isVisible,
  isLoading,
  hasError,
  onRetry,
  className = ""
}: InfiniteScrollLoaderProps) {
  if (!isVisible) return null

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      {hasError ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">Failed to load more results</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="atlas-hover atlas-focus-ring"
          >
            <RefreshCw className="icon-sm mr-2" />
            Try again
          </Button>
        </div>
      ) : isLoading ? (
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="icon-md animate-spin" />
          <span className="text-sm">Loading more results...</span>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          End of results
        </div>
      )}
    </div>
  )
}

// Result density context
export function useResultDensity() {
  const [density, setDensity] = useState<DensityMode>('comfortable')

  const getRowHeight = () => density === 'compact' ? 'h-16' : 'h-20'
  const getSpacing = () => density === 'compact' ? 'gap-2' : 'gap-3'
  const getPadding = () => density === 'compact' ? 'card-padding-sm' : 'card-padding'
  const getTextSize = () => density === 'compact' ? 'text-xs' : 'text-sm'

  return {
    density,
    setDensity,
    getRowHeight,
    getSpacing,
    getPadding,
    getTextSize
  }
}

// Loading skeleton for result lists
export function ResultListSkeleton({ 
  density = 'comfortable',
  itemCount = 5 
}: { 
  density?: DensityMode
  itemCount?: number 
}) {
  const height = density === 'compact' ? 'h-16' : 'h-20'
  const padding = density === 'compact' ? 'p-3' : 'p-4'

  return (
    <div className="space-y-3">
      {Array.from({ length: itemCount }).map((_, i) => (
        <div 
          key={i} 
          className={`
            ${height} ${padding} border border-border rounded-lg
            flex items-center gap-4 animate-pulse
            atlas-stagger-${Math.min(i + 1, 5)}
          `}
        >
          <Skeleton className="w-10 h-10 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}