import { Patient, PatientFormData } from '../types/patient';

interface Database {
  addPatient: (data: PatientFormData) => Patient;
  getAllPatients: () => Patient[];
  getPatientById: (id: string) => Patient | undefined;
  updatePatient: (id: string, data: Partial<PatientFormData>) => Patient | null;
  executeRawQuery: (sql: string) => any;
}

export const createDatabase = (): Database => {
  let patients: Patient[] = [];
  let nextId = 1;

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem('patientData');
      if (stored) {
        patients = JSON.parse(stored);
        nextId = Math.max(...patients.map(p => parseInt(p.id)), 0) + 1;
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e);
    }
  };

  const saveToStorage = () => {
    try {
      localStorage.setItem('patientData', JSON.stringify(patients));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  loadFromStorage();

  const channel = new BroadcastChannel('patient_registry_sync');
  channel.onmessage = (event) => {
    if (event.data.type === 'DB_UPDATE') {
      patients = event.data.patients;
      window.dispatchEvent(new CustomEvent('db-changed'));
    }
  };

  return {
    addPatient(data: PatientFormData): Patient {
      const id = nextId++;
      const newPatient: Patient = {
        id: id.toString(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      patients.push(newPatient);
      saveToStorage();
      channel.postMessage({ type: 'DB_UPDATE', patients });
      return newPatient;
    },

    getAllPatients() {
      return [...patients];
    },

    getPatientById(id: string) {
      return patients.find(p => p.id === id);
    },

    updatePatient(id: string, data: Partial<PatientFormData>) {
      const index = patients.findIndex(p => p.id === id);
      if (index !== -1) {
        patients[index] = {
          ...patients[index],
          ...data,
          updated_at: new Date().toISOString()
        };
        saveToStorage();
        channel.postMessage({ type: 'DB_UPDATE', patients });
        return patients[index];
      }
      return null;
    },

    executeRawQuery(sql: string) {
      sql = sql.trim().toLowerCase();
      if (sql.startsWith('select')) {
        if (sql.includes('from patients')) {
          if (sql.includes('where')) {
            try {
              const whereClause = sql.split('where')[1].trim();
              const [field, value] = whereClause.split('=').map(s => s.trim());
              const cleanValue = value.replace(/['"]/g, '');
              const fieldName = field.includes('.') ? field.split('.')[1] : field;

              return {
                rows: patients.filter(p => (p as any)[fieldName] === cleanValue),
                rowCount: patients.length
              };
            } catch {
              throw new Error("Failed to parse WHERE clause");
            }
          }
          return { rows: patients, rowCount: patients.length };
        }
      } else if (sql.startsWith('insert')) {
        return { rows: [], rowCount: 1, message: "INSERT 0 1" };
      } else if (sql.startsWith('update')) {
        return { rows: [], rowCount: 1, message: "UPDATE 1" };
      }
      return { rows: [], rowCount: 0, message: "Query executed successfully" };
    }
  };
};
