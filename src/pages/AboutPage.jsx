import React from 'react';
import { Activity, Cpu, Server, Database, Radio, Smartphone, HeartPulse, CheckCircle2, Shield } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-12">
      
      {/* Title & Vision */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
          Smart India Hackathon 2026 Solution
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          About RURALCARE AI
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          RURALCARE AI is a rural-first digital healthcare ecosystem designed to improve accessibility and continuity of public healthcare services in underserved communities.
        </p>

        <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 text-white font-extrabold text-lg sm:text-2xl shadow-xl max-w-3xl mx-auto">
          “No village should be excluded from timely, connected and quality public healthcare.”
        </div>
      </div>

      {/* Connected Ecosystem Flow */}
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
        <h3 className="font-extrabold text-lg text-center">The Connected Healthcare Ecosystem</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[var(--text-primary)]">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200">Patient</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200">ASHA / ANM</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200">AI Engine</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200">Doctor</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200">PHC / CHC</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">District Hospital</span>
        </div>
      </div>

      {/* TECHNOLOGY ARCHITECTURE DIAGRAM (Requirement #45) */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] space-y-8">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-extrabold">System Architecture Stack</h3>
          <p className="text-xs text-[var(--text-secondary)]">Multi-layer technology pipeline for rural resilience.</p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          
          {/* Layer 1: FRONTEND */}
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 space-y-1 text-center">
            <span className="font-extrabold text-xs text-sky-700 dark:text-sky-300 uppercase tracking-widest block">
              📱 FRONTEND LAYER
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              Android App • Web Dashboard • Accessible UI • Multilingual Voice
            </p>
          </div>

          <div className="text-center font-extrabold text-sky-500">↓</div>

          {/* Layer 2: BACKEND */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-800 space-y-1 text-center">
            <span className="font-extrabold text-xs text-teal-700 dark:text-teal-300 uppercase tracking-widest block">
              ⚙️ BACKEND API LAYER
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              FastAPI / Node.js • REST APIs • Role-Based Authentication
            </p>
          </div>

          <div className="text-center font-extrabold text-teal-500">↓</div>

          {/* Layer 3: AI ENGINE */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 space-y-1 text-center">
            <span className="font-extrabold text-xs text-amber-700 dark:text-amber-300 uppercase tracking-widest block">
              🤖 AI SCREENING ENGINE
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              Risk Classification • Symptom NLP • Speech-to-Text • Vital Anomaly Detection
            </p>
          </div>

          <div className="text-center font-extrabold text-amber-500">↓</div>

          {/* Layer 4: DATA */}
          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 space-y-1 text-center">
            <span className="font-extrabold text-xs text-purple-700 dark:text-purple-300 uppercase tracking-widest block">
              💾 DATA & OFFLINE PERSISTENCE
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              PostgreSQL / MySQL • Offline PWA Sync • Cloud Data • Audit Controls
            </p>
          </div>

          <div className="text-center font-extrabold text-purple-500">↓</div>

          {/* Layer 5: IoT */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 space-y-1 text-center">
            <span className="font-extrabold text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-widest block">
              📡 IoT HARDWARE SUITE
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              ESP32 Microcontroller • BLE 5.0 • Temp, HR, SpO2, BP Sensors
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
