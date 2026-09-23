'use client';

import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/shared/stats-card';
import { Rocket, Sparkles, Building2, ArrowRight, DollarSign, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function IndustryDashboard() {
  const { projects, user } = useAppStore();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-900/50">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
            <Rocket className="w-3.5 h-3.5" />
            <span>Industry CSR & Tech Transfer Hub • Tata Steel CSR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {user?.name || 'Vikramaditya Roy'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Sponsor university R&D sprints with corporate CSR capital, provide real-world testing environments, and scale grassroots innovations into commercial deployment.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/industry/opportunities"
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center space-x-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Sponsor R&D Projects</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="CSR Capital Pledged" value="₹45.0" suffix=" Lakhs" delta="Tata CSR Fund" />
        <StatsCard label="Sponsored Projects" value={projects.length} suffix=" Pilots" delta="Active Field Tests" />
        <StatsCard label="University Labs" value="4" suffix=" Partnered" delta="BIT, IIT ISM, NIT" />
        <StatsCard label="Tech Transfers" value="3" suffix=" Scaled" delta="Commercialized" />
      </div>

      {/* Grid: R&D Opportunities & Sponsored Pilots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: CSR Funding Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>University R&D CSR Funding Opportunities</span>
            </h2>
            <Link href="/industry/opportunities" className="text-xs font-bold text-amber-700 hover:underline">
              Browse All Opportunities →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-700">{p.id} • {p.universityName}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                    CSR Grant Needed: ₹{((p.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Faculty: {p.facultyLead}</span>
                  <Link
                    href={`/industry/projects/${p.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <span>Sponsor Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Commercial Tech Transfer Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Tech Transfer Pipeline</span>
          </h2>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase">Patent Licensing</span>
              <h4 className="text-xs font-bold text-slate-900">Solar Water Desalination Unit</h4>
              <p className="text-[11px] text-slate-600">Assigned from IIT ISM Dhanbad to Tata CSR</p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Field Pilot Active</span>
              <h4 className="text-xs font-bold text-slate-900">Smart Transformer Monitoring System</h4>
              <p className="text-[11px] text-slate-600">Deployed across 12 sub-stations in Jamshedpur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
