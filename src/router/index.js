import { ProtectedRoute } from 'components/auth-guard/protected';
import Account from 'pages/account';
import CampsiteDetail from 'pages/campsite-detail';
import Campsites from 'pages/campsites';
import MakeReservation from 'pages/make-reservation';
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
        path: '/campsite',
        element: <Campsites />,
    },
    {
        path: '/campsite/:id',
        element: <CampsiteDetail />,
    },
    {
        path: '/make-reservation/:campsiteId',
        element: (
            <ProtectedRoute>
                <MakeReservation />
            </ProtectedRoute>
        ),
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
