'use client';

import { useAppStore } from '@/lib/store';
import { Bell, CheckCircle2, AlertCircle, Building2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CitizenNotificationsPage() {
  const { notifications, markNotificationRead } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-black text-slate-900">Notifications & Alerts</h1>
        <p className="text-xs text-slate-500">Real-time status updates on your reported challenges and upvoted issues.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div 
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
              n.read ? 'bg-white border-slate-200 opacity-80' : 'bg-indigo-50/50 border-indigo-200 shadow-xs'
            }`}
          >
            <div className="p-2 rounded-xl bg-slate-900 text-white shrink-0 mt-0.5">
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600">{n.message}</p>
              {n.challengeId && (
                <Link href={`/citizen/challenges/${n.challengeId}`} className="inline-block text-[11px] font-bold text-emerald-600 hover:underline pt-1">
                  View Challenge Status →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
