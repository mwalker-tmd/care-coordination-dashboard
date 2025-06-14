import { render, screen, fireEvent } from '@testing-library/react';
import { AppointmentFilter } from '../../../src/components/AppointmentFilter';
import { useAppointmentStore } from '../../../src/lib/state/appointmentStore';

jest.mock('../../../src/lib/state/appointmentStore', () => ({
  useAppointmentStore: jest.fn(),
}));

describe('AppointmentFilter', () => {
  it('renders input with value from store', () => {
    ((useAppointmentStore as unknown) as jest.Mock).mockReturnValue({
      patientFilter: 'Alice',
      setPatientFilter: jest.fn(),
    });
    render(<AppointmentFilter />);
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
  });

  it('calls setPatientFilter on input change', () => {
    const setPatientFilter = jest.fn();
    ((useAppointmentStore as unknown) as jest.Mock).mockReturnValue({
      patientFilter: '',
      setPatientFilter,
    });
    render(<AppointmentFilter />);
    fireEvent.change(screen.getByLabelText(/filter by patient/i), { target: { value: 'Bob' } });
    expect(setPatientFilter).toHaveBeenCalledWith('Bob');
  });

  it('clears the filter when input is cleared', () => {
    const setPatientFilter = jest.fn();
    ((useAppointmentStore as unknown) as jest.Mock).mockReturnValue({
      patientFilter: 'Alice',
      setPatientFilter,
    });
    render(<AppointmentFilter />);
    fireEvent.change(screen.getByLabelText(/filter by patient/i), { target: { value: '' } });
    expect(setPatientFilter).toHaveBeenCalledWith(null);
  });

  it('handles undefined patientFilter gracefully', () => {
    ((useAppointmentStore as unknown) as jest.Mock).mockReturnValue({
      patientFilter: undefined,
      setPatientFilter: jest.fn(),
    });
    render(<AppointmentFilter />);
    expect(screen.getByLabelText(/filter by patient/i)).toHaveValue('');
  });
}); 