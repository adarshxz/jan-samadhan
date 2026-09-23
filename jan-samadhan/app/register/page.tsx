'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { setCurrentRole } = useAppStore();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('citizen');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setCurrentRole(role);
      router.push(`/${role}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-6 sm:px-8 selection:bg-emerald-500 selection:text-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
            JS
          </div>
          <span className="text-2xl font-black text-white">JAN-SAMADHAN</span>
        </Link>
        <h2 className="text-xl font-bold text-slate-200">Register Stakeholder Account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white">Account Provisioned Successfully!</h3>
              <p className="text-xs text-slate-400">Redirecting to your stakeholder portal...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Account Category</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                >
                  <option value="citizen">Citizen Account</option>
                  <option value="government">Government Department Official</option>
                  <option value="university">University Dean / Faculty / Student Leader</option>
                  <option value="industry">Industry CSR & Startup Partner</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Name / Org Representative</label>
                <input required type="text" placeholder="e.g. Ananya Sharma" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Official Email Address</label>
                <input required type="email" placeholder="name@domain.gov.in or .ac.in" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">District / Headquarters Location</label>
                <input required type="text" defaultValue="Ranchi, Jharkhand" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500" />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <span>Complete Registration & Launch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="border-t border-slate-800 pt-4 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
