'use client';

import { FormEvent, useState } from 'react';
import { Award, CheckCircle2, Mail, MapPin, Pencil, Save, ShieldCheck, UserRound, X } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function CitizenProfilePage() {
  const { user, challenges, updateUser } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', district: user?.district || '' });

  const reports = challenges.filter(challenge => (challenge.reportedBy?.name || challenge.submittedBy) === user?.name);
  const solvedReports = reports.filter(challenge => ['deployed', 'resolved', 'impact'].includes(challenge.status)).length;
  const upvotes = reports.reduce((sum, challenge) => sum + (challenge.upvoteCount || 0), 0);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateUser({ name: form.name.trim() || user?.name || 'Citizen', email: form.email.trim(), district: form.district.trim() });
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  function cancelEdit() {
    setForm({ name: user?.name || '', email: user?.email || '', district: user?.district || '' });
    setEditing(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
        <div className="h-28 bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-500" />
        <div className="relative px-6 pb-6 sm:px-8">
          <div className="-mt-11 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-3xl border-4 border-white bg-emerald-100 text-3xl font-black text-emerald-800 shadow-md">{(user?.name || 'C').charAt(0).toUpperCase()}</div>
              <div className="pb-1"><div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-black text-slate-900">{user?.name || 'Citizen'}</h1><span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800"><ShieldCheck className="h-3.5 w-3.5" />Verified citizen</span></div><p className="mt-1 text-sm text-slate-500">Contributing to a better Jharkhand, one report at a time.</p></div>
            </div>
            {!editing && <button onClick={() => setEditing(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"><Pencil className="h-3.5 w-3.5" />Edit profile</button>}
          </div>
          {saved && <p role="status" className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">Your profile has been updated.</p>}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs lg:col-span-2">
          <div className="mb-5"><h2 className="text-base font-black text-slate-900">Personal information</h2><p className="mt-1 text-xs text-slate-500">Keep your details accurate for updates on your submitted reports.</p></div>
          {editing ? <form onSubmit={saveProfile} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700">Full name<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm" /></label>
            <label className="block text-xs font-bold text-slate-700">Email address<input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm" /></label>
            <label className="block text-xs font-bold text-slate-700">District<input required value={form.district} onChange={event => setForm({ ...form, district: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm" /></label>
            <div className="flex flex-wrap gap-3 pt-2"><button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"><Save className="h-3.5 w-3.5" />Save changes</button><button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"><X className="h-3.5 w-3.5" />Cancel</button></div>
          </form> : <div className="grid gap-3 sm:grid-cols-2">
            <Info icon={UserRound} label="Full name" value={user?.name || '—'} /><Info icon={Mail} label="Email address" value={user?.email || '—'} /><Info icon={MapPin} label="District residence" value={user?.district ? `${user.district}, Jharkhand` : '—'} />
          </div>}
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs"><h2 className="text-base font-black text-slate-900">Your civic impact</h2><div className="mt-5 space-y-4"><Impact value={reports.length} label="Reports submitted" /><Impact value={solvedReports} label="Reports resolved" /><Impact value={upvotes} label="Community upvotes" /></div></aside>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs"><h2 className="text-base font-black text-slate-900">Citizen badges</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><Badge icon={Award} title="Civic contributor" detail={`${reports.length} reports submitted`} color="emerald" /><Badge icon={CheckCircle2} title="Community voice" detail={`${upvotes} community upvotes`} color="indigo" /><Badge icon={ShieldCheck} title="Identity verified" detail="Aadhaar verification complete" color="amber" /></div></section>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) { return <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><Icon className="h-4 w-4 text-emerald-600" /><span className="mt-3 block text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span><span className="mt-1 block text-sm font-bold text-slate-800">{value}</span></div>; }
function Impact({ value, label }: { value: number; label: string }) { return <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"><span className="text-2xl font-black text-emerald-700">{value}</span><span className="ml-2 text-xs font-medium text-slate-500">{label}</span></div>; }
function Badge({ icon: Icon, title, detail, color }: { icon: typeof Award; title: string; detail: string; color: 'emerald' | 'indigo' | 'amber' }) { const colors = { emerald: 'bg-emerald-50 text-emerald-700', indigo: 'bg-indigo-50 text-indigo-700', amber: 'bg-amber-50 text-amber-700' }; return <div className={`rounded-2xl p-4 ${colors[color]}`}><Icon className="h-5 w-5" /><h3 className="mt-3 text-sm font-bold">{title}</h3><p className="mt-1 text-xs opacity-80">{detail}</p></div>; }
