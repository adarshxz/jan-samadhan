'use client';

import { useAppStore } from '@/lib/store';
import { Building2, Award, Users, CheckCircle2, MapPin } from 'lucide-react';

export default function GovernmentInstitutionsPage() {
  const { universities } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white">University & Academic R&D Partners</h1>
        <p className="text-xs sm:text-sm text-slate-400">Onboarded higher education institutions leading crowdsourced engineering sprints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((u) => (
          <div key={u.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">{u.name}</h3>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{u.location}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Active Projects</span>
                <span className="text-sm font-bold text-white">{u.activeProjects} Sprints</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Completed Pilots</span>
                <span className="text-sm font-bold text-emerald-400">{u.completedProjects} Deployed</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Core Department Strengths</span>
              <div className="flex flex-wrap gap-1">
                {u.departments.map((d: string, i: number) => (
                  <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-slate-900 text-slate-300 rounded-md border border-slate-800">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
