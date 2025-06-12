import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppointmentList } from '../../src/features/appointments/AppointmentList';
import { useAppointmentStore } from '../../src/lib/state/appointmentStore';

// MSW handlers automatically loaded from setupTests.ts

describe('AppointmentList Integration (MSW)', () => {

  beforeEach(() => {
    // Reset Zustand store before each test
    const { setAppointments } = useAppointmentStore.getState();
    setAppointments([]);
  });

  it('renders appointments fetched from API (via MSW)', async () => {
    render(<AppointmentList />);

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
