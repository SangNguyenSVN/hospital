// src/components/dashboard/Dashboard.tsx
import React from "react";
import styles from "./Dashboard.module.scss";
import { useRouter } from 'next/navigation'; // Import useRouter từ next/navigation
import authService from "@/app/src/services/authService"; // Đường dẫn tới dịch vụ xác thực

const itemDashboard = [
  { id: 1, name: 'Doctor', path: '/admin/dashboard/doctor' },
  { id: 2, name: 'Patient', path: '/admin/dashboard/patient' },
  { id: 3, name: 'Appointment', path: '/admin/dashboard/appointment' },
  { id: 4, name: 'Status', path: '/admin/dashboard/status' },
  { id: 5, name: 'Medicine', path: '/admin/dashboard/medicine' },
  { id: 6, name: 'Hospital', path: '/admin/dashboard/hospital' },
];

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter(); // Khởi tạo router

  const handleLogout = async () => {
    await authService.logout(); 
    localStorage.clear(); // Hoặc sessionStorage.clear();
    router.replace('/admin/login'); 
  };

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
          <li>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button> {/* Nút đăng xuất */}
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
