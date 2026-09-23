'use client';

import { cn } from '@/lib/utils';
import { ChallengeStatus } from '@/lib/types';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const LIFECYCLE_STEPS: { key: ChallengeStatus; label: string; step: number }[] = [
  { key: 'submitted', label: 'Submitted', step: 0 },
  { key: 'ai_analysis', label: 'AI Analysis', step: 1 },
  { key: 'community_validation', label: 'Community\nValidation', step: 2 },
  { key: 'government_validation', label: 'Government\nValidation', step: 3 },
  { key: 'university_matching', label: 'University\nMatching', step: 4 },
  { key: 'project_created', label: 'Project', step: 5 },
  { key: 'pilot', label: 'Pilot', step: 6 },
  { key: 'deployed', label: 'Impact', step: 7 },
];

const STATUS_STEP: Partial<Record<ChallengeStatus, number>> & Record<string, number> = {
  reported: 0,
  submitted: 0,
  ai_analysis: 1,
  validated: 2,
  community_validation: 2,
  government_validation: 3,
  university_matching: 4,
  in_sprint: 5,
  project_created: 5,
  in_progress: 5,
  pilot: 6,
  deployed: 7,
  resolved: 7,
  impact: 8,
};

interface LifecycleTrackerProps {
  status?: ChallengeStatus;
  currentStage?: string;
  vertical?: boolean;
  timeline?: any[];
}

export function LifecycleTracker({ status, currentStage, vertical }: LifecycleTrackerProps) {
  const activeKey = (currentStage || status || 'reported') as string;
  const currentStep = STATUS_STEP[activeKey] ?? 0;

  if (vertical) {
    return (
      <div className="space-y-0">
        {LIFECYCLE_STEPS.map((step, idx) => {
          const done = currentStep > idx;
          const active = currentStep === idx;
          const pending = currentStep < idx;

          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all',
                  done ? 'bg-emerald-600 text-white' : active ? 'bg-navy-700 text-white ring-4 ring-navy-100' : 'bg-gray-100 text-gray-400'
                )}>
                  {done ? <CheckCircle2 className="w-4 h-4" /> : active ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Circle className="w-4 h-4" />}
                </div>
                {idx < LIFECYCLE_STEPS.length - 1 && (
                  <div className={cn('w-0.5 h-6 mt-0.5', done ? 'bg-emerald-300' : 'bg-gray-200')} />
                )}
              </div>
              <div className="pt-1 pb-4">
                <div className={cn('text-sm font-medium', done ? 'text-emerald-700' : active ? 'text-navy-700' : 'text-gray-400')}>
                  {step.label.replace('\n', ' ')}
                </div>
                {active && (
                  <div className="text-xs text-navy-600 font-medium">● In Progress</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-2">
      {LIFECYCLE_STEPS.map((step, idx) => {
        const done = currentStep > idx;
        const active = currentStep === idx;

        return (
          <div key={step.key} className="flex items-center shrink-0">
            <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                done ? 'lifecycle-step-done' : active ? 'lifecycle-step-active' : 'lifecycle-step-pending'
              )}>
                {done ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : active ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>
              <span className={cn(
                'text-[10px] font-medium text-center leading-tight',
                done ? 'text-emerald-600' : active ? 'text-navy-700' : 'text-gray-400'
              )}>
                {step.label}
              </span>
            </div>
            {idx < LIFECYCLE_STEPS.length - 1 && (
              <div className={cn('h-0.5 w-8 mb-5 shrink-0', done ? 'bg-emerald-300' : 'bg-gray-200')} />
            )}
          </div>
        );
      })}
    </div>
  );
}
