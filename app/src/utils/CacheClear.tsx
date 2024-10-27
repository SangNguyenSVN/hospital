import { useEffect } from 'react';

const CacheClearer: React.FC = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Xóa cache khi người dùng đóng tab hoặc rời khỏi trang
      localStorage.clear(); // Hoặc sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // Không cần render gì
};

export default CacheClearer;
