import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Clock, User, Stethoscope, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';

export const BookAppointmentPage = ({ setActiveTab }) => {
  const { bookConsultation } = useData();

  const [department, setDepartment] = useState("General Medicine");
  const [doctor, setDoctor] = useState("Dr. Rajesh Kumar (Medical Officer)");
  const [date, setDate] = useState("2026-09-24");
  const [time, setTime] = useState("10:30 AM");
  const [reason, setReason] = useState("Fever, headache and generalized weakness for 2 days.");
  
  const [generatedToken, setGeneratedToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokenObj = bookConsultation({
      department,
      doctor,
      reason
    });
    setGeneratedToken(tokenObj);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2 border-b border-[var(--border-color)] pb-4">
          <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
            Rural Tele-Clinic & PHC
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Book Consultation</h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Schedule a medical review with duty doctors or tele-specialists.
          </p>
        </div>

        {!generatedToken ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Select Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="General Medicine">General Medicine</option>
                <option value="Pediatrics">Pediatrics & Maternal Care</option>
                <option value="Cardiology">Cardiology Tele-Consult</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Select Preferred Doctor</label>
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
              >
                <option value="Dr. Rajesh Kumar (Medical Officer)">Dr. Rajesh Kumar (Medical Officer - Rampur PHC)</option>
                <option value="Dr. Anita Sharma (Tele-General Specialist)">Dr. Anita Sharma (Tele-General Specialist)</option>
                <option value="Dr. Vikram Sethi (District Hospital)">Dr. Vikram Sethi (District Hospital Sehore)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Preferred Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-muted)] uppercase mb-1">Reason for Visit & Symptoms</label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-xs font-medium focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Appointment & Generate Token</span>
            </button>
          </form>
        ) : (

          /* DIGITAL QUEUE TOKEN GENERATED RESULT */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Digital Queue Token</span>
              <h2 className="text-4xl font-extrabold text-sky-600 dark:text-sky-400 mt-1 font-mono">
                TOKEN #{generatedToken.token}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Status</span>
                <span className="text-sm font-bold text-amber-500">{generatedToken.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase block font-bold">Estimated Wait</span>
                <span className="text-sm font-bold text-emerald-500">~{generatedToken.waitMin} minutes</span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)]">
              Your appointment is registered for <strong className="text-[var(--text-primary)]">Meena Devi</strong>. 12 patients ahead in doctor queue.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setActiveTab('digital-queue')}
                className="w-full py-3 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md hover:bg-sky-500 flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Track Live Queue</span>
              </button>

              <button
                onClick={() => setGeneratedToken(null)}
                className="w-full py-3 rounded-xl border border-[var(--border-color)] text-xs font-bold hover:bg-[var(--bg-hover)]"
              >
                Book Another
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
