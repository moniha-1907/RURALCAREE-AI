import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialDemoPatients = [
  {
    id: "PAT-1001",
    name: "Meena Devi",
    age: 52,
    gender: "Female",
    village: "Rampur (Village A)",
    district: "Sehore",
    mobile: "+91 98765 43210",
    emergencyContact: "+91 98765 00000",
    preferredLang: "Tamil",
    symptoms: "Fever and weakness for 2 days",
    riskLevel: "MODERATE",
    lastVitals: { temp: 100.4, hr: 92, spo2: 96, bp: "120/80", recordedAt: "Today, 08:30 AM" }
  },
  {
    id: "PAT-1002",
    name: "Ramesh Patel",
    age: 64,
    gender: "Male",
    village: "Khedi",
    district: "Sehore",
    mobile: "+91 98765 11111",
    emergencyContact: "+91 98765 11199",
    preferredLang: "Hindi",
    symptoms: "Chest tightness and shortness of breath",
    riskLevel: "HIGH",
    lastVitals: { temp: 98.6, hr: 110, spo2: 91, bp: "145/95", recordedAt: "Today, 09:15 AM" }
  },
  {
    id: "PAT-1003",
    name: "Kamala Bai",
    age: 45,
    gender: "Female",
    village: "Pipariya",
    district: "Sehore",
    mobile: "+91 98765 22222",
    emergencyContact: "+91 98765 22288",
    preferredLang: "English",
    symptoms: "Mild headache and fatigue",
    riskLevel: "LOW",
    lastVitals: { temp: 98.4, hr: 74, spo2: 98, bp: "118/76", recordedAt: "Yesterday" }
  }
];

const initialDemoQueue = [
  { token: "A012", patientId: "PAT-0099", patientName: "Gopal Singh", age: 58, village: "Rampur", risk: "LOW", status: "In Consultation", waitMin: 0 },
  { token: "A024", patientId: "PAT-1001", patientName: "Meena Devi", age: 52, village: "Rampur", risk: "MODERATE", status: "Waiting", waitMin: 35 },
  { token: "A025", patientId: "PAT-1002", patientName: "Ramesh Patel", age: 64, village: "Khedi", risk: "HIGH", status: "Waiting", waitMin: 45 },
  { token: "A026", patientId: "PAT-1003", patientName: "Kamala Bai", age: 45, village: "Pipariya", risk: "LOW", status: "Waiting", waitMin: 55 }
];

const initialDemoReferrals = [
  {
    id: "REF-8801",
    patientName: "Meena Devi",
    patientId: "PAT-1001",
    age: 52,
    fromFacility: "Rampur PHC",
    recommendedFacility: "District Hospital – Sehore",
    specialty: "General Medicine & Tele-specialist",
    distance: "18 km",
    travelTime: "35 min",
    status: "Accepted", // Created -> Accepted -> In Transit -> Arrived -> Consultation Completed
    timeline: [
      { stage: "Created", time: "10:15 AM", completed: true },
      { stage: "Accepted", time: "10:30 AM", completed: true },
      { stage: "In Transit", time: "Pending", completed: false },
      { stage: "Arrived", time: "Pending", completed: false },
      { stage: "Completed", time: "Pending", completed: false }
    ],
    risk: "MODERATE"
  }
];

