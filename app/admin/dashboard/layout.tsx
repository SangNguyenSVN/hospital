"use client"; // Đánh dấu file này là client component
import Dashboard from '@/app/src/components/shared/Dashboard/Dashboard';
import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from './dashboard.module.scss'

const layout = (
  { children, }
    : Readonly<{ children: React.ReactNode; }>
) => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push('/admin/login'); // Nếu không có user, quay lại trang đăng nhập
    }
  }, [router]);
  return (
    <div className={styles.dashboardContainer}> {/* Sử dụng class cho container */}
      <header className={styles.header}> {/* Header */}
        <h1>Admin</h1> {/* Tiêu đề trong Header */}
      </header>
      <Dashboard> {/* Nội dung chính */}
        {children} {/* Hiển thị nội dung con */}
      </Dashboard>
      <footer className={styles.footer}> {/* Footer */}
        <p>Design by Cookies Beak</p> {/* Nội dung trong Footer */}
      </footer>
    </div>
  )
}

export default layout 