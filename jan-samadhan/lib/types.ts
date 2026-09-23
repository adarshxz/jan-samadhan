// Core Types for JAN-SAMADHAN

export type UserRole = 'citizen' | 'government' | 'university' | 'industry';

export type ChallengeStatus =
  | 'reported'
  | 'submitted'
  | 'ai_analysis'
  | 'validated'
  | 'community_validation'
  | 'government_validation'
  | 'university_matching'
  | 'in_sprint'
  | 'project_created'
  | 'in_progress'
  | 'pilot'
  | 'deployed'
  | 'resolved'
  | 'impact';

export type ChallengePriority = 'low' | 'medium' | 'high' | 'critical';

export type ChallengeCategory =
  | 'water'
  | 'road'
  | 'electricity'
  | 'health'
  | 'education'
  | 'agriculture'
  | 'sanitation'
  | 'healthcare'
  | 'environment'
  | 'energy'
  | 'accessibility'
  | 'waste'
  | 'infrastructure'
  | 'rural_livelihood';

export type ProjectStatus =
  | 'proposal'
  | 'approved'
  | 'in_progress'
  | 'research'
  | 'prototype'
  | 'field_testing'
  | 'pilot'
  | 'deployment'
  | 'completed'
  | 'impact';

export type SupportType =
  | 'mentorship'
  | 'funding'
  | 'technology'
  | 'equipment'
  | 'testing'
  | 'manufacturing'
  | 'deployment'
  | 'csr';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  department?: string;
  institution?: string;
  company?: string;
  organization?: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface AIAnalysis {
  domain?: string;
  subdomain?: string;
  confidence?: number;
  confidenceScore?: number;
  priorityScore: number;
  department?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  estimatedImpactPeople?: number;
  keyInsights?: string[];
  tags?: string[];
  suggestedDuplicates?: any[];
  priorityBreakdown?: {
    severity: number;
    affectedPopulation: number;
    communityValidation: number;
    frequency: number;
    strategicRelevance: number;
  };
  requiredExpertise?: string[];
  suggestedStakeholders?: string[];
  sdgAlignment?: { goal: number; name: string }[];
  similarChallengeIds?: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  subcategory?: string;
  district: string;
  block?: string;
  village?: string;
  panchayat?: string;
  landmark?: string;
  locationAddress?: string;
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
  status: ChallengeStatus;
  priority?: ChallengePriority;
  priorityScore: number;
  aiConfidence?: number;
  peopleAffected?: number;
  frequency?: 'occasional' | 'regular' | 'daily';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  affectedGroups?: string[];
  communityConfirmations?: number;
  upvoteCount?: number;
  confirmationsCount?: number;
  submittedBy?: string;
  reportedBy?: {
    name: string;
    phone?: string;
    isAnonymous?: boolean;
  };
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  aiAnalysis?: AIAnalysis;
  similarChallenges?: string[];
  assignedUniversity?: string;
  matchedUniversity?: {
    name: string;
    department: string;
    facultyLead?: string;
    studentTeam?: string;
    projectName?: string;
  };
  sponsoringCompany?: {
    name: string;
    amount: number;
  };
  projectId?: string;
  lifecycleStage?: ChallengeStatus;
  timeline?: any[];
  mediaUrls?: string[];
  images?: string[];
  comments?: Comment[];
  sdgAlignment?: number[];
}

export interface University {
  id: string;
  name: string;
  shortName?: string;
  district?: string;
  location?: string;
  type?: string;
  departments: string[];
  researchAreas?: string[];
  labs?: string[];
  facultyCount?: number;
  studentCount?: number;
  hasInnovationCenter?: boolean;
  activeProjects: number;
  completedProjects: number;
  matchScore?: number;
  matchReasons?: string[];
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  universityId?: string;
  specialization?: string[];
  expertise?: string[];
  publications?: number;
  activeProjects?: number;
  email?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber?: string;
  department: string;
  year: number | string;
  universityId?: string;
  teamName?: string;
  skills?: string[];
  projectId?: string;
}

export interface IndustryPartner {
  id: string;
  name: string;
  shortName?: string;
  sector: string;
  headquarters?: string;
  focusAreas?: string[];
  totalFundingCommitted?: number;
  expertise?: string[];
  supportTypes?: SupportType[];
  activeCollaborations?: number;
  totalFunding?: number;
  impactProjects?: number;
  matchScore?: number;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  completed?: boolean;
  owner?: string;
  deadline?: string;
  dueDate?: string;
  progress?: number;
  documents?: string[];
}

export interface Project {
  id: string;
  title?: string;
  name?: string;
  challengeId: string;
  universityId?: string;
  universityName?: string;
  department?: string;
  facultyLead?: string;
  studentTeam?: string[];
  fundingAmount?: number;
  fundingSource?: string;
  status: ProjectStatus;
  progress: number;
  facultyMentorId?: string;
  studentIds?: string[];
  industryPartnerId?: string;
  description: string;
  solution?: string;
  technology?: string[];
  expectedOutcome?: string;
  startDate?: string;
  estimatedCompletionDate?: string;
  expectedEndDate?: string;
  milestones: Milestone[];
  timeline?: any[];
  peopleImpacted?: number;
  villagesCovered?: number;
  estimatedSavings?: number;
  jobsCreated?: number;
  pilotLocation?: string;
  githubRepo?: string;
  schematicsUrl?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  actor: string;
  actorRole: string;
  action: string;
  type: 'submission' | 'validation' | 'assignment' | 'milestone' | 'collaboration' | 'system';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type?: string;
  read: boolean;
  createdAt?: string;
  timestamp?: string;
  challengeId?: string;
  link?: string;
  forRole?: UserRole[];
}

export interface DistrictData {
  id: string;
  name: string;
  population?: number;
  headquarters?: string;
  polygon?: string;
  coordinates?: { x: number; y: number };
  challenges: number;
  highPriority: number;
  validated: number;
  projects: number;
  deployed: number;
  beneficiaries: number;
  lat: number;
  lng: number;
}

export interface DemoStep {
  id: number;
  stage: string;
  title: string;
  description: string;
  actor: string;
  route: string;
  status: 'completed' | 'active' | 'pending';
}
