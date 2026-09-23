import React, { useState } from 'react';
import { 
  Activity, 
  Users, 
  Cpu, 
  Stethoscope, 
  Building2, 
  Hospital, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  WifiOff, 
  Mic, 
  Smartphone, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Award,
  ChevronRight,
  HeartPulse,
  Share2
} from 'lucide-react';

export const LandingPage = ({ setActiveTab }) => {
  const [selectedRoleFlow, setSelectedRoleFlow] = useState('patient');

  const roleFlowDetails = {
    patient: {
      title: "01. Patient",
      desc: "Rural villagers get instant access to healthcare assistance via voice, community ASHA workers, or direct digital appointments.",
      icon: Users,
      badge: "Grassroots Level",
      features: ["Multilingual Voice Symptoms Input", "Digital Queue Token", "Pill Reminders & Follow-ups"]
    },
    asha: {
      title: "02. ASHA / ANM Worker",
      desc: "Frontline health workers conduct door-to-door screenings using offline-first tablets and portable IoT vital devices.",
      icon: Stethoscope,
      badge: "Community Caregiver",
      features: ["Offline Patient Registration", "ESP32 Bluetooth Vitals Capture", "7-Step Guided Workflow"]
    },
    ai: {
      title: "03. AI Preliminary Screening",
      desc: "Instant risk categorization (Low, Moderate, High, Emergency) powered by symptom NLP and vital anomaly detectors.",
      icon: Cpu,
      badge: "Decision Support",
      features: ["Vital Anomaly Alerts", "Triage Classification", "Doctor Decision Support Only"]
    },
    doctor: {
      title: "04. Doctor Teleconsultation",
      desc: "Remote medical officers review preliminary AI reports, vitals timeline, and conduct teleconsultations.",
      icon: HeartPulse,
      badge: "Clinical Care",
      features: ["E-Prescriptions", "Digital Health Record Sync", "Smart Referral Trigger"]
    },
    phc: {
      title: "05. PHC / CHC Facility",
      desc: "Primary & Community Health Centers manage live queue tokens, doctor schedules, and facility-level diagnostics.",
      icon: Building2,
      badge: "Facility Management",
      features: ["Live Queue Call-Next", "Bed & Specialist Roster", "Emergency Escalation"]
    },
    hospital: {
      title: "06. District Hospital",
      desc: "Tertiary care centers receive complete pre-buffered patient context, vitals history, and ambulance arrival alerts.",
      icon: Hospital,
      badge: "Tertiary Referral",
      features: ["Specialist Triage", "Pre-admission Context Sync", "Critical Intensive Care"]
    }
  };

  return (
    <div className="space-y-24 py-8">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-bold text-xs tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>SIH 2026 Problem Statement Solution</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
              Healthcare Closer to <br />
              <span className="bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 dark:from-sky-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Every Rural Village
              </span>
            </h1>

            {/* Tagline pill */}
            <div className="inline-block px-4 py-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm font-bold text-[var(--text-secondary)] shadow-sm">
              AI + IoT + Telemedicine + Offline Care
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Connecting rural patients, ASHA/ANM workers, doctors, PHCs, CHCs, and district hospitals through one rural-first healthcare ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-sky-600/25 hover:shadow-sky-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Healthcare Support</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-[var(--border-color)] text-[var(--text-primary)] font-extrabold text-sm hover:bg-[var(--bg-hover)] transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-5 h-5 text-sky-500" />
                <span>Healthcare Worker Login</span>
              </button>

              <button
                onClick={() => setActiveTab('emergency')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 pulse-emergency"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency Help</span>
              </button>
            </div>

            {/* Visual Ecosystem Flow Diagram */}
            <div className="mt-14 pt-8 border-t border-[var(--border-color)]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
                Connected Rural Care Chain
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { title: "Patient", icon: Users, color: "text-sky-500", key: "patient" },
                  { title: "ASHA / ANM", icon: Stethoscope, color: "text-teal-500", key: "asha" },
                  { title: "AI Screening", icon: Cpu, color: "text-amber-500", key: "ai" },
                  { title: "Doctor", icon: HeartPulse, color: "text-blue-500", key: "doctor" },
                  { title: "PHC / CHC", icon: Building2, color: "text-purple-500", key: "phc" },
                  { title: "District Hosp", icon: Hospital, color: "text-indigo-500", key: "hospital" },
                ].map((item, idx) => (
                  <div 
                    key={item.key}
                    onClick={() => setSelectedRoleFlow(item.key)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      selectedRoleFlow === item.key
                        ? 'bg-sky-500/10 border-sky-500 shadow-md ring-2 ring-sky-500/30'
                        : 'glass-panel border-[var(--border-color)] hover:border-sky-400'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-[var(--bg-primary)] ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xs text-[var(--text-primary)]">
                      {item.title}
                    </span>
                    {idx < 5 && (
                      <span className="text-[10px] text-[var(--text-muted)] hidden lg:block">↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">The Challenge</span>
          <h2 className="text-3xl font-extrabold tracking-tight">The Rural Healthcare Gap</h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Millions in remote villages face critical barriers to timely and quality public healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Long Travel",
              desc: "Remote communities must travel long distances to reach hospitals.",
              icon: Clock,
              color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50"
            },
            {
              title: "Specialist Shortage",
              desc: "Specialist doctor access is severely limited in rural PHCs.",
              icon: Users,
              color: "text-sky-500 bg-sky-50 dark:bg-sky-950/50"
            },
            {
              title: "Delayed Referrals",
              desc: "Referrals take time and critical patient context is lost.",
              icon: AlertTriangle,
              color: "text-red-500 bg-red-50 dark:bg-red-950/50"
            },
            {
              title: "Limited Diagnostics",
              desc: "Underserved villages lack immediate diagnostic vital equipment.",
              icon: Activity,
              color: "text-purple-500 bg-purple-50 dark:bg-purple-950/50"
            },
            {
              title: "Connectivity Challenges",
              desc: "Unreliable internet interrupts conventional digital platforms.",
              icon: WifiOff,
              color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50"
            },
          ].map((card, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl space-y-3 border border-[var(--border-color)] hover-glow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">{card.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION SECTION - INTERACTIVE ROLE EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">
              Interactive Architecture
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              One Connected Rural Healthcare Platform
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Click any node in the healthcare chain below to see how RURALCARE AI coordinates care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Role List Selector */}
            <div className="lg:col-span-5 space-y-2">
              {Object.keys(roleFlowDetails).map((key) => {
                const item = roleFlowDetails[key];
                const isSel = selectedRoleFlow === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedRoleFlow(key)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSel
                        ? 'bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/20'
                        : 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-sky-400 text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${isSel ? 'text-white' : 'text-sky-500'}`} />
                      <span className="font-bold text-sm">{item.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSel ? 'text-white' : 'text-[var(--text-muted)]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Role Deep Dive Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {roleFlowDetails[selectedRoleFlow].badge}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">Stage {selectedRoleFlow.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[var(--text-primary)]">
                {roleFlowDetails[selectedRoleFlow].title}
              </h3>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {roleFlowDetails[selectedRoleFlow].desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Key Role Differentiators:
                </h4>
                <div className="space-y-2">
                  {roleFlowDetails[selectedRoleFlow].features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Demonstrate {roleFlowDetails[selectedRoleFlow].title} Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* RURAL-FIRST DESIGN (Requirement #44) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-500">Purpose-Built</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Designed for Real Rural Conditions</h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            Addressing connectivity, literacy, device, and language barriers head-on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Low Bandwidth", desc: "Optimized 2G/3G data payloads for patchy rural networks.", icon: Radio },
            { title: "Offline First", desc: "Local device caching with automatic cloud sync upon reconnection.", icon: WifiOff },
            { title: "Affordable Devices", desc: "Runs on budget Android smartphones & low-power ESP32 BLE hardware.", icon: Smartphone },
            { title: "Local Voice UI", desc: "Speech-to-text input in 6 regional languages for low-literacy users.", icon: Mic },
            { title: "Privacy by Design", desc: "Role-based access, client encryption, and audit logs.", icon: ShieldCheck },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl space-y-3 border border-[var(--border-color)] hover-glow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-500 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">{item.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT SECTION (Requirement #43) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Measurable Outcomes</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Quantifiable Healthcare Impact</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Faster Access", desc: "Reduces patient waiting & travel time by up to 70% with digital tokens." },
            { num: "02", title: "Earlier Action", desc: "AI screening identifies vital anomalies early before complications arise." },
            { num: "03", title: "Better Referrals", desc: "Context-aware routing sends patients to facilities with available capacity." },
            { num: "04", title: "Inclusive Care", desc: "Multilingual voice UI empowers elderly and illiterate villagers." },
            { num: "05", title: "Healthier Communities", desc: "ASHA workers track follow-ups and pill compliance efficiently." },
            { num: "06", title: "Equity at Scale", desc: "Bridges the specialist care gap across remote gram panchayats." },
          ].map((imp, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] flex gap-4">
              <span className="text-2xl font-extrabold text-sky-500 font-mono">{imp.num}</span>
              <div>
                <h4 className="font-bold text-base text-[var(--text-primary)]">{imp.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{imp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RISK & MITIGATION TABLE (Requirement #46) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold">Risk Assessment & Mitigation Matrix</h3>
            <p className="text-xs text-[var(--text-secondary)]">Aligned with SIH 2026 technical requirements.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Risk Factor</th>
                  <th className="py-3 px-4">Mitigation Strategy</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-red-500">Sensor / Data Quality</td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">Validation checks, outlier filtering, and sensor self-calibration.</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Mitigated</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-amber-500">Digital Literacy Barrier</td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">Voice UI in 6 regional languages + ASHA-assisted assisted registration.</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Mitigated</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-sky-500">AI False Positive / False Negative</td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">Doctor-in-the-loop validation; AI serves strictly as clinical decision support.</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Mitigated</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-purple-500">Unauthorized Data Access</td>
                  <td className="py-3.5 px-4 text-[var(--text-secondary)]">Role-based access control, end-to-end encryption readiness, and immutable audit logs.</td>
                  <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Mitigated</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};
