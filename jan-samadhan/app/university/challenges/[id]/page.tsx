'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { 
  Building2, Sparkles, MapPin, CheckCircle2, 
  ArrowLeft, ArrowRight, Rocket, Users, FileText 
} from 'lucide-react';
import { categoryConfig } from '@/lib/utils-config';

export default function UniversityChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { challenges, createProject } = useAppStore();

  const challenge = challenges.find(c => c.id === id) || challenges[0];
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Proposal State
  const [proposalData, setProposalData] = useState({
    title: `IoT-based Automated System for ${challenge.title}`,
    facultyLead: 'Prof. Alok Nath',
    department: 'Civil & Environmental Engineering',
    teamMembers: 'Ananya Sharma, Rahul Verma, Priya Mahato, Sneha Roy',
    durationWeeks: 12,
    budgetRequested: 250000,
    technicalApproach: 'Deploying low-cost IoT turbidity sensors coupled with solar powered telemetry nodes for real-time district alert and automatic chemical dosing.'
  });

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const newProjectId = `PRJ-2026-${Math.floor(100 + Math.random() * 900)}`;

    createProject({
      id: newProjectId,
      challengeId: challenge.id,
      title: proposalData.title,
      description: proposalData.technicalApproach,
      universityId: 'u-1',
      universityName: 'BIT Mesra',
      department: proposalData.department,
      facultyLead: proposalData.facultyLead,
      studentTeam: proposalData.teamMembers.split(', '),
      status: 'in_progress',
      fundingAmount: proposalData.budgetRequested,
      fundingSource: 'Department of Higher Education & CSR',
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletionDate: '2026-11-30',
      progress: 20,
      milestones: [
        { id: 'm1', title: 'Lab Proof of Concept & Sensor Calibration', dueDate: '2026-10-10', completed: true },
        { id: 'm2', title: 'Hardware Telemetry Assembly', dueDate: '2026-10-25', completed: false },
        { id: 'm3', title: 'District Field Pilot Deployment', dueDate: '2026-11-15', completed: false },
        { id: 'm4', title: 'State Handover & Tech Transfer', dueDate: '2026-11-30', completed: false },
      ],
      githubRepo: 'https://github.com/bitmesra-sih/jan-samadhan-iot-node',
      schematicsUrl: 'https://bitmesra.ac.in/schematics/node_v2.pdf'
    });

    router.push(`/university/projects/${newProjectId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link 
        href="/university/challenges"
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Matched Challenges</span>
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-mono font-bold text-indigo-600">MATCHED ID: {challenge.id}</span>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full">
            Priority Score: {challenge.priorityScore}/100
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900">{challenge.title}</h1>
        <p className="text-xs text-slate-500 flex items-center space-x-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{challenge.locationAddress} ({challenge.district})</span>
        </p>

        <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Public Issue Description</h4>
          <p className="text-xs text-slate-700 leading-relaxed">{challenge.description}</p>
        </div>

        <button
          onClick={() => setShowProposalModal(true)}
          className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
        >
          <Rocket className="w-4 h-4" />
          <span>Submit Student & Faculty R&D Proposal</span>
        </button>
      </div>

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 max-w-2xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">R&D Proposal Form</span>
                <h3 className="text-xl font-black text-slate-900">Form Student & Faculty Sprint</h3>
              </div>
              <button onClick={() => setShowProposalModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">R&D Project Title</label>
                <input
                  type="text"
                  required
                  value={proposalData.title}
                  onChange={(e) => setProposalData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Faculty Lead</label>
                  <input
                    type="text"
                    value={proposalData.facultyLead}
                    onChange={(e) => setProposalData(prev => ({ ...prev, facultyLead: e.target.value }))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Budget Grant Requested (₹)</label>
                  <input
                    type="number"
                    value={proposalData.budgetRequested}
                    onChange={(e) => setProposalData(prev => ({ ...prev, budgetRequested: parseInt(e.target.value) || 100000 }))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Researcher Team Roster</label>
                <input
                  type="text"
                  value={proposalData.teamMembers}
                  onChange={(e) => setProposalData(prev => ({ ...prev, teamMembers: e.target.value }))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Technical Methodology & Architecture</label>
                <textarea
                  rows={3}
                  value={proposalData.technicalApproach}
                  onChange={(e) => setProposalData(prev => ({ ...prev, technicalApproach: e.target.value }))}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Initialize R&D Project Workspace</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
