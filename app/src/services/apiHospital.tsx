import axios, { AxiosResponse } from 'axios';
import apiClient from '../Server/apiClient';
import { getMimeType } from './mime';

export interface Hospital {
    image?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    email?: string;
    doctors?: string[]; // Array of doctor IDs
    departments?: string[]; // Array of department IDs
    medicines?: string[]; // Array of medicine IDs
    packages?: string[]; // Array of package IDs
}

// Hàm xóa bệnh nhân
const deleteHospital = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/hospitals/${id}`);
};

// Hàm lấy danh sách bệnh nhân
const getHospital = async (): Promise<AxiosResponse> => {
    return apiClient.get('/hospitals');
};

const createHospital = async (
    hospitalData: Hospital, // Dữ liệu bệnh viện
    imageUri?: string, // URI của hình ảnh bệnh viện (nếu có)
): Promise<{ message: string; hospital: any }> => {
    try {
        const url = '/hospitals/'; // URL của API để tạo bệnh viện
        const formData = new FormData();

        // Nếu có hình ảnh bệnh viện, thêm vào FormData
        if (imageUri) {
            const imageType = getMimeType(imageUri); // Lấy MIME type từ URI
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Tên hình ảnh
            formData.append('image', {
                uri: imageUri,
                type: imageType, // MIME type của hình ảnh
                name: imageName,
            } as any); // Dùng 'any' để ép kiểu
        }

        // Duyệt qua từng key trong hospitalData và thêm vào FormData
        Object.entries(hospitalData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value);
            }
        });

        // Gửi dữ liệu bệnh viện đến API
        const response = await apiClient.post<{ message: string; hospital: any }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi tạo bệnh viện:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Tạo bệnh viện thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};

// Hàm cập nhật thông tin bệnh viện
const updateHospital = async (
    id: string, // ID bệnh viện cần cập nhật
    hospitalData: Hospital, // Dữ liệu bệnh viện
    imageUri?: string // URI của hình ảnh mới (nếu có)
): Promise<{ message: string; hospital: any }> => {
    try {
        const url = `/hospitals/${id}`; // URL API cập nhật bệnh viện, sử dụng ID bệnh viện
        const formData = new FormData();

        // Nếu có hình ảnh mới, thêm vào FormData
        if (imageUri) {
            const imageType = getMimeType(imageUri); // Lấy MIME type từ URI
            const imageName = imageUri.split('/').pop() || 'image.jpg'; // Tên hình ảnh
            formData.append('image', {
                uri: imageUri,
                type: imageType, // MIME type của hình ảnh
                name: imageName,
            } as any); // Dùng 'any' để ép kiểu
        }

        // Duyệt qua từng key trong hospitalData và thêm vào FormData
        Object.entries(hospitalData).forEach(([key, value]) => {
            if (value !== undefined) {
                if (Array.isArray(value)) {
                    // Nếu là mảng, thêm từng phần tử vào FormData
                    value.forEach(item => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value);
                }
            }
        });

        // Gửi yêu cầu cập nhật bệnh viện đến API
        const response = await apiClient.put<{ message: string; hospital: any }>(url, formData);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi khi cập nhật bệnh viện:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Cập nhật bệnh viện thất bại');
        } else {
            throw new Error('Đã xảy ra lỗi không xác định');
        }
    }
};



export default {
    deleteHospital,
    getHospital,
    createHospital,
    updateHospital
};