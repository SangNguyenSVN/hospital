import axios from 'axios';

// Địa chỉ API của bạn
const API_URL = 'https://server-cookies-break-eight.vercel.app/api';

// Tạo một instance của axios với baseURL
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
});

// Middleware để thêm token vào header trước khi gửi request
apiClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }

    // Không thiết lập Content-Type cho FormData
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        config.headers['Content-Type'] = 'application/json'; // Đặt Content-Type cho các loại yêu cầu khác
    }

    return config;
});

// Xuất apiClient để sử dụng trong các file khác
export default apiClient;
