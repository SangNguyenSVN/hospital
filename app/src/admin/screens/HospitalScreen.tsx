"use client";

import React, { useState, useEffect } from 'react';
import apiHospital from '../../services/apiHospital';
import { useRouter } from 'next/navigation';
import styles from '../styles/shared.module.scss';  // Giữ nguyên đường dẫn đến shared.module.scss
import Popup from '../../components/shared/PopUp/PopUp';

interface Hospital {
  _id: string;
  name: string;
  location: string;
  phoneNumber: string;
}

const HospitalScreen: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);

  const router = useRouter();

  const getHospitals = async () => {
    setLoading(true);
    try {
      const response = await apiHospital.getHospital();
      setHospitals(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.error("Error in hospital screen:", error.message);
      setError("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedHospitalId) {
      try {
        await apiHospital.deleteHospital(selectedHospitalId);
        console.log("Deleted:", selectedHospitalId);
        getHospitals();
      } catch (error) {
        console.error('Error deleting hospital:', error);
        setError('Failed to delete hospital');
      } finally {
        setIsPopupOpen(false);
        setSelectedHospitalId(null);
      }
    }
  };

  const openPopup = (id: string) => {
    setSelectedHospitalId(id);
    setIsPopupOpen(true);
  };

  const handleUpdateClick = (hospital: Hospital) => {
    console.log(hospital);
    const encodedHospital = encodeURIComponent(JSON.stringify(hospital));
    router.push(`/admin/dashboard/hospital/update?hospital=${encodedHospital}`);
  };
 
  const handleAddHospitalClick = () => {
    router.push(`/admin/dashboard/hospital/post`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hospital Management</h1>

      {loading && <p className={styles.loading}>Loading hospitals...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <h2 className={styles.subtitle}>Current Hospitals:</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Index</th>
            <th className={styles.th}>Hospital Name</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Phone Number</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital, index) => (
            <tr key={hospital._id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{hospital.name}</td>
              <td className={styles.td}>{hospital.location}</td>
              <td className={styles.td}>{hospital.phoneNumber}</td>
              <td className={styles.td}>
                <button
                  onClick={() => handleUpdateClick(hospital)}
                  className={styles.updateButton}  // Giữ nguyên .button để sử dụng cho các nút
                >
                  Update
                </button>
                <button
                  onClick={() => openPopup(hospital._id)}
                  className={styles.deleteButton}  // Giữ nguyên .button để sử dụng cho các nút
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddHospitalClick}
        className={styles.addButton}  // Giữ nguyên .button cho nút Add Hospital
      >
        Add Hospital
      </button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Confirm Deletion"
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure you want to delete this hospital?</p>
      </Popup>
    </div>
  );
};

export default HospitalScreen;
