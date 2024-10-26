import axios from 'axios';
import apiClient from '../Server/apiClient';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật bác sĩ
interface UpdateDoctorInput {
    fullname?: string;
    phoneNumber?: string;
    email?: string;
    specialty?: string;
    gender?: string;
    dateOfBirth?: string;
    image?: string;
}

// Hàm để cập nhật thông tin bác sĩ
const updateDoctor = async (
    updatedData: UpdateDoctorInput,
    imageUri?: string,
    imageType?: string,
): Promise<{ message: string }> => {
    try {
        const url = '/user/doctors/update'; // URL cho API cập nhật bác sĩ

        console.log('URL:', url);
        console.log("Data", updatedData);

        const formData = new FormData();

        console.log('FormData:', formData); // Log FormData trước khi gửi yêu cầu
        console.log('imageUri:', imageUri);
        console.log('imageType:', imageType);
        
        // Nếu có hình ảnh, thêm nó vào FormData
        if (imageUri && imageType) {
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Lấy tên file từ đường dẫn
            formData.append('image', {
                uri: imageUri,          // Đường dẫn tệp hình ảnh trên thiết bị
                type: imageType,        // Loại MIME của ảnh, ví dụ: 'image/jpeg'
                name: imageName,        // Tên của tệp ảnh
            } as any);
        }

        // Duyệt qua từng key trong updatedData
        for (const key in updatedData) {
            const value = updatedData[key as keyof UpdateDoctorInput];
            if (value !== undefined) {
                formData.append(key, value);
            }
        }

        const response = await apiClient.put<{ message: string }>(url, formData);

        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        console.error('Lỗi khi cập nhật bác sĩ:', error);

        // Xử lý lỗi
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bác sĩ thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Xuất các hàm
export default {
    updateDoctor,
};
