import React, { useEffect } from 'react';
import useDashboardRole from '../Hooks/useDashboardRole';
import { useNavigate } from 'react-router';
import Loader from '../Components/Loading/Loader';

const CreatorRoutes = ({children}) => {
    const navigate = useNavigate()
    const { roleData, roleLoading } = useDashboardRole();
    useEffect(() => {
        if (!roleLoading) {
            if (roleData?.role !== 'creator') {
                navigate("/");
            }
        }
    }, [roleData, roleLoading, navigate]);
    if(roleLoading) return <Loader></Loader>
    if(roleData.role !== 'creator') return null;
    return children
};

export default CreatorRoutes;