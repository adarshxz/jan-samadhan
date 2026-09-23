'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { JharkhandMap } from '@/components/shared/jharkhand-map';
import { Sparkles, MapPin } from 'lucide-react';

export default function CitizenMapPage() {
  const { challenges } = useAppStore();
  const [selectedCat, setSelectedCat] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive GIS Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Jharkhand State GIS Map</h1>
          <p className="text-xs sm:text-sm text-slate-500">Explore crowdsourced issues, active university sprints, and deployed projects on the state map.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'water', 'road', 'electricity', 'health', 'education'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border ${
                selectedCat === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <JharkhandMap challenges={challenges} selectedCategory={selectedCat} className="shadow-lg min-h-[600px]" />
    </div>
  );
}
