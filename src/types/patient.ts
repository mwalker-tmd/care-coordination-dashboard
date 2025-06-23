export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  primaryCareTeam: string;
  conditions: string[];
}
