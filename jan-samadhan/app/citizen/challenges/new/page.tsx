'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { AIAnalysisCard } from '@/components/shared/ai-analysis-card';
import { JHARKHAND_DISTRICTS } from '@/lib/mock-data';
import { ChallengeCategory } from '@/lib/types';
import { 
  Sparkles, MapPin, Camera, CheckCircle2, ArrowRight, ArrowLeft, 
  Upload, ShieldAlert, Cpu, Check, AlertCircle, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES: { key: ChallengeCategory; label: string; desc: string }[] = [
  { key: 'water', label: 'Water & Sanitation', desc: 'Contaminated water, handpump failure, sewage overflow' },
  { key: 'road', label: 'Roads & Infrastructure', desc: 'Potholes, broken bridges, unpaved village roads' },
  { key: 'electricity', label: 'Power & Energy', desc: 'Transformer outage, low voltage, un-electrified hamlet' },
  { key: 'health', label: 'Healthcare & PHC', desc: 'Medicine scarcity, PHC staff absence, ambulance delay' },
  { key: 'education', label: 'School & Youth', desc: 'Dilapidated school building, lack of STEM labs, teacher shortage' },
  { key: 'agriculture', label: 'Agri & Irrigation', desc: 'Canal siltation, cold storage deficit, soil degradation' },
  { key: 'sanitation', label: 'Waste Management', desc: 'Illegal dumping yard, lack of municipal bins' },
];

export default function NewChallengeWizardPage() {
  const router = useRouter();
  const { addChallenge } = useAppStore();
  
  const [step, setStep] = useState(1);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'water' as ChallengeCategory,
    district: 'Ranchi',
    panchayat: 'Kanke Panchayat, Ward 12',
    address: 'Near Government High School, Kanke Road, Ranchi',
    description: '',
    impactLevel: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    affectedCount: 500,
  });

  // Simulated Uploaded File
  const [mediaUploaded, setMediaUploaded] = useState(false);

  // Simulated AI Output State
  const [aiOutput, setAiOutput] = useState<{
    priorityScore: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    department: string;
    keyInsights: string[];
    tags: string[];
    confidenceScore: number;
  } | null>(null);

  // Trigger simulated AI Analysis when reaching Step 4
  const triggerAiAnalysis = () => {
    setIsAiProcessing(true);
    setTimeout(() => {
      // Priority Index Calculation Algorithm
      let score = 55;
      if (formData.impactLevel === 'critical') score += 30;
      else if (formData.impactLevel === 'high') score += 20;
      else if (formData.impactLevel === 'medium') score += 10;

      if (formData.affectedCount > 1000) score += 10;
      if (formData.category === 'water' || formData.category === 'health') score += 5;

      score = Math.min(98, Math.max(35, score));

      setAiOutput({
        priorityScore: score,
        severity: formData.impactLevel,
        department: formData.category === 'water' ? 'Drinking Water & Sanitation Dept (DWSD)' :
                    formData.category === 'road' ? 'Road Construction Department (RCD)' :
                    formData.category === 'electricity' ? 'Jharkhand Bijli Vitran Nigam Ltd (JBVNL)' : 'Health & Family Welfare Dept',
        keyInsights: [
          `Panchayat level urgency parsed for ${formData.district}`,
          `Est. impact affects ~${formData.affectedCount} residents`,
          `High suitability for University IoT & Civil Engineering R&D sprint`
        ],
        tags: [formData.category, formData.district.toLowerCase(), 'crowdsourced', 'priority-triage'],
        confidenceScore: 94
      });
      setIsAiProcessing(false);
    }, 1200);
  };

  const handleNextStep = () => {
    if (step === 3) {
      triggerAiAnalysis();
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    const newId = `CH-2026-${Math.floor(100 + Math.random() * 900)}`;
    
    addChallenge({
      id: newId,
      title: formData.title || 'Community Water Supply & Infrastructure Issue',
      description: formData.description || 'Civic infrastructure defect requiring technical intervention.',
      category: formData.category,
      priorityScore: aiOutput?.priorityScore || 78,
      status: 'reported',
      district: formData.district,
      block: 'Kanke Block',
      panchayat: formData.panchayat,
      locationAddress: formData.address,
      latitude: 23.3441,
      longitude: 85.3096,
      reportedBy: {
        name: 'Ramesh Kumar',
        phone: '+91 98351 *****',
        isAnonymous: false,
      },
      createdAt: new Date().toISOString().split('T')[0],
      upvoteCount: 1,
      confirmationsCount: 1,
      mediaUrls: [
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
      ],
      aiAnalysis: aiOutput ? {
        priorityScore: aiOutput.priorityScore,
        severity: aiOutput.severity,
        department: aiOutput.department,
        keyInsights: aiOutput.keyInsights,
        tags: aiOutput.tags,
        confidenceScore: aiOutput.confidenceScore
      } : undefined,
      lifecycleStage: 'reported',
      timeline: [
        {
          stage: 'reported',
          label: 'Reported by Citizen',
          description: 'Geotagged report logged on SAMADHAN portal',
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actor: 'Ramesh Kumar (Citizen)'
        }
      ]
    });

    router.push(`/citizen/challenges/${newId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">5-Step AI-Assisted Wizard</span>
            <h1 className="text-2xl font-black text-slate-900">Report a Societal Challenge</h1>
          </div>
          <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full">
            Step {step} of 5
          </span>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Location' },
            { num: 3, label: 'Evidence' },
            { num: 4, label: 'AI Triaging' },
            { num: 5, label: 'Submit' }
          ].map((s) => (
            <div key={s.num} className="space-y-1">
              <div className={cn(
                "h-2 rounded-full transition-all duration-300",
                step > s.num ? "bg-emerald-500" : step === s.num ? "bg-slate-900" : "bg-slate-200"
              )} />
              <span className={cn(
                "text-[10px] font-bold block text-center truncate",
                step === s.num ? "text-slate-900 font-extrabold" : "text-slate-400"
              )}>
                {s.num}. {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">

        {/* STEP 1: CATEGORY & TITLE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Step 1: Select Problem Category</h3>
              <p className="text-xs text-slate-500">Choose the sector that best describes the civic challenge.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.key }))}
                  className={cn(
                    "p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3",
                    formData.category === cat.key 
                      ? "bg-emerald-50 border-emerald-500 shadow-xs" 
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl text-white shrink-0 mt-0.5",
                    formData.category === cat.key ? "bg-emerald-600" : "bg-slate-700"
                  )}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{cat.label}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Problem Headline Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken Transformer Causing 48hr Power Outage in Kanke Hamlet"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Detailed Description of the Issue</label>
                <textarea
                  rows={4}
                  placeholder="Describe the issue, frequency, history, and how it impacts local residents..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & GEOTAG */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Step 2: Location & Geo-Tagging</h3>
              <p className="text-xs text-slate-500">Provide district, block, and exact street address.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">District</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                >
                  {JHARKHAND_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Panchayat / Ward</label>
                <input
                  type="text"
                  value={formData.panchayat}
                  onChange={(e) => setFormData(prev => ({ ...prev, panchayat: e.target.value }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Specific Landmark / Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
              />
            </div>

            {/* GPS Simulation Card */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-600 animate-bounce" />
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">GPS Coordinates Captured</span>
                  <span className="text-[11px] text-emerald-700">Lat: 23.3441° N, Long: 85.3096° E (Accuracy: 4 meters)</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold">Auto-Geotagged</span>
            </div>
          </div>
        )}

        {/* STEP 3: MEDIA & EVIDENCE */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Step 3: Upload Photo / Video Proof</h3>
              <p className="text-xs text-slate-500">Visual evidence speeds up government validation and AI intent parsing.</p>
            </div>

            {/* Mock Drag Dropzone */}
            <div 
              onClick={() => setMediaUploaded(true)}
              className={cn(
                "border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all space-y-3",
                mediaUploaded 
                  ? "border-emerald-500 bg-emerald-50/50" 
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100/80"
              )}
            >
              {mediaUploaded ? (
                <div className="space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-900">1 Photo File Uploaded (water_leakage_kanke.jpeg)</h4>
                  <p className="text-[11px] text-slate-500">EXIF geotag verified: Ranchi, Jharkhand</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-800">Click to attach photo/video proof</h4>
                  <p className="text-[11px] text-slate-400">Supports JPG, PNG, MP4 up to 25MB</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Perceived Urgency</label>
                <select
                  value={formData.impactLevel}
                  onChange={(e) => setFormData(prev => ({ ...prev, impactLevel: e.target.value as any }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                >
                  <option value="low">Low (Routine maintenance)</option>
                  <option value="medium">Medium (Moderate inconvenience)</option>
                  <option value="high">High (Severe community disruption)</option>
                  <option value="critical">Critical (Immediate public hazard)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Est. Affected Citizens</label>
                <input
                  type="number"
                  value={formData.affectedCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, affectedCount: parseInt(e.target.value) || 100 }))}
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 font-medium text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: AI TRIAGING & ANALYSIS */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600 animate-spin" />
                <h3 className="text-lg font-bold text-slate-900">Step 4: SAMADHAN-AI Triaging</h3>
              </div>
              <p className="text-xs text-slate-500">Automated NLP priority index calculation & duplicate checking.</p>
            </div>

            <AIAnalysisCard 
              isSimulating={isAiProcessing} 
              analysis={aiOutput ? {
                priorityScore: aiOutput.priorityScore,
                severity: aiOutput.severity,
                department: aiOutput.department,
                keyInsights: aiOutput.keyInsights,
                tags: aiOutput.tags,
                confidenceScore: aiOutput.confidenceScore
              } : undefined}
            />
          </div>
        )}

        {/* STEP 5: REVIEW & SUBMIT */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Step 5: Final Review & Publish</h3>
              <p className="text-xs text-slate-500">Confirm details before publishing to community feed and government queue.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">{formData.category} • {formData.district}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                  AI Priority Score: {aiOutput?.priorityScore}/100
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{formData.title || 'Civic Infrastructure Defect'}</h4>
              <p className="text-xs text-slate-600">{formData.description || 'No description provided.'}</p>
              <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{formData.address}</span>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              disabled={step === 1 && !formData.title}
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-40 transition-all flex items-center space-x-2"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-lg shadow-emerald-600/20 transition-all flex items-center space-x-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Publish Challenge Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
