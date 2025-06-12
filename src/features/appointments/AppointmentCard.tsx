import React from 'react';
import { Appointment } from '../../types/appointment';

interface Props {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<Props> = ({ appointment }) => (
  <div className={`card card-${appointment.status}`}>
    <h3>{appointment.patientName}</h3>
    <p>{appointment.time}</p>
    <span>Status: {appointment.status}</span>
  </div>
);
