'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Bell, CheckCheck, ChevronRight, CircleCheck, Clock3, FolderKanban, Megaphone, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Notification } from '@/lib/types';

type Filter = 'all' | 'unread' | 'read';

const notificationStyles: Record<string, { icon: typeof Bell; surface: string; iconColor: string }> = {
  challenge: { icon: Bell, surface: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-600' },
  milestone: { icon: CircleCheck, surface: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-600' },
  collaboration: { icon: Users, surface: 'bg-violet-50 border-violet-100', iconColor: 'text-violet-600' },
  project: { icon: FolderKanban, surface: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-600' },
};

function formatDate(notification: Notification) {
  if (!notification.createdAt) return notification.timestamp || 'Recently';
  const date = new Date(notification.createdAt);
  return Number.isNaN(date.getTime())
    ? notification.timestamp || 'Recently'
    : new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
}

export default function CitizenNotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [filter, setFilter] = useState<Filter>('all');
  const citizenNotifications = useMemo(
    () => notifications.filter(notification => !notification.forRole || notification.forRole.includes('citizen')),
    [notifications],
  );
  const unreadCount = citizenNotifications.filter(notification => !notification.read).length;
  const visibleNotifications = citizenNotifications.filter(notification => filter === 'all' || (filter === 'unread' ? !notification.read : notification.read));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><Megaphone className="h-6 w-6" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Citizen updates</p>
              <h1 className="mt-1 text-2xl font-black text-slate-900">Notifications & alerts</h1>
              <p className="mt-1 text-sm text-slate-500">Updates on your reports, community activity, and solution progress.</p>
            </div>
          </div>
          {unreadCount > 0 && <button onClick={() => markAllNotificationsRead('citizen')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"><CheckCheck className="h-4 w-4" /> Mark all as read</button>}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-sm">
          <div className="rounded-2xl bg-slate-50 p-3.5"><span className="block text-xl font-black text-slate-900">{citizenNotifications.length}</span><span className="text-xs font-medium text-slate-500">Total updates</span></div>
          <div className="rounded-2xl bg-emerald-50 p-3.5"><span className="block text-xl font-black text-emerald-700">{unreadCount}</span><span className="text-xs font-medium text-emerald-700">Unread alerts</span></div>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Notification filters">
        {(['all', 'unread', 'read'] as Filter[]).map(item => <button key={item} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`rounded-xl px-4 py-2 text-xs font-bold capitalize ${filter === item ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{item}{item === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}</button>)}
      </div>

      {visibleNotifications.length ? <div className="space-y-3">
        {visibleNotifications.map(notification => {
          const style = notificationStyles[notification.type || ''] || notificationStyles.challenge;
          const Icon = style.icon;
          const destination = notification.link || (notification.challengeId ? `/citizen/challenges/${notification.challengeId}` : undefined);
          return <article key={notification.id} className={`rounded-2xl border p-4 transition-shadow hover:shadow-sm ${notification.read ? 'border-slate-200 bg-white' : 'border-emerald-200 bg-emerald-50/40'}`}>
            <div className="flex items-start gap-3.5">
              <div className={`mt-0.5 rounded-xl border p-2.5 ${style.surface}`}><Icon className={`h-4 w-4 ${style.iconColor}`} /></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-sm font-bold text-slate-900">{notification.title}</h2><span className="inline-flex items-center gap-1 text-[11px] text-slate-400"><Clock3 className="h-3 w-3" />{formatDate(notification)}</span></div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{notification.message}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  {destination ? <Link onClick={() => markNotificationRead(notification.id)} href={destination} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800">View details <ChevronRight className="h-3.5 w-3.5" /></Link> : <span />}
                  {!notification.read && <button onClick={() => markNotificationRead(notification.id)} className="text-xs font-bold text-slate-500 hover:text-slate-900">Mark as read</button>}
                </div>
              </div>
            </div>
          </article>;
        })}
      </div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><Bell className="mx-auto h-8 w-8 text-slate-400" /><h2 className="mt-3 text-sm font-bold text-slate-900">No {filter === 'all' ? '' : filter} notifications</h2><p className="mt-1 text-xs text-slate-500">New citizen updates will appear here.</p></div>}
    </div>
  );
}
