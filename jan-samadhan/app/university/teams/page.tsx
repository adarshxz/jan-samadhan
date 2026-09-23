'use client';

import { useAppStore } from '@/lib/store';
import { MOCK_STUDENTS, MOCK_FACULTY } from '@/lib/mock-data';
import { Users, Award, BookOpen, Building2 } from 'lucide-react';

export default function UniversityTeamsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Faculty & Student Research Teams</h1>
        <p className="text-xs sm:text-sm text-slate-500">Multi-disciplinary engineering research clusters at BIT Mesra leading societal problem solving.</p>
      </div>

      {/* Faculty Leads Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Faculty Research Mentors ({MOCK_FACULTY.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_FACULTY.map((f: any) => (
            <div key={f.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center">
                  {f.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{f.name}</h3>
                  <p className="text-xs text-slate-500">{f.designation} • {f.department}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 text-[11px]">
                {(f.specialization || f.expertise || []).map((s: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Researchers Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Users className="w-5 h-5 text-emerald-600" />
          <span>Student Researchers ({MOCK_STUDENTS.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_STUDENTS.slice(0, 6).map((st: any) => (
            <div key={st.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {st.year}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{st.department}</p>
              <div className="text-[10px] text-slate-400 font-medium">Team: {st.teamName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
