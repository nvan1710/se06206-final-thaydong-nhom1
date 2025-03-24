import axios from 'axios';
import { BASE_URL } from './api';

const API_URL =`${BASE_URL}/api/auth`;

// Sign-up function
export const signUp = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/sign-up`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Server error' };
    }
};

// Sign-in function
export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/sign-in`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Server error' };
    }
};