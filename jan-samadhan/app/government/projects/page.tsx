'use client';

import { useAppStore } from '@/lib/store';
import { Rocket, Building2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function GovernmentProjectsPage() {
  const { projects } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Active R&D Projects & Municipal Pilots</h1>
        <p className="text-xs sm:text-sm text-slate-400">Track multi-institutional R&D sprint progress, milestone completion, and field deployments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold">{p.id}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-800">
                {p.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white line-clamp-1">{p.title}</h3>
            <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{p.universityName}</span>
                </span>
                <span className="font-bold text-emerald-400">{p.progress}% Progress</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Budget: <strong>₹{((p.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs</strong></span>
              <Link
                href={`/university/projects/${p.id}`}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Inspect Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
