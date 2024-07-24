

export function validateName(name: string): boolean {
    if(!name || name == ''){
        return false;
    }
    return true;
}; 

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export function validatePhoneNumber  (phoneNumber : any)  {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex || !phoneNumber){
        return false;
    }
    return true;
  };
  
export function validateDate(dateString: string): boolean {
    if(!dateString || dateString == '' || dateString == null){
        return false;
    }
    return true
    // const isValidDate = (date: Date) => !isNaN(date.getTime());
    // const date = new Date(dateString);
    // return isValidDate(date);
};

export function validateTime(timeString: string): boolean {
    if(!timeString || timeString == '' || timeString == null){
        return false;
    }
    return true
    // const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(A.M|P.M)$/i;
    // return timeRegex.test(timeString);
};

export function validatePassword(password: string){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{12,}$/;
    if(!password || ! passwordRegex || password == ''){
        return false;
    }
    return true;
}
