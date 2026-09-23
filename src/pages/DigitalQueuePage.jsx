import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Ticket, RefreshCw, Clock, Users, ArrowRight, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';

export const DigitalQueuePage = ({ setActiveTab }) => {
  const { queue } = useData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const myToken = queue.find(q => q.token === "A024") || queue[1];
  const currentServingToken = queue.find(q => q.status === "In Consultation")?.token || "A012";

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
          Live Digital Token System
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Real-Time OPD Digital Queue
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Monitored live at Rampur Primary Health Center (PHC).
        </p>
      </div>

      {/* Main Queue Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Your Token */}
        <div className="glass-panel p-6 rounded-3xl border-2 border-sky-500 bg-sky-500/10 text-center space-y-2 shadow-lg">
          <span className="text-xs font-extrabold uppercase text-sky-700 dark:text-sky-300">Your Token</span>
          <h2 className="text-4xl font-black text-sky-600 dark:text-sky-400 font-mono tracking-wider">
            {myToken?.token || "A024"}
          </h2>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            Status: {myToken?.status || "Waiting"}
          </span>
        </div>

        {/* Current Token Serving */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] text-center space-y-2">
          <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Current Token</span>
          <h2 className="text-4xl font-extrabold text-emerald-500 font-mono tracking-wider">
            {currentServingToken}
          </h2>
          <span className="inline-block text-[10px] text-emerald-600 font-bold">
            In Doctor Consultation
          </span>
        </div>

        {/* Patients Ahead */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] text-center space-y-2">
          <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Patients Ahead</span>
          <h2 className="text-4xl font-extrabold text-[var(--text-primary)] font-mono">
            12
          </h2>
          <span className="inline-block text-[10px] text-[var(--text-muted)]">
            Patients in line
          </span>
        </div>

        {/* Estimated Wait */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] text-center space-y-2">
          <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Estimated Wait</span>
          <h2 className="text-4xl font-extrabold text-amber-500 font-mono">
            35 min
          </h2>
          <span className="inline-block text-[10px] text-[var(--text-muted)]">
            ~ 3 mins per patient
          </span>
        </div>

      </div>

      {/* Progress Bar & Status Visualizer */}
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Queue Progress Tracker</h3>
            <p className="text-xs text-[var(--text-secondary)]">Token #A012 → Token #A024</p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-hover)] text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
            <span>Refresh Queue</span>
          </button>
        </div>

        {/* Live Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-500">A012 (In Doctor Room)</span>
            <span className="text-amber-500">A018 (Next Group)</span>
            <span className="text-sky-500">A024 (Your Token)</span>
          </div>
          <div className="w-full h-4 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-sky-500 rounded-full w-[45%] transition-all duration-500" />
          </div>
        </div>

        {/* Patient Live List Table */}
        <div className="pt-4 border-t border-[var(--border-color)]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
            Current OPD Queue Snapshot
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] font-bold uppercase">
                  <th className="py-2.5 px-3">Token</th>
                  <th className="py-2.5 px-3">Patient Name</th>
                  <th className="py-2.5 px-3">Village</th>
                  <th className="py-2.5 px-3">Risk Level</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {queue.map((q) => {
                  const isMine = q.token === "A024";
                  return (
                    <tr 
                      key={q.token}
                      className={isMine ? "bg-sky-500/10 font-bold" : ""}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                        #{q.token} {isMine && "(YOU)"}
                      </td>
                      <td className="py-3 px-3">{q.patientName}</td>
                      <td className="py-3 px-3 text-[var(--text-secondary)]">{q.village}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.risk === 'HIGH' ? 'bg-red-100 text-red-800' :
                          q.risk === 'MODERATE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {q.risk}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'In Consultation' ? 'bg-emerald-500 text-white' : 'bg-sky-100 text-sky-800'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
