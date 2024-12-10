"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiAppointment from '../../services/apiAppoitment';
import styles from '../styles/shared.module.scss'; // Import style chung
import Popup from '../../components/shared/PopUp/PopUp';

interface Appointment {
  _id: string;
  fullname: string;
  email: string;
  status: {
    _id: string;
    name: string;
  };
}

const AppointmentScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const router = useRouter();

  const getAppointments = async () => {
    setLoading(true);
    try {
      const response = await apiAppointment.getAppointment();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedAppointmentId) {
      try {
        await apiAppointment.deleteAppointment(selectedAppointmentId);
        getAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        setError('Failed to delete appointment. Please try again later.');
      } finally {
        setIsPopupOpen(false);
        setSelectedAppointmentId(null);
      }
    }
  };

  const openPopup = (id: string) => {
    setSelectedAppointmentId(id);
    setIsPopupOpen(true);
  };

  const handleUpdateClick = (appointment: Appointment) => {
    router.push(`/admin/dashboard/appointment/update?id=${appointment._id}&fullname=${encodeURIComponent(appointment.fullname)}&email=${encodeURIComponent(appointment.email)}`);
  };

  const handleAddAppointmentClick = () => {
    router.push(`/admin/dashboard/appointment/post`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Management</h1>
      {loading && <p className={styles.loading}>Loading appointments...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <h2 className={styles.subtitle}>Current Appointments:</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Index</th>
            <th className={styles.th}>Full Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{appointment.fullname}</td>
              <td className={styles.td}>{appointment.email}</td>
              <td className={styles.td}>{appointment.status.name}</td>
              <td className={styles.td}>
                <button onClick={() => openPopup(appointment._id)} className={styles.deleteButton}>Delete</button>
                <button onClick={() => handleUpdateClick(appointment)} className={styles.updateButton}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddAppointmentClick} className={styles.addButton}>Add Appointment</button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Confirm Deletion" onConfirm={handleConfirmDelete}>
        <p>Are you sure you want to delete this appointment?</p>
      </Popup>
    </div>
  );
};

export default AppointmentScreen;
