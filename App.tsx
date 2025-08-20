'use client'

import React, { useState, useEffect } from 'react'
import { NavigationProvider, useNavigation } from './components/NavigationManager'
import { FocusProvider, useAtlasShortcuts, useFocusReturn } from './components/KeyboardShortcuts'
import { useFilters } from './components/EnhancedFiltersPanel'
import { useSorting } from './components/EnhancedSortingControls'
import { useInfiniteScroll, useResultDensity } from './components/PaginationControls'
import { UnifiedBulkActionsBar, useBulkActionShortcuts } from './components/UnifiedBulkActionsBar'
import { CommandPalette } from './components/CommandPalette'
import { OnboardingWalkthrough, FeatureHighlight } from './components/OnboardingWalkthrough'
import { GlobalNotificationBar, useNotifications } from './components/GlobalNotificationBar'
import { PageRouter } from './components/PageRouter'
import { SearchPageLayout } from './components/SearchPageLayout'
import { 
  useAuthHandlers, 
  useSearchHandlers, 
  usePaginationHandlers,
  useSelectionHandlers,
  usePreviewHandlers,
  useOpenInAppHandler,
  useBulkActionHandler
} from './hooks/useAppHandlers'
import { initialFilterSections } from './constants/mockData'
import type { PaginationMode } from './types'

