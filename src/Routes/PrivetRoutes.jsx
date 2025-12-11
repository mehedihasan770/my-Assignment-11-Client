import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import Loader from '../Components/Loading/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivetRoutes = ({children}) => {
     const location = useLocation();
    const { user, loading } = useAuth();
    if(loading) return <Loader/>;
    if(user) return children;
    return <Navigate state={location.pathname} to="/auth/signin"/>;
};
export default PrivetRoutes;