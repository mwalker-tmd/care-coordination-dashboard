import React from 'react';
import { Appointment } from '../../types/appointment';

interface Props {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<Props> = ({ appointment }) => (
  <div
    className="bg-gray-50 rounded-lg p-4 border border-gray-300 shadow-sm transition hover:bg-gray-100 hover:shadow-md"
    data-testid="appointment-card"
  >
    <div className="font-semibold text-base mb-1" data-testid="appointment-patient-name">
      {appointment.patientName}
    </div>
    <div className="text-sm text-gray-600 mb-1" data-testid="appointment-time">
      {appointment.time}
    </div>
    <div className="text-sm text-gray-500" data-testid="appointment-status">
      Status: {appointment.status}
    </div>
  </div>
);
