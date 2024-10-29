"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../../src/styles/update.module.scss';
import apiPatient from '@/app/src/services/apiPatient';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validateDate,
  validatePassword,
} from '@/app/src/services/Validated';

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
  image?: string ;
}

const UpdatePatientPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPatientData = searchParams.get('patient');
  const patient: PatientUpdateData = initialPatientData ? JSON.parse(decodeURIComponent(initialPatientData)) : null;

  if (!patient) {
    router.push('/admin/dashboard/patient');
    return null;
  }

  const [patientData, setPatientData] = useState<PatientUpdateData>({
    _id: patient._id,
    fullname: patient.fullname || "",
    username: patient.username || "",
    password: patient.password || "",
    email: patient.email || "",
    phoneNumber: patient.phoneNumber || "",
    gender: patient.gender || "",
    dateOfBirth: patient.dateOfBirth || "",
    address: patient.address || "",
    image: patient.image || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientUpdateData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(typeof patient.image === 'string' ? patient.image : null);

  const formattedDateOfBirth = patientData.dateOfBirth
    ? new Date(patientData.dateOfBirth).toISOString().split('T')[0]
    : '';

  const handleFullnameChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, fullname: value }));
    setErrors((prevErrors) => ({ ...prevErrors, fullname: undefined }));
  };

  const handleUsernameChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, username: value }));
    setErrors((prevErrors) => ({ ...prevErrors, username: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, password: value }));
    setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
  };

  const handleEmailChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, email: value }));
    setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, phoneNumber: value }));
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: undefined }));
  };

  const handleGenderChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, gender: value }));
    setErrors((prevErrors) => ({ ...prevErrors, gender: undefined }));
  };

  const handleDateOfBirthChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, dateOfBirth: value }));
    setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: undefined }));
  };

  const handleAddressChange = (value: string) => {
    setPatientData((prevData) => ({ ...prevData, address: value }));
    setErrors((prevErrors) => ({ ...prevErrors, address: undefined }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPatientData((prevData: any) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
      setPatientData((prevData: any) => ({
        ...prevData,
        image: "",
      }));
    }
  };

  const validateInputs = () => {
    const newErrors: Partial<Record<keyof PatientUpdateData, string>> = {};
    if (!validateName(patientData.fullname)) {
      newErrors.fullname = 'Tên không được để trống';
    }
    if (!validateEmail(patientData.email || '')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!validatePhoneNumber(patientData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (patientData.password && !validatePassword(patientData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa và chữ thường';
    }
    if (!validateDate(patientData.dateOfBirth || '')) {
      newErrors.dateOfBirth = 'Ngày sinh không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePatient = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const updatedPatientData = {
        username: patientData.username,
        phoneNumber: patientData.phoneNumber,
        email: patientData.email,
        gender: patientData.gender,
        dateOfBirth: patientData.dateOfBirth,
        fullname: patientData.fullname,
        address: patientData.address,
        password: patientData.password,
        image: patientData.image, // Chuyển đổi thành chuỗi base64 hoặc URL
      }; 
      console.log(updatedPatientData)

      const response = await apiPatient.updatePatient(patientData._id, updatedPatientData);
      alert(response.message);

      router.push('/admin/dashboard/patient');
    } catch (error: any) {
      console.error('Error updating patient:', error);
      alert(error.message || 'Cập nhật bệnh nhân thất bại');
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cập Nhật Bệnh Nhân</h1>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ảnh Đại Diện:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        {imagePreview && <img src={imagePreview} alt="Xem trước ảnh" className={styles.imagePreview} />}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Họ và Tên:</label>
        <input
          type="text"
          value={patientData.fullname}
          onChange={(e) => handleFullnameChange(e.target.value)}
          placeholder="Nhập họ và tên"
          className={styles.input}
        />
        {errors.fullname && <span className={styles.error}>{errors.fullname}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Tên Người Dùng:</label>
        <input
          type="text"
          value={patientData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder="Nhập tên người dùng"
          className={styles.input}
        />
        {errors.username && <span className={styles.error}>{errors.username}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Mật Khẩu:</label>
        <input
          type="password"  // Changed to password type for security
          value={patientData.password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Nhập mật khẩu"
          className={styles.input}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="text"
          value={patientData.email || ''}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Nhập email"
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Số Điện Thoại:</label>
        <input
          type="text"
          value={patientData.phoneNumber || ''}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder="Nhập số điện thoại"
          className={styles.input}
        />
        {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Giới Tính:</label>
        <select
          value={patientData.gender || ''}
          onChange={(e) => handleGenderChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Chọn giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ngày Sinh:</label>
        <input
          type="date"
          value={formattedDateOfBirth}
          onChange={(e) => handleDateOfBirthChange(e.target.value)}
          className={styles.input}
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Địa Chỉ:</label>
        <input
          type="text"
          value={patientData.address || ''}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Nhập địa chỉ"
          className={styles.input}
        />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
      </div>

      <button onClick={handleUpdatePatient} className={styles.button}>
        Cập Nhật
      </button>
    </div>
  );
};

export default UpdatePatientPage;
