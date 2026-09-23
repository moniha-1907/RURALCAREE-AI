import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Stethoscope, 
  HeartPulse, 
  Building2, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Shield
} from 'lucide-react';

export const LoginPage = ({ setActiveTab }) => {
  const { loginAsRole, isDemoMode } = useApp();
  const [selectedRole, setSelectedRole] = useState(null); // 'patient', 'asha', 'doctor', 'phc'

  // Form states
  const [idInput, setIdInput] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    let profileData = {};
    if (selectedRole === 'patient') {
      profileData = { id: idInput || "PAT-1001", name: "Meena Devi", role: "Patient", village: "Rampur" };
      loginAsRole('patient', profileData);
      setActiveTab('patient-dashboard');
    } else if (selectedRole === 'asha') {
      profileData = { id: idInput || "ASHA-402", name: "Sunita Sharma", role: "ASHA Worker", village: "Rampur Sector" };
      loginAsRole('asha', profileData);
      setActiveTab('asha-dashboard');
    } else if (selectedRole === 'doctor') {
      profileData = { id: idInput || "DOC-809", name: "Dr. Rajesh Kumar", role: "Medical Officer", facility: "Rampur PHC" };
      loginAsRole('doctor', profileData);
      setActiveTab('doctor-dashboard');
    } else if (selectedRole === 'phc') {
      profileData = { id: idInput || "PHC-RAMPUR", name: "Rampur PHC Admin", role: "Facility Manager" };
      loginAsRole('phc', profileData);
      setActiveTab('phc-dashboard');
    }
  };

  const quickDemoLogin = (role) => {
    let profileData = {};
    if (role === 'patient') {
      profileData = { id: "PAT-1001", name: "Meena Devi", role: "Patient", village: "Rampur" };
      loginAsRole('patient', profileData);
      setActiveTab('patient-dashboard');
    } else if (role === 'asha') {
      profileData = { id: "ASHA-402", name: "Sunita Sharma", role: "ASHA Worker", village: "Rampur Sector" };
      loginAsRole('asha', profileData);
      setActiveTab('asha-dashboard');
    } else if (role === 'doctor') {
      profileData = { id: "DOC-809", name: "Dr. Rajesh Kumar", role: "Medical Officer", facility: "Rampur PHC" };
      loginAsRole('doctor', profileData);
      setActiveTab('doctor-dashboard');
    } else if (role === 'phc') {
      profileData = { id: "PHC-RAMPUR", name: "Rampur PHC Admin", role: "Facility Manager" };
      loginAsRole('phc', profileData);
      setActiveTab('phc-dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-10">
        <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
          Role-Based Access
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          RURALCARE AI LOGIN
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Select your role to access personalized healthcare services & dashboards.
        </p>
      </div>

      {!selectedRole ? (
        
        /* ROLE SELECTION INTERFACE (Requirement #9) */
        <div className="space-y-6">
          <div className="text-center font-bold text-sm text-[var(--text-muted)] uppercase tracking-wider">
            Choose Your Role
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Patient */}
            <div 
              onClick={() => { setSelectedRole('patient'); setIdInput("9876543210"); }}
              className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] hover:border-sky-500 hover-glow cursor-pointer transition-all space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)]">👤 Patient</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Access healthcare services, book consultations, track digital queue tokens, and view health records.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                  Login as Patient <ArrowRight className="w-4 h-4" />
                </span>
                {isDemoMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); quickDemoLogin('patient'); }}
                    className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-[10px] font-bold hover:bg-sky-200"
                  >
                    ⚡ Demo 1-Click
                  </button>
                )}
              </div>
            </div>

            {/* Card 2: ASHA / ANM */}
            <div 
              onClick={() => { setSelectedRole('asha'); setIdInput("ASHA-402"); }}
              className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] hover:border-teal-500 hover-glow cursor-pointer transition-all space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)]">🧑‍⚕️ ASHA / ANM Worker</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Register rural villagers, capture Bluetooth IoT vitals, and conduct guided AI preliminary screenings.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                  Login as ASHA / ANM <ArrowRight className="w-4 h-4" />
                </span>
                {isDemoMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); quickDemoLogin('asha'); }}
                    className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-[10px] font-bold hover:bg-teal-200"
                  >
                    ⚡ Demo 1-Click
                  </button>
                )}
              </div>
            </div>

            {/* Card 3: Doctor */}
            <div 
              onClick={() => { setSelectedRole('doctor'); setIdInput("DOC-809"); }}
              className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] hover:border-blue-500 hover-glow cursor-pointer transition-all space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)]">👨‍⚕️ Doctor</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Review queue, inspect AI preliminary risk assessments, issue e-prescriptions, and trigger smart referrals.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  Login as Doctor <ArrowRight className="w-4 h-4" />
                </span>
                {isDemoMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); quickDemoLogin('doctor'); }}
                    className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] font-bold hover:bg-blue-200"
                  >
                    ⚡ Demo 1-Click
                  </button>
                )}
              </div>
            </div>

            {/* Card 4: PHC / CHC */}
            <div 
              onClick={() => { setSelectedRole('phc'); setIdInput("PHC-RAMPUR"); }}
              className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] hover:border-purple-500 hover-glow cursor-pointer transition-all space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)]">🏥 PHC / CHC Facility</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Manage facility queue tokens, doctor schedules, incoming smart referrals, and emergency beds.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  Login as PHC / CHC <ArrowRight className="w-4 h-4" />
                </span>
                {isDemoMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); quickDemoLogin('phc'); }}
                    className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-[10px] font-bold hover:bg-purple-200"
                  >
                    ⚡ Demo 1-Click
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      ) : (

        /* DEDICATED LOGIN FORM FOR SELECTED ROLE */
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg capitalize text-sky-600 dark:text-sky-400">
                {selectedRole === 'patient' && '👤 Patient Login'}
                {selectedRole === 'asha' && '🧑‍⚕️ ASHA / ANM Login'}
                {selectedRole === 'doctor' && '👨‍⚕️ Doctor Login'}
                {selectedRole === 'phc' && '🏥 PHC / CHC Login'}
              </span>
            </div>
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs text-[var(--text-muted)] hover:underline"
            >
              Change Role
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Field 1: ID / Mobile */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                {selectedRole === 'patient' && 'Mobile Number / Patient ID'}
                {selectedRole === 'asha' && 'ASHA Worker ID'}
                {selectedRole === 'doctor' && 'Doctor ID / License Email'}
                {selectedRole === 'phc' && 'Facility ID / Code'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={idInput}
                  onChange={(e) => setIdInput(e.target.value)}
                  placeholder={
                    selectedRole === 'patient' ? "e.g. 9876543210" :
                    selectedRole === 'asha' ? "e.g. ASHA-402" :
                    selectedRole === 'doctor' ? "e.g. DOC-809" : "e.g. PHC-RAMPUR"
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password || "demo1234"}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Remember Me</span>
              </label>
              <button type="button" className="text-sky-600 dark:text-sky-400 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Login & Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* New Patient Registration link */}
          {selectedRole === 'patient' && (
            <div className="pt-4 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-secondary)]">
              New Patient?{' '}
              <button
                onClick={() => setActiveTab('register')}
                className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Register Here
              </button>
            </div>
          )}

          {/* Quick Demo Fill button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => quickDemoLogin(selectedRole)}
              className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-200"
            >
              ⚡ Instant Demo Auto-Login
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
