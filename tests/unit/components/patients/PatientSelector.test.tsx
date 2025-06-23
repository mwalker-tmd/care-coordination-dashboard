import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PatientSelector } from '../../../../src/components/patients/PatientSelector';
import { usePatientStore } from '../../../../src/lib/state/patientStore';
import { Patient } from '../../../../src/types/patient';

describe('PatientSelector', () => {
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
      conditions: ['Condition 1'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      dateOfBirth: '1992-02-02',
      contactInfo: {
        phone: '098-765-4321',
        email: 'jane@example.com',
      },
      primaryCareTeam: 'Team B',
      conditions: ['Condition 2'],
    },
  ];

  beforeEach(() => {
    // Reset store state before each test
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn(),
    });
  });

  it('renders loading state when no patients are available', async () => {
    render(<PatientSelector />);
    expect(await screen.findByTestId('loading')).toBeInTheDocument();
  });

  it('renders patient selector with options', async () => {
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn(),
    });

    render(<PatientSelector />);
    
    // Check container and select element
    expect(await screen.findByTestId('patient-selector-container')).toBeInTheDocument();
    const select = await screen.findByTestId('patient-select');
    expect(select).toBeInTheDocument();
    
    // Check options
    expect(await screen.findByTestId('patient-option-1')).toHaveTextContent('John Doe');
    expect(await screen.findByTestId('patient-option-2')).toHaveTextContent('Jane Smith');
    
    // Check default option
    const options = select.querySelectorAll('option');
    expect(options).toHaveLength(3); // Including the "Select a patient" option
    expect(options[0]).toHaveTextContent('Select a patient');
  });

  it('renders with null selectedPatientId and shows default option selected', async () => {
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients: jest.fn(),
      setSelectedPatientId: jest.fn(),
    });

    render(<PatientSelector />);
    
    const select = await screen.findByTestId('patient-select');
    expect(select).toBeInTheDocument();
    
    // When selectedPatientId is null, the select should have empty value
    // which corresponds to the "Select a patient" option being selected
    expect(select).toHaveValue('');
    
    // Verify the default option is present and selected
    const options = select.querySelectorAll('option');
    expect(options[0]).toHaveTextContent('Select a patient');
    expect(options[0]).toHaveValue('');
  });

  it('calls setSelectedPatientId when selection changes', async () => {
    const setSelectedPatientId = jest.fn();
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
      fetchAllPatients: jest.fn(),
      setSelectedPatientId,
    });

    render(<PatientSelector />);
    const select = await screen.findByTestId('patient-select');
    fireEvent.change(select, { target: { value: '2' } });
    expect(setSelectedPatientId).toHaveBeenCalledWith('2');
  });

  it('calls fetchAllPatients when patients array is empty', async () => {
    const fetchAllPatients = jest.fn();
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
      fetchAllPatients,
      setSelectedPatientId: jest.fn(),
    });

    render(<PatientSelector />);
    expect(fetchAllPatients).toHaveBeenCalled();
  });
});
