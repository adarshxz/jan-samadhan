'use client';

import { useAppStore } from '@/lib/store';
import { User, MapPin, Mail, Phone, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CitizenProfilePage() {
  const { user } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            {user?.name?.[0] || 'R'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black text-slate-900">{user?.name || 'Ramesh Kumar'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Aadhaar Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Active Citizen Contributor • Ranchi District</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold block">Email Address</span>
            <span className="font-bold text-slate-800">{user?.email || 'ramesh.k@gmail.com'}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-slate-400 font-semibold block">District Residence</span>
            <span className="font-bold text-slate-800">{user?.district || 'Ranchi, Jharkhand'}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Citizen Karma & Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-1">
              <Award className="w-6 h-6 text-emerald-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">Civic Sentinel</span>
              <span className="text-[10px] text-slate-500">4 Reports Solved</span>
            </div>
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-indigo-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">Top Voter</span>
              <span className="text-[10px] text-slate-500">18 Community Upvotes</span>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center space-y-1">
              <ShieldCheck className="w-6 h-6 text-amber-600 mx-auto" />
              <span className="text-xs font-bold text-slate-900 block">Verified Citizen</span>
              <span className="text-[10px] text-slate-500">Identity Confirmed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
