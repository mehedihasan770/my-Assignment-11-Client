import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './Auth';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxiosSecure = () => {
    const {user, signOutUser} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        const reqIS = axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })
        const resIS = axiosInstance.interceptors.response.use((res) => {
            return res
        }, (err) => {
            const statusCode = err.status;
            if(statusCode === 401 || statusCode === 403){
                signOutUser()
                navigate('/auth/signin')
            }
            return Promise.reject(err)
        })
        return () => {
            axiosInstance.interceptors.request.eject(reqIS)
            axiosInstance.interceptors.request.eject(resIS)
        }
    }, [user, signOutUser, navigate])
    return axiosInstance;
};

export default useAxiosSecure;