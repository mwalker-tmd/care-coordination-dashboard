import { create } from 'zustand';
import { Appointment } from '../../types/appointment';
import { fetchAppointments } from '../api/client';
import { parseISO } from 'date-fns';

interface AppointmentStore {
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;

  patientFilter: string | null;
  setPatientFilter: (filter: string | null) => void;

  fetchAllAppointments: () => Promise<void>;
  getAppointmentsByDate: (date: Date) => Appointment[];
  getAppointmentsForWeek: (weekStart: Date) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => {
  // Helper for patient name filtering
  const matchesPatientFilter = (patientName: string, patientFilter: string | null) => {
    if (!patientFilter) return true;
    return patientName.toLowerCase().includes(patientFilter.toLowerCase());
  };

  return {
    appointments: [],
    isLoading: false,
    error: null,

    patientFilter: null,
    setPatientFilter: (filter: string | null) => set({ patientFilter: filter }),

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
      const patientFilter = get().patientFilter;

      return appointments.filter(appt => {
        const apptDate = parseISO(appt.time);
        const dateMatch =
          apptDate.getFullYear() === date.getFullYear() &&
          apptDate.getMonth() === date.getMonth() &&
          apptDate.getDate() === date.getDate();

        const patientMatch = matchesPatientFilter(appt.patientName, patientFilter);

        return dateMatch && patientMatch;
      });
    },

    getAppointmentsForWeek: (weekStart: Date) => {
      const appointments = get().appointments;
      const patientFilter = get().patientFilter;
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);

      return appointments.filter(appt => {
        const apptDate = parseISO(appt.time);
        const inWeek = apptDate >= weekStart && apptDate < weekEnd;

        const patientMatch = matchesPatientFilter(appt.patientName, patientFilter);

        return inWeek && patientMatch;
      });
    },
  };
});
