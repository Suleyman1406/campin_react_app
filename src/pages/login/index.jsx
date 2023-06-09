import useAuth from 'context/auth';
import { Form, Formik } from 'formik';
import { ReactComponent as AppleIcon } from 'images/icons/apple.svg';
import { ReactComponent as GoogleIcon } from 'images/icons/google.svg';
import { ReactComponent as MailIcon } from 'images/icons/mail.svg';
import { ReactComponent as PasswordCloseEyeIcon } from 'images/icons/pass-close-eye.svg';
import { ReactComponent as PasswordOpenEyeIcon } from 'images/icons/pass-open-eye.svg';
import { ReactComponent as PasswordIcon } from 'images/icons/password.svg';
import LoginBg from 'images/login_bg.jpg';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginFunc, loading } = useAuth();
    const navigate = useNavigate();
    const onSubmit = useCallback((values) => {
        loginFunc(values).then((res) => {
            if (res && res.data && res.data.succeeded) {
                navigate('/');
                toast.success('Logged in.');
            }
        });
    }, []);

    return (
        <div className="flex min-h-screen">
            <div className="w-full lg:w-[50%] p-4 relative flex justify-center items-center">
                <Link
                    to="/"
                    className="font-play-fair text-4xl absolute lg:top-10 lg:left-10 left-1 top-1"
                >
                    Campin
                </Link>
                <div className="w-full md:w-[496px] mx-auto">
                    <h2 className="text-[24px] leading-[32px] md:text-[36px] md:leading-[44px] font-bold">
                        Let&apos;s get <span className="text-primary-1">trip.</span>
                    </h2>
                    <h4 className="text-sm mt-3 md:mt-6 mb-5 md:mb-16 font-medium text-[#9B9C9E] tracking-[0.15px]">
                        Log in to Campin to start your holiday.
                    </h4>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={LoginValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
                            <Form>
                                <div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={values['email']}
                                            onChange={(e) => setFieldValue('email', e.target.value)}
                                            onBlur={() => setFieldTouched('email', true)}
                                            className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                        />
                                        <MailIcon className="absolute left-4 top-4" />
                                    </div>
                                    <p className="text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.email && touched.email ? errors.email : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="relative mt-6">
                                        <input
                                            placeholder="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values['password']}
                                            onChange={(e) => {
                                                setFieldValue('password', e.target.value);
                                            }}
                                            onBlur={() => setFieldTouched('password', true)}
                                            className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                        />
                                        <PasswordIcon className="absolute left-4 top-4" />
                                        {values['password'] &&
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
                                    <p className="text-red-500 min-h-[48px] -mb-6 mt-1">
                                        {errors.password && touched.password ? errors.password : ''}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center my-6 md:my-[48px]">
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
                                <button
                                    disabled={loading}
                                    className="w-full rounded-xl bg-primary-1 py-3 text-white font-bold leading-6  hover:scale-105 disabled:hover:scale-100 disabled:opacity-80 disabled:cursor-wait duration-200 flex items-center justify-center"
                                >
                                    <div className="w-[30px] h-[30px] flex items-center -ml-[30px] justify-center">
                                        <ClipLoader color={'white'} loading={loading} size={20} />
                                    </div>
                                    Log in
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className="relative border-b border-[#363A3D] my-5 md:my-[48px] h-1">
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
                    <p className="mt-4 md:mt-10 font-medium">
                        Don’t have an account?
                        <span className="ml-2 text-primary-1 hover:opacity-90">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </div>
            </div>
            <img
                className="hidden lg:block w-[50%] min-h-screen h-full object-cover object-left"
                src={LoginBg}
                alt="camping"
            />
        </div>
    );
};

export default Login;
