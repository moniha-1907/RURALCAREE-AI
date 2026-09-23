import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  AlertTriangle, 
  PhoneCall, 
  Ambulance, 
  Stethoscope, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Share2,
  ShieldAlert
} from 'lucide-react';

export const EmergencyPage = ({ setActiveTab }) => {
  const { activeEmergency, triggerEmergencyHelp, currentVitals } = useData();
  const { addNotification } = useApp();

  const [emergencyLog, setEmergencyLog] = useState(activeEmergency || null);
  const [dispatchNotice, setDispatchNotice] = useState(null);

  const handleTriggerHelp = () => {
    const res = triggerEmergencyHelp({
      name: "Meena Devi",
      village: "Rampur (Village A)"
    });
    setEmergencyLog(res);
    addNotification({
      title: "EMERGENCY ALERT ACTIVATED",
      message: "Ambulance dispatched & duty doctor notified for Meena Devi.",
      type: "emergency",
      time: "Just now"
    });
  };

  const handleAction = (actionName) => {
    setDispatchNotice(`${actionName} completed ✓`);
    setTimeout(() => setDispatchNotice(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs uppercase tracking-wider">
          🚨 Critical Response Protocol
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-600 dark:text-red-400">
          Emergency Healthcare Coordination
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          One-touch emergency help for frontline workers and rural patients.
        </p>
      </div>

      {/* LARGE EMERGENCY BUTTON (Requirement #31) */}
      <div className="flex flex-col items-center justify-center py-6">
        <button
          onClick={handleTriggerHelp}
          className="w-48 h-48 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 hover:scale-105 text-white font-black text-lg shadow-2xl shadow-red-600/40 flex flex-col items-center justify-center gap-2 border-4 border-red-300 pulse-emergency transition-all"
        >
          <AlertTriangle className="w-16 h-16 animate-bounce" />
          <span className="tracking-widest uppercase">EMERGENCY HELP</span>
        </button>
        <p className="text-xs text-[var(--text-muted)] mt-4 font-mono">
          Tap button to instantly alert ASHA worker, duty doctor, and 108 ambulance.
        </p>
      </div>

      {dispatchNotice && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs text-center animate-fade-in">
          {dispatchNotice}
        </div>
      )}

      {/* EMERGENCY DISPATCH STATUS CARD */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-red-500/40 bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div>
            <span className="text-xs font-bold uppercase text-red-500">Live Case Log</span>
            <h3 className="text-xl font-extrabold">{emergencyLog?.id || "EMG-2026-904"}</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200 text-xs font-extrabold">
            {emergencyLog?.status || "Ambulance Dispatched"}
          </span>
        </div>

        {/* Patient Details & Vitals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border space-y-2">
            <span className="font-bold text-[var(--text-muted)] uppercase text-[10px]">Patient Information</span>
            <p className="font-bold text-sm">{emergencyLog?.patientName || "Meena Devi"} (Age: 52)</p>
            <p className="text-[var(--text-secondary)]">Location: {emergencyLog?.village || "Rampur Village Sector A"}</p>
            <p className="text-red-500 font-bold">Assigned ASHA: Sunita Sharma (+91 98765 40400)</p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border space-y-2">
            <span className="font-bold text-[var(--text-muted)] uppercase text-[10px]">Live Telemetry Vitals</span>
            <div className="grid grid-cols-2 gap-2 font-mono text-center">
              <div className="p-1.5 rounded bg-[var(--bg-card)] border text-amber-500 font-bold">100.4°F</div>
              <div className="p-1.5 rounded bg-[var(--bg-card)] border text-sky-500 font-bold">92 BPM</div>
              <div className="p-1.5 rounded bg-[var(--bg-card)] border text-emerald-500 font-bold">96% SpO2</div>
              <div className="p-1.5 rounded bg-[var(--bg-card)] border text-indigo-500 font-bold">120/80 BP</div>
            </div>
          </div>
        </div>

        {/* EMERGENCY ACTIONS BUTTONS (Requirement #31) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <button
            onClick={() => handleAction("Alert ASHA / ANM Worker")}
            className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs flex flex-col items-center gap-1.5 text-center"
          >
            <Stethoscope className="w-5 h-5 text-teal-500" />
            <span>Alert ASHA</span>
          </button>

          <button
            onClick={() => handleAction("Notify Duty Doctor")}
            className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs flex flex-col items-center gap-1.5 text-center"
          >
            <PhoneCall className="w-5 h-5 text-blue-500" />
            <span>Notify Doctor</span>
          </button>

          <button
            onClick={() => handleAction("Request 108 Ambulance")}
            className="p-3 rounded-xl bg-red-600 text-white font-bold text-xs flex flex-col items-center gap-1.5 text-center shadow-md"
          >
            <Ambulance className="w-5 h-5" />
            <span>Request Ambulance</span>
          </button>

          <button
            onClick={() => handleAction("Send District Referral")}
            className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs flex flex-col items-center gap-1.5 text-center"
          >
            <Share2 className="w-5 h-5 text-purple-500" />
            <span>Send Referral</span>
          </button>

          <button
            onClick={() => handleAction("Share Patient Context Payload")}
            className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs flex flex-col items-center gap-1.5 text-center"
          >
            <Activity className="w-5 h-5 text-emerald-500" />
            <span>Share Context</span>
          </button>
        </div>

        {/* Prototype Workflow Disclaimer */}
        <div className="pt-4 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)] italic text-center">
          Note: This is a prototype emergency coordination workflow designed for SIH 2026 hackathon demonstration.
        </div>

      </div>

    </div>
  );
};
