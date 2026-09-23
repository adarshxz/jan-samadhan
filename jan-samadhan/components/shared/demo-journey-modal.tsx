'use client';

import { useState } from 'react';
import { 
  X, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Cpu, 
  Building2, Users, Rocket, BarChart3, ChevronRight, Play, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface DemoJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JOURNEY_STAGES = [
  {
    step: 1,
    code: 'REPORT',
    title: '1. Citizen Report',
    role: 'Citizen Portal',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    badgeBg: 'bg-emerald-600',
    description: 'Citizens submit geo-tagged societal challenges with media attachments via Web or Mobile app.',
    link: '/citizen/challenges/new',
    actionText: 'Try 5-Step Report Form',
    icon: Users
  },
  {
    step: 2,
    code: 'UNDERSTAND',
    title: '2. AI Triaging & Intent Parsing',
    role: 'SAMADHAN-AI Engine',
    color: 'border-indigo-500 bg-indigo-50 text-indigo-800',
    badgeBg: 'bg-indigo-600',
    description: 'NLP parses intent, assigns priority index (0-100), tags sector, and runs instant duplicate checks.',
    link: '/citizen/challenges/CH-2026-001',
    actionText: 'View AI Triaged Challenge',
    icon: Cpu
  },
  {
    step: 3,
    code: 'VALIDATE',
    title: '3. Community & Govt Verification',
    role: 'Government Portal',
    color: 'border-amber-500 bg-amber-50 text-amber-800',
    badgeBg: 'bg-amber-600',
    description: 'Crowd upvotes validate urgency while district officials review and approve challenge for R&D matchmaking.',
    link: '/government/challenges',
    actionText: 'View Triage Queue',
    icon: ShieldCheck
  },
  {
    step: 4,
    code: 'MATCH',
    title: '4. AI University Matchmaking',
    role: 'Government Command',
    color: 'border-purple-500 bg-purple-50 text-purple-800',
    badgeBg: 'bg-purple-600',
    description: 'Smart algorithm matches problem with university R&D departments (e.g., BIT Mesra, IIT ISM Dhanbad) based on domain expertise.',
    link: '/government/challenges/CH-2026-001',
    actionText: 'Inspect AI Matcher',
    icon: Sparkles
  },
  {
    step: 5,
    code: 'COLLABORATE',
    title: '5. Student & Faculty Proposal',
    role: 'University Portal',
    color: 'border-blue-500 bg-blue-50 text-blue-800',
    badgeBg: 'bg-blue-600',
    description: 'University faculty forms multidisciplinary student teams to submit technical solution proposals.',
    link: '/university/challenges',
    actionText: 'Explore Matched Challenges',
    icon: Building2
  },
  {
    step: 6,
    code: 'BUILD',
    title: '6. Multi-Disciplinary Sprint',
    role: 'R&D Workspace',
    color: 'border-cyan-500 bg-cyan-50 text-cyan-800',
    badgeBg: 'bg-cyan-600',
    description: 'Teams track milestones, code repositories, IoT schematics, and industry mentor guidance.',
    link: '/university/projects/PRJ-2026-001',
    actionText: 'Open Project Workspace',
    icon: Rocket
  },
  {
    step: 7,
    code: 'PILOT',
    title: '7. Industry Sponsorship & Testing',
    role: 'Industry Portal',
    color: 'border-amber-600 bg-amber-100/50 text-amber-900',
    badgeBg: 'bg-amber-700',
    description: 'Industry partners (Tata Steel, Coal India) provide CSR funding & lab hardware for real-world field deployment.',
    link: '/industry/opportunities',
    actionText: 'View CSR Funding Matrix',
    icon: Building2
  },
  {
    step: 8,
    code: 'DEPLOY',
    title: '8. Field Deployment & Tech Transfer',
    role: 'State Execution',
    color: 'border-emerald-600 bg-emerald-100/50 text-emerald-900',
    badgeBg: 'bg-emerald-700',
    description: 'Validated solutions transition into commercial deployment or municipal rollout with IP protection.',
    link: '/government/projects',
    actionText: 'Monitor Deployed Projects',
    icon: CheckCircle2
  },
  {
    step: 9,
    code: 'IMPACT',
    title: '9. Citizen Feedback & Analytics',
    role: 'Impact Analytics',
    color: 'border-violet-500 bg-violet-50 text-violet-800',
    badgeBg: 'bg-violet-600',
    description: 'Real-time metrics track lives impacted, cost saved, carbon reduction, and public satisfaction index.',
    link: '/government/impact',
    actionText: 'View State Impact Dashboard',
    icon: BarChart3
  },
];

export function DemoJourneyModal({ isOpen, onClose }: DemoJourneyModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const current = JOURNEY_STAGES[activeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold">JAN-SAMADHAN — Interactive Platform Guide</h2>
              <p className="text-xs text-slate-400">9-Stage End-to-End Problem-to-Impact Lifecycle</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-slate-900">
          {/* Top Step Nav Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
            {JOURNEY_STAGES.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 border",
                  activeStep === idx 
                    ? "bg-slate-900 dark:bg-emerald-600 text-white border-slate-900 dark:border-emerald-500 shadow-md scale-105" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                <span className={cn("w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white", s.badgeBg)}>
                  {s.step}
                </span>
                <span>{s.code}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Hero Spotlight */}
          <div className={cn("p-6 rounded-2xl border-2 transition-all space-y-4 shadow-sm dark:bg-slate-800/90 dark:border-slate-700", current.color)}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 dark:bg-slate-900/80 dark:text-white shadow-2xs">
                Stage {current.step} of 9 — {current.role}
              </span>
              <span className="text-xs font-semibold opacity-75 dark:text-slate-300">SIH Demo Flow</span>
            </div>

            <div className="flex items-start space-x-4">
              <div className={cn("p-3 rounded-2xl text-white shadow-md shrink-0", current.badgeBg)}>
                <current.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{current.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{current.description}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-40 border border-slate-200 dark:border-slate-700"
                >
                  Previous Stage
                </button>
                <button
                  disabled={activeStep === JOURNEY_STAGES.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(JOURNEY_STAGES.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-emerald-700 disabled:opacity-40"
                >
                  Next Stage
                </button>
              </div>

              <Link
                href={current.link}
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center space-x-2 transition-all hover:scale-105"
              >
                <span>{current.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* All 9 Stages Grid Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">All 9 Journey Milestones Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {JOURNEY_STAGES.map((stg, idx) => (
                <div 
                  key={stg.step}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "p-3 rounded-xl border cursor-pointer transition-all hover:border-emerald-400",
                    activeStep === idx 
                      ? "bg-slate-900 dark:bg-emerald-950/80 text-white border-slate-900 dark:border-emerald-500" 
                      : "bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold opacity-75">STAGE 0{stg.step}</span>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded", activeStep === idx ? "bg-slate-800 dark:bg-emerald-900 text-emerald-400" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300")}>
                      {stg.role}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold line-clamp-1">{stg.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Smart India Hackathon 2026 Prototype</span>
          <button 
            onClick={onClose}
            className="font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
