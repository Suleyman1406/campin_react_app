import './styles/custom.css';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'context/auth';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { router } from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
            <ToastContainer autoClose={2500} pauseOnHover theme="dark" />
        </AuthProvider>
    </React.StrictMode>,
);
