"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiPatient from '../../services/apiPatient';
import styles from '../styles/patient.module.scss'; 
import sharedStyles from '../styles/shared.module.scss';  // Import shared styles
import Popup from '../../components/shared/PopUp/PopUp';

interface Patient {
    _id: string;
    fullname: string;
    username: string;
    password?: string; // Optional if you don’t need to fetch/display password
    email?: string;
    phoneNumber: string;
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    image?: string;
}

const PatientScreen: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    const router = useRouter();

    const getPatients = async () => {
        setLoading(true);
        try {
            const response = await apiPatient.getPatients();
            setPatients(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError('Failed to fetch patients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatients();
    }, []);

    const handleConfirmDelete = async () => {
        if (selectedPatientId) {
            try {
                await apiPatient.deletePatient(selectedPatientId);
                console.log("Deleted:", selectedPatientId);
                getPatients();
            } catch (error) {
                console.error('Error deleting patient:', error);
                setError('Failed to delete patient');
            } finally {
                setIsPopupOpen(false);
                setSelectedPatientId(null);
            }
        }
    };

    const openPopup = (id: string) => {
        setSelectedPatientId(id);
        setIsPopupOpen(true);
    };

    // Navigate to the update screen with the selected patient ID
    const handleUpdateClick = (patient: Patient) => {
        const encodedPatient = encodeURIComponent(JSON.stringify(patient));
        router.push(`/admin/dashboard/patient/update?patient=${encodedPatient}`);
    };

    const handleAddPatientClick = () => {
        router.push(`/admin/dashboard/patient/post`);
    };

    return (
        <div className={sharedStyles.container}>
            <h1 className={sharedStyles.title}>Patient Management</h1>

            {loading && <p className={sharedStyles.loading}>Loading patients...</p>}
            {error && <p className={sharedStyles.error}>{error}</p>}

            <h2 className={sharedStyles.subtitle}>Current Patients:</h2>
            <table className={sharedStyles.table}>
                <thead>
                    <tr>
                        <th className={sharedStyles.th}>Index</th>
                        <th className={sharedStyles.th}>Full Name</th>
                        <th className={sharedStyles.th}>Email</th>
                        <th className={sharedStyles.th}>Phone Number</th>
                        <th className={sharedStyles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient: Patient, index) => (
                        <tr key={patient._id}>
                            <td className={sharedStyles.td}>{index + 1}</td>
                            <td className={sharedStyles.td}>{patient.fullname}</td>
                            <td className={sharedStyles.td}>{patient.email}</td>
                            <td className={sharedStyles.td}>{patient.phoneNumber}</td>
                            <td className={sharedStyles.td}>
                                <button
                                    onClick={() => openPopup(patient._id)}
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUpdateClick(patient)}
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
                onClick={handleAddPatientClick}
                className={sharedStyles.button}
            >
                Add Patient
            </button>
            <Popup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                title="Confirm Deletion"
                onConfirm={handleConfirmDelete}
            >
                <p>Are you sure you want to delete this patient?</p>
            </Popup>
        </div>
    );
};

export default PatientScreen;
