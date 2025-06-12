import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppointmentList } from '../../../src/features/appointments/AppointmentList';
import { useAppointmentStore } from '../../../src/lib/state/appointmentStore';
import { fetchAppointments } from '../../../src/lib/api/client';

// Mock the API client
jest.mock('../../../src/lib/api/client', () => ({
  fetchAppointments: jest.fn()
}));

describe('AppointmentList', () => {
  const mockAppointments = [
    {
      id: '1',
      patientName: 'Alice Johnson',
      time: '09:00 AM',
      status: 'upcoming'
    },
    {
      id: '2',
      patientName: 'Bob Smith',
      time: '10:30 AM',
      status: 'completed'
    },
    {
      id: '3',
      patientName: 'Carol White',
      time: '01:00 PM',
      status: 'cancelled'
    }
  ];

  beforeEach(() => {
    // Reset the store before each test
    useAppointmentStore.setState({ appointments: [] });
    // Clear all mocks
    jest.clearAllMocks();
    // Default mock implementation
    (fetchAppointments as jest.Mock).mockResolvedValue(mockAppointments);
  });

  it('should render the list title', async () => {
    render(<AppointmentList />);
    expect(screen.getByText("Today's Appointments")).toBeInTheDocument();
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(fetchAppointments).toHaveBeenCalled();
    });
  });

  it('should fetch and display appointments', async () => {
    render(<AppointmentList />);

    // Wait for appointments to be loaded
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Carol White')).toBeInTheDocument();
    });

    // Verify API was called
    expect(fetchAppointments).toHaveBeenCalledTimes(1);
  });
}); 