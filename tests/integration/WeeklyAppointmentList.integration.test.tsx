import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { WeeklyAppointmentList } from '../../src/features/appointments/WeeklyAppointmentList';

// Mock data
const mockAppointments = [
  { id: '1', patientName: 'Alice Johnson', time: '2025-06-10T09:00:00Z', status: 'completed' }, // Tuesday
  { id: '2', patientName: 'Bob Smith', time: '2025-06-10T10:30:00Z', status: 'upcoming' },   // Tuesday
  { id: '3', patientName: 'Carol White', time: '2025-06-12T13:00:00Z', status: 'cancelled' }, // Thursday
];

// Mock the store
jest.mock('../../src/lib/state/appointmentStore', () => ({
  useAppointmentStore: () => ({
    appointments: mockAppointments,
    setAppointments: jest.fn(),
  }),
}));

// Mock Date to always return a Sunday for 'today'
const realDate = Date;
beforeAll(() => {
  global.Date = class extends Date {
    constructor(...args: any[]) {
      if (args.length === 0) {
        // Mock today as Sunday, June 8, 2025
        super('2025-06-08T12:00:00Z');
      } else {
        super(...args as [any]);
      }
    }
  } as DateConstructor;
});
afterAll(() => {
  global.Date = realDate;
});

describe('WeeklyAppointmentList', () => {
  it('renders appointments correctly across the weekly view', () => {
    render(<WeeklyAppointmentList />);

    // Validate day headers exist
    expect(screen.getByText(/Sunday/)).toBeInTheDocument();
    expect(screen.getByText(/Monday/)).toBeInTheDocument();
    expect(screen.getByText(/Tuesday/)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/)).toBeInTheDocument();
    expect(screen.getByText(/Thursday/)).toBeInTheDocument();
    expect(screen.getByText(/Friday/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday/)).toBeInTheDocument();

    // Validate appointments display inside correct day columns
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Carol White')).toBeInTheDocument();
  });

  it('renders empty state when there are no appointments for the week', () => {
    jest.resetModules();
    jest.doMock('../../src/lib/state/appointmentStore', () => ({
      useAppointmentStore: () => ({
        appointments: [],
        setAppointments: jest.fn(),
      }),
    }));
    // Re-require after mocking
    const { WeeklyAppointmentList: EmptyWeeklyAppointmentList } = require('../../src/features/appointments/WeeklyAppointmentList');
    render(<EmptyWeeklyAppointmentList />);
    expect(screen.getAllByText(/No appointments/i).length).toBe(7);
  });

  it('renders only the correct appointments in each day column', () => {
    render(<WeeklyAppointmentList />);
    // Find all day columns by their header
    const tuesdayColumn = screen.getByText('Tuesday 06/10').closest('div');
    const thursdayColumn = screen.getByText('Thursday 06/12').closest('div');

    // Check that Tuesday column contains Alice Johnson and Bob Smith
    expect(within(tuesdayColumn!).getByText('Alice Johnson')).toBeInTheDocument();
    expect(within(tuesdayColumn!).getByText('Bob Smith')).toBeInTheDocument();
    // Should not contain Carol White
    expect(within(tuesdayColumn!).queryByText('Carol White')).toBeNull();

    // Check that Thursday column contains Carol White
    expect(within(thursdayColumn!).getByText('Carol White')).toBeInTheDocument();
    // Should not contain Alice Johnson or Bob Smith
    expect(within(thursdayColumn!).queryByText('Alice Johnson')).toBeNull();
    expect(within(thursdayColumn!).queryByText('Bob Smith')).toBeNull();
  });
});

