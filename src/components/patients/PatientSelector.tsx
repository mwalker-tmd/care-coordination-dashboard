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
    <div data-testid="patient-selector-container">
      <label htmlFor="patient-select">Select Patient:</label>
      <select
        id="patient-select"
        data-testid="patient-select"
        value={selectedPatientId || ''}
        onChange={(e) => setSelectedPatientId(e.target.value)}
      >
        <option value="">Select a patient</option>
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id} data-testid={`patient-option-${patient.id}`}>
            {patient.name}
          </option>
        ))}
      </select>
    </div>
  );
};
