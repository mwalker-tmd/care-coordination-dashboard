import React, { useEffect } from 'react';
import { useAppointmentStore } from '../../lib/state/appointmentStore';
import { DayColumn } from './DayColumn';
import { startOfWeek, addDays } from 'date-fns';
import { AppointmentFilter } from '../../components/AppointmentFilter';

const WeeklyAppointmentList: React.FC = () => {
  const { fetchAllAppointments, getAppointmentsByDate, isLoading, error } = useAppointmentStore();

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Weekly Appointments</h2>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AppointmentFilter />
        {days.map(day => (
          <DayColumn key={day.toISOString()} date={day} appointments={getAppointmentsByDate(day)} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyAppointmentList;