const initialDemoMedicines = [
  { id: 1, name: "Paracetamol", dose: "500 mg", timeSlot: "Morning", instruction: "After breakfast", taken: true },
  { id: 2, name: "Amoxicillin", dose: "250 mg", timeSlot: "Afternoon", instruction: "With warm water", taken: false },
  { id: 3, name: "ORSSolution & Zinc", dose: "1 Sachet", timeSlot: "Night", instruction: "Before bed", taken: false }
];

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('ruralcare_patients');
    return saved ? JSON.parse(saved) : initialDemoPatients;
  });

  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem('ruralcare_queue');
    return saved ? JSON.parse(saved) : initialDemoQueue;
  });

  const [referrals, setReferrals] = useState(() => {
    const saved = localStorage.getItem('ruralcare_referrals');
    return saved ? JSON.parse(saved) : initialDemoReferrals;
  });

  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('ruralcare_medicines');
    return saved ? JSON.parse(saved) : initialDemoMedicines;
  });

  const [vitalsHistory, setVitalsHistory] = useState([
    { time: "08:00 AM", temp: 99.8, hr: 88, spo2: 97, bpSys: 122 },
    { time: "09:00 AM", temp: 100.4, hr: 92, spo2: 96, bpSys: 120 },
    { time: "10:00 AM", temp: 100.1, hr: 90, spo2: 96, bpSys: 118 },
    { time: "11:00 AM", temp: 99.5, hr: 85, spo2: 97, bpSys: 120 },
  ]);

  const [currentVitals, setCurrentVitals] = useState({
    temp: 100.4,
    hr: 92,
    spo2: 96,
    bpSys: 120,
    bpDia: 80,
    deviceConnected: true,
    lastUpdated: "Just Now"
  });

  const [latestAiResult, setLatestAiResult] = useState({
    patientName: "Meena Devi",
    riskLevel: "MODERATE",
    score: 65,
    summary: "Fever (100.4°F) with general fatigue for 2 days. Vital sensors detect mild elevation in body temperature and pulse rate.",
    recommendation: "Doctor teleconsultation recommended within 4 hours. Keep hydrated and monitor temperature.",
    nextStep: "Connect with Dr. Rajesh Kumar (Rampur PHC)"
  });

  const [activeEmergency, setActiveEmergency] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ruralcare_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ruralcare_queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem('ruralcare_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('ruralcare_medicines', JSON.stringify(medicines));
  }, [medicines]);

  // Actions
  const registerPatient = (patientData) => {
    const newPat = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      ...patientData,
      riskLevel: "LOW",
      lastVitals: { temp: 98.6, hr: 78, spo2: 97, bp: "120/80", recordedAt: "Just Now" }
    };
    setPatients(prev => [newPat, ...prev]);
    return newPat;
  };

  const bookConsultation = ({ patientId, patientName, department, reason }) => {
    const newTokenNum = `A0${Math.floor(25 + Math.random() * 20)}`;
    const newQueueItem = {
      token: newTokenNum,
      patientId: patientId || "PAT-1001",
      patientName: patientName || "Meena Devi",
      age: 52,
      village: "Rampur",
      risk: "MODERATE",
      status: "Waiting",
      waitMin: 35,
      department: department || "General Medicine",
      reason: reason || "Fever & Weakness"
    };
    setQueue(prev => [...prev, newQueueItem]);
    return newQueueItem;
  };

  const updateQueueStatus = (token, newStatus) => {
    setQueue(prev => prev.map(q => q.token === token ? { ...q, status: newStatus } : q));
  };

  const callNextPatient = () => {
    const waitingIndex = queue.findIndex(q => q.status === "Waiting");
    if (waitingIndex !== -1) {
      const updated = [...queue];
      // Complete currently in consultation
      updated.forEach(q => {
        if (q.status === "In Consultation") q.status = "Completed";
      });
      updated[waitingIndex].status = "In Consultation";
      setQueue(updated);
      return updated[waitingIndex];
    }
    return null;
  };

  const runAiScreening = (symptoms, vitals) => {
    let risk = "LOW";
    let score = 25;
    let summary = "Mild non-specific symptoms. Vital signs within normal physiological ranges.";
    let recommendation = "Routine self-care, hydration, and follow-up if symptoms persist over 48 hours.";
    let nextStep = "Home Care & ASHA Routine Check-in";

    const tempVal = parseFloat(vitals?.temp || 98.6);
    const hrVal = parseInt(vitals?.hr || 78);
    const spo2Val = parseInt(vitals?.spo2 || 98);

    if (spo2Val < 90 || tempVal >= 103 || hrVal > 120) {
      risk = "EMERGENCY";
      score = 95;
      summary = "CRITICAL: Severe vital anomaly detected (Low SpO2 or extreme pyrexia/tachycardia). Immediate emergency escalation required.";
      recommendation = "Dispatch emergency transport to District Hospital immediately. Notify duty doctor.";
      nextStep = "Emergency Ambulance Dispatch & Doctor Alert";
    } else if (spo2Val < 94 || tempVal >= 101 || hrVal > 100 || symptoms.toLowerCase().includes("chest pain")) {
      risk = "HIGH";
      score = 80;
      summary = "High clinical risk detected due to abnormal vitals or acute symptom severity.";
      recommendation = "Urgent clinical review required within 1 hour. Schedule priority teleconsultation or direct PHC referral.";
      nextStep = "Priority Doctor Referral";
    } else if (tempVal > 99.5 || hrVal > 85 || symptoms.length > 5) {
      risk = "MODERATE";
      score = 60;
      summary = "Moderate symptom severity with mild vital elevation (Fever / Elevated HR).";
      recommendation = "Doctor teleconsultation recommended today. Continue vital monitoring.";
      nextStep = "Doctor Review Recommended";
    }

    const result = {
      patientName: "Meena Devi",
      riskLevel: risk,
      score,
      summary,
      recommendation,
      nextStep,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLatestAiResult(result);
    return result;
  };

  const addSmartReferral = (refData) => {
    const newRef = {
      id: `REF-${Math.floor(8800 + Math.random() * 100)}`,
      patientName: refData.patientName || "Meena Devi",
      patientId: refData.patientId || "PAT-1001",
      age: 52,
      fromFacility: "Rampur PHC",
      recommendedFacility: refData.facility || "District Hospital – Sehore",
      specialty: refData.specialty || "General Medicine",
      distance: refData.distance || "18 km",
      travelTime: refData.travelTime || "35 min",
      status: "Created",
      timeline: [
        { stage: "Created", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
        { stage: "Accepted", time: "Pending", completed: false },
        { stage: "In Transit", time: "Pending", completed: false },
        { stage: "Arrived", time: "Pending", completed: false },
        { stage: "Completed", time: "Pending", completed: false }
      ],
      risk: refData.risk || "MODERATE"
    };
    setReferrals(prev => [newRef, ...prev]);
    return newRef;
  };

  const updateReferralStage = (refId, nextStage) => {
    setReferrals(prev => prev.map(ref => {
      if (ref.id === refId) {
        const updatedTimeline = ref.timeline.map(t => {
          if (t.stage === nextStage) return { ...t, completed: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          return t;
        });
        return { ...ref, status: nextStage, timeline: updatedTimeline };
      }
      return ref;
    }));
  };

  const toggleMedicineTaken = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const addMedicineReminder = (medData) => {
    const newMed = {
      id: Date.now(),
      name: medData.name,
      dose: medData.dose,
      timeSlot: medData.timeSlot || "Morning",
      instruction: medData.instruction || "With water",
      taken: false
    };
    setMedicines(prev => [...prev, newMed]);
  };

  const triggerEmergencyHelp = (patientDetails) => {
    const emergencyObj = {
      id: `EMG-${Date.now()}`,
      patientName: patientDetails?.name || "Meena Devi",
      village: patientDetails?.village || "Rampur (Village A)",
      vitals: currentVitals,
      assignedAsha: "Sunita Sharma (ASHA-402)",
      assignedDoctor: "Dr. Rajesh Kumar (On Duty)",
      status: "Ambulance Dispatched",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActiveEmergency(emergencyObj);
    return emergencyObj;
  };

  return (
    <DataContext.Provider value={{
      patients,
      registerPatient,
      queue,
      bookConsultation,
      updateQueueStatus,
      callNextPatient,
      vitalsHistory,
      currentVitals,
      setCurrentVitals,
      runAiScreening,
      latestAiResult,
      referrals,
      addSmartReferral,
      updateReferralStage,
      medicines,
      toggleMedicineTaken,
      addMedicineReminder,
      activeEmergency,
      triggerEmergencyHelp,
      setActiveEmergency
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
