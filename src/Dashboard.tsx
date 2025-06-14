import { useState } from 'react';
import WeeklyAppointmentList from './features/appointments/WeeklyAppointmentList';
import AppointmentList from './features/appointments/AppointmentList';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'today'>('weekly');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Care Coordination Dashboard</h1>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg border ${activeTab === 'weekly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'} transition`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly View
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg border ${activeTab === 'today' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'} transition`}
            onClick={() => setActiveTab('today')}
          >
            Today's Appointments
          </button>
        </div>

        <div>
          {activeTab === 'weekly' && <WeeklyAppointmentList />}
          {activeTab === 'today' && <AppointmentList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
