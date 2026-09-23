'use client';

import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { Sparkles, ArrowRight, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { categoryConfig } from '@/lib/utils-config';
import { cn } from '@/lib/utils';

export default function UniversityChallengesQueuePage() {
  const { challenges } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Government Matched Queue</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Matched R&D Problem Statements</h1>
        <p className="text-xs sm:text-sm text-slate-500">Government validated civic problems assigned to university departments based on domain specialization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((c) => {
          const CatConf = categoryConfig[c.category];
          return (
            <div key={c.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-indigo-400 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-bold px-3 py-1 rounded-full", CatConf?.color)}>
                  {CatConf?.label}
                </span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                  Priority Score: {c.priorityScore}/100
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2">{c.description}</p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{c.district}</span>
                </span>
                <span className="font-semibold text-slate-700">Status: {c.status.replace('_', ' ')}</span>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <Link
                  href={`/university/challenges/${c.id}`}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-2 shadow-md"
                >
                  <span>View Details & Propose Sprint</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
