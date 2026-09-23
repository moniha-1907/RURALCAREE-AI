import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Users, 
  HeartPulse, 
  Share2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle,
  Activity,
  BedDouble,
  Radio
} from 'lucide-react';

export const PhcDashboard = ({ setActiveTab }) => {
  const { queue, callNextPatient, referrals, activeEmergency } = useData();
  const { addNotification } = useApp();

  const [isQueuePaused, setIsQueuePaused] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState("queue");

  const currentToken = queue.find(q => q.status === "In Consultation")?.token || "A012";
  const waitingCount = queue.filter(q => q.status === "Waiting").length;

  const handleCallNext = () => {
    const nextP = callNextPatient();
    if (nextP) {
      addNotification({
        title: "Token Called",
        message: `Token #${nextP.token} (${nextP.patientName}) called into Doctor Room 1.`,
        type: "info",
        time: "Just now"
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-purple-600/10 via-indigo-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 font-bold text-xs uppercase tracking-wider">
            Facility Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Rampur Primary Health Center (PHC) Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Facility ID: PHC-RAMPUR-409 • District: Sehore • Operating Hours: 24/7 Emergency & OPD
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCallNext}
            disabled={isQueuePaused}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Clock className="w-4 h-4" />
            <span>Call Next Token</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD METRICS CARDS (Requirement #34) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Today's Patients", val: "42", color: "text-sky-500" },
          { label: "Available Doctors", val: "4 On Duty", color: "text-emerald-500" },
          { label: "Active Referrals", val: referrals.length, color: "text-purple-500" },
          { label: "Emergency Cases", val: activeEmergency ? "1 Active" : "0", color: "text-red-500" },
          { label: "Specialties Active", val: "6", color: "text-amber-500" },
          { label: "Pending Follow-ups", val: "14", color: "text-indigo-500" },
        ].map((c, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
            <span className={`text-2xl font-black font-mono ${c.color}`}>{c.val}</span>
            <p className="text-[11px] font-bold text-[var(--text-secondary)]">{c.label}</p>
          </div>
        ))}
      </div>

      {/* QUEUE MANAGEMENT CONTROL CARD (Requirement #35) */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-purple-500/40 bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
          <div>
            <h3 className="text-xl font-extrabold">PHC OPD Live Queue Manager</h3>
            <p className="text-xs text-[var(--text-secondary)]">Facility Doctor: Dr. Rajesh Kumar (General Medicine - Room 1)</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQueuePaused(!isQueuePaused)}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                isQueuePaused
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border border-amber-300'
              }`}
            >
              {isQueuePaused ? (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Queue</span>
                </>
              ) : (
                <>
                  <PauseCircle className="w-4 h-4" />
                  <span>Pause Queue</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Current Token</span>
            <span className="text-3xl font-black text-emerald-500 font-mono">#{currentToken}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Next Token</span>
            <span className="text-3xl font-black text-sky-500 font-mono">#A013</span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Patients Waiting</span>
            <span className="text-3xl font-black text-amber-500 font-mono">{waitingCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Doctor Status</span>
            <span className="text-sm font-bold text-emerald-500 block pt-1">
              {isQueuePaused ? "Paused" : "Available & Consulting"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleCallNext}
            disabled={isQueuePaused}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/20 flex items-center gap-2"
          >
            <span>Call Next Patient (#A013)</span>
          </button>

          <button
            onClick={() => setActiveTab('smart-referral')}
            className="px-6 py-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-purple-500" />
            <span>Manage Facility Referrals</span>
          </button>
        </div>

      </div>

    </div>
  );
};
