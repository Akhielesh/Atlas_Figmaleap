'use client'

import React from 'react'
import { Search, Sun, Moon, Info, User } from 'lucide-react'
import { useNavigation } from './NavigationManager'
import { GlobalNotificationBar } from './GlobalNotificationBar'
import { GlobalFooter } from './GlobalFooter'
import { HeaderButton } from './HeaderButton'
import { Button } from './ui/button'
import { SignInPage, FreeTrialPage } from './AuthComponents'
import { ConnectorsPage } from './ConnectorComponents'
import { SettingsPage } from './SettingsPage'
import { ProfilePage } from './ProfilePage'
import { AboutPage } from './AboutPage'
import { CollectionsPage } from './CollectionsPage'
import { InsightsPage } from './InsightsPage'
import { AnalyticsPage } from './AnalyticsPage'
import { EnhancedHomePage } from './EnhancedHomePage'
import { KeyboardShortcutsHelp } from './KeyboardShortcuts'
import { pagesWithFooter } from '../constants/mockData'
import type { PageView, UserData } from '../types'

interface PageRouterProps {
  currentPage: PageView
  isAuthenticated: boolean
  user: UserData | null
  isDark: boolean
  setIsDark: (dark: boolean) => void
  notifications: any[]
  dismissNotification: (id: string) => void
  shortcuts: any[]
  onSignIn: () => void
  onGetStarted: () => void
  onConnectDrive: () => void
  onStartTrial: () => void
  onAuthSuccess?: (userData: UserData) => void
}

export function PageRouter({
  currentPage,
  isAuthenticated,
  user,
  isDark,
  setIsDark,
  notifications,
  dismissNotification,
  shortcuts,
  onSignIn,
  onGetStarted,
  onConnectDrive,
  onStartTrial,
  onAuthSuccess
}: PageRouterProps) {
  const { navigateTo } = useNavigation()
  const shouldShowFooter = pagesWithFooter.includes(currentPage)

  // Auth pages
  if (currentPage === 'signin') {
    return (
      <div className="min-h-screen bg-background atlas-animate-fade-in">
        <GlobalNotificationBar 
          notifications={notifications} 
          onDismiss={dismissNotification} 
          position="top" 
        />
        <SignInPage 
          onBack={() => navigateTo('home')}
          onSignInSuccess={onAuthSuccess}
        />
      </div>
    )
  }

  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-background atlas-animate-fade-in">
        <GlobalNotificationBar 
          notifications={notifications} 
          onDismiss={dismissNotification} 
          position="top" 
        />
        <FreeTrialPage 
          onBack={() => navigateTo('home')}
          onSignUpSuccess={onAuthSuccess}
        />
      </div>
    )
  }

  // Connectors page
  if (currentPage === 'connectors') {
    return (
      <div className="min-h-screen bg-background flex flex-col atlas-animate-fade-in">
        <GlobalNotificationBar 
          notifications={notifications} 
          onDismiss={dismissNotification} 
          position="top" 
        />
        
        <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigateTo('search')}
                className="atlas-hover atlas-focus-ring"
              >
                ← Back to Search
              </Button>
              
              <h1 className="text-lg font-semibold">Manage Connections</h1>
              
              <div className="w-20" />
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 py-8">
          <ConnectorsPage />
        </main>
      </div>
    )
  }

  // Other pages with common layout
  const renderPageWithLayout = (PageComponent: React.ComponentType<any>, props = {}) => (
    <div className="min-h-screen bg-background flex flex-col atlas-animate-fade-in">
      <GlobalNotificationBar 
        notifications={notifications} 
        onDismiss={dismissNotification} 
        position="top" 
      />
      <div className="flex-1">
        <PageComponent onBack={() => navigateTo('search')} {...props} />
      </div>
      <GlobalFooter visible={shouldShowFooter} />
    </div>
  )

  const renderPageWithoutFooter = (PageComponent: React.ComponentType<any>, props = {}) => (
    <div className="min-h-screen bg-background atlas-animate-fade-in">
      <GlobalNotificationBar 
        notifications={notifications} 
        onDismiss={dismissNotification} 
        position="top" 
      />
      <PageComponent onBack={() => navigateTo('search')} {...props} />
    </div>
  )

  switch (currentPage) {
    case 'settings':
      return renderPageWithLayout(SettingsPage)
    
    case 'profile':
      return renderPageWithLayout(ProfilePage)
    
    case 'about':
      return renderPageWithLayout(AboutPage)
    
    case 'collections':
      return renderPageWithoutFooter(CollectionsPage)
    
    case 'insights':
      return renderPageWithoutFooter(InsightsPage)
    
    case 'analytics':
      return renderPageWithLayout(AnalyticsPage)
    
    case 'home':
      return (
        <div className="min-h-screen bg-background flex flex-col atlas-animate-fade-in">
          <GlobalNotificationBar 
            notifications={notifications} 
            onDismiss={dismissNotification} 
            position="top" 
          />

          <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40 touch-target flex items-center">
            <div className="container mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 atlas-logo atlas-hover">
                  <Search className="icon-lg" />
                  <span className="text-lg font-semibold">Atlas</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <KeyboardShortcutsHelp shortcuts={shortcuts} />
                  <HeaderButton
                    icon={isDark ? <Sun className="icon-sm" /> : <Moon className="icon-sm" />}
                    tooltip={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    onClick={() => setIsDark(!isDark)}
                    isThemeToggle={true}
                  />
                  <HeaderButton
                    icon={<Info className="icon-sm" />}
                    tooltip="About"
                    onClick={() => navigateTo('about')}
                  />
                  
                  {isAuthenticated ? (
                    <HeaderButton
                      icon={<User className="icon-sm" />}
                      tooltip={`Signed in as ${user?.name || 'User'}`}
                      onClick={() => navigateTo('profile')}
                    />
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onSignIn}
                      className="atlas-hover atlas-button-states"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <EnhancedHomePage 
              onGetStarted={onGetStarted} 
              onConnectDrive={onConnectDrive}
              onSignIn={onSignIn}
              onStartTrial={onStartTrial}
            />
          </main>

          <GlobalFooter visible={shouldShowFooter} />
        </div>
      )

    default:
      return null
  }
}