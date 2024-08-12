import axios, { AxiosInstance as AxiosInstanceType, AxiosResponse } from "axios";

interface RegisterUserProps {
    username: string;
    password: string;
    email: string;
}

interface LoginUserProps {
    identifier: string;
    password: string;
}

const BASE_URL = "http://192.168.1.6:1337/api";

const API_KEY = process.env.API_KEY;

const AxiosInstance: AxiosInstanceType = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    },
});



const registerWithAuth = async (data: RegisterUserProps): Promise<AxiosResponse> => {
    try {
        const response = await AxiosInstance.post("/auth/local/register", data);
        return response;
    } catch (error) {
        // Handle error as needed
        console.error("Registration error:", error);
        throw error;
    }
};

const loginWithAuth = async (data: LoginUserProps): Promise<AxiosResponse> => {
    try {
        const response = await AxiosInstance.post("/auth/local", data);
        const { jwt } = response.data;
        // Save JWT token to localStorage
        localStorage.setItem('token', jwt);
        return response;
    } catch (error) {
        // Handle error as needed
        console.error("Login error:", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('token');
};

export default { registerWithAuth, loginWithAuth, logout };
