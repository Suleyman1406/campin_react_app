import { ReactComponent as AppleIcon } from 'images/icons/apple.svg';
import { ReactComponent as GoogleIcon } from 'images/icons/google.svg';
import { ReactComponent as MailIcon } from 'images/icons/mail.svg';
import { ReactComponent as PasswordCloseEyeIcon } from 'images/icons/pass-close-eye.svg';
import { ReactComponent as PasswordOpenEyeIcon } from 'images/icons/pass-open-eye.svg';
import { ReactComponent as PasswordIcon } from 'images/icons/password.svg';
import LoginBg from 'images/login_bg.jpg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passWord, setPassword] = useState('');
    return (
        <div className="flex min-h-screen">
            <div className="w-[50%] p-4 relative flex justify-center items-center">
                <Link to="/" className="font-play-fair text-4xl absolute top-10 left-10">
                    Campin
                </Link>
                <div className="w-[496px] mx-auto">
                    <h2 className="text-[36px] leading-[44px] font-bold">
                        Let&apos;s get <span className="text-primary-1">trip.</span>
                    </h2>
                    <h4 className="mt-6 mb-16 font-medium text-[#9B9C9E] tracking-[0.15px]">
                        Log in to Campin to start your holiday.
                    </h4>
                    <form>
                        <div className="relative">
                            <input
                                type="Email"
                                placeholder="Email"
                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                            />
                            <MailIcon className="absolute left-4 top-4" />
                        </div>
                        <div className="relative mt-6">
                            <input
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
                        <div className="flex justify-between items-center my-[48px]">
                            <div className="flex items-center">
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
                                    Remember Me
                                </label>
                            </div>
                            <a href="#" className="text-primary-1 font-semibold">
                                Forgot password?
                            </a>
                        </div>
                        <button className="w-full rounded-xl bg-primary-1 py-3 text-white font-bold leading-6">
                            Log in
                        </button>
                    </form>
                    <div className="relative border-b border-[#363A3D] mt-[48px] h-1 mb-[48px]">
                        <p className="absolute -top-2 px-4 text-[#686B6E] left-[50%] -translate-x-[50%] bg-white">
                            or continue with
                        </p>
                    </div>
                    <div className="flex gap-x-6">
                        <button
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                            }}
                            className="flex justify-center items-center w-full gap-x-3 py-3 rounded-xl  hover:shadow-sm duration-100"
                        >
                            <GoogleIcon />
                            <p>Google Account</p>
                        </button>
                        <button
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                            }}
                            className="flex justify-center items-center w-full gap-x-3 py-3 rounded-xl hover:shadow-sm duration-100"
                        >
                            <AppleIcon />
                            <p>Apple Account</p>
                        </button>
                    </div>
                    <p className="mt-10 font-medium">
                        Don’t have an account?
                        <span className="ml-2 text-primary-1 hover:opacity-90">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </div>
            </div>
            <img
                className="w-[50%] min-h-screen h-full object-cover object-left"
                src={LoginBg}
                alt="camping"
            />
        </div>
    );
};

export default Login;
