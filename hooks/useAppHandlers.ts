import { useState } from 'react'
import { generateMockResults, mockPreviewItem } from '../constants/mockData'
import { useNavigation } from '../components/NavigationManager'
import { useNotifications } from '../components/GlobalNotificationBar'
import type { UserData, SearchMetadata, PreviewState } from '../types'

export function useAuthHandlers() {
  const { navigateTo } = useNavigation()
  const { showSuccess, showInfo } = useNotifications()
  
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [hasConnectedAccounts, setHasConnectedAccounts] = useState(false)

  const handleSignIn = () => {
    navigateTo('signin')
  }

  const handleStartTrial = () => {
    navigateTo('signup')
  }

  const handleAuthSuccess = (userData: UserData) => {
    setIsAuthenticated(true)
    setUser(userData)
    
    // For demo user, automatically set up connected accounts
    if (userData.email === 'abc@abc.com') {
      setHasConnectedAccounts(true)
      navigateTo('search')
      showSuccess('Welcome to Atlas!', 'Demo account signed in successfully. All features are available for testing.')
    } else {
      navigateTo('search')
      showSuccess(`Welcome ${userData.name}!`, 'You\'re now signed in and ready to search.')
    }
  }

  const handleSignOut = () => {
    setIsAuthenticated(false)
    setUser(null)
    setHasConnectedAccounts(false)
    navigateTo('home')
    showInfo('Signed out successfully')
  }

  return {
    isAuthenticated,
    user,
    hasConnectedAccounts,
    setHasConnectedAccounts,
    handleSignIn,
    handleStartTrial,
    handleAuthSuccess,
    handleSignOut
  }
}

export function useSearchHandlers() {
  const { navigateTo } = useNavigation()
  const { showSuccess, showError } = useNotifications()
  
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [results, setResults] = useState(generateMockResults(1, 25))
  const [totalResults, setTotalResults] = useState(125)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'quarterly reports', 'design system', 'meeting notes'
  ])

  const handleSearch = (searchQuery: string, metadata?: SearchMetadata) => {
    setQuery(searchQuery)
    navigateTo('search')
    setIsLoading(true)
    setHasError(false)
    
    // Add to recent searches
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)])
    }
    
    // Simulate search
    setTimeout(() => {
      try {
        const newResults = generateMockResults(1, 25)
        setResults(newResults)
        setTotalResults(125)
        setIsLoading(false)
        
        if (metadata?.aiGenerated) {
          showSuccess('AI search completed', `Found ${newResults.length} results`)
        }
      } catch (error) {
        setHasError(true)
        setIsLoading(false)
        showError('Search failed', 'Please try again or check your connection.')
      }
    }, metadata?.aiGenerated ? 800 : 400)
  }

  const handleClearSearch = () => {
    setQuery('')
    setResults([])
    setTotalResults(0)
  }

  return {
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
  }
}

export function usePaginationHandlers(pageSize: number, setResults: any, setIsLoading: any) {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setIsLoading(true)
    
    setTimeout(() => {
      const newResults = generateMockResults(page, pageSize)
      setResults(newResults)
      setIsLoading(false)
    }, 300)
  }

  const handleLoadMore = (totalResults: number) => {
    if (currentPage * pageSize >= totalResults) return
    
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    setIsLoading(true)
    
    setTimeout(() => {
      const newResults = generateMockResults(nextPage, pageSize)
      setResults((prev: any) => [...prev, ...newResults])
      setIsLoading(false)
    }, 500)
  }

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    handleLoadMore
  }
}

export function useSelectionHandlers() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const handleToggleSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectAll = (results: any[]) => {
    if (selectedItems.length === results.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(results.map(r => r.id))
    }
  }

  const handleClearSelection = () => {
    setSelectedItems([])
    setIsSelectionMode(false)
  }

  return {
    selectedItems,
    setSelectedItems,
    isSelectionMode,
    setIsSelectionMode,
    handleToggleSelection,
    handleSelectAll,
    handleClearSelection
  }
}

export function usePreviewHandlers() {
  const [selectedResult, setSelectedResult] = useState<string | null>(null)
  const [previewItem, setPreviewItem] = useState<typeof mockPreviewItem | null>(null)
  const [previewState, setPreviewState] = useState<PreviewState>('loaded')

  const handleSelectResult = (item: any, isSelectionMode: boolean, handleToggleSelection: (id: string) => void) => {
    if (isSelectionMode) {
      handleToggleSelection(item.id)
    } else {
      setSelectedResult(item.id)
      setPreviewState('loading')
      
      setTimeout(() => {
        setPreviewItem({
          ...mockPreviewItem,
          appUrl: item.appUrl
        })
        setPreviewState('loaded')
      }, 300)
    }
  }

  const handleClosePreview = () => {
    setSelectedResult(null)
    setPreviewItem(null)
    setPreviewState('loaded')
  }

  return {
    selectedResult,
    previewItem,
    previewState,
    handleSelectResult,
    handleClosePreview
  }
}

export function useOpenInAppHandler() {
  const { showError, showInfo } = useNotifications()

  const handleOpenInApp = (item: any) => {
    if (!item.appUrl) {
      showError('Cannot open file', 'This file doesn\'t have a valid link to its source application.')
      return
    }

    showInfo(`Opening in ${item.source}`, 'The file will open in a new tab.')
    
    setTimeout(() => {
      window.open(item.appUrl, '_blank', 'noopener,noreferrer')
    }, 300)
  }

  return { handleOpenInApp }
}

export function useBulkActionHandler() {
  const { showWarning, showSuccess, showInfo } = useNotifications()

  const handleBulkAction = (action: string, selectedCount: number, handleClearSelection: () => void) => {
    switch (action) {
      case 'delete':
        showWarning(`Deleting ${selectedCount} files`, 'This action cannot be undone.', [{
          label: 'Undo',
          onClick: () => showInfo('Delete action cancelled')
        }])
        break
      case 'move':
        showSuccess(`Moved ${selectedCount} files`)
        break
      case 'share':
        showInfo(`Shared ${selectedCount} files`)
        break
      case 'star':
        showSuccess(`Starred ${selectedCount} files`)
        break
      case 'download':
        showInfo(`Downloading ${selectedCount} files`)
        break
    }
    
    handleClearSelection()
  }

  return { handleBulkAction }
}