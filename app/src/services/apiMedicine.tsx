import apiClient from '../Server/apiClient';
import { AxiosResponse } from "axios";




const getAllMedicine  = (): Promise<AxiosResponse> =>{
    return apiClient.get(`/medicines/`)
}

const getAllTypeMedicine = (): Promise<AxiosResponse> =>{
        return apiClient.get(`/categories/`)
    
}

const deleteMedicine = (id: String): Promise<AxiosResponse> =>{
    return apiClient.delete(`/medicines/${id}`)
}

const updateMedicine = (id:String , data: any) : Promise<AxiosResponse>=>{
    return apiClient.put(`/medicines/${id}`,data)
}

const addMedicine = (data: any): Promise<AxiosResponse> =>{
    return apiClient.post(`/medicines/`,data)
}

const apiMedicine = {
    getAllMedicine,
    getAllTypeMedicine,
    deleteMedicine,
    updateMedicine,
    addMedicine
};

export default apiMedicine; 