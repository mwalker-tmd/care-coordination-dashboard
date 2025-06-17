import React from 'react';
import { usePatientStore } from '../../lib/state/patientStore';

export const PatientProfilePanel: React.FC = () => {
  const { selectedPatient } = usePatientStore();

  if (!selectedPatient) {
    return <div data-testid="no-patient">Select a patient to view their profile</div>;
  }

  return (
    <div data-testid="patient-profile-panel">
      <h2 data-testid="profile-header">Patient Profile</h2>
      <div><strong>Name:</strong> <span data-testid="profile-name">{selectedPatient.name}</span></div>
      <div><strong>Date of Birth:</strong> <span data-testid="profile-dob">{selectedPatient.dateOfBirth}</span></div>
      <div><strong>Phone:</strong> <span data-testid="profile-phone">{selectedPatient.contactInfo.phone}</span></div>
      <div><strong>Email:</strong> <span data-testid="profile-email">{selectedPatient.contactInfo.email}</span></div>
      <div><strong>Primary Care Team:</strong> <span data-testid="profile-care-team">{selectedPatient.primaryCareTeam}</span></div>
      <div><strong>Conditions:</strong> <span data-testid="profile-conditions">{selectedPatient.conditions.join(', ')}</span></div>
    </div>
  );
};
