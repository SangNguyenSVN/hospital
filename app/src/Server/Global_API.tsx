import axios, { AxiosInstance as AxiosInstanceType, AxiosResponse } from "axios"

// http://localhost:1337/admin
// http://192.168.1.6:1337/api
const BASE_URL = "http://192.168.1.6:1337/api"

const API_KEY = "bfc311b94fa863c635d2dbae06147df4d1256d277432fa748eecf2daf04194044ecac9543a855074e38287e5bbfa37e1b41487a02e015dbc59e3a58169493a46131e3784c8a414e5ad2584c1470773fd42533ab4fc3bdc3efab20a824180a4e05b63eb2033e001d482a29e8b8075583b6002e14d69cf9beab6dc0f58feeea100"

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
// http://localhost:1337/api/sliders?populate=*
const getSlider = (): Promise<AxiosResponse> =>
  AxiosInstance.get("/sliders?populate=*")

// http://localhost:1337/api/categories?populate=*
const getCategories = (): Promise<AxiosResponse> =>
  AxiosInstance.get("/categories?populate=*")

// http://localhost:1337/api/hospitals?populate=*
const getHospitals = (): Promise<AxiosResponse> =>
  AxiosInstance.get("/hospitals?populate=*")

// http://localhost:1337/api/doctors?populate=*
  const getDoctors = (): Promise<AxiosResponse> =>
  AxiosInstance.get("/doctors?populate=*")

// http://localhost:1337/api/appointments?populate=*
// http://localhost:1337/api/appointments?filters[Email][$eq]=sangvu110@gmail.com&populate=*
const getAppointment = (email: string): Promise<AxiosResponse> =>
AxiosInstance.get('/appointments?filters[Email][$eq]=' + email + '&populate=*')

// http://localhost:1337/api/hospitals?filters[categories][Name][$in]=Cardiologist&populate=*
const getHospitalByCategory = (categoryName: string): Promise<AxiosResponse> =>
  AxiosInstance.get('/hospitals?filters[categories][Name][$in]=' + categoryName + '&populate=*')

// http://localhost:1337/api/doctors?filters[categories][Name][$in]=Cardiologist&populate=*
const getDoctorByCategory = (categoryName: string): Promise<AxiosResponse> =>
  AxiosInstance.get('/doctors?filters[categories][Name][$in]=' + categoryName + '&populate=*')

const createAppointment = (data: any) => AxiosInstance.post('/appointments', data)

  export default {
    getSlider,

    getCategories,

    getHospitals,

    getHospitalByCategory,

    getDoctorByCategory,

    createAppointment,
    
    getAppointment
  }