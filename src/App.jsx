import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { AshaDashboard } from './pages/AshaDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { PhcDashboard } from './pages/PhcDashboard';
import { AiScreeningPage } from './pages/AiScreeningPage';
import { IotVitalsPage } from './pages/IotVitalsPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { DigitalQueuePage } from './pages/DigitalQueuePage';
import { SmartReferralPage } from './pages/SmartReferralPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { MedicineRemindersPage } from './pages/MedicineRemindersPage';
import { HealthRecordPage } from './pages/HealthRecordPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AboutPage } from './pages/AboutPage';

import { Sparkles, Users, Stethoscope, HeartPulse, Building2, PlayCircle, ShieldCheck } from 'lucide-react';

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [symptomInput, setSymptomInput] = useState("");
  const { userRole, isDemoMode, setIsDemoMode } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterPage setActiveTab={setActiveTab} />;
      case 'patient-dashboard':
        return <PatientDashboard setActiveTab={setActiveTab} />;
      case 'asha-dashboard':
        return <AshaDashboard setActiveTab={setActiveTab} />;
      case 'doctor-dashboard':
        return <DoctorDashboard setActiveTab={setActiveTab} />;
      case 'phc-dashboard':
        return <PhcDashboard setActiveTab={setActiveTab} />;
      case 'ai-screening':
        return <AiScreeningPage setActiveTab={setActiveTab} />;
      case 'iot-vitals':
        return <IotVitalsPage setActiveTab={setActiveTab} />;
      case 'book-appointment':
        return <BookAppointmentPage setActiveTab={setActiveTab} />;
      case 'digital-queue':
        return <DigitalQueuePage setActiveTab={setActiveTab} />;
      case 'smart-referral':
        return <SmartReferralPage setActiveTab={setActiveTab} />;
      case 'emergency':
        return <EmergencyPage setActiveTab={setActiveTab} />;
      case 'medicine-reminders':
        return <MedicineRemindersPage setActiveTab={setActiveTab} />;
      case 'health-record':
        return <HealthRecordPage setActiveTab={setActiveTab} />;
      case 'analytics':
        return <AnalyticsPage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200 bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal setActiveTab={setActiveTab} setSymptomInput={setSymptomInput} />

      {/* FLOATING JUDGE DEMO QUICK NAVIGATOR BAR */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-full px-4">
        <div className="glass-panel px-4 py-2.5 rounded-full border border-sky-400/40 shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs font-bold bg-[var(--bg-secondary)]/90">
          
          <div className="flex items-center gap-1.5 pr-2 border-r border-[var(--border-color)]">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="hidden sm:inline font-mono uppercase text-[10px] text-[var(--text-muted)]">Judge Quick-Nav</span>
          </div>

          <button
            onClick={() => setActiveTab('patient-dashboard')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
              activeTab === 'patient-dashboard' ? 'bg-sky-500 text-white' : 'hover:bg-[var(--bg-hover)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Patient</span>
          </button>

          <button
            onClick={() => setActiveTab('asha-dashboard')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
              activeTab === 'asha-dashboard' ? 'bg-teal-500 text-white' : 'hover:bg-[var(--bg-hover)]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span className="hidden md:inline">ASHA</span>
          </button>

          <button
            onClick={() => setActiveTab('doctor-dashboard')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
              activeTab === 'doctor-dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-[var(--bg-hover)]'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Doctor</span>
          </button>

          <button
            onClick={() => setActiveTab('phc-dashboard')}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${
              activeTab === 'phc-dashboard' ? 'bg-purple-500 text-white' : 'hover:bg-[var(--bg-hover)]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">PHC</span>
          </button>

          <div className="pl-2 border-l border-[var(--border-color)] flex items-center gap-1">
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold transition-all ${
                isDemoMode ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              Demo: {isDemoMode ? 'ON' : 'OFF'}
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DataProvider>
        <MainAppContent />
      </DataProvider>
    </AppProvider>
  );
}
