import React from 'react';
import { useAppointmentStore } from '../../lib/state/appointmentStore';
import { DayColumn } from './DayColumn';
import { startOfWeek, addDays, format, parseISO, isSameDay } from 'date-fns';

export const WeeklyAppointmentList: React.FC = () => {
  const { appointments } = useAppointmentStore();
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 }); // Sunday

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div>
      <h2>Weekly Appointments</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {days.map((day) => (
          <DayColumn
            key={day.toISOString()}
            date={day}
            appointments={appointments.filter(
              (appt) => isSameDay(parseISO(appt.time), day)
            )}
          />
        ))}
      </div>
    </div>
  );
};
