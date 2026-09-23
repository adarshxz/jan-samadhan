'use client';

import { useAppStore } from '@/lib/store';
import { JharkhandMap } from '@/components/shared/jharkhand-map';
import { ShieldCheck, MapPin } from 'lucide-react';

export default function GovernmentMapPage() {
  const { challenges } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Statewide GIS Operations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Government GIS Command Heatmap</h1>
        <p className="text-xs sm:text-sm text-slate-400">Geo-spatial density clustering across all 24 districts of Jharkhand.</p>
      </div>

      <JharkhandMap challenges={challenges} className="shadow-2xl min-h-[620px]" />
    </div>
  );
}
