import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, Globe, Shield, ArrowRight, CheckCircle2, Stethoscope } from 'lucide-react';

export const RegisterPage = ({ setActiveTab }) => {
  const { registerPatient } = useData();
  const { loginAsRole } = useApp();

  const [formData, setFormData] = useState({
    name: "Meena Devi",
    age: "52",
    gender: "Female",
    mobile: "+91 98765 43210",
    village: "Rampur (Village A)",
    district: "Sehore",
    preferredLang: "Tamil",
    emergencyContact: "+91 98765 00000",
    password: "password123",
    isAshaAssisted: false
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPat = registerPatient(formData);
    setIsSuccess(true);
    setTimeout(() => {
      loginAsRole('patient', { id: newPat.id, name: newPat.name, village: newPat.village });
      setActiveTab('patient-dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b border-[var(--border-color)] pb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
            Rural Patient Onboarding
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Patient Registration</h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Create a universal digital health profile for connected rural care.
          </p>
        </div>

        {/* Assisted Registration Toggle */}
        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-sky-900 dark:text-sky-200">Assisted Registration by ASHA / ANM</h4>
              <p className="text-[11px] text-sky-700 dark:text-sky-300">Frontline worker assisted onboarding for villagers without smartphones.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.isAshaAssisted}
            onChange={(e) => setFormData({ ...formData, isAshaAssisted: e.target.checked })}
            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 cursor-pointer"
          />
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold">Patient Account Created!</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Redirecting to Patient Dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Age</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Village Name</label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">District</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Preferred Language</label>
                <select
                  value={formData.preferredLang}
                  onChange={(e) => setFormData({ ...formData, preferredLang: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Emergency Contact</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Create Patient Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
