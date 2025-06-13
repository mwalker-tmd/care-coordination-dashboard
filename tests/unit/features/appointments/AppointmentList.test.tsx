import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AppointmentList from '../../../../src/features/appointments/AppointmentList';
import * as clientApi from '../../../../src/lib/api/client';
import { useAppointmentStore } from '../../../../src/lib/state/appointmentStore';

jest.mock('../../../../src/lib/api/client', () => {
  const today = new Date();
  // Set local time for appointments
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

describe('AppointmentList', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('renders fetched appointments', async () => {
    render(<AppointmentList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Alice Johnson/)).toBeInTheDocument();
      expect(screen.getByText(/Bob Smith/)).toBeInTheDocument();
      expect(screen.getByText(/Carol White/)).toBeInTheDocument();
    });
  });

  it('renders the heading', async () => {
    render(<AppointmentList />);
    
    await waitFor(() => {
      expect(screen.getByText("Today's Appointments")).toBeInTheDocument();
    });
  });

  it('renders empty state when there are no appointments', async () => {
    jest.spyOn(clientApi, 'fetchAppointments').mockResolvedValueOnce([]);
    render(<AppointmentList />);
    
    await waitFor(() => {
      expect(screen.getByText('No appointments for today.')).toBeInTheDocument();
    });
  });

  it('renders error message when error is present', () => {
    // Mock fetchAllAppointments to do nothing
    jest.spyOn(useAppointmentStore.getState(), 'fetchAllAppointments').mockImplementation(() => Promise.resolve());
    useAppointmentStore.setState({ appointments: [], error: 'Something went wrong', isLoading: false });
    render(<AppointmentList />);
    expect(screen.getByText(/Error: Something went wrong/)).toBeInTheDocument();
  });
});
