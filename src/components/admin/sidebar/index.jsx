import useAuth from 'context/auth';
import React from 'react';
import { FaCampground } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const { logoutFunc } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <div className="w-[256px] h-screen"></div>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#444]">
                    <Link to="/" className="font-play-fair text-4xl text-white">
                        Campin
                    </Link>
                    <ul className="space-y-2 font-medium mt-16">
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center  p-2 rounded-lg text-white hover:bg-primary-1 ${
                                        isActive && 'bg-primary-1/50'
                                    }`
                                }
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/user-table"
                                className={({ isActive }) =>
                                    `flex items-center  p-2 rounded-lg text-white hover:bg-primary-1 ${
                                        isActive && 'bg-primary-1/50'
                                    }`
                                }
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/campsite-table"
                                className={({ isActive }) =>
                                    `flex items-center  p-2 rounded-lg text-white hover:bg-primary-1 ${
                                        isActive && 'bg-primary-1/50'
                                    }`
                                }
                            >
                                <FaCampground className="ml-1 fill-gray-400" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Campsites</span>
                            </NavLink>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {
                                    logoutFunc();
                                    navigate('/');
                                }}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
