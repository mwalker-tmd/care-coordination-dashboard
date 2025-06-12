import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppointmentCard } from '../../../src/features/appointments/AppointmentCard';
import { Appointment } from '../../../src/types/appointment';

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
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check for time
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();

    // Check for status text
    expect(screen.getByText(/Status: upcoming/i)).toBeInTheDocument();
  });

  it('renders different statuses correctly', () => {
    const statuses: Appointment['status'][] = ['upcoming', 'completed', 'cancelled'];
    
    statuses.forEach(status => {
      const mockAppointment = createMockAppointment(status);
      const { unmount } = render(<AppointmentCard appointment={mockAppointment} />);
      
      expect(screen.getByText(new RegExp(`Status: ${status}`, 'i'))).toBeInTheDocument();
      unmount();
    });
  });

  it('renders all required appointment information', () => {
    const mockAppointment = createMockAppointment('upcoming');
    render(<AppointmentCard appointment={mockAppointment} />);

    // Check that all appointment fields are rendered
    expect(screen.getByText(mockAppointment.patientName)).toBeInTheDocument();
    expect(screen.getByText(mockAppointment.time)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Status: ${mockAppointment.status}`, 'i'))).toBeInTheDocument();
  });
});
