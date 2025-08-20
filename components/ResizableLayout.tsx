'use client'

import React, { useState, ReactNode, useRef, useEffect } from 'react'

interface ResizableLayoutProps {
  leftPanel: ReactNode
  centerPanel: ReactNode
  rightPanel: ReactNode
  className?: string
}

export function ResizableLayout({
  leftPanel,
  centerPanel,
  rightPanel,
  className = ""
}: ResizableLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(280)
  const [rightWidth, setRightWidth] = useState(320)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLeftMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDraggingLeft(true)
  }

  const handleRightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDraggingRight(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width

      if (isDraggingLeft) {
        const newLeftWidth = Math.max(200, Math.min(400, e.clientX - containerRect.left))
        setLeftWidth(newLeftWidth)
      }

      if (isDraggingRight) {
        const newRightWidth = Math.max(280, Math.min(500, containerRect.right - e.clientX))
        setRightWidth(newRightWidth)
      }
    }

    const handleMouseUp = () => {
      setIsDraggingLeft(false)
      setIsDraggingRight(false)
    }

    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDraggingLeft, isDraggingRight])

  return (
    <div ref={containerRef} className={`flex h-full ${className}`}>
      {/* Left Panel - Facets */}
      <div 
        className="flex-shrink-0 border-r border-border bg-card"
        style={{ width: leftWidth }}
      >
        {leftPanel}
      </div>

      {/* Left Resize Handle */}
      <div
        className={`group flex items-center justify-center w-1 bg-transparent hover:bg-accent/50 transition-all duration-150 cursor-col-resize flex-shrink-0 ${
          isDraggingLeft ? 'bg-accent' : ''
        }`}
        onMouseDown={handleLeftMouseDown}
      >
        <div className="w-0.5 h-8 bg-border group-hover:bg-muted-foreground transition-colors duration-150" />
      </div>

      {/* Center Panel - Results */}
      <div className="flex-1 min-w-0 flex flex-col bg-background">
        {centerPanel}
      </div>

      {/* Right Resize Handle */}
      <div
        className={`group flex items-center justify-center w-1 bg-transparent hover:bg-accent/50 transition-all duration-150 cursor-col-resize flex-shrink-0 ${
          isDraggingRight ? 'bg-accent' : ''
        }`}
        onMouseDown={handleRightMouseDown}
      >
        <div className="w-0.5 h-8 bg-border group-hover:bg-muted-foreground transition-colors duration-150" />
      </div>

      {/* Right Panel - Preview */}
      <div 
        className="flex-shrink-0 border-l border-border bg-card"
        style={{ width: rightWidth }}
      >
        {rightPanel}
      </div>
    </div>
  )
}