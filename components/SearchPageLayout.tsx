'use client'

import React from 'react'
import { Search, Home, FolderOpen, BarChart3, CheckSquare, Bell, Sun, Moon, Settings, User } from 'lucide-react'
import { useNavigation } from './NavigationManager'
import { EnhancedSearchInput, EmptyQueryState } from './EnhancedSearchInput'
import { EnhancedFiltersPanel } from './EnhancedFiltersPanel'
import { EnhancedResultCard, EmptyState } from './EnhancedResultCard'
import { EnhancedPreviewPanel } from './EnhancedPreviewPanel'
import { EnhancedSortingControls } from './EnhancedSortingControls'
import { PaginationControls, InfiniteScrollLoader, ResultListSkeleton } from './PaginationControls'
import { ResizableLayout } from './ResizableLayout'
import { HeaderButton } from './HeaderButton'
import { NotificationsCenter } from './NotificationsCenter'
import { KeyboardShortcutsHelp, Focusable } from './KeyboardShortcuts'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Alert, AlertDescription } from './ui/alert'
import type { UserData, ViewMode, SortOption, PaginationMode } from '../types'

interface SearchPageLayoutProps {
  // Auth state
  isAuthenticated: boolean
  user: UserData | null
  
  // UI state
  isDark: boolean
  setIsDark: (dark: boolean) => void
  isOffline: boolean
  
  // Search state
  query: string
  setQuery: (query: string) => void
  isLoading: boolean
  hasError: boolean
  results: any[]
  totalResults: number
  appliedFilters: any[]
  hasConnectedAccounts: boolean
  recentSearches: string[]
  
  // View state
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  density: any
  setDensity: (density: any) => void
  
  // Sorting state
  currentSort: SortOption
  currentOrder: 'asc' | 'desc'
  
  // Pagination state
  currentPage: number
  pageSize: number
  totalPages: number
  paginationMode: PaginationMode
  hasNextPage: boolean
  hasPreviousPage: boolean
  loadingRef: React.RefObject<HTMLDivElement>
  isFetching: boolean
  
  // Selection state
  selectedItems: string[]
  isSelectionMode: boolean
  selectedResult: string | null
  previewItem: any | null
  previewState: any
  
  // Filter state
  filterSections: any[]
  
  // Handlers
  onSearch: (query: string, metadata?: any) => void
  onClearSearch: () => void
  onSortChange: (sort: SortOption, order: 'asc' | 'desc') => void
  onFilterChange: (sectionId: string, optionId: string, selected: boolean) => void
  onToggleSection: (sectionId: string) => void
  onRemoveFilter: (filterId: string) => void
  onClearAllFilters: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  onLoadMore: () => void
  onSelectResult: (item: any) => void
  onToggleSelection: (itemId: string) => void
  onSelectAll: () => void
  onClosePreview: () => void
  onOpenInApp: (item: any) => void
  onSetSelectionMode: (mode: boolean) => void
  
  // Other props
  shortcuts: any[]
}

