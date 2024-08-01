import React from 'react';
import { useRouter } from 'next/router';
import auth from '@/app/src/services/auth'; // Update this path to where your auth service is located

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        auth.logout();
        router.push('/page/login'); // Redirect to the login or home page
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
