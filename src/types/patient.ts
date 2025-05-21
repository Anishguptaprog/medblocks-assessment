export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  email?: string;
  phone?: string;
  insurance_provider?: string;
  insurance_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientFormData extends Omit<Patient, 'id' | 'created_at' | 'updated_at'> {}
