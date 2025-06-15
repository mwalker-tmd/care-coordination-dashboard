import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeeklyAppointmentList from '../../src/features/appointments/WeeklyAppointmentList';
import { useAppointmentStore } from '../../src/lib/state/appointmentStore';

// Helper to get a date string for a day in the current week
function getDateOfWeek(dayIndex: number, hour: number = 9, minute: number = 0) {
  const now = new Date();
  const first = now.getDate() - now.getDay(); // Sunday
  const date = new Date(now.setDate(first + dayIndex));
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

jest.mock('../../src/lib/api/client', () => {
  return {
    fetchAppointments: jest.fn().mockResolvedValue([
      { id: '1', patientName: 'Alice Johnson', time: getDateOfWeek(1, 9, 0), status: 'completed' }, // Monday
      { id: '2', patientName: 'Bob Smith', time: getDateOfWeek(2, 10, 30), status: 'upcoming' }, // Tuesday
      { id: '3', patientName: 'Carol White', time: getDateOfWeek(3, 13, 0), status: 'cancelled' }, // Wednesday
    ]),
  };
});

describe('Filtering integration', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('filters by patient name', async () => {
    render(
      <WeeklyAppointmentList />
    );

    // Wait for the data to load and verify initial state
    await waitFor(() => {
      const appointmentCards = screen.getAllByTestId('appointment-card');
      expect(appointmentCards).toHaveLength(3);
      const patientNames = screen.getAllByTestId('appointment-patient-name');
      expect(patientNames[0]).toHaveTextContent('Alice Johnson');
    });

    // Filter by patient name
    const filterInput = screen.getByLabelText(/filter by patient/i);
    fireEvent.change(filterInput, { target: { value: 'Bob' } });

    // Verify filtered results
    await waitFor(() => {
      const appointmentCards = screen.getAllByTestId('appointment-card');
      expect(appointmentCards).toHaveLength(1);
      const patientNames = screen.getAllByTestId('appointment-patient-name');
      expect(patientNames[0]).toHaveTextContent('Bob Smith');
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    });
  });
});
