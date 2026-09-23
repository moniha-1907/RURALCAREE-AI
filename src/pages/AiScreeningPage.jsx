import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Activity, 
  Mic, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Clock, 
  Stethoscope,
  Heart,
  Thermometer,
  RefreshCw
} from 'lucide-react';

export const AiScreeningPage = ({ setActiveTab }) => {
  const { runAiScreening, latestAiResult, currentVitals } = useData();
  const { setIsVoiceModalOpen } = useApp();

  const [symptoms, setSymptoms] = useState("Fever, severe weakness, and body headache for two days.");
  const [age, setAge] = useState("52");
  const [temp, setTemp] = useState("100.4");
  const [hr, setHr] = useState("92");
  const [spo2, setSpo2] = useState("96");
  const [bp, setBp] = useState("120/80");
  const [duration, setDuration] = useState("2 Days");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(latestAiResult);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = runAiScreening(symptoms, { temp, hr, spo2, bp });
      setAiResult(res);
      setIsAnalyzing(false);
    }, 1200);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'EMERGENCY': return 'bg-red-500 text-white border-red-600';
      case 'HIGH': return 'bg-orange-500 text-white border-orange-600';
      case 'MODERATE': return 'bg-amber-500 text-white border-amber-600';
      default: return 'bg-emerald-500 text-white border-emerald-600';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core AI Differentiator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          AI Preliminary Health Screening
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Intelligent risk classification and vital anomaly triage for rural health workers & patients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT FORM (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-sky-500" />
              <span>Symptom & Vitals Input</span>
            </h3>
            
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Voice Assistant</span>
            </button>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            
            {/* Symptoms Input */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
                Reported Symptoms
              </label>
              <textarea
                rows={3}
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe your symptoms or speak using voice..."
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Symptom Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium outline-none"
                >
                  <option value="1 Day">1 Day</option>
                  <option value="2 Days">2 Days</option>
                  <option value="3-5 Days">3-5 Days</option>
                  <option value="Over 1 Week">Over 1 Week</option>
                </select>
              </div>
            </div>

            {/* IoT Vitals Auto-Fill Section */}
            <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900 dark:text-sky-200">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>Captured IoT Sensor Vitals</span>
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Synced from BLE ESP32</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">Temp (°F)</span>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full text-center py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] font-bold text-amber-500"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">Heart Rate</span>
                  <input
                    type="text"
                    value={hr}
                    onChange={(e) => setHr(e.target.value)}
                    className="w-full text-center py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] font-bold text-sky-500"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">SpO₂ (%)</span>
                  <input
                    type="text"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full text-center py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] font-bold text-emerald-500"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">BP (mmHg)</span>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full text-center py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] font-bold text-indigo-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Running AI Screening Algorithms...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Symptoms & Calculate Risk</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* RESULTS CARD (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-2xl relative">
            
            <h3 className="font-bold text-base border-b border-[var(--border-color)] pb-3 flex items-center justify-between">
              <span>AI Assessment Output</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">Model v2.4</span>
            </h3>

            {/* Risk Badge */}
            <div className="text-center space-y-2 py-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                AI Risk Classification
              </span>
              <div className={`px-6 py-3 rounded-2xl font-black text-2xl tracking-wider shadow-lg mx-auto w-fit border ${getRiskColor(aiResult?.riskLevel)}`}>
                {aiResult?.riskLevel || "MODERATE"}
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)]">Clinical Severity Score: {aiResult?.score || 60}/100</p>
            </div>

            {/* Reasoning Summary */}
            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2 text-xs">
              <h4 className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[10px]">
                Reasoning Summary
              </h4>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {aiResult?.summary}
              </p>
            </div>

            {/* Recommended Next Step */}
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 space-y-2 text-xs">
              <h4 className="font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wider text-[10px]">
                Recommended Next Step
              </h4>
              <p className="font-semibold text-sky-800 dark:text-sky-300">
                {aiResult?.recommendation}
              </p>
            </div>

            {/* Quick Actions based on Risk */}
            <div className="space-y-2 pt-2">
              {aiResult?.riskLevel === 'EMERGENCY' ? (
                <button
                  onClick={() => setActiveTab('emergency')}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg pulse-emergency flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Trigger Immediate Emergency Help</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('book-appointment')}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Book Doctor Consultation Token</span>
                </button>
              )}
            </div>

            {/* MANDATORY CLINICAL DISCLAIMER (Requirement #20) */}
            <div className="pt-4 border-t border-[var(--border-color)]">
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed italic border-l-2 border-amber-500 pl-2">
                <strong>Important Disclaimer:</strong> AI supports healthcare professionals. It does not replace a qualified doctor or provide autonomous diagnosis.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
