// Type definitions for Atlas application

export type PageView = 'home' | 'search' | 'collections' | 'insights' | 'analytics' | 'settings' | 'profile' | 'about' | 'signin' | 'signup' | 'connectors'

export type SortOption = 'relevance' | 'modified' | 'created' | 'name' | 'size' | 'owner' | 'starred'

export type PaginationMode = 'traditional' | 'infinite'

export type ViewMode = 'list' | 'grid'

export type PreviewState = 'loading' | 'loaded' | 'error' | 'unavailable' | 'permission_denied'

export interface UserData {
  name: string
  email: string
}

export interface SearchMetadata {
  aiGenerated?: boolean
  confidence?: string
  type?: string
  id?: string
}