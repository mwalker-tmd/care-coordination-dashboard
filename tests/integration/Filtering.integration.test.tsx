import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeeklyAppointmentList from '../../src/features/appointments/WeeklyAppointmentList';
import { AppointmentFilter } from '../../src/components/AppointmentFilter';

jest.mock('../../src/lib/api/client', () => {
  // Inlining mock data to avoid hoisting issues.
  return {
    fetchAppointments: jest.fn().mockResolvedValue([
      { id: '1', patientName: 'Alice Johnson', time: '2025-06-10T09:00:00Z', status: 'completed' },
      { id: '2', patientName: 'Bob Smith', time: '2025-06-10T10:30:00Z', status: 'upcoming' },
      { id: '3', patientName: 'Carol White', time: '2025-06-12T13:00:00Z', status: 'cancelled' },
    ]),
  };
});

describe('Filtering integration', () => {
  it('filters by patient name', async () => {
    render(
      <>
        <AppointmentFilter />
        <WeeklyAppointmentList />
      </>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/filter by patient/i);
    fireEvent.change(input, { target: { value: 'Alice' } });

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Bob Smith')).toBeNull();
      expect(screen.queryByText('Carol White')).toBeNull();
    });
  });
});
