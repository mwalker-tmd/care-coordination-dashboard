import { Patient } from '../../types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    dateOfBirth: '2003-05-12',
    contactInfo: { phone: '555-111-2222', email: 'alice.johnson@example.com' },
    primaryCareTeam: 'Dr. Morales',
    conditions: ['Asthma'],
  },
  {
    id: '2',
    name: 'Bob Smith',
    dateOfBirth: '2000-08-21',
    contactInfo: { phone: '555-333-4444', email: 'bob.smith@example.com' },
    primaryCareTeam: 'Dr. Lee',
    conditions: ['Anxiety Disorder'],
  },
  {
    id: '3',
    name: 'Carol White',
    dateOfBirth: '2005-11-03',
    contactInfo: { phone: '555-555-6666', email: 'carol.white@example.com' },
    primaryCareTeam: 'Dr. Nguyen',
    conditions: ['ADHD'],
  },
  {
    id: '4',
    name: 'Vignesh Kumar',
    dateOfBirth: '2002-02-17',
    contactInfo: { phone: '555-777-8888', email: 'vignesh.kumar@example.com' },
    primaryCareTeam: 'Dr. Kim',
    conditions: ['Depression'],
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    dateOfBirth: '2001-09-29',
    contactInfo: { phone: '555-999-0000', email: 'maria.rodriguez@example.com' },
    primaryCareTeam: 'Dr. Patel',
    conditions: ['Generalized Anxiety Disorder'],
  },
  {
    id: '6',
    name: 'Amina Hassan',
    dateOfBirth: '2004-06-05',
    contactInfo: { phone: '555-121-3434', email: 'amina.hassan@example.com' },
    primaryCareTeam: 'Dr. Parker',
    conditions: ['Social Phobia'],
  },
  {
    id: '7',
    name: 'David Chen',
    dateOfBirth: '2003-12-15',
    contactInfo: { phone: '555-565-7878', email: 'david.chen@example.com' },
    primaryCareTeam: 'Dr. Adams',
    conditions: ['Bipolar II Disorder'],
  },
];

export async function fetchPatients(): Promise<Patient[]> {
  // ✅ Async interface allows future backend integration
  return Promise.resolve(mockPatients);
}
