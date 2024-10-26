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
    postAppointment

};

export default apiService; 