"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from '@/node_modules/next/navigation';
import apiService from '../../services/apiService';
import styles from '../styles/status.module.scss';
import Popup from '../../components/shared/PopUp/PopUp';

interface Status {
    _id: string;
    name: string;
}

const StatusScreen: React.FC = () => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);

    const router = useRouter();

    const getStatuses = async () => {
        setLoading(true);
        try {
            const response = await apiService.getStatuses();
            setStatuses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            setError('Failed to fetch statuses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStatuses();
    }, []);

    const handleConfirmDelete = async () => {
        if (selectedStatusId) {
            try {
                await apiService.deleteStatus(selectedStatusId);
                console.log("Deleted:", selectedStatusId);
                getStatuses();
            } catch (error) {
                console.error('Error deleting status:', error);
                setError('Failed to delete status');
            } finally {
                setIsPopupOpen(false);
                setSelectedStatusId(null);
            }
        }
    };

    const openPopup = (id: string) => {
        setSelectedStatusId(id);
        setIsPopupOpen(true);
    };

    // Navigate to the update screen with the selected status ID
    const handleUpdateClick = (status: any) => {
        router.push(`/admin/dashboard/status/update?id=${status._id}&name=${encodeURIComponent(status.name)}`);
    };
    const handleAddStatusClick = () => {
        router.push(`/admin/dashboard/status/post`);
    };
    return (
        <div>
            <h1>Status Management</h1>

            {loading && <p>Loading statuses...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <h2>Current Statuses:</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Index</th>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {statuses.map((status: Status, index) => (
                        <tr key={status._id}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{status.name}</td>
                            <td className={styles.td}>
                                <button
                                    onClick={() => openPopup(status._id)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUpdateClick(status)}
                                    className={styles.updateButton}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={handleAddStatusClick}
                className={styles.addButton}
            >
                Add Status
            </button>
            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                title="Confirm Deletion"
                onConfirm={handleConfirmDelete}
            >
                <p>Are you sure you want to delete this status?</p>
            </Popup>
        </div>
    );
};

export default StatusScreen;
