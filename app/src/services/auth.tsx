import axios, { AxiosInstance as AxiosInstanceType, AxiosResponse } from "axios"

interface RegisterUserProps {
    username: string
    password: string
    email: string
}
interface LoginUserProps {
    identifier: string
    password: string
}

const BASE_URL = "http://192.168.1.6:1337/api"

const API_KEY = "bfc311b94fa863c635d2dbae06147df4d1256d277432fa748eecf2daf04194044ecac9543a855074e38287e5bbfa37e1b41487a02e015dbc59e3a58169493a46131e3784c8a414e5ad2584c1470773fd42533ab4fc3bdc3efab20a824180a4e05b63eb2033e001d482a29e8b8075583b6002e14d69cf9beab6dc0f58feeea100"

const AxiosInstance: AxiosInstanceType = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    },
})

const registerWithAuth = async (data: RegisterUserProps): Promise<AxiosResponse> => {
    try {
        const response = await AxiosInstance.post("/auth/local/register", data)
        return response
    } catch (error) {
        // handle error as needed
        throw error
    }
}

const loginWithAuth = async (data: LoginUserProps): Promise<AxiosResponse> => {
    try {
        const response = await AxiosInstance.post("/auth/local", data)
        return response
    } catch (error) {
        // handle error as needed
        throw error
    }
}

const logout = () => {
    localStorage.removeItem('token');
}

export default { registerWithAuth, loginWithAuth, logout }
