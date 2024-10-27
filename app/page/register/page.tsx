"use client"
import React, { useState } from 'react'
import styles from './register.module.scss'
import { Button } from '@/components/ui/button';

const page = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className={styles.container_item}>
          <input
            className={styles.txt_input}
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.container_item}>
          <input
            className={styles.txt_input}
            placeholder="Email"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <p className={styles.button_text}>Register</p>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default page