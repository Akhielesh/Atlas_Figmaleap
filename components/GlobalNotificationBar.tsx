'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, RefreshCw, Settings, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface NotificationAction {
  label: string
  onClick: () => void
  variant?: 'default' | 'outline' | 'secondary'
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  actions?: NotificationAction[]
  persistent?: boolean
  duration?: number // in milliseconds
  showProgress?: boolean
}

interface GlobalNotificationBarProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  position?: 'top' | 'bottom'
  className?: string
}

export function GlobalNotificationBar({ 
  notifications, 
  onDismiss, 
  position = 'top',
  className = "" 
}: GlobalNotificationBarProps) {
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set())
  const [progressTimes, setProgressTimes] = useState<Record<string, number>>({})

  // Auto-dismiss logic
  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.persistent && !dismissingIds.has(notification.id)) {
        const duration = notification.duration || (notification.type === 'info' || notification.type === 'success' ? 6000 : 0)
        
        if (duration > 0) {
          // Initialize progress
          if (notification.showProgress) {
            setProgressTimes(prev => ({ ...prev, [notification.id]: duration }))
            
            // Update progress every 100ms
            const progressInterval = setInterval(() => {
              setProgressTimes(prev => {
                const remaining = prev[notification.id] - 100
                if (remaining <= 0) {
                  clearInterval(progressInterval)
                  return { ...prev, [notification.id]: 0 }
                }
                return { ...prev, [notification.id]: remaining }
              })
            }, 100)
          }

          const timer = setTimeout(() => {
            handleDismiss(notification.id)
          }, duration)

          return () => {
            clearTimeout(timer)
            if (notification.showProgress) {
              setProgressTimes(prev => {
                const { [notification.id]: _, ...rest } = prev
                return rest
              })
            }
          }
        }
      }
    })
  }, [notifications, dismissingIds])

  const handleDismiss = (id: string) => {
    setDismissingIds(prev => new Set(prev).add(id))
    
    // Remove from progress tracking
    setProgressTimes(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
    
    // Delay actual dismissal to show animation
    setTimeout(() => {
      onDismiss(id)
      setDismissingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 200)
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'error':
        return <AlertCircle className="w-4 h-4" />
      case 'info':
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getNotificationColors = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          icon: 'text-green-600 dark:text-green-400',
          progress: 'bg-green-500'
        }
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-800 dark:text-amber-200',
          icon: 'text-amber-600 dark:text-amber-400',
          progress: 'bg-amber-500'
        }
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          icon: 'text-red-600 dark:text-red-400',
          progress: 'bg-red-500'
        }
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          icon: 'text-blue-600 dark:text-blue-400',
          progress: 'bg-blue-500'
        }
    }
  }

  const getAriaRole = (type: NotificationType) => {
    return type === 'error' || type === 'warning' ? 'alert' : 'status'
  }

  if (notifications.length === 0) return null

  return (
    <div 
      className={`
        fixed left-0 right-0 z-[100] ${position === 'top' ? 'top-0' : 'bottom-0'}
        ${className}
      `}
    >
      <div className="space-y-1">
        {notifications.map((notification) => {
          const colors = getNotificationColors(notification.type)
          const isDismissing = dismissingIds.has(notification.id)
          const progress = progressTimes[notification.id]
          const progressPercent = progress ? ((progress / (notification.duration || 6000)) * 100) : 0

          return (
            <div
              key={notification.id}
              role={getAriaRole(notification.type)}
              aria-live={notification.type === 'error' ? 'assertive' : 'polite'}
              aria-atomic="true"
              className={`
                ${colors.bg} ${colors.border} ${colors.text}
                border-b min-h-[40px] max-h-[48px] px-4 py-2
                flex items-center gap-3 atlas-modal
                ${position === 'top' ? 'atlas-animate-slide-in' : 'animate-in slide-in-from-bottom'}
                ${isDismissing ? 'animate-out slide-out-to-top duration-200' : ''}
                relative overflow-hidden
              `}
            >
              {/* Progress bar */}
              {notification.showProgress && progress !== undefined && progress > 0 && (
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 ${colors.progress} atlas-hover`}
                  style={{ width: `${100 - progressPercent}%` }}
                />
              )}

              {/* Icon */}
              <div className={`flex-shrink-0 ${colors.icon} atlas-animate-fade-in`}>
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{notification.title}</p>
                    {notification.message && (
                      <p className="text-sm opacity-90 truncate">{notification.message}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {notification.actions && notification.actions.length > 0 && (
                    <div className="flex items-center gap-2 atlas-animate-fade-in">
                      {notification.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant={action.variant || 'outline'}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            action.onClick()
                          }}
                          className="h-7 px-2 text-xs atlas-hover"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(notification.id)}
                    className="h-6 w-6 p-0 atlas-hover hover:bg-black/10 dark:hover:bg-white/10"
                    aria-label={`Dismiss ${notification.title}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { ...notification, id }])
    return id
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Convenience methods
  const showInfo = (title: string, message?: string, actions?: NotificationAction[]) => {
    return addNotification({ type: 'info', title, message, actions, showProgress: true })
  }

  const showSuccess = (title: string, message?: string, actions?: NotificationAction[]) => {
    return addNotification({ type: 'success', title, message, actions, showProgress: true })
  }

  const showWarning = (title: string, message?: string, actions?: NotificationAction[]) => {
    return addNotification({ type: 'warning', title, message, actions, persistent: true })
  }

  const showError = (title: string, message?: string, actions?: NotificationAction[]) => {
    return addNotification({ type: 'error', title, message, actions, persistent: true })
  }

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAllNotifications,
    showInfo,
    showSuccess,
    showWarning,
    showError
  }
}