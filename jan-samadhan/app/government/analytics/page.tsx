'use client';

import { useAppStore } from '@/lib/store';
import { BarChart3, TrendingUp, Cpu, PieChart, Users } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const CATEGORY_DATA = [
  { name: 'Water & Sanitation', count: 18, fill: '#06b6d4' },
  { name: 'Roads & Infra', count: 14, fill: '#f59e0b' },
  { name: 'Power & Energy', count: 9, fill: '#8b5cf6' },
  { name: 'Healthcare', count: 7, fill: '#ef4444' },
  { name: 'School & Youth', count: 5, fill: '#10b981' },
];

const MONTHLY_TRENDS = [
  { month: 'May', reported: 12, resolved: 4 },
  { month: 'Jun', reported: 19, resolved: 8 },
  { month: 'Jul', reported: 24, resolved: 14 },
  { month: 'Aug', reported: 32, resolved: 22 },
  { month: 'Sep', reported: 45, resolved: 31 },
];

export default function GovernmentAnalyticsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Statewide Analytics & Resolution Trends</h1>
        <p className="text-xs sm:text-sm text-slate-400">Crowdsourcing velocity, AI triage accuracy, and department resolution performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart: Sector Distribution */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Challenges by Sector</span>
            </h3>
            <span className="text-xs text-slate-400">Total 53 Reports</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Monthly Velocity */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>Reported vs Deployed Solutions</span>
            </h3>
            <span className="text-xs text-slate-400">Monthly Velocity</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="reported" stroke="#f59e0b" strokeWidth={3} />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
