"use client";
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import styles from './login.module.scss'
import Link from '@/node_modules/next/link';
const login = () => {

  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

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
        <div className={styles.container_item}>
          <Link href={"/page/register"}>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default login