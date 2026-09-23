'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, AlertCircle, Map, FolderKanban, Users, Building2, 
  Briefcase, TrendingUp, BarChart3, Bell, User, Settings, Zap, LogOut, X, Sun, Moon
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const citizenNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/citizen' },
  { icon: AlertCircle, label: 'My Challenges', href: '/citizen/challenges' },
  { icon: Map, label: 'Map', href: '/citizen/map' },
  { icon: Bell, label: 'Notifications', href: '/citizen/notifications' },
  { icon: User, label: 'Profile', href: '/citizen/profile' },
];

const governmentNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Command Center', href: '/government' },
  { icon: AlertCircle, label: 'Challenges', href: '/government/challenges' },
  { icon: Map, label: 'Map', href: '/government/map' },
  { icon: FolderKanban, label: 'Projects', href: '/government/projects' },
  { icon: Building2, label: 'Institutions', href: '/government/institutions' },
  { icon: Briefcase, label: 'Industry', href: '/government/industry' },
  { icon: BarChart3, label: 'Analytics', href: '/government/analytics' },
  { icon: TrendingUp, label: 'Impact', href: '/government/impact' },
  { icon: Bell, label: 'Notifications', href: '/government/notifications' },
];

const universityNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Hub', href: '/university' },
  { icon: AlertCircle, label: 'Challenges', href: '/university/challenges' },
  { icon: FolderKanban, label: 'Projects', href: '/university/projects' },
  { icon: Users, label: 'Teams', href: '/university/teams' },
  { icon: Briefcase, label: 'Industry', href: '/university/industry' },
  { icon: Bell, label: 'Notifications', href: '/university/notifications' },
];

const industryNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Hub', href: '/industry' },
  { icon: Zap, label: 'Opportunities', href: '/industry/opportunities' },
  { icon: FolderKanban, label: 'Projects', href: '/industry/projects' },
  { icon: Users, label: 'Collaborations', href: '/industry/collaborations' },
  { icon: TrendingUp, label: 'Impact', href: '/industry/impact' },
  { icon: Bell, label: 'Notifications', href: '/industry/notifications' },
];

function getRoleNav(role: string) {
  switch (role) {
    case 'citizen': return citizenNav;
    case 'government': return governmentNav;
    case 'university': return universityNav;
    case 'industry': return industryNav;
    default: return citizenNav;
  }
}

function getRoleLabel(role: string) {
  const labels: Record<string, string> = {
    citizen: 'Citizen Portal',
    government: 'Government Portal',
    university: 'University Hub',
    industry: 'Industry Hub',
  };
  return labels[role] || 'Portal';
}

function getRoleColor(role: string) {
  const colors: Record<string, string> = {
    citizen: 'bg-blue-600',
    government: 'bg-navy-700',
    university: 'bg-purple-600',
    industry: 'bg-emerald-600',
  };
  return colors[role] || 'bg-navy-700';
}

interface SidebarProps {
  role?: UserRole;
  onClose?: () => void;
  mobile?: boolean;
}

export function AppSidebar({ role, onClose, mobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentRole, currentUser, logout, notifications } = useAppStore();
  const { theme, setTheme } = useTheme();
  const pathRole = pathname.split('/')[1] as UserRole | undefined;
  const activeRole = role || pathRole || currentRole || 'citizen';
  const navItems = getRoleNav(activeRole);
  const unreadCount = notifications.filter(n => !n.read && (!n.forRole || n.forRole.includes(activeRole))).length;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className={cn(
      'flex flex-col h-full border-r',
      mobile
        ? 'fixed inset-y-0 left-0 z-50 w-[min(19rem,88vw)] shadow-2xl'
        : 'hidden lg:flex w-64 shrink-0'
    )}
      style={{ backgroundColor: 'var(--sidebar)', borderColor: 'var(--sidebar-border)' }}>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shadow-sm', getRoleColor(activeRole))}>
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold leading-tight" style={{ color: 'var(--foreground)' }}>JAN-SAMADHAN</div>
            <div className="text-[10px] leading-tight" style={{ color: 'var(--text-muted)' }}>{getRoleLabel(activeRole)}</div>
          </div>
        </Link>
        {mobile && (
          <button onClick={onClose} className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== `/${activeRole}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(active ? 'nav-item-active' : 'nav-item', 'relative')}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {item.label === 'Notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user + settings */}
      <div className="border-t p-3 space-y-1" style={{ borderColor: 'var(--sidebar-border)' }}>
        <Link href={`/${activeRole}/profile`} className="nav-item">
          <Settings className="w-4 h-4" />
          <span>Profile</span>
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="nav-item w-full text-left"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        <button onClick={handleLogout} className="nav-item w-full text-left text-red-600 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
        {currentUser && (
          <div className="mt-2 pt-2 border-t flex items-center gap-2.5 px-3 py-2" style={{ borderColor: 'var(--sidebar-border)' }}>
            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold', getRoleColor(activeRole))}>
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>{currentUser.name}</div>
              <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{currentUser.email}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
