'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { LifecycleTracker } from '@/components/shared/lifecycle-tracker';
import { AIAnalysisCard } from '@/components/shared/ai-analysis-card';
import { 
  ThumbsUp, CheckCircle2, MapPin, Sparkles, User, Calendar, 
  MessageSquare, Send, ArrowLeft, Building2, ShieldCheck, Tag
} from 'lucide-react';
import { categoryConfig, priorityConfig, statusConfig } from '@/lib/utils-config';
import { cn } from '@/lib/utils';

export default function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { challenges, upvoteChallenge, addComment } = useAppStore();
  const [commentText, setCommentText] = useState('');

  const challenge = challenges.find(c => c.id === id) || challenges[0];

  const CatConfig = categoryConfig[challenge.category];
  const StatusConf = statusConfig[challenge.status];

  const handleUpvote = () => {
    upvoteChallenge(challenge.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(challenge.id, {
      author: 'Ramesh Kumar',
      role: 'Citizen',
      content: commentText
    });
    setCommentText('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <Link 
          href="/citizen/challenges"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges Feed</span>
        </Link>
        <span className="text-xs font-semibold text-slate-400">ID: {challenge.id}</span>
      </div>

      {/* Main Challenge Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", CatConfig?.color)}>
              {CatConfig?.label}
            </span>
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", StatusConf?.color)}>
              {StatusConf?.label}
            </span>
          </div>

          {/* Upvote & Confirm Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpvote}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center space-x-2 border border-slate-200"
            >
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <span>Upvote ({challenge.upvoteCount})</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
          <span className="flex items-center space-x-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{challenge.locationAddress} ({challenge.district})</span>
          </span>
          <span className="flex items-center space-x-1.5 font-medium">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            <span>Reported by {challenge.reportedBy?.name || challenge.submittedBy || 'Citizen'}</span>
          </span>
          <span className="flex items-center space-x-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Reported on {challenge.createdAt}</span>
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem Statement</h3>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {challenge.description}
          </p>
        </div>
      </div>

      {/* 9-Stage Lifecycle Tracker Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">9-Stage End-to-End Progress Tracker</h3>
        <LifecycleTracker currentStage={challenge.lifecycleStage} timeline={challenge.timeline} />
      </div>

      {/* Two Column Grid: AI Triaging Card & Matched R&D Team */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Analysis Details */}
        <AIAnalysisCard analysis={challenge.aiAnalysis} />

        {/* Matched R&D Team & Sponsorship Info if any */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Matched R&D Institution</h4>
              <p className="text-[11px] text-slate-500">Academic & Industry Partner Collaboration</p>
            </div>
          </div>

          {challenge.matchedUniversity ? (
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1">
                <span className="text-[11px] font-bold text-indigo-800 uppercase">Assigned University</span>
                <h5 className="text-sm font-bold text-slate-900">{challenge.matchedUniversity.name}</h5>
                <p className="text-xs text-slate-600">Dept: {challenge.matchedUniversity.department}</p>
                <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                  Project: {challenge.matchedUniversity.projectName}
                </p>
              </div>

              {challenge.sponsoringCompany && (
                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 uppercase">CSR Sponsor</span>
                  <h5 className="text-sm font-bold text-slate-900">{challenge.sponsoringCompany.name}</h5>
                  <p className="text-xs text-slate-600">Funding: ₹{(challenge.sponsoringCompany.amount / 100000).toFixed(1)} Lakhs</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-50 rounded-xl text-slate-500 space-y-2">
              <Sparkles className="w-6 h-6 text-indigo-500 mx-auto animate-pulse" />
              <p className="text-xs font-semibold text-slate-700">Awaiting University R&D Matchmaking</p>
              <p className="text-[11px] text-slate-400">Government Command Center is triaging this challenge for academic assignment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Discussion & Citizen Comments Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>Community Comments & Updates ({challenge.comments?.length || 0})</span>
        </h3>

        {/* Comment Input Form */}
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add your local update or confirmation comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center space-x-1 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post</span>
          </button>
        </form>

        {/* List of Comments */}
        <div className="space-y-3">
          {challenge.comments?.map((c) => (
            <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{c.author} <span className="text-slate-400 font-normal">({c.role})</span></span>
                <span className="text-slate-400 text-[11px]">{c.createdAt}</span>
              </div>
              <p className="text-xs text-slate-600">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
