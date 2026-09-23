'use client';

import { useAppStore } from '@/lib/store';
import { MOCK_INDUSTRY } from '@/lib/mock-data';
import { Rocket, Building2, CheckCircle2, Award } from 'lucide-react';

export default function GovernmentIndustryPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Industry Partners & Corporate CSR Matrix</h1>
        <p className="text-xs sm:text-sm text-slate-400">Corporate organizations providing seed capital, pilot hardware, and technology transfer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_INDUSTRY.map((ind) => (
          <div key={ind.id} className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-amber-950 border border-amber-800 text-amber-400 shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">{ind.name}</h3>
                <span className="text-xs text-amber-400 font-semibold">{ind.sector} Sector</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-medium">Total CSR Funding Committed</span>
              <p className="text-lg font-black text-emerald-400">₹{(ind.totalFundingCommitted / 100000).toFixed(1)} Lakhs</p>
            </div>

            <div className="text-xs space-y-1 text-slate-300">
              <span className="text-slate-400 font-semibold block">Focus Areas:</span>
              <div className="flex flex-wrap gap-1">
                {ind.focusAreas.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
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
