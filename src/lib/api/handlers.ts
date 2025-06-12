import { http, HttpResponse } from 'msw';
import { Appointment } from '../../types/appointment';

const mockAppointments: Appointment[] = [
  { id: '1', patientName: 'Alice Johnson', time: '09:00 AM', status: 'upcoming' },
  { id: '2', patientName: 'Bob Smith', time: '10:30 AM', status: 'completed' },
  { id: '3', patientName: 'Carol White', time: '01:00 PM', status: 'cancelled' },
];

export const handlers = [
  http.get('/api/appointments', () => {
    return HttpResponse.json(mockAppointments);
  }),
  // Add more handlers as needed
];
