"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '../../../../src/styles/post.module.scss';
import apiAppointment from "@/app/src/services/apiAppoitment";

interface AppointmentData {
  doctor: string;
  package?: string;
  time: string;
  date: string;
  notes?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}

function UpdateAppointmentPage() {
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [hospital, setHospital] = useState<any[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedPackageId, setPackageTypeId] = useState<string>("");
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedTime, setTime] = useState<string>("");
  const [selectedDate, setAppointmentDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id"); // Lấy ID của lịch hẹn từ URL

  useEffect(() => {
    getHospital();
    if (appointmentId) {
      getAppointmentData();
    }
  }, [appointmentId]);

  // Lấy dữ liệu lịch hẹn theo ID
  const getAppointmentData = async () => {
    try {
      const response = await apiAppointment.getAppointmentById(appointmentId);
      const appointment = response.data;
      
      setSelectedHospital(appointment.hospitalId || "");
      setSelectedDoctorId(appointment.doctor || "");
      setPackageTypeId(appointment.package || "");
      setTime(appointment.time || "");
      setAppointmentDate(appointment.date || "");
      setNotes(appointment.notes || "");
      setFullname(appointment.fullname || "");
      setEmail(appointment.email || "");
      setPhoneNumber(appointment.phoneNumber || "");
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  // Lấy danh sách bệnh viện khi component được mount
  const getHospital = async () => {
    try {
      const response = await apiAppointment.getHospitals();
      setHospital(response.data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  // Hàm xử lý khi chọn bệnh viện
  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);

    const selectedHospitalData = hospital.find(h => h._id === hospitalId);
    if (selectedHospitalData) {
      setDoctorList(selectedHospitalData.doctors || []);
      setPackages(selectedHospitalData.packages || []);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedAppointment: AppointmentData = {
      doctor: selectedDoctorId,
      package: selectedPackageId,
      time: selectedTime,
      date: selectedDate,
      notes: notes,
      fullname: fullname,
      email: email,
      phoneNumber: phoneNumber,
    };

    try {
      await apiAppointment.updateAppointment(appointmentId, updatedAppointment);
      alert("Appointment updated successfully");
      router.push("/admin/dashboard/appointment");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Appointment</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>Hospital:</label>
          <select
            value={selectedHospital}
            onChange={handleHospitalChange}
            required>
            <option value="">Select a hospital</option>
            {hospital.map((hosp) => (
              <option key={hosp._id} value={hosp._id}>
                {hosp.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label>Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required>
            <option value="">Select a doctor</option>
            {doctorList.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label>Package:</label>
          <select
            value={selectedPackageId}
            onChange={(e) => setPackageTypeId(e.target.value)}
            required>
            <option value="">Select a package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required />
        </div>
        <div className={styles.formItem}>
          <label>Time:</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setTime(e.target.value)}
            required />
        </div>
        <div className={styles.formItem}>
          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required />
        </div>
        <div className={styles.formItem}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div className={styles.formItem}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default UpdateAppointmentPage;
