"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

function AddAppointmentPage() {
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

  const getHospital = async () => {
    try {
      const response = await apiAppointment.getHospitals();
      setHospital(response.data);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  useEffect(() => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newAppointment: AppointmentData = {
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
      await apiAppointment.createAppointment(newAppointment);
      alert("Appointment added successfully");
      router.push("/admin/dashboard/appointment");
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add New Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Hospital:</label>
          <select
            className="form-select"
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
        <div className="mb-3">
          <label className="form-label">Doctor:</label>
          <select
            className="form-select"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
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
        <div className="mb-3">
          <label className="form-label">Package:</label>
          <select
            className="form-select"
            value={selectedPackageId}
            onChange={(e) => setPackageTypeId(e.target.value)}
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
        <div className="mb-3">
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time:</label>
          <input
            type="time"
            className="form-control"
            value={selectedTime}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Notes:</label>
          <textarea
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointmentPage;
