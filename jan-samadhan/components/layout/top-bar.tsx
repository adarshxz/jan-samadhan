'use client';

import { useState } from 'react';
import { Bell, Search, Menu, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { UserRole } from '@/lib/types';

interface TopBarProps {
  role?: UserRole;
  onMenuClick?: () => void;
}

export function TopBar({ role, onMenuClick }: TopBarProps) {
  const { user, currentUser, currentRole, notifications } = useAppStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const activeRole: UserRole = role || currentRole || 'citizen';
  const unreadCount = notifications.filter(n => !n.read && (!n.forRole || n.forRole.includes(activeRole))).length;
  const [showProfile, setShowProfile] = useState(false);

  const roleColors: Record<string, string> = {
    citizen: 'bg-blue-600',
    government: 'bg-navy-700',
    university: 'bg-purple-600',
    industry: 'bg-emerald-600',
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 sm:px-6 shrink-0"
      style={{ backgroundColor: 'color-mix(in srgb, var(--topbar) 88%, transparent)', borderColor: 'var(--topbar-border)', boxShadow: 'var(--shadow-xs)', backdropFilter: 'blur(16px)' }}>
      {/* Left */}
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="p-1.5 rounded-md lg:hidden transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {/* Search trigger */}
        <div
          className="hidden md:flex items-center gap-2 pl-3 pr-12 py-2 rounded-xl text-sm border"
          style={{ backgroundColor: 'var(--surface-secondary)', borderColor: 'var(--border)', color: 'var(--text-subtle)' }}
        >
          <Search className="w-4 h-4" />
          Search challenges, projects...
          <kbd className="ml-auto hidden sm:inline-flex text-[10px] font-mono border rounded px-1"
            style={{ color: 'var(--text-subtle)', borderColor: 'var(--border)' }}>⌘K</kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Language */}
        <button className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
          <Globe className="w-4 h-4" />
          <span>EN</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button
          onClick={() => router.push(`/${activeRole}/notifications`)}
          className="relative p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors"
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0', roleColors[activeRole] || 'bg-teal-600')}>
              {(user?.name || currentUser?.name || 'U').charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-medium leading-tight" style={{ color: 'var(--foreground)' }}>{user?.name || currentUser?.name || 'User'}</div>
              <div className="text-[10px] capitalize leading-tight" style={{ color: 'var(--text-muted)' }}>{activeRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 hidden sm:block" style={{ color: 'var(--text-subtle)' }} />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-1 w-52 rounded-lg z-50 animate-slide-up"
              style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
              <div className="p-3 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900">{currentUser?.name}</div>
                <div className="text-xs text-gray-500">{currentUser?.email}</div>
              </div>
              <div className="p-1">
                <button onClick={() => { router.push(`/${role}/profile`); setShowProfile(false); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">Profile</button>
                <button onClick={() => { router.push('/login'); setShowProfile(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
