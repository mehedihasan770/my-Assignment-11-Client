import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './Auth';
import { auth } from '../FirebaseConfig/Firebase';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

const useAxiosSecure = () => {
    const {user, signOutUser} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        const reqIS = axiosInstance.interceptors.request.use(async config => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const token = await currentUser.accessToken;
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
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