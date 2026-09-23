'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  Rocket, DollarSign, Building2, CheckCircle2, ArrowLeft, 
  Award, ShieldCheck, Sparkles, Check 
} from 'lucide-react';

export default function IndustryProjectSponsorshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { projects } = useAppStore();

  const project = projects.find(p => p.id === id) || projects[0];
  const [fundingCommitted, setFundingCommitted] = useState(false);

  const handleCommitFunding = () => {
    setFundingCommitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link 
        href="/industry/opportunities"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to CSR Opportunities</span>
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-mono font-bold text-amber-700">SPONSORSHIP ID: {project.id}</span>
          <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full">
            CSR Grant Required: ₹{((project.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900">{project.title}</h1>
          <p className="text-xs text-slate-500 mt-1">
            University: <strong>{project.universityName}</strong> • Lead: {project.facultyLead}
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical Brief</h4>
          <p className="text-xs text-slate-700 leading-relaxed">{project.description}</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/5 rounded-2xl border border-amber-500/30 space-y-4">
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Corporate CSR Sponsorship & Tech Licensing</h3>
          </div>
          <p className="text-xs text-slate-600">
            Pledging CSR funds grants your organization first-right-of-refusal for commercial IP licensing, product co-branding, and ESG impact reporting.
          </p>

          {fundingCommitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>CSR Funding Committed Successfully! Grant deed sent to university finance office.</span>
            </div>
          ) : (
            <button
              onClick={handleCommitFunding}
              className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Pledge ₹{((project.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs CSR Grant</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
