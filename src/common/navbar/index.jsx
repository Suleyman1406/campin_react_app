import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="w-[1440px] text-white mx-auto  py-10 flex justify-between items-center text-xl">
            <Link to="/" className="font-play-fair text-4xl">
                Campin
            </Link>
            <div className="flex gap-x-8">
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
            <div className="flex gap-x-9 items-center">
                <Link to="/login">
                    <button className="hover:scale-105 duration-100">Login</button>
                </Link>
                <Link to="/register">
                    <button className="px-8 py-5 bg-primary-1 rounded-xl border-2 border-transparent duration-150 hover:scale-105">
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
