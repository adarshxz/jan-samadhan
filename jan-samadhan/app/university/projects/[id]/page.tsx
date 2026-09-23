'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { 
  FolderKanban, CheckCircle2, Circle, Clock, Users, 
  GitBranch, FileCode, Rocket, ArrowLeft, Plus, Sparkles, Building2, Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UniversityProjectWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { projects, toggleMilestone } = useAppStore();

  const project = projects.find(p => p.id === id) || projects[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <Link 
          href="/university/projects"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to R&D Projects</span>
        </Link>
        <span className="text-xs font-mono font-bold text-slate-500">PROJECT WORKSPACE • {project.id}</span>
      </div>

      {/* Project Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs uppercase tracking-wider">
              {project.status.replace('_', ' ')}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
              Institution: {project.universityName}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            {project.githubRepo && (
              <a 
                href={project.githubRepo} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold flex items-center space-x-1.5 hover:bg-slate-800 transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{project.title}</h1>
          <p className="text-xs text-slate-500 mt-1">Faculty Lead: <strong>{project.facultyLead}</strong> • Dept: {project.department}</p>
        </div>

        {/* Progress Bar Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Sprint Progress</span>
            <span className="font-extrabold text-emerald-600">{project.progress}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Grid: Milestones & Student Roster */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Milestone Tracker */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>R&D Milestones & Deliverables</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">Click to toggle status</span>
          </div>

          <div className="space-y-3">
            {project.milestones.map((m) => (
              <div 
                key={m.id}
                onClick={() => toggleMilestone(project.id, m.id)}
                className={cn(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between space-x-3",
                  m.completed ? "bg-emerald-50/60 border-emerald-200" : "bg-slate-50 border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center space-x-3">
                  {m.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <h4 className={cn("text-xs font-bold", m.completed ? "text-slate-900 line-through opacity-70" : "text-slate-900")}>
                      {m.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">Target Date: {m.dueDate}</span>
                  </div>
                </div>

                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", m.completed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700")}>
                  {m.completed ? 'Completed' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Student Researchers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Student Team Roster</h3>
          </div>

          <div className="space-y-2">
            {project.studentTeam?.map((member: string, idx: number) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0">
                  {member[0]}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{member}</h5>
                  <span className="text-[10px] text-slate-500">Student Researcher</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <span className="font-bold text-slate-700 block">Grant Funding Details</span>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
              <span className="text-slate-500 text-[11px] block">Approved Budget</span>
              <p className="text-sm font-black text-indigo-900">₹{((project.fundingAmount || 250000) / 100000).toFixed(1)} Lakhs</p>
              <span className="text-[10px] text-indigo-700 font-semibold">{project.fundingSource}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
