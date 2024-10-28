"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiService from '@/app/src/services/apiService';
import styles from '../../../../src/styles/update.module.scss';

const UpdateStatusPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    const initialName = searchParams.get('name') || '';
    const [statusName, setStatusName] = useState<string>(initialName);

    const handleUpdateStatus = async () => {
        if (!id) return;
        try {
            await apiService.updateStatus(id, { name: statusName });
            alert('Status updated successfully!');
            router.push('/admin/dashboard/status');
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Update Status</h1>
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
            <button onClick={handleUpdateStatus} className={styles.button}>
                Update Status
            </button>
        </div>
    );
};

export default UpdateStatusPage;
