import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const translations = {
  en: {
    appTitle: "RURALCARE AI",
    tagline: "Healthcare Closer to Every Village",
    home: "Home",
    howItWorks: "How It Works",
    features: "Features",
    about: "About",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    getSupport: "Get Healthcare Support",
    workerLogin: "Healthcare Worker Login",
    emergencyHelp: "Emergency Help",
    aiScreening: "AI Screening",
    iotVitals: "IoT Vitals",
    smartReferral: "Smart Referral",
    offlineMode: "Offline Mode",
    onlineSynced: "Online - Synced",
    voiceAssistant: "Voice Assistant",
    syncNow: "Sync Now",
    demoMode: "Demo Mode",
    language: "Language",
    theme: "Theme",
    patient: "Patient",
    asha: "ASHA / ANM",
    doctor: "Doctor",
    phc: "PHC / CHC",
  },
  hi: {
    appTitle: "RURALCARE AI",
    tagline: "हर गांव के पास स्वास्थ्य सेवा",
    home: "मुख्य पृष्ठ",
    howItWorks: "यह कैसे काम करता है",
    features: "विशेषताएं",
    about: "हमारे बारे में",
    login: "लॉगिन",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    getSupport: "स्वास्थ्य सहायता प्राप्त करें",
    workerLogin: "स्वास्थ्य कार्यकर्ता लॉगिन",
    emergencyHelp: "आपातकालीन सहायता",
    aiScreening: "एआई जांच",
    iotVitals: "आईओटी वाइटल्स",
    smartReferral: "स्मार्ट रेफरल",
    offlineMode: "ऑफलाइन मोड",
    onlineSynced: "ऑनलाइन - सिंक किया गया",
    voiceAssistant: "वॉइस असिस्टेंट",
    syncNow: "अभी सिंक करें",
    demoMode: "डेमो मोड",
    language: "भाषा",
    theme: "थीम",
    patient: "मरीज",
    asha: "आशा / एएनएम",
    doctor: "डॉक्टर",
    phc: "प्राथमिक स्वास्थ्य केंद्र",
  },
  ta: {
    appTitle: "RURALCARE AI",
    tagline: "ஒவ்வொரு கிராமத்திற்கும் அருகில் சுகாதார சேவை",
    home: "முகப்பு",
    howItWorks: "செயல்முறை",
    features: "அம்சங்கள்",
    about: "பற்றி",
    login: "உள்நுழை",
    logout: "வெளியேறு",
    dashboard: "டாஷ்போர்டு",
    getSupport: "சுகாதார உதவி பெறுக",
    workerLogin: "சுகாதார ஊழியர் உள்நுழைவு",
    emergencyHelp: "அவசர உதவி",
    aiScreening: "AI பரிசோதனை",
    iotVitals: "IoT உடல் அளவீடுகள்",
    smartReferral: "ஸ்மார்ட் பரிந்துரை",
    offlineMode: "ஆஃப்லைன் பயன்முறை",
    onlineSynced: "ஆன்லைன் - இணைக்கப்பட்டது",
    voiceAssistant: "குரல் உதவி",
    syncNow: "இப்போது ஒத்திசைக்க",
    demoMode: "டெமோ முறை",
    language: "மொழி",
    theme: "தீம்",
    patient: "நோயாளி",
    asha: "ஆஷா / ANM",
    doctor: "மருத்துவர்",
    phc: "PHC / CHC நிலையம்",
  },
  te: {
    appTitle: "RURALCARE AI",
    tagline: "ప్రతి గ్రామానికి దగ్గరగా ఆరోగ్య సంరక్షణ",
    home: "హోమ్",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    features: "ఫీచర్లు",
    about: "గురించి",
    login: "లాగిన్",
    logout: "లాగ్అవుట్",
    dashboard: "డాష్‌బోర్డ్",
    getSupport: "ఆరోగ్య సహాయం పొందండి",
    workerLogin: "ఆరోగ్య కార్యకర్త లాగిన్",
    emergencyHelp: "అత్యవసర సహాయం",
    aiScreening: "AI స్క్రీనింగ్",
    iotVitals: "IoT వైటల్స్",
    smartReferral: "స్మార్ట్ రెఫరల్",
    offlineMode: "ఆఫ్‌లైన్ మోడ్",
    onlineSynced: "ఆన్‌లైన్ - సింక్ అయింది",
    voiceAssistant: "వాయిస్ అసిస్టెంట్",
    syncNow: "ఇప్పుడు సింక్ చేయండి",
    demoMode: "డెమో మోడ్",
    language: "భాష",
    theme: "థీమ్",
    patient: "రోగి",
    asha: "ఆశా / ANM",
    doctor: "డాక్టర్",
    phc: "PHC / CHC",
  },
  ml: {
    appTitle: "RURALCARE AI",
    tagline: "ഓരോ ഗ്രാമത്തിലേക്കും ആരോഗ്യ സംരക്ഷണം",
    home: "ഹോം",
    howItWorks: "പ്രവർത്തനം",
    features: "സവിശേഷതകൾ",
    about: "കുറിച്ച്",
    login: "ലോഗിൻ",
    logout: "ലോഗ്ഔട്ട്",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    getSupport: "ആരോഗ്യ സഹായം നേടുക",
    workerLogin: "ആരോഗ്യ പ്രവർത്തക ലോഗിൻ",
    emergencyHelp: "അടിയന്തിര സഹായം",
    aiScreening: "AI സ്ക്രീനിംഗ്",
    iotVitals: "IoT വൈറ്റലുകൾ",
    smartReferral: "സ്മാർട്ട് റഫറൽ",
    offlineMode: "ഓഫ്‌ലൈൻ മോഡ്",
    onlineSynced: "ഓൺലൈൻ - സിങ്ക് ചെയ്തു",
    voiceAssistant: "വോയ്സ് അസിസ്റ്റന്റ്",
    syncNow: "ഇപ്പോൾ സിങ്ക് ചെയ്യുക",
    demoMode: "ഡെമോ മോഡ്",
    language: "ഭാഷ",
    theme: "തീം",
    patient: "രോഗി",
    asha: "ആശ / ANM",
    doctor: "ഡോക്ടർ",
    phc: "PHC / CHC",
  },
  kn: {
    appTitle: "RURALCARE AI",
    tagline: "ಪ್ರತಿ ಹಳ್ಳಿಗೂ ಹತ್ತಿರದ ಆರೋಗ್ಯ ಸೇವೆ",
    home: "ಮುಖಪುಟ",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    about: "ಕುರಿತು",
    login: "ಲಾಗಿನ್",
    logout: "ಲಾಗ್‌ಔಟ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    getSupport: "ಆರೋಗ್ಯ ಬೆಂಬಲ ಪಡೆಯಿರಿ",
    workerLogin: "ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರ ಲಾಗಿನ್",
    emergencyHelp: "ತುರ್ತು ನೆರವು",
    aiScreening: "AI ಪರೀಕ್ಷೆ",
    iotVitals: "IoT ವೈಟಲ್ಸ್",
    smartReferral: "ಸ್ಮಾರ್ಟ್ ರೆಫರಲ್",
    offlineMode: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    onlineSynced: "ಆನ್‌ಲೈನ್ - ಸಿಂಕ್ ಆಗಿದೆ",
    voiceAssistant: "ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್",
    syncNow: "ಈಗ ಸಿಂಕ್ ಮಾಡಿ",
    demoMode: "ಡೆಮೊ ಮೋಡ್",
    language: "ಭಾಷೆ",
    theme: "ಥೀಮ್",
    patient: "ರೋಗಿ",
    asha: "ಆಶಾ / ANM",
    doctor: "ಡಾಕ್ಟರ್",
    phc: "PHC / CHC",
  }
};

