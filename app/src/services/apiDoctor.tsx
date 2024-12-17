import axios, { AxiosResponse } from 'axios';
import apiClient from '../Server/apiClient';
import { getMimeType } from './mime';

// Định nghĩa kiểu dữ liệu cho thông tin cập nhật bác sĩ
interface UpdateDoctorInput {
    username?: string;
    newPassword?: string; // Mật khẩu mới
    phoneNumber?: string;
    email?: string;
    gender?: string;
    dateOfBirth?: string;
    fullname?: string;
    specialty?: string; // Chuyên môn
    address?: string;
    image?: string;
}

// Hàm cập nhật bác sĩ
const updateDoctor = async (
    id: string,
    updatedData: UpdateDoctorInput,
    imageUri?: string,
): Promise<{ message: string }> => {
    try {
        const url = `/user/doctors/${id}`;
        const formData = new FormData();

        // Nếu có hình ảnh, thêm vào FormData
        if (imageUri) {
            const imageType = getMimeType(imageUri);
            const imageName = imageUri.split('/').pop() || 'image.jpg';
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        // Duyệt qua từng key trong updatedData và thêm vào FormData
        Object.entries(updatedData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value);
            }
        });

        // Gửi yêu cầu cập nhật
        const response = await apiClient.put<{ message: string }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi cập nhật bác sĩ:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bác sĩ thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Hàm xóa bác sĩ
const deleteDoctor = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/user/doctors/${id}`);
};

// Hàm lấy danh sách bác sĩ
const getDoctors = async (): Promise<AxiosResponse> => {
    return apiClient.get('/user/doctors');
};

// Hàm lấy thông tin chi tiết một bác sĩ
const getDoctorById = async (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/user/doctors/${id}`);
};

// Hàm tạo mới một bác sĩ
const createDoctor = async (
    doctorData: {
        username: string;
        password: string;
        phoneNumber: string;
        email: string;
        gender: string;
        dateOfBirth: string;
        fullname: string;
        specialty: string;
        address: string;
        image?: string;
    },
    imageUri?: string,
): Promise<{ message: string; doctor: any }> => {
    try {
        const url = '/user/doctors';
        const formData = new FormData();

        // Nếu có hình ảnh, thêm vào FormData
        if (imageUri) {
            const imageType = getMimeType(imageUri);
            const imageName = imageUri.split('/').pop() || 'image.jpg';
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        // Duyệt qua từng key trong doctorData và thêm vào FormData
        Object.entries(doctorData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value);
            }
        });

        // Gọi API để tạo mới bác sĩ
        const response = await apiClient.post<{ message: string; doctor: any }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi tạo bác sĩ:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Tạo bác sĩ thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Xuất các hàm
export default {
    updateDoctor,
    deleteDoctor,
    getDoctors,
    getDoctorById,
    createDoctor,
};
