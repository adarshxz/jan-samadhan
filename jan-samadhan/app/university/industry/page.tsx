'use client';

import { useAppStore } from '@/lib/store';
import { MOCK_INDUSTRY } from '@/lib/mock-data';
import { Rocket, Building2, Award, DollarSign } from 'lucide-react';

export default function UniversityIndustryPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Industry CSR Grants & Mentorship Hub</h1>
        <p className="text-xs sm:text-sm text-slate-500">Corporate sponsorships, hardware donation programs, and industry mentors supporting university labs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INDUSTRY.map((ind) => (
          <div key={ind.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 font-bold shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{ind.name}</h3>
                <span className="text-xs text-amber-700 font-semibold">{ind.sector} Sector</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Committed Grant</span>
              <span className="font-black text-emerald-700 text-sm">₹{(ind.totalFundingCommitted / 100000).toFixed(1)} Lakhs</span>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <span className="font-bold text-slate-700 block">Focus Domains:</span>
              <div className="flex flex-wrap gap-1">
                {ind.focusAreas.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                    {f}
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
