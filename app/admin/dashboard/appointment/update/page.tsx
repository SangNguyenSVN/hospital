"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '../../../../src/styles/post.module.scss';
import apiAppointment from "@/app/src/services/apiAppoitment";
import apiService from "@/app/src/services/apiService";

interface AppointmentData {
  doctor: string;
  package?: string;
  status?: string;
  time: string;
  date: string;
  notes?: string;
  reason?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}

interface StatusData {
  _id: string;
  name: string;
}

function UpdateAppointmentPage() {
  const searchParams = useSearchParams();
  const appointmentData: any = searchParams.get('appointment');
  const parsedData: any = JSON.parse(decodeURIComponent(appointmentData));

  const [formData, setFormData] = useState<AppointmentData>({
    doctor: parsedData.doctor?._id || '',
    package: parsedData.package?._id || '',
    status: parsedData.status?._id || '',
    time: parsedData.time || '',
    date: new Date(parsedData.date).toISOString().split("T")[0] || '',
    notes: parsedData.notes || '',
    reason: parsedData.reason || '',
    fullname: parsedData.fullname || '',
    email: parsedData.email || '',
    phoneNumber: parsedData.phoneNumber || '',
  });

  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [hospital, setHospital] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [status, setStatus] = useState<StatusData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>(parsedData.doctor?.hospital || "");
  const appointmentId = parsedData._id;
  const router = useRouter();

  const getStatus = async () => {
    try {
      const data = await apiService.getStatuses();
      setStatus(data.data);
      console.log("status data: ", data.data);
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  const getHospital = async () => {
    try {
      const response = await apiAppointment.getHospitals();
      setHospital(response.data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  useEffect(() => {
    getStatus();
    getHospital();
  }, []);

  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
    const selectedHospitalData = hospital.find(h => h._id === hospitalId);
    if (selectedHospitalData) {
      setDoctorList(selectedHospitalData.doctors || []);
      setPackages(selectedHospitalData.packages || []);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusId = e.target.value;
    setFormData(prevData => ({ ...prevData, status: statusId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("data update: ", formData)
    try {
      await apiAppointment.updateAppointment(appointmentId, formData);
      console.log("Appointment updated successfully");
      router.push('/admin/dashboard/appointment');
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Appointment</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>Hospital:</label>
          <select
            name="hospital"
            value={selectedHospital}
            onChange={handleHospitalChange}
            required
          >
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
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            required
          >
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
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a package</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleStatusChange}
            required
          >
            <option value="">Select a Status</option>
            {status.map((status) => (
              <option key={status._id} value={status._id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formItem}>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formItem}>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formItem}>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formItem}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formItem}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formItem}>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Appointment
        </button>
      </form>
    </div>
  );
}

export default UpdateAppointmentPage;
