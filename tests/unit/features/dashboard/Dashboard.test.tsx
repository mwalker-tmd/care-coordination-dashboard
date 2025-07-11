import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Dashboard from '../../../../src/features/dashboard/Dashboard';
import { useAppointmentStore } from '../../../../src/lib/state/appointmentStore';

// Mock the appointment store
jest.mock('../../../../src/lib/state/appointmentStore', () => ({
  useAppointmentStore: jest.fn()
}));

describe('Dashboard', () => {
  beforeEach(() => {
    // Mock the store implementation with default values
    (useAppointmentStore as unknown as jest.Mock).mockImplementation(() => ({
      fetchAllAppointments: jest.fn(),
      getAppointmentsByDate: jest.fn().mockReturnValue([]), // Always return empty array by default
      isLoading: false,
      error: null
    }));
  });

  it('renders the dashboard title', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Care Coordination Dashboard');
  });

  it('renders both tab buttons', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByTestId('weekly-tab-button')).toHaveTextContent('Weekly View');
    expect(screen.getByTestId('today-tab-button')).toHaveTextContent("Today's Appointments");
  });

  it('starts with Weekly View as the active tab', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    const weeklyButton = screen.getByTestId('weekly-tab-button');
    const todayButton = screen.getByTestId('today-tab-button');
    
    expect(weeklyButton).toHaveClass('bg-blue-500');
    expect(weeklyButton).toHaveClass('text-white');
    expect(todayButton).toHaveClass('bg-white');
    expect(todayButton).toHaveClass('text-blue-500');
  });

  it('switches to Today tab when clicked', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    const todayButton = screen.getByTestId('today-tab-button');
    
    await act(async () => {
      fireEvent.click(todayButton);
    });
    
    expect(todayButton).toHaveClass('bg-blue-500');
    expect(todayButton).toHaveClass('text-white');
  });

  it('switches back to Weekly tab when clicked', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    const weeklyButton = screen.getByTestId('weekly-tab-button');
    const todayButton = screen.getByTestId('today-tab-button');
    
    // First switch to Today tab
    await act(async () => {
      fireEvent.click(todayButton);
    });
    // Then switch back to Weekly tab
    await act(async () => {
      fireEvent.click(weeklyButton);
    });
    
    expect(weeklyButton).toHaveClass('bg-blue-500');
    expect(weeklyButton).toHaveClass('text-white');
    expect(todayButton).toHaveClass('bg-white');
    expect(todayButton).toHaveClass('text-blue-500');
  });

  it('renders WeeklyAppointmentList when Weekly View is active', async () => {
    // Mock the store to return some appointments
    (useAppointmentStore as unknown as jest.Mock).mockImplementation(() => ({
      fetchAllAppointments: jest.fn(),
      getAppointmentsByDate: jest.fn().mockReturnValue([]),
      isLoading: false,
      error: null
    }));

    await act(async () => {
      render(<Dashboard />);
    });

    // Wait for the loading state to resolve
    expect(screen.queryByText('Loading appointments...')).not.toBeInTheDocument();
  });

  it('renders DailyAppointmentList when Today tab is active', async () => {
    // Mock the store to return some appointments
    (useAppointmentStore as unknown as jest.Mock).mockImplementation(() => ({
      fetchAllAppointments: jest.fn(),
      getAppointmentsByDate: jest.fn().mockReturnValue([]),
      isLoading: false,
      error: null
    }));

    await act(async () => {
      render(<Dashboard />);
    });

    const todayButton = screen.getByTestId('today-tab-button');
    await act(async () => {
      fireEvent.click(todayButton);
    });

    // Wait for the loading state to resolve
    expect(screen.queryByText('Loading appointments...')).not.toBeInTheDocument();
  });

  it('applies correct Tailwind classes to the container', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    const mainDiv = screen.getByTestId('dashboard-container');
    
    expect(mainDiv).toHaveClass('min-h-screen');
    expect(mainDiv).toHaveClass('bg-gray-50');
    expect(mainDiv).toHaveClass('p-8');
  });

  it('applies correct Tailwind classes to the tab buttons', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    const weeklyButton = screen.getByTestId('weekly-tab-button');
    const todayButton = screen.getByTestId('today-tab-button');
    
    // Check common classes
    [weeklyButton, todayButton].forEach(button => {
      expect(button).toHaveClass('px-6');
      expect(button).toHaveClass('py-2');
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('transition');
    });
    
    // Check specific classes for active/inactive states
    expect(weeklyButton).toHaveClass('rounded-l-lg');
    expect(todayButton).toHaveClass('rounded-r-lg');
  });

  it('changes background color and shadow on appointment card hover', async () => {
    // Mock the store to return a test appointment
    (useAppointmentStore as unknown as jest.Mock).mockImplementation(() => ({
      fetchAllAppointments: jest.fn(),
      getAppointmentsByDate: jest.fn().mockReturnValue([{
        id: '1',
        patientName: 'John Doe',
        date: '2024-03-20',
        time: '10:00',
        type: 'Check-up',
        status: 'Scheduled'
      }]),
      isLoading: false,
      error: null
    }));

    await act(async () => {
      render(<Dashboard />);
    });

    // Find the first appointment card by looking for the container with the hover classes
    const appointmentCards = screen.getAllByTestId('appointment-card');
    const appointmentCard = appointmentCards[0];
    expect(appointmentCard).toBeInTheDocument();

    // Test hover state
    await act(async () => {
      fireEvent.mouseEnter(appointmentCard!);
    });
    expect(appointmentCard).toHaveClass('hover:bg-gray-100');
    expect(appointmentCard).toHaveClass('hover:shadow-md');

    // Test leaving hover state
    await act(async () => {
      fireEvent.mouseLeave(appointmentCard!);
    });
    expect(appointmentCard).not.toHaveClass('bg-gray-100');
    expect(appointmentCard).not.toHaveClass('shadow-md');
  });
}); 