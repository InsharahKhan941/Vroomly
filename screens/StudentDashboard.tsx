import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';

const ReminderCard: React.FC<{ time: string, pickup: string }> = ({ time, pickup }) => (
    <div className="bg-white/10 p-3 rounded-lg text-center flex-1">
        <p className="text-white font-semibold">{time}</p>
        <p className="text-white/70 text-sm">Pickup - {pickup}</p>
    </div>
);

const StudentDashboard: React.FC = () => {
  const { user, setScreen } = useAppContext();

  return (
    <div className="w-full h-full flex flex-col text-white">
      <Header />
      <main className="flex-grow p-6 space-y-6 overflow-y-auto pb-24">
        <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">WELCOME {user?.fullName?.split(' ')[0].toUpperCase() || 'STUDENT'}</h2>
            <p className="text-white/70">Are you ready for today's ride?</p>
        </div>

        <div>
            <h3 className="font-semibold mb-2">Reminders</h3>
            <div className="flex space-x-3">
                <ReminderCard time="Morning" pickup="7:00 am" />
                <ReminderCard time="Noon" pickup="2:00 pm" />
                <ReminderCard time="Evening" pickup="5:00 pm" />
            </div>
        </div>

        <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
            <div>
                <h3 className="font-semibold text-lg">Not taking the van?</h3>
                <p className="text-white/70 text-sm">Drop a message early to let others know.</p>
            </div>
            <Button onClick={() => setScreen(Screen.MESSAGES)} className="w-auto px-4 py-2 text-sm">Send Message</Button>
        </div>

        <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
            <div>
                <h3 className="font-semibold text-lg">Got any issues with the driver?</h3>
                <p className="text-white/70 text-sm">Submit a complaint here.</p>
            </div>
            <Button onClick={() => setScreen(Screen.COMPLAINT)} className="w-auto px-4 py-2 text-sm">Submit Complaint</Button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default StudentDashboard;