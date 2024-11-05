import axios, { AxiosResponse } from 'axios';
import apiClient from '../Server/apiClient';
import { getMimeType } from './mime';

export interface Hospital {
    image?: string;
    name: string;
    location?: string;
    phoneNumber: string;
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

const addHospital = (hospital: Hospital): Promise<AxiosResponse> => {
    return apiClient.post('/hospitals', hospital);
};

// Hàm cập nhật thông tin bệnh viện
const updateHospital = (id: string, hospital: Hospital): Promise<AxiosResponse> => {
    return apiClient.put(`/hospitals/${id}`, hospital);
};

export default {
    deleteHospital,
    getHospital,
    addHospital,
    updateHospital
};