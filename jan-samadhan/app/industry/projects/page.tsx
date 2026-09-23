'use client';

import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { Rocket, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function IndustryProjectsListPage() {
  const { projects } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Sponsored Corporate Pilots</h1>
        <p className="text-xs sm:text-sm text-slate-500">Industry-funded university research projects currently undergoing field trials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700">{p.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase">
                {p.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Lab: <strong>{p.universityName}</strong></span>
              <Link
                href={`/industry/projects/${p.id}`}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <span>View Pilot Progress</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
