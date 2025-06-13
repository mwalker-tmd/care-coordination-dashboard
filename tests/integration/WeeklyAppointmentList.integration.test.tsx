import React from 'react';
import { render, screen, within } from '@testing-library/react';
import WeeklyAppointmentList from '../../src/features/appointments/WeeklyAppointmentList';
import * as clientApi from '../../src/lib/api/client';
import { useAppointmentStore } from '../../src/lib/state/appointmentStore';
import { startOfWeek, addDays, format } from 'date-fns';

jest.mock('../../src/lib/api/client', () => {
  const { startOfWeek, addDays } = jest.requireActual('date-fns');
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const tuesday = addDays(weekStart, 2);
  const thursday = addDays(weekStart, 4);

  const tuesdayNine = new Date(tuesday); tuesdayNine.setHours(9, 0, 0, 0);
  const tuesdayTenThirty = new Date(tuesday); tuesdayTenThirty.setHours(10, 30, 0, 0);
  const thursdayThirteen = new Date(thursday); thursdayThirteen.setHours(13, 0, 0, 0);

  const mockAppointments = [
    { id: '1', patientName: 'Alice Johnson', time: tuesdayNine.toISOString(), status: 'completed' },
    { id: '2', patientName: 'Bob Smith', time: tuesdayTenThirty.toISOString(), status: 'upcoming' },
    { id: '3', patientName: 'Carol White', time: thursdayThirteen.toISOString(), status: 'cancelled' },
  ];

  return {
    fetchAppointments: jest.fn().mockResolvedValue(mockAppointments),
  };
});

const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
const tuesday = addDays(weekStart, 2);
const thursday = addDays(weekStart, 4);

describe('WeeklyAppointmentList', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('renders appointments correctly across the weekly view', async () => {
    render(<WeeklyAppointmentList />);
    await screen.findByText('Weekly Appointments');

    // Validate column headers
    expect(screen.getByText(/Sunday/)).toBeInTheDocument();
    expect(screen.getByText(/Monday/)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/)).toBeInTheDocument();

    // Column filtering validation
    const tuesdayColumn = screen.getByText(`Tuesday ${format(tuesday, 'MM/dd')}`).closest('div');
    const thursdayColumn = screen.getByText(`Thursday ${format(thursday, 'MM/dd')}`).closest('div');

    expect(within(tuesdayColumn!).getByText('Alice Johnson')).toBeInTheDocument();
    expect(within(tuesdayColumn!).getByText('Bob Smith')).toBeInTheDocument();
    expect(within(tuesdayColumn!).queryByText('Carol White')).toBeNull();

    expect(within(thursdayColumn!).getByText('Carol White')).toBeInTheDocument();
    expect(within(thursdayColumn!).queryByText('Alice Johnson')).toBeNull();
    expect(within(thursdayColumn!).queryByText('Bob Smith')).toBeNull();
  });

  it('renders empty state when there are no appointments for the week', async () => {
    jest.spyOn(clientApi, 'fetchAppointments').mockResolvedValueOnce([]);
    render(<WeeklyAppointmentList />);
    await screen.findByText('Weekly Appointments');

    expect(screen.getAllByText(/No appointments/i).length).toBe(7);
  });

  it('renders error message when error is present', () => {
    // Mock fetchAllAppointments to do nothing
    jest.spyOn(useAppointmentStore.getState(), 'fetchAllAppointments').mockImplementation(() => Promise.resolve());
    useAppointmentStore.setState({ appointments: [], error: 'Something went wrong', isLoading: false });
    render(<WeeklyAppointmentList />);
    expect(screen.getByText(/Error: Something went wrong/)).toBeInTheDocument();
  });
});
