import { fetchAppointments } from '../../../../src/lib/api/client';
import { startOfWeek, addDays } from 'date-fns';

describe('API Client', () => {
  describe('fetchAppointments', () => {
    it('should return appointments', async () => {
      // Generate expected mock data using the same logic as in client.ts
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
      const monday = addDays(weekStart, 1);
      const tuesday = addDays(weekStart, 2);
      const wednesday = addDays(weekStart, 3);
      const thursday = addDays(weekStart, 4);
      const friday = addDays(weekStart, 5);

      const mondaySixteen = new Date(monday); mondaySixteen.setHours(16, 0, 0, 0);
      const tuesdayNine = new Date(tuesday); tuesdayNine.setHours(9, 0, 0, 0);
      const tuesdayTenThirty = new Date(tuesday); tuesdayTenThirty.setHours(10, 30, 0, 0);
      const wednesdayFourteen = new Date(wednesday); wednesdayFourteen.setHours(14, 0, 0, 0);
      const thursdayThirteen = new Date(thursday); thursdayThirteen.setHours(13, 0, 0, 0);
      const fridayEleven = new Date(friday); fridayEleven.setHours(11, 0, 0, 0);
      const fridayFifteen = new Date(friday); fridayFifteen.setHours(15, 0, 0, 0);

      const mockAppointments = [
        { id: '1', patientName: 'Alice Johnson', time: tuesdayNine.toISOString(), status: 'completed' },
        { id: '2', patientName: 'Bob Smith', time: tuesdayTenThirty.toISOString(), status: 'cancelled' },
        { id: '3', patientName: 'Carol White', time: thursdayThirteen.toISOString(), status: 'cancelled' },
        { id: '4', patientName: 'Vignesh Kumar', time: mondaySixteen.toISOString(), status: 'completed' },
        { id: '5', patientName: 'Maria Rodriguez', time: wednesdayFourteen.toISOString(), status: 'completed' },
        { id: '6', patientName: 'Amina Hassan', time: fridayEleven.toISOString(), status: 'upcoming' },
        { id: '7', patientName: 'David Chen', time: fridayFifteen.toISOString(), status: 'upcoming' },
      ];

      const result = await fetchAppointments();
      expect(result).toEqual(mockAppointments);
    });
  });
}); 