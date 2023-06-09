import useAuth from 'context/auth';
import { Form, Formik } from 'formik';
import { ReactComponent as EditIcon } from 'images/icons/edit.svg';
import { ReactComponent as PenIcon } from 'images/icons/pen.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { editUserInfo } from 'services/user/editUserInfo';
import { notifyAxiosError } from 'utils';
import * as Yup from 'yup';

const EditAccounValidationSchema = Yup.object().shape({
    name: Yup.string().min(4, 'Too Short!').max(30, 'Too Long!').required('Name is required.'),
    surname: Yup.string()
        .min(4, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Surname is required.'),
    email: Yup.string().email('Invalid email').required('Email is required.'),
});

const Account = () => {
    const { user, setUser } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const onSubmit = useCallback((values) => {
        setLoading(true);
        editUserInfo({ ...values, userID: user.userID ?? user.id })
            .then((res) => {
                setUser(res.data);
                toast.success('User info successfully edited.');
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div
            className="bg-primary-1 min-h-screen bg-bottom bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${LandingBg})` }}
        >
            <div
                style={{
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                }}
                className="w-[320px] min-h-screen rounded-3xl bg-white lg:w-[768px] xl:w-[1152px] mx-auto duration-75 py-2 lg:py-5"
            >
                <Link to="/" className="font-play-fair text-4xl ml-8">
                    Campin
                </Link>
                <div className="flex flex-col items-center py-2 lg:py-5">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                            alt="profile"
                            className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] object-cover rounded-full bg-white shadow-md"
                        />
                        <div className="flex gap-x-2  items-center cursor-pointer mt-2 hover:scale-105 duration-100">
                            <span className="text-[20px]"> Change Picture </span>
                            <PenIcon />
                        </div>
                    </div>

                    <Formik
                        initialValues={{
                            name: user.name ?? '',
                            email: user.email ?? '',
                            role: user.role ?? user.roles?.[0] ?? '',
                            surname: user.surname ?? '',
                            contry: user.contry ?? '',
                            address: user.address ?? '',
                            gender: user.gender ?? 0,
                            phoneNumber: user.phoneNumber ?? '',
                        }}
                        validationSchema={EditAccounValidationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
                            <Form className="flex flex-col gap-y-8">
                                <div className="mt-8">
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_name"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Name:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                id="account_name"
                                                type="text"
                                                placeholder="Name"
                                                value={values['name']}
                                                onChange={(e) =>
                                                    setFieldValue('name', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('name', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="lg:ml-[136px] text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.name && touched.name ? errors.name : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_surname"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Surname:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                id="account_surname"
                                                type="text"
                                                placeholder="Surname"
                                                value={values['surname']}
                                                onChange={(e) =>
                                                    setFieldValue('surname', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('surname', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="lg:ml-[136px] text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.surname && touched.surname ? errors.surname : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_email"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Email:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                disabled
                                                id="account_email"
                                                type="text"
                                                placeholder="Email"
                                                value={values['email']}
                                                onChange={(e) =>
                                                    setFieldValue('email', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('email', true)}
                                                className="border disabled:opacity-50 disabled:cursor-not-allowed border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] disabled:hover:border-[#1A1D21] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="lg:ml-[136px] text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.email && touched.email ? errors.email : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_role"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Role:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                disabled
                                                id="account_role"
                                                type="text"
                                                placeholder="Role"
                                                value={values['role']}
                                                onChange={(e) =>
                                                    setFieldValue('role', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('role', true)}
                                                className="border disabled:opacity-50 disabled:cursor-not-allowed border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] disabled:hover:border-[#1A1D21] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="lg:ml-[136px] text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.role && touched.role ? errors.role : ''}
                                    </p>
                                </div>
                                <div className="flex text-xl  flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row mb-2">
                                    <span className="text-xl font-bold text-primary-1 w-[120px]">
                                        Gender
                                    </span>
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio w-5 h-5 accent-primary-1"
                                                name="account_gender"
                                                value="male"
                                                checked={values['gender'] === 0}
                                                onChange={() => setFieldValue('gender', 0)}
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className="form-radio w-5 h-5 accent-primary-1"
                                                name="account_gender"
                                                value="female"
                                                checked={values['gender'] === 1}
                                                onChange={() => setFieldValue('gender', 1)}
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_surname"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Country:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                id="account_country"
                                                type="text"
                                                placeholder="Country"
                                                value={values['contry']}
                                                onChange={(e) =>
                                                    setFieldValue('contry', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('contry', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.contry && touched.contry ? errors.contry : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_address"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Address:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                id="account_address"
                                                type="text"
                                                placeholder="Address"
                                                value={values['address']}
                                                onChange={(e) =>
                                                    setFieldValue('address', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('address', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.address && touched.address ? errors.address : ''}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col lg:items-center gap-y-2 gap-x-4 lg:flex-row">
                                        <label
                                            htmlFor="account_phoneNumber"
                                            className="text-xl font-bold text-primary-1 w-[120px]"
                                        >
                                            Phone Number:
                                        </label>
                                        <div className="relative lg:w-[400px]">
                                            <input
                                                id="account_phoneNumber"
                                                type="text"
                                                placeholder="Phone Number"
                                                value={values['phoneNumber']}
                                                onChange={(e) =>
                                                    setFieldValue('phoneNumber', e.target.value)
                                                }
                                                onBlur={() => setFieldTouched('phoneNumber', true)}
                                                className="border border-[#1A1D21] outline-none w-full py-3 pl-[52px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                            />
                                            <EditIcon className="absolute left-4 top-4" />
                                        </div>
                                    </div>
                                    <p className="text-red-500 min-h-[24px] -mb-4 mt-1">
                                        {errors.phoneNumber && touched.phoneNumber
                                            ? errors.phoneNumber
                                            : ''}
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary-1 text-white rounded-lg py-4 text-xl font-bold uppercase border-[3px] border-transparent hover:border-primary-1 disabled:hover:border-transparent hover:bg-transparent disabled:hover:bg-primary-1 hover:text-primary-1 disabled:hover:text-white duration-100 flex items-center justify-center gap-x-3 disabled:opacity-90"
                                >
                                    <div className="w-[30px] h-[30px] flex items-center -ml-[30px] justify-center">
                                        <ClipLoader color={'white'} loading={isLoading} size={25} />
                                    </div>
                                    Save
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Account;
