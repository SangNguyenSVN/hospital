"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiPatient from '../../services/apiPatient';
import styles from '../styles/patient.module.scss'; // Thay đổi tên file CSS nếu cần
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
        const patientData = encodeURIComponent(JSON.stringify(patient));
        router.push(`/admin/dashboard/patient/update?patient=${patientData}`);
    };
    

    const handleAddPatientClick = () => {
        router.push(`/admin/dashboard/patient/post`);
    };

    return (
        <div>
            <h1>Patient Management</h1>

            {loading && <p>Loading patients...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <h2>Current Patients:</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Index</th>
                        <th className={styles.th}>Full Name</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Phone Number</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient: Patient, index) => (
                        <tr key={patient._id}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{patient.fullname}</td>
                            <td className={styles.td}>{patient.email}</td>
                            <td className={styles.td}>{patient.phoneNumber}</td>
                            <td className={styles.td}>
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
                className={styles.addButton}
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
