import apiClient from '../Server/apiClient';
import { AxiosResponse } from "axios";

const getAppointment = (): Promise<AxiosResponse> => {
    return apiClient.get(`/appointments/`);
};

const deleteAppointment = (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/appointments/${id}`);
};

const apiAppointment = {
    getAppointment,
    deleteAppointment
};

export default apiAppointment; 