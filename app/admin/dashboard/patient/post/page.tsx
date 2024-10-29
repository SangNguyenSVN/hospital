"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../../src/styles/post.module.scss';
import apiPatient from '@/app/src/services/apiPatient';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validateDate,
  validatePassword,
} from '@/app/src/services/Validated'; // Import các hàm validate

interface PatientCreateData {
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

const PostPatientPage: React.FC = () => {
  const router = useRouter();

  const [patientData, setPatientData] = useState<PatientCreateData>({
    fullname: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Xử lý thay đổi input và xác thực
  const handleInputChange = (field: keyof PatientCreateData, value: string) => {
    setPatientData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    // Xác thực từng trường khi nhập liệu
    switch (field) {
      case 'fullname':
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname: validateName(value) ? '' : 'Tên không được để trống',
        }));
        break;
      case 'email':
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: validateEmail(value) ? '' : 'Email không hợp lệ',
        }));
        break;
      case 'phoneNumber':
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: validatePhoneNumber(value) ? '' : 'Số điện thoại không hợp lệ',
        }));
        break;
      case 'dateOfBirth':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: validateDate(value) ? '' : 'Ngày sinh không được để trống',
        }));
        break;
      case 'password':
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: validatePassword(value) ? '' : 'Mật khẩu cần ít nhất 12 ký tự, bao gồm cả chữ hoa và chữ thường',
        }));
        break;
    }
  };

  // Xử lý chọn hình ảnh và xem trước
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPatientData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
      setPatientData((prevData) => ({
        ...prevData,
        image: null,
      }));
    }
  };

  // Xử lý tạo bệnh nhân
  const handleCreatePatient = async () => {
    // Kiểm tra tính hợp lệ của tất cả các trường trước khi gửi
    if (
      validateName(patientData.fullname) &&
      validateEmail(patientData.email || '') &&
      validatePhoneNumber(patientData.phoneNumber) &&
      validateDate(patientData.dateOfBirth || '') &&
      validatePassword(patientData.password)
    ) {
      try {
        const formData:any = new FormData();
        if (patientData.image) {
          formData.append('image', patientData.image, patientData.image.name);
        }
        formData.append('fullname', patientData.fullname);
        formData.append('username', patientData.username);
        formData.append('password', patientData.password);
        formData.append('phoneNumber', patientData.phoneNumber);
        if (patientData.email) formData.append('email', patientData.email);
        if (patientData.gender) formData.append('gender', patientData.gender);
        if (patientData.dateOfBirth) formData.append('dateOfBirth', patientData.dateOfBirth);
        if (patientData.address) formData.append('address', patientData.address);

        const response = await apiPatient.createPatient(formData);

        alert(response.message);
        router.push('/admin/dashboard/patient');
      } catch (error: any) {
        console.error('Error creating patient:', error);
        alert(error.message || 'Tạo bệnh nhân thất bại');
      }
    } else {
      alert('Vui lòng điền đầy đủ và đúng thông tin!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thêm Bệnh Nhân</h1>

      {/* Upload Ảnh */}
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

      {/* Các Trường Thông Tin Khác */}
      {['fullname', 'username', 'password', 'email', 'phoneNumber', 'gender', 'dateOfBirth', 'address'].map((field) => (
        <div className={styles.formGroup} key={field}>
          <label className={styles.label}>{field.replace(/([A-Z])/g, ' $1')}: </label>
          <input
            type={field === 'dateOfBirth' ? 'date' : 'text'}
            value={patientData[field as keyof PatientCreateData] || ''}
            onChange={(e) => handleInputChange(field as keyof PatientCreateData, e.target.value)}
            placeholder={`Nhập ${field}`}
            className={styles.input}
          />
          {errors[field as keyof PatientCreateData] && (
            <p className={styles.error}>{errors[field as keyof PatientCreateData]}</p>
          )}
        </div>
      ))}

      {/* Nút Tạo Mới */}
      <button onClick={handleCreatePatient} className={styles.button}>
        Create Patient
      </button>
    </div>
  );
};

export default PostPatientPage;
