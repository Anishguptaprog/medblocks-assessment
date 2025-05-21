import { useEffect, useState } from 'react';
import { createDatabase } from './db/database';
import { PatientForm } from './components/PatientForm';
import { PatientList } from './components/PatientList';
import {SQLQueryInterface} from './components/SQLQueryInterface';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'list' | 'sql'>('register');
  const [db, setDb] = useState<ReturnType<typeof createDatabase> | null>(null);

  useEffect(() => {
    setDb(createDatabase());
  }, []);

  if (!db) return <div className="text-center p-8 text-lg text-gray-500">Loading...</div>;
    const tabClass = (tab: string) =>
    `px-5 py-2 rounded-full text-sm font-semibold transition-all 
    ${activeTab === tab ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}`;
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Patient Registration System</h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setActiveTab('register')} className={tabClass('register')}>Register</button>
          <button onClick={() => setActiveTab('list')} className={tabClass('list')}>Patient List</button>
          <button onClick={() => setActiveTab('sql')} className={tabClass('sql')}>SQL Interface</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          {activeTab === 'register' && <PatientForm db={db} />}
          {activeTab === 'list' && <PatientList db={db} />}
          {activeTab === 'sql' && <SQLQueryInterface db={db} />}
        </div>
      </div>
    </div>
  );
};