import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Global_API from '../Server/Global_API';
import { validateEmail, validatePassword } from './CheckForm';


const SignIn = ({ data }: any) => {
    const isValidData = () => {
        const validations = [
            { key: 'Email', validator: validateEmail },
            { key: 'Password', validator: validatePassword }
        ];

        for (const validation of validations) {
            const { key, validator } = validation;
            if (!validator(data.data[key])) {
                console.log(`Invalid ${key}`);
                Alert.alert(`Invalid ${key}`, '', [{
                    text: 'Cancel',
                    style: 'cancel',
                }])
                return false;
            }
        }
        return true;
    };
    // Sử dụng hàm isValidData để kiểm tra tính hợp lệ của dữ liệu
    // Cái này lấy trên mạng hehe
    if (isValidData()) {
        // Nếu dữ liệu hợp lệ, tiếp tục xử lý
        console.log('Data is valid:', data);
    } else {
        // Nếu dữ liệu không hợp lệ, xử lý lỗi hoặc thông báo cho người dùng
        console.log('Invalid data, please check.');
    }
}

export default SignIn

const styles = StyleSheet.create({})