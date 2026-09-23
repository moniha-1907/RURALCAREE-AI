import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  Share2, 
  MapPin, 
  Hospital, 
  Building2, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  UserCheck,
  Send
} from 'lucide-react';

export const SmartReferralPage = ({ setActiveTab }) => {
  const { referrals, addSmartReferral, updateReferralStage } = useData();
  const { addNotification } = useApp();

  const [specialty, setSpecialty] = useState("General Medicine & Critical Care");
  const [patientName, setPatientName] = useState("Meena Devi");
  const [createdNotice, setCreatedNotice] = useState(false);

  const activeRef = referrals[0];

  const handleCreateReferralSubmit = (e) => {
    e.preventDefault();
    addSmartReferral({
      patientName,
      facility: "District Hospital – Sehore",
      specialty,
      risk: "MODERATE"
    });
    setCreatedNotice(true);
    addNotification({
      title: "Smart Referral Dispatched",
      message: `Patient context for ${patientName} transmitted to District Hospital – Sehore.`,
      type: "success",
      time: "Just now"
    });
    setTimeout(() => setCreatedNotice(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-xs uppercase tracking-wider">
          <Share2 className="w-3.5 h-3.5" />
          <span>Core Smart Routing Differentiator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Smart Referral & Patient Context Transfer
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Context-aware routing based on required specialty, distance, travel time, and bed availability.
        </p>
      </div>

      {/* Multi-Tier Facility Diagram (Requirement #29) */}
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-center text-[var(--text-muted)]">
          Multi-Tier Referral Cascade System
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center items-center">
          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <MapPin className="w-6 h-6 text-sky-500 mx-auto" />
            <h4 className="font-extrabold text-sm">📍 Village Sector</h4>
            <p className="text-[10px] text-[var(--text-muted)]">Rampur Village A</p>
          </div>

          <div className="hidden sm:block text-[var(--text-muted)] font-extrabold">→</div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <Building2 className="w-6 h-6 text-teal-500 mx-auto" />
            <h4 className="font-extrabold text-sm">🏥 Rampur PHC</h4>
            <p className="text-[10px] text-[var(--text-muted)]">Primary Care Hub</p>
          </div>

          <div className="hidden sm:block text-[var(--text-muted)] font-extrabold">→</div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
            <Building2 className="w-6 h-6 text-indigo-500 mx-auto" />
            <h4 className="font-extrabold text-sm">🏥 CHC Ashta</h4>
            <p className="text-[10px] text-[var(--text-muted)]">Community Center</p>
          </div>

          <div className="hidden sm:block text-[var(--text-muted)] font-extrabold">→</div>

          <div className="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-500 space-y-2">
            <Hospital className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
            <h4 className="font-extrabold text-sm">🏥 District Hospital</h4>
            <p className="text-[10px] text-purple-600 dark:text-purple-300 font-bold">District Sehore (Tertiary)</p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED FACILITY CARD (Requirement #29) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h3 className="font-extrabold text-base">Smart Match Recommendation</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Available Capacity
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                <Hospital className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold">District Hospital – Sehore</h4>
                <p className="text-xs text-[var(--text-secondary)]">Specialty: General Medicine & Intensive Tele-Specialist</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Distance</span>
                <span className="font-extrabold text-purple-600 dark:text-purple-400">18 km</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Est. Travel</span>
                <span className="font-extrabold text-sky-500">35 min</span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Status</span>
                <span className="font-extrabold text-emerald-500">Available</span>
              </div>
            </div>

            {createdNotice && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs text-center">
                Referral Dispatched & Patient Context Sent ✓
              </div>
            )}

            <form onSubmit={handleCreateReferralSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Required Specialty</label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                >
                  <option value="General Medicine & Critical Care">General Medicine & Critical Care</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Create Referral & Send Patient Context</span>
              </button>
            </form>
          </div>
        </div>

        {/* REFERRAL TRACKING TIMELINE (Requirement #30 - 6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h3 className="font-extrabold text-base">Referral Tracking Timeline</h3>
            <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
              {activeRef?.id || "REF-8801"}
            </span>
          </div>

          {/* 5-Stage Timeline Visualizer */}
          <div className="space-y-6 relative border-l-2 border-purple-500/40 ml-4 pl-6">
            {activeRef?.timeline.map((stage, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  stage.completed ? 'bg-purple-600 text-white' : 'bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-[var(--text-muted)]'
                }`}>
                  {stage.completed ? '✓' : idx + 1}
                </div>

                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-sm ${stage.completed ? 'text-purple-600 dark:text-purple-300' : 'text-[var(--text-muted)]'}`}>
                    {stage.stage}
                  </h4>
                  <span className="text-[11px] font-mono text-[var(--text-muted)]">{stage.time}</span>
                </div>
                
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {stage.stage === 'Created' && 'Issued at Rampur PHC by Dr. Rajesh Kumar'}
                  {stage.stage === 'Accepted' && 'Accepted by Duty Medical Officer at District Hospital'}
                  {stage.stage === 'In Transit' && 'Patient en route via emergency transport'}
                  {stage.stage === 'Arrived' && 'Patient arrived at District Triage Desk'}
                  {stage.stage === 'Completed' && 'Specialist consultation complete & summary logged'}
                </p>

                {!stage.completed && (
                  <button
                    onClick={() => updateReferralStage(activeRef.id, stage.stage)}
                    className="mt-2 px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-[10px] font-bold hover:bg-purple-200"
                  >
                    Simulate Step: Mark as {stage.stage}
                  </button>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
