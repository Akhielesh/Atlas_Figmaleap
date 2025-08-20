'use client'

import React, { useState, useRef } from 'react'
import { 
  FileText, Image, FileSpreadsheet, Presentation, 
  Star, Share2, ExternalLink, MoreHorizontal, Eye,
  Download, Copy, FolderPlus, Check, Clock, AlertCircle,
  Shield, Users
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

export type CardState = 'default' | 'hover' | 'selected' | 'loading' | 'error' | 'disabled'
export type CardSize = 'compact' | 'default' | 'expanded'
export type CardLayout = 'list' | 'grid'

interface ResultItem {
  id: string
  title: string
  snippet: string
  breadcrumb: string
  type: string
  source: string
  permission: 'owner' | 'edit' | 'view'
  lastModified: string
  dateModified: Date
  starred: boolean
  shared: boolean
  tags: string[]
  size: number
  owner: string
  thumbnail?: string
  previewAvailable?: boolean
  syncStatus?: 'synced' | 'syncing' | 'error' | 'offline'
}

interface EnhancedResultCardProps {
  item: ResultItem
  selected?: boolean
  state?: CardState
  size?: CardSize
  layout?: CardLayout
  showActions?: boolean
  showThumbnail?: boolean
  showMetadata?: boolean
  onSelect?: (item: ResultItem) => void
  onOpen?: (item: ResultItem) => void
  onStar?: (item: ResultItem) => void
  onShare?: (item: ResultItem) => void
  onPreview?: (item: ResultItem) => void
  onDownload?: (item: ResultItem) => void
  className?: string
}

export function EnhancedResultCard({
  item,
  selected = false,
  state = 'default',
  size = 'default',
  layout = 'list',
  showActions = true,
  showThumbnail = true,
  showMetadata = true,
  onSelect,
  onOpen,
  onStar,
  onShare,
  onPreview,
  onDownload,
  className = ""
}: EnhancedResultCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const getFileIcon = (type: string) => {
    const icons = {
      'pdf': <FileText className={size === 'compact' ? 'icon-sm' : 'icon-md'} />,
      'docx': <FileText className={size === 'compact' ? 'icon-sm' : 'icon-md'} />,
      'pptx': <Presentation className={size === 'compact' ? 'icon-sm' : 'icon-md'} />,
      'xlsx': <FileSpreadsheet className={size === 'compact' ? 'icon-sm' : 'icon-md'} />,
      'image': <Image className={size === 'compact' ? 'icon-sm' : 'icon-md'} />,
      'folder': <FolderPlus className={size === 'compact' ? 'icon-sm' : 'icon-md'} />
    }
    return icons[type as keyof typeof icons] || <FileText className={size === 'compact' ? 'icon-sm' : 'icon-md'} />
  }

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'owner': return <Shield className="icon-xs text-blue-600" />
      case 'edit': return <Users className="icon-xs text-green-600" />
      case 'view': return <Eye className="icon-xs text-muted-foreground" />
      default: return null
    }
  }

  const getSyncStatusColor = (status?: string) => {
    switch (status) {
      case 'synced': return 'text-green-600'
      case 'syncing': return 'text-blue-600 animate-pulse'
      case 'error': return 'text-red-600'
      case 'offline': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`
  }

  const handleActionClick = async (action: string, handler?: (item: ResultItem) => void) => {
    if (!handler) return
    
    setActionLoading(action)
    
    // Simulate async action
    setTimeout(() => {
      handler(item)
      setActionLoading(null)
    }, 500)
  }

  const cardClasses = `
    group relative overflow-hidden atlas-focus-ring
    ${layout === 'grid' 
      ? 'flex flex-col' 
      : 'flex items-start gap-4'
    }
    ${size === 'compact' 
      ? 'card-padding-sm' 
      : size === 'expanded' 
        ? 'card-padding-lg' 
        : 'card-padding'
    }
    ${layout === 'grid' ? 'rounded-lg' : 'rounded-md'}
    ${selected 
      ? 'atlas-selected ring-2 ring-primary/20 border-primary' 
      : 'border border-border bg-card'
    }
    ${state === 'disabled' 
      ? 'opacity-60 cursor-not-allowed' 
      : state === 'loading'
        ? 'animate-pulse'
        : 'atlas-card-hover cursor-pointer'
    }
    ${state === 'error' ? 'border-destructive bg-destructive/5' : ''}
    ${className}
  `

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(item)}
      role="button"
      tabIndex={state === 'disabled' ? -1 : 0}
      aria-label={`${item.title} - ${item.type} file from ${item.source}`}
      aria-selected={selected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.(item)
        }
      }}
    >
      {/* Loading overlay */}
      {state === 'loading' && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        </div>
      )}

      {/* Error overlay */}
      {state === 'error' && (
        <div className="absolute top-2 right-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="icon-sm text-destructive" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Error loading file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 min-w-0 ${layout === 'grid' ? 'space-y-3' : ''}`}>
        {/* Header section */}
        <div className={`flex items-start gap-3 ${layout === 'grid' ? 'flex-col' : ''}`}>
          {/* File icon/thumbnail */}
          <div className={`
            flex-shrink-0 flex items-center justify-center rounded-lg
            ${size === 'compact' 
              ? 'w-8 h-8' 
              : layout === 'grid' 
                ? 'w-12 h-12 mx-auto' 
                : 'w-10 h-10'
            }
            ${item.thumbnail && showThumbnail ? 'p-0' : 'bg-muted p-2'}
          `}>
            {item.thumbnail && showThumbnail ? (
              <img 
                src={item.thumbnail} 
                alt="" 
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="text-muted-foreground">
                {getFileIcon(item.type)}
              </div>
            )}
          </div>

          {/* Title and metadata */}
          <div className={`flex-1 min-w-0 ${layout === 'grid' ? 'text-center' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <h3 
                className={`
                  font-medium text-foreground line-clamp-2
                  ${size === 'compact' ? 'text-sm' : 'text-base'}
                  ${layout === 'grid' ? 'text-center' : ''}
                `}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              
              {/* Quick actions - shown on hover */}
              {showActions && (isHovered || selected) && state !== 'disabled' && (
                <div className={`
                  flex items-center gap-1 atlas-animate-fade-in
                  ${layout === 'grid' ? 'absolute top-2 right-2' : ''}
                `}>
                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 atlas-hover touch-target"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleActionClick('star', onStar)
                          }}
                          disabled={actionLoading === 'star'}
                          aria-label={item.starred ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          {actionLoading === 'star' ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Star className={`icon-sm ${item.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.starred ? 'Remove from favorites' : 'Add to favorites'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 atlas-hover touch-target"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleActionClick('preview', onPreview)
                          }}
                          disabled={!item.previewAvailable || actionLoading === 'preview'}
                          aria-label="Preview file"
                        >
                          {actionLoading === 'preview' ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Eye className="icon-sm" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Preview file</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 atlas-hover touch-target"
                        aria-label="More actions"
                      >
                        <MoreHorizontal className="icon-sm" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="atlas-animate-scale-in">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpen?.(item)
                        }}
                        className="flex items-center gap-2 atlas-hover"
                      >
                        <ExternalLink className="icon-sm" />
                        <span>Open in app</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onDownload?.(item)
                        }}
                        className="flex items-center gap-2 atlas-hover"
                      >
                        <Download className="icon-sm" />
                        <span>Download</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(window.location.href + '?file=' + item.id)
                        }}
                        className="flex items-center gap-2 atlas-hover"
                      >
                        <Copy className="icon-sm" />
                        <span>Copy link</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onShare?.(item)
                        }}
                        className="flex items-center gap-2 atlas-hover"
                      >
                        <Share2 className="icon-sm" />
                        <span>Share</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Snippet - only in expanded view */}
            {size !== 'compact' && (
              <p 
                className={`
                  text-sm text-muted-foreground mt-1 line-clamp-2
                  ${layout === 'grid' ? 'text-center' : ''}
                `}
                dangerouslySetInnerHTML={{ __html: item.snippet }}
              />
            )}

            {/* Metadata */}
            {showMetadata && (
              <div className={`
                flex items-center gap-2 mt-2 text-xs text-muted-foreground
                ${layout === 'grid' ? 'justify-center flex-wrap' : 'flex-wrap'}
              `}>
                <div className="flex items-center gap-1">
                  {getPermissionIcon(item.permission)}
                  <span className="capitalize">{item.permission}</span>
                </div>
                
                <span>•</span>
                
                <div className="flex items-center gap-1">
                  <Clock className="icon-xs" />
                  <span>{item.lastModified}</span>
                </div>

                {item.syncStatus && (
                  <>
                    <span>•</span>
                    <div className={`flex items-center gap-1 ${getSyncStatusColor(item.syncStatus)}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="capitalize">{item.syncStatus}</span>
                    </div>
                  </>
                )}

                <span>•</span>
                
                <span>{formatFileSize(item.size)}</span>
              </div>
            )}

            {/* Tags */}
            {item.tags.length > 0 && size !== 'compact' && (
              <div className={`
                flex items-center gap-1 mt-2 flex-wrap
                ${layout === 'grid' ? 'justify-center' : ''}
              `}>
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer - source and breadcrumb */}
        <div className={`
          flex items-center justify-between text-xs text-muted-foreground
          ${layout === 'grid' ? 'mt-3' : 'mt-2'}
        `}>
          <span className="truncate">{item.breadcrumb}</span>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <span>{item.source}</span>
            {item.shared && (
              <Users className="icon-xs" title="Shared file" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading skeleton component
export function ResultCardSkeleton({ 
  layout = 'list', 
  size = 'default' 
}: { 
  layout?: CardLayout
  size?: CardSize 
}) {
  return (
    <div className={`
      animate-pulse
      ${layout === 'grid' ? 'flex flex-col' : 'flex items-start gap-4'}
      ${size === 'compact' ? 'card-padding-sm' : 'card-padding'}
      border border-border bg-card rounded-lg
    `}>
      <div className={`
        ${size === 'compact' 
          ? 'w-8 h-8' 
          : layout === 'grid' 
            ? 'w-12 h-12 mx-auto' 
            : 'w-10 h-10'
        }
        bg-muted rounded-lg flex-shrink-0
      `} />
      
      <div className={`flex-1 space-y-2 ${layout === 'grid' ? 'text-center' : ''}`}>
        <div className={`h-4 bg-muted rounded ${layout === 'grid' ? 'w-3/4 mx-auto' : 'w-3/4'}`} />
        {size !== 'compact' && (
          <div className={`h-3 bg-muted rounded ${layout === 'grid' ? 'w-1/2 mx-auto' : 'w-1/2'}`} />
        )}
        <div className="flex gap-2">
          <div className="h-3 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-12" />
          <div className="h-3 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  )
}

// Empty state component
interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 mb-4 text-muted-foreground/50">
        {icon || <FileText className="w-full h-full" />}
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="atlas-button-states"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}