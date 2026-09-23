'use client';

import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/shared/stats-card';
import { 
  Building2, Sparkles, Rocket, Users, BookOpen, 
  CheckCircle2, ArrowRight, FolderKanban, PlusCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function UniversityDashboard() {
  const { challenges, projects, user } = useAppStore();

  const matchedChallenges = challenges.filter(c => c.status === 'validated' || c.status === 'in_sprint');
  const universityProjects = projects.filter(p => p.universityName?.includes('BIT Mesra') || p.universityName?.includes('IIT') || true);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Academic R&D Hub • BIT Mesra</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {user?.name || 'Prof. Alok Nath'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Collaborate on validated government civic challenges, lead multidisciplinary student teams, and deploy lab-tested IoT/Civil solutions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/university/challenges"
            className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Browse Matched Problems ({matchedChallenges.length})</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Matched Problems" value={matchedChallenges.length} suffix=" Assigned" delta="Ready for R&D" />
        <StatsCard label="Active Sprint Projects" value={universityProjects.length} suffix=" Workspaces" delta="In Lab & Field" />
        <StatsCard label="Student Researchers" value={24} suffix=" Members" delta="6 Teams Active" />
        <StatsCard label="Total Grants Received" value="₹16.5" suffix=" Lakhs" delta="Govt & CSR Funded" />
      </div>

      {/* Grid: Matched Challenges & Active Workspaces */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Matched Problem Statements Queue */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Matched Government Problem Statements</span>
            </h2>
            <Link href="/university/challenges" className="text-xs font-bold text-indigo-600 hover:underline">
              View All Matched Queue →
            </Link>
          </div>

          <div className="space-y-3">
            {matchedChallenges.slice(0, 3).map((ch) => (
              <div key={ch.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-600">{ch.id} • {ch.district}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                    Priority Score: {ch.priorityScore}/100
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{ch.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Domain Match: <strong>Civil & Environmental Dept</strong></span>
                  <Link
                    href={`/university/challenges/${ch.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <span>Propose R&D Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Active Project Workspaces */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-emerald-600" />
            <span>Active Sprint Workspaces</span>
          </h2>

          <div className="space-y-3">
            {universityProjects.map((p) => (
              <Link key={p.id} href={`/university/projects/${p.id}`} className="block p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all space-y-2 group shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                    {p.status}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{p.progress}% Complete</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-1">{p.title}</h4>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
