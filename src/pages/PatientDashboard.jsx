import React from 'react';
import { useApp } from '../context/AppContext';
import { useData } from '../context/DataContext';
import { 
  Calendar, 
  Sparkles, 
  Activity, 
  PhoneCall, 
  FileText, 
  Pill, 
  Share2, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Heart,
  UserCheck,
  Building2,
  Stethoscope
} from 'lucide-react';

export const PatientDashboard = ({ setActiveTab }) => {
  const { userProfile } = useApp();
  const { queue, currentVitals, latestAiResult, referrals, medicines } = useData();

  const patientName = userProfile?.name || "Meena Devi";
  const myQueueToken = queue.find(q => q.patientName.toLowerCase().includes("meena")) || queue[1];
  const pendingMeds = medicines.filter(m => !m.taken).length;
  const activeReferral = referrals[0];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-sky-600/10 via-teal-500/10 to-transparent relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
            Patient Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Good Morning, {patientName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Village: Rampur (Village A) • Patient ID: PAT-1001
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai-screening')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Symptom Check</span>
          </button>
          
          <button
            onClick={() => setActiveTab('emergency')}
            className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md pulse-emergency flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD STATUS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Current Health Status */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Current Health Status</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {latestAiResult?.riskLevel || "MODERATE"}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Mild Fever & Weakness</h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {latestAiResult?.summary || "Fever (100.4°F) detected. Doctor review recommended."}
          </p>
          <button 
            onClick={() => setActiveTab('ai-screening')}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            View AI Screening Report <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Next Consultation & Digital Queue Token */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3 bg-sky-50/50 dark:bg-sky-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-sky-700 dark:text-sky-300">Digital Queue Token</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-sky-600 text-white">
              TOKEN #{myQueueToken?.token || "A024"}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)]">{myQueueToken?.waitMin || 35} mins</p>
              <p className="text-xs text-[var(--text-secondary)]">Estimated Waiting Time</p>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-1 rounded-lg">
              12 Patients Ahead
            </span>
          </div>
          <button 
            onClick={() => setActiveTab('digital-queue')}
            className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Track Live Queue Screen</span>
          </button>
        </div>

        {/* Card 3: Medicine Reminders */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Today's Medicines</span>
            <span className="text-xs font-bold text-emerald-600">
              {medicines.filter(m => m.taken).length}/{medicines.length} Taken
            </span>
          </div>
          <div className="space-y-2">
            {medicines.map(m => (
              <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div>
                  <p className="font-bold">{m.name} ({m.dose})</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{m.timeSlot} • {m.instruction}</p>
                </div>
                {m.taken ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Taken
                  </span>
                ) : (
                  <span className="text-amber-500 font-bold">Pending</span>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveTab('medicine-reminders')}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            Manage Pill Reminders <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Latest Connected IoT Vitals */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Connected Vitals</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-muted)] block">Body Temp</span>
              <span className="text-base font-extrabold text-amber-500">{currentVitals.temp}°F</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-muted)] block">Heart Rate</span>
              <span className="text-base font-extrabold text-sky-500">{currentVitals.hr} BPM</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-muted)] block">SpO₂ Oxygen</span>
              <span className="text-base font-extrabold text-emerald-500">{currentVitals.spo2}%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <span className="text-[10px] text-[var(--text-muted)] block">Blood Pressure</span>
              <span className="text-base font-extrabold text-indigo-500">{currentVitals.bpSys}/{currentVitals.bpDia}</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('iot-vitals')}
            className="w-full py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-hover)] font-bold text-xs transition-colors"
          >
            Live Sensor Readings & Trend Chart
          </button>
        </div>

        {/* Card 5: Smart Referral Status */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Smart Referral Status</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {activeReferral?.status || "Accepted"}
            </span>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">{activeReferral?.recommendedFacility}</h4>
            <p className="text-xs text-[var(--text-secondary)]">Specialty: {activeReferral?.specialty}</p>
            <p className="text-[11px] text-[var(--text-muted)]">Distance: 18 km (35 mins travel time)</p>
          </div>
          <button 
            onClick={() => setActiveTab('smart-referral')}
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            Track Referral Timeline <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 6: Upcoming Follow-up */}
        <div className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Upcoming Follow-up</span>
            <Calendar className="w-4 h-4 text-sky-500" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Dr. Rajesh Kumar</h4>
            <p className="text-xs text-[var(--text-secondary)]">Rampur PHC Tele-clinic</p>
            <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400">Date: 25 Sep 2026 @ 10:30 AM</p>
          </div>
          <button 
            onClick={() => setActiveTab('book-appointment')}
            className="w-full py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold text-xs hover:bg-sky-100 transition-colors"
          >
            Reschedule or Add Note
          </button>
        </div>

      </div>

      {/* MAIN ACTIONS GRID (Requirement #15) */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold tracking-tight">Main Healthcare Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: "Book Appointment", icon: Calendar, color: "text-sky-500", tab: "book-appointment" },
            { title: "AI Health Screening", icon: Sparkles, color: "text-amber-500", tab: "ai-screening" },
            { title: "Check Vitals", icon: Activity, color: "text-emerald-500", tab: "iot-vitals" },
            { title: "Talk to Doctor", icon: PhoneCall, color: "text-blue-500", tab: "digital-queue" },
            { title: "My Health Record", icon: FileText, color: "text-purple-500", tab: "health-record" },
            { title: "Medicine Reminder", icon: Pill, color: "text-pink-500", tab: "medicine-reminders" },
            { title: "My Referrals", icon: Share2, color: "text-indigo-500", tab: "smart-referral" },
            { title: "Emergency Help", icon: AlertTriangle, color: "text-red-500", tab: "emergency" },
          ].map((act, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(act.tab)}
              className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] hover:border-sky-500 hover-glow transition-all flex flex-col items-center justify-center text-center gap-3 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-2xl bg-[var(--bg-primary)] ${act.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                <act.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs text-[var(--text-primary)]">{act.title}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
