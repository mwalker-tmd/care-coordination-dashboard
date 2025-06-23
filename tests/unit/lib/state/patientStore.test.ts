import { usePatientStore } from '../../../../src/lib/state/patientStore';
import { fetchPatients } from '../../../../src/lib/api/patients';

// Mock the API call
jest.mock('../../../../src/lib/api/patients', () => ({
  fetchPatients: jest.fn(),
}));

describe('PatientStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset the store to its initial state
    usePatientStore.setState({
      patients: [],
      selectedPatientId: null,
      selectedPatient: null,
    });
  });

  const mockPatients = [
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      contactInfo: {
        phone: '123-456-7890',
        email: 'john@example.com',
      },
      primaryCareTeam: 'Team A',
      conditions: ['Condition 1', 'Condition 2'],
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
      conditions: ['Condition 3'],
    },
  ];

  it('should initialize with empty state', () => {
    const state = usePatientStore.getState();
    expect(state.patients).toEqual([]);
    expect(state.selectedPatientId).toBeNull();
    expect(state.selectedPatient).toBeNull();
  });

  it('should fetch and set patients', async () => {
    (fetchPatients as jest.Mock).mockResolvedValue(mockPatients);
    
    await usePatientStore.getState().fetchAllPatients();
    
    const state = usePatientStore.getState();
    expect(state.patients).toEqual(mockPatients);
    expect(state.selectedPatientId).toBe(mockPatients[0].id);
    expect(state.selectedPatient).toEqual(mockPatients[0]);
  });

  it('should set selected patient', () => {
    usePatientStore.setState({ patients: mockPatients });
    
    usePatientStore.getState().setSelectedPatientId('2');
    
    const state = usePatientStore.getState();
    expect(state.selectedPatientId).toBe('2');
    expect(state.selectedPatient).toEqual(mockPatients[1]);
  });

  it('should handle setting non-existent patient ID', () => {
    usePatientStore.setState({ patients: mockPatients });
    
    usePatientStore.getState().setSelectedPatientId('non-existent');
    
    const state = usePatientStore.getState();
    expect(state.selectedPatientId).toBe('non-existent');
    expect(state.selectedPatient).toBeNull();
  });

  it('should fetch patients and set first patient as selected when data is available', async () => {
    (fetchPatients as jest.Mock).mockResolvedValue(mockPatients);

    await usePatientStore.getState().fetchAllPatients();

    expect(usePatientStore.getState().patients).toEqual(mockPatients);
    expect(usePatientStore.getState().selectedPatientId).toBe('1');
    expect(usePatientStore.getState().selectedPatient).toEqual(mockPatients[0]);
  });

  it('should handle empty patient data correctly', async () => {
    // Mock fetchPatients to return empty array
    (fetchPatients as jest.Mock).mockResolvedValue([]);

    await usePatientStore.getState().fetchAllPatients();

    expect(usePatientStore.getState().patients).toEqual([]);
    expect(usePatientStore.getState().selectedPatientId).toBeNull();
    expect(usePatientStore.getState().selectedPatient).toBeNull();
  });

  it('should set selected patient when setSelectedPatientId is called', () => {
    const mockPatients = [
      { id: '1', name: 'John Doe', dateOfBirth: '1990-01-01', contactInfo: { phone: '123-456-7890', email: 'john@example.com' }, primaryCareTeam: 'Team A', conditions: ['Condition 1'] },
      { id: '2', name: 'Jane Smith', dateOfBirth: '1992-02-02', contactInfo: { phone: '098-765-4321', email: 'jane@example.com' }, primaryCareTeam: 'Team B', conditions: ['Condition 2'] },
    ];

    // Set up initial state with patients
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
    });

    // Call setSelectedPatientId
    usePatientStore.getState().setSelectedPatientId('2');

    expect(usePatientStore.getState().selectedPatientId).toBe('2');
    expect(usePatientStore.getState().selectedPatient).toEqual(mockPatients[1]);
  });

  it('should handle setSelectedPatientId with non-existent patient id', () => {
    const mockPatients = [
      { id: '1', name: 'John Doe', dateOfBirth: '1990-01-01', contactInfo: { phone: '123-456-7890', email: 'john@example.com' }, primaryCareTeam: 'Team A', conditions: ['Condition 1'] },
    ];

    // Set up initial state with patients
    usePatientStore.setState({
      patients: mockPatients,
      selectedPatientId: '1',
      selectedPatient: mockPatients[0],
    });

    // Call setSelectedPatientId with non-existent id
    usePatientStore.getState().setSelectedPatientId('999');

    expect(usePatientStore.getState().selectedPatientId).toBe('999');
    expect(usePatientStore.getState().selectedPatient).toBeNull();
  });
}); 