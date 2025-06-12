export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}
