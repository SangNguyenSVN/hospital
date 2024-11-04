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
      <Dashboard>
        {children} {/* Hiển thị nội dung con */}
      </Dashboard>
    </div>
  )
}

export default layout 