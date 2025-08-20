'use client'

import React, { useState } from 'react'
import { 
  Plus, Check, AlertCircle, Loader2, Settings, Trash2,
  RefreshCw, ExternalLink, Shield, Clock, ChevronRight,
  FileText, Image, Users, MessageSquare, Code, Zap
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { Progress } from './ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export type ConnectorState = 'available' | 'connecting' | 'connected' | 'error' | 'disabled'
export type ConnectorProvider = 'google-drive' | 'onedrive' | 'dropbox' | 'slack' | 'github' | 'notion'

interface ConnectorConfig {
  id: ConnectorProvider
  name: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
  permissions: string[]
  fileTypes: string[]
  limitations?: string[]
}

const CONNECTOR_CONFIGS: ConnectorConfig[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Search documents, spreadsheets, presentations, and files',
    icon: '📊', // In real app, would use proper Google Drive icon
    color: 'bg-blue-500',
    features: ['Documents', 'Spreadsheets', 'Presentations', 'PDFs', 'Images'],
    permissions: ['Read your Google Drive files', 'View file metadata', 'Access shared files'],
    fileTypes: ['docs', 'sheets', 'slides', 'pdf', 'images'],
    limitations: ['Shared drives require admin approval']
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    description: 'Search Office documents and personal files',
    icon: '☁️',
    color: 'bg-blue-600',
    features: ['Word Documents', 'Excel Files', 'PowerPoint', 'PDFs', 'OneNote'],
    permissions: ['Read your OneDrive files', 'Access shared files', 'View file properties'],
    fileTypes: ['docx', 'xlsx', 'pptx', 'pdf', 'one'],
    limitations: ['Business accounts may require admin consent']
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Search all your Dropbox files and folders',
    icon: '📦',
    color: 'bg-blue-700',
    features: ['All File Types', 'Paper Documents', 'Shared Folders', 'Version History'],
    permissions: ['Read your Dropbox files', 'Access shared folders', 'View file metadata'],
    fileTypes: ['all', 'paper', 'shared'],
    limitations: ['Business features require team plan']
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Search messages, files, and conversations',
    icon: '💬',
    color: 'bg-purple-600',
    features: ['Messages', 'Files', 'Channels', 'Direct Messages'],
    permissions: ['Read messages', 'Access file attachments', 'View channel information'],
    fileTypes: ['messages', 'files', 'channels'],
    limitations: ['Free plans have limited message history']
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Search repositories, issues, and documentation',
    icon: '🔧',
    color: 'bg-gray-800',
    features: ['Repositories', 'Issues', 'Pull Requests', 'Wiki', 'README files'],
    permissions: ['Read repository contents', 'Access issues and PRs', 'View metadata'],
    fileTypes: ['code', 'markdown', 'issues'],
    limitations: ['Private repos require appropriate access']
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Search pages, databases, and knowledge base',
    icon: '📝',
    color: 'bg-gray-900',
    features: ['Pages', 'Databases', 'Comments', 'Templates'],
    permissions: ['Read workspace content', 'Access shared pages', 'View page properties'],
    fileTypes: ['pages', 'databases', 'templates'],
    limitations: ['Guest access is limited to shared pages']
  }
]

// Connector Tile Component
interface ConnectorTileProps {
  connector: ConnectorConfig
  state?: ConnectorState
  connected?: boolean
  lastSync?: string
  fileCount?: number
  onConnect?: () => void
  onManage?: () => void
  className?: string
}

