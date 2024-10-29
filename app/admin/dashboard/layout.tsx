"use client";
import Dashboard from '@/app/src/components/shared/Dashboard/Dashboard';
import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import styles from './dashboard.module.scss'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      router.replace('/admin/login');
    } 
  }, [router]);


  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Admin</h1> 
      </header>
      <Dashboard> 
        {children} {/* Hiển thị nội dung con */}
      </Dashboard>
      <footer className={styles.footer}> 
        <p>Design by Cookies Beak</p>
      </footer>
    </div>
  )
}

export default layout 