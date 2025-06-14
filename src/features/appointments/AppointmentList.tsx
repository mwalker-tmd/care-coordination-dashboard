import React, { useEffect } from 'react';
import { useAppointmentStore } from '../../lib/state/appointmentStore';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentFilter } from '../../components/AppointmentFilter';

const AppointmentList: React.FC = () => {
  const { fetchAllAppointments, getAppointmentsByDate, isLoading, error } = useAppointmentStore();
  const today = new Date();

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p data-testid="appointment-list-error">Error: {error}</p>;

  const todaysAppointments = getAppointmentsByDate(today);

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8" data-testid="appointment-list-title">
        Today's Appointments
      </h2>
      <AppointmentFilter />
      {todaysAppointments.length === 0 ? (
        <p className="text-gray-400 italic" data-testid="appointment-list-empty">
          No appointments for today.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {todaysAppointments.map(appt => (
            <AppointmentCard key={appt.id} appointment={appt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
