// src/app/admin/login/page.tsx
"use client"; // Đánh dấu file này là client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Sử dụng next/navigation
import { Button } from '@/components/ui/button'; // Thay đổi đường dẫn nếu cần
import styles from './login.module.scss'; // Đường dẫn đến file CSS
import authService from "@/app/src/services/authService";
import MedicineScreen from "@/app/src/admin/screens/MedicineScreen";

const login = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await authService.loginAdmin(identifier, password);
      console.log(response)
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user);

        router.replace('/admin/dashboard');
      } else {
        setError('Login failed: Invalid credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Login error:', err);
    }
  };
  return (
    <div className={styles.container}>
     <MedicineScreen/>
    </div>
  )
}

export default login