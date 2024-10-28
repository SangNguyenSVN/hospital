"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../../src/styles/update.module.scss';
import apiPatient from '@/app/src/services/apiPatient';

interface PatientUpdateData {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
  image?: File | null;
}

const UpdatePatientPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy dữ liệu bệnh nhân từ URL params
  const initialPatientData = JSON.parse(searchParams.get('patient') || '{}') as PatientUpdateData;
  const id = initialPatientData._id;

  const [patientData, setPatientData] = useState<PatientUpdateData>({
    ...initialPatientData,
    image: null, // Khởi tạo ảnh ban đầu là null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialPatientData.image instanceof File ? URL.createObjectURL(initialPatientData.image) : null
  );
  const formattedDateOfBirth = patientData.dateOfBirth
    ? new Date(patientData.dateOfBirth).toISOString().split('T')[0]
    : '';
  const handleInputChange = (field: keyof PatientUpdateData, value: string) => {
    setPatientData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        console.log(file); // Kiểm tra đối tượng file
        if (file instanceof File) {
            setPatientData((prevData: any) => ({
                ...prevData,
                image: file.name, // Lưu tên file
            }));
            setImagePreview(URL.createObjectURL(file)); // Xem trước ảnh
        } else {
            console.error('Đối tượng không phải là file:', file);
        }
    } else {
        setImagePreview(null); // Reset ảnh xem trước nếu không có file
    }
};

  const handleUpdatePatient = async () => {
    try {
      const imageUri = patientData.image ? URL.createObjectURL(patientData.image) : undefined;
      const imageType = patientData.image ? patientData.image.type : undefined;

      const response = await apiPatient.updatePatient(id, {
        username: patientData.username,
        password: patientData.password,
        phoneNumber: patientData.phoneNumber,
        email: patientData.email,
        gender: patientData.gender,
        dateOfBirth: patientData.dateOfBirth,
        fullname: patientData.fullname,
        address: patientData.address,
      }, imageUri, imageType);

      // Handle successful update (e.g., navigate back or show success message)
      alert(response.message);
      router.push('/admin/dashboard/patient'); // Navigate to the patients list page
    } catch (error: any) {
      console.error('Error updating patient:', error);
      alert(error.message || 'Cập nhật bệnh nhân thất bại');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Patient</h1>

      {/* Phần Upload Hình Ảnh */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        {imagePreview && <img src={imagePreview} alt="Profile Preview" className={styles.imagePreview} />}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name:</label>
        <input
          type="text"
          value={patientData.fullname}
          onChange={(e) => handleInputChange('fullname', e.target.value)}
          placeholder="Enter full name"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Username:</label>
        <input
          type="text"
          value={patientData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder="Enter username"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          value={patientData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Enter password"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={patientData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Phone Number:</label>
        <input
          type="text"
          value={patientData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          placeholder="Enter phone number"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Gender:</label>
        <input
          type="text"
          value={patientData.gender || ''}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          placeholder="Enter gender"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Date of Birth:</label>
        <input
          type="date"
          value={formattedDateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={styles.input}
        />
      </div>


      <div className={styles.formGroup}>
        <label className={styles.label}>Address:</label>
        <input
          type="text"
          value={patientData.address || ''}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter address"
          className={styles.input}
        />
      </div>

      <button onClick={handleUpdatePatient} className={styles.button}>
        Update Patient
      </button>
    </div>
  );
};

export default UpdatePatientPage;
