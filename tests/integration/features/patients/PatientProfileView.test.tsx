import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PatientProfileView } from '../../../../src/features/patients/PatientProfileView';
import { usePatientStore } from '../../../../src/lib/state/patientStore';
import { Patient } from '../../../../src/types/patient';

describe('PatientProfileView Integration', () => {
  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      contactInfo: {
        phone: '123-456-7890',
        email: 'john@example.com',
      },
      primaryCareTeam: 'Team A',
      conditions: ['Condition 1']
    },
    {
      id: '2',
      name: 'Jane Smith',
      dateOfBirth: '1985-05-15',
      contactInfo: {
        phone: '987-654-3210',
        email: 'jane@example.com',
      },
      primaryCareTeam: 'Team B',
      conditions: ['Condition 2', 'Condition 3']
    }
  ];

  beforeEach(() => {
    // Reset Zustand store state before each test
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn()
    });
  });

  it('renders loading state initially', async () => {
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn()
    });
    render(<PatientProfileView />);
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
    expect(await screen.findByTestId('no-patient')).toBeInTheDocument();
  });

  it('renders patient selector and profile panel when patients are loaded', async () => {
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn()
    });
    render(<PatientProfileView />);
    expect(await screen.findByTestId('patient-select')).toBeInTheDocument();
    expect(await screen.findByTestId('patient-profile-panel')).toBeInTheDocument();
    expect(await screen.findByTestId('profile-name')).toHaveTextContent('John Doe');
    expect(await screen.findByTestId('profile-dob')).toHaveTextContent('1990-01-01');
  });

  it('updates profile panel when selecting a different patient', async () => {
    const mockSetSelectedPatientId = jest.fn();
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: mockSetSelectedPatientId
    });
    render(<PatientProfileView />);
    const select = await screen.findByTestId('patient-select');
    fireEvent.change(select, { target: { value: '2' } });
    expect(mockSetSelectedPatientId).toHaveBeenCalledWith('2');
  });

  it('fetches patients on initial load', async () => {
    const mockFetchAllPatients = jest.fn();
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients: mockFetchAllPatients,
      setSelectedPatientId: jest.fn()
    });
    render(<PatientProfileView />);
    expect(mockFetchAllPatients).toHaveBeenCalled();
  });
}); 