export function ConnectorTile({
  connector,
  state = 'available',
  connected = false,
  lastSync,
  fileCount,
  onConnect,
  onManage,
  className = ""
}: ConnectorTileProps) {
  const getStateContent = () => {
    switch (state) {
      case 'connecting':
        return {
          icon: <Loader2 className="icon-sm animate-spin" />,
          label: 'Connecting...',
          action: null
        }
      case 'connected':
        return {
          icon: <Check className="icon-sm text-success" />,
          label: 'Connected',
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={onManage}
              className="atlas-hover atlas-focus-ring"
            >
              <Settings className="icon-xs mr-1" />
              Manage
            </Button>
          )
        }
      case 'error':
        return {
          icon: <AlertCircle className="icon-sm text-destructive" />,
          label: 'Connection Error',
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={onConnect}
              className="atlas-hover atlas-focus-ring"
            >
              <RefreshCw className="icon-xs mr-1" />
              Retry
            </Button>
          )
        }
      case 'disabled':
        return {
          icon: <Shield className="icon-sm text-muted-foreground" />,
          label: 'Unavailable',
          action: null
        }
      default:
        return {
          icon: <Plus className="icon-sm" />,
          label: 'Connect',
          action: (
            <Button
              variant="default"
              size="sm"
              onClick={onConnect}
              className="atlas-button-states atlas-focus-ring"
            >
              <Plus className="icon-xs mr-1" />
              Connect
            </Button>
          )
        }
    }
  }

  const stateContent = getStateContent()

  return (
    <Card className={`
      cursor-pointer atlas-card-hover atlas-focus-ring
      ${connected ? 'border-success bg-success/5' : ''}
      ${state === 'error' ? 'border-destructive bg-destructive/5' : ''}
      ${state === 'disabled' ? 'opacity-60 cursor-not-allowed' : ''}
      ${className}
    `}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${connector.color} flex items-center justify-center text-white text-lg`}>
              {connector.icon}
            </div>
            <div>
              <CardTitle className="text-base">{connector.name}</CardTitle>
              <CardDescription className="text-sm">
                {connector.description}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {stateContent.icon}
            <span className="text-sm font-medium">{stateContent.label}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Connected status info */}
        {connected && (
          <div className="space-y-2 mb-4">
            {fileCount && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Files indexed:</span>
                <span className="font-medium">{fileCount.toLocaleString()}</span>
              </div>
            )}
            {lastSync && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last synced:</span>
                <span className="font-medium">{lastSync}</span>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">What you can search:</h4>
          <div className="flex flex-wrap gap-1">
            {connector.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {connector.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{connector.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          {stateContent.action}
        </div>

        {/* Limitations warning */}
        {connector.limitations && state === 'available' && (
          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="icon-xs text-warning mt-0.5 flex-shrink-0" />
              <span className="text-warning">
                {connector.limitations[0]}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Connection Modal Component
interface ConnectModalProps {
  isOpen: boolean
  onClose: () => void
  connector?: ConnectorConfig
  onConnect?: (connectorId: ConnectorProvider) => void
}

export function ConnectModal({ isOpen, onClose, connector, onConnect }: ConnectModalProps) {
  const [step, setStep] = useState<'permissions' | 'connecting' | 'success' | 'error'>('permissions')
  const [progress, setProgress] = useState(0)

  const handleConnect = () => {
    if (!connector) return

    setStep('connecting')
    setProgress(0)

    // Simulate connection progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          
          // Simulate success or error
          setTimeout(() => {
            const success = Math.random() > 0.2 // 80% success rate for demo
            setStep(success ? 'success' : 'error')
            if (success) {
              onConnect?.(connector.id)
            }
          }, 500)
          
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 200)
  }

  const handleRetry = () => {
    setStep('permissions')
    setProgress(0)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('permissions')
      setProgress(0)
    }, 300)
  }

  if (!connector) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md atlas-animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${connector.color} flex items-center justify-center text-white`}>
              {connector.icon}
            </div>
            Connect {connector.name}
          </DialogTitle>
          <DialogDescription>
            {step === 'permissions' && 'Review the permissions Atlas needs to search your files'}
            {step === 'connecting' && `Connecting to ${connector.name}...`}
            {step === 'success' && `Successfully connected to ${connector.name}!`}
            {step === 'error' && `Failed to connect to ${connector.name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'permissions' && (
            <>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Atlas will be able to:</h4>
                <ul className="space-y-2">
                  {connector.permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="icon-xs text-success mt-0.5 flex-shrink-0" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Alert>
                <Shield className="icon-sm" />
                <AlertDescription className="text-sm">
                  Atlas only reads your files to make them searchable. We never modify, share, or store your file contents.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="atlas-hover atlas-focus-ring"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleConnect}
                  className="atlas-button-states atlas-focus-ring"
                >
                  <ExternalLink className="icon-sm mr-2" />
                  Continue to {connector.name}
                </Button>
              </div>
            </>
          )}

          {step === 'connecting' && (
            <div className="space-y-4 py-6">
              <div className="text-center">
                <Loader2 className="icon-xl animate-spin mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Establishing secure connection...
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4 py-6 text-center">
              <Check className="icon-xl text-success mx-auto" />
              <div className="space-y-2">
                <h3 className="font-medium">Connection successful!</h3>
                <p className="text-sm text-muted-foreground">
                  Your {connector.name} files will be indexed and searchable within a few minutes.
                </p>
              </div>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="atlas-hover atlas-focus-ring"
                >
                  Done
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    handleClose()
                    // Would navigate to search in real app
                  }}
                  className="atlas-button-states atlas-focus-ring"
                >
                  Start Searching
                </Button>
              </div>
            </div>
          )}

          {step === 'error' && (
            <div className="space-y-4 py-6 text-center">
              <AlertCircle className="icon-xl text-destructive mx-auto" />
              <div className="space-y-2">
                <h3 className="font-medium">Connection failed</h3>
                <p className="text-sm text-muted-foreground">
                  We couldn't connect to {connector.name}. This might be due to network issues or permission settings.
                </p>
              </div>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="atlas-hover atlas-focus-ring"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleRetry}
                  className="atlas-button-states atlas-focus-ring"
                >
                  <RefreshCw className="icon-sm mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Connected Account Card Component
interface ConnectedAccountCardProps {
  connector: ConnectorConfig
  connectionDate: string
  fileCount: number
  lastSync: string
  syncStatus: 'synced' | 'syncing' | 'error' | 'paused'
  onReconnect?: () => void
  onDisconnect?: () => void
  onViewFiles?: () => void
}

export function ConnectedAccountCard({
  connector,
  connectionDate,
  fileCount,
  lastSync,
  syncStatus,
  onReconnect,
  onDisconnect,
  onViewFiles
}: ConnectedAccountCardProps) {
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false)

  const getSyncStatusContent = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          icon: <Loader2 className="icon-xs animate-spin text-blue-600" />,
          label: 'Syncing...',
          color: 'text-blue-600'
        }
      case 'error':
        return {
          icon: <AlertCircle className="icon-xs text-destructive" />,
          label: 'Sync error',
          color: 'text-destructive'
        }
      case 'paused':
        return {
          icon: <Clock className="icon-xs text-warning" />,
          label: 'Paused',
          color: 'text-warning'
        }
      default:
        return {
          icon: <Check className="icon-xs text-success" />,
          label: 'Up to date',
          color: 'text-success'
        }
    }
  }

  const syncContent = getSyncStatusContent()

  return (
    <>
      <Card className="atlas-card-hover">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${connector.color} flex items-center justify-center text-white text-lg`}>
                {connector.icon}
              </div>
              <div>
                <CardTitle className="text-base">{connector.name}</CardTitle>
                <CardDescription className="text-sm">
                  Connected on {connectionDate}
                </CardDescription>
              </div>
            </div>
            
            <Badge variant="outline" className="flex items-center gap-1">
              {syncContent.icon}
              <span className={syncContent.color}>{syncContent.label}</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Files indexed:</span>
              <div className="font-medium">{fileCount.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Last synced:</span>
              <div className="font-medium">{lastSync}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-2">
            <div className="flex gap-2">
              {onViewFiles && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewFiles}
                  className="atlas-hover atlas-focus-ring"
                >
                  <FileText className="icon-xs mr-1" />
                  View Files
                </Button>
              )}
              
              {syncStatus === 'error' && onReconnect && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReconnect}
                  className="atlas-hover atlas-focus-ring"
                >
                  <RefreshCw className="icon-xs mr-1" />
                  Reconnect
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDisconnectConfirm(true)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 atlas-hover atlas-focus-ring"
            >
              <Trash2 className="icon-xs mr-1" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disconnect confirmation dialog */}
      <Dialog open={showDisconnectConfirm} onOpenChange={setShowDisconnectConfirm}>
        <DialogContent className="sm:max-w-md atlas-animate-scale-in">
          <DialogHeader>
            <DialogTitle>Disconnect {connector.name}?</DialogTitle>
            <DialogDescription>
              This will remove all indexed files from {connector.name} and you'll lose access to search them in Atlas.
            </DialogDescription>
          </DialogHeader>

          <Alert className="border-warning bg-warning/5">
            <AlertCircle className="icon-sm text-warning" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">You'll lose access to:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• {fileCount.toLocaleString()} indexed files</li>
                  <li>• Search history for this source</li>
                  <li>• Any saved searches or collections</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDisconnectConfirm(false)}
              className="atlas-hover atlas-focus-ring"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDisconnect?.()
                setShowDisconnectConfirm(false)
              }}
              className="atlas-button-states atlas-focus-ring"
            >
              <Trash2 className="icon-sm mr-2" />
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Main Connectors Page Component
export function ConnectorsPage() {
  const [connectedServices, setConnectedServices] = useState<Set<ConnectorProvider>>(new Set(['google-drive']))
  const [connectingService, setConnectingService] = useState<ConnectorProvider | null>(null)
  const [selectedConnector, setSelectedConnector] = useState<ConnectorConfig | null>(null)
  const [showConnectModal, setShowConnectModal] = useState(false)

  const handleConnect = (connectorId: ConnectorProvider) => {
    setConnectingService(connectorId)
    const connector = CONNECTOR_CONFIGS.find(c => c.id === connectorId)
    setSelectedConnector(connector || null)
    setShowConnectModal(true)
  }

  const handleConnectionSuccess = (connectorId: ConnectorProvider) => {
    setConnectedServices(prev => new Set([...prev, connectorId]))
    setShowConnectModal(false)
    setConnectingService(null)
  }

  const handleDisconnect = (connectorId: ConnectorProvider) => {
    setConnectedServices(prev => {
      const newSet = new Set(prev)
      newSet.delete(connectorId)
      return newSet
    })
  }

  const availableConnectors = CONNECTOR_CONFIGS.filter(c => !connectedServices.has(c.id))
  const connectedConnectors = CONNECTOR_CONFIGS.filter(c => connectedServices.has(c.id))

  return (
    <div className="space-y-8">
      {/* Connected Services */}
      {connectedConnectors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Connected Sources</h2>
          <div className="grid gap-4">
            {connectedConnectors.map((connector) => (
              <ConnectedAccountCard
                key={connector.id}
                connector={connector}
                connectionDate="January 15, 2024"
                fileCount={1247}
                lastSync="2 hours ago"
                syncStatus="synced"
                onDisconnect={() => handleDisconnect(connector.id)}
                onViewFiles={() => console.log('View files for', connector.name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Services */}
      {availableConnectors.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Sources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {availableConnectors.map((connector) => (
              <ConnectorTile
                key={connector.id}
                connector={connector}
                state={connectingService === connector.id ? 'connecting' : 'available'}
                onConnect={() => handleConnect(connector.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Connect Modal */}
      <ConnectModal
        isOpen={showConnectModal}
        onClose={() => {
          setShowConnectModal(false)
          setConnectingService(null)
        }}
        connector={selectedConnector}
        onConnect={handleConnectionSuccess}
      />
    </div>
  )
}