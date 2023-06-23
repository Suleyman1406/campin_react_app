import AdminSidebar from 'components/admin/sidebar';
import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="grow  h-[400px] flex min-h-screen justify-center items-center">
                <h1 className="text-5xl font-play-fair animate-bounce">Coming soon...</h1>
            </div>
        </div>
    );
};

export default AdminDashboard;
