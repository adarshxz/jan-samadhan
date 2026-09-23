'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ChallengeCard } from '@/components/shared/challenge-card';
import { Search, Filter, PlusCircle, MapPin, SlidersHorizontal, Sparkles } from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '@/lib/mock-data';
import Link from 'next/link';

export default function CitizenChallengesPage() {
  const { challenges } = useAppStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [district, setDistrict] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'upvotes' | 'recent'>('priority');

  const filtered = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase()) ||
                          (c.locationAddress || c.village || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' ? true : c.category === category;
    const matchesDistrict = district === 'all' ? true : c.district === district;
    const matchesStatus = status === 'all' ? true : c.status === status;
    return matchesSearch && matchesCat && matchesDistrict && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'priority') return b.priorityScore - a.priorityScore;
    if (sortBy === 'upvotes') return (b.upvoteCount ?? 0) - (a.upvoteCount ?? 0);
    const dateB = new Date(b.createdAt || b.submittedAt || Date.now()).getTime();
    const dateA = new Date(a.createdAt || a.submittedAt || Date.now()).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-6">
      {/* Page Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crowdsourced Societal Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Societal Challenges Feed</h1>
          <p className="text-xs sm:text-sm text-slate-500">Explore, validate, and upvote crowdsourced problems in your region.</p>
        </div>

        <Link
          href="/citizen/challenges/new"
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </Link>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keywords, location, or issue description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 text-slate-800"
            />
          </div>

          {/* District Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium text-slate-700"
            >
              <option value="all">All Districts (24)</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="w-full md:w-44">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium text-slate-700"
            >
              <option value="priority">Sort: Highest Priority Index</option>
              <option value="upvotes">Sort: Most Upvoted</option>
              <option value="recent">Sort: Most Recent</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Sector:</span>
          {['all', 'water', 'road', 'electricity', 'health', 'education', 'agriculture', 'sanitation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all border ${
                category === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Grid List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filtered.length}</strong> crowdsourced challenges</span>
          <span>Filtered by district: <strong className="capitalize">{district}</strong></span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <Search className="w-8 h-8 mx-auto text-slate-400" />
            <h3 className="text-sm font-bold text-slate-800">No challenges found</h3>
            <p className="text-xs">Try clearing filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
