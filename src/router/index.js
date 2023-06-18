import { ProtectedRoute } from 'common/auth-guard/protected';
import Account from 'pages/account';
import Campsites from 'pages/campsite';
import OwnerCampsites from 'pages/owner/campsite';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/campsites',
        element: <Campsites />,
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
    },
    {
        path: '/owner/campsite',
        element: (
            <ProtectedRoute isOwner={true}>
                <OwnerCampsites />
            </ProtectedRoute>
        ),
    },
]);
