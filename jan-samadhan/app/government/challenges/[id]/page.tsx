'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { AIAnalysisCard } from '@/components/shared/ai-analysis-card';
import { LifecycleTracker } from '@/components/shared/lifecycle-tracker';
import { 
  ShieldCheck, Sparkles, Building2, MapPin, CheckCircle2, 
  ArrowLeft, Cpu, Users, Award, Zap, Check, AlertCircle 
} from 'lucide-react';
import { categoryConfig } from '@/lib/utils-config';
import { cn } from '@/lib/utils';

export default function GovernmentChallengeAdminDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { challenges, updateChallengeStatus, assignUniversity } = useAppStore();

  const challenge = challenges.find(c => c.id === id) || challenges[0];

  const [isMatching, setIsMatching] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState(false);
  const [selectedUni, setSelectedUni] = useState('BIT Mesra (Dept of Civil & Environmental)');

  const CatConf = categoryConfig[challenge.category];

  const handleValidateAndMatch = () => {
    setIsMatching(true);
    setTimeout(() => {
      updateChallengeStatus(challenge.id, 'validated', 'validated');
      assignUniversity(challenge.id, {
        name: selectedUni.split(' (')[0],
        department: selectedUni.includes('Civil') ? 'Civil & Environmental Engineering' : 'Mechanical & Water Resources Dept',
        facultyLead: 'Prof. Alok Nath',
        studentTeam: 'Team Jal-Samadhan (6 Students)',
        projectName: `R&D Sprint: ${challenge.title}`
      });
      setIsMatching(false);
      setMatchSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <Link 
          href="/government/challenges"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Government Queue</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">ADMIN REVIEW • {challenge.id}</span>
      </div>

      {/* Main Admin Challenge Card */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", CatConf?.color)}>
              {CatConf?.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs font-bold">
              Priority Index: {challenge.priorityScore}/100
            </span>
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            District: <strong className="text-white">{challenge.district}</strong>
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {challenge.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1 flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{challenge.locationAddress} • Panchayat: {challenge.panchayat || 'Kanke'}</span>
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Report Details</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{challenge.description}</p>
        </div>

        {/* AI Analysis Component */}
        <AIAnalysisCard analysis={challenge.aiAnalysis} />

        {/* Validation & AI University Matchmaking Section */}
        <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-purple-950/40 rounded-2xl border border-indigo-500/30 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">AI University R&D Matchmaking Engine</h3>
          </div>
          <p className="text-xs text-slate-300">
            SAMADHAN-AI algorithm ranks top university R&D departments in Jharkhand based on patent history, lab facilities, and faculty expertise.
          </p>

          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-300 block">Select Target R&D Institution for Assignment</label>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="BIT Mesra (Dept of Civil & Environmental)">BIT Mesra — Dept of Civil & Environmental (Match Score: 96%)</option>
              <option value="IIT (ISM) Dhanbad (Dept of Mining & Environment)">IIT (ISM) Dhanbad — Dept of Mining & Environment (Match Score: 92%)</option>
              <option value="NIT Jamshedpur (Dept of Electrical & Power)">NIT Jamshedpur — Dept of Electrical & Power (Match Score: 88%)</option>
              <option value="Ranchi University (Faculty of Science)">Ranchi University — Faculty of Science (Match Score: 84%)</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {matchSuccess ? (
              <div className="p-3 bg-emerald-950 border border-emerald-700/60 rounded-xl text-xs text-emerald-400 font-bold flex items-center space-x-2 w-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Validated & Successfully Assigned to {selectedUni.split(' (')[0]}! R&D Sprint Initialized.</span>
              </div>
            ) : (
              <button
                disabled={isMatching}
                onClick={handleValidateAndMatch}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                {isMatching ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>Running Matching Algorithm...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Approve Validation & Match R&D Team</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
