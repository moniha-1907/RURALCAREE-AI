import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  HeartPulse, 
  Users, 
  AlertTriangle, 
  Clock, 
  Share2, 
  CheckCircle2, 
  FileText, 
  Pill, 
  Activity, 
  Stethoscope, 
  Plus, 
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const DoctorDashboard = ({ setActiveTab }) => {
  const { queue, updateQueueStatus, callNextPatient, latestAiResult, currentVitals, addSmartReferral, addMedicineReminder } = useData();
  const { addNotification } = useApp();

  const [selectedPatient, setSelectedPatient] = useState(queue[1]); // Token A024 (Meena Devi) by default
  const [isConsulting, setIsConsulting] = useState(false);

  // Form states inside workbench
  const [clinicalNotes, setClinicalNotes] = useState("Patient presents with fever (100.4°F) for 2 days. Lungs clear, throat mild congestion. Prescribed antipyretic & hydration.");
  const [prescMed, setPrescMed] = useState("Paracetamol 500mg - 1 tablet thrice daily after meals.");
  const [labTest, setLabTest] = useState("Complete Blood Count (CBC) & Dengue NS1 Antigen Test");
  const [referralTarget, setReferralTarget] = useState("District Hospital – Sehore (Internal Medicine)");
  const [followupDate, setFollowupDate] = useState("2026-09-27");

  const [actionNotice, setActionNotice] = useState(null);

  const handleStartConsultation = () => {
    setIsConsulting(true);
    updateQueueStatus(selectedPatient.token, "In Consultation");
  };

  const handleAddPrescription = () => {
    addMedicineReminder({
      name: prescMed.split(' - ')[0] || "Paracetamol 500mg",
      dose: "1 Tablet",
      timeSlot: "Morning / Afternoon / Night",
      instruction: "After meals"
    });
    setActionNotice("E-Prescription added & synced to Patient pill tracker ✓");
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCreateReferral = () => {
    addSmartReferral({
      patientName: selectedPatient.patientName,
      patientId: selectedPatient.patientId,
      facility: referralTarget,
      specialty: "General Medicine / Critical Care",
      risk: selectedPatient.risk
    });
    setActionNotice("Smart Referral created & context pre-buffered to District Hospital ✓");
    addNotification({
      title: "Smart Referral Issued",
      message: `Referral issued for ${selectedPatient.patientName} to ${referralTarget}.`,
      type: "success",
      time: "Just now"
    });
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleCompleteConsultation = () => {
    updateQueueStatus(selectedPatient.token, "Completed");
    setIsConsulting(false);
    setActionNotice("Consultation Completed & Health Record Updated ✓");
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-blue-600/10 via-sky-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 font-bold text-xs uppercase tracking-wider">
            Clinical Workbench
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Dr. Rajesh Kumar, MD 👋
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Senior Medical Officer • Rampur Primary Health Center (PHC)
          </p>
        </div>

        <button
          onClick={() => {
            const nextP = callNextPatient();
            if (nextP) setSelectedPatient(nextP);
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2"
        >
          <Clock className="w-4 h-4" />
          <span>Call Next Queue Token</span>
        </button>
      </div>

      {/* DOCTOR CARDS (Requirement #24) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Patients Waiting", val: queue.filter(q => q.status === "Waiting").length, color: "text-amber-500" },
          { label: "Active Consultation", val: "1", color: "text-emerald-500" },
          { label: "High-Risk Patients", val: "3", color: "text-red-500" },
          { label: "Emergency Cases", val: "1", color: "text-red-600" },
          { label: "Pending Referrals", val: "2", color: "text-purple-500" },
          { label: "Today's Follow-ups", val: "5", color: "text-sky-500" },
        ].map((c, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
            <span className={`text-3xl font-black font-mono ${c.color}`}>{c.val}</span>
            <p className="text-[11px] font-bold text-[var(--text-secondary)]">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DOCTOR PATIENT QUEUE TABLE (Requirement #25 - 5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4">
          <h3 className="font-extrabold text-base flex items-center justify-between">
            <span>Today's OPD Queue</span>
            <span className="text-xs font-mono text-[var(--text-muted)]">Live Rampur PHC</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] font-bold uppercase">
                  <th className="py-2.5 px-2">Token</th>
                  <th className="py-2.5 px-2">Patient</th>
                  <th className="py-2.5 px-2">Risk</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {queue.map((q) => (
                  <tr 
                    key={q.token}
                    className={`transition-colors cursor-pointer ${
                      selectedPatient?.token === q.token ? 'bg-blue-500/10 font-bold' : 'hover:bg-[var(--bg-hover)]'
                    }`}
                    onClick={() => setSelectedPatient(q)}
                  >
                    <td className="py-3 px-2 font-mono font-bold text-blue-600 dark:text-blue-400">#{q.token}</td>
                    <td className="py-3 px-2 font-medium">{q.patientName} <span className="text-[10px] text-[var(--text-muted)]">({q.age})</span></td>
                    <td className="py-3 px-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        q.risk === 'HIGH' ? 'bg-red-100 text-red-800' :
                        q.risk === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {q.risk}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] font-bold text-[var(--text-secondary)]">{q.status}</span>
                    </td>
                    <td className="py-3 px-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedPatient(q); }}
                        className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-[10px] font-bold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DOCTOR CONSULTATION WORKBENCH (Requirement #26 - 7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
          
          {/* Patient Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-color)]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                  {selectedPatient?.patientName || "Meena Devi"}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">
                  TOKEN #{selectedPatient?.token || "A024"}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Age: {selectedPatient?.age || 52} yrs • Village: {selectedPatient?.village || "Rampur"} • Contact: +91 98765 43210
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isConsulting ? (
                <button
                  onClick={handleStartConsultation}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  Start Consultation
                </button>
              ) : (
                <button
                  onClick={handleCompleteConsultation}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>

          {actionNotice && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs text-center">
              {actionNotice}
            </div>
          )}

          {/* Vitals & AI Screening Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Vitals */}
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 text-xs">
              <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-[10px] block">
                Current IoT Vitals Telemetry
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-[var(--bg-card)] border">
                  <span className="text-[10px] text-[var(--text-muted)] block">Temp</span>
                  <span className="font-bold text-amber-500">{currentVitals.temp}°F</span>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-card)] border">
                  <span className="text-[10px] text-[var(--text-muted)] block">HR</span>
                  <span className="font-bold text-sky-500">{currentVitals.hr} BPM</span>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-card)] border">
                  <span className="text-[10px] text-[var(--text-muted)] block">SpO2</span>
                  <span className="font-bold text-emerald-500">{currentVitals.spo2}%</span>
                </div>
                <div className="p-2 rounded-lg bg-[var(--bg-card)] border">
                  <span className="text-[10px] text-[var(--text-muted)] block">BP</span>
                  <span className="font-bold text-indigo-500">{currentVitals.bpSys}/{currentVitals.bpDia}</span>
                </div>
              </div>
            </div>

            {/* AI Screening */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider text-[10px]">
                  AI Screening Classification
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px]">
                  {latestAiResult?.riskLevel || "MODERATE"}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                {latestAiResult?.summary || "Fever (100.4°F) & weakness for 2 days. Vital sensors detect mild pyrexia."}
              </p>
            </div>

          </div>

          {/* DOCTOR FUNCTIONS FORM (Requirement #26) */}
          <div className="space-y-4">
            
            {/* 1. Clinical Notes */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                Clinical Examination Notes
              </label>
              <textarea
                rows={3}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium resize-none"
              />
            </div>

            {/* 2. E-Prescription */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                Add E-Prescription
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prescMed}
                  onChange={(e) => setPrescMed(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddPrescription}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-500 flex-shrink-0"
                >
                  Add Prescription
                </button>
              </div>
            </div>

            {/* 3. Lab Test Request & Smart Referral */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Request Lab Test</label>
                <input
                  type="text"
                  value={labTest}
                  onChange={(e) => setLabTest(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Target Facility Referral</label>
                <div className="flex gap-2">
                  <select
                    value={referralTarget}
                    onChange={(e) => setReferralTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                  >
                    <option value="District Hospital – Sehore (Internal Medicine)">District Hospital – Sehore (General Medicine)</option>
                    <option value="Bhopal Medical College (Cardiology)">Bhopal Medical College (Cardiology)</option>
                    <option value="CHC Ashta (Pediatrics)">CHC Ashta (Pediatrics)</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleCreateReferral}
                    className="px-3 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 flex-shrink-0"
                  >
                    Refer
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Schedule Follow-up */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)]">Schedule Follow-up Consultation</span>
                <p className="text-[10px] text-[var(--text-muted)]">Automatic notification will be sent to ASHA worker & patient.</p>
              </div>
              <input
                type="date"
                value={followupDate}
                onChange={(e) => setFollowupDate(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-bold"
              />
            </div>

          </div>

          {/* CLINICAL DECISION DISCLAIMER (Requirement #26) */}
          <div className="pt-4 border-t border-[var(--border-color)]">
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed italic border-l-2 border-blue-500 pl-2">
              <strong>Clinical Guardrail:</strong> AI must remain decision support only. Clinical diagnosis and treatment authority resides solely with the licensed medical practitioner.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
