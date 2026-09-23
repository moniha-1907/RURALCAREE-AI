import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Radio, Cpu, Layers } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] transition-colors duration-200 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 dark:from-sky-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                RURALCARE AI
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              AI + IoT + Telemedicine + Offline Care
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              “Timely healthcare closer to every village.” Built for Smart India Hackathon 2026.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-sky-500 transition-colors">
                  Home Landing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-sky-500 transition-colors">
                  Patient Login
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-sky-500 transition-colors">
                  ASHA / ANM Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-sky-500 transition-colors">
                  Doctor Consultation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-sky-500 transition-colors">
                  PHC / CHC Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Features */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
              Key Features
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[var(--text-secondary)]">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-500" />
                <button onClick={() => setActiveTab('ai-screening')} className="hover:text-sky-500">
                  AI Preliminary Screening
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-500" />
                <button onClick={() => setActiveTab('iot-vitals')} className="hover:text-sky-500">
                  IoT ESP32 Vitals Monitor
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-500" />
                <button onClick={() => setActiveTab('smart-referral')} className="hover:text-sky-500">
                  Smart Referral Routing
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-red-500" />
                <button onClick={() => setActiveTab('emergency')} className="hover:text-sky-500">
                  Emergency Dispatch Alert
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Disclaimer & Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Privacy & Disclaimer
            </h4>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed border-l-2 border-amber-500 pl-2.5">
              “RURALCARE AI is a prototype healthcare decision-support platform. AI outputs are preliminary and must be reviewed by qualified healthcare professionals.”
            </p>
            <div className="pt-2 text-[10px] text-[var(--text-muted)] font-mono">
              SIH 2026 Problem Statement Alignment • Demo Mode Active
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)]">
          <p>© 2026 RURALCARE AI. Designed for Smart India Hackathon 2026.</p>
          <p className="mt-2 sm:mt-0 font-medium">Healthcare Closer to Every Village ❤️</p>
        </div>
      </div>
    </footer>
  );
};
