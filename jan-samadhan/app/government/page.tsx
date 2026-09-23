'use client';

import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/shared/stats-card';
import { JharkhandMap } from '@/components/shared/jharkhand-map';
import { 
  ShieldCheck, AlertTriangle, Sparkles, Building2, Cpu, 
  ArrowRight, CheckCircle2, SlidersHorizontal, BarChart3, Users 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { categoryConfig } from '@/lib/utils-config';

export default function GovernmentCommandCenter() {
  const { challenges, universities, projects } = useAppStore();

  const pendingTriage = challenges.filter(c => c.status === 'reported');
  const criticalChallenges = challenges.filter(c => c.priorityScore > 75);
  const activeProjects = projects.filter(p => p.status === 'in_progress' || p.status === 'pilot');

  return (
    <div className="space-y-6">
      {/* Command Center Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE TRIAGE COMMAND</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">STATEWIDE DEPT MONITOR • 24 DISTRICTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Jharkhand Government Command & Triage Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time crowdsource triaging, automated university assignment, and municipal field project monitoring.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/government/challenges"
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Process Triage Queue ({pendingTriage.length})</span>
          </Link>
          <Link
            href="/government/analytics"
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center space-x-2"
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Impact Analytics</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Pending Triage Queue" value={pendingTriage.length} suffix=" Unassigned" delta="Needs Validation" />
        <StatsCard label="Critical Urgency Issues" value={criticalChallenges.length} suffix=" Score >75" delta="Action Required" />
        <StatsCard label="Onboarded University R&D" value={universities.length} suffix=" Institutions" delta="Active Labs" />
        <StatsCard label="Active R&D Projects" value={activeProjects.length} suffix=" Pilots" delta="6 Field Deployed" />
      </div>

      {/* Main Grid: Priority Triage Queue & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High Priority Triage Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white">Priority Validation & Triage Queue</h2>
            </div>
            <Link href="/government/challenges" className="text-xs font-bold text-emerald-400 hover:underline">
              View All Triage Queue →
            </Link>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">ID / Category</th>
                    <th className="p-3.5">Title & Location</th>
                    <th className="p-3.5">Priority Index</th>
                    <th className="p-3.5">AI Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {criticalChallenges.slice(0, 5).map((c) => {
                    const CatConf = categoryConfig[c.category];
                    return (
                      <tr key={c.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5">
                          <span className="font-mono text-slate-400 text-[11px] block">{c.id}</span>
                          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5", CatConf?.color)}>
                            {CatConf?.label}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <h4 className="font-bold text-white line-clamp-1">{c.title}</h4>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{c.district} • {c.locationAddress}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-red-400 text-sm">{c.priorityScore}</span>
                            <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full" style={{ width: `${c.priorityScore}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                            <Cpu className="w-3 h-3" />
                            <span>Triaged</span>
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <Link
                            href={`/government/challenges/${c.id}`}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] inline-flex items-center space-x-1"
                          >
                            <span>Validate & Match</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: GIS Statewide Heatmap */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">District GIS Heatmap</h2>
            <Link href="/government/map" className="text-xs font-bold text-indigo-400 hover:underline">
              Fullscreen GIS
            </Link>
          </div>

          <JharkhandMap challenges={challenges} />
        </div>
      </div>
    </div>
  );
}
