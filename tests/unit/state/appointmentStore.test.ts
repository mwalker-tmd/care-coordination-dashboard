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
});
