"use client";
import { useEffect, useState } from 'react';
import styles from '../styles/shared.module.scss'; 
import apiMedicine from '../../services/apiMedicine';
import { useRouter } from 'next/navigation';


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


interface NewMedicine{

  name: string; 
  quantity: number; 
  price: number; 
  category: Category; 

}
const MedicineScreen = () => {
   const router = useRouter();
  const [categories, setcategories] = useState<Category[]>([])
  const [medicines, setMedicines] = useState<Medicine[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentMedicine, setCurrentMedicine] = useState<Medicine | null>(null); 
  const [IsAdding, setIsAdding] = useState(false); 
  const [newMedicine, setNewMedicine] = useState<NewMedicine>({ name: '', quantity: 0, price: 0, category: categories[0]});

  const containsSpecialChars = (str: string) => {
    const specialCharPattern = /[^a-zA-Z0-9\s]/;  // Kiểm tra ký tự không phải chữ cái, số và khoảng trắng
    return specialCharPattern.test(str);
  };
  const handleEditClick = (medicine:Medicine) => {
    console.log(medicine)
    const encodedMedicine = encodeURIComponent(JSON.stringify(medicine));
    router.push(`/admin/dashboard/medicine/update?medicine=${encodedMedicine}`);
  };




  const handleAddclick = () =>{
    router.push(`/admin/dashboard/medicine/post`);
  }


  const handleDelete = async (medicineId: string) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa thuốc này?');
    if (confirmed) {
      try {
      
        const response = await apiMedicine.deleteMedicine(medicineId)
        
    
        const updatedMedicines = medicines.filter((medicine) => medicine._id !== medicineId);
        setMedicines(updatedMedicines);
  
        alert("Thuốc đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa thuốc:", error);
        alert("Đã xảy ra lỗi khi xóa thuốc!");
      }
    }
  };
  // const handleSSubmit  =  async (e: React.FormEvent)=>{
  //     e.preventDefault();

  //     if (containsSpecialChars(currentMedicine?.name || newMedicine.name)) {
  //       alert('Tên thuốc không được chứa ký tự đặc biệt!');
  //       return;  // Không thực hiện thêm hoặc cập nhật nếu có ký tự đặc biệt
  //     }
  //     if (currentMedicine){
  //       try {
  //         const response = await apiMedicine.updateMedicine(currentMedicine._id,currentMedicine);

  //         const updateMedicines = medicines.map((item)=>
  //           item._id === currentMedicine._id? response.data: item
  //         );
        
  //         setMedicines(updateMedicines);
  //         handleClosePopup();
  //       } catch (error) {
  //         console.error("Error updating medicine:", error);
  //       }
  //     } else if (newMedicine) {
  //       try {
  //         const response = await apiMedicine.addMedicine(newMedicine)
  //         setMedicines([...medicines, response.data]); 
  //         handleClosePopup();
  //       } catch (error) {
  //         console.error("Error adding medicine:", error);
  //       }
  //     }
  // }

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true); 
      try {
        const medicinesresponse = await apiMedicine.getAllMedicine();
        const categoryResponse = await apiMedicine.getAllTypeMedicine();
        setcategories(categoryResponse.data)
        setMedicines(medicinesresponse.data); 
        console.log("Dữ liệu thuốc:", medicinesresponse.data); 
      } catch (err) {
        console.error("Error while fetching medicines:"); 
      } finally {
        setLoading(false); 
      }
    };
  
    fetchMedicines(); 
  }, []);



  

return(

  <div className={styles.container}>
     <h1 className={styles.title}>Danh sách thuốc</h1>
     <h2 className={styles.subtitle}>Quản lý thuốc</h2>
   



     <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Index</th>
            <th className={styles.th}>Medicine's Name</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine._id}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{medicine.name}</td>
              <td className={styles.td}>{medicine.price}</td>
              
              <td className={styles.td}>
              <button onClick={()=>handleEditClick(medicine)} className={styles.updateButton}>Chỉnh sữa</button>
                <button className={styles.deleteButton} onClick={()=> handleDelete(medicine._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAddclick}
        className={styles.addButton}  // Giữ nguyên .button cho nút Add Hospital
      >
        Add Hospital
      </button>
{/* {medicines.map((item,index)=>(
      <ul   key={item._id} className={styles.ulcontainer}>
       
    <li  key={item._id} className={styles.licontainer}>
    <p className={styles.index}>{index+1}</p>
      <h5>{item.name} </h5>
      <h5>{item.price} VND</h5>
      <h5>{item.quantity}</h5>
      <button onClick={()=>handleEditClick(item)} className={styles.editbutton}>Chỉnh sữa</button>
      <button className={styles.deletebutton} onClick={()=> handleDelete(item._id)}>Xóa</button>
    </li>
  </ul>
))}
  <div className={styles.addcontainer}>
  <button className={styles.addbutton}  onClick={()=>handleAddclick()}   >Thêm Thuốc</button>
  </div> */}


{/* // popup */}
  {isEditing && currentMedicine && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Chỉnh sửa thuốc</h2>
            <form >
              <label>
                Tên thuốc:
                <input
                  type="text"
                  name="name"
                  value={currentMedicine.name}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, name: e.target.value })}
                />
              </label>
              <label>
                Giá:
                <input
                  type="number"
                  name="price"
                  value={currentMedicine.price}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, price: +e.target.value })}
                />
              </label>
              <label>
                Liều lượng:
                <input
                  type="number"
                  name="quantity"
                  value={currentMedicine.quantity}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, quantity: +e.target.value })}
                />
              </label>
              <label>
                Loại sản phẩm:
                <select
                  name="productType"
                  value={currentMedicine.category._id}
                  onChange={(e) =>
                    setCurrentMedicine({
                      ...currentMedicine,
                      category: categories.find((cat) => cat._id === e.target.value) || currentMedicine.category,
                    })
                  }
                >
                  {categories.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </label>
            
            </form>
          </div>
        </div>
      )}



 </div>
)

};

export default MedicineScreen;

