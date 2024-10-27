"use client"; // Đảm bảo rằng bạn đang sử dụng client component trong Next.js
import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import styles from '../styles/status.module.scss'; // Giả sử bạn đã tạo file CSS module
import Popup from '../../components/shared/PopUp/PopUp'; // Import component Popup

// Định nghĩa kiểu cho Status
interface Status {
    _id: string; // Giả sử _id là định danh từ MongoDB
    name: string;
}

const StatusScreen: React.FC = () => {
    const [statuses, setStatuses] = useState<Status[]>([]); // Trạng thái lưu danh sách trạng thái
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
    const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Trạng thái mở popup
    const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null); // ID của trạng thái đã chọn để xóa

    // Lấy danh sách trạng thái từ API
    const getStatuses = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const response = await apiService.getStatuses();
            setStatuses(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching statuses:', error);
            setError('Failed to fetch statuses');
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // Lấy danh sách trạng thái khi component được render
    useEffect(() => {
        getStatuses();
    }, []);

    // Hàm xử lý xác nhận xóa trạng thái
    const handleConfirmDelete = async () => {
        if (selectedStatusId) {
            try {
                await apiService.deleteStatus(selectedStatusId);
                console.log("Deleted:", selectedStatusId);
                getStatuses(); // Làm mới danh sách trạng thái sau khi xóa
            } catch (error) {
                console.error('Error deleting status:', error);
                setError('Failed to delete status');
            } finally {
                setIsPopupOpen(false); // Đóng popup sau khi thực hiện xóa
                setSelectedStatusId(null); // Reset ID đã chọn
            }
        }
    };

    // Hàm mở popup xác nhận
    const openPopup = (id: string) => {
        setSelectedStatusId(id);
        setIsPopupOpen(true);
    };

    return (
        <div>
            <h1>Status Management</h1>

            {/* Hiển thị trạng thái loading */}
            {loading && <p>Loading statuses...</p>}
            {error && <p className={styles.error}>{error}</p>} {/* Hiển thị lỗi nếu có */}

            {/* Tiêu đề cho danh sách trạng thái */}
            <h2>Current Statuses:</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Index</th>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {statuses.map((status: Status, index) => (
                        <tr key={status._id}>
                            <td className={styles.td}>{index + 1}</td>
                            <td className={styles.td}>{status.name}</td>
                            <td className={styles.td}>
                                <button 
                                    onClick={() => openPopup(status._id)} 
                                    className={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Hiển thị popup xác nhận xóa */}
            <Popup 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
                title="Confirm Deletion"
                onConfirm={handleConfirmDelete} // Thêm hàm xác nhận
            >
                <p>Are you sure you want to delete this status?</p>
            </Popup>
        </div>
    );
};

export default StatusScreen;
