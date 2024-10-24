// src/components/dashboard/Dashboard.tsx
import React from "react";
import styles from "./Dashboard.module.scss";

const itemDashboard = [
  { id: 1, name: 'Overview', path: '/admin/overview' },
  { id: 2, name: 'Doctor', path: '/admin/doctor' },
  { id: 3, name: 'Patient', path: '/admin/patient' },
  { id: 4, name: 'Appointments', path: '/admin/appointment' },
  { id: 5, name: 'Status', path: '/admin/status' },
  { id: 6, name: 'Medicine', path: '/admin/medicine' },
  { id: 7, name: 'Hospital', path: '/admin/hospital' },
  { id: 8, name: 'Settings', path: '/admin/settings' },
  { id: 9, name: 'Logout', path: '/logout' },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <ul>
          {itemDashboard.map((item) => (
            <li key={item.id}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
