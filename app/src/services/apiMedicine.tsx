import apiClient from '../Server/apiClient';
import { AxiosResponse } from "axios";




const getAllMedicine  = (): Promise<AxiosResponse> =>{
    return apiClient.get(`/medicine/getall`)
}

const getAllTypeMedicine = (): Promise<AxiosResponse> =>{
    
        return apiClient.get(`/category/getall`)
    
}

const deleteMedicine = (id: String): Promise<AxiosResponse> =>{
    return apiClient.delete(`/medicine/${id}`)
}

const updateMedicine = (id:String , data: any) : Promise<AxiosResponse>=>{
    return apiClient.put(`/medicine/update/${id}`,data)
}

const addMedicine = (data: any): Promise<AxiosResponse> =>{
    return apiClient.post(`/medicine/add/`,data)
}

const apiMedicine = {
    getAllMedicine,
    getAllTypeMedicine,
    deleteMedicine,
    updateMedicine,
    addMedicine
};

export default apiMedicine; 