"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '../../../../src/styles/post.module.scss';
import apiAppointment from "@/app/src/services/apiAppoitment";
import apiService from "@/app/src/services/apiService";

interface AppointmentData {
  doctor: string;
  package?: string;
  time: string;
  date: any;
  notes?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}

interface StatusData {
  _id: string;
  name: string;
}

function UpdateAppointmentPage() {
  const [formData, setFormData] = useState<AppointmentData>({
    doctor: '',
    package: '',
    time: '',
    date: '',
    notes: '',
    fullname: '',
    email: '',
    phoneNumber: ''
  });
  const [doctorList, setDoctorList] = useState<any[]>([]);
  const [hospital, setHospital] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [status, setStatus] = useState<StatusData[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [appointmentId, setAppointmentId] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentData = searchParams.get('appointment');  // Get appointment data from query params

  const getStatus = async () => {
    const data = await apiService.getStatuses();
    setStatus(data.data);
    console.log("status data: ",data.data)
  };

  useEffect(() => {
    getStatus();
    if (appointmentData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(appointmentData));
        console.log("data appointment", parsedData)
        setAppointmentId(parsedData._id);
        setFormData({
          doctor: parsedData.doctor || '',
          package: parsedData.package || '',
          time: parsedData.time || '',
          date: parsedData.date,
          notes: parsedData.notes || '',
          fullname: parsedData.fullname || '',
          email: parsedData.email || '',
          phoneNumber: parsedData.phoneNumber || ''
        });
      } catch (error) {
        console.error("Error parsing appointment data:", error);
      }
    }
    getHospital();
  }, [appointmentData]); // This effect depends on appointmentData

  // Fetch hospital data
  const getHospital = async () => {
    try {
      const response = await apiAppointment.getHospitals();
      setHospital(response.data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  // Update form data when hospital changes
  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
    const selectedHospitalData = hospital.find(h => h._id === hospitalId);
    if (selectedHospitalData) {
      setDoctorList(selectedHospitalData.doctors || []);
      setPackages(selectedHospitalData.packages || []);
    }
  };

  // Handle form data change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Ensure time is in HH:mm format
    if (name === 'time') {
      const [hour, minute] = value.split(':');
      const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      setFormData(prevData => ({
        ...prevData,
        [name]: formattedTime
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    console.log("id ", appointmentId)
    console.log("data update", formData)
    // try {
    //   // Call API to update the appointment
    //   await apiAppointment.updateAppointment(appointmentId, formData);
    //   console.log("Appointment updated successfully");
    //   // Redirect to another page if necessary
    //   router.push('/appointments');
    // } catch (error) {
    //   console.error("Error updating appointment:", error);
    // }
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
