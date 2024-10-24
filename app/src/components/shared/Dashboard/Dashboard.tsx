// src/components/dashboard/Dashboard.tsx
import React from "react";
import styles from "./Dashboard.module.scss";

const itemDashboard = [
  { id: 1, name: 'Overview', path: '/admin/dashboard/overview' },
  { id: 2, name: 'Doctor', path: '/admin/dashboard/doctor' },
  { id: 3, name: 'Patient', path: '/admin/dashboard/patient' },
  { id: 4, name: 'Appointment', path: '/admin/dashboard/appointment' },
  { id: 5, name: 'Status', path: '/admin/dashboard/status' },
  { id: 6, name: 'Medicine', path: '/admin/dashboard/medicine' },
  { id: 7, name: 'Hospital', path: '/admin/dashboard/hospital' },
  { id: 8, name: 'Settings', path: '/admin/dashboard/settings' },
  { id: 9, name: 'Logout', path: '/logout' },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <ul>
          {/* Nhóm các item chính */}
          <div className={styles.mainItems}>
            {itemDashboard.slice(0, 7).map((item) => (
              <li key={item.id}>
                <a href={item.path}>{item.name}</a>
              </li>
            ))}
          </div>
          <hr className={styles.divider} />
          {/* Nhóm các item phụ */}
          <div className={styles.secondaryItems}>
            {itemDashboard.slice(7).map((item) => (
              <li key={item.id}>
                <a href={item.path}>{item.name}</a>
              </li>
            ))}
          </div>
        </ul>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
