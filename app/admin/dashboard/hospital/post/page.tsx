"use client";

import React, { useState, useEffect } from 'react';
import apiService from '@/app/src/services/apiService';
import styles from './post.module.scss';  // Import file SCSS
import apiHospital from '@/app/src/services/apiHospital';

interface HospitalCreate {
  image: string;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
  doctors: string[];
  departments: string[];
  medicines: string[];
  packages: string[];
}

const AddHospitalPage = () => {
  const [doctor, setDoctor] = useState([]);
  const [packages, setPackage] = useState([]);
  const [department, setDepartment] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [hospitalData, setHospitalData] = useState<HospitalCreate>({
    image: '',
    name: '',
    location: '',
    phoneNumber: '',
    email: '',
    doctors: [],
    departments: [],
    medicines: [],
    packages: [],
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    doctors: false,
    departments: false,
    medicines: false,
    packages: false,
  });

  // Fetch data functions
  const getDoctor = async () => {
    const data = await apiService.getDoctors();
    setDoctor(data.data);
  };

  const getPackage = async () => {
    const data = await apiService.getPackages();
    setPackage(data.data);
  };

  const getMedicine = async () => {
    const data = await apiService.getMedicines();
    setMedicine(data.data);
  };

  const getDepartment = async () => {
    const data = await apiService.getDepartments();
    setDepartment(data.data);
  };

  useEffect(() => {
    getDoctor();
    getDepartment();
    getMedicine();
    getPackage();
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof HospitalCreate) => {
    const { value, checked } = event.target;
    setHospitalData((prevData: any) => {
      const newValues = checked
        ? [...prevData[field], value]
        : prevData[field].filter((item: any) => item !== value);

      return {
        ...prevData,
        [field]: newValues,
      };
    });
  };

  const handleHospitalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHospitalData((prevData : any) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
      setHospitalData((prevData) => ({
        ...prevData,
        image: "",
      }));
    }
  };

  const renderTags = (selectedItems: string[], allItems: any[], field: keyof HospitalCreate) => {
    return selectedItems.map((itemId) => {
      const item = allItems.find((i: any) => i._id === itemId);
      return item ? (
        <span key={itemId} className={styles.tag}>
          {item.name || item.fullname}
        </span>
      ) : null;
    });
  };

  const toggleDropdown = (field: keyof HospitalCreate) => {
    setIsDropdownOpen((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(hospitalData);
    try{
      const response = await apiHospital.createHospital(hospitalData)
      console.log("data gui di thanh cong", response)
    }catch(error){
      console.log("loi khi post benh vien: ", error)
    }
  };
  return (
    <div className={styles.container}>
      <h2>Add New Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={styles.formInput}
          value={hospitalData.name}
          onChange={(e) => setHospitalData({ ...hospitalData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className={styles.formInput}
          value={hospitalData.location}
          onChange={(e) => setHospitalData({ ...hospitalData, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.formInput}
          value={hospitalData.phoneNumber}
          onChange={(e) => setHospitalData({ ...hospitalData, phoneNumber: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.formInput}
          value={hospitalData.email}
          onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
        />
        <input type="file" onChange={handleHospitalImageChange} />
        {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />}

        {/* Doctors */}
        <label className={styles.formLabel}>Doctors</label>
        <div>
          <button type="button" className={styles.button} onClick={() => toggleDropdown('doctors')}>
            Select Doctors
          </button>
          {isDropdownOpen.doctors && (
            <div className={styles.dropdown}>
              {doctor.map((doc: any) => (
                <div key={doc._id}>
                  <input
                    type="checkbox"
                    value={doc._id}
                    checked={hospitalData.doctors.includes(doc._id)}
                    onChange={(e) => handleCheckboxChange(e, 'doctors')}
                  />
                  <label>{doc.fullname}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <strong>Selected Doctors:</strong>
          {renderTags(hospitalData.doctors, doctor, 'doctors')}
        </div>

        {/* Departments */}
        <label className={styles.formLabel}>Departments</label>
        <div>
          <button type="button" className={styles.button} onClick={() => toggleDropdown('departments')}>
            Select Departments
          </button>
          {isDropdownOpen.departments && (
            <div className={styles.dropdown}>
              {department.map((dept: any) => (
                <div key={dept._id}>
                  <input
                    type="checkbox"
                    value={dept._id}
                    checked={hospitalData.departments.includes(dept._id)}
                    onChange={(e) => handleCheckboxChange(e, 'departments')}
                  />
                  <label>{dept.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <strong>Selected Departments:</strong>
          {renderTags(hospitalData.departments, department, 'departments')}
        </div>

        {/* Medicines */}
        <label className={styles.formLabel}>Medicines</label>
        <div>
          <button type="button" className={styles.button} onClick={() => toggleDropdown('medicines')}>
            Select Medicines
          </button>
          {isDropdownOpen.medicines && (
            <div className={styles.dropdown}>
              {medicine.map((med: any) => (
                <div key={med._id}>
                  <input
                    type="checkbox"
                    value={med._id}
                    checked={hospitalData.medicines.includes(med._id)}
                    onChange={(e) => handleCheckboxChange(e, 'medicines')}
                  />
                  <label>{med.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <strong>Selected Medicines:</strong>
          {renderTags(hospitalData.medicines, medicine, 'medicines')}
        </div>

        {/* Packages */}
        <label className={styles.formLabel}>Packages</label>
        <div>
          <button type="button" className={styles.button} onClick={() => toggleDropdown('packages')}>
            Select Packages
          </button>
          {isDropdownOpen.packages && (
            <div className={styles.dropdown}>
              {packages.map((pkg: any) => (
                <div key={pkg._id}>
                  <input
                    type="checkbox"
                    value={pkg._id}
                    checked={hospitalData.packages.includes(pkg._id)}
                    onChange={(e) => handleCheckboxChange(e, 'packages')}
                  />
                  <label>{pkg.name}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <strong>Selected Packages:</strong>
          {renderTags(hospitalData.packages, packages, 'packages')}
        </div>

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default AddHospitalPage;
