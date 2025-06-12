import { Appointment } from '../../types/appointment';

export async function fetchAppointments(): Promise<Appointment[]> {
  // Stubbed test data
  return [
    {
      id: '1',
      patientName: 'Alice Johnson',
      time: '06/10/2025 09:00',
      status: 'completed',
    },
    {
      id: '2',
      patientName: 'Bob Smith',
      time: '06/10/2025 10:30',
      status: 'upcoming',
    },
    {
      id: '3',
      patientName: 'Carol White',
      time: '06/12/2025 13:00',
      status: 'cancelled',
    },
  ];
}
