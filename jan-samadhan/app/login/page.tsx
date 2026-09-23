'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { Sparkles, Users, ShieldCheck, Building2, Rocket, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const { setCurrentRole, setUser } = useAppStore();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');

  const handleLogin = (roleToLogin: UserRole) => {
    setCurrentRole(roleToLogin);
    
    // Set dummy user based on role
    if (roleToLogin === 'citizen') {
      setUser({ id: 'u1', name: 'Ramesh Kumar', email: 'ramesh@gmail.com', role: 'citizen', district: 'Ranchi' });
      router.push('/citizen');
    } else if (roleToLogin === 'government') {
      setUser({ id: 'u2', name: 'Dr. Priya Sharma (IAS)', email: 'p.sharma@jharkhand.gov.in', role: 'government', department: 'Urban Infrastructure' });
      router.push('/government');
    } else if (roleToLogin === 'university') {
      setUser({ id: 'u3', name: 'Prof. Alok Nath', email: 'alok.nath@bitmesra.ac.in', role: 'university', institution: 'BIT Mesra' });
      router.push('/university');
    } else if (roleToLogin === 'industry') {
      setUser({ id: 'u4', name: 'Vikramaditya Roy', email: 'v.roy@tatasteel.com', role: 'industry', company: 'Tata Steel CSR Foundation' });
      router.push('/industry');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 sm:px-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
            JS
          </div>
          <span className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>JAN-SAMADHAN</span>
        </Link>
        <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>SIH 2026 Portal Single Sign-On</h2>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Select your stakeholder profile for instant sandbox login access.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="p-8 rounded-3xl shadow-2xl space-y-6" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
          
          {/* Quick Role Selection Cards */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--muted-foreground)' }}>
              1. Choose Stakeholder Role
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'citizen' as UserRole, name: 'Citizen Portal', icon: Users, desc: 'Report issues & track solutions' },
                { id: 'government' as UserRole, name: 'Govt Command', icon: ShieldCheck, desc: 'Triage & validate problems' },
                { id: 'university' as UserRole, name: 'University R&D', icon: Building2, desc: 'Propose & build solutions' },
                { id: 'industry' as UserRole, name: 'Industry Partner', icon: Rocket, desc: 'Sponsor CSR & field pilots' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3",
                    selectedRole === r.id 
                      ? "border-emerald-500 shadow-md shadow-emerald-500/10" 
                      : "hover:border-emerald-300"
                  )}
                  style={{
                    backgroundColor: selectedRole === r.id ? 'rgba(16,185,129,0.08)' : 'var(--surface)',
                    borderColor: selectedRole === r.id ? '#10b981' : 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <r.icon className={cn("w-5 h-5", selectedRole === r.id ? "text-emerald-500" : "")} style={{ color: selectedRole === r.id ? '#10b981' : 'var(--muted-foreground)' }} />
                    {selectedRole === r.id && (
                      <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>{r.name}</h4>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Sandbox Launch Button */}
          <button
            onClick={() => handleLogin(selectedRole)}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Instant Demo Dashboard as {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="relative pt-4 text-center" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
              No registration required for SIH evaluators. Click above to test complete live flows.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
          Need a new organizational account?{' '}
          <Link href="/register" className="text-emerald-500 font-semibold hover:underline">
            Request Registration
          </Link>
        </p>
      </div>
    </div>
  );
}
