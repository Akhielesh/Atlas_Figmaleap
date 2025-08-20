'use client'

import React, { useState } from 'react'
import { 
  FileText, Image, File, Star, Share2, ExternalLink, 
  MoreHorizontal, Clock, User, Eye, Edit, Lock,
  Folder, Presentation, FileSpreadsheet, FileType
} from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface ResultCardProps {
  item: {
    id: string
    title: string
    snippet: string
    breadcrumb: string
    type: string
    source: string
    permission: 'owner' | 'edit' | 'view'
    lastModified: string
    starred: boolean
    shared: boolean
    tags: string[]
    owner: string
  }
  selected?: boolean
  onSelect: (item: any) => void
  onOpen?: () => void
  onStar?: () => void
  onShare?: () => void
  className?: string
}

export function ResultCard({ 
  item, 
  selected = false, 
  onSelect, 
  onOpen, 
  onStar, 
  onShare,
  className = "" 
}: ResultCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [quickActionsVisible, setQuickActionsVisible] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />
      case 'docx':
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-500" />
      case 'pptx':
      case 'ppt':
        return <Presentation className="w-5 h-5 text-orange-500" />
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-5 h-5 text-purple-500" />
      case 'md':
        return <FileType className="w-5 h-5 text-gray-500" />
      case 'folder':
        return <Folder className="w-5 h-5 text-yellow-500" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'owner':
        return <User className="w-3 h-3" />
      case 'edit':
        return <Edit className="w-3 h-3" />
      case 'view':
        return <Eye className="w-3 h-3" />
      default:
        return <Lock className="w-3 h-3" />
    }
  }

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'google drive':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'onedrive':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300'
      case 'dropbox':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
      case 'slack':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'github':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div
      className={`
        group relative p-4 border border-border rounded-lg cursor-pointer
        atlas-hover atlas-card-hover atlas-focus-ring
        ${selected ? 'atlas-selected ring-2 ring-primary/20' : ''}
        ${className}
      `}
      onClick={() => onSelect(item)}
      onMouseEnter={() => {
        setIsHovered(true)
        setQuickActionsVisible(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setQuickActionsVisible(false)
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select ${item.title}`}
    >
      <div className="flex gap-3">
        {/* File icon */}
        <div className="flex-shrink-0 mt-0.5 atlas-animate-fade-in">
          {getFileIcon(item.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h3 
                className="font-medium text-foreground truncate atlas-animate-fade-in"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div className="text-xs text-muted-foreground hover:text-foreground hover:underline atlas-hover cursor-help mt-1 truncate">
                      {item.breadcrumb}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Full path: {item.breadcrumb}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Quick Actions */}
            <div className={`flex items-center gap-1 atlas-animate-fade-in ${
              quickActionsVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 atlas-hover hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        onStar?.()
                      }}
                    >
                      <Star 
                        className={`w-3 h-3 ${
                          item.starred 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground hover:text-yellow-500'
                        } atlas-hover`} 
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>{item.starred ? 'Remove from starred' : 'Star file'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 atlas-hover hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        onShare?.()
                      }}
                    >
                      <Share2 className="w-3 h-3 text-muted-foreground hover:text-blue-500 atlas-hover" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Share file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 atlas-hover hover:bg-green-100 dark:hover:bg-green-900/30"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen?.()
                      }}
                    >
                      <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-green-500 atlas-hover" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="atlas-animate-fade-in">
                    <p>Open file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Snippet with highlighted keywords */}
          <p 
            className="text-sm text-muted-foreground mb-3 line-clamp-2 atlas-animate-fade-in"
            dangerouslySetInnerHTML={{ __html: item.snippet }}
          />

          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {getPermissionIcon(item.permission)}
                <span>{item.owner}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.lastModified}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tags */}
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className={`text-xs px-1.5 py-0.5 atlas-animate-fade-in atlas-stagger-${index + 1}`}
                >
                  {tag}
                </Badge>
              ))}
              
              {item.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{item.tags.length - 2}
                </Badge>
              )}
              
              {/* Source badge */}
              <Badge className={`text-xs px-1.5 py-0.5 border-0 atlas-animate-fade-in ${getSourceBadgeColor(item.source)}`}>
                {item.source}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg atlas-animate-fade-in" />
      )}

      {/* Hover glow effect for snippet keywords */}
      {isHovered && (
        <style jsx>{`
          .result-card mark {
            background: var(--color-primary);
            color: var(--color-primary-foreground);
            padding: 1px 2px;
            border-radius: 2px;
            box-shadow: 0 0 8px var(--color-primary)/30;
            animation: atlas-fade-in 150ms var(--motion-ease);
          }
        `}</style>
      )}
    </div>
  )
}