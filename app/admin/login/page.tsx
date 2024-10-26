// src/app/admin/login/page.tsx
"use client"; // Đánh dấu file này là client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Sử dụng next/navigation
import { Button } from '@/components/ui/button'; // Thay đổi đường dẫn nếu cần
import styles from './login.module.scss'; // Đường dẫn đến file CSS
import authService from "@/app/src/services/authService";

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
        router.push('/admin/dashboard');
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.container_item}>
          <input
            className={styles.txt_input}
            placeholder="Email"
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className={styles.container_item}>
          <input
            className={styles.txt_input}
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.container_item}>
          <Button type='submit' className={styles.button}>
            <p className={styles.button_text}>Login</p>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default login