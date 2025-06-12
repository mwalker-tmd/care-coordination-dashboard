import { fetchAppointments } from '../../../../src/lib/api/client';

describe('API Client', () => {
  describe('fetchAppointments', () => {
    const mockAppointments = [
      {
        id: '1',
        patientName: 'Alice Johnson',
        time: '06/10/2025 09:00',
        status: 'completed'
      },
      {
        id: '2',
        patientName: 'Bob Smith',
        time: '06/10/2025 10:30',
        status: 'upcoming'
      },
      {
        id: '3',
        patientName: 'Carol White',
        time: '06/12/2025 13:00',
        status: 'cancelled'
      }
    ];

    it('should return appointments', async () => {
      const result = await fetchAppointments();
      expect(result).toEqual(mockAppointments);
    });
  });
}); 