import apiClient from '../Server/apiClient';
import { AxiosResponse } from "axios";

// Định nghĩa cấu trúc dữ liệu của một cuộc hẹn
interface AppointmentData {
    doctor: string;
    package?: string;
    time: string;
    date: string;
    notes?: string;
    fullname: string;
    email: string;
    phoneNumber: string;
}

// Định nghĩa cấu trúc dữ liệu của bác sĩ, gói và bệnh viện
interface DoctorData {
    id: string;
    name: string;
    specialty: string; // Thêm thuộc tính nếu cần
}

interface PackageData {
    id: string;
    name: string;
    price: number; // Thêm thuộc tính nếu cần
}

interface HospitalData {
    id: string;
    name: string;
    address: string; // Thêm thuộc tính nếu cần
}

// Các hàm API cho Appointment
const getAppointment = async (): Promise<AxiosResponse> => {
    try {
        return await apiClient.get(`/appointments/`);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

const getAppointmentById = async (id: string): Promise<AxiosResponse<AppointmentData>> => {
    try {
        return await apiClient.get(`/appointments/${id}`);
    } catch (error) {
        console.error("Error fetching appointment by ID:", error);
        throw error;
    }
};

const createAppointment = async (data: AppointmentData): Promise<AxiosResponse<AppointmentData>> => {
    try {
        return await apiClient.post(`/appointments/`, data);
    } catch (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
};

const updateAppointment = async (id: string, data: AppointmentData): Promise<AxiosResponse<AppointmentData>> => {
    try {
        return await apiClient.put(`/appointments/${id}`, data);
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
};

const deleteAppointment = async (id: string): Promise<AxiosResponse> => {
    try {
        return await apiClient.delete(`/appointments/${id}`);
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
};

const getAppointmentsByDoctor = async (doctorId: string): Promise<AxiosResponse<AppointmentData[]>> => {
    try {
        return await apiClient.get(`/appointments/doctor/${doctorId}`);
    } catch (error) {
        console.error("Error fetching appointments by doctor:", error);
        throw error;
    }
};

// Thêm hàm để lấy danh sách bác sĩ
const getDoctors = async (): Promise<AxiosResponse<DoctorData[]>> => {
    try {
        return await apiClient.get(`/doctors/`);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        throw error;
    }
};

// Thêm hàm để lấy danh sách gói
const getPackages = async (): Promise<AxiosResponse<PackageData[]>> => {
    try {
        return await apiClient.get(`/packages/`);
    } catch (error) {
        console.error("Error fetching packages:", error);
        throw error;
    }
};

// Thêm hàm để lấy danh sách bệnh viện
const getHospitals = async (): Promise<AxiosResponse<HospitalData[]>> => {
    try {
        return await apiClient.get(`/hospitals/`);
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        throw error;
    }
};

// Đóng gói các hàm API thành một đối tượng để dễ sử dụng
const apiAppointment = {
    getAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDoctor,
    getDoctors,  // Đảm bảo thêm hàm getDoctors vào đây
    getPackages, // Đảm bảo thêm hàm getPackages vào đây
    getHospitals, // Đảm bảo thêm hàm getHospitals vào đây
};

export default apiAppointment;
