import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppointmentList } from '../../src/features/appointments/AppointmentList';
import { useAppointmentStore } from '../../src/lib/state/appointmentStore';
import * as clientApi from '../../src/lib/api/client';

// Mock the API client
jest.mock('../../src/lib/api/client', () => ({
  fetchAppointments: jest.fn().mockResolvedValue([
    {
      id: '1',
      patientName: 'Alice Johnson',
      time: '09:00 AM',
      status: 'upcoming',
    },
    {
      id: '2',
      patientName: 'Bob Smith',
      time: '10:30 AM',
      status: 'completed',
    },
    {
      id: '3',
      patientName: 'Carol White',
      time: '01:00 PM',
      status: 'cancelled',
    },
  ]),
}));

describe('AppointmentList Integration', () => {
  beforeEach(() => {
    // Reset Zustand store before each test
    const { setAppointments } = useAppointmentStore.getState();
    setAppointments([]);
    // Clear mock calls
    jest.clearAllMocks();
  });

  it('renders appointments fetched from API', async () => {
    render(<AppointmentList />);

    // Verify API was called
    expect(clientApi.fetchAppointments).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Carol White')).toBeInTheDocument();
    });

    expect(screen.getByText('09:00 AM')).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    expect(screen.getByText('01:00 PM')).toBeInTheDocument();

    expect(screen.getByText(/Status: upcoming/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: cancelled/i)).toBeInTheDocument();
  });
});
