import useAuth from 'context/auth';
import { Form, Formik } from 'formik';
import { ReactComponent as MailIcon } from 'images/icons/mail.svg';
import { ReactComponent as PasswordCloseEyeIcon } from 'images/icons/pass-close-eye.svg';
import { ReactComponent as PasswordOpenEyeIcon } from 'images/icons/pass-open-eye.svg';
import { ReactComponent as PasswordIcon } from 'images/icons/password.svg';
import { ReactComponent as ProfileIcon } from 'images/icons/profile.svg';
import RegisterBg from 'images/register_bg.jpg';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const RegisterValidationSchema = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Name is required.'),
    surname: Yup.string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Surname is required.'),
    email: Yup.string().email('Invalid email').required('Email is required.'),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Phone Number is required.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
    confirmPassword: Yup.string()
        .required('Confirm password is required.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { registerFunc, loading } = useAuth();
    const navigate = useNavigate();

    const onSubmit = useCallback((values) => {
        registerFunc({ ...values, confirmPassword: undefined }).then((res) => {
            if (res && res.data && res.data.succeeded) {
                toast.success(res.data.message);
                navigate('/login');
            }
        });
    }, []);

    return (
        <div className="flex min-h-screen">
            <div className="w-full lg:w-[50%] p-4 relative flex flex-col md:flex-row justify-center items-center">
                <div className="w-full md:w-[calc(100%-40px)] mb-6 md:mb-0 md:pr-10 md:absolute top-10 left-10 flex justify-between items-center">
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
                    <Formik
                        initialValues={{
                            name: '',
                            surname: '',
                            email: '',
                            phoneNumber: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={RegisterValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label
                                            htmlFor="registerName"
                                            className="text-sm text-[#9B9C9E] mb-4"
                                        >
                                            Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="registerName"
                                                name="name"
                                                placeholder="Name"
                                                value={values['name']}
                                                onChange={(e) =>
                                                    setFieldValue('name', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('name', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <ProfileIcon className="absolute left-5 top-4 w-[14px]" />
                                        </div>
                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                            {errors.name && touched.name ? errors.name : ''}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="registerSurname"
                                            className="text-sm text-[#9B9C9E] mb-4"
                                        >
                                            Surname
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="surname"
                                                id="registerSurname"
                                                placeholder="Surname"
                                                value={values['surname']}
                                                onChange={(e) =>
                                                    setFieldValue('surname', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('surname', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <ProfileIcon className="absolute left-5 top-4 w-[14px]" />
                                        </div>
                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                            {errors.surname && touched.surname
                                                ? errors.surname
                                                : ''}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="registerEmail"
                                            className="text-sm text-[#9B9C9E] mb-4"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="registerEmail"
                                                placeholder="Email"
                                                value={values['email']}
                                                onChange={(e) =>
                                                    setFieldValue('email', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('email', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <MailIcon className="absolute left-4 top-4" />
                                        </div>
                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                            {errors.email && touched.email ? errors.email : ''}
                                        </p>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="registerPhoneNumber"
                                            className="text-sm text-[#9B9C9E] mb-4"
                                        >
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="registerPhoneNumber"
                                                placeholder="Phone number"
                                                autoComplete="new-password"
                                                value={values['phoneNumber']}
                                                onChange={(e) =>
                                                    setFieldValue('phoneNumber', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('phoneNumber', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <MailIcon className="absolute left-4 top-4" />
                                        </div>
                                        <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                            {errors.phoneNumber && touched.phoneNumber
                                                ? errors.phoneNumber
                                                : ''}
                                        </p>
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
                                                placeholder="Password"
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
                                                        onClick={() =>
                                                            setShowPassword((prev) => !prev)
                                                        }
                                                        className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                                    />
                                                ) : (
                                                    <PasswordOpenEyeIcon
                                                        onClick={() =>
                                                            setShowPassword((prev) => !prev)
                                                        }
                                                        className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                                    />
                                                ))}
                                        </div>
                                        <p className="text-red-500 min-h-[48px] -mb-6 mt-1">
                                            {errors.password && touched.password
                                                ? errors.password
                                                : ''}
                                        </p>
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
                                                placeholder="Confirm password"
                                                value={values['confirmPassword']}
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        'confirmPassword',
                                                        e.target.value,
                                                    );
                                                }}
                                                onBlur={() =>
                                                    setFieldTouched('confirmPassword', true)
                                                }
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <PasswordIcon className="absolute left-4 top-4" />
                                            {values['confirmPassword'] &&
                                                (showPassword ? (
                                                    <PasswordCloseEyeIcon
                                                        onClick={() =>
                                                            setShowPassword((prev) => !prev)
                                                        }
                                                        className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                                    />
                                                ) : (
                                                    <PasswordOpenEyeIcon
                                                        onClick={() =>
                                                            setShowPassword((prev) => !prev)
                                                        }
                                                        className="absolute right-4 top-3 hover:bg-gray-100 rounded cursor-pointer"
                                                    />
                                                ))}
                                        </div>
                                        <p className="text-red-500 min-h-[48px] -mb-6 mt-1">
                                            {errors.confirmPassword && touched.confirmPassword
                                                ? errors.confirmPassword
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center my-3 md:mb-8 mt-10">
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
                                            className="text-secondary-2 ml-2 hover:underline hover:text-primary-1 duration-100"
                                        >
                                            Terms and conditions
                                        </a>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-primary-1 py-3 text-white font-bold leading-6 border-[3px] border-transparent hover:border-primary-1 hover:text-primary-1 hover:bg-transparent disabled:hover:border-transparent disabled:hover:text-white disabled:hover:bg-primary-1 disabled:opacity-80 disabled:cursor-wait duration-200 flex items-center justify-center"
                                >
                                    <div className="w-[30px] h-[30px] flex items-center -ml-[30px] justify-center">
                                        <ClipLoader color={'white'} loading={loading} size={20} />
                                    </div>
                                    Create Account
                                </button>
                            </Form>
                        )}
                    </Formik>
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
