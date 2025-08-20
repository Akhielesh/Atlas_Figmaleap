'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  X, ExternalLink, Share2, Star, Download, Copy, 
  FileText, Image, Shield, Users, Eye, Clock, 
  MessageSquare, History, AlertTriangle, CheckCircle,
  Loader2, RefreshCw, Maximize2, ZoomIn, ZoomOut
} from 'lucide-react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Alert, AlertDescription } from './ui/alert'

export type PreviewState = 'loading' | 'loaded' | 'error' | 'unavailable' | 'permission_denied'
export type PreviewTab = 'preview' | 'details' | 'activity' | 'security'

interface PreviewItem {
  id: string
  title: string
  type: string
  source: string
  owner: string
  size: string
  path: string
  lastModified: string
  permissions: Array<{
    user: string
    role: string
    avatar?: string
  }>
  activity: Array<{
    action: string
    user: string
    date: string
    avatar?: string
  }>
  content?: string
  canShare: boolean
  canEdit: boolean
  canDownload: boolean
  previewUrl?: string
  thumbnailUrl?: string
  metadata?: Record<string, any>
  comments?: Array<{
    id: string
    user: string
    content: string
    date: string
    resolved?: boolean
  }>
  versions?: Array<{
    version: string
    date: string
    user: string
    size: string
    current?: boolean
  }>
}

interface EnhancedPreviewPanelProps {
  item: PreviewItem | null
  state?: PreviewState
  activeTab?: PreviewTab
  onClose: () => void
  onOpen?: () => void
  onShare?: () => void
  onStar?: () => void
  onDownload?: () => void
  onTabChange?: (tab: PreviewTab) => void
  className?: string
}

