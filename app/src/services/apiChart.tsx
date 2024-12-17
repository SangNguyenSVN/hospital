import { AxiosResponse } from "axios";
import apiClient from "../Server/apiClient";

const getAppointmentsMonthly = async (year: string, month: string): Promise<AxiosResponse> => {
    try {
        return await apiClient.get(`/appointments/monthly/${year}/${month}`);
    } catch (error) {
        console.error("Error fetching monthly appointments:", error);
        throw error;
    }
};

const getAppointmentsYearly = async (year: string): Promise<AxiosResponse> => {
    try {
        return await apiClient.get(`/appointments/yearly/${year}`);
    } catch (error) {
        console.error("Error fetching yearly appointments:", error);
        throw error;
    }
};

export default {
    getAppointmentsMonthly,
    getAppointmentsYearly,
    
}