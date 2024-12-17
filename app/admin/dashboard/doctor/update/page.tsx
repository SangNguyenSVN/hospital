"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../../src/styles/update.module.scss';
import apiDoctor from '@/app/src/services/apiDoctor'; // Assuming you have apiDoctor service
import { validateName, validateEmail, validatePhoneNumber, validateDate, validatePassword } from '@/app/src/services/Validated';
import apiHospital from '@/app/src/services/apiHospital';

interface DoctorUpdateData {
  _id: string;
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

const UpdateDoctorPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hospital, setHospital] = useState<{ _id: string; name: string }[]>([]);
  const [hospitalById, setHospitalById] = useState<any>("");

  const initialDoctorData = searchParams.get('doctor');
  const doctor: DoctorUpdateData = initialDoctorData ? JSON.parse(decodeURIComponent(initialDoctorData)) : null;
  if (!doctor) {
    router.push('/admin/dashboard/doctor');
    return null;
  }

  const [doctorData, setDoctorData] = useState<DoctorUpdateData>({
    _id: doctor._id,
    fullname: doctor.fullname || "",
    username: doctor.username || "",
    password: doctor.password || "",
    email: doctor.email || "",
    phoneNumber: doctor.phoneNumber || "",
    gender: doctor.gender || "",
    specialty: doctor.specialty || "",
    dateOfBirth: doctor.dateOfBirth || "",
    hospital: doctor.hospital || "",
    address: doctor.address || "",
    image: doctor.image || "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DoctorUpdateData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(typeof doctor.image === 'string' ? doctor.image : null);

  const formattedDateOfBirth = doctorData.dateOfBirth
    ? new Date(doctorData.dateOfBirth).toISOString().split('T')[0]
    : '';

  const getHospital = async () => {
    try {
      const response = await apiHospital.getHospital();
      setHospital(response.data);
    } catch (error) {
      console.log("Error fetching hospital data: ", error);
    }
  };
  const getHospitalById = async () => {
    try {
      const response = await apiHospital.getHospitalByID(doctor.hospital);
      setHospitalById(response.data);
    } catch (error) {
      console.log("Error fetching hospital data: ", error);
    }
  };
  useEffect(() => {
    if (doctor) {
      getHospital();
      getHospitalById()
    }
  }, [doctor]);

  const handleHospitalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHospitalId = e.target.value;
    const selectedHospital = hospital.find(h => h._id === selectedHospitalId);
    setDoctorData((prevData) => ({
      ...prevData,
      hospital: selectedHospital || hospitalById._id,
    }));
  };

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
    const newErrors: Partial<Record<keyof DoctorUpdateData, string>> = {};
    if (!validateName(doctorData.fullname)) {
      newErrors.fullname = 'Tên không được để trống';
    }
    if (!validateEmail(doctorData.email || '')) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!validatePhoneNumber(doctorData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    if (doctorData.password && !validatePassword(doctorData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa và chữ thường';
    }
    if (!validateDate(doctorData.dateOfBirth || '')) {
      newErrors.dateOfBirth = 'Ngày sinh không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateDoctor = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const updatedDoctorData = {
        username: doctorData.username,
        phoneNumber: doctorData.phoneNumber,
        email: doctorData.email,
        gender: doctorData.gender,
        specialty: doctorData.specialty,
        dateOfBirth: doctorData.dateOfBirth,
        fullname: doctorData.fullname,
        address: doctorData.address,
        password: doctorData.password,
        image: doctorData.image,
        hospital: doctorData.hospital, // Pass the hospital ID
      };
      console.log(updatedDoctorData);

      const response = await apiDoctor.updateDoctor(doctorData._id, updatedDoctorData);
      alert(response.message);

      router.push('/admin/dashboard/doctor');
    } catch (error: any) {
      console.error('Error updating doctor:', error);
      alert(error.message || 'Cập nhật bác sĩ thất bại');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cập Nhật Bác Sĩ</h1>

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
          type="email"
          value={doctorData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Nhập email"
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Số Điện Thoại:</label>
        <input
          type="tel"
          value={doctorData.phoneNumber}
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
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Chuyên Khoa:</label>
        <input
          type="text"
          value={doctorData.specialty}
          onChange={(e) => handleSpecialtyChange(e.target.value)}
          placeholder="Nhập chuyên khoa"
          className={styles.input}
        />
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
          value={doctorData.address}
          onChange={(e) => handleAddressChange(e.target.value)}
          placeholder="Nhập địa chỉ"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Bệnh Viện:</label>
        <select
          value={hospitalById._id || ''}
          onChange={handleHospitalChange}
          className={styles.select}
        >
          {/* Show the current hospital name as the placeholder if available */}
          <option value="" disabled>
            {hospitalById.name || 'Chọn bệnh viện'}
          </option>
          {hospital.map((hosp) => (
            <option key={hosp._id} value={hosp._id}>
              {hosp.name}
            </option>
          ))}
        </select>
      </div>


      <button
        type="button"
        onClick={handleUpdateDoctor}
        className={styles.updateButton}
      >
        Cập Nhật Bác Sĩ
      </button>
    </div>
  );
};

export default UpdateDoctorPage;
