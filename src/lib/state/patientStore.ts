import { create } from 'zustand';
import { Patient } from '../../types/patient';
import { fetchPatients } from '../api/patients';

export interface PatientStore {
  patients: Patient[];
  selectedPatientId: string | null;
  selectedPatient: Patient | null;
  fetchAllPatients: () => Promise<void>;
  setSelectedPatientId: (id: string) => void;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: [],
  selectedPatientId: null,
  selectedPatient: null,

  fetchAllPatients: async () => {
    const data = await fetchPatients();
    set({
      patients: data,
      selectedPatientId: data.length > 0 ? data[0].id : null,
      selectedPatient: data.length > 0 ? data[0] : null,
    });
  },

  setSelectedPatientId: (id: string) => {
    const patient = get().patients.find((p) => p.id === id) || null;
    set({ selectedPatientId: id, selectedPatient: patient });
  },
}));
