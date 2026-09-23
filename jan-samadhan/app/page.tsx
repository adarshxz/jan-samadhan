'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  ArrowRight, Building2, CheckCircle2, ChevronRight, CircleDot,
  Globe2, MapPinned, Moon, ShieldCheck, Sparkles, Sun, Users,
} from 'lucide-react';
import { MOCK_CHALLENGES, MOCK_PROJECTS, MOCK_UNIVERSITIES } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { JharkhandMap } from '@/components/shared/jharkhand-map';
import { ChallengeCard } from '@/components/shared/challenge-card';
import { DemoJourneyModal } from '@/components/shared/demo-journey-modal';

const journey = [
  ['01', 'Report', 'A local issue is logged with location and evidence.'],
  ['02', 'Validate', 'AI and district teams establish urgency and scope.'],
  ['03', 'Build', 'The right R&D team designs a field-ready solution.'],
  ['04', 'Deploy', 'Partners fund, pilot, and measure public impact.'],
];

const portals = [
  { role: 'citizen' as const, title: 'For citizens', eyebrow: 'REPORT & TRACK', copy: 'Turn everyday problems into visible, trackable public action.', icon: Users, hue: '#0f9f8c' },
  { role: 'government' as const, title: 'For government', eyebrow: 'PRIORITIZE & GOVERN', copy: 'See the work that needs attention, with evidence behind every decision.', icon: ShieldCheck, hue: '#3b5ccc' },
  { role: 'university' as const, title: 'For universities', eyebrow: 'RESEARCH & BUILD', copy: 'Match ambitious teams to problems worth solving in the real world.', icon: Building2, hue: '#7357cf' },
];

