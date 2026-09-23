import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  Sun, 
  Moon, 
  Globe, 
  Mic, 
  Bell, 
  Wifi, 
  WifiOff, 
  User, 
  LogOut, 
  ShieldAlert, 
  Menu, 
  X,
  Sparkles,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { 
    theme, 
    toggleTheme, 
    lang, 
    changeLanguage, 
    t, 
    userRole, 
    userProfile, 
    logout, 
    isOnline, 
    toggleOnlineMode, 
    isSyncing, 
    pendingSyncCount,
    performSync,
    isDemoMode, 
    setIsDemoMode,
    setIsVoiceModalOpen,
    notifications,
    markAllAsRead,
    clearNotifications
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  const handleRoleNav = () => {
    if (userRole === 'patient') setActiveTab('patient-dashboard');
    else if (userRole === 'asha') setActiveTab('asha-dashboard');
    else if (userRole === 'doctor') setActiveTab('doctor-dashboard');
    else if (userRole === 'phc') setActiveTab('phc-dashboard');
    else setActiveTab('login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-secondary)]/90 border-b border-[var(--border-color)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 dark:from-sky-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  RURALCARE AI
                </span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-full">
                    SIH Demo
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-[var(--text-secondary)] hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-[var(--text-secondary)]">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'home' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {t('home')}
            </button>
            
            <button
              onClick={() => setActiveTab('ai-screening')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'ai-screening' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              {t('aiScreening')}
            </button>

            <button
              onClick={() => setActiveTab('iot-vitals')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'iot-vitals' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {t('iotVitals')}
            </button>

            <button
              onClick={() => setActiveTab('smart-referral')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'smart-referral' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {t('smartReferral')}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              Analytics
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                activeTab === 'about' 
                  ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 font-semibold' 
                  : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {t('about')}
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">

            {/* Offline/Online Status Toggle */}
            <button
              onClick={toggleOnlineMode}
              title={isOnline ? "Online Mode - Click to simulate offline" : "Offline Mode - Click to reconnect & sync"}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isOnline
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 animate-pulse'
              }`}
            >
              {isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span className="hidden sm:inline">{t('onlineSynced')}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t('offlineMode')}</span>
                  {pendingSyncCount > 0 && (
                    <span className="px-1.5 py-0.2 bg-amber-200 dark:bg-amber-900 rounded-full text-[10px]">
                      {pendingSyncCount}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Sync Now Action if syncing */}
            {isSyncing && (
              <span className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 animate-spin">
                <RefreshCw className="w-4 h-4" />
              </span>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-1 text-xs font-semibold"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="uppercase">{lang}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl glass-panel p-1.5 shadow-xl border border-[var(--border-color)] z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 py-1">
                    Select Language
                  </div>
                  {languages.map(item => (
                    <button
                      key={item.code}
                      onClick={() => {
                        changeLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        lang === item.code 
                          ? 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 font-bold' 
                          : 'hover:bg-[var(--bg-hover)] text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {lang === item.code && <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant Trigger Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="p-2 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/50 transition-colors relative group"
              title="Speak. Don't Type. (Voice Assistant)"
            >
              <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>

            {/* Notification Center Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-2xl border border-[var(--border-color)] z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-sky-500" />
                      <h4 className="font-bold text-sm">Notifications</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <button 
                        onClick={markAllAsRead} 
                        className="text-sky-600 dark:text-sky-400 hover:underline text-[11px]"
                      >
                        Mark read
                      </button>
                      <button 
                        onClick={clearNotifications} 
                        className="text-[var(--text-muted)] hover:underline text-[11px]"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[var(--text-muted)] text-center py-4">No notifications right now</p>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id}
                          className={`p-2.5 rounded-xl border text-xs transition-colors ${
                            n.read 
                              ? 'bg-transparent border-transparent text-[var(--text-secondary)]' 
                              : 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/60 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between font-semibold text-sky-900 dark:text-sky-200">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-[var(--text-muted)] font-normal">{n.time}</span>
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-[var(--text-secondary)]">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-indigo-600" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {/* Auth Login / Role Dashboard Button */}
            {userRole === 'guest' ? (
              <button
                onClick={() => setActiveTab('login')}
                className="ml-1 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:shadow-sky-600/30 transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>{t('login')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <button
                  onClick={handleRoleNav}
                  className="px-3 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-900/60 border border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 font-bold text-xs flex items-center gap-1.5 hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="capitalize">{userRole}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setActiveTab('home');
                  }}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
          >
            {t('home')}
          </button>
          <button
            onClick={() => { setActiveTab('ai-screening'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t('aiScreening')}
          </button>
          <button
            onClick={() => { setActiveTab('iot-vitals'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
          >
            {t('iotVitals')}
          </button>
          <button
            onClick={() => { setActiveTab('smart-referral'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
          >
            {t('smartReferral')}
          </button>
          <button
            onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
          >
            Analytics
          </button>
          <button
            onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-hover)]"
          >
            {t('about')}
          </button>
        </div>
      )}
    </header>
  );
};
