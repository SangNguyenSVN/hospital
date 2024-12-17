import React from 'react';

// Định nghĩa type cho props
interface LayoutProps {
  children: React.ReactNode;
}

// Component Layout
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Bạn có thể thêm các phần như header, footer ở đây nếu cần */}
      {children}
    </div>
  );
};

export default Layout;
