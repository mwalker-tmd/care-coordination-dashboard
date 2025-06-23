import React from 'react';
import { PatientSelector } from '../../components/patients/PatientSelector';
import { PatientProfilePanel } from '../../components/patients/PatientProfilePanel';

export const PatientProfileView: React.FC = () => {
  return (
    <div data-testid="patient-profile-view">
      <PatientSelector />
      <PatientProfilePanel />
    </div>
  );
};
