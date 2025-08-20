'use client'

import React from 'react'
import { ExternalLink, Shield, FileText, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface GlobalFooterProps {
  visible?: boolean
  className?: string
}

export function GlobalFooter({ visible = true, className = "" }: GlobalFooterProps) {
  const currentYear = new Date().getFullYear()
  const systemStatus = 'operational' // operational | degraded | outage

  const getStatusConfig = () => {
    switch (systemStatus) {
      case 'operational':
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          text: 'All systems operational',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/20'
        }
      case 'degraded':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: 'Some systems degraded',
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20'
        }
      case 'outage':
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          text: 'System maintenance',
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/20'
        }
      default:
        return {
          icon: <CheckCircle className="w-3 h-3" />,
          text: 'All systems operational',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/20'
        }
    }
  }

  const statusConfig = getStatusConfig()

  if (!visible) return null

  return (
    <footer className={`
      border-t border-border bg-card/50 backdrop-blur-sm
      min-h-[40px] max-h-[48px] px-6 py-2
      flex items-center justify-between
      atlas-animate-fade-in
      ${className}
    `}>
      {/* Left Section - Copyright */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div>
          © {currentYear} Atlas. All rights reserved.
        </div>
        
        <Separator orientation="vertical" className="h-4" />
        
        {/* System Status */}
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`
                  h-6 px-2 text-xs atlas-hover
                  ${statusConfig.color} ${statusConfig.bg}
                  hover:${statusConfig.bg}
                `}
                onClick={() => window.open('https://status.atlas.com', '_blank')}
              >
                <span className="flex items-center gap-1.5">
                  {statusConfig.icon}
                  {statusConfig.text}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="atlas-animate-fade-in">
              <p>View system status page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Right Section - Legal Links */}
      <div className="flex items-center gap-3 text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground atlas-hover"
          onClick={() => window.open('/terms', '_blank')}
        >
          <FileText className="w-3 h-3 mr-1" />
          Terms of Service
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground atlas-hover"
          onClick={() => window.open('/privacy', '_blank')}
        >
          <Shield className="w-3 h-3 mr-1" />
          Privacy Policy
        </Button>
        
        <Separator orientation="vertical" className="h-4" />
        
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground atlas-hover"
          onClick={() => window.open('/help', '_blank')}
        >
          <HelpCircle className="w-3 h-3 mr-1" />
          Help & Support
          <ExternalLink className="w-2 h-2 ml-1 opacity-50" />
        </Button>
      </div>
    </footer>
  )
}