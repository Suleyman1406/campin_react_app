import useAuth from 'context/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, isOwner = false }) => {
    const { user, isCampsiteOwner } = useAuth();
    if (!user || (isOwner && !isCampsiteOwner())) return <Navigate to="/" />;

    return children;
};
