import React from 'react';
import { render, screen } from '@testing-library/react';
import { PatientProfilePanel } from '../../../../src/components/patients/PatientProfilePanel';
import { usePatientStore } from '../../../../src/lib/state/patientStore';
import { Patient } from '../../../../src/types/patient';

describe('PatientProfilePanel', () => {
  const mockPatient: Patient = {
    id: '1',
    name: 'John Doe',
    dateOfBirth: '1990-01-01',
    contactInfo: {
      phone: '123-456-7890',
      email: 'john@example.com',
    },
    primaryCareTeam: 'Team A',
    conditions: ['Condition 1'],
  };

  beforeEach(() => {
    // Reset store state before each test
    usePatientStore.setState({
      selectedPatient: null,
    });
  });

  it('renders loading state when no patient is selected', async () => {
    render(<PatientProfilePanel />);
    expect(await screen.findByTestId('no-patient')).toBeInTheDocument();
  });

  it('renders patient information when a patient is selected', async () => {
    usePatientStore.setState({
      selectedPatient: mockPatient,
    });

    render(<PatientProfilePanel />);
    
    expect(await screen.findByTestId('patient-profile-panel')).toBeInTheDocument();
    expect(await screen.findByTestId('profile-name')).toHaveTextContent('John Doe');
    expect(await screen.findByTestId('profile-dob')).toHaveTextContent('1990-01-01');
    expect(await screen.findByTestId('profile-phone')).toHaveTextContent('123-456-7890');
    expect(await screen.findByTestId('profile-email')).toHaveTextContent('john@example.com');
    expect(await screen.findByTestId('profile-care-team')).toHaveTextContent('Team A');
    expect(await screen.findByTestId('profile-conditions')).toHaveTextContent('Condition 1');
  });

  it('renders multiple conditions when patient has multiple conditions', async () => {
    const patientWithMultipleConditions = {
      ...mockPatient,
      conditions: ['Condition 1', 'Condition 2', 'Condition 3'],
    };

    usePatientStore.setState({
      selectedPatient: patientWithMultipleConditions,
    });

    render(<PatientProfilePanel />);
    
    expect(await screen.findByTestId('profile-conditions')).toHaveTextContent('Condition 1, Condition 2, Condition 3');
  });
}); 