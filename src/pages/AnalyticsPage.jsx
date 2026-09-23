import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, Users, Building2, Share2, Activity, HeartPulse } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

export const AnalyticsPage = () => {
  const { theme } = useApp();

  const consultationData = [
    { day: "Mon", consultations: 124, referrals: 18 },
    { day: "Tue", consultations: 142, referrals: 22 },
    { day: "Wed", consultations: 168, referrals: 29 },
    { day: "Thu", consultations: 155, referrals: 21 },
    { day: "Fri", consultations: 189, referrals: 34 },
    { day: "Sat", consultations: 114, referrals: 15 },
  ];

  const riskPieData = [
    { name: "Low Risk", value: 520, color: "#10b981" },
    { name: "Moderate Risk", value: 260, color: "#f59e0b" },
    { name: "High Risk", value: 85, color: "#f97316" },
    { name: "Emergency", value: 27, color: "#ef4444" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
            Hackathon Judge Demonstration
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">
            Healthcare Analytics Dashboard
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Aggregated population health trends across connected Gram Panchayats.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs border border-amber-300">
          Prototype / Demo Data
        </span>
      </div>

      {/* TOP METRICS GRID (Requirement #36) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Patients Served", val: "1,248", color: "text-sky-500" },
          { label: "Villages Connected", val: "34", color: "text-teal-500" },
          { label: "Consultations", val: "892", color: "text-blue-500" },
          { label: "Referrals Issued", val: "142", color: "text-purple-500" },
          { label: "Follow-up Rate", val: "94%", color: "text-emerald-500" },
          { label: "Emergency Cases", val: "27", color: "text-red-500" },
        ].map((m, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)] text-center space-y-1">
            <span className={`text-2xl sm:text-3xl font-black font-mono ${m.color}`}>{m.val}</span>
            <p className="text-[11px] font-bold text-[var(--text-secondary)]">{m.label}</p>
          </div>
        ))}
      </div>

      {/* CHARTS GRID (Requirement #36) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Daily Consultations Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4">
          <h3 className="font-extrabold text-base flex items-center justify-between">
            <span>Daily Consultations & Referrals Trend</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">Past 7 Days</span>
          </h3>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consultationData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="day" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    borderColor: theme === 'dark' ? '#334155' : '#cbd5e1',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="consultations" fill="#0284c7" name="Consultations" radius={[6, 6, 0, 0]} />
                <Bar dataKey="referrals" fill="#a855f7" name="Referrals" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Breakdown Pie Chart (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4">
          <h3 className="font-extrabold text-base">AI Risk Category Distribution</h3>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
