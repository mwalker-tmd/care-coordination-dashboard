import { render, screen } from '@testing-library/react';
import { AppointmentCard } from '../../../../src/features/appointments/AppointmentCard';
import { Appointment } from '../../../../src/types/appointment';

describe('AppointmentCard', () => {
  const createMockAppointment = (status: Appointment['status']): Appointment => ({
    id: '1',
    patientName: 'John Doe',
    time: '10:00 AM',
    status
  });

  it('renders appointment information correctly', () => {
    const mockAppointment = createMockAppointment('upcoming');
    render(<AppointmentCard appointment={mockAppointment} />);

    // Check for patient name
    expect(screen.getByTestId('appointment-patient-name')).toHaveTextContent('John Doe');

    // Check for time
    expect(screen.getByTestId('appointment-time')).toHaveTextContent('10:00 AM');

    // Check for status text
    expect(screen.getByTestId('appointment-status')).toHaveTextContent(/upcoming/i);
  });

  it('renders different statuses correctly', () => {
    const statuses: Appointment['status'][] = ['upcoming', 'completed', 'cancelled'];
    
    statuses.forEach(status => {
      const mockAppointment = createMockAppointment(status);
      const { unmount } = render(<AppointmentCard appointment={mockAppointment} />);
      
      expect(screen.getByTestId('appointment-status')).toHaveTextContent(new RegExp(status, 'i'));
      unmount();
    });
  });

  it('renders all required appointment information', () => {
    const mockAppointment = createMockAppointment('upcoming');
    render(<AppointmentCard appointment={mockAppointment} />);

    // Check that all appointment fields are rendered
    expect(screen.getByTestId('appointment-patient-name')).toHaveTextContent(mockAppointment.patientName);
    expect(screen.getByTestId('appointment-time')).toHaveTextContent(mockAppointment.time);
    expect(screen.getByTestId('appointment-status')).toHaveTextContent(new RegExp(mockAppointment.status, 'i'));
  });

  it('applies the correct Tailwind classes', () => {
    const mockAppointment = createMockAppointment('upcoming');
    render(<AppointmentCard appointment={mockAppointment} />);
    const card = screen.getByTestId('appointment-card');
    
    // Check for the main Tailwind classes
    expect(card).toHaveClass('bg-gray-50');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-gray-300');
    expect(card).toHaveClass('shadow-sm');
    expect(card).toHaveClass('transition');
    expect(card).toHaveClass('hover:bg-gray-100');
    expect(card).toHaveClass('hover:shadow-md');
  });
});
