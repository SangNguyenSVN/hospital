"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "@/node_modules/next/navigation";
import styles from '../../../../src/styles/post.module.scss';
import apiAppointment from "@/app/src/services/apiAppoitment";

interface AppointmentData {
  doctor: string; // ID bác sĩ (có thể nên đổi tên thành doctorId để nhất quán)
  package?: string; // ID gói (có thể nên đổi tên thành packageId để nhất quán)
  time: string;
  date: string;
  notes?: string;
  fullname: string;
  email: string;
  phoneNumber: string;
}


function AddAppointmentPage() {
  const [doctorList, setDoctorList] = useState<any[]>([]); // Mảng chứa danh sách bác sĩ
  const [hospital, setHospital] = useState<any[]>([]); // Mảng chứa danh sách bệnh viện
  const [selectedHospital, setSelectedHospital] = useState<string>(""); // ID bệnh viện được chọn
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(""); // ID của bác sĩ được chọn
  const [selectedPackageId, setPackageTypeId] = useState<string>(""); // ID của gói dịch vụ
  const [packages, setPackages] = useState<any[]>([]); // Mảng chứa danh sách gói dịch vụ
  const [selectedTime, setTime] = useState<string>("");
  const [selectedDate, setAppointmentDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const router = useRouter();

  // Lấy danh sách bệnh viện khi component được mount
  const getHospital = async () => {
    try {
      const response = await apiAppointment.getHospitals();
      setHospital(response.data);
      console.log("hospitals: ", response.data)
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  // Hàm xử lý khi chọn bệnh viện
  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hospitalId = e.target.value;
    setSelectedHospital(hospitalId);
    // Lấy thông tin bác sĩ và gói dịch vụ từ bệnh viện được chọn
    const selectedHospitalData = hospital.find(h => h._id === hospitalId);
    console.log("data benh vien da chon: ", selectedHospitalData)
    if (selectedHospitalData) {
      console.log("thong tin bac si:", selectedHospitalData.doctors)
      setDoctorList(selectedHospitalData.doctors || []);

      setPackages(selectedHospitalData.packages || []);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newAppointment: AppointmentData = {
        doctor: selectedDoctorId, // ID của bác sĩ
        package: selectedPackageId, // ID của gói dịch vụ
        time: selectedTime,
        date: selectedDate,
        notes: notes,
        fullname: fullname,
        email: email,
        phoneNumber: phoneNumber,
    };
    console.log("data truyen di:", newAppointment);
    try {
        await apiAppointment.createAppointment(newAppointment);
        alert("Appointment added successfully");
        router.push("/admin/dashboard/appointment");
    } catch (error) {
        console.error("Error adding appointment:", error);
        alert("Failed to add appointment");
    }
};


  return (
    <div className={styles.container}>
      <h1>Add New Appointment</h1>
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
            onChange={(e) => setSelectedDoctorId(e.target.value)} // Lưu ID bác sĩ
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
            onChange={(e) => setPackageTypeId(e.target.value)} // Lưu ID gói dịch vụ
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
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointmentPage;
