'use client'

import React, { useState } from 'react'
import { ExternalLink, Download, Share2, Star, Shield, Activity, FileText, X } from 'lucide-react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'

interface PreviewItem {
  id: string
  title: string
  type: string
  source: string
  owner: string
  size: string
  path: string
  lastModified: string
  permissions: Array<{ user: string; role: string }>
  activity: Array<{ action: string; user: string; date: string }>
  content?: string
  canShare?: boolean
}

interface PreviewPanelProps {
  item: PreviewItem | null
  onClose?: () => void
  onOpen?: () => void
  onShare?: () => void
  onStar?: () => void
  className?: string
}

export function PreviewPanel({ 
  item, 
  onClose, 
  onOpen, 
  onShare, 
  onStar,
  className = "" 
}: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState('preview')

  if (!item) {
    return (
      <div className={`w-80 bg-card border-l border-border p-6 flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Select a file to preview</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-80 bg-card border-l border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-medium leading-tight">{item.title}</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {item.source}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {item.type.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            onClick={onOpen}
            className="h-8"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in app
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onStar}
            className="h-8 px-2"
          >
            <Star className="w-4 h-4" />
          </Button>
          
          {item.canShare && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onShare}
              className="h-8 px-2"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <div className="flex-1 p-4 pt-0">
          <TabsContent value="preview" className="mt-4">
            <ScrollArea className="h-full">
              {item.content ? (
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Preview not available</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Owner</label>
              <p className="text-sm text-muted-foreground">{item.owner}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Size</label>
              <p className="text-sm text-muted-foreground">{item.size}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Path</label>
              <p className="text-sm text-muted-foreground break-all">{item.path}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Last Modified</label>
              <p className="text-sm text-muted-foreground">{item.lastModified}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Source</label>
              <p className="text-sm text-muted-foreground">{item.source}</p>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {item.activity.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm">{event.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.user} • {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4" />
                <label className="text-sm font-medium">Permissions</label>
              </div>
              <div className="space-y-2">
                {item.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{permission.user}</span>
                    <Badge variant="outline" className="text-xs">
                      {permission.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <label className="text-sm font-medium">Link sharing</label>
              <p className="text-xs text-muted-foreground mt-1">
                {item.canShare ? 'Anyone with the link can view' : 'Restricted'}
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}