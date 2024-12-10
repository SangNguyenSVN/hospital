"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiDoctor from "../../services/apiDoctor";
import sharedStyles from "../styles/shared.module.scss"; 
import Popup from "../../components/shared/PopUp/PopUp";

interface Doctor {
  _id: string;
  fullname: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber: string;
  gender?: string;
  specialty?: string;
  dateOfBirth?: string;
  address?: string;
  image?: string;
}

const DoctorScreen: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const router = useRouter();

  const getDoctors = async () => {
    setLoading(true);
    try {
      const response = await apiDoctor.getDoctors();
      setDoctors(response.data);
    } catch (error) {
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedDoctorId) {
      try {
        await apiDoctor.deleteDoctor(selectedDoctorId);
        getDoctors();
      } catch (error) {
        setError("Failed to delete doctor");
      } finally {
        setIsPopupOpen(false);
        setSelectedDoctorId(null);
      }
    }
  };

  const openPopup = (id: string) => {
    setSelectedDoctorId(id);
    setIsPopupOpen(true);
  };

  const handleUpdateClick = (doctor: Doctor) => {
    const encodedDoctor = encodeURIComponent(JSON.stringify(doctor));
    router.push(`/admin/dashboard/doctor/update?doctor=${encodedDoctor}`);
  };

  const handleAddDoctorClick = () => {
    router.push(`/admin/dashboard/doctor/post`);
  };

  return (
    <div className={sharedStyles.container}>
      <h1 className={sharedStyles.title}>Doctor Management</h1>

      {loading && <p className={sharedStyles.loading}>Loading doctors...</p>}
      {error && <p className={sharedStyles.error}>{error}</p>}

      <h2 className={sharedStyles.subtitle}>Current Doctors:</h2>
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
          {doctors.map((doctor: Doctor, index) => (
            <tr key={doctor._id}>
              <td className={sharedStyles.td}>{index + 1}</td>
              <td className={sharedStyles.td}>{doctor.fullname}</td>
              <td className={sharedStyles.td}>{doctor.email}</td>
              <td className={sharedStyles.td}>{doctor.phoneNumber}</td>
              <td className={sharedStyles.td}>
                <button
                  onClick={() => openPopup(doctor._id)}
                  className={sharedStyles.deleteButton}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateClick(doctor)}
                  className={sharedStyles.updateButton}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddDoctorClick} className={sharedStyles.addButton}>
        Add Doctor
      </button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Confirm Deletion"
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure you want to delete this doctor?</p>
      </Popup>
    </div>
  );
};

export default DoctorScreen;
