'use client';

import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { FolderKanban, ArrowRight, Building2, CheckCircle2, Clock } from 'lucide-react';

export default function UniversityProjectsListPage() {
  const { projects } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md mb-1">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>University R&D Portfolio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Active R&D Sprint Projects</h1>
        <p className="text-xs sm:text-sm text-slate-500">Student engineering projects solving crowdsourced societal challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-500 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500">{p.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] uppercase">
                {p.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold">Lead: {p.facultyLead}</span>
                <span className="font-bold text-emerald-600">{p.progress}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Team: {p.studentTeam?.length || 2} Researchers</span>
              <Link
                href={`/university/projects/${p.id}`}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
