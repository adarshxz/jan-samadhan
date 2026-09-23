'use client';

import { AIAnalysis } from '@/lib/types';
import { Sparkles, AlertCircle, ShieldAlert, Cpu, CheckCircle, Tag, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalysisCardProps {
  analysis?: AIAnalysis;
  className?: string;
  isSimulating?: boolean;
}

export function AIAnalysisCard({ analysis, className, isSimulating = false }: AIAnalysisCardProps) {
  if (isSimulating) {
    return (
      <div className={cn("p-6 rounded-2xl bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-slate-900/10 border border-indigo-500/20 animate-pulse", className)}>
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
          <span className="font-semibold text-slate-800 text-sm">SAMADHAN-AI Processing Challenge Report...</span>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-indigo-100 dark:bg-indigo-950 rounded w-3/4"></div>
          <div className="h-4 bg-indigo-100 dark:bg-indigo-950 rounded w-1/2"></div>
          <div className="h-10 bg-indigo-100 dark:bg-indigo-950 rounded"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className={cn("rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/20 p-5 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-indigo-100/60 dark:border-indigo-900/40 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">SAMADHAN-AI Automated Triaging</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">NLP Severity Analysis & Intent Extraction</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{analysis.confidenceScore}% Confidence</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Priority Score breakdown */}
        <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-medium flex items-center space-x-1">
              <Scale className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Priority Index</span>
            </span>
            <span className="font-bold text-indigo-700 dark:text-indigo-300">{analysis.priorityScore}/100</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                analysis.priorityScore > 75 ? "bg-red-500" : analysis.priorityScore > 50 ? "bg-amber-500" : "bg-emerald-500"
              )}
              style={{ width: `${analysis.priorityScore}%` }}
            />
          </div>
        </div>

        {/* Severity */}
        <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80 shadow-2xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Impact Level</span>
          <span className={cn(
            "inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-bold capitalize",
            analysis.severity === 'critical' ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300" :
            analysis.severity === 'high' ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300" :
            analysis.severity === 'medium' ? "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          )}>
            <ShieldAlert className="w-3 h-3" />
            <span>{analysis.severity} Urgency</span>
          </span>
        </div>

        {/* Estimated Reach */}
        <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/80 shadow-2xs">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Est. Population Impact</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {analysis.estimatedImpactPeople ? `${analysis.estimatedImpactPeople.toLocaleString()} citizens` : 'District level'}
          </span>
        </div>
      </div>

      {/* Suggested Department & Tags */}
      <div className="space-y-2 pt-1">
        <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span className="font-semibold text-slate-700 dark:text-slate-200">Matched Department:</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-medium text-xs border border-indigo-100 dark:border-indigo-800">
            {analysis.department}
          </span>
        </div>

        {/* AI Key Insights */}
        {analysis.keyInsights && analysis.keyInsights.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">AI Key Insights</span>
            <div className="grid grid-cols-1 gap-1">
              {analysis.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detected Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {analysis.tags?.map((tag, idx) => (
            <span key={idx} className="inline-flex items-center space-x-1 text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
              <Tag className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500" />
              <span>#{tag}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Duplicate detection alert if present */}
      {analysis.suggestedDuplicates && analysis.suggestedDuplicates.length > 0 && (
        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">AI Duplicate Warning: </span>
            This problem shares {analysis.suggestedDuplicates.length} similarities with existing reported issues in the same district.
          </div>
        </div>
      )}
    </div>
  );
}
