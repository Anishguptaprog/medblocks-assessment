# 🏥 Patient Registry App

A lightweight, fully client-side patient registration system with live multi-tab sync and SQL query support using a mock database engine.

Built using **React**, **TypeScript**, **TailwindCSS**, and **Pglite** with `BroadcastChannel` for real-time synchronization.

---

## 📸 Features

| Feature                     | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| **Patient Form**           | Register new patients and store their data locally                         |
| **Patient List**           | View all registered patients with real-time updates                        |
| **SQL Query Interface**    | Execute mock SQL queries (SELECT, INSERT, UPDATE) in the browser           |
| **Tabbed Navigation**      | Switch easily between Register, List, and SQL Query views                  |
| **Sync Across Tabs**       | Live updates across multiple tabs using `BroadcastChannel`                 |
| **Persistent Storage**     | Patient data is saved in browser localStorage                              |
| **Tailwind Styling**       | Clean, responsive, and modern UI using TailwindCSS                         |

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js v16 or above
- npm or yarn

### 📦 Installation

```bash
git clone https://github.com/Anishguptaprog/medblocks-assessment.git
cd patient-registration
npm install
```
# ▶️ Run the App
```bash
npm start  # For Create React App
```
Open your browser at `http://localhost:3000`

# 🧭 Usage
## 📋 Register Patients

- Fill out the patient form
- Submit to save data locally and sync to other open tabs

## 📄 View Patient List

- Browse all registered patients
- Updated automatically when new data is added in another tab

## 💻 SQL Query Interface

- Navigate to the SQL tab (if added in UI)
- Run simple SQL queries like:
```sql
SELECT * FROM patients;
SELECT * FROM patients WHERE name = 'John';
```
only supports basic SELECT, INSERT, and UPDATE statements.

# 📁 Project Structure
```pgsql
src/
├── components/
│   ├── PatientForm.tsx
│   ├── PatientList.tsx
│   └── SQLQueryInterface.tsx
├── db/
│   └── mockDatabase.ts
├── types/
│   ├── patient.ts
│   └── query.ts
├── App.tsx
└── index.tsx
```
# 💻Tech Stack
 - ReactJS with TypeScript
  
 - TailwindCSS for styling
  
 - localStorage for data persistence
  
 - BroadcastChannel API for multi-tab sync
  
 - Mock SQL query parser

# Challenges Faced

| Problem                          | Solution                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| Live synchronization across tabs | Used `BroadcastChannel` for push updates                            |
| SQL parsing in frontend          | Implemented a basic query interpreter with string parsing           |
| Styling consistency              | Unified UI with Tailwind utility classes                            |
| Handling async DB init           | Added loading state while database initializes                      |
| Supporting real-time UI updates  | Triggered events via `window.dispatchEvent` for component refreshes |

# Git Commit History
```pgsql
1. Initialize project using Create React App
2. Define DB schema and mock implementation
3. Create patient registration form component
4. Implement patient list view with live updates
5. Add SQL query interface for raw query execution
6. Refactor App.tsx to support multi-tab navigation
7. Apply consistent and modern Tailwind CSS styling
```

# 👨‍💻 Author
Built by Anish Gupta
