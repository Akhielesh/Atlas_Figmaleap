'use client'

import React, { useState } from 'react'
import { 
  FolderPlus, Folder, Search, Star, Users, Lock, 
  MoreHorizontal, Share2, Edit, Trash2, Bell, 
  ArrowLeft, Grid3X3, List, Filter, Plus, Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface Collection {
  id: string
  name: string
  description: string
  type: 'manual' | 'smart' | 'shared'
  query?: string
  itemCount: number
  collaborators: Array<{ name: string; avatar: string; role: 'owner' | 'editor' | 'viewer' }>
  isPrivate: boolean
  hasAlerts: boolean
  lastModified: string
  thumbnail?: string
  tags: string[]
}

interface CollectionsPageProps {
  onBack?: () => void
  className?: string
}

export function CollectionsPage({ onBack, className = "" }: CollectionsPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [isCreating, setIsCreating] = useState(false)

  const collections: Collection[] = [
    {
      id: '1',
      name: 'Q4 Planning Hub',
      description: 'All documents, presentations, and resources for Q4 strategic planning',
      type: 'smart',
      query: 'Q4 OR "fourth quarter" OR "end of year" type:pdf,pptx,docx',
      itemCount: 47,
      collaborators: [
        { name: 'Alice Johnson', avatar: 'AJ', role: 'owner' },
        { name: 'Bob Smith', avatar: 'BS', role: 'editor' },
        { name: 'Carol Chen', avatar: 'CC', role: 'viewer' }
      ],
      isPrivate: false,
      hasAlerts: true,
      lastModified: '2 hours ago',
      tags: ['planning', 'strategy', 'quarterly']
    },
    {
      id: '2',
      name: 'Design System',
      description: 'Brand guidelines, components, tokens, and design documentation',
      type: 'manual',
      itemCount: 89,
      collaborators: [
        { name: 'Elena Rodriguez', avatar: 'ER', role: 'owner' },
        { name: 'David Park', avatar: 'DP', role: 'editor' }
      ],
      isPrivate: false,
      hasAlerts: false,
      lastModified: '1 day ago',
      tags: ['design', 'brand', 'components']
    },
    {
      id: '3',
      name: 'Client Acme Corp',
      description: 'All materials, contracts, and communications for Acme Corp project',
      type: 'smart',
      query: 'mentions:"Acme Corp" OR path:"/Clients/Acme"',
      itemCount: 156,
      collaborators: [
        { name: 'Sarah Wilson', avatar: 'SW', role: 'owner' },
        { name: 'Mike Turner', avatar: 'MT', role: 'editor' },
        { name: 'Lisa Zhang', avatar: 'LZ', role: 'viewer' }
      ],
      isPrivate: true,
      hasAlerts: true,
      lastModified: '3 days ago',
      tags: ['client', 'project', 'confidential']
    },
    {
      id: '4',
      name: 'Research Archive',
      description: 'User research findings, interviews, surveys, and analysis reports',
      type: 'smart',
      query: 'type:pdf,docx (research OR interview OR survey OR analysis)',
      itemCount: 234,
      collaborators: [
        { name: 'Alex Thompson', avatar: 'AT', role: 'owner' }
      ],
      isPrivate: false,
      hasAlerts: false,
      lastModified: '1 week ago',
      tags: ['research', 'user', 'data']
    },
    {
      id: '5',
      name: 'Personal Knowledge Base',
      description: 'My personal collection of bookmarks, notes, and references',
      type: 'manual',
      itemCount: 78,
      collaborators: [
        { name: 'You', avatar: 'ME', role: 'owner' }
      ],
      isPrivate: true,
      hasAlerts: false,
      lastModified: '2 weeks ago',
      tags: ['personal', 'knowledge', 'reference']
    }
  ]

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'owned' && collection.collaborators.some(c => c.role === 'owner' && c.name === 'You')) ||
                      (selectedTab === 'shared' && collection.collaborators.length > 1) ||
                      (selectedTab === 'smart' && collection.type === 'smart')
    
    return matchesSearch && matchesTab
  })

  const getCollectionIcon = (type: Collection['type']) => {
    switch (type) {
      case 'smart': return <Search className="w-4 h-4" />
      case 'shared': return <Users className="w-4 h-4" />
      default: return <Folder className="w-4 h-4" />
    }
  }

  const CollectionCard = ({ collection }: { collection: Collection }) => (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-lg">
              {getCollectionIcon(collection.type)}
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {collection.name}
                {collection.isPrivate && <Lock className="w-3 h-3" />}
                {collection.hasAlerts && <Bell className="w-3 h-3 text-primary" />}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {collection.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {collection.itemCount} items
                </span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Collection
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="mb-3 line-clamp-2">
          {collection.description}
        </CardDescription>
        
        {collection.query && (
          <div className="mb-3 p-2 bg-muted/30 rounded text-xs font-mono text-muted-foreground">
            {collection.query}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1">
            {collection.collaborators.slice(0, 3).map((collaborator, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                <AvatarFallback className="text-xs">{collaborator.avatar}</AvatarFallback>
              </Avatar>
            ))}
            {collection.collaborators.length > 3 && (
              <div className="w-6 h-6 bg-muted border-2 border-background rounded-full flex items-center justify-center text-xs text-muted-foreground">
                +{collection.collaborators.length - 3}
              </div>
            )}
          </div>
          
          <span className="text-xs text-muted-foreground">
            {collection.lastModified}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {collection.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const CollectionListItem = ({ collection }: { collection: Collection }) => (
    <div className="group flex items-center gap-4 p-4 border rounded-lg hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="p-2 bg-muted rounded-lg">
        {getCollectionIcon(collection.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium truncate">{collection.name}</h4>
          {collection.isPrivate && <Lock className="w-3 h-3" />}
          {collection.hasAlerts && <Bell className="w-3 h-3 text-primary" />}
          <Badge variant="outline" className="text-xs capitalize">
            {collection.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{collection.description}</p>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{collection.itemCount} items</span>
        <div className="flex -space-x-1">
          {collection.collaborators.slice(0, 3).map((collaborator, index) => (
            <Avatar key={index} className="w-6 h-6 border-2 border-background">
              <AvatarFallback className="text-xs">{collaborator.avatar}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span>{collection.lastModified}</span>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="w-4 h-4 mr-2" />
            View Collection
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1>Collections</h1>
          <p className="text-muted-foreground">Organize and share groups of files across all your connected sources.</p>
        </div>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
              <DialogDescription>
                Organize files from across your connected sources into a collection.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input id="name" placeholder="Enter collection name..." />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="What does this collection contain?" />
              </div>
              
              <div className="grid gap-2">
                <Label>Collection Type</Label>
                <Select defaultValue="manual">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Collection</SelectItem>
                    <SelectItem value="smart">Smart Collection (Auto-updating)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="private" />
                <Label htmlFor="private">Make this collection private</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="alerts" />
                <Label htmlFor="alerts">Enable alerts for new matching files</Label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button onClick={() => setIsCreating(false)}>Create Collection</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Collections</TabsTrigger>
            <TabsTrigger value="owned">Owned by Me</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="smart">Smart Collections</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 w-7 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-7 w-7 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Collections */}
      {filteredCollections.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCollections.map(collection => (
              <CollectionListItem key={collection.id} collection={collection} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <FolderPlus className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="mb-2">No collections found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? 'Try adjusting your search terms.' : 'Create your first collection to organize files across your connected sources.'}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Collection
            </Button>
          )}
        </div>
      )}
    </div>
  )
}