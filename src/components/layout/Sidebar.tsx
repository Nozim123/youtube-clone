import { Home, TrendingUp, Video, Clock, ThumbsUp, ListVideo, Settings, HelpCircle } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: TrendingUp, label: 'Trending', path: '/trending' },
  { icon: Video, label: 'Subscriptions', path: '/subscriptions' },
];

const libraryItems = [
  { icon: Clock, label: 'History', path: '/history' },
  { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
  { icon: ListVideo, label: 'Playlists', path: '/playlists' },
];

const settingsItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
];

/**
 * Sidebar navigation component
 * Collapses on mobile and shows icons only when collapsed
 */
export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-background border-r border-border transition-all duration-300 overflow-y-auto z-40',
        isOpen ? 'w-60' : 'w-0 md:w-16'
      )}
    >
      <div className={cn('py-3', isOpen ? 'px-3' : 'px-0 md:px-2')}>
        {/* Main Navigation */}
        <nav className="space-y-1 mb-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-youtube-hover transition-colors',
                !isOpen && 'md:justify-center md:px-0'
              )}
              activeClassName="bg-youtube-hover font-medium"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {isOpen && <div className="h-px bg-border my-3" />}

        {/* Library */}
        <nav className="space-y-1 mb-4">
          {isOpen && <h3 className="px-3 text-sm font-semibold text-muted-foreground mb-2">Library</h3>}
          {libraryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-youtube-hover transition-colors',
                !isOpen && 'md:justify-center md:px-0'
              )}
              activeClassName="bg-youtube-hover font-medium"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {isOpen && <div className="h-px bg-border my-3" />}

        {/* Settings */}
        <nav className="space-y-1">
          {settingsItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-youtube-hover transition-colors',
                !isOpen && 'md:justify-center md:px-0'
              )}
              activeClassName="bg-youtube-hover font-medium"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
