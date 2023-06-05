import { ReactComponent as MailIcon } from 'images/icons/mail.svg';
import { ReactComponent as PasswordCloseEyeIcon } from 'images/icons/pass-close-eye.svg';
import { ReactComponent as PasswordOpenEyeIcon } from 'images/icons/pass-open-eye.svg';
import { ReactComponent as PasswordIcon } from 'images/icons/password.svg';
import { ReactComponent as ProfileIcon } from 'images/icons/profile.svg';
import RegisterBg from 'images/register_bg.jpg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passWord, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div className="flex min-h-screen">
            <div className="w-full lg:w-[50%] p-4 relative flex justify-center items-center">
                <div className="w-[calc(100%-40px)] pr-10 absolute top-10 left-10 flex justify-between items-center">
                    <Link to="/" className="font-play-fair text-4xl">
                        Campin
                    </Link>
                    <Link
                        to="/login"
                        className="text-2xl text-primary-1 font-medium hover:scale-105 duration-100"
                    >
                        Login
                    </Link>
                </div>
                <div className="w-full md:w-[676px] mx-auto">
                    <h2 className="text-[24px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold mb-2 md:mb-16">
                        Register and get ready for your trip.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                        <div>
                            <label
                                htmlFor="registerFullName"
                                className="text-sm text-[#9B9C9E] mb-4"
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="registerFullName"
                                    name="fullName"
                                    placeholder="First Name"
                                    className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                />
                                <ProfileIcon className="absolute left-5 top-4 w-[14px]" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="registerEmail" className="text-sm text-[#9B9C9E] mb-4">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="registerEmail"
                                    type="email"
                                    placeholder="Email"
                                    className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                />
                                <MailIcon className="absolute left-4 top-4" />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="registerPassword"
                                className="text-sm text-[#9B9C9E] mb-4"
                            >
                                Password
                            </label>
                            <div className="relative ">
                                <input
                                    id="registerPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    value={passWord}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                />
                                <PasswordIcon className="absolute left-4 top-4" />
                                {passWord &&
                                    (showPassword ? (
                                        <PasswordCloseEyeIcon
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                        />
                                    ) : (
                                        <PasswordOpenEyeIcon
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                        />
                                    ))}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="registerConfirmPassword"
                                className="text-sm text-[#9B9C9E] mb-4"
                            >
                                Confirm Password
                            </label>
                            <div className="relative ">
                                <input
                                    id="registerConfirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                />
                                <PasswordIcon className="absolute left-4 top-4" />
                                {confirmPassword &&
                                    (showPassword ? (
                                        <PasswordCloseEyeIcon
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                        />
                                    ) : (
                                        <PasswordOpenEyeIcon
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center my-3 md:my-12">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            className="w-5 h-5  accent-primary-1 cursor-pointer checked:bg-white checked:text-white checked:border-red-500"
                        />
                        <label
                            htmlFor="rememberMe"
                            className="ml-2 tracking-[0.15px] cursor-pointer"
                        >
                            I agree with
                            <a
                                href="#"
                                target="_blank"
                                className="text-primary-2 ml-2 hover:text-primary-1 duration-100"
                            >
                                Terms and conditions
                            </a>
                        </label>
                    </div>
                    <button className="w-full rounded-xl bg-primary-1 py-3 text-white font-bold leading-6 hover:scale-105 duration-200">
                        Create Account
                    </button>
                </div>
            </div>
            <img
                className="hidden lg:block w-[50%] min-h-screen max-h-screen h-full object-cover object-center"
                src={RegisterBg}
                alt="camping"
            />
        </div>
    );
};

export default Register;
