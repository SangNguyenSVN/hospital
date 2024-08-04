"use client";
import React from 'react'
import { useState } from 'react';
import { redirect } from 'next/navigation'
import auth from '@/app/src/services/auth';
import { Button } from '@/components/ui/button';
import styles from './login.module.scss'
const login = () => {

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    // try {
    //   const response = await auth.loginWithAuth({ identifier, password });
    //   console.log("Login Successful", response.data);
    //   alert("Login Successful");
    //   redirect('../');
    // } catch (error: any) {
    //   alert("Login Failed")
    //   console.log(error)

    // } 
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
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
          <Button className={styles.button}>
            <p className={styles.button_text}>Login</p>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default login