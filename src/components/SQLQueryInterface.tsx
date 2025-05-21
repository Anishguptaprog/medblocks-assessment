'use client';

import { useState } from 'react';
import {createDatabase} from '../db/database';
import { SQLResult } from '../types/query';
type SQLQueryInterfaceProps = {
  db: ReturnType<typeof import('../db/database').createDatabase>;
};
const db = createDatabase();
export const SQLQueryInterface: React.FC<SQLQueryInterfaceProps> = ({ db })  => {
  const [query, setQuery] = useState('SELECT * FROM patients');
  const [results, setResults] = useState<SQLResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'register' | 'patients' | 'sql'>('sql');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = db.executeRawQuery(query);
      setResults(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div className="p-4">Initializing database...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          {/* <h1 className="text-3xl font-bold text-gray-800">Patient Registration System</h1>
          <p className="text-gray-600">Frontend-only app with PGLite storage</p> */}
        </div>
      </header>

      

      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">SQL Query Interface</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block mb-2">Enter SQL Query:</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded p-3 font-mono"
              rows={6}
              placeholder="SELECT * FROM patients"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Execute Query
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <pre className="mt-2 text-sm">{error}</pre>
          </div>
        )}

        {results && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            {results.message && (
              <p className="mb-2 text-sm">{results.message}</p>
            )}

            {results.rows && results.rows.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      {Object.keys(results.rows[0]).map(key => (
                        <th key={key} className="px-4 py-2 border bg-gray-100">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.rows.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((value, j) => (
                          <td key={j} className="px-4 py-2 border">
                            {value !== null ? String(value) : 'NULL'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No results returned</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

