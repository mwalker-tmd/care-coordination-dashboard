import { render, screen, waitFor } from '@testing-library/react';
import DailyAppointmentList from '../../src/features/appointments/DailyAppointmentList';
import * as clientApi from '../../src/lib/api/client';
import { useAppointmentStore } from '../../src/lib/state/appointmentStore';

// Set up dynamic mock data for today
const today = new Date();
const nine = new Date(today); nine.setHours(9, 0, 0, 0);
const tenThirty = new Date(today); tenThirty.setHours(10, 30, 0, 0);
const thirteen = new Date(today); thirteen.setHours(13, 0, 0, 0);

jest.mock('../../src/lib/api/client', () => {
  const today = new Date();
  const nine = new Date(today); nine.setHours(9, 0, 0, 0);
  const tenThirty = new Date(today); tenThirty.setHours(10, 30, 0, 0);
  const thirteen = new Date(today); thirteen.setHours(13, 0, 0, 0);

  const mockAppointments = [
    { id: '1', patientName: 'Alice Johnson', time: nine.toISOString(), status: 'completed' },
    { id: '2', patientName: 'Bob Smith', time: tenThirty.toISOString(), status: 'upcoming' },
    { id: '3', patientName: 'Carol White', time: thirteen.toISOString(), status: 'cancelled' },
  ];

  return {
    fetchAppointments: jest.fn().mockResolvedValue(mockAppointments),
  };
});

describe('DailyAppointmentList Integration', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('renders appointments fetched from API', async () => {
    render(<DailyAppointmentList />);
    expect(clientApi.fetchAppointments).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Carol White')).toBeInTheDocument();
    });

    expect(screen.getByText(nine.toISOString())).toBeInTheDocument();
    expect(screen.getByText(tenThirty.toISOString())).toBeInTheDocument();
    expect(screen.getByText(thirteen.toISOString())).toBeInTheDocument();

    expect(screen.getByText(/Status: upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: cancelled/i)).toBeInTheDocument();
  });
});
