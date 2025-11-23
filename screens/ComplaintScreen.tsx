import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import { DEPARTMENTS } from '../constants';
import { submitComplaint } from '../backend/complaintApi.ts';

const ComplaintScreen: React.FC = () => {
  const { user, role, setScreen, addNotification } = useAppContext();

  const [fullName, setFullName] = useState<string>(user?.fullName ?? '');
  const [studentId, setStudentId] = useState<string>(user?.studentId ?? '');
  const [department, setDepartment] = useState<string>(user?.department ?? '');
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      student_id: role === 'Student' ? user?.id ?? null : null,
      name: fullName,
      reg_no: role === 'Student' ? studentId ?? null : null,
      department: role === 'Student' ? department ?? null : null,
      complaint_text: details,
    };

    const res = await submitComplaint(payload as any);
    setLoading(false);

    if (res?.error) {
      return;
    }

    try {
      addNotification({ title: 'Complaint', message: 'Your complaint was submitted successfully.' });
    } catch (e) {
      // ignore notification errors
    }
    setScreen(Screen.COMPLAINT);
  };

  return (
    <div className="w-full h-full flex flex-col text-white">
      <div className="p-4 flex items-center">
         <button onClick={() => setScreen(Screen.DASHBOARD)} className="mr-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
         </button>
         <h1 className="text-xl font-bold">VROOMLY</h1>
      </div>

      <main className="flex-grow p-6 space-y-6 flex flex-col items-center">
        <div className="bg-white/20 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <h2 className="text-2xl font-bold">{role} Complaint Form</h2>
        <p className="text-white/70">Do you have a complaint?</p>

        <form className="w-full space-y-4 mt-4" onSubmit={handleSubmit}>
          <Input label="Full Name" id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          {role === 'Student' ? (
            <>
              <Input label="Student ID" id="studentId" type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
              <div>
                <label htmlFor="department" className="text-sm font-medium text-white/80 mb-2 block">Select Department</label>
                <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required className="w-full bg-[#2E2E55] border border-transparent focus:border-pink-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400/50">
                  <option value="">Select here</option>
                  {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                </select>
              </div>
            </>
          ) : (
            <Input label="CNIC" id="cnic" type="text" defaultValue={user?.cnic} required />
          )}
          
          <div>
            <label htmlFor="details" className="text-sm font-medium text-white/80 mb-2 block">Complain Details</label>
            <textarea id="details" rows={4} placeholder="Describe your issue..." value={details} onChange={(e) => setDetails(e.target.value)} required className="w-full bg-[#2E2E55] border border-transparent focus:border-pink-400 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400/50"></textarea>
          </div>
          
          <div className="pt-4">
            <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Submit'}</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ComplaintScreen;