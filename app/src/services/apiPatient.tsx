import axios, { AxiosResponse } from 'axios';
import apiClient from '../Server/apiClient';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật
interface UpdatePatientInput {
    username?: string;
    password?:string;
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    fullname?: string;
    address?: string;
    image?: string;
}

// Hàm cập nhật bệnh nhân
const updatePatient = async (
    id: string,
    updatedData: UpdatePatientInput,
    imageUri?: string,
    imageType?: string,
): Promise<{ message: string }> => {
    try {
        const url = `/user/patients/${id}`;
        const formData = new FormData();

        // Nếu có hình ảnh, thêm vào FormData
        if (imageUri && imageType) {
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Lấy tên file từ đường dẫn
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        // Duyệt qua từng key trong updatedData
        for (const key in updatedData) {
            const value = updatedData[key as keyof UpdatePatientInput];
            if (value !== undefined) {
                formData.append(key, value);
            }
        }

        const response = await apiClient.put<{ message: string }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi cập nhật bệnh nhân:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bệnh nhân thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Hàm xóa bệnh nhân
const deletePatient = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/user/patients/${id}`);
};

// Hàm lấy danh sách bệnh nhân
const getPatients = async (): Promise<AxiosResponse> => {
    return apiClient.get('/user/patients');
};

// Hàm lấy thông tin chi tiết một bệnh nhân
const getPatientById = async (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/user/patients/${id}`);

};

// Hàm tạo mới một bệnh nhân
const createPatient = async (
    patientData: {
        username: string;
        password: string;
        phoneNumber: string;
        email: string;
        gender: string;
        dateOfBirth: string;
        fullname: string;
        address: string;
        image?: string;
    },
    imageUri?: string,
    imageType?: string,
): Promise<{ message: string; patient: any }> => {
    try {
        const url = '/user/patients';

        const formData = new FormData();

        if (imageUri && imageType) {
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Lấy tên file từ đường dẫn
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        // Duyệt qua từng key trong patientData
        for (const key in patientData) {
            const value = patientData[key as keyof typeof patientData];
            if (value !== undefined) {
                formData.append(key, value);
            }
        }

        const response = await apiClient.post<{ message: string; patient: any }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi tạo bệnh nhân:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Tạo bệnh nhân thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Xuất các hàm
export default {
    updatePatient,
    deletePatient,
    getPatients,
    getPatientById,
    createPatient,
};
