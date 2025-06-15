import React from 'react';
import { useAppointmentStore } from '../../lib/state/appointmentStore';

export const AppointmentFilter: React.FC = () => {
  const { patientFilter, setPatientFilter } = useAppointmentStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientFilter(e.target.value || null);
  };

  return (
    <div className="mb-6">
      <label htmlFor="patientFilter" className="block mb-1 font-medium">
        Filter by patient:
      </label>
      <input
        id="patientFilter"
        type="text"
        value={patientFilter ?? ''}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
      />
    </div>
  );
};
