import React from 'react';
import { Appointment } from '../../types/appointment';
import { format } from 'date-fns';
import { AppointmentCard } from './AppointmentCard';

interface Props {
  date: Date;
  appointments: Appointment[];
}

export const DayColumn: React.FC<Props> = ({ date, appointments }) => {
  const dayHeaderText = format(date, 'EEEE MM/dd');
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 flex flex-col min-h-day-column">
      <h3 className="font-semibold text-lg mb-4" data-testid="day-column-date">
        {dayHeaderText}
      </h3>

      {appointments.length === 0 ? (
        <p className="text-gray-400 italic" data-testid="day-column-empty">
          No appointments
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map(appt => (
            <AppointmentCard key={appt.id} appointment={appt} />
          ))}
        </div>
      )}
    </div>
  );
};
