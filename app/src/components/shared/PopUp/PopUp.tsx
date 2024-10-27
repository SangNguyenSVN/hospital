// PopUp.tsx
import React from 'react';
import styles from './popup.module.scss'; // Giả sử bạn đã có file CSS cho Popup

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onConfirm: () => void; // Thêm hàm confirm
    children?: React.ReactNode; // Thêm children
}

const Popup: React.FC<PopUpProps> = ({ isOpen, onClose, title, onConfirm, children }) => {
    if (!isOpen) return null; // Không hiển thị nếu không mở

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2>{title}</h2>
                {children}
                <div className={styles.actions}>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        Yes
                    </button>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
