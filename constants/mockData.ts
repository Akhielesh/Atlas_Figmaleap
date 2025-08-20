// Mock data constants for Atlas application

export const generateMockResults = (page: number, pageSize: number) => {
  const allResults = [
    {
      id: '1',
      title: 'Atlas Design System <mark>Guidelines</mark>',
      snippet: 'Comprehensive design system documentation covering typography, colors, spacing, and component specifications for the <mark>Atlas</mark> search platform.',
      breadcrumb: 'Design System / Documentation',
      type: 'pdf',
      source: 'Google Drive',
      permission: 'edit' as const,
      lastModified: '2 hours ago',
      dateModified: new Date('2024-01-15T14:30:00'),
      dateCreated: new Date('2024-01-10T09:00:00'),
      starred: true,
      shared: false,
      tags: ['design', 'guidelines', 'system'],
      size: 2.4 * 1024 * 1024,
      owner: 'Design Team',
      previewAvailable: true,
      syncStatus: 'synced' as const,
      thumbnail: undefined,
      appUrl: 'https://drive.google.com/file/d/1abc123/view'
    },
    {
      id: '2',
      title: 'Q4 Product <mark>Roadmap</mark> Presentation',
      snippet: 'Strategic planning document outlining key features and milestones for the upcoming quarter, including search improvements and new connector integrations.',
      breadcrumb: 'Product / Planning / 2024',
      type: 'pptx',
      source: 'OneDrive',
      permission: 'view' as const,
      lastModified: '1 day ago',
      dateModified: new Date('2024-01-14T16:20:00'),
      dateCreated: new Date('2024-01-12T11:30:00'),
      starred: false,
      shared: true,
      tags: ['roadmap', 'planning', 'Q4'],
      size: 8.7 * 1024 * 1024,
      owner: 'Alice Johnson',
      previewAvailable: true,
      syncStatus: 'synced' as const,
      thumbnail: undefined,
      appUrl: 'https://onedrive.live.com/view.aspx?resid=456'
    },
    {
      id: '3',
      title: 'User Research Findings - Search Behavior Analysis',
      snippet: 'Detailed analysis of user search patterns and behavior across different content types. Includes recommendations for improving search relevance.',
      breadcrumb: 'Research / User Studies / 2024',
      type: 'docx',
      source: 'Dropbox',
      permission: 'owner' as const,
      lastModified: '3 days ago',
      dateModified: new Date('2024-01-12T10:15:00'),
      dateCreated: new Date('2024-01-08T14:45:00'),
      starred: false,
      shared: false,
      tags: ['research', 'users', 'behavior'],
      size: 5.2 * 1024 * 1024,
      owner: 'You',
      previewAvailable: true,
      syncStatus: 'syncing' as const,
      thumbnail: undefined,
      appUrl: null
    },
    {
      id: '4',
      title: 'API Integration <mark>Documentation</mark>',
      snippet: 'Technical documentation for integrating with external APIs, including authentication flows and rate limiting strategies.',
      breadcrumb: 'Engineering / Documentation',
      type: 'md',
      source: 'GitHub',
      permission: 'edit' as const,
      lastModified: '5 days ago',
      dateModified: new Date('2024-01-10T13:45:00'),
      dateCreated: new Date('2024-01-05T08:30:00'),
      starred: true,
      shared: true,
      tags: ['api', 'integration', 'docs'],
      size: 0.8 * 1024 * 1024,
      owner: 'Bob Smith',
      previewAvailable: false,
      syncStatus: 'error' as const,
      thumbnail: undefined,
      appUrl: 'https://github.com/company/docs/blob/main/api.md'
    }
  ]

  const start = (page - 1) * pageSize
  const end = start + pageSize
  return allResults.slice(start, end)
}

export const mockPreviewItem = {
  id: '1',
  title: 'Atlas Design System Guidelines',
  type: 'pdf',
  source: 'Google Drive',
  owner: 'Design Team',
  size: '2.4 MB',
  path: '/Design System/Documentation/atlas-guidelines-v2.pdf',
  lastModified: 'January 15, 2024 at 3:42 PM',
  permissions: [
    { user: 'Design Team', role: 'Owner' },
    { user: 'Alice Johnson', role: 'Editor' },
    { user: 'Bob Smith', role: 'Viewer' }
  ],
  activity: [
    { action: 'opened this file', user: 'You', date: '2 hours ago' },
    { action: 'added a comment', user: 'Alice Johnson', date: '1 day ago' },
    { action: 'shared this file', user: 'Design Team', date: '3 days ago' },
    { action: 'created this file', user: 'Design Team', date: '1 week ago' }
  ],
  content: '<h1>Design System Guidelines</h1><p>This document outlines the comprehensive design system for Atlas.</p>',
  canShare: true,
  canEdit: true,
  canDownload: true,
  previewUrl: '/mock-preview.pdf',
  appUrl: 'https://drive.google.com/file/d/1abc123/view',
  comments: [
    {
      id: '1',
      user: 'Alice Johnson',
      content: 'Love the new spacing scale!',
      date: '1 day ago',
      resolved: false
    }
  ],
  versions: [
    { version: '2.1', date: '2 hours ago', user: 'Design Team', size: '2.4 MB', current: true }
  ]
}

export const initialFilterSections = [
  {
    id: 'source',
    title: 'Source',
    collapsed: false,
    multiSelect: true,
    options: [
      { id: 'gdrive', label: 'Google Drive', count: 156, selected: false },
      { id: 'onedrive', label: 'OneDrive', count: 89, selected: false },
      { id: 'dropbox', label: 'Dropbox', count: 43, selected: false },
      { id: 'slack', label: 'Slack', count: 234, selected: false },
      { id: 'github', label: 'GitHub', count: 67, selected: false }
    ]
  },
  {
    id: 'type',
    title: 'File Type',
    collapsed: false,
    multiSelect: true,
    options: [
      { id: 'pdf', label: 'PDF', count: 67, selected: false },
      { id: 'docx', label: 'Document', count: 123, selected: false },
      { id: 'pptx', label: 'Presentation', count: 45, selected: false },
      { id: 'xlsx', label: 'Spreadsheet', count: 32, selected: false },
      { id: 'image', label: 'Image', count: 89, selected: false },
      { id: 'md', label: 'Markdown', count: 23, selected: false }
    ]
  },
  {
    id: 'owner',
    title: 'Owner',
    collapsed: false,
    options: [
      { id: 'me', label: 'Me', count: 234, selected: false },
      { id: 'alice', label: 'Alice Johnson', count: 67, selected: false },
      { id: 'bob', label: 'Bob Smith', count: 43, selected: false },
      { id: 'team', label: 'Design Team', count: 156, selected: false }
    ]
  },
  {
    id: 'flags',
    title: 'Flags',
    collapsed: false,
    multiSelect: true,
    options: [
      { id: 'starred', label: 'Starred', count: 23, selected: false },
      { id: 'shared', label: 'Shared with me', count: 87, selected: false },
      { id: 'recent', label: 'Recently viewed', count: 45, selected: false }
    ]
  }
]

export const pagesWithFooter = ['home', 'about', 'settings', 'profile', 'analytics']

export const defaultRecentSearches = [
  'quarterly reports', 
  'design system', 
  'meeting notes'
]