import axios, { AxiosInstance as AxiosInstanceType, AxiosResponse } from "axios"



// http://localhost:1337/admin
// http://192.168.1.6:1337/api
const BASE_URL = "http://192.168.1.6:1337/api"

const API_KEY = process.env.API_KEY

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  },
 
})



// http://localhost:1337/api/users?email=%27nguyenvusang1108@gmail.com%27
const getAuth =({email}: any):  Promise<AxiosResponse>=> 
AxiosInstance.get("/users?email="+email)

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


// post
const createAppointment = (data: any) => AxiosInstance.post('/appointments', data)


  export default {
    getSlider,

    getCategories,

    getHospitals,

    getHospitalByCategory,

    getDoctorByCategory,

    createAppointment,
    
    getAppointment,

    getAuth
  }