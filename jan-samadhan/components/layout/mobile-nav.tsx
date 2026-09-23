'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, AlertCircle, Map, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export function MobileNav() {
  const pathname = usePathname();
  const { notifications } = useAppStore();
  const unreadCount = notifications.filter(n => !n.read && (!n.forRole || n.forRole.includes('citizen'))).length;

  const items = [
    { icon: LayoutDashboard, label: 'Home', href: '/citizen' },
    { icon: AlertCircle, label: 'Challenges', href: '/citizen/challenges' },
    { icon: Map, label: 'Map', href: '/citizen/map' },
    { icon: Bell, label: 'Alerts', href: '/citizen/notifications', badge: unreadCount },
    { icon: User, label: 'Profile', href: '/citizen/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex lg:hidden z-40">
      {items.map(item => {
        const active = pathname === item.href || (item.href !== '/citizen' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-medium transition-colors',
              active ? 'text-navy-700' : 'text-gray-400'
            )}
          >
            <div className="relative">
              <item.icon className={cn('w-5 h-5', active ? 'text-navy-700' : 'text-gray-400')} />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
