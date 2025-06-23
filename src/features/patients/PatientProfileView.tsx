import React from 'react';
import { PatientSelector } from '../../components/patients/PatientSelector';
import { PatientProfilePanel } from '../../components/patients/PatientProfilePanel';

export const PatientProfileView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md" data-testid="patient-profile-view">
      <PatientSelector />
      <PatientProfilePanel />
    </div>
  );
};
