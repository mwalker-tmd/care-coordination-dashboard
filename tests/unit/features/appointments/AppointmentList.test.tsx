import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppointmentList } from '../../../../src/features/appointments/AppointmentList';
import * as clientApi from '../../../../src/lib/api/client';

// mock API client
jest.spyOn(clientApi, 'fetchAppointments').mockResolvedValue([
  {
    id: '1',
    patientName: 'Alice Johnson',
    time: '06/10/2025 09:00',
    status: 'upcoming',
  },
  {
    id: '2',
    patientName: 'Bob Smith',
    time: '06/10/2025 10:30',
    status: 'completed',
  },
  {
    id: '3',
    patientName: 'Carol White',
    time: '06/12/2025 13:00',
    status: 'cancelled',
  },
]);

describe('AppointmentList', () => {
  test('renders fetched appointments', async () => {
    render(<AppointmentList />);

    await waitFor(() => {
      expect(screen.getByText(/Alice Johnson/)).toBeInTheDocument();
      expect(screen.getByText(/Bob Smith/)).toBeInTheDocument();
      expect(screen.getByText(/Carol White/)).toBeInTheDocument();
    });
  });
});
