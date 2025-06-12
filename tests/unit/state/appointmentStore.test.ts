import { useAppointmentStore } from '../../../src/lib/state/appointmentStore';
import { Appointment } from '../../../src/types/appointment';

describe('Appointment Store', () => {
  beforeEach(() => {
    // Reset the store before each test
    useAppointmentStore.setState({ appointments: [] });
  });

  it('should initialize with empty appointments', () => {
    const appointments = useAppointmentStore.getState().appointments;
    expect(appointments).toEqual([]);
  });

  it('should update appointments when setAppointments is called', () => {
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        patientName: 'John Doe',
        time: '10:00 AM',
        status: 'upcoming'
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        time: '11:00 AM',
        status: 'completed'
      }
    ];

    useAppointmentStore.getState().setAppointments(mockAppointments);
    const appointments = useAppointmentStore.getState().appointments;
    
    expect(appointments).toEqual(mockAppointments);
    expect(appointments).toHaveLength(2);
  });

  it('should replace existing appointments when setAppointments is called', () => {
    const initialAppointments: Appointment[] = [
      {
        id: '1',
        patientName: 'John Doe',
        time: '10:00 AM',
        status: 'upcoming'
      }
    ];

    const newAppointments: Appointment[] = [
      {
        id: '2',
        patientName: 'Jane Smith',
        time: '11:00 AM',
        status: 'completed'
      }
    ];

    useAppointmentStore.getState().setAppointments(initialAppointments);
    useAppointmentStore.getState().setAppointments(newAppointments);
    
    const appointments = useAppointmentStore.getState().appointments;
    expect(appointments).toEqual(newAppointments);
    expect(appointments).toHaveLength(1);
  });
}); 