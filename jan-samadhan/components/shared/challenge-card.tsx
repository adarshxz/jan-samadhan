'use client';

import { cn } from '@/lib/utils';
import { categoryConfig, priorityConfig, statusConfig } from '@/lib/utils-config';
import { Challenge } from '@/lib/types';
import { MapPin, Users, ChevronRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link';

interface ChallengeCardProps {
  challenge: Challenge;
  basePath?: string;
  showMatchScore?: boolean;
  matchScore?: number;
  compact?: boolean;
  onConfirm?: () => void;
  confirmed?: boolean;
}

export function ChallengeCard({ 
  challenge, 
  basePath = '/citizen',
  showMatchScore,
  matchScore,
  compact,
  onConfirm,
  confirmed,
}: ChallengeCardProps) {
  const cat = categoryConfig[challenge.category] || { label: 'General', color: 'text-slate-700', bg: 'bg-slate-100' };
  const pri = priorityConfig[challenge.priority || 'medium'] || { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
  const sta = statusConfig[challenge.status] || { label: 'Active', color: 'text-blue-700', bg: 'bg-blue-50', step: 1 };

  return (
    <div className={cn(
      'card group transition-all hover:shadow-card-hover hover:-translate-y-0.5 duration-200',
      compact ? 'p-4' : 'p-5'
    )}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className={cn('badge', cat.bg, cat.color)}>{cat.label}</span>
            <span className={cn('badge', pri.bg, pri.color, 'border', pri.border)}>{pri.label}</span>
            {showMatchScore && matchScore && (
              <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Zap className="w-2.5 h-2.5" /> {matchScore}% Match
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-navy-700 transition-colors">
            {challenge.title}
          </h3>
        </div>
        <span className={cn('badge shrink-0', sta.bg, sta.color, 'text-nowrap')}>{sta.label}</span>
      </div>

      {!compact && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{challenge.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {challenge.village ? `${challenge.village}, ` : ''}{challenge.district}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {(challenge.peopleAffected || 500).toLocaleString()} affected
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          {challenge.communityConfirmations || challenge.upvoteCount || 1} confirmed
        </span>
      </div>

      {/* Priority Score Bar */}
      {challenge.priorityScore > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">AI Priority Score</span>
            <span className="text-[10px] font-bold text-gray-700">{challenge.priorityScore}/100</span>
          </div>
          <div className="progress-bar">
            <div 
              className={cn('progress-fill', challenge.priorityScore >= 80 ? 'bg-orange-500' : challenge.priorityScore >= 60 ? 'bg-amber-500' : 'bg-navy-500')} 
              style={{ width: `${challenge.priorityScore}%` }} 
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-[10px] text-gray-400">
          {challenge.id} · {new Date(challenge.createdAt || challenge.submittedAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        <div className="flex items-center gap-2">
          {onConfirm && (
            <button
              onClick={onConfirm}
              disabled={confirmed}
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                confirmed 
                  ? 'bg-emerald-50 text-emerald-600 cursor-default' 
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              )}
            >
              {confirmed ? <><CheckCircle2 className="w-3 h-3" /> Confirmed</> : <>I Face This Too</>}
            </button>
          )}
          <Link
            href={`${basePath}/challenges/${challenge.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-navy-600 hover:text-navy-800 transition-colors"
          >
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
