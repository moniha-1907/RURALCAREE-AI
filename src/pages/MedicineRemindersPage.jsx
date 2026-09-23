import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Pill, CheckCircle2, Plus, Calendar, Clock, Edit, Sparkles } from 'lucide-react';

export const MedicineRemindersPage = ({ setActiveTab }) => {
  const { medicines, toggleMedicineTaken, addMedicineReminder } = useData();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning");
  const [duration, setDuration] = useState("5 Days");
  const [instruction, setInstruction] = useState("After meals with warm water");

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!medName) return;
    addMedicineReminder({
      name: medName,
      dose,
      timeSlot,
      instruction
    });
    setMedName("");
    setDose("");
    setIsAddOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
        <div>
          <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-bold text-xs uppercase tracking-wider">
            Patient Pill Tracker
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">
            Medicine & Follow-up Reminders
          </h1>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* ADD MEDICINE FORM MODAL / DRAWER (Requirement #33) */}
      {isAddOpen && (
        <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4 shadow-xl animate-fade-in">
          <h3 className="font-extrabold text-base">Add New Medication Reminder</h3>
          
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Medicine Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paracetamol"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Dose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500 mg"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                >
                  <option value="Morning">Morning (Breakfast)</option>
                  <option value="Afternoon">Afternoon (Lunch)</option>
                  <option value="Night">Night (Dinner)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Instructions</label>
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-pink-600 text-white font-bold text-xs shadow-md"
              >
                Save Reminder
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TODAY'S MEDICINES LIST (Requirement #32) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6">
        <h3 className="font-extrabold text-lg flex items-center justify-between">
          <span>Today's Prescribed Medicines</span>
          <span className="text-xs text-[var(--text-muted)] font-mono">Meena Devi (PAT-1001)</span>
        </h3>

        <div className="space-y-3">
          {medicines.map((m) => (
            <div 
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                m.taken
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : 'bg-[var(--bg-primary)] border-[var(--border-color)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                  m.taken ? 'bg-emerald-500 text-white' : 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-300'
                }`}>
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{m.name} ({m.dose})</h4>
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-card)] border text-[10px] font-bold">
                      {m.timeSlot}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{m.instruction}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => toggleMedicineTaken(m.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                    m.taken
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{m.taken ? 'Taken ✓' : 'Mark as Taken'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING FOLLOW-UP CARD (Requirement #33) */}
      <div className="glass-panel p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-base">Upcoming Follow-up Appointment</h4>
            <p className="text-xs text-[var(--text-secondary)]">Dr. Rajesh Kumar • Rampur PHC</p>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">Date: 25 Sep 2026 @ 10:30 AM</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('book-appointment')}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md"
        >
          View Appointment
        </button>
      </div>

    </div>
  );
};
