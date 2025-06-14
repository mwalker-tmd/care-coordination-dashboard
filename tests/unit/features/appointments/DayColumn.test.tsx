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

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText(/Status: completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: upcoming/i)).toBeInTheDocument();
  });

  it('renders no appointments message when none exist', () => {
    render(<DayColumn date={date} appointments={[]} />);
    expect(screen.getByText(/No appointments/i)).toBeInTheDocument();
  });

  it('formats the date correctly', () => {
    render(<DayColumn date={date} appointments={[]} />);
    expect(screen.getByText('Tuesday 06/10')).toBeInTheDocument();
  });

  it('renders appointments in chronological order', () => {
    render(<DayColumn date={date} appointments={appointments} />);
    const appointmentElements = screen.getAllByText(/Status:/i);
    expect(appointmentElements[0]).toHaveTextContent('Status: completed');
    expect(appointmentElements[1]).toHaveTextContent('Status: upcoming');
  });

  it('renders the correct number of AppointmentCard components', () => {
    const { container } = render(<DayColumn date={date} appointments={appointments} />);
    // Each AppointmentCard has a className containing 'bg-gray-50'
    const cards = container.querySelectorAll('[class*="bg-gray-50"]');
    expect(cards.length).toBe(appointments.length);
  });
});
