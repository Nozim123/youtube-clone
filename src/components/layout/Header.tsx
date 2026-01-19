import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Video, Bell, User, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * Header component with logo, search bar, and action buttons
 * Includes theme toggle and responsive search
 */
export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 h-14 bg-background border-b border-border">
      {/* Left section - Menu and Logo */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-youtube-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-1">
          <Video className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold hidden sm:inline">ViewTube</span>
        </Link>
      </div>

      {/* Center section - Search bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-l-full rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            variant="secondary"
            className="rounded-l-none rounded-r-full px-6 border border-l-0 border-input"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {/* Right section - Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-youtube-hover hidden sm:inline-flex"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-youtube-hover hidden sm:inline-flex"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-youtube-hover"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
