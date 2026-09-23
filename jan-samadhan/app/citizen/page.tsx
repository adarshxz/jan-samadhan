'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { StatsCard } from '@/components/shared/stats-card';
import { ChallengeCard } from '@/components/shared/challenge-card';
import { JharkhandMap } from '@/components/shared/jharkhand-map';
import { PlusCircle, MapPin, Sparkles, AlertCircle, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';

export default function CitizenDashboard() {
  const { challenges, user } = useAppStore();

  const userChallenges = challenges.filter(c => (c.reportedBy?.name || c.submittedBy) === (user?.name || 'Ramesh Kumar'));
  const solvedChallenges = challenges.filter(c => c.status === 'deployed' || c.status === 'impact');
  const activeSprintChallenges = challenges.filter(c => c.status === 'in_sprint' || c.status === 'pilot');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ background: 'linear-gradient(135deg, #007D6F 0%, #00BFA6 50%, #16C7E8 100%)' }}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Citizen Empowerment Hub • Ranchi District</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Namaste, {user?.name || 'Ramesh Kumar'}!
          </h2>
          <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
            Report local civic & societal issues, vote on community priorities, and watch university R&D teams transform your reports into real deployed engineering solutions.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/citizen/challenges/new"
            className="px-5 py-3 rounded-2xl bg-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center space-x-2 hover:scale-105"
            style={{ color: '#007D6F' }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report New Challenge</span>
          </Link>
          <Link
            href="/citizen/map"
            className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all flex items-center justify-center space-x-2"
          >
            <MapPin className="w-4 h-4" />
            <span>View District Map</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Community Issues" value={challenges.length} suffix=" Reports" delta="+12 this week" />
        <StatsCard label="Active R&D Solutions" value={activeSprintChallenges.length} suffix=" Sprints" delta="University Led" />
        <StatsCard label="Deployed Solutions" value={solvedChallenges.length} suffix=" Implemented" delta="Verified Impact" />
        <StatsCard label="Your Submitted Reports" value={userChallenges.length} suffix=" Active" delta="Tracked Live" />
      </div>

      {/* Main Grid: My Reports & Community Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Submissions & Community Trending */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent My Submissions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Your Submitted Challenges</h3>
                <p className="text-xs text-slate-500">Live 9-step progress of your reported issues</p>
              </div>
              <Link href="/citizen/challenges" className="text-xs font-bold text-emerald-600 hover:underline flex items-center space-x-1">
                <span>View All ({challenges.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userChallenges.slice(0, 2).map((ch) => (
                <ChallengeCard key={ch.id} challenge={ch} />
              ))}
            </div>
          </div>

          {/* Trending Community Priority Issues */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Trending Community Priorities</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Upvote to increase Priority Score</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.slice(0, 4).map((ch) => (
                <ChallengeCard key={ch.id} challenge={ch} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive District Map Spotlight */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Ranchi GIS Heatmap</h3>
            <Link href="/citizen/map" className="text-xs font-bold text-indigo-600 hover:underline">
              Fullscreen Map
            </Link>
          </div>

          <JharkhandMap challenges={challenges} />
        </div>
      </div>
    </div>
  );
}
