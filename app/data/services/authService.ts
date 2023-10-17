'use client'

import axios from 'axios';
import { loginUrl, registerUrl } from '../constants/service';
import { statusCode } from '../constants/statusCode';
import { AuthResponse } from '../types/auth/authResponse';
import { RegisterDTO } from '../types/auth/registerDTO';

export const login = async(userName: string, password: string) => {
    try {
        const { data, status } = await axios.post<ApiResponse<AuthResponse>>(`${process.env.NEXT_BASE_URL}${loginUrl}`, {
            'UserName': userName,
            'Password': password
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return data;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            alert(error.message);
        } else {
            alert(`unexpected error: ${error}`);
        }
    }
}

export const register = async(registerData: RegisterDTO) => {
    try {
        const { data, status } = await axios.post<AuthResponse>(`${process.env.NEXT_BASE_URL}${registerUrl}`, registerData, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        if (status === statusCode.ok) {
            return data;
        } else if (status === statusCode.badRequest) {
            throw new Error('UserName or Password is incorrect');
        }

        throw new Error('An unexpected error occurred');
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
