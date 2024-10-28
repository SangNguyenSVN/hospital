"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiAppointment from '../../services/apiAppoitment';
import styles from '../styles/status.module.scss'; // Đảm bảo bạn có file styles tương ứng
import Popup from '../../components/shared/PopUp/PopUp'; // Giả sử bạn đã có Popup component

interface Doctor {
  _id: string;
  fullname: string;
  username: string;
  password: string; // Nên xem xét bảo mật, không nên lưu trữ password trong frontend
  phoneNumber: string;
  // Bạn có thể thêm các thuộc tính khác nếu cần
}

interface Package {
  createdAt: string;
  description: string;
  hospital: string;
  name: string;
  price: number;
  services: string[]; // Mảng các dịch vụ
  updatedAt: string;
}

interface Status {
  _id: string;
  name: string;
}

interface Appointment {
  _id: string;
  createdAt: string;
  date: string; // Ngày cuộc hẹn
  doctor: Doctor; // Thông tin bác sĩ
  email: string;
  fullname: string; // Tên bệnh nhân
  notes: string; // Ghi chú
  package: Package; // Gói khám
  phoneNumber: string; // Số điện thoại bệnh nhân
  reason: string; // Lý do cuộc hẹn
  status: Status; // Trạng thái cuộc hẹn
  time: string; // Thời gian cuộc hẹn
  updatedAt: string; // Thời gian cập nhật
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
      const response = await apiAppointment.getAppointment(); // Gọi API để lấy danh sách cuộc hẹn
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleConfirmDelete = async () => {

  };

  const openPopup = (id: string) => {
    setSelectedAppointmentId(id);
    setIsPopupOpen(true);
  };

  // Navigate to the update screen with the selected appointment ID
  const handleUpdateClick = (appointment: Appointment) => {
    
  };

  const handleAddAppointmentClick = () => {
    router.push(`/admin/dashboard/appointment/post`);
  };

  return (
    <div>
      <h1>Appointment Management</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <h2>Current Appointments:</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Index</th>
            <th className={styles.th}>Patient Name</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Phone Number</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment: Appointment, index) => (
            <tr key={appointment._id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{appointment.fullname}</td>
              <td className={styles.td}>{appointment.date}</td>
              <td className={styles.td}>{appointment.phoneNumber}</td> {/* Thay đổi để hiển thị số điện thoại */}
              <td className={styles.td}>
                <button
                  onClick={() => openPopup(appointment._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdateClick(appointment)}
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
        onClick={handleAddAppointmentClick}
        className={styles.addButton}
      >
        Add Appointment
      </button>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Confirm Deletion"
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure you want to delete this appointment?</p>
      </Popup>
    </div>
  );
};

export default AppointmentScreen;
