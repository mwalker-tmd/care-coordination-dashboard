import { create } from 'zustand';
import { Appointment } from '../../types/appointment';

interface AppointmentState {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
}

export const useAppointmentStore = create<AppointmentState>(set => ({
  appointments: [],
  setAppointments: appointments => set({ appointments }),
}));
