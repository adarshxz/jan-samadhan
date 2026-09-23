'use client';

import { StatsCard } from '@/components/shared/stats-card';
import { Award, CheckCircle2, TrendingUp, Users, ShieldCheck, Heart } from 'lucide-react';

export default function GovernmentImpactPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Social Impact & ROI Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400">Quantitative metrics of citizen benefit, public expenditure saved, and carbon footprint reduction.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Citizens Benefited" value="1,420,000" suffix=" Citizens" delta="Direct Impact" />
        <StatsCard label="Public Funds Saved" value="₹4.8" suffix=" Cr" delta="Via University R&D" />
        <StatsCard label="Avg Resolution Time" value="14.2" suffix=" Days" delta="65% Faster" />
        <StatsCard label="Public Trust Score" value="94.2%" suffix=" Rating" delta="+18% Increase" />
      </div>

      <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span>Major State Impact Success Stories</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'BIT Mesra IoT Water Filtration Network',
              district: 'Ranchi District',
              impact: '32,000 villagers received continuous clean drinking water. Zero fluorosis cases reported in Q3 2026.',
              saving: '₹1.2 Crore municipal capital saved'
            },
            {
              title: 'IIT ISM Solar Micro-Grid for Off-grid Tribal Hamlets',
              district: 'Dhanbad & West Singhbhum',
              impact: '1,800 household solar lighting micro-grids installed by student engineering teams.',
              saving: '240 Tons CO2 reduction annually'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{item.district}</span>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.impact}</p>
              <div className="pt-2 text-xs font-bold text-amber-400">{item.saving}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
