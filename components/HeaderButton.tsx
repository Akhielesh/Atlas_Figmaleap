'use client'

import React from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface HeaderButtonProps {
  icon: React.ReactNode
  tooltip: string
  shortcut?: string
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  isThemeToggle?: boolean
  [key: string]: any // For data attributes
}

const HeaderButton = React.forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ 
    icon, 
    tooltip, 
    shortcut, 
    onClick, 
    className = "", 
    variant = "ghost", 
    size = "sm", 
    isThemeToggle = false,
    ...props 
  }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              variant={variant}
              size={size}
              onClick={onClick}
              className={`
                h-8 w-8 p-0 atlas-hover atlas-focus-ring
                hover:bg-accent/80 hover:text-accent-foreground
                focus-visible:bg-accent/80 focus-visible:text-accent-foreground
                ${isThemeToggle ? 'atlas-theme-toggle' : ''}
                ${className}
              `}
              {...props}
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="flex items-center gap-2 atlas-animate-fade-in"
            sideOffset={8}
          >
            <span>{tooltip}</span>
            {shortcut && (
              <kbd className="px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                {shortcut}
              </kbd>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

HeaderButton.displayName = 'HeaderButton'

export { HeaderButton }