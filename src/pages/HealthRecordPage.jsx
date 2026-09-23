import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  User, 
  Stethoscope, 
  Activity, 
  Pill, 
  Upload, 
  Share2, 
  Clock, 
  CheckCircle2, 
  FileSpreadsheet
} from 'lucide-react';

export const HealthRecordPage = () => {
  const { currentVitals, vitalsHistory, referrals, medicines } = useData();
  const [activeTabSub, setActiveTabSub] = useState("consultations");
  const [uploadNotice, setUploadNotice] = useState(null);

  const handleUploadReport = (e) => {
    e.preventDefault();
    setUploadNotice("Lab report uploaded & encrypted in patient timeline ✓");
    setTimeout(() => setUploadNotice(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold text-xs uppercase tracking-wider">
          Universal Digital Health Profile
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          My Digital Health Record
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Patient: Meena Devi (52 Yrs, Female) • ABHA ID: 91-8809-4092-11
        </p>
      </div>

      {/* TABS NAVIGATION (Requirement #27) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[var(--border-color)] pb-3">
        {[
          { id: "profile", label: "Profile" },
          { id: "consultations", label: "Consultations" },
          { id: "vitals", label: "Vitals Timeline" },
          { id: "prescriptions", label: "Prescriptions" },
          { id: "lab-reports", label: "Lab Reports" },
          { id: "referrals", label: "Referrals" },
          { id: "followups", label: "Follow-ups" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabSub(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: TIMELINE FORMAT */}
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
        
        {/* PROFILE TAB */}
        {activeTabSub === "profile" && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg">Patient Demographics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Full Name</span>
                <span className="font-bold">Meena Devi</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Age & Gender</span>
                <span className="font-bold">52 Yrs, Female</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Village</span>
                <span className="font-bold">Rampur (Village A)</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border">
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">District</span>
                <span className="font-bold">Sehore, MP</span>
              </div>
            </div>
          </div>
        )}

        {/* CONSULTATIONS TAB */}
        {activeTabSub === "consultations" && (
          <div className="space-y-6 relative border-l-2 border-purple-500/40 ml-4 pl-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">Doctor Teleconsultation — Dr. Rajesh Kumar</h4>
                <span className="text-xs font-mono text-[var(--text-muted)]">23 Sep 2026 @ 10:30 AM</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Diagnosis: Acute Pyrexia with general fatigue. Clinical Notes: Prescribed Paracetamol 500mg, advised hydration and temperature monitoring.
              </p>
            </div>
          </div>
        )}

        {/* VITALS TAB */}
        {activeTabSub === "vitals" && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg">Historical Vitals Telemetry</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b text-[var(--text-muted)] font-bold uppercase">
                    <th className="py-2 px-2">Time</th>
                    <th className="py-2 px-2">Temp (°F)</th>
                    <th className="py-2 px-2">HR (BPM)</th>
                    <th className="py-2 px-2">SpO2 (%)</th>
                    <th className="py-2 px-2">BP (mmHg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {vitalsHistory.map((v, i) => (
                    <tr key={i}>
                      <td className="py-2 px-2 font-mono">{v.time}</td>
                      <td className="py-2 px-2 font-bold text-amber-500">{v.temp}°F</td>
                      <td className="py-2 px-2 font-bold text-sky-500">{v.hr} BPM</td>
                      <td className="py-2 px-2 font-bold text-emerald-500">{v.spo2}%</td>
                      <td className="py-2 px-2 font-bold text-indigo-500">{v.bpSys}/80</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTabSub === "prescriptions" && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">Active E-Prescriptions</h3>
            {medicines.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border bg-[var(--bg-primary)] text-xs flex justify-between">
                <div>
                  <h4 className="font-bold text-sm">{m.name} ({m.dose})</h4>
                  <p className="text-[var(--text-secondary)]">{m.timeSlot} • {m.instruction}</p>
                </div>
                <span className="font-bold text-emerald-500">Active</span>
              </div>
            ))}
          </div>
        )}

        {/* LAB REPORTS TAB (Requirement #28) */}
        {activeTabSub === "lab-reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-lg">Diagnostic Lab Reports</h3>
              
              <form onSubmit={handleUploadReport} className="flex items-center gap-2">
                <input
                  type="file"
                  id="lab-upload"
                  className="hidden"
                  onChange={handleUploadReport}
                />
                <label
                  htmlFor="lab-upload"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Report</span>
                </label>
              </form>
            </div>

            {uploadNotice && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                {uploadNotice}
              </div>
            )}

            <div className="space-y-3">
              <div className="p-4 rounded-xl border bg-[var(--bg-primary)] text-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-6 h-6 text-purple-500" />
                  <div>
                    <h4 className="font-bold text-sm">Complete Blood Count (CBC)</h4>
                    <p className="text-[var(--text-secondary)]">Date: 17 Sep 2026 • Status: Normal Range</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 font-bold text-[10px]">
                  Verified Report ✓
                </span>
              </div>
            </div>
          </div>
        )}

        {/* REFERRALS TAB */}
        {activeTabSub === "referrals" && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">Issued Referrals</h3>
            {referrals.map((r) => (
              <div key={r.id} className="p-4 rounded-xl border bg-[var(--bg-primary)] text-xs flex justify-between">
                <div>
                  <h4 className="font-bold text-sm">{r.recommendedFacility}</h4>
                  <p className="text-[var(--text-secondary)]">Specialty: {r.specialty} • Distance: {r.distance}</p>
                </div>
                <span className="font-bold text-purple-600">{r.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* FOLLOWUPS TAB */}
        {activeTabSub === "followups" && (
          <div className="space-y-3">
            <h3 className="font-extrabold text-lg">Scheduled Follow-ups</h3>
            <div className="p-4 rounded-xl border bg-[var(--bg-primary)] text-xs flex justify-between">
              <div>
                <h4 className="font-bold text-sm">Dr. Rajesh Kumar (Rampur PHC)</h4>
                <p className="text-[var(--text-secondary)]">Scheduled for 25 Sep 2026 @ 10:30 AM</p>
              </div>
              <span className="font-bold text-sky-500">Upcoming</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
