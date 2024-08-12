import Cookies from 'js-cookie';

// Define the types for the setCookie function
export const setCookie = (key: string, value: string, options?: { expires?: number | Date; path?: string }): void => {
  
    Cookies.set(key, value, options);
};

// Define the type for the getCookie function
export const getCookie = (key: string): string | undefined => {
    return Cookies.get(key);
};

// Define the type for the removeCookie function
export const removeCookie = (key: string): void => {
    Cookies.remove(key);
};
