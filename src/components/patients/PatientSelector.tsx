import React, { useEffect } from 'react';
import { usePatientStore } from '../../lib/state/patientStore';

export const PatientSelector: React.FC = () => {
  const { patients, selectedPatientId, setSelectedPatientId, fetchAllPatients } = usePatientStore();

  useEffect(() => {
    if (patients.length === 0) {
      fetchAllPatients();
    }
  }, [patients.length, fetchAllPatients]);

  if (patients.length === 0) {
    return <div data-testid="loading">Loading patients...</div>;
  }

  return (
    <div data-testid="patient-selector-container" className="flex items-center gap-x-2 mb-4">
      <label htmlFor="patient-select" className="text-sm font-medium text-gray-700">
        Select Patient:
      </label>
      <select
        id="patient-select"
        data-testid="patient-select"
        value={selectedPatientId || ''}
        onChange={e => setSelectedPatientId(e.target.value)}
        className="block w-auto pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Select a patient</option>
        {patients.map(patient => (
          <option key={patient.id} value={patient.id} data-testid={`patient-option-${patient.id}`}>
            {patient.name}
          </option>
        ))}
      </select>
    </div>
  );
};
