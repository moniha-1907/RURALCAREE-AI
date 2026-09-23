import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, X, Sparkles, Volume2, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export const VoiceAssistantModal = ({ setActiveTab, setSymptomInput }) => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, lang, changeLanguage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [selectedVoiceLang, setSelectedVoiceLang] = useState(lang || 'en');

  if (!isVoiceModalOpen) return null;

  const sampleVoicePhrases = {
    en: "I have fever, severe headache, and weakness for two days.",
    hi: "मुझे दो दिनों से बुखार, सिरदर्द और बहुत कमजोरी महसूस हो रही है।",
    ta: "எனக்கு இரண்டு நாட்களாக காய்ச்சல், தலைவலி மற்றும் உடல் பலவீனம் உள்ளது.",
    te: "నాకు రెండు రోజులుగా జ్వరం, తలనొప్పి మరియు నీరసంగా ఉంది.",
    ml: "എനിക്ക് രണ്ടു ദിവസമായി പനിയും തലവേദനയും ക്ഷീണവും ഉണ്ട്.",
    kn: "ನನಗೆ ಎರಡು ದಿನಗಳಿಂದ ಜ್ವರ, ತಲೆನೋವು ಮತ್ತು ಅತಿಯಾದ ಸುಸ್ತು ಇದೆ."
  };

  const startVoiceSim = () => {
    setIsListening(true);
    setRecognizedText("");
    setTimeout(() => {
      setRecognizedText(sampleVoicePhrases[selectedVoiceLang] || sampleVoicePhrases.en);
      setIsListening(false);
    }, 2200);
  };

  const handleUseForScreening = () => {
    if (setSymptomInput) {
      setSymptomInput(recognizedText || sampleVoicePhrases[selectedVoiceLang]);
    }
    setIsVoiceModalOpen(false);
    setActiveTab('ai-screening');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 relative shadow-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVoiceModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold text-xs">
            <Mic className="w-3.5 h-3.5" />
            <span>Accessible Voice Interface</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Speak. Don't Type.
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Designed for elderly and low-literacy users in rural communities.
          </p>
        </div>

        {/* Language Selector */}
        <div className="mt-6">
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider text-center mb-2">
            Select Speaking Language
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'ta', label: 'தமிழ்' },
              { code: 'te', label: 'తెలుగు' },
              { code: 'ml', label: 'മലയാളം' },
              { code: 'kn', label: 'ಕನ್ನಡ' }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setSelectedVoiceLang(l.code)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedVoiceLang === l.code
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                    : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Trigger Visualizer */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <div className="relative">
            {isListening && (
              <span className="animate-ping absolute inset-0 rounded-full bg-amber-400 opacity-75"></span>
            )}
            <button
              onClick={startVoiceSim}
              disabled={isListening}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all ${
                isListening
                  ? 'bg-red-500 scale-105'
                  : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 hover:scale-105 hover:shadow-amber-500/30'
              }`}
            >
              <Mic className="w-10 h-10" />
              <span className="text-[10px] font-extrabold uppercase mt-1">
                {isListening ? 'Listening...' : 'Tap to Speak'}
              </span>
            </button>
          </div>

          {/* Audio Wave Simulation */}
          {isListening && (
            <div className="mt-4 flex items-center gap-1.5 h-8">
              {[40, 70, 30, 90, 60, 100, 50, 80, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-amber-500 rounded-full animate-bounce"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recognized Speech Text Card */}
        <div className="mt-6 p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] uppercase mb-1">
            <span>Recognized Speech Text</span>
            {recognizedText && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
          <p className="text-sm font-medium text-[var(--text-primary)] min-h-[48px] italic flex items-center justify-center text-center">
            {recognizedText || (isListening ? "Listening to your voice..." : "Click microphone above and speak your symptoms...")}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="w-1/3 py-3 rounded-xl border border-[var(--border-color)] text-xs font-bold hover:bg-[var(--bg-hover)]"
          >
            Cancel
          </button>
          <button
            onClick={handleUseForScreening}
            disabled={!recognizedText && !isListening}
            className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>Use for AI Screening</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
