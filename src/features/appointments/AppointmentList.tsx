import React, { useEffect } from 'react';
import { fetchAppointments } from '../../lib/api/client';
import { useAppointmentStore } from '../../lib/state/appointmentStore';
import { AppointmentCard } from './AppointmentCard';

export const AppointmentList: React.FC = () => {
  const { appointments, setAppointments } = useAppointmentStore();

  useEffect(() => {
    fetchAppointments().then(setAppointments);
  }, [setAppointments]);

  return (
    <div>
      <h2>Today's Appointments</h2>
      {appointments.map(appt => (
        <AppointmentCard key={appt.id} appointment={appt} />
      ))}
    </div>
  );
};
