import { Menu, Transition } from '@headlessui/react';
import useAuth from 'context/auth';
import { ReactComponent as BurgerIcon } from 'images/icons/burger.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logoutFunc } = useAuth();

    return (
        <div className="duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] text-white mx-auto  py-10 flex justify-between items-center text-xl">
            <Link to="/" className="font-play-fair text-4xl">
                Campin
            </Link>
            <div className="lg:flex gap-x-8 hidden">
                <a href="#" className="hover:scale-105 pb-1 border-b-[3px] border-primary-1">
                    Home
                </a>
                <a
                    href="#home_popular_destinations_section"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Explore
                </a>
                <a
                    href="#home_special_offers_section"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Travel
                </a>
                <a
                    href="#home_blog_section"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Blog
                </a>
                <a
                    href="#home_experiences_section"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Experiences
                </a>
            </div>
            {!user && (
                <div className="gap-x-9 items-center hidden lg:flex">
                    <Link to="/login">
                        <button className="hover:scale-105 duration-100">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="px-8 py-5 bg-primary-1 rounded-xl border-2 border-transparent duration-150 hover:scale-105">
                            Sign up
                        </button>
                    </Link>
                </div>
            )}
            {user && (
                <Menu as="div" className="relative hidden text-left lg:inline-block">
                    <Menu.Button>
                        <div className="hidden lg:flex items-center gap-x-5 capitalize">
                            <p className="font-bold">{user.name + ' ' + user.surname}</p>
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                                className="rounded-full w-[50px] h-[50px] object-cover"
                            />
                        </div>
                    </Menu.Button>
                    <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute text-center right-0 mt-2 w-[280px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Link
                                to="/"
                                className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                            >
                                Account
                            </Link>
                            <button
                                onClick={() => logoutFunc()}
                                className="w-full text-white rounded-b-md p-3 bg-primary-1 hover:opacity-70"
                            >
                                Logout
                            </button>
                        </Menu.Items>
                    </Transition>
                </Menu>
            )}

            <Menu as="div" className="relative inline-block text-left lg:hidden">
                <div>
                    <Menu.Button className="lg:hidden inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <BurgerIcon />
                    </Menu.Button>
                </div>
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute text-center right-0 mt-2 w-[280px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && (
                            <Link
                                to="/"
                                className="p-3 flex justify-center items-center gap-x-3 hover:scale-105 duration-100"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                                    alt="profile"
                                    className="w-[40px] h-[40px] object-cover rounded-full"
                                />
                                <p className="font-bold text-primary-1">Account</p>
                            </Link>
                        )}
                        <a
                            href="#"
                            className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                        >
                            Home
                        </a>
                        <a
                            href="#home_popular_destinations_section"
                            className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                        >
                            Explore
                        </a>
                        <a
                            href="#home_special_offers_section"
                            className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                        >
                            Travel
                        </a>
                        <a
                            href="#home_blog_section"
                            className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                        >
                            Blog
                        </a>
                        <a
                            href="#home_experiences_section"
                            className="block hover:bg-primary-1/40 duration-100 text-primary-1 p-3"
                        >
                            Experiences
                        </a>
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block w-full text-center text-white p-3 bg-primary-1 hover:opacity-90 duration-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full text-center text-secondary-1 p-3 hover:opacity-90 duration-100"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        {user && (
                            <button
                                onClick={() => logoutFunc()}
                                className="w-full text-white rounded-b-md p-3 bg-primary-1 hover:opacity-70"
                            >
                                Logout
                            </button>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default Navbar;
