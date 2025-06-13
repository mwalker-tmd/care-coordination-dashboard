import React from 'react';
import { Appointment } from '../../types/appointment';
import { format } from 'date-fns';
import { AppointmentCard } from './AppointmentCard';

interface Props {
  date: Date;
  appointments: Appointment[];
}

export const DayColumn: React.FC<Props> = ({ date, appointments }) => {
  return (
    <div style={{ border: '1px solid lightgray', padding: '0.5rem', flex: 1 }}>
      <h3>{format(date, 'EEEE MM/dd')}</h3>
      {appointments.length > 0 ? (
        appointments.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)
      ) : (
        <p>No appointments</p>
      )}
    </div>
  );
};
