"use client";
import React, { useState, useEffect } from "react";
import styles from '../../../../src/styles/post.module.scss';
import apiMedicine from "@/app/src/services/apiMedicine";
import { useRouter } from 'next/navigation';

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

function UpdateMedicinePage() {
   const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMedicine, setNewMedicine] = useState<NewMedicine>({
    name: '',
    quantity: 0,
    price: 0,
    category: { _id: "", name: "", description: "", medicines: [] } // Default empty category object
  });

  // Helper function to check special characters
  const containsSpecialChars = (str: string) => {
    const specialCharPattern = /[^a-zA-Z0-9\s]/;
    return specialCharPattern.test(str);
  };

  const isMedicineNameDuplicate = (name: string) => {
    return medicines.some((medicine) => medicine.name.toLowerCase() === name.toLowerCase());
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(newMedicine);
    
    if (containsSpecialChars(newMedicine.name)) {
      alert('Tên thuốc không được chứa ký tự đặc biệt!');
      return;
    }

    if (isMedicineNameDuplicate(newMedicine.name)) {
      alert('Tên thuốc này đã tồn tại!');
      return;
    }

    try {
      const response = await apiMedicine.addMedicine(newMedicine);
      setMedicines([...medicines, response.data]);
      alert("Thuốc đã được thêm thành công!");
     
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Đã xảy ra lỗi khi thêm thuốc!");
    }
  };

  // Fetch medicines and categories from the API on component mount
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const medicinesResponse = await apiMedicine.getAllMedicine();
        const categoryResponse = await apiMedicine.getAllTypeMedicine();
        setCategories(categoryResponse.data);
        setMedicines(medicinesResponse.data);
        
        // Set the default category once categories are fetched
        if (categoryResponse.data.length > 0) {
          setNewMedicine(prevState => ({
            ...prevState,
            category: categoryResponse.data[0], // Set the first category as default
          }));
        }
      } catch (err) {
        console.error("Error while fetching medicines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Add New Medicine</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>Medicine's Name:</label>
          <input
            type="text"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Quantity:</label>
          <input
            type="number"
            value={newMedicine.quantity}
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: +e.target.value })}
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Price:</label>
          <input
            type="number"
            value={newMedicine.price}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: +e.target.value })}
            required
          />
        </div>

        <div className={styles.formItem}>
          <label>Category:</label>
          <select
            name="category"
            value={newMedicine.category._id} 
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
          Add Medicine
        </button>
      </form>
    </div>
  );
}

export default UpdateMedicinePage;
