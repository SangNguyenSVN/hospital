"use client";
import React, { useState, useEffect } from "react";
import styles from '../../../../src/styles/post.module.scss';
import apiMedicine from "@/app/src/services/apiMedicine";
import { useSearchParams } from "next/navigation";

// Define the interfaces for the medicine and category
interface Category {
  _id: string;
  name: string;
  description: string;
  medicines: string[];
}

interface Medicine {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  category: Category;
  hospital: string[];
  status: string;
}

interface NewMedicine {
  name: string;
  quantity: number;
  price: number;
  category: Category;
}

function AddMedicinePage() {
  const searchParams = useSearchParams();
  const dataMedicineInfro: any = searchParams.get("medicine");
  const dataMedicine: Medicine = dataMedicineInfro
    ? JSON.parse(decodeURIComponent(dataMedicineInfro))
    : null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMedicine, setNewMedicine] = useState<NewMedicine>({
    name:dataMedicine.name,
    quantity: dataMedicine.quantity,
    price: dataMedicine.price,
    category: { _id: dataMedicine.category._id, name:dataMedicine.category.name, description:dataMedicine.category.description, medicines: dataMedicine.category.medicines } // Default empty category object
  });

  // Check for special characters
  const containsSpecialChars = (str: string) => {
    const specialCharPattern = /[^a-zA-Z0-9\s]/;
    return specialCharPattern.test(str);
  };

  // Check for duplicate medicine names
  const isMedicineNameDuplicate = (name: string) => {
    return medicines.some((medicine) => medicine.name.toLowerCase() === name.toLowerCase());
  };

  // Submit handler for creating or updating medicine
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (containsSpecialChars(newMedicine.name)) {
      alert('Tên thuốc không được chứa ký tự đặc biệt!');
      return;
    }



    try {
      // If dataMedicine exists, it's an update operation, otherwise it's a new medicine creation
      if (dataMedicine) {
        const response = await apiMedicine.updateMedicine(dataMedicine._id, newMedicine);
        setMedicines([...medicines, response.data]);
        alert("Thuốc đã được cập nhật thành công!");
      } else {
        const response = await apiMedicine.addMedicine(newMedicine);
        setMedicines([...medicines, response.data]);
        alert("Thuốc đã được thêm thành công!");
      }
    } catch (error) {
      console.error("Error adding/updating medicine:", error);
      alert("Đã xảy ra lỗi khi thêm hoặc cập nhật thuốc!");
    }
  };

 
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const medicinesResponse = await apiMedicine.getAllMedicine();
        const categoryResponse = await apiMedicine.getAllTypeMedicine();
        setCategories(categoryResponse.data);
        setMedicines(medicinesResponse.data);

        // Set the initial state for newMedicine or update state if medicine is provided
        
      } catch (err) {
        console.error("Error while fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [dataMedicine]);

  return (
    <div className={styles.container}>
      <h1> Edit Medicine </h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>Medicine's Name:</label>
          <input
            type="text"
            value={newMedicine.name}  // Bind to newMedicine.name
            onChange={(e) => setNewMedicine(prevState => ({ 
              ...prevState, 
              name: e.target.value 
            }))}  // Cập nhật state đúng cách
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Quantity:</label>
          <input
            type="number"
            value={newMedicine.quantity}  // Bind to newMedicine.quantity
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: +e.target.value })}  // Update state
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Price:</label>
          <input
            type="number"
            value={newMedicine.price}  // Bind to newMedicine.price
            onChange={(e) => setNewMedicine({ ...newMedicine, price: +e.target.value })}  // Update state
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Category:</label>
          <select
            name="category"
            value={newMedicine.category._id}  // Bind to newMedicine.category._id
            onChange={(e) => {
              const selectedCategory = categories.find((cat) => cat._id === e.target.value);
              if (selectedCategory) {
                setNewMedicine((prevState) => ({
                  ...prevState,
                  category: selectedCategory,
                }));
              }
            }}
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          {dataMedicine ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>
    </div>
  );
}

export default AddMedicinePage;
