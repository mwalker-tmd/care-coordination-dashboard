import React from 'react';
import { Appointment } from '../../types/appointment';

interface Props {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<Props> = ({ appointment }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-300 shadow-sm transition hover:bg-gray-100 hover:shadow-md">
    <div className="font-semibold text-base mb-1">{appointment.patientName}</div>
    <div className="text-sm text-gray-600 mb-1">{appointment.time}</div>
    <div className="text-sm text-gray-500">Status: {appointment.status}</div>
  </div>
);
