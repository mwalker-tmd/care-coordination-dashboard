import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../src/features/dashboard/Dashboard';
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

describe('Dashboard Integration', () => {
  beforeEach(() => {
    useAppointmentStore.setState({ appointments: [] });
  });

  it('renders dashboard with appointments', async () => {
    render(<Dashboard />);
    expect(clientApi.fetchAppointments).toHaveBeenCalledTimes(1);

    // Check for dashboard elements using data-testid
    expect(await screen.findByTestId('dashboard-container')).toBeInTheDocument();
    expect(await screen.findByTestId('dashboard-title')).toHaveTextContent('Care Coordination Dashboard');
    expect(await screen.findByTestId('weekly-tab-button')).toBeInTheDocument();
    expect(await screen.findByTestId('today-tab-button')).toBeInTheDocument();

    // Check for appointment cards and their content
    const patientNames = ['Alice Johnson', 'Bob Smith', 'Carol White'];
    const appointmentTimes = [nine.toISOString(), tenThirty.toISOString(), thirteen.toISOString()];
    const appointmentStatuses = ['completed', 'upcoming', 'cancelled'];

    // Wait for appointment cards to appear
    const cards = await screen.findAllByTestId('appointment-card');
    expect(cards).toHaveLength(3);

    const names = await screen.findAllByTestId('appointment-patient-name');
    expect(names.map(n => n.textContent ?? '')).toEqual(patientNames);

    const times = await screen.findAllByTestId('appointment-time');
    expect(times.map(t => t.textContent ?? '')).toEqual(appointmentTimes);

    const statuses = await screen.findAllByTestId('appointment-status');
    expect(statuses.map(s => (s.textContent ?? '').replace('Status:', '').trim())).toEqual(appointmentStatuses);
  });
});
