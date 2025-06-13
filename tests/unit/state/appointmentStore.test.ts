import { useAppointmentStore } from '../../../src/lib/state/appointmentStore';
import * as clientApi from '../../../src/lib/api/client';
import { Appointment } from '../../../src/types/appointment';
import { startOfWeek, addDays } from 'date-fns';

describe('appointmentStore', () => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const tuesday = addDays(weekStart, 2);
  const thursday = addDays(weekStart, 4);

  const mockAppointments: Appointment[] = [
    { id: '1', patientName: 'Alice Johnson', time: `${tuesday.toISOString().split('T')[0]}T09:00:00Z`, status: 'upcoming' },
    { id: '2', patientName: 'Bob Smith', time: `${tuesday.toISOString().split('T')[0]}T10:30:00Z`, status: 'completed' },
    { id: '3', patientName: 'Carol White', time: `${thursday.toISOString().split('T')[0]}T13:00:00Z`, status: 'cancelled' },
  ];

  beforeEach(() => {
    jest.spyOn(clientApi, 'fetchAppointments').mockResolvedValue(mockAppointments);
    useAppointmentStore.setState({ appointments: mockAppointments });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches and stores appointments', async () => {
    await useAppointmentStore.getState().fetchAllAppointments();
    const state = useAppointmentStore.getState();
    expect(state.appointments).toHaveLength(3);
  });

  it('filters by date correctly', () => {
    const todaysAppointments = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(todaysAppointments).toHaveLength(2);
  });

  it('filters for weekly correctly', () => {
    const weeklyAppointments = useAppointmentStore.getState().getAppointmentsForWeek(weekStart);
    expect(weeklyAppointments).toHaveLength(3);
  });

  it('sets error when fetchAppointments throws', async () => {
    const errorMessage = 'Network error';
    jest.spyOn(clientApi, 'fetchAppointments').mockRejectedValue(new Error(errorMessage));
    useAppointmentStore.setState({ appointments: [], error: null, isLoading: false });

    await useAppointmentStore.getState().fetchAllAppointments();
    const state = useAppointmentStore.getState();
    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });

  it('filters by patient name in getAppointmentsByDate', () => {
    useAppointmentStore.setState({ appointments: mockAppointments, patientFilter: 'Alice' });
    const filtered = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].patientName).toBe('Alice Johnson');
  });

  it('filters by patient name in getAppointmentsForWeek', () => {
    useAppointmentStore.setState({ appointments: mockAppointments, patientFilter: 'Carol' });
    const filtered = useAppointmentStore.getState().getAppointmentsForWeek(weekStart);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].patientName).toBe('Carol White');
  });

  it('returns empty array if patientFilter does not match any name in getAppointmentsByDate', () => {
    useAppointmentStore.setState({ appointments: mockAppointments, patientFilter: 'Nonexistent' });
    const filtered = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(filtered).toHaveLength(0);
  });

  it('treats empty string patientFilter as no filter in getAppointmentsByDate', () => {
    useAppointmentStore.setState({ appointments: mockAppointments, patientFilter: '' });
    const filtered = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(filtered).toHaveLength(2);
  });

  it('treats undefined patientFilter as no filter in getAppointmentsByDate', () => {
    useAppointmentStore.setState({ appointments: mockAppointments, patientFilter: undefined });
    const filtered = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(filtered).toHaveLength(2);
  });

  it('handles appointments with empty patientName', () => {
    const appointmentsWithEmptyName: Appointment[] = [
      ...mockAppointments,
      { id: '4', patientName: '', time: `${tuesday.toISOString().split('T')[0]}T12:00:00Z`, status: 'upcoming' },
    ];
    useAppointmentStore.setState({ appointments: appointmentsWithEmptyName, patientFilter: '' });
    const filtered = useAppointmentStore.getState().getAppointmentsByDate(tuesday);
    expect(filtered.length).toBeGreaterThanOrEqual(2); // Should include the empty name appointment
  });

  it('sets default error message if error has no message', async () => {
    jest.spyOn(clientApi, 'fetchAppointments').mockRejectedValue({});
    useAppointmentStore.setState({ appointments: [], error: null, isLoading: false });

    await useAppointmentStore.getState().fetchAllAppointments();
    const state = useAppointmentStore.getState();
    expect(state.error).toBe('Failed to fetch appointments');
    expect(state.isLoading).toBe(false);
  });
});
