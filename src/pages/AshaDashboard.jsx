import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Stethoscope, 
  AlertTriangle, 
  Calendar, 
  Share2, 
  CheckCircle2, 
  Search, 
  PlusCircle, 
  Radio, 
  Sparkles, 
  PhoneCall, 
  Clock, 
  FileText, 
  ArrowRight,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AshaDashboard = ({ setActiveTab }) => {
  const { patients, registerPatient, runAiScreening, addSmartReferral, triggerEmergencyHelp } = useData();
  const { addNotification } = useApp();

  const [activeTabSub, setActiveTabSub] = useState("overview"); // "overview" or "wizard"
  const [wizardStep, setWizardStep] = useState(1);

  // Wizard state
  const [wName, setWName] = useState("Sarita Devi");
  const [wAge, setWAge] = useState("48");
  const [wVillage, setWVillage] = useState("Rampur Sector 2");
  const [wSymptoms, setWSymptoms] = useState("High fever, chills and joint pain for 3 days");
  const [wTemp, setWTemp] = useState("101.2");
  const [wHr, setWHr] = useState("98");
  const [wSpo2, setWSpo2] = useState("95");
  const [wBp, setWBp] = useState("130/85");
  const [wAiResult, setWAiResult] = useState(null);
  const [wReferralCreated, setWReferralCreated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleWizardAiRun = () => {
    const res = runAiScreening(wSymptoms, { temp: wTemp, hr: wHr, spo2: wSpo2, bp: wBp });
    setWAiResult(res);
    setWizardStep(4);
  };

  const handleWizardCreateReferral = () => {
    addSmartReferral({
      patientName: wName,
      facility: "District Hospital – Sehore",
      specialty: "General Medicine",
      risk: wAiResult?.riskLevel || "MODERATE"
    });
    setWReferralCreated(true);
    setWizardStep(7);
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-gradient-to-r from-teal-600/10 via-emerald-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 font-bold text-xs uppercase tracking-wider">
            ASHA / ANM Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Sunita Sharma (ASHA ID: ASHA-402) 👋
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Assigned Village Sector: Rampur Gram Panchayat (128 Registered Households)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveTabSub('wizard'); setWizardStep(1); }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-teal-600/20 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>7-Step Guided Workflow</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD METRICS (Requirement #22) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Patients Registered", val: "128", color: "text-sky-500" },
          { label: "Today's Screenings", val: "24", color: "text-teal-500" },
          { label: "High-Risk Cases", val: "5", color: "text-red-500" },
          { label: "Pending Consultations", val: "8", color: "text-amber-500" },
          { label: "Referrals Issued", val: "12", color: "text-purple-500" },
          { label: "Follow-ups Due", val: "17", color: "text-indigo-500" },
        ].map((m, idx) => (
          <div key={idx} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
            <span className={`text-3xl font-black font-mono ${m.color}`}>{m.val}</span>
            <p className="text-[11px] font-bold text-[var(--text-secondary)]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
        <button
          onClick={() => setActiveTabSub('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTabSub === 'overview'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
          }`}
        >
          Community Health Overview & Patient List
        </button>
        
        <button
          onClick={() => setActiveTabSub('wizard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTabSub === 'wizard'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>7-Step Guided Workflow Wizard</span>
        </button>
      </div>

      {activeTabSub === 'overview' ? (
        
        /* OVERVIEW & SEARCH PATIENTS */
        <div className="space-y-6">
          
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              { label: "Register Patient", icon: PlusCircle, tab: "register" },
              { label: "Capture Vitals", icon: Radio, tab: "iot-vitals" },
              { label: "AI Screening", icon: Sparkles, tab: "ai-screening" },
              { label: "Book Consultation", icon: Calendar, tab: "book-appointment" },
              { label: "Emergency Alert", icon: AlertTriangle, tab: "emergency" },
            ].map((act, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(act.tab)}
                className="p-3.5 rounded-2xl glass-panel border border-[var(--border-color)] hover:border-teal-500 hover-glow text-left flex items-center gap-2.5 transition-all"
              >
                <act.icon className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="font-bold text-xs text-[var(--text-primary)]">{act.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Patient Table */}
          <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="font-extrabold text-base">Registered Village Patients</h3>
              
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search patient or village..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] font-bold uppercase">
                    <th className="py-3 px-3">Patient ID</th>
                    <th className="py-3 px-3">Name & Age</th>
                    <th className="py-3 px-3">Village</th>
                    <th className="py-3 px-3">Symptoms</th>
                    <th className="py-3 px-3">Last Vitals</th>
                    <th className="py-3 px-3">Risk Level</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {filteredPatients.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--bg-hover)] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">{p.id}</td>
                      <td className="py-3 px-3 font-bold">{p.name} ({p.age} yrs, {p.gender})</td>
                      <td className="py-3 px-3 text-[var(--text-secondary)]">{p.village}</td>
                      <td className="py-3 px-3 max-w-xs truncate text-[var(--text-secondary)]">{p.symptoms}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-amber-500 font-bold">
                        {p.lastVitals.temp}°F | {p.lastVitals.spo2}% SpO2
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.riskLevel === 'HIGH' ? 'bg-red-100 text-red-800' :
                          p.riskLevel === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => { setActiveTabSub('wizard'); setWName(p.name); setWAge(p.age); setWizardStep(2); }}
                          className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-[11px] font-bold hover:bg-teal-200"
                        >
                          Start Workflow
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      ) : (

        /* 7-STEP GUIDED WORKFLOW WIZARD (Requirement #23) */
        <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-8 shadow-2xl">
          
          {/* STEPPER HEADER */}
          <div>
            <h2 className="text-xl font-extrabold text-center mb-6">
              ASHA Assisted End-to-End Care Stepper
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {[
                { step: 1, label: "1. Register" },
                { step: 2, label: "2. Symptoms" },
                { step: 3, label: "3. Vitals" },
                { step: 4, label: "4. AI Screen" },
                { step: 5, label: "5. Doctor" },
                { step: 6, label: "6. Referral" },
                { step: 7, label: "7. Follow-up" },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setWizardStep(s.step)}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                    wizardStep === s.step
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                      : wizardStep > s.step
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 1: REGISTER */}
          {wizardStep === 1 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="font-extrabold text-lg">Step 1: Patient Registration</h3>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Patient Name</label>
                <input
                  type="text"
                  value={wName}
                  onChange={(e) => setWName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Village Sector</label>
                <input
                  type="text"
                  value={wVillage}
                  onChange={(e) => setWVillage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-bold"
                />
              </div>
              <button
                onClick={() => setWizardStep(2)}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Capture Symptoms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: SYMPTOMS */}
          {wizardStep === 2 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="font-extrabold text-lg">Step 2: Capture Symptoms</h3>
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Clinical Complaints</label>
                <textarea
                  rows={3}
                  value={wSymptoms}
                  onChange={(e) => setWSymptoms(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium resize-none"
                />
              </div>
              <button
                onClick={() => setWizardStep(3)}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Capture IoT Vitals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: VITALS */}
          {wizardStep === 3 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="font-extrabold text-lg">Step 3: Capture BLE IoT Vitals</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Temp (°F)</label>
                  <input type="text" value={wTemp} onChange={(e) => setWTemp(e.target.value)} className="w-full p-2.5 rounded-xl border bg-[var(--bg-primary)] font-bold text-amber-500" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Heart Rate (BPM)</label>
                  <input type="text" value={wHr} onChange={(e) => setWHr(e.target.value)} className="w-full p-2.5 rounded-xl border bg-[var(--bg-primary)] font-bold text-sky-500" />
                </div>
                <div>
                  <label className="block font-bold mb-1">SpO2 (%)</label>
                  <input type="text" value={wSpo2} onChange={(e) => setWSpo2(e.target.value)} className="w-full p-2.5 rounded-xl border bg-[var(--bg-primary)] font-bold text-emerald-500" />
                </div>
                <div>
                  <label className="block font-bold mb-1">BP (mmHg)</label>
                  <input type="text" value={wBp} onChange={(e) => setWBp(e.target.value)} className="w-full p-2.5 rounded-xl border bg-[var(--bg-primary)] font-bold text-indigo-500" />
                </div>
              </div>
              <button
                onClick={handleWizardAiRun}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run AI Preliminary Screening</span>
              </button>
            </div>
          )}

          {/* STEP 4: AI SCREENING RESULT */}
          {wizardStep === 4 && (
            <div className="space-y-4 max-w-lg mx-auto text-center">
              <h3 className="font-extrabold text-lg">Step 4: AI Risk Assessment Output</h3>
              <div className="p-4 rounded-2xl bg-amber-500 text-white font-extrabold text-2xl tracking-wider shadow-md w-fit mx-auto">
                RISK: {wAiResult?.riskLevel || "MODERATE"}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{wAiResult?.summary}</p>
              <button
                onClick={() => setWizardStep(5)}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Connect Doctor for Teleconsultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 5: CONNECT DOCTOR */}
          {wizardStep === 5 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="font-extrabold text-lg">Step 5: Connect Duty Doctor</h3>
              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs space-y-2">
                <p className="font-bold">Assignee: Dr. Rajesh Kumar (Rampur PHC)</p>
                <p className="text-[var(--text-secondary)]">Token #A024 issued. Sent pre-buffered vitals & AI report.</p>
              </div>
              <button
                onClick={() => setWizardStep(6)}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>Evaluate Smart Referral</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 6: SMART REFERRAL */}
          {wizardStep === 6 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <h3 className="font-extrabold text-lg">Step 6: Smart Referral Routing</h3>
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-xs space-y-1">
                <p className="font-bold text-sky-900 dark:text-sky-200">Facility: District Hospital – Sehore</p>
                <p className="text-sky-700 dark:text-sky-300">Distance: 18 km | Travel Time: 35 mins | Capacity: Available</p>
              </div>
              <button
                onClick={handleWizardCreateReferral}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Issue Smart Referral & Send Patient Context</span>
              </button>
            </div>
          )}

          {/* STEP 7: FOLLOW-UP */}
          {wizardStep === 7 && (
            <div className="space-y-4 max-w-lg mx-auto text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-2xl">7-Step Workflow Completed!</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Patient {wName} has been screened, assigned a doctor token, and referred to District Hospital.
              </p>
              <button
                onClick={() => { setActiveTabSub('overview'); setWizardStep(1); }}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
              >
                Return to ASHA Dashboard
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
