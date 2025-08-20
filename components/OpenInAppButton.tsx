'use client'

import React, { useState } from 'react'
import { ExternalLink, Loader2, AlertCircle, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Alert, AlertDescription } from './ui/alert'

export type OpenInAppState = 'available' | 'loading' | 'disabled' | 'error' | 'permission_denied'
export type OpenInAppSize = 'sm' | 'default' | 'lg'

interface OpenInAppButtonProps {
  href?: string
  appName: string
  state?: OpenInAppState
  size?: OpenInAppSize
  variant?: 'default' | 'outline' | 'ghost'
  disabled?: boolean
  disabledReason?: string
  onOpen?: () => void
  className?: string
}

export function OpenInAppButton({
  href,
  appName,
  state = 'available',
  size = 'default',
  variant = 'default',
  disabled = false,
  disabledReason,
  onOpen,
  className = ""
}: OpenInAppButtonProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    if (disabled || state === 'disabled' || state === 'error' || !href) return

    setIsOpening(true)
    onOpen?.()

    // Simulate opening in new tab
    setTimeout(() => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer')
      }
      setIsOpening(false)
    }, 300)
  }

  const getButtonContent = () => {
    if (state === 'loading' || isOpening) {
      return (
        <>
          <Loader2 className="icon-sm animate-spin" />
          Opening...
        </>
      )
    }

    if (state === 'error') {
      return (
        <>
          <AlertCircle className="icon-sm" />
          Can't Open
        </>
      )
    }

    if (state === 'permission_denied') {
      return (
        <>
          <Shield className="icon-sm" />
          No Access
        </>
      )
    }

    return (
      <>
        <ExternalLink className="icon-sm" />
        Open in {appName}
      </>
    )
  }

  const getTooltipContent = () => {
    switch (state) {
      case 'available':
        return `Open in ${appName} (new tab)`
      case 'loading':
        return 'Opening in new tab...'
      case 'disabled':
        return disabledReason || 'Not available for this item'
      case 'error':
        return `Can't open this file. The link may be broken or you may not have permission.`
      case 'permission_denied':
        return 'You don\'t have permission to open this file'
      default:
        return `Open in ${appName}`
    }
  }

  const isButtonDisabled = disabled || state === 'disabled' || state === 'error' || state === 'permission_denied' || !href

  const buttonVariant = state === 'error' || state === 'permission_denied' ? 'outline' : variant

  const button = (
    <Button
      variant={buttonVariant}
      size={size}
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={`
        atlas-button-states atlas-focus-ring touch-target gap-2
        ${state === 'error' ? 'border-destructive text-destructive hover:bg-destructive/5' : ''}
        ${state === 'permission_denied' ? 'border-warning text-warning hover:bg-warning/5' : ''}
        ${className}
      `}
      aria-label={getTooltipContent()}
    >
      {getButtonContent()}
    </Button>
  )

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="atlas-animate-fade-in">
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Error banner component for preview panels
interface OpenInAppErrorProps {
  appName: string
  onRetry?: () => void
  onContactSupport?: () => void
}

export function OpenInAppError({ appName, onRetry, onContactSupport }: OpenInAppErrorProps) {
  return (
    <Alert className="border-destructive bg-destructive/5">
      <AlertCircle className="icon-sm text-destructive" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="text-sm font-medium">Can't open this file in {appName}</p>
          <p className="text-xs text-muted-foreground">
            The file link may be broken, you may not have permission, or {appName} may be unavailable.
          </p>
          <div className="flex gap-2">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-7 px-3 text-xs atlas-hover"
              >
                Try again
              </Button>
            )}
            {onContactSupport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onContactSupport}
                className="h-7 px-3 text-xs atlas-hover"
              >
                Contact support
              </Button>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}

// Compact version for result cards
interface OpenInAppIconButtonProps {
  href?: string
  appName: string
  state?: OpenInAppState
  onOpen?: () => void
  className?: string
}

export function OpenInAppIconButton({
  href,
  appName,
  state = 'available',
  onOpen,
  className = ""
}: OpenInAppIconButtonProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (state === 'disabled' || state === 'error' || !href) return

    setIsOpening(true)
    onOpen?.()

    setTimeout(() => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer')
      }
      setIsOpening(false)
    }, 300)
  }

  const getIcon = () => {
    if (state === 'loading' || isOpening) {
      return <Loader2 className="icon-sm animate-spin" />
    }

    if (state === 'error') {
      return <AlertCircle className="icon-sm text-destructive" />
    }

    if (state === 'permission_denied') {
      return <Shield className="icon-sm text-warning" />
    }

    return <ExternalLink className="icon-sm" />
  }

  const getTooltipContent = () => {
    switch (state) {
      case 'available':
        return `Open in ${appName} (new tab)`
      case 'loading':
        return 'Opening...'
      case 'disabled':
        return 'Not available'
      case 'error':
        return 'Can\'t open this file'
      case 'permission_denied':
        return 'No permission to open'
      default:
        return `Open in ${appName}`
    }
  }

  const isDisabled = state === 'disabled' || state === 'error' || state === 'permission_denied' || !href

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            disabled={isDisabled}
            className={`
              h-8 w-8 p-0 atlas-hover atlas-focus-ring touch-target
              ${state === 'error' ? 'hover:bg-destructive/10' : ''}
              ${state === 'permission_denied' ? 'hover:bg-warning/10' : ''}
              ${className}
            `}
            aria-label={getTooltipContent()}
          >
            {getIcon()}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Demo component showing all states
export function OpenInAppShowcase() {
  return (
    <div className="p-6 space-y-6 bg-card border border-border rounded-lg">
      <h3 className="font-medium">Open in App Button States</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Available</h4>
          <div className="flex gap-2">
            <OpenInAppButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="available"
            />
            <OpenInAppIconButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="available"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Loading</h4>
          <div className="flex gap-2">
            <OpenInAppButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="loading"
            />
            <OpenInAppIconButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="loading"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Disabled</h4>
          <div className="flex gap-2">
            <OpenInAppButton
              appName="Google Drive"
              state="disabled"
              disabledReason="File link not available"
            />
            <OpenInAppIconButton
              appName="Google Drive"
              state="disabled"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Error</h4>
          <div className="flex gap-2">
            <OpenInAppButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="error"
            />
            <OpenInAppIconButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="error"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Permission Denied</h4>
          <div className="flex gap-2">
            <OpenInAppButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="permission_denied"
            />
            <OpenInAppIconButton
              href="https://drive.google.com"
              appName="Google Drive"
              state="permission_denied"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Error Banner</h4>
        <OpenInAppError
          appName="Google Drive"
          onRetry={() => console.log('Retry clicked')}
          onContactSupport={() => console.log('Contact support clicked')}
        />
      </div>
    </div>
  )
}