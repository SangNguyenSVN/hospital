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
    hospitalData: Hospital,
    imageUri?: string
): Promise<{ message: string; hospital: any }> => {
    try {
        const url = '/hospitals/';
        const formData = new FormData();

        if (imageUri) {
            const imageType = getMimeType(imageUri);
            const imageName = imageUri.split('/').pop() || 'image.jpg';
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        Object.entries(hospitalData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') { // Skip empty values
                formData.append(key, value);
            }
        });

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

const updateHospital = async (
    id: string,
    hospitalData: Hospital,
    imageUri?: string
): Promise<{ message: string; hospital: any }> => {
    try {
        const url = `/hospitals/${id}`;
        const formData = new FormData();

        if (imageUri) {
            const imageType = getMimeType(imageUri);
            const imageName = imageUri.split('/').pop() || 'image.jpg';
            formData.append('image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            } as any);
        }

        Object.entries(hospitalData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (Array.isArray(value)) {
                    // Append the array as a JSON string
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            }
        });

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
