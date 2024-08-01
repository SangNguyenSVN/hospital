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
    try {
      const response = await auth.loginWithAuth({ identifier, password });
      console.log("Login Successful", response.data);
      alert("Login Successful");
      redirect('../');
    } catch (error: any) {
      alert("Login Failed")
      console.log(error)
      
    } 
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
         
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className={styles.button}>
          <p className={styles.button_text}>Login</p>
        </Button>
      </form>
    </div>
  )
}

export default login