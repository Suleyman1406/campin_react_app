import { ProtectedRoute } from 'components/auth-guard/protected';
import Account from 'pages/account';
import CampsiteTable from 'pages/admin/campsite-table';
import AdminDashboard from 'pages/admin/dashboard';
import AdminUserTable from 'pages/admin/user-table';
import CampsiteDetail from 'pages/campsite-detail';
import Campsites from 'pages/campsites';
import FavoriteCampsites from 'pages/favorite-campsites';
import MakeReservation from 'pages/make-reservation';
import PageNotFound from 'pages/not-found';
import OwnerCampsites from 'pages/owner/campsite';
import OwnerReservations from 'pages/owner/reservation';
import Reservations from 'pages/reservation';
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
        path: '/reservations',
        element: (
            <ProtectedRoute>
                <Reservations />
            </ProtectedRoute>
        ),
    },
    {
        path: '/favorites',
        element: (
            <ProtectedRoute>
                <FavoriteCampsites />
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
    {
        path: '/owner/reservations',
        element: (
            <ProtectedRoute isOwner={true}>
                <OwnerReservations />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/dashboard',
        element: (
            <ProtectedRoute isAdmin={true}>
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/user-table',
        element: (
            <ProtectedRoute isAdmin={true}>
                <AdminUserTable />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/campsite-table',
        element: (
            <ProtectedRoute isAdmin={true}>
                <CampsiteTable />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]);
