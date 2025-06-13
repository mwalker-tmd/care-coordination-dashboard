import { create } from 'zustand';
import { Appointment } from '../../types/appointment';
import { fetchAppointments } from '../api/client';

interface AppointmentStore {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  fetchAllAppointments: () => Promise<void>;
  getAppointmentsByDate: (date: Date) => Appointment[];
  getAppointmentsForWeek: (weekStart: Date) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  isLoading: false,
  error: null,

  fetchAllAppointments: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await fetchAppointments();
      set({ appointments: data, isLoading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, isLoading: false });
      } else {
        set({ error: 'Failed to fetch appointments', isLoading: false });
      }
    }
  },

  getAppointmentsByDate: (date: Date) => {
    const appointments = get().appointments;
    return appointments.filter(appt => {
      const apptDate = new Date(appt.time);
      return (
        apptDate.getFullYear() === date.getFullYear() &&
        apptDate.getMonth() === date.getMonth() &&
        apptDate.getDate() === date.getDate()
      );
    });
  },

  getAppointmentsForWeek: (weekStart: Date) => {
    const appointments = get().appointments;
    return appointments.filter(appt => {
      const apptDate = new Date(appt.time);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      return apptDate >= weekStart && apptDate < weekEnd;
    });
  },
}));
