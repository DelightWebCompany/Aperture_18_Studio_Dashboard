import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (url, inputData) => {
        setLoading(true);
        try {
            const res = await axios.post(url, inputData);
            if (res.status === 200 && res.data?.data?.token) {
                localStorage.setItem('token', res.data.data.token);
                message.success('Logged in successfully.');
                setError(null);
                navigate(res.data.data.user.role === 'system' || res.data.data.user.role === 'admin' ? '/admin' : '/');
                return res.data.data.user;
            }
        } catch (e) {
            const errorResponse = e.response?.data?.errors || 'An error occurred during login.';
            setError(errorResponse);
            message.error(errorResponse);
            console.error(e);
        } finally {
            setLoading(false);
        }
        return null;
    };

    return { login, error, loading };
};

export default useLogin;