function AppContent() {
  const { navigationState, navigateTo } = useNavigation()
  
  // Authentication
  const { 
    isAuthenticated, 
    user, 
    hasConnectedAccounts,
    setHasConnectedAccounts,
    handleSignIn, 
    handleStartTrial, 
    handleAuthSuccess, 
    handleSignOut 
  } = useAuthHandlers()
  
  // Search
  const {
    query,
    setQuery,
    isLoading,
    hasError,
    results,
    setResults,
    totalResults,
    setTotalResults,
    recentSearches,
    handleSearch,
    handleClearSearch
  } = useSearchHandlers()

  // UI state
  const [isDark, setIsDark] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [pageSize, setPageSize] = useState(25)
  const [paginationMode, setPaginationMode] = useState<PaginationMode>('traditional')
  
  // Advanced features
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)
  const [showFeatureHighlight, setShowFeatureHighlight] = useState(false)
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)

  // Hooks
  const { sections: filterSections, appliedFilters, handleFilterChange, handleToggleSection, handleRemoveFilter, handleClearAll } = useFilters(initialFilterSections)
  const { currentSort, currentOrder, handleSortChange } = useSorting()
  const { density, setDensity } = useResultDensity()
  const { notifications, dismissNotification, showInfo, showSuccess } = useNotifications()
  
  // Pagination
  const { currentPage, setCurrentPage, handlePageChange, handleLoadMore } = usePaginationHandlers(pageSize, setResults, () => {})
  
  // Selection
  const { selectedItems, isSelectionMode, setIsSelectionMode, handleToggleSelection, handleSelectAll, handleClearSelection } = useSelectionHandlers()
  
  // Preview
  const { selectedResult, previewItem, previewState, handleSelectResult, handleClosePreview } = usePreviewHandlers()
  
  // Actions
  const { handleOpenInApp } = useOpenInAppHandler()
  const { handleBulkAction: bulkActionHandler } = useBulkActionHandler()
  
  // Infinite scroll
  const { loadingRef, isFetching } = useInfiniteScroll(
    currentPage * pageSize < totalResults,
    isLoading,
    () => {
      if (paginationMode === 'infinite') {
        handleLoadMore(totalResults)
      }
    }
  )

  // Keyboard shortcuts
  const shortcuts = useAtlasShortcuts(
    navigateTo,
    () => document.querySelector('[data-search-input] input')?.focus(),
    () => setIsCommandPaletteOpen(true),
    () => setShowShortcutsHelp(true)
  )

  // Bulk action shortcuts
  useBulkActionShortcuts(
    (action) => bulkActionHandler(action, selectedItems.length, handleClearSelection),
    selectedItems.length > 0
  )

  // Focus return for modals
  useFocusReturn(isCommandPaletteOpen, 'command-palette')
  useFocusReturn(showShortcutsHelp, 'shortcuts-dialog')

  // Dark mode and offline detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      mediaQuery.removeEventListener('change', handler)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Pagination handlers
  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
    handlePageChange(1)
  }

  // Onboarding
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigateTo('search')
      setIsOnboardingActive(true)
    } else {
      navigateTo('signup')
    }
  }

  const handleConnectDrive = () => {
    if (isAuthenticated) {
      navigateTo('connectors')
    } else {
      navigateTo('signup')
    }
  }

  const handleOnboardingComplete = () => {
    setIsOnboardingActive(false)
    localStorage.setItem('atlas-onboarding-completed', 'true')
    showSuccess('Welcome to Atlas!', 'You\'re ready to search across all your files.')
  }

  // If not on search page, render through PageRouter
  if (navigationState.currentPage !== 'search') {
    return (
      <PageRouter
        currentPage={navigationState.currentPage}
        isAuthenticated={isAuthenticated}
        user={user}
        isDark={isDark}
        setIsDark={setIsDark}
        notifications={notifications}
        dismissNotification={dismissNotification}
        shortcuts={shortcuts}
        onSignIn={handleSignIn}
        onGetStarted={handleGetStarted}
        onConnectDrive={handleConnectDrive}
        onStartTrial={handleStartTrial}
        onAuthSuccess={handleAuthSuccess}
      />
    )
  }

  // Search page - render with layout component
  const selectedItemsData = results.filter(r => selectedItems.includes(r.id))

  return (
    <>
      <GlobalNotificationBar notifications={notifications} onDismiss={dismissNotification} position="top" />
      
      <SearchPageLayout
        isAuthenticated={isAuthenticated}
        user={user}
        isDark={isDark}
        setIsDark={setIsDark}
        isOffline={isOffline}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        hasError={hasError}
        results={results}
        totalResults={totalResults}
        appliedFilters={appliedFilters}
        hasConnectedAccounts={hasConnectedAccounts}
        recentSearches={recentSearches}
        viewMode={viewMode}
        setViewMode={setViewMode}
        density={density}
        setDensity={setDensity}
        currentSort={currentSort}
        currentOrder={currentOrder}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={Math.ceil(totalResults / pageSize)}
        paginationMode={paginationMode}
        hasNextPage={currentPage * pageSize < totalResults}
        hasPreviousPage={currentPage > 1}
        loadingRef={loadingRef}
        isFetching={isFetching}
        selectedItems={selectedItems}
        isSelectionMode={isSelectionMode}
        selectedResult={selectedResult}
        previewItem={previewItem}
        previewState={previewState}
        filterSections={filterSections}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onToggleSection={handleToggleSection}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAll}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onLoadMore={() => handleLoadMore(totalResults)}
        onSelectResult={(item) => handleSelectResult(item, isSelectionMode, handleToggleSelection)}
        onToggleSelection={handleToggleSelection}
        onSelectAll={() => handleSelectAll(results)}
        onClosePreview={handleClosePreview}
        onOpenInApp={handleOpenInApp}
        onSetSelectionMode={setIsSelectionMode}
        shortcuts={shortcuts}
      />

      <UnifiedBulkActionsBar
        selectedItems={selectedItemsData}
        onDeselectAll={handleClearSelection}
        onAction={(action) => bulkActionHandler(action, selectedItems.length, handleClearSelection)}
        variant="floating"
        position="bottom"
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigateTo}
        onSearch={handleSearch}
      />

      <OnboardingWalkthrough
        isActive={isOnboardingActive}
        onComplete={handleOnboardingComplete}
        onSkip={() => setIsOnboardingActive(false)}
      />

      <FeatureHighlight
        title="New: Demo Account Features"
        description="You're using abc@abc.com - all features are unlocked for testing!"
        isVisible={showFeatureHighlight && user?.email === 'abc@abc.com'}
        onDismiss={() => setShowFeatureHighlight(false)}
      />
    </>
  )
}

export default function App() {
  return (
    <FocusProvider>
      <NavigationProvider initialPage="home">
        <AppContent />
      </NavigationProvider>
    </FocusProvider>
  )
}