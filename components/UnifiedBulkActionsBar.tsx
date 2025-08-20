'use client'

import React, { useState } from 'react'
import { 
  X, Trash2, Move, Share2, Star, Download, Copy, 
  FolderPlus, Tag, Archive, MoreHorizontal, Check
} from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

export type BulkActionType = 
  | 'move' 
  | 'delete' 
  | 'share' 
  | 'star' 
  | 'download' 
  | 'copy' 
  | 'addToCollection' 
  | 'tag' 
  | 'archive'

export interface BulkAction {
  id: BulkActionType
  label: string
  icon: React.ReactNode
  variant?: 'default' | 'destructive' | 'secondary'
  requiresConfirmation?: boolean
  shortcut?: string
}

export interface SelectedItem {
  id: string
  title: string
  type: string
  source: string
  [key: string]: any
}

interface UnifiedBulkActionsBarProps {
  selectedItems: SelectedItem[]
  onDeselectAll: () => void
  onAction: (action: BulkActionType, data?: any) => void
  actions?: BulkAction[]
  className?: string
  position?: 'bottom' | 'top'
  variant?: 'floating' | 'attached'
}

const DEFAULT_ACTIONS: BulkAction[] = [
  {
    id: 'move',
    label: 'Move to folder',
    icon: <Move className="icon-sm" />,
    shortcut: 'M'
  },
  {
    id: 'share',
    label: 'Share',
    icon: <Share2 className="icon-sm" />,
    shortcut: 'S'
  },
  {
    id: 'star',
    label: 'Star',
    icon: <Star className="icon-sm" />,
    shortcut: '⭐'
  },
  {
    id: 'download',
    label: 'Download',
    icon: <Download className="icon-sm" />,
    shortcut: 'D'
  },
  {
    id: 'copy',
    label: 'Copy link',
    icon: <Copy className="icon-sm" />,
    shortcut: 'C'
  },
  {
    id: 'addToCollection',
    label: 'Add to collection',
    icon: <FolderPlus className="icon-sm" />
  },
  {
    id: 'tag',
    label: 'Add tags',
    icon: <Tag className="icon-sm" />
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: <Archive className="icon-sm" />,
    variant: 'secondary'
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash2 className="icon-sm" />,
    variant: 'destructive',
    requiresConfirmation: true,
    shortcut: '⌫'
  }
]

export function UnifiedBulkActionsBar({
  selectedItems,
  onDeselectAll,
  onAction,
  actions = DEFAULT_ACTIONS,
  className = "",
  position = 'bottom',
  variant = 'floating'
}: UnifiedBulkActionsBarProps) {
  const [isConfirming, setIsConfirming] = useState<BulkActionType | null>(null)

  // Don't render if no items selected
  if (selectedItems.length === 0) return null

  const handleAction = (actionId: BulkActionType, requiresConfirmation = false) => {
    if (requiresConfirmation && !isConfirming) {
      setIsConfirming(actionId)
      return
    }

    // Reset confirmation state
    if (isConfirming) {
      setIsConfirming(null)
    }

    // Execute the action
    onAction(actionId, { selectedItems })
  }

  const handleConfirmCancel = () => {
    setIsConfirming(null)
  }

  // Separate primary actions from overflow actions
  const primaryActions = actions.slice(0, variant === 'floating' ? 4 : 6)
  const overflowActions = actions.slice(variant === 'floating' ? 4 : 6)

  const getButtonVariant = (action: BulkAction) => {
    if (isConfirming === action.id) return 'destructive'
    return action.variant || 'secondary'
  }

  const getButtonText = (action: BulkAction) => {
    if (isConfirming === action.id) {
      return action.id === 'delete' ? 'Confirm Delete' : 'Confirm'
    }
    return action.label
  }

  return (
    <div 
      className={`
        fixed left-1/2 transform -translate-x-1/2 z-50
        ${position === 'bottom' ? 'bottom-6' : 'top-20'}
        ${className}
      `}
    >
      <div 
        className={`
          bg-card border border-border shadow-xl atlas-animate-scale-in
          ${variant === 'floating' 
            ? 'rounded-2xl px-4 py-3 shadow-lg' 
            : 'rounded-lg px-6 py-4'
          }
        `}
        role="toolbar"
        aria-label={`Bulk actions for ${selectedItems.length} selected items`}
      >
        <div className="flex items-center gap-3">
          {/* Selection info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="icon-xs text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">
                {selectedItems.length} selected
              </span>
            </div>
            
            {/* File type breakdown */}
            {selectedItems.length > 1 && (
              <div className="flex items-center gap-1">
                {Object.entries(
                  selectedItems.reduce((acc, item) => {
                    acc[item.type] = (acc[item.type] || 0) + 1
                    return acc
                  }, {} as Record<string, number>)
                ).slice(0, 3).map(([type, count]) => (
                  <Badge key={type} variant="outline" className="text-xs px-1">
                    {count} {type}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Primary actions */}
          <div className="flex items-center gap-1">
            {primaryActions.map((action) => (
              <TooltipProvider key={action.id}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={getButtonVariant(action)}
                      size="sm"
                      onClick={() => handleAction(action.id, action.requiresConfirmation)}
                      className={`
                        atlas-hover atlas-focus-ring touch-target
                        ${isConfirming === action.id ? 'animate-pulse' : ''}
                      `}
                    >
                      {action.icon}
                      <span className="sr-only sm:not-sr-only sm:ml-2">
                        {getButtonText(action)}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="atlas-animate-fade-in">
                    <div className="flex items-center gap-2">
                      <span>{action.label}</span>
                      {action.shortcut && (
                        <kbd className="px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                          {action.shortcut}
                        </kbd>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            {/* Overflow menu */}
            {overflowActions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="atlas-hover atlas-focus-ring touch-target"
                  >
                    <MoreHorizontal className="icon-sm" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side="top" 
                  align="end"
                  className="atlas-animate-scale-in"
                >
                  {overflowActions.map((action, index) => (
                    <React.Fragment key={action.id}>
                      <DropdownMenuItem
                        onClick={() => handleAction(action.id, action.requiresConfirmation)}
                        className={`
                          flex items-center gap-2 atlas-hover
                          ${action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                        `}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                        {action.shortcut && (
                          <kbd className="ml-auto px-1 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                            {action.shortcut}
                          </kbd>
                        )}
                      </DropdownMenuItem>
                      {index < overflowActions.length - 1 && action.variant === 'destructive' && (
                        <DropdownMenuSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Confirmation cancel button */}
            {isConfirming && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleConfirmCancel}
                className="atlas-hover atlas-focus-ring touch-target"
              >
                Cancel
              </Button>
            )}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Deselect all */}
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDeselectAll}
                  className="atlas-hover atlas-focus-ring touch-target"
                  aria-label="Deselect all items"
                >
                  <X className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="atlas-animate-fade-in">
                <p>Deselect all</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

// Preset variants
export const FloatingBulkActions = (props: Omit<UnifiedBulkActionsBarProps, 'variant'>) => (
  <UnifiedBulkActionsBar {...props} variant="floating" />
)

export const AttachedBulkActions = (props: Omit<UnifiedBulkActionsBarProps, 'variant'>) => (
  <UnifiedBulkActionsBar {...props} variant="attached" />
)

// Custom hook for keyboard shortcuts
export function useBulkActionShortcuts(
  onAction: (action: BulkActionType) => void,
  isActive = false
) {
  React.useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const key = e.key.toLowerCase()
      const shortcuts: Record<string, BulkActionType> = {
        'm': 'move',
        's': 'share',
        'd': 'download',
        'c': 'copy',
        'backspace': 'delete',
        'delete': 'delete'
      }

      if (shortcuts[key]) {
        e.preventDefault()
        onAction(shortcuts[key])
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onAction, isActive])
}