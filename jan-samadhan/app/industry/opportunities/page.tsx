'use client';

import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { Sparkles, DollarSign, ArrowRight, Building2, Rocket } from 'lucide-react';

export default function IndustryOpportunitiesPage() {
  const { projects } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>CSR Matchmaking Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">University R&D CSR Opportunities</h1>
        <p className="text-xs sm:text-sm text-slate-500">Grassroots engineering projects awaiting corporate seed capital, mentorship, or hardware sponsorship.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500">{p.id}</span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs">
                Grant Required: ₹{((p.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Institution: {p.universityName}</span>
              <span className="text-slate-500 font-medium">Faculty: {p.facultyLead}</span>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <Link
                href={`/industry/projects/${p.id}`}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
              >
                <span>Commit CSR Funding</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
