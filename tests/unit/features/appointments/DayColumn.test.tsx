import { render, screen } from '@testing-library/react';
import { DayColumn } from '../../../../src/features/appointments/DayColumn';
import { Appointment } from '../../../../src/types/appointment';

describe('DayColumn', () => {
  const date = new Date('2025-06-10T12:00:00Z');
  const appointments: Appointment[] = [
    { id: '1', patientName: 'Alice Johnson', time: '2025-06-10T09:00:00Z', status: 'completed' },
    { id: '2', patientName: 'Bob Smith', time: '2025-06-10T14:00:00Z', status: 'upcoming' }
  ];

  it('renders appointments correctly for given day', () => {
    render(<DayColumn date={date} appointments={appointments} />);

    const appointmentCards = screen.getAllByTestId('appointment-card');
    expect(appointmentCards).toHaveLength(2);
    
    expect(screen.getAllByTestId('appointment-patient-name')[0]).toHaveTextContent('Alice Johnson');
    expect(screen.getAllByTestId('appointment-patient-name')[1]).toHaveTextContent('Bob Smith');
    expect(screen.getAllByTestId('appointment-status')[0]).toHaveTextContent(/completed/i);
    expect(screen.getAllByTestId('appointment-status')[1]).toHaveTextContent(/upcoming/i);
  });

  it('renders no appointments message when none exist', () => {
    render(<DayColumn date={date} appointments={[]} />);
    expect(screen.getByTestId('day-column-empty')).toHaveTextContent(/No appointments/i);
  });

  it('formats the date correctly', () => {
    render(<DayColumn date={date} appointments={[]} />);
    const dateElement = screen.getByTestId('day-column-date');
    expect(dateElement).toHaveTextContent(/^[A-Za-z]+ \d{2}\/\d{2}$/);
  });

  it('renders appointments in chronological order', () => {
    render(<DayColumn date={date} appointments={appointments} />);
    const statusElements = screen.getAllByTestId('appointment-status');
    expect(statusElements[0]).toHaveTextContent(/completed/i);
    expect(statusElements[1]).toHaveTextContent(/upcoming/i);
  });

  it('renders the correct number of AppointmentCard components', () => {
    render(<DayColumn date={date} appointments={appointments} />);
    const appointmentCards = screen.getAllByTestId('appointment-card');
    expect(appointmentCards.length).toBe(appointments.length);
  });
});