export function SearchPageLayout({
  isAuthenticated,
  user,
  isDark,
  setIsDark,
  isOffline,
  query,
  setQuery,
  isLoading,
  hasError,
  results,
  totalResults,
  appliedFilters,
  hasConnectedAccounts,
  recentSearches,
  viewMode,
  setViewMode,
  density,
  setDensity,
  currentSort,
  currentOrder,
  currentPage,
  pageSize,
  totalPages,
  paginationMode,
  hasNextPage,
  hasPreviousPage,
  loadingRef,
  isFetching,
  selectedItems,
  isSelectionMode,
  selectedResult,
  previewItem,
  previewState,
  filterSections,
  onSearch,
  onClearSearch,
  onSortChange,
  onFilterChange,
  onToggleSection,
  onRemoveFilter,
  onClearAllFilters,
  onPageChange,
  onPageSizeChange,
  onLoadMore,
  onSelectResult,
  onToggleSelection,
  onSelectAll,
  onClosePreview,
  onOpenInApp,
  onSetSelectionMode,
  shortcuts
}: SearchPageLayoutProps) {
  const { navigateTo } = useNavigation()

  const leftPanel = (
    <Focusable id="filters-panel">
      <EnhancedFiltersPanel
        sections={filterSections}
        appliedFilters={appliedFilters}
        onFilterChange={onFilterChange}
        onToggleSection={onToggleSection}
        onRemoveFilter={onRemoveFilter}
        onClearAll={onClearAllFilters}
        isLoading={isLoading}
      />
    </Focusable>
  )

  const centerPanel = (
    <>
      {isOffline && (
        <Alert className="m-4 border-warning bg-warning/10">
          <AlertDescription className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            You're offline. Some features may be limited.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1 p-6">
        {query || appliedFilters.length > 0 || hasConnectedAccounts ? (
          <>
            <div className="mb-6">
              <EnhancedSortingControls
                currentSort={currentSort}
                currentOrder={currentOrder}
                viewMode={viewMode}
                density={density}
                resultCount={results.length}
                isLoading={isLoading}
                onSortChange={onSortChange}
                onViewModeChange={setViewMode}
                onDensityChange={setDensity}
              />
            </div>

            {results.length > 0 && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === results.length}
                    onCheckedChange={onSelectAll}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground atlas-focus atlas-focus-ring touch-target"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetSelectionMode(!isSelectionMode)}
                    className={`atlas-hover atlas-button-states touch-target ${isSelectionMode ? 'bg-accent' : ''}`}
                  >
                    <CheckSquare className="icon-sm mr-2" />
                    Select
                  </Button>
                  
                  {selectedItems.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {selectedItems.length} selected
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {isLoading && results.length === 0 ? (
              <ResultListSkeleton density={density} itemCount={5} />
            ) : results.length > 0 ? (
              <>
                <div className={`atlas-animate-fade-in ${
                  viewMode === 'grid' ? 'atlas-grid' : 'space-y-3'
                }`}>
                  {results.map((result, index) => (
                    <div key={result.id} className={`relative atlas-stagger-${Math.min(index + 1, 3)}`}>
                      {isSelectionMode && (
                        <div className="absolute left-4 top-4 z-10">
                          <Checkbox
                            checked={selectedItems.includes(result.id)}
                            onCheckedChange={() => onToggleSelection(result.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground atlas-focus atlas-focus-ring touch-target"
                          />
                        </div>
                      )}
                      <EnhancedResultCard
                        item={result}
                        selected={selectedResult === result.id}
                        layout={viewMode}
                        size={density === 'compact' ? 'compact' : 'default'}
                        onSelect={onSelectResult}
                        onOpen={() => onOpenInApp(result)}
                        onStar={() => console.log('Star:', result.title)}
                        onShare={() => console.log('Share:', result.title)}
                        onDownload={() => console.log('Download:', result.title)}
                        className={isSelectionMode ? 'pl-12' : ''}
                      />
                    </div>
                  ))}
                </div>

                {paginationMode === 'traditional' ? (
                  <PaginationControls
                    mode="traditional"
                    density={density}
                    data={{
                      currentPage,
                      totalPages,
                      totalItems: totalResults,
                      itemsPerPage: pageSize,
                      hasNextPage,
                      hasPreviousPage
                    }}
                    isLoading={isLoading}
                    hasError={hasError}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    onDensityChange={setDensity}
                    onRetry={() => onPageChange(currentPage)}
                    className="mt-8"
                  />
                ) : (
                  <>
                    <div ref={loadingRef} />
                    <InfiniteScrollLoader
                      isVisible={currentPage * pageSize < totalResults}
                      isLoading={isLoading || isFetching}
                      hasError={hasError}
                      onRetry={onLoadMore}
                    />
                  </>
                )}
              </>
            ) : (
              <EmptyState
                title="No results found"
                description="Try adjusting your search terms or removing some filters."
                action={{
                  label: "Clear filters",
                  onClick: onClearAllFilters
                }}
                icon={<Search className="w-full h-full" />}
              />
            )}
          </>
        ) : (
          <EmptyQueryState
            onSuggestionClick={onSearch}
            recentSearches={recentSearches}
          />
        )}
      </div>
    </>
  )

  const rightPanel = previewItem ? (
    <Focusable id="preview-panel">
      <EnhancedPreviewPanel
        item={previewItem}
        state={previewState}
        onClose={onClosePreview}
        onOpen={() => onOpenInApp(previewItem)}
        onShare={() => {
          navigator.clipboard.writeText(window.location.href)
          // showSuccess would be called from parent component
        }}
        onStar={() => console.log('Star file')}
        onDownload={() => console.log('Download file')}
      />
    </Focusable>
  ) : (
    <div className="w-80 bg-card border-l border-border p-6 flex items-center justify-center">
      <div className="text-center text-muted-foreground">
        <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>Select a file to preview</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 touch-target flex items-center">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 atlas-logo atlas-hover atlas-focus-ring touch-target"
              >
                <Search className="icon-lg" />
                <span className="text-lg font-semibold">Atlas</span>
              </button>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8" data-search-input>
              <EnhancedSearchInput
                value={query}
                onChange={setQuery}
                onSearch={onSearch}
                onClear={onClearSearch}
                isLoading={isLoading}
                hasFilters={appliedFilters.length > 0}
                showSuggestions={true}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <HeaderButton
                icon={<Home className="icon-sm" />}
                tooltip="Home (⌘H)"
                onClick={() => navigateTo('home')}
              />
              <HeaderButton
                icon={<FolderOpen className="icon-sm" />}
                tooltip="Collections (⌘C)"
                onClick={() => navigateTo('collections')}
              />
              <HeaderButton
                icon={<BarChart3 className="icon-sm" />}
                tooltip="Analytics (⌘A)"
                onClick={() => navigateTo('analytics')}
              />
              <NotificationsCenter />
              <KeyboardShortcutsHelp 
                shortcuts={shortcuts}
                trigger={
                  <HeaderButton
                    icon={<Bell className="icon-sm" />}
                    tooltip="Keyboard shortcuts (?)"
                  />
                }
              />
              <HeaderButton
                icon={isDark ? <Sun className="icon-sm" /> : <Moon className="icon-sm" />}
                tooltip={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => setIsDark(!isDark)}
                isThemeToggle={true}
              />
              <HeaderButton
                icon={<Settings className="icon-sm" />}
                tooltip="Settings (⌘,)"
                onClick={() => navigateTo('settings')}
              />
              <HeaderButton
                icon={<User className="icon-sm" />}
                tooltip="Profile"
                onClick={() => navigateTo('profile')}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <ResizableLayout
          leftPanel={leftPanel}
          centerPanel={centerPanel}
          rightPanel={rightPanel}
        />
      </main>
    </div>
  )
}