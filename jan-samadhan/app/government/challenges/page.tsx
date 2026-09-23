'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';
import { 
  ShieldCheck, Search, Filter, Cpu, Sparkles, ArrowRight, 
  CheckCircle2, AlertTriangle, Layers, SlidersHorizontal 
} from 'lucide-react';
import { categoryConfig } from '@/lib/utils-config';
import { cn } from '@/lib/utils';
import { JHARKHAND_DISTRICTS } from '@/lib/mock-data';

export default function GovernmentChallengesQueuePage() {
  const { challenges, updateChallengeStatus } = useAppStore();
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = district === 'all' ? true : c.district === district;
    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map(c => c.id));
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => updateChallengeStatus(id, 'validated', 'validated'));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Triage & Verification Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Government Challenge Queue</h1>
          <p className="text-xs sm:text-sm text-slate-400">Validate crowdsourced complaints and trigger AI university matchmaking.</p>
        </div>

        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkApprove}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Validate Selected ({selectedIds.length})</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by challenge ID, keyword, or municipality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="w-full md:w-48">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Districts (24)</option>
              {JHARKHAND_DISTRICTS.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2.5 px-3 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Statuses</option>
              <option value="reported">Reported (Pending)</option>
              <option value="validated">Validated</option>
              <option value="in_sprint">In R&D Sprint</option>
              <option value="deployed">Deployed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500"
                  />
                </th>
                <th className="p-3.5">ID / Sector</th>
                <th className="p-3.5">Title & Location</th>
                <th className="p-3.5">Priority Index</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.map((c) => {
                const CatConf = categoryConfig[c.category];
                const isChecked = selectedIds.includes(c.id);

                return (
                  <tr key={c.id} className={cn("hover:bg-slate-900/70 transition-colors", isChecked && "bg-slate-900/90")}>
                    <td className="p-3.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) setSelectedIds(selectedIds.filter(i => i !== c.id));
                          else setSelectedIds([...selectedIds, c.id]);
                        }}
                        className="rounded bg-slate-800 border-slate-700 text-emerald-500"
                      />
                    </td>
                    <td className="p-3.5">
                      <span className="font-mono text-slate-400 text-[11px] block">{c.id}</span>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5", CatConf?.color)}>
                        {CatConf?.label}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-sm">
                      <h4 className="font-bold text-white line-clamp-1">{c.title}</h4>
                      <span className="text-[11px] text-slate-400 line-clamp-1">{c.district} • {c.locationAddress}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center space-x-2">
                        <span className={cn(
                          "font-extrabold text-sm",
                          c.priorityScore > 75 ? "text-red-400" : c.priorityScore > 50 ? "text-amber-400" : "text-emerald-400"
                        )}>
                          {c.priorityScore}
                        </span>
                        <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full", c.priorityScore > 75 ? "bg-red-500" : c.priorityScore > 50 ? "bg-amber-500" : "bg-emerald-500")} 
                            style={{ width: `${c.priorityScore}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-slate-300 border border-slate-800">
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/government/challenges/${c.id}`}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center space-x-1"
                      >
                        <span>Validate & Match R&D</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
