import { ChallengeCategory, ChallengeStatus, ChallengePriority, ProjectStatus } from './types';

export const categoryConfig: Record<ChallengeCategory, { label: string; color: string; bg: string }> = {
  water: { label: 'Water', color: 'text-blue-700', bg: 'bg-blue-50' },
  road: { label: 'Roads', color: 'text-amber-700', bg: 'bg-amber-50' },
  electricity: { label: 'Power & Energy', color: 'text-purple-700', bg: 'bg-purple-50' },
  health: { label: 'Healthcare', color: 'text-red-700', bg: 'bg-red-50' },
  education: { label: 'Education', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  agriculture: { label: 'Agriculture', color: 'text-green-700', bg: 'bg-green-50' },
  sanitation: { label: 'Sanitation', color: 'text-stone-700', bg: 'bg-stone-50' },
  healthcare: { label: 'Healthcare', color: 'text-red-700', bg: 'bg-red-50' },
  environment: { label: 'Environment', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  energy: { label: 'Energy', color: 'text-yellow-700', bg: 'bg-yellow-50' },
  accessibility: { label: 'Accessibility', color: 'text-orange-700', bg: 'bg-orange-50' },
  waste: { label: 'Waste', color: 'text-stone-700', bg: 'bg-stone-50' },
  infrastructure: { label: 'Infrastructure', color: 'text-gray-700', bg: 'bg-gray-100' },
  rural_livelihood: { label: 'Rural Livelihood', color: 'text-amber-700', bg: 'bg-amber-50' },
};

export const statusConfig: Record<ChallengeStatus, { label: string; color: string; bg: string; step: number }> = {
  reported: { label: 'Reported', color: 'text-slate-700', bg: 'bg-slate-100', step: 0 },
  submitted: { label: 'Submitted', color: 'text-slate-600', bg: 'bg-slate-100', step: 0 },
  ai_analysis: { label: 'AI Analysis', color: 'text-blue-600', bg: 'bg-blue-50', step: 1 },
  validated: { label: 'Validated', color: 'text-emerald-700', bg: 'bg-emerald-50', step: 2 },
  community_validation: { label: 'Community Validation', color: 'text-amber-600', bg: 'bg-amber-50', step: 2 },
  government_validation: { label: 'Under Validation', color: 'text-orange-600', bg: 'bg-orange-50', step: 3 },
  university_matching: { label: 'University Matching', color: 'text-purple-600', bg: 'bg-purple-50', step: 4 },
  in_sprint: { label: 'In R&D Sprint', color: 'text-indigo-700', bg: 'bg-indigo-50', step: 5 },
  project_created: { label: 'Project Created', color: 'text-indigo-600', bg: 'bg-indigo-50', step: 5 },
  in_progress: { label: 'In Progress', color: 'text-blue-700', bg: 'bg-blue-50', step: 5 },
  pilot: { label: 'Pilot', color: 'text-teal-600', bg: 'bg-teal-50', step: 6 },
  deployed: { label: 'Deployed', color: 'text-green-700', bg: 'bg-green-50', step: 7 },
  resolved: { label: 'Resolved', color: 'text-green-700', bg: 'bg-green-50', step: 7 },
  impact: { label: 'Impact Verified', color: 'text-emerald-800', bg: 'bg-emerald-100', step: 8 }
};

export const priorityConfig: Record<ChallengePriority, { label: string; color: string; bg: string; border: string }> = {
  low: { label: 'Low', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  high: { label: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  critical: { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

export const projectStatusConfig: Record<ProjectStatus, { label: string; color: string; bg: string; step: number }> = {
  proposal: { label: 'Proposal', color: 'text-gray-600', bg: 'bg-gray-100', step: 0 },
  approved: { label: 'Approved', color: 'text-blue-600', bg: 'bg-blue-50', step: 1 },
  in_progress: { label: 'In Progress', color: 'text-indigo-600', bg: 'bg-indigo-50', step: 2 },
  research: { label: 'Research', color: 'text-amber-600', bg: 'bg-amber-50', step: 2 },
  prototype: { label: 'Prototype Dev', color: 'text-purple-600', bg: 'bg-purple-50', step: 3 },
  field_testing: { label: 'Field Testing', color: 'text-orange-600', bg: 'bg-orange-50', step: 4 },
  pilot: { label: 'Pilot', color: 'text-teal-600', bg: 'bg-teal-50', step: 5 },
  deployment: { label: 'Deployment', color: 'text-indigo-600', bg: 'bg-indigo-50', step: 6 },
  completed: { label: 'Completed', color: 'text-emerald-700', bg: 'bg-emerald-50', step: 7 },
  impact: { label: 'Impact', color: 'text-green-700', bg: 'bg-green-50', step: 7 },
};

export const demoUsers = {
  citizen: { id: 'u1', name: 'Rajiv Oraon', email: 'rajiv.oraon@citizen.jh.gov.in', role: 'citizen' as const, district: 'Ranchi' },
  government: { id: 'u2', name: 'Sh. A.K. Pandey', email: 'ak.pandey@jharkhand.gov.in', role: 'government' as const, organization: 'District Collectorate, Ranchi' },
  university: { id: 'u3', name: 'Dr. Anjali Sharma', email: 'anjali.sharma@bitmesra.ac.in', role: 'university' as const, organization: 'BIT Mesra' },
  industry: { id: 'u4', name: 'Arjun Mehta', email: 'arjun.mehta@techsolve.in', role: 'industry' as const, organization: 'TechSolve Solutions Pvt. Ltd.' },
};
