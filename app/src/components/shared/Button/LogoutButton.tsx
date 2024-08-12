import React from 'react';
import auth from '@/app/src/services/auth'; // Update this path to where your auth service is located

const LogoutButton = () => {
   

    const handleLogout = () => {
        auth.logout();
       
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