export function EnhancedPreviewPanel({
  item,
  state = 'loaded',
  activeTab = 'preview',
  onClose,
  onOpen,
  onShare,
  onStar,
  onDownload,
  onTabChange,
  className = ""
}: EnhancedPreviewPanelProps) {
  const [currentTab, setCurrentTab] = useState<PreviewTab>(activeTab)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentTab(activeTab)
  }, [activeTab])

  const handleTabChange = (tab: string) => {
    const newTab = tab as PreviewTab
    setCurrentTab(newTab)
    onTabChange?.(newTab)
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'docx':
      case 'txt':
        return <FileText className="icon-md text-blue-600" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="icon-md text-green-600" />
      default:
        return <FileText className="icon-md text-muted-foreground" />
    }
  }

  const getStateMessage = () => {
    switch (state) {
      case 'loading':
        return {
          icon: <Loader2 className="icon-lg animate-spin" />,
          title: 'Loading preview...',
          description: 'Please wait while we prepare the file preview.',
          action: null
        }
      case 'error':
        return {
          icon: <AlertTriangle className="icon-lg text-destructive" />,
          title: 'Preview unavailable',
          description: 'We encountered an error while loading this file preview.',
          action: (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.reload()}
              className="atlas-button-states"
            >
              <RefreshCw className="icon-sm mr-2" />
              Retry
            </Button>
          )
        }
      case 'unavailable':
        return {
          icon: <Eye className="icon-lg text-muted-foreground" />,
          title: 'Preview not available',
          description: 'This file type doesn\'t support preview. You can still open it in the original app.',
          action: item?.canDownload ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDownload}
              className="atlas-button-states"
            >
              <Download className="icon-sm mr-2" />
              Download
            </Button>
          ) : null
        }
      case 'permission_denied':
        return {
          icon: <Shield className="icon-lg text-destructive" />,
          title: 'Permission denied',
          description: 'You don\'t have permission to preview this file.',
          action: null
        }
      default:
        return null
    }
  }

  if (!item) return null

  const stateMessage = getStateMessage()

  return (
    <div className={`
      w-96 bg-card border-l border-border flex flex-col h-full
      atlas-animate-slide-in-right
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          {getFileIcon(item.type)}
          <div className="min-w-0">
            <h3 className="font-medium text-foreground truncate text-sm">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {item.source} • {item.size}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Action buttons */}
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 atlas-hover touch-target"
                  onClick={onStar}
                  aria-label="Toggle favorite"
                >
                  <Star className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {item.canShare && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 atlas-hover touch-target"
                    onClick={onShare}
                    aria-label="Share file"
                  >
                    <Share2 className="icon-sm" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share file</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 atlas-hover touch-target"
                  onClick={onOpen}
                  aria-label="Open in app"
                >
                  <ExternalLink className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open in {item.source}</p>
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
                  onClick={onClose}
                  aria-label="Close preview"
                >
                  <X className="icon-sm" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Tabs */}
      <Tabs 
        value={currentTab} 
        onValueChange={handleTabChange}
        className="flex flex-col flex-1 min-h-0"
      >
        <TabsList className="grid w-full grid-cols-4 rounded-none border-b border-border h-auto p-0">
          <TabsTrigger 
            value="preview" 
            className="rounded-none atlas-hover atlas-focus-ring data-[state=active]:bg-accent"
          >
            <Eye className="icon-xs mr-2" />
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="rounded-none atlas-hover atlas-focus-ring data-[state=active]:bg-accent"
          >
            <FileText className="icon-xs mr-2" />
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            className="rounded-none atlas-hover atlas-focus-ring data-[state=active]:bg-accent"
          >
            <History className="icon-xs mr-2" />
            Activity
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="rounded-none atlas-hover atlas-focus-ring data-[state=active]:bg-accent"
          >
            <Shield className="icon-xs mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value="preview" className="flex-1 min-h-0 p-0">
          <div className="h-full flex flex-col">
            {state === 'loaded' && item.previewUrl ? (
              <>
                {/* Preview controls */}
                <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs atlas-hover"
                      onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}
                      disabled={zoomLevel <= 25}
                    >
                      <ZoomOut className="icon-xs" />
                    </Button>
                    <span className="text-xs text-muted-foreground min-w-[50px] text-center">
                      {zoomLevel}%
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs atlas-hover"
                      onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                      disabled={zoomLevel >= 200}
                    >
                      <ZoomIn className="icon-xs" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs atlas-hover"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    <Maximize2 className="icon-xs" />
                  </Button>
                </div>

                {/* Preview content */}
                <ScrollArea className="flex-1">
                  <div 
                    ref={previewRef}
                    className="p-4 atlas-animate-fade-in"
                    style={{ zoom: `${zoomLevel}%` }}
                  >
                    {item.type.toLowerCase().includes('image') ? (
                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="max-w-full h-auto rounded-lg shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.content || '<p>Preview content not available</p>' }}
                      />
                    )}
                  </div>
                </ScrollArea>
              </>
            ) : (
              /* State message display */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center atlas-animate-fade-in">
                  <div className="mb-4 text-muted-foreground">
                    {stateMessage?.icon}
                  </div>
                  <h4 className="font-medium text-foreground mb-2">
                    {stateMessage?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {stateMessage?.description}
                  </p>
                  {stateMessage?.action}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="flex-1 min-h-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {/* File info */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground text-sm">File Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium uppercase">{item.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Source:</span>
                    <Badge variant="outline">{item.source}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{item.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modified:</span>
                    <span className="font-medium">{item.lastModified}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Location */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground text-sm">Location</h4>
                <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-2 rounded text-xs break-all">
                  {item.path}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="atlas-hover text-xs h-7"
                  onClick={() => {
                    navigator.clipboard.writeText(item.path)
                  }}
                >
                  <Copy className="icon-xs mr-1" />
                  Copy path
                </Button>
              </div>

              {/* Metadata */}
              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">Metadata</h4>
                    <div className="space-y-2 text-sm">
                      {Object.entries(item.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Versions */}
              {item.versions && item.versions.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground text-sm">Version History</h4>
                    <div className="space-y-2">
                      {item.versions.map((version, index) => (
                        <div 
                          key={version.version}
                          className={`p-2 rounded-lg border text-sm ${
                            version.current 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">v{version.version}</span>
                              {version.current && (
                                <Badge variant="default" className="text-xs px-1">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <span className="text-muted-foreground text-xs">
                              {version.size}
                            </span>
                          </div>
                          <div className="text-muted-foreground text-xs mt-1">
                            {version.user} • {version.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="flex-1 min-h-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="space-y-3">
                {item.activity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 atlas-animate-fade-in">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.avatar ? (
                        <img
                          src={activity.avatar}
                          alt={activity.user}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <div className="w-4 h-4 bg-primary rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comments section */}
              {item.comments && item.comments.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground text-sm flex items-center gap-2">
                      <MessageSquare className="icon-sm" />
                      Comments ({item.comments.length})
                    </h4>
                    {item.comments.map((comment) => (
                      <div key={comment.id} className="space-y-2 p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{comment.user}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                            {comment.resolved && (
                              <CheckCircle className="icon-xs text-green-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="flex-1 min-h-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {/* Permissions */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground text-sm">Permissions</h4>
                <div className="space-y-2">
                  {item.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          {permission.avatar ? (
                            <img
                              src={permission.avatar}
                              alt={permission.user}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <Users className="icon-xs" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{permission.user}</span>
                      </div>
                      <Badge 
                        variant={permission.role === 'Owner' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {permission.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Security info */}
              <div className="space-y-2">
                <h4 className="font-medium text-foreground text-sm">Security</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Can download:</span>
                    <div className="flex items-center gap-1">
                      {item.canDownload ? (
                        <CheckCircle className="icon-xs text-green-600" />
                      ) : (
                        <X className="icon-xs text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {item.canDownload ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Can share:</span>
                    <div className="flex items-center gap-1">
                      {item.canShare ? (
                        <CheckCircle className="icon-xs text-green-600" />
                      ) : (
                        <X className="icon-xs text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {item.canShare ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Can edit:</span>
                    <div className="flex items-center gap-1">
                      {item.canEdit ? (
                        <CheckCircle className="icon-xs text-green-600" />
                      ) : (
                        <X className="icon-xs text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {item.canEdit ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {(!item.canShare || !item.canDownload) && (
                <Alert>
                  <Shield className="icon-sm" />
                  <AlertDescription className="text-sm">
                    Some actions are restricted based on your permission level for this file.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Loading state component
export function PreviewPanelSkeleton() {
  return (
    <div className="w-96 bg-card border-l border-border flex flex-col h-full animate-pulse">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-3 bg-muted rounded w-24" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="w-8 h-8 bg-muted rounded" />
        </div>
      </div>
      
      <div className="flex border-b border-border">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-1 p-3">
            <div className="h-6 bg-muted rounded" />
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  )
}