import apiClient from '../Server/apiClient';

// Định nghĩa kiểu cho dữ liệu phản hồi
interface RegisterResponse {
    message: string;
    user?: {
        id: string;
        username: string;
        phoneNumber: string;
        role: {
            id: string;
            name: string;
            permissions: string[];
        };
    };
}

// Hàm đăng ký chung
const registerUser = async (type: 'patient' | 'doctor', username: string, password: string, phoneNumber: string, roleId: string): Promise<RegisterResponse> => {
    const response = await apiClient.post(`/auth/register/${type}`, {
        username,
        password,
        phoneNumber,
        roleId,
    });
    return response.data;
};

// Đăng ký bệnh nhân và bác sĩ
const registerPatient = (username: string, password: string, phoneNumber: string, roleId: string) =>
    registerUser('patient', username, password, phoneNumber, roleId);

const registerDoctor = (username: string, password: string, phoneNumber: string, roleId: string) =>
    registerUser('doctor', username, password, phoneNumber, roleId);

// Đăng nhập
const login = async (username: string, password: string, userType: string) => {
    try {
        const response = await apiClient.post('/auth/login', { username, password, userType });

        // Lưu user và token vào localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        return response.data;
    } catch (error: any) {
        console.error('Lỗi đăng nhập:', error.response?.data);
    }
    return undefined;
};

const loginAdmin = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/login/admin', { username, password });
        return response.data;
    } catch (error: any) {
        console.error('Lỗi đăng nhập:', error.response?.data);
    }
    return undefined;
};

const updateAccount = async (password?: string, userType?: string): Promise<{ message: string }> => {
    const data: any = {};

    // Chỉ thêm password nếu có
    if (password) {
        data.password = password;
    }

    // Thêm userType nếu có
    if (userType) {
        data.userType = userType;
    }

    try {
        const response = await apiClient.put('/change/password', data);
        return response.data;
    } catch (error: any) {
        console.error('Lỗi thay đổi tài khoản:', error.response?.data || error.message);
        throw new Error('Không thể thay đổi tài khoản');
    }
};

// Đăng xuất
const logout = async () => {
    try {
        await apiClient.post('/auth/logout');
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        throw error;
    }
};

export default {
    registerPatient,
    registerDoctor,
    login,
    logout,
    updateAccount,
    loginAdmin
};
