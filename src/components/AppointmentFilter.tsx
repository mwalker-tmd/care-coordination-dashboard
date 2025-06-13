import React from 'react';
import { useAppointmentStore } from '../lib/state/appointmentStore';

export const AppointmentFilter: React.FC = () => {
  const { patientFilter, setPatientFilter } = useAppointmentStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientFilter(e.target.value || null);
  };

  return (
    <div className="p-2">
      <label htmlFor="patientFilter">Filter by patient:</label>
      <input
        id="patientFilter"
        type="text"
        value={patientFilter ?? ''}
        onChange={handleChange}
        className="border border-gray-300 rounded p-1 ml-2"
      />
    </div>
  );
};