export default function LandingPage() {
  const router = useRouter();
  const { setCurrentRole } = useAppStore();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [mapCategory, setMapCategory] = useState('all');
  const [showDemo, setShowDemo] = useState(false);

  const enterPortal = (role: 'citizen' | 'government' | 'university' | 'industry') => {
    setCurrentRole(role);
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <header className="sticky top-0 z-40 border-b" style={{ background: 'color-mix(in srgb, var(--background) 88%, transparent)', borderColor: 'var(--border)', backdropFilter: 'blur(18px)' }}>
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="JAN-SAMADHAN home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl font-black text-sm text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6 58%, #38bdf8)' }}>JS</span>
            <span>
              <span className="block text-sm font-extrabold tracking-tight">JAN-SAMADHAN</span>
              <span className="block text-[10px] font-bold tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>JHARKHAND INNOVATION NETWORK</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" style={{ color: 'var(--text-secondary)' }}>
            <a href="#how-it-works" className="hover:text-teal-600">How it works</a>
            <a href="#live-map" className="hover:text-teal-600">State map</a>
            <a href="#portals" className="hover:text-teal-600">Portals</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              {mounted && theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link href="/login" className="rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm" style={{ background: 'var(--foreground)' }}>Sign in</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pb-24 lg:pt-24">
          <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full blur-3xl" style={{ background: 'rgba(45, 212, 191, .16)' }} />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-wide" style={{ borderColor: 'rgba(13,148,136,.25)', background: 'var(--accent)', color: 'var(--accent-foreground)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> PUBLIC PROBLEMS, SHARED PROGRESS
            </div>
            <h1 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-[-0.05em] sm:text-5xl">
              Good ideas should begin <span className="text-teal-600 dark:text-teal-400">where problems live.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 sm:text-lg" style={{ color: 'var(--text-muted)' }}>
              JAN-SAMADHAN connects citizens, public agencies, researchers, and industry to move local challenges from report to real-world solution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => enterPortal('citizen')} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)' }}>
                Report a local issue <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => setShowDemo(true)} className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3.5 text-sm font-bold" style={{ borderColor: 'var(--border-strong)', background: 'var(--surface)' }}>
                <Sparkles className="h-4 w-4 text-teal-600" /> Explore the journey
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {['AI-assisted triage', '24-district visibility', 'Open impact tracking'].map(item => <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" />{item}</span>)}
            </div>
          </div>

          <aside className="relative rounded-[2rem] border p-5 shadow-2xl sm:p-6" style={{ background: 'var(--card)', borderColor: 'var(--border)', boxShadow: '0 25px 60px -24px rgba(15, 118, 110, .28)' }}>
            <div className="flex items-start justify-between border-b pb-5" style={{ borderColor: 'var(--border)' }}>
              <div><p className="text-[10px] font-extrabold tracking-[.18em] text-teal-600">LIVE ACTION DESK</p><h2 className="mt-1 text-xl font-extrabold">A clearer path to impact</h2></div>
              <span className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}><CircleDot className="h-3 w-3" /> LIVE</span>
            </div>
            <div className="space-y-3 py-5">
              {[
                ['AI is reviewing', 'Water supply outage · Ranchi', 'Priority score 91'],
                ['Team matched', 'Low-cost cold storage · Khunti', 'BIT Mesra · Food Tech'],
                ['Pilot deployed', 'Solar streetlight repair · Dumka', '1,240 residents reached'],
              ].map(([status, title, detail], index) => (
                <div key={title} className="flex gap-3 rounded-2xl p-3.5" style={{ background: index === 0 ? 'var(--accent)' : 'var(--surface-secondary)' }}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black" style={{ background: 'var(--card)', color: index === 2 ? '#16a34a' : 'var(--primary)' }}>0{index + 1}</span>
                  <div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wide text-teal-600">{status}</p><p className="truncate text-sm font-bold">{title}</p><p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>{detail}</p></div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(110deg, #102a43, #164e63)' }}>
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-white/70">This month&apos;s verified reach</span><Globe2 className="h-4 w-4 text-cyan-300" /></div>
              <p className="mt-1 text-3xl font-black">1.4M <span className="text-sm font-semibold text-white/70">citizens</span></p>
            </div>
          </aside>
        </section>

        <section className="border-y" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x sm:grid-cols-4" style={{ borderColor: 'var(--border)' }}>
            {[[MOCK_CHALLENGES.length + '+', 'reported challenges'], [MOCK_UNIVERSITIES.length, 'verified institutions'], [MOCK_PROJECTS.length, 'active solution projects'], ['24', 'districts connected']].map(([value, label]) => <div key={label} className="px-5 py-7 sm:px-8"><p className="text-2xl font-black sm:text-3xl">{value}</p><p className="mt-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{label}</p></div>)}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl"><p className="text-xs font-extrabold tracking-[.18em] text-teal-600">ONE CONNECTED WORKFLOW</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From a neighbourhood report to a solution people can see.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {journey.map(([step, title, text], index) => <article key={step} className="relative rounded-3xl border p-5" style={{ background: index === 1 ? 'var(--accent)' : 'var(--card)', borderColor: 'var(--border)' }}><p className="text-xs font-black text-teal-600">{step}</p><h3 className="mt-8 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-muted)' }}>{text}</p>{index < 3 && <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rounded-full border p-1 md:block" style={{ background: 'var(--card)', borderColor: 'var(--border)' }} />}</article>)}
          </div>
        </section>

        <section id="live-map" className="border-y py-16 sm:py-20" style={{ background: 'var(--surface-secondary)', borderColor: 'var(--border)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid gap-8 border-b pb-9 lg:grid-cols-[1fr_auto] lg:items-end" style={{ borderColor: 'var(--border)' }}>
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold tracking-[.18em] text-teal-600">STATEWIDE SIGNAL</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A living view of what needs attention.</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 sm:text-base" style={{ color: 'var(--text-muted)' }}>Explore reports by category, identify pressure points, and move from a statewide pattern to one district&apos;s next action.</p>
              </div>
              <Link href="/citizen/map" className="inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:border-teal-300 hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-teal-950/30" style={{ borderColor: 'var(--border)' }}>
                Open district map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-7 grid gap-5 xl:grid-cols-[14rem_minmax(0,1fr)] xl:items-start">
              <aside className="rounded-3xl border p-4 xl:sticky xl:top-24" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 text-xs font-extrabold" style={{ color: 'var(--text-secondary)' }}><MapPinned className="h-4 w-4 text-teal-600" /> EXPLORE THE SIGNAL</div>
                <p className="mt-3 text-sm font-semibold leading-5" style={{ color: 'var(--text-muted)' }}>Choose a service area to focus the map and district activity.</p>
                <div className="mt-5 flex flex-wrap gap-2 xl:flex-col xl:items-stretch">{['all', 'water', 'road', 'electricity', 'health'].map(category => <button key={category} onClick={() => setMapCategory(category)} className="rounded-xl border px-3 py-2 text-left text-xs font-bold capitalize transition" style={mapCategory === category ? { background: 'var(--foreground)', color: 'var(--background)', borderColor: 'var(--foreground)' } : { background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>{category === 'all' ? 'All active reports' : category}</button>)}</div>
              </aside>
              <div className="overflow-hidden rounded-[2rem] border p-2 shadow-[0_20px_45px_-30px_rgba(15,118,110,.42)] sm:p-3" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}><JharkhandMap challenges={MOCK_CHALLENGES} selectedCategory={mapCategory} /></div>
            </div>
          </div>
        </section>

        <section id="portals" className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold tracking-[.18em] text-teal-600">BUILT FOR COLLABORATION</p><h2 className="mt-3 text-3xl font-black tracking-tight">One mission. Purpose-built workspaces.</h2></div><button onClick={() => enterPortal('industry')} className="inline-flex items-center gap-2 text-sm font-bold text-teal-600">Explore industry hub <ArrowRight className="h-4 w-4" /></button></div><div className="mt-9 grid gap-4 md:grid-cols-3">{portals.map(portal => { const Icon = portal.icon; return <button key={portal.role} onClick={() => enterPortal(portal.role)} className="group rounded-[1.75rem] border p-6 text-left transition hover:-translate-y-1 hover:shadow-lg" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}><span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${portal.hue}16`, color: portal.hue }}><Icon className="h-5 w-5" /></span><p className="mt-6 text-[10px] font-extrabold tracking-[.15em]" style={{ color: portal.hue }}>{portal.eyebrow}</p><h3 className="mt-2 text-xl font-extrabold">{portal.title}</h3><p className="mt-3 min-h-12 text-sm leading-6" style={{ color: 'var(--text-muted)' }}>{portal.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: portal.hue }}>Enter workspace <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></button>})}</div></section>

        <section className="border-t py-16" style={{ background: 'var(--surface-secondary)', borderColor: 'var(--border)' }}><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-extrabold tracking-[.18em] text-teal-600">IN THE COMMUNITY</p><h2 className="mt-2 text-2xl font-black">Challenges moving now</h2></div><Link href="/citizen/challenges" className="text-sm font-bold text-teal-600">View all</Link></div><div className="grid gap-4 md:grid-cols-3">{MOCK_CHALLENGES.slice(0, 3).map(challenge => <ChallengeCard key={challenge.id} challenge={challenge} />)}</div></div></section>
      </main>

      <footer className="border-t px-5 py-8 sm:px-8" style={{ background: 'var(--background)', borderColor: 'var(--border)' }}><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs sm:flex-row" style={{ color: 'var(--text-muted)' }}><span className="font-bold" style={{ color: 'var(--foreground)' }}>JAN-SAMADHAN · Government of Jharkhand</span><span>Public innovation, made visible.</span></div></footer>
      <DemoJourneyModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}
