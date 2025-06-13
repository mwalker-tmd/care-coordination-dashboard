import React, { useEffect } from 'react';
import { useAppointmentStore } from '../../lib/state/appointmentStore';
import { AppointmentCard } from './AppointmentCard';
import { Appointment } from '../../types/appointment';

const AppointmentList: React.FC = () => {
  const { fetchAllAppointments, getAppointmentsByDate, isLoading, error } = useAppointmentStore();
  const today = new Date();

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  const todaysAppointments = getAppointmentsByDate(today);

  return (
    <div>
      <h2>Today's Appointments</h2>
      {todaysAppointments.length === 0 ? (
        <p>No appointments for today.</p>
      ) : (
        todaysAppointments.map((appt: Appointment) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))
      )}
    </div>
  );
};

export default AppointmentList;
