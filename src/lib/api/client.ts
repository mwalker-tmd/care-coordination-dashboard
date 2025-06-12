import { Appointment } from '../../types/appointment';

export const fetchAppointments = async (): Promise<Appointment[]> => {
  return Promise.resolve([
    { id: '1', patientName: 'Alice Johnson', time: '09:00 AM', status: 'upcoming' },
    { id: '2', patientName: 'Bob Smith', time: '10:30 AM', status: 'completed' },
    { id: '3', patientName: 'Carol White', time: '01:00 PM', status: 'cancelled' },
  ]);
};
