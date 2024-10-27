import apiClient from '../Server/apiClient';
import { AxiosResponse } from "axios";

// Hàm để lấy thông tin bệnh viện
const getHospitals = (): Promise<AxiosResponse> => {
    return apiClient.get('/hospitals/');
};

const getDoctors = (): Promise<AxiosResponse> => {
    return apiClient.get('/user/doctors/')
}

const getNews = (): Promise<AxiosResponse> => {
    return apiClient.get('/news/')
}

const getDepartments = (): Promise<AxiosResponse> => {
    return apiClient.get('/departments/')
}


// Hàm để lấy tất cả trạng thái
const getStatuses = (): Promise<AxiosResponse> => {
    return apiClient.get('/status/'); // Đảm bảo đường dẫn đúng
};

// Hàm để lấy một trạng thái theo ID
const getStatusById = (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/status/${id}`);
};

// Hàm để tạo một trạng thái mới
const createStatus = (statusData: { name: string }): Promise<AxiosResponse> => {
    return apiClient.post('/status/', statusData);
};

// Hàm để cập nhật một trạng thái theo ID
const updateStatus = (id: string, statusData: { name: string }): Promise<AxiosResponse> => {
    return apiClient.put(`/status/${id}`, statusData);
};

// Hàm để xóa một trạng thái theo ID
const deleteStatus = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/status/${id}`);
};

const postAppointment = (appointmentData: {
    doctor: string;
    package: string;
    time: string;
    date: string; 
    notes: string;
    fullname: string;
    email: string;
    phoneNumber: string;
}): Promise<AxiosResponse> => {
    return apiClient.post('/appointments', appointmentData);
};


const apiService = {
    getHospitals,
    getDoctors,
    getNews,
    getDepartments,
    postAppointment,
    getStatuses,
    getStatusById,
    createStatus,
    updateStatus,
    deleteStatus
};

export default apiService; 