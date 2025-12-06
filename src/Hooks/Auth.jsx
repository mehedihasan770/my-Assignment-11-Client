import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

export const useAuth = () => {
    const userInfo = useContext(AuthContext)
    return userInfo
};