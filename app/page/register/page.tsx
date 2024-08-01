"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import auth from '@/app/src/services/auth';

const register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await auth.registerWithAuth({ username, email, password });
      // Handle successful registration
      console.log("Registration Successful", response.data);
    } catch (error: any) {
      // Handle registration error
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  )
}

export default register