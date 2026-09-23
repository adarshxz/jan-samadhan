'use client';

import { StatsCard } from '@/components/shared/stats-card';
import { Award, Rocket, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

export default function IndustryImpactPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Corporate CSR & ESG Impact Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500">ESG compliance metrics, CSR capital deployment efficiency, and social return on investment (SROI).</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="CSR Funds Deployed" value="₹45.0" suffix=" Lakhs" delta="100% Audited" />
        <StatsCard label="ESG Compliance Rating" value="98.4" suffix=" Score" delta="Tier-1 ESG" />
        <StatsCard label="Patents Commercialized" value="3" suffix=" Patents" delta="Revenue Generating" />
        <StatsCard label="Lives Impacted" value="450,000" suffix=" Citizens" delta="Direct Benefit" />
      </div>

      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-600" />
          <span>Tata Steel CSR Impact Highlights</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Clean Water Micro-Grid Sponsorship',
              grant: '₹15 Lakhs CSR Grant',
              result: 'Provided 32,000 village residents with continuous clean water, meeting Section 135 CSR mandate.'
            },
            {
              title: 'Solar Micro-Grid Technology Transfer',
              grant: '₹20 Lakhs CSR Grant',
              result: 'Commercialized tribal solar lighting tech with 100% local student manufacturing.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">{item.grant}</span>
              <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
