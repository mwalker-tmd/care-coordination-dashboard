import { fetchAppointments } from '../../../src/lib/api/client';

describe('API Client', () => {
  describe('fetchAppointments', () => {
    const mockAppointments = [
      {
        id: '1',
        patientName: 'Alice Johnson',
        time: '09:00 AM',
        status: 'upcoming'
      },
      {
        id: '2',
        patientName: 'Bob Smith',
        time: '10:30 AM',
        status: 'completed'
      },
      {
        id: '3',
        patientName: 'Carol White',
        time: '01:00 PM',
        status: 'cancelled'
      }
    ];

    it('should return appointments', async () => {
      const result = await fetchAppointments();
      expect(result).toEqual(mockAppointments);
    });
  });
}); 