import useAuth from 'context/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, isOwner = false, isAdmin = false }) => {
    const { user, getIsCampsiteOwner, getIsAdmin } = useAuth();
    if (!user || (isOwner && !getIsCampsiteOwner()) || (isAdmin && !getIsAdmin()))
        return <Navigate to="/" />;

    return children;
};
