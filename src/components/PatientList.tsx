import { useEffect, useState } from 'react';
import { Patient } from '../types/patient';

interface Props {
  db: ReturnType<typeof import('../db/database').createDatabase>;
}

export const PatientList: React.FC<Props> = ({ db }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

interface FormatDateFn {
    (dateStr: string | undefined | null): string;
}

const formatDate: FormatDateFn = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
};
  useEffect(() => {
    const loadPatients = () => {
      const data = db.getAllPatients();
      setPatients(data);
    };

    loadPatients();
    window.addEventListener('db-changed', loadPatients);
    return () => window.removeEventListener('db-changed', loadPatients);
  }, [db]);

  const filtered = patients.filter(p =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Patient List</h2>
        
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name or email"
            className="w-full p-2 border rounded"
          />
        </div>
        
        {filtered.length === 0 ? (
          <p className="text-gray-500">No patients found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border bg-gray-100">Name</th>
                  <th className="px-4 py-2 border bg-gray-100">Date of Birth</th>
                  <th className="px-4 py-2 border bg-gray-100">Gender</th>
                  <th className="px-4 py-2 border bg-gray-100">Contact</th>
                  <th className="px-4 py-2 border bg-gray-100">Insurance</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-4 py-2 border font-medium">
                      {patient.first_name} {patient.last_name}
                    </td>
                    <td className="px-4 py-2 border">{formatDate(patient.date_of_birth)}</td>
                    <td className="px-4 py-2 border">
                      {patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'Not specified'}
                    </td>
                    <td className="px-4 py-2 border">
                      {patient.email && <div>{patient.email}</div>}
                      {patient.phone && <div>{patient.phone}</div>}
                    </td>
                    <td className="px-4 py-2 border">
                      {patient.insurance_provider ? (
                        <div>
                          <div>{patient.insurance_provider}</div>
                          {patient.insurance_id && <div className="text-sm text-gray-500">ID: {patient.insurance_id}</div>}
                        </div>
                      ) : (
                        'None'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };