'use client';

import { create } from 'zustand';
import { Challenge, Project, Notification, User, UserRole, ChallengeStatus } from './types';
import { MOCK_CHALLENGES, MOCK_PROJECTS, MOCK_UNIVERSITIES, MOCK_NOTIFICATIONS } from './mock-data';

interface AppState {
  // Auth & User
  user: User | null;
  currentUser: User | null;
  currentRole: UserRole;
  isAuthenticated: boolean;

  // Data
  challenges: Challenge[];
  projects: Project[];
  universities: any[];
  notifications: Notification[];
  communityConfirmedIds: string[];

  // Actions
  setSearchOpen?: (open: boolean) => void;
  setCurrentRole: (role: UserRole) => void;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;

  addChallenge: (challenge: Partial<Challenge>) => Challenge;
  submitChallenge: (challenge: Partial<Challenge>) => Challenge;
  upvoteChallenge: (challengeId: string) => void;
  addComment: (challengeId: string, comment: { author: string; role: string; content: string }) => void;
  updateChallengeStatus: (challengeId: string, status: ChallengeStatus, stage?: ChallengeStatus) => void;
  validateChallenge: (challengeId: string) => void;
  assignUniversity: (challengeId: string, universityInfo: any) => void;
  createProject: (project: any) => Project;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: (role: UserRole) => void;
  updateUser: (updates: Pick<User, 'name' | 'email' | 'district'>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: {
    id: 'u1',
    name: 'Ramesh Kumar',
    email: 'ramesh@gmail.com',
    role: 'citizen',
    district: 'Ranchi',
  },
  currentUser: null,
  currentRole: 'citizen',
  isAuthenticated: true,

  challenges: MOCK_CHALLENGES,
  projects: MOCK_PROJECTS,
  universities: MOCK_UNIVERSITIES,
  notifications: MOCK_NOTIFICATIONS,
  communityConfirmedIds: [],

  setSearchOpen: (open) => {},
  setCurrentRole: (role) => set({ currentRole: role }),
  setUser: (user) => set({ user, currentUser: user }),
  login: (user) => set({ user, currentUser: user, isAuthenticated: true }),
  logout: () => set({ user: null, currentUser: null, isAuthenticated: false }),

  addChallenge: (partial) => {
    const id = partial.id || `CH-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newChallenge: Challenge = {
      id,
      title: partial.title || 'New Challenge',
      description: partial.description || '',
      category: partial.category || 'water',
      district: partial.district || 'Ranchi',
      locationAddress: partial.locationAddress || 'Ranchi, Jharkhand',
      status: partial.status || 'reported',
      priorityScore: partial.priorityScore || 75,
      upvoteCount: 1,
      confirmationsCount: 1,
      reportedBy: partial.reportedBy || { name: 'Ramesh Kumar', isAnonymous: false },
      createdAt: new Date().toISOString().split('T')[0],
      aiAnalysis: partial.aiAnalysis,
      lifecycleStage: 'reported',
      timeline: partial.timeline || [
        {
          stage: 'reported',
          label: 'Reported by Citizen',
          description: 'Geotagged report logged on SAMADHAN portal',
          completedAt: 'Just now',
          actor: 'Citizen'
        }
      ]
    };

    set(state => ({
      challenges: [newChallenge, ...state.challenges],
    }));

    return newChallenge;
  },

  submitChallenge: (partial) => get().addChallenge(partial),

  upvoteChallenge: (challengeId) => {
    set(state => ({
      challenges: state.challenges.map(c =>
        c.id === challengeId ? { ...c, upvoteCount: (c.upvoteCount || 0) + 1 } : c
      )
    }));
  },

  addComment: (challengeId, comment) => {
    set(state => ({
      challenges: state.challenges.map(c =>
        c.id === challengeId
          ? {
              ...c,
              comments: [
                ...(c.comments || []),
                {
                  id: `cm-${Date.now()}`,
                  author: comment.author,
                  role: comment.role,
                  content: comment.content,
                  createdAt: 'Just now'
                }
              ]
            }
          : c
      )
    }));
  },

  updateChallengeStatus: (challengeId, status, stage) => {
    set(state => ({
      challenges: state.challenges.map(c =>
        c.id === challengeId
          ? {
              ...c,
              status,
              lifecycleStage: stage || status,
              timeline: [
                ...(c.timeline || []),
                {
                  stage: stage || status,
                  label: `Status updated to ${status}`,
                  description: `Action logged in Command Center`,
                  completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  actor: 'Government Official'
                }
              ]
            }
          : c
      )
    }));
  },

  validateChallenge: (challengeId) => get().updateChallengeStatus(challengeId, 'validated', 'validated'),

  assignUniversity: (challengeId, universityInfo) => {
    set(state => ({
      challenges: state.challenges.map(c =>
        c.id === challengeId
          ? {
              ...c,
              status: 'in_sprint',
              lifecycleStage: 'in_sprint',
              matchedUniversity: typeof universityInfo === 'object' ? universityInfo : { name: universityInfo, department: 'R&D Lab' },
              timeline: [
                ...(c.timeline || []),
                {
                  stage: 'in_sprint',
                  label: 'Assigned to University R&D',
                  description: `Matched with ${typeof universityInfo === 'object' ? universityInfo.name : universityInfo}`,
                  completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  actor: 'AI Matcher'
                }
              ]
            }
          : c
      )
    }));
  },

  createProject: (project) => {
    const newProject: Project = {
      id: project.id || `PRJ-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: project.title || 'New R&D Sprint Project',
      description: project.description || '',
      challengeId: project.challengeId || 'CH-2026-001',
      universityName: project.universityName || 'BIT Mesra',
      department: project.department || 'Engineering',
      facultyLead: project.facultyLead || 'Prof. Alok Nath',
      studentTeam: project.studentTeam || ['Ananya Sharma', 'Rahul Verma'],
      status: project.status || 'in_progress',
      progress: project.progress || 20,
      fundingAmount: project.fundingAmount || 250000,
      fundingSource: project.fundingSource || 'CSR Grant',
      milestones: project.milestones || [
        { id: 'm1', title: 'Lab Concept Testing', dueDate: '2026-10-15', completed: true },
        { id: 'm2', title: 'Field Pilot Deployment', dueDate: '2026-11-15', completed: false }
      ],
      githubRepo: project.githubRepo || 'https://github.com/sih/jan-samadhan-r-and-d'
    };

    set(state => ({
      projects: [newProject, ...state.projects]
    }));

    return newProject;
  },

  toggleMilestone: (projectId, milestoneId) => {
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              milestones: p.milestones.map(m =>
                m.id === milestoneId ? { ...m, completed: !m.completed } : m
              )
            }
          : p
      )
    }));
  },

  markNotificationRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    }));
  },

  markAllNotificationsRead: (role) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        !n.forRole || n.forRole.includes(role) ? { ...n, read: true } : n
      )
    }));
  },

  updateUser: (updates) => {
    set(state => ({
      user: state.user ? { ...state.user, ...updates } : state.user,
      currentUser: state.currentUser ? { ...state.currentUser, ...updates } : state.currentUser,
    }));
  }
}));
