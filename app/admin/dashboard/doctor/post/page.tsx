"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../../src/styles/update.module.scss';
import apiDoctor from '@/app/src/services/apiDoctor';
import {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateDate,
} from '@/app/src/services/Validated';
import apiHospital from '@/app/src/services/apiHospital';

interface Doctor {
  fullname: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber: string;
  gender?: string;
  specialty?: string;
  dateOfBirth?: string;
  hospital: string;
  address?: string;
  image?: string;
}

const CreateDoctorPage: React.FC = () => {
  const router = useRouter();
  const [hospitalData, setHospital] = useState<[]>([]);
  const [doctorData, setDoctorData] = useState<Doctor>({
    fullname: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    gender: "",
    specialty: "",
    dateOfBirth: "",
    hospital: "",
    address: "",
    image: "",
  });

  const getHospital = async () => {
    try {
      const response = await apiHospital.getHospital();
      setHospital(response.data);
    } catch (error) {
      console.log("Error fetching hospitals: ", error);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  const [errors, setErrors] = useState<Partial<Record<keyof Doctor, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFullnameChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, fullname: value }));
    setErrors((prevErrors) => ({ ...prevErrors, fullname: undefined }));
  };

  const handleUsernameChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, username: value }));
    setErrors((prevErrors) => ({ ...prevErrors, username: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, password: value }));
    setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
  };

  const handleEmailChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, email: value }));
    setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
  };

  const handlePhoneNumberChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, phoneNumber: value }));
    setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: undefined }));
  };

  const handleGenderChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, gender: value }));
    setErrors((prevErrors) => ({ ...prevErrors, gender: undefined }));
  };

  const handleSpecialtyChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, specialty: value }));
    setErrors((prevErrors) => ({ ...prevErrors, specialty: undefined }));
  };

  const handleDateOfBirthChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, dateOfBirth: value }));
    setErrors((prevErrors) => ({ ...prevErrors, dateOfBirth: undefined }));
  };

  const handleAddressChange = (value: string) => {
    setDoctorData((prevData) => ({ ...prevData, address: value }));
    setErrors((prevErrors) => ({ ...prevErrors, address: undefined }));
  };

  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDoctorData((prevData) => ({ ...prevData, hospital: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, hospital: undefined }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDoctorData((prevData: any) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
      setDoctorData((prevData: any) => ({
        ...prevData,
        image: "",
      }));
    }
  };

  const validateInputs = () => {
    const newErrors: Partial<Record<keyof Doctor, string>> = {};
    if (!validateName(doctorData.fullname)) {
      newErrors.fullname = 'Tên không được để trống';
    }
    if (!validateEmail(doctorData.email || '')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!validatePhoneNumber(doctorData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (!validatePassword(doctorData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa và chữ thường';
    }
    if (!validateDate(doctorData.dateOfBirth || '')) {
      newErrors.dateOfBirth = 'Ngày sinh không được để trống';
    }
    if (!doctorData.hospital) {
      newErrors.hospital = 'Vui lòng chọn bệnh viện';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateDoctor = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const newDoctorData: any = {
        username: doctorData.username,
        phoneNumber: doctorData.phoneNumber,
        email: doctorData.email,
        gender: doctorData.gender,
        specialty: doctorData.specialty,
        dateOfBirth: doctorData.dateOfBirth,
        fullname: doctorData.fullname,
        address: doctorData.address,
        password: doctorData.password,
        hospital: doctorData.hospital, // ID bệnh viện được chọn
        image: doctorData.image,
      };
      console.log(newDoctorData);
      const response = await apiDoctor.createDoctor(newDoctorData);
      alert(response.message);
      console.log(response);

    } catch (error: any) {
      console.error('Error creating doctor:', error);
      alert(error.message || 'Tạo bác sĩ thất bại');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tạo Mới Bác Sĩ</h1>

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
          value={doctorData.fullname}
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
          value={doctorData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder="Nhập tên người dùng"
          className={styles.input}
        />
        {errors.username && <span className={styles.error}>{errors.username}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Mật Khẩu:</label>
        <input
          type="password"
          value={doctorData.password}
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
          value={doctorData.email || ''}
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
          value={doctorData.phoneNumber || ''}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder="Nhập số điện thoại"
          className={styles.input}
        />
        {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Giới Tính:</label>
        <select
          value={doctorData.gender || ''}
          onChange={(e) => handleGenderChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Chuyên Khoa:</label>
        <input
          type="text"
          value={doctorData.specialty || ''}
          onChange={(e) => handleSpecialtyChange(e.target.value)}
          placeholder="Nhập chuyên khoa"
          className={styles.input}
        />
        {errors.specialty && <span className={styles.error}>{errors.specialty}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Ngày Sinh:</label>
        <input
          type="date"
          value={doctorData.dateOfBirth || ''}
          onChange={(e) => handleDateOfBirthChange(e.target.value)}
          className={styles.input}
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Bệnh Viện:</label>
        <select
          value={doctorData.hospital}
          onChange={handleHospitalChange}
          className={styles.select}
        >
          <option value="">Chọn bệnh viện</option>
          {hospitalData.map((hospital: any) => (
            <option key={hospital._id} value={hospital._id}>
              {hospital.name}
            </option>
          ))}
        </select>
        {errors.hospital && <span className={styles.error}>{errors.hospital}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Địa Chỉ:</label>
        <input
          type="text"
          value={doctorData.address || ''}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Nhập địa chỉ"
          className={styles.input}
        />
        {errors.address && <span className={styles.error}>{errors.address}</span>}
      </div>

      <button onClick={handleCreateDoctor} className={styles.submitButton}>
        Tạo Bác Sĩ
      </button>
    </div>
  );
};

export default CreateDoctorPage;
