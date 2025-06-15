import { render, screen, waitFor } from '@testing-library/react';
import DailyAppointmentList from '../../../../src/features/appointments/DailyAppointmentList';
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

describe('DailyAppointmentList', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('renders fetched appointments', async () => {
    render(<DailyAppointmentList />);
    
    await waitFor(() => {
      const appointmentCards = screen.getAllByTestId('appointment-card');
      expect(appointmentCards).toHaveLength(3);
      
      const patientNames = screen.getAllByTestId('appointment-patient-name');
      expect(patientNames[0]).toHaveTextContent('Alice Johnson');
      expect(patientNames[1]).toHaveTextContent('Bob Smith');
      expect(patientNames[2]).toHaveTextContent('Carol White');
    });
  });

  it('renders the heading', async () => {
    render(<DailyAppointmentList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('appointment-list-title')).toHaveTextContent("Today's Appointments");
    });
  });

  it('renders empty state when there are no appointments', async () => {
    // Mock empty appointments
    jest.spyOn(clientApi, 'fetchAppointments').mockResolvedValueOnce([]);
    render(<DailyAppointmentList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('appointment-list-empty')).toHaveTextContent('No appointments for today.');
    });
  });

  it('renders error message when error is present', async () => {
    jest.spyOn(clientApi, 'fetchAppointments').mockRejectedValueOnce(new Error('Something went wrong'));
    render(<DailyAppointmentList />);
    await waitFor(() => {
      expect(screen.getByTestId('appointment-list-error')).toHaveTextContent(/Error: Something went wrong/);
    });
  });
});
