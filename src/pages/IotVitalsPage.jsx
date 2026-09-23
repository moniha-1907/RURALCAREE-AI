import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { 
  Radio, 
  Activity, 
  Heart, 
  Thermometer, 
  RefreshCw, 
  Send, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Wifi,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const IotVitalsPage = ({ setActiveTab }) => {
  const { currentVitals, setCurrentVitals, vitalsHistory } = useData();
  const { theme, addNotification } = useApp();
  
  const [isConnected, setIsConnected] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const refreshSensorValues = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight variation in sensors
      const newTemp = (100.0 + (Math.random() * 0.8 - 0.4)).toFixed(1);
      const newHr = Math.floor(90 + (Math.random() * 6 - 3));
      const newSpo2 = Math.floor(95 + (Math.random() * 3));
      
      setCurrentVitals(prev => ({
        ...prev,
        temp: parseFloat(newTemp),
        hr: newHr,
        spo2: newSpo2,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      }));
      setIsRefreshing(false);
    }, 900);
  };

  const handleSave = () => {
    setSaveStatus("Saved locally to patient record ✓");
    addNotification({
      title: "Vitals Saved",
      message: `Vitals recorded: Temp ${currentVitals.temp}°F, HR ${currentVitals.hr} BPM, SpO2 ${currentVitals.spo2}%.`,
      type: "success",
      time: "Just now"
    });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSendToDoctor = () => {
    setSaveStatus("Sent directly to Dr. Rajesh Kumar queue ✓");
    addNotification({
      title: "Vitals Sent to Doctor",
      message: "Current IoT sensor payload sent to duty medical officer.",
      type: "info",
      time: "Just now"
    });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5" />
          <span>Core Hardware Differentiator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Connected IoT Vitals Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
          Simulated ESP32 & Bluetooth Low Energy (BLE) portable diagnostic suite.
        </p>
      </div>

      {/* Device Connection Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold ${
            isConnected ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-red-500'
          }`}>
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base">ESP32-Healthcare-Kit #BLE-4092</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? 'Connected via BLE 5.0' : 'Disconnected'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Sensors: MAX30102 (SpO2/HR), DS18B20 (Temp), NIBP BP Cuff • Last update: {currentVitals.lastUpdated}
            </p>
          </div>
        </div>

        <button
          onClick={toggleConnection}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            isConnected
              ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300'
              : 'bg-emerald-600 text-white shadow-md'
          }`}
        >
          {isConnected ? 'Disconnect Device' : 'Connect Device'}
        </button>
      </div>

      {/* 4 VITALS CARDS GRID (Requirement #21) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Temp Card */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Temperature</span>
            <Thermometer className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-amber-500 font-mono">{currentVitals.temp}</span>
            <span className="text-sm font-bold text-[var(--text-muted)]">°F</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium">Elevated body temp (Mild Fever)</p>
        </div>

        {/* HR Card */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Heart Rate</span>
            <Heart className="w-5 h-5 text-sky-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-sky-500 font-mono">{currentVitals.hr}</span>
            <span className="text-sm font-bold text-[var(--text-muted)]">BPM</span>
          </div>
          <p className="text-[11px] text-sky-600 font-medium">Slight tachycardia during fever</p>
        </div>

        {/* SpO2 Card */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">SpO₂ Oxygen</span>
            <Activity className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-emerald-500 font-mono">{currentVitals.spo2}</span>
            <span className="text-sm font-bold text-[var(--text-muted)]">%</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">Normal blood oxygen saturation</p>
        </div>

        {/* BP Card */}
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">Blood Pressure</span>
            <Activity className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-indigo-500 font-mono">{currentVitals.bpSys}/{currentVitals.bpDia}</span>
            <span className="text-xs font-bold text-[var(--text-muted)]">mmHg</span>
          </div>
          <p className="text-[11px] text-indigo-600 font-medium">Optimal normotensive pressure</p>
        </div>

      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <button
            onClick={refreshSensorValues}
            disabled={isRefreshing || !isConnected}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Reading</span>
          </button>

          <button
            onClick={handleSave}
            disabled={!isConnected}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Reading</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSendToDoctor}
            disabled={!isConnected}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send to Doctor</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-screening')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Use in AI Screening</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold text-center animate-fade-in">
          {saveStatus}
        </div>
      )}

      {/* LIVE VITAL TREND CHART (Requirement #21) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold">Real-Time Vitals Trend Graph</h3>
            <p className="text-xs text-[var(--text-secondary)]">Simulated BLE sensor telemetry over time.</p>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">Sampling Rate: 1 Hz</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="time" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} />
              <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} fontSize={12} domain={[70, 130]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  borderColor: theme === 'dark' ? '#334155' : '#cbd5e1',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              />
              <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} name="Temp (°F)" />
              <Line type="monotone" dataKey="hr" stroke="#0284c7" strokeWidth={3} name="Heart Rate (BPM)" />
              <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={3} name="SpO2 (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
