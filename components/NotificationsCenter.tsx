'use client'

import React, { useState } from 'react'
import { 
  Bell, X, Check, Star, Share2, FileText, Users, 
  AlertTriangle, CheckCircle, Clock, Settings, Trash2
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './ui/popover'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface Notification {
  id: string
  type: 'file_shared' | 'permission_changed' | 'comment' | 'system' | 'collection' | 'search_alert'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  actionable?: boolean
  metadata?: {
    fileId?: string
    fileName?: string
    userId?: string
    userName?: string
    userAvatar?: string
  }
}

interface NotificationsCenterProps {
  className?: string
}

const NotificationsCenter = React.forwardRef<HTMLButtonElement, NotificationsCenterProps>(
  ({ className = "" }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        type: 'file_shared',
        title: 'New file shared',
        message: 'Alice Johnson shared "Q4 Budget Analysis.xlsx" with you',
        timestamp: '5 minutes ago',
        read: false,
        priority: 'medium',
        actionable: true,
        metadata: {
          fileId: '123',
          fileName: 'Q4 Budget Analysis.xlsx',
          userId: 'alice',
          userName: 'Alice Johnson',
          userAvatar: 'AJ'
        }
      },
      {
        id: '2',
        type: 'search_alert',
        title: 'Search alert triggered',
        message: 'New file matching "design system" was added to Google Drive',
        timestamp: '1 hour ago',
        read: false,
        priority: 'low',
        actionable: true,
        metadata: {
          fileName: 'Component Library Update.fig'
        }
      },
      {
        id: '3',
        type: 'permission_changed',
        title: 'Permission updated',
        message: 'Your access to "Client Project Files" was changed to Editor',
        timestamp: '2 hours ago',
        read: true,
        priority: 'medium',
        actionable: false,
        metadata: {
          userName: 'Project Manager'
        }
      },
      {
        id: '4',
        type: 'comment',
        message: 'Bob Smith commented on "Marketing Strategy.pptx"',
        title: 'New comment',
        timestamp: '3 hours ago',
        read: true,
        priority: 'low',
        actionable: true,
        metadata: {
          fileId: '456',
          fileName: 'Marketing Strategy.pptx',
          userId: 'bob',
          userName: 'Bob Smith',
          userAvatar: 'BS'
        }
      },
      {
        id: '5',
        type: 'system',
        title: 'Sync completed',
        message: 'OneDrive sync finished. 23 new files indexed.',
        timestamp: '6 hours ago',
        read: true,
        priority: 'low',
        actionable: false
      },
      {
        id: '6',
        type: 'collection',
        title: 'Collection updated',
        message: '12 new files added to "Q4 Planning Hub" collection',
        timestamp: '1 day ago',
        read: true,
        priority: 'low',
        actionable: true,
        metadata: {
          fileName: 'Q4 Planning Hub'
        }
      }
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    const getNotificationIcon = (type: Notification['type']) => {
      switch (type) {
        case 'file_shared': return <Share2 className="w-4 h-4 text-blue-500" />
        case 'permission_changed': return <Settings className="w-4 h-4 text-orange-500" />
        case 'comment': return <Users className="w-4 h-4 text-green-500" />
        case 'system': return <CheckCircle className="w-4 h-4 text-gray-500" />
        case 'collection': return <FileText className="w-4 h-4 text-purple-500" />
        case 'search_alert': return <Bell className="w-4 h-4 text-red-500" />
        default: return <Bell className="w-4 h-4" />
      }
    }

    const getPriorityColor = (priority: Notification['priority']) => {
      switch (priority) {
        case 'high': return 'border-l-red-500'
        case 'medium': return 'border-l-orange-500'
        case 'low': return 'border-l-blue-500'
        default: return 'border-l-gray-300'
      }
    }

    const markAsRead = (notificationId: string) => {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
    }

    const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (notificationId: string) => {
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
    }

    const clearAll = () => {
      setNotifications([])
    }

    const unreadNotifications = notifications.filter(n => !n.read)
    const allNotifications = notifications

    const NotificationItem = ({ notification, showActions = true }: { 
      notification: Notification
      showActions?: boolean 
    }) => (
      <div 
        className={`p-3 border-l-2 ${getPriorityColor(notification.priority)} ${
          !notification.read ? 'bg-accent/30' : ''
        } hover:bg-accent/50 transition-colors`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                  {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs px-1">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              
              {notification.metadata?.userAvatar && (
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {notification.metadata.userAvatar}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            {showActions && (
              <div className="flex items-center gap-2 mt-3">
                {!notification.read && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => markAsRead(notification.id)}
                    className="h-6 px-2 text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark read
                  </Button>
                )}
                
                {notification.actionable && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-6 px-2 text-xs"
                  >
                    View
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => deleteNotification(notification.id)}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    )

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            ref={ref}
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-0 relative ${className}`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-96 p-0" 
          align="end"
          sideOffset={8}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="h-6 px-2 text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll}
                className="h-6 w-6 p-0"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="unread" className="w-full">
            <TabsList className="w-full rounded-none border-b bg-transparent p-0">
              <TabsTrigger 
                value="unread" 
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger 
                value="all"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                All ({notifications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-96">
                {unreadNotifications.length > 0 ? (
                  <div className="space-y-1">
                    {unreadNotifications.map((notification) => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <CheckCircle className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">All caught up!</p>
                    <p className="text-xs text-muted-foreground">No new notifications</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-96">
                {allNotifications.length > 0 ? (
                  <div className="space-y-1">
                    {allNotifications.map((notification) => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <Bell className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No notifications</p>
                    <p className="text-xs text-muted-foreground">You're all set</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="p-3 border-t bg-muted/30">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              <Settings className="w-3 h-3 mr-2" />
              Notification Settings
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)

NotificationsCenter.displayName = 'NotificationsCenter'

export { NotificationsCenter }