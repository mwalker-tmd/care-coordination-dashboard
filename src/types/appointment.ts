export interface Appointment {
  id: string;
  patientName: string;
  time: string; // ISO8601 e.g. '2025-06-10T09:00:00Z'
  status: 'upcoming' | 'completed' | 'cancelled';
}
