import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as BurgerIcon } from 'images/icons/burger.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    href="#"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Explore
                </a>
                <a
                    href="#"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Travel
                </a>
                <a
                    href="#"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Blog
                </a>
                <a
                    href="#"
                    className="hover:scale-105 pb-1 border-b-[3px] border-transparent hover:border-primary-2 duration-100"
                >
                    Pricing
                </a>
            </div>
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
                    <Menu.Items className="absolute right-0 mt-2 w-[280px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <a href="#" className="block text-primary-1 p-3">
                            Home
                        </a>
                        <a href="#" className="block text-primary-1 p-3">
                            Explore
                        </a>
                        <a href="#" className="block text-primary-1 p-3">
                            Travel
                        </a>
                        <a href="#" className="block text-primary-1 p-3">
                            Blog
                        </a>
                        <a href="#" className="block text-primary-1 p-3">
                            Pricing
                        </a>
                        <Link
                            to="/login"
                            className="block w-full text-center text-white p-3 bg-primary-1"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="block w-full text-center text-secondary-1 p-3"
                        >
                            Register
                        </Link>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default Navbar;