export const AppProvider = ({ children }) => {
  // Theme state with localStorage persistence and system preference check
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ruralcare_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('ruralcare_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Language state
  const [lang, setLang] = useState(() => localStorage.getItem('ruralcare_lang') || 'en');
  const changeLanguage = (code) => {
    setLang(code);
    localStorage.setItem('ruralcare_lang', code);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
  };

  // Role Authentication State: 'guest', 'patient', 'asha', 'doctor', 'phc'
  const [userRole, setUserRole] = useState(() => localStorage.getItem('ruralcare_role') || 'guest');
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ruralcare_user');
    if (saved) return JSON.parse(saved);
    return null;
  });

  const loginAsRole = (role, profileData) => {
    setUserRole(role);
    setUserProfile(profileData);
    localStorage.setItem('ruralcare_role', role);
    localStorage.setItem('ruralcare_user', JSON.stringify(profileData));
  };

  const logout = () => {
    setUserRole('guest');
    setUserProfile(null);
    localStorage.removeItem('ruralcare_role');
    localStorage.removeItem('ruralcare_user');
  };

  // Connection & Offline-First State
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState('Just Now');

  const toggleOnlineMode = () => {
    if (isOnline) {
      setIsOnline(false);
    } else {
      setIsOnline(true);
      performSync();
    }
  };

  const performSync = () => {
    if (pendingSyncCount === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      addNotification({
        title: "Offline Sync Completed",
        message: "All offline patient screening and vital records are now safely synced to the cloud.",
        type: "success",
        time: "Just now"
      });
    }, 1800);
  };

  // Demo Mode Switch
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Voice Assistant Modal State
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Global Notification Center
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Doctor Consultation Confirmed",
      message: "Dr. Rajesh Kumar accepted Token #A024 for Meena Devi.",
      type: "info",
      read: false,
      time: "10 mins ago"
    },
    {
      id: 2,
      title: "Smart Referral Update",
      message: "Referral to District Hospital has been ACCEPTED.",
      type: "success",
      read: false,
      time: "25 mins ago"
    },
    {
      id: 3,
      title: "Morning Medication Reminder",
      message: "Time for Meena Devi's Paracetamol (500mg).",
      type: "warning",
      read: false,
      time: "1 hour ago"
    }
  ]);

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), read: false, ...notif }, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      lang,
      changeLanguage,
      t,
      userRole,
      userProfile,
      loginAsRole,
      logout,
      isOnline,
      toggleOnlineMode,
      pendingSyncCount,
      setPendingSyncCount,
      isSyncing,
      lastSyncedTime,
      performSync,
      isDemoMode,
      setIsDemoMode,
      isVoiceModalOpen,
      setIsVoiceModalOpen,
      notifications,
      addNotification,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
