import { useState } from 'react';
import { PatientFormData } from '../types/patient';

interface Props {
  db: ReturnType<typeof import('../db/database').createDatabase>;
}

export const PatientForm: React.FC<Props> = ({ db }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    insurance_provider: '',
    insurance_id: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.date_of_birth) {
      setMessage({ type: 'error', text: 'First name, last name, and date of birth are required' });
      return;
    }

    try {
      db.addPatient(formData);
      setMessage({ type: 'success', text: 'Patient registered successfully!' });
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone: '',
        insurance_provider: '',
        insurance_id: ''
      });
      window.dispatchEvent(new CustomEvent('db-changed'));
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Failed to register patient: ' + err.message });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Patient Registration</h2>
      {message && (
        <div className={`p-4 mb-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        {/* You can map fields here for conciseness */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">First Name *</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Last Name *</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Date of Birth *</label>
            <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>
                  <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Insurance Provider</label>
              <input
                type="text"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Insurance ID</label>
              <input
                type="text"
                name="insurance_id"
                value={formData.insurance_id}
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};
