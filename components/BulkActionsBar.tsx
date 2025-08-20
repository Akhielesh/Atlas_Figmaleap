'use client'

import React, { useState } from 'react'
import { 
  Star, Share2, Download, Trash2, FolderPlus, Tag, 
  Copy, ExternalLink, Archive, Shield, Zap, X,
  CheckSquare, Square, MoreHorizontal, Send, Eye
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from './ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'

interface BulkActionsBarProps {
  selectedItems: Array<{
    id: string
    title: string
    type: string
    source: string
    permission: 'view' | 'edit' | 'owner'
  }>
  onDeselectAll: () => void
  onAction: (action: string, data?: any) => void
  className?: string
}

export function BulkActionsBar({ 
  selectedItems, 
  onDeselectAll, 
  onAction,
  className = "" 
}: BulkActionsBarProps) {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)

  if (selectedItems.length === 0) return null

  const collections = [
    { id: '1', name: 'Q4 Planning Hub' },
    { id: '2', name: 'Design System' },
    { id: '3', name: 'Client Materials' },
    { id: '4', name: 'Research Archive' }
  ]

  const integrations = [
    { id: 'notion', name: 'Notion', icon: '📝' },
    { id: 'slack', name: 'Slack', icon: '💬' },
    { id: 'trello', name: 'Trello', icon: '📋' },
    { id: 'jira', name: 'Jira', icon: '🎯' },
    { id: 'teams', name: 'Microsoft Teams', icon: '👥' }
  ]

  const canEdit = selectedItems.every(item => item.permission === 'edit' || item.permission === 'owner')
  const canShare = selectedItems.every(item => item.permission === 'owner' || item.permission === 'edit')

  const handleAction = (action: string, data?: any) => {
    onAction(action, { items: selectedItems, ...data })
    
    // Show toast notification
    const actionNames = {
      star: 'starred',
      unstar: 'unstarred',
      archive: 'archived',
      delete: 'deleted',
      download: 'downloaded',
      copy: 'copied links for'
    }
    
    const actionName = actionNames[action as keyof typeof actionNames] || action
    toast.success(`${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} ${actionName}`)
  }

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-popover border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center gap-4">
          {/* Selection Info */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction('star')}
              className="h-8 px-3"
            >
              <Star className="w-4 h-4 mr-2" />
              Star
            </Button>

            {canShare && (
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Files</DialogTitle>
                    <DialogDescription>
                      Share {selectedItems.length} selected file{selectedItems.length > 1 ? 's' : ''} with others
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipients">Recipients</Label>
                      <Input 
                        id="recipients" 
                        placeholder="Enter email addresses..." 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="permission">Permission Level</Label>
                      <Select defaultValue="view">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">Can view</SelectItem>
                          <SelectItem value="comment">Can comment</SelectItem>
                          <SelectItem value="edit">Can edit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message (optional)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Add a message..."
                        className="mt-1"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        handleAction('share', { recipients: 'example@email.com', permission: 'view' })
                        setIsShareDialogOpen(false)
                      }}>
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3">
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Collect
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add to Collection</DialogTitle>
                  <DialogDescription>
                    Add {selectedItems.length} selected file{selectedItems.length > 1 ? 's' : ''} to a collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Choose Collection</Label>
                    <div className="mt-2 space-y-2">
                      {collections.map(collection => (
                        <div key={collection.id} className="flex items-center space-x-2">
                          <Square className="w-4 h-4" />
                          <span>{collection.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-collection">Or create new collection</Label>
                    <Input 
                      id="new-collection" 
                      placeholder="Collection name..." 
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCollectionDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      handleAction('addToCollection', { collectionId: '1' })
                      setIsCollectionDialogOpen(false)
                    }}>
                      Add to Collection
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction('download')}
              className="h-8 px-3"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <MoreHorizontal className="w-4 h-4 mr-2" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleAction('copy')}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Links
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={() => handleAction('open')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open All
              </DropdownMenuItem>

              <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Tag className="w-4 h-4 mr-2" />
                    Add Tags
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Tags</DialogTitle>
                    <DialogDescription>
                      Add tags to {selectedItems.length} selected file{selectedItems.length > 1 ? 's' : ''}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input 
                        id="tags" 
                        placeholder="project, important, review..." 
                        className="mt-1"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        handleAction('addTags', { tags: ['project', 'important'] })
                        setIsTagDialogOpen(false)
                      }}>
                        Add Tags
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Zap className="w-4 h-4 mr-2" />
                  Send to App
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {integrations.map(integration => (
                    <DropdownMenuItem 
                      key={integration.id}
                      onClick={() => handleAction('sendToApp', { app: integration.id })}
                    >
                      <span className="mr-2">{integration.icon}</span>
                      {integration.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => handleAction('archive')}>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>

              {canEdit && (
                <DropdownMenuItem 
                  onClick={() => handleAction('delete')}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* File Type Breakdown */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Selected:</span>
          {Array.from(new Set(selectedItems.map(item => item.type))).map(type => {
            const count = selectedItems.filter(item => item.type === type).length
            return (
              <Badge key={type} variant="secondary" className="text-xs">
                {count} {type.toUpperCase()}
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}