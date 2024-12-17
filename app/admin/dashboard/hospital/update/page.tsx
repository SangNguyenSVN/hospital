"use client"

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import apiService from "@/app/src/services/apiService";
import styles from "../post/post.module.scss";
import apiHospital from "@/app/src/services/apiHospital";

interface HospitalUpdate {
  image?: string;
  name: string;
  location?: string;
  phoneNumber: string;
  email?: string;
  doctors: string[];  // Store IDs of selected doctors
  departments: string[];  // Store IDs of selected departments
  medicines: string[];  // Store IDs of selected medicines
  packages: string[];  // Store IDs of selected packages
}

const Page = () => {
  const searchParams = useSearchParams();

  // Lấy thông tin bệnh viện từ URL params
  const hospitalInfo: any = searchParams.get("hospital");
  const hospitalData = hospitalInfo ? JSON.parse(decodeURIComponent(hospitalInfo)) : {};
  const hospitalId = hospitalData._id
  // Khởi tạo dữ liệu ban đầu từ hospitalData hoặc mặc định
  const [hospitalDataHolder, setHospitalDataHolder] = useState<HospitalUpdate>({
    image: hospitalData.image || "",
    name: hospitalData.name || "",
    location: hospitalData.location || "",
    phoneNumber: hospitalData.phoneNumber || "",
    email: hospitalData.email || "",
    doctors: hospitalData.doctors.map((doc: any) => doc._id) || [], 
    departments: hospitalData.departments.map((dept: any) => dept._id) || [],
    medicines: hospitalData.medicines.map((med: any) => med._id) || [],
    packages: hospitalData.packages.map((pkg: any) => pkg._id) || [],
  });

  const [doctor, setDoctor] = useState<any[]>([]);
  const [packages, setPackage] = useState<any[]>([]);
  const [department, setDepartment] = useState<any[]>([]);
  const [medicine, setMedicine] = useState<any[]>([]);

  const handleDoctors = hospitalData.doctors;
  const handleMedicines = hospitalData.medicines;
  const handlePackages = hospitalData.packages;
  const handleDepartments = hospitalData.departments;

  const [imagePreview, setImagePreview] = useState<string>(hospitalData.image || "");

  // Lấy dữ liệu từ API
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
  const handleHospitalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHospitalDataHolder((prevData : any) => ({
        ...prevData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
      setHospitalDataHolder((prevData) => ({
        ...prevData,
        image: "",
      }));
    }
  };
  useEffect(() => {
    getDoctor();
    getDepartment();
    getMedicine();
    getPackage();
  }, []);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data update: ", hospitalDataHolder);

    try {
      const response : any = await apiHospital.updateHospital(hospitalId, hospitalDataHolder)
      console.log(response)
      alert(response.message);
    } catch (error) {
      console.log('Error in page update: ', error)
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doctors" | "departments" | "medicines" | "packages"
  ) => {
    const { value, checked } = e.target;
    setHospitalDataHolder((prevData) => {
      const updatedItems = checked
        ? [...prevData[type], value]
        : prevData[type].filter((item) => item !== value);

      return { ...prevData, [type]: updatedItems };
    });
  };

  // Function to get the names of selected items by their ids
  const getSelectedNames = (
    selectedIds: any[],
    items: any[]
  ) => {
    return items
      .filter((item) => selectedIds.includes(item._id))
      .map((item) => item.name || item.fullname); // Ensure you're checking the correct field
  };

  return (
    <div className={styles.container}>
      <h2>Update Hospital</h2>
      <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleHospitalImageChange} />
      {imagePreview && <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />}
        <input
          type="text"
          placeholder="Name"
          className={styles.formInput}
          value={hospitalDataHolder.name}
          onChange={(e) =>
            setHospitalDataHolder({ ...hospitalDataHolder, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          className={styles.formInput}
          value={hospitalDataHolder.location || ""}
          onChange={(e) =>
            setHospitalDataHolder({ ...hospitalDataHolder, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          className={styles.formInput}
          value={hospitalDataHolder.phoneNumber}
          onChange={(e) =>
            setHospitalDataHolder({ ...hospitalDataHolder, phoneNumber: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.formInput}
          value={hospitalDataHolder.email || ""}
          onChange={(e) =>
            setHospitalDataHolder({ ...hospitalDataHolder, email: e.target.value })
          }
        />

        {/* Hiển thị checkbox cho các danh sách */}
        <div>
          <h3>Doctors:</h3>
          {doctor.map((item: any) => (
            <div key={item._id}>
              <label>
                <input
                  type="checkbox"
                  value={item._id}
                  checked={hospitalDataHolder.doctors.includes(item._id)} // Kiểm tra mục đã có trong holder chưa
                  onChange={(e) => handleCheckboxChange(e, "doctors")}
                />
                {item.fullname}
              </label>
            </div>
          ))}
          <div>
            <strong>Selected Doctors:</strong>
            {getSelectedNames(hospitalDataHolder.doctors, doctor).join(", ")}
          </div>

          <h3>Departments:</h3>
          {department.map((item: any) => (
            <div key={item._id}>
              <label>
                <input
                  type="checkbox"
                  value={item._id}
                  checked={hospitalDataHolder.departments.includes(item._id)} // Kiểm tra mục đã có trong holder chưa
                  onChange={(e) => handleCheckboxChange(e, "departments")}
                />
                {item.name}
              </label>
            </div>
          ))}
          <div>
            <strong>Selected Departments:</strong>
            {getSelectedNames(hospitalDataHolder.departments, department).join(", ")}
          </div>

          <h3>Medicines:</h3>
          {medicine.map((item: any) => (
            <div key={item._id}>
              <label>
                <input
                  type="checkbox"
                  value={item._id}
                  checked={hospitalDataHolder.medicines.includes(item._id)} // Kiểm tra mục đã có trong holder chưa
                  onChange={(e) => handleCheckboxChange(e, "medicines")}
                />
                {item.name}
              </label>
            </div>
          ))}
          <div>
            <strong>Selected Medicines:</strong>
            {getSelectedNames(hospitalDataHolder.medicines, medicine).join(", ")}
          </div>

          <h3>Packages:</h3>
          {packages.map((item: any) => (
            <div key={item._id}>
              <label>
                <input
                  type="checkbox"
                  value={item._id}
                  checked={hospitalDataHolder.packages.includes(item._id)} // Kiểm tra mục đã có trong holder chưa
                  onChange={(e) => handleCheckboxChange(e, "packages")}
                />
                {item.name}
              </label>
            </div>
          ))}
          <div>
            <strong>Selected Packages:</strong>
            {getSelectedNames(hospitalDataHolder.packages, packages).join(", ")}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.formButton}>
          Update Hospital
        </button>
      </form>
    </div>
  );
};

export default Page;
