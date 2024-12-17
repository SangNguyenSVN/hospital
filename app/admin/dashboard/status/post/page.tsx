"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/app/src/services/apiService';
import styles from '../../../../src/styles/post.module.scss';

const page: React.FC = () => {
    const [statusName, setStatusName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handlePostStatus = async () => {
        if (!statusName.trim()) {
            setError("Status name cannot be empty");
            return;
        }

        try {
            // Assume addStatus is defined in your apiService to POST data to the server
            await apiService.createStatus({ name: statusName });
            setSuccess("Status created successfully!");
            setError(null);
            setTimeout(() => router.push('/admin/dashboard/status'), 1500); // Redirect after a short delay
        } catch (error) {
            console.error('Error adding status:', error);
            setError('Failed to create status');
            setSuccess(null);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Add New Status</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <div className={styles.formGroup}>
                <label className={styles.label}>Status Name:</label>
                <input
                    type="text"
                    value={statusName}
                    onChange={(e) => setStatusName(e.target.value)}
                    placeholder="Enter new status name"
                    className={styles.input}
                />
            </div>
            <button onClick={handlePostStatus} className={styles.button}>
                Create Status
            </button>
        </div>
    );
};

export default page;
