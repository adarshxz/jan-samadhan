'use client';

import { useAppStore } from '@/lib/store';
import { Building2, Award, Sparkles, MapPin } from 'lucide-react';

export default function IndustryCollaborationsPage() {
  const { universities } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">University R&D Labs & Patent Directory</h1>
        <p className="text-xs sm:text-sm text-slate-500">Explore higher education research centers available for corporate joint-ventures and contract R&D.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((u) => (
          <div key={u.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 font-bold shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{u.name}</h3>
                <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{u.location}</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Patents Filed</span>
              <span className="font-extrabold text-indigo-700">12 Commercial Patents</span>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-slate-700 block">Core R&D Specialties:</span>
              <div className="flex flex-wrap gap-1">
                {u.departments.map((d: string, i: number) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
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
