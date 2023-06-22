import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from 'components/navbar';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { ReactComponent as EditIcon } from 'images/icons/edit.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { getCampsiteById } from 'services/campsite/getCampsiteById';
import { createReservation } from 'services/reservation/createReservation';
import { notifyAxiosError } from 'utils';
import * as Yup from 'yup';

const ReservationValidationSchema = Yup.object().shape({
    numOfAdult: Yup.number().required('Adult count is required.'),
    numOfChilder: Yup.number().required('Child count is required.'),
    startDate: Yup.string().required('Start date is required.'),
    endDate: Yup.string().required('End date is required.'),
});

const CardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Is required.'),
    expirationDate: Yup.string().required('Is required.'),
    securityCode: Yup.string().required('Is required.'),
    cardHolderName: Yup.string().required('Card holder name is required.'),
});

const MakeReservation = () => {
    const [reservationInfo, setReservationInfo] = useState();
    const [paymentInfo, setPaymentInfo] = useState();
    const [campsiteInfo, setCampsiteInfo] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [getCampsiteInfoLoading, setCampsiteInfoLoading] = useState(true);
    const [makeReservationLoading, setMakeReservationLoading] = useState(false);
    const { campsiteId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setCampsiteInfoLoading(true);
        getCampsiteById(campsiteId)
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setCampsiteInfo(res.data.body);
                }
            })
            .catch((err) => {
                notifyAxiosError(err);
                navigate('/');
            })
            .finally(() => setCampsiteInfoLoading(false));
    }, [campsiteId]);

    useEffect(() => {
        if (!paymentInfo) return;
        const reservationPayload = {
            campsiteId,
            totalPrice,
            startDate: reservationInfo.startDate,
            endDate: reservationInfo.endDate,
            numOfAdult: +reservationInfo.numOfAdult,
            numOfChilder: +reservationInfo.numOfChilder,
            cardNumber: paymentInfo.cardNumber.replaceAll(' ', ''),
            expirationDate: paymentInfo.expirationDate.replaceAll(' ', ''),
            securityCode: paymentInfo.securityCode,
            cardHolderName: paymentInfo.cardHolderName,
        };
        setMakeReservationLoading(true);
        setTimeout(() => {
            createReservation(reservationPayload)
                .then(() => {
                    toast.success('Reservation successfully created!');
                    navigate('/');
                })
                .catch((err) => notifyAxiosError(err))
                .finally(() => setMakeReservationLoading(false));
        }, 4500);
    }, [paymentInfo]);

    return (
        <div className="bg-primary-1 min-h-screen">
            <div
                className="bg-bottom bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${LandingBg})` }}
            >
                <Navbar />
            </div>
            <div
                style={{
                    boxShadow:
                        'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
                }}
                className="w-[320px] min-h-screen rounded-3xl bg-white lg:w-[768px] xl:w-[1152px] mx-auto duration-75 py-2 lg:py-5 px-10"
            >
                {getCampsiteInfoLoading ? (
                    <div className="flex flex-col items-center pt-16">
                        <ClipLoader size={100} color={'#617143'} />
                        <span className="text-primary-1 font-play-fair text-2xl mt-2">
                            Loading...
                        </span>
                    </div>
                ) : (
                    <>
                        <div
                            className={`mt-10 bg-gray-50 px-4 lg:mt-0 py-8 mb-6 overflow-hidden duration-500 ${
                                !reservationInfo ? 'h-[350px]' : 'h-[105px]'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-medium">Reservation Details</p>
                                {reservationInfo && (
                                    <IoCheckmarkDoneCircleOutline size={40} color="green" />
                                )}
                            </div>
                            <Formik
                                initialValues={{
                                    numOfAdult: '',
                                    numOfChilder: '',
                                    startDate: '',
                                    endDate: '',
                                }}
                                enableReinitialize
                                validationSchema={ReservationValidationSchema}
                                onSubmit={(values) => {
                                    setReservationInfo(values);
                                    let totalPrice =
                                        Number(values.numOfAdult) *
                                        campsiteInfo.campsite.adultPrice;
                                    totalPrice +=
                                        Number(values.numOfChilder) *
                                        campsiteInfo.campsite.childPrice;
                                    setTotalPrice(totalPrice);
                                }}
                            >
                                {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 my-6 mt-10 ">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <div>
                                                    <DatePicker
                                                        label="Start Date"
                                                        className="m-auto lg:m-0"
                                                        value={
                                                            values['startDate']
                                                                ? dayjs(values['startDate'])
                                                                : null
                                                        }
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                'startDate',
                                                                new Date(value),
                                                            )
                                                        }
                                                        sx={{
                                                            width: '100%',
                                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderRadius: '8px',
                                                                    border: '1px solid #1A1D21',
                                                                },
                                                            '& .MuiOutlinedInput-root.Mui-focused':
                                                                {
                                                                    borderRadius: '8px',
                                                                    boxShadow:
                                                                        '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                                                },
                                                        }}
                                                    />
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.startDate && touched.startDate
                                                            ? errors.startDate
                                                            : ''}
                                                    </p>
                                                </div>
                                                <div>
                                                    <DatePicker
                                                        label="End Date"
                                                        className="m-auto lg:m-0"
                                                        value={
                                                            values['endDate']
                                                                ? dayjs(values['endDate'])
                                                                : null
                                                        }
                                                        onChange={(value) =>
                                                            setFieldValue(
                                                                'endDate',
                                                                new Date(value),
                                                            )
                                                        }
                                                        sx={{
                                                            width: '100%',
                                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                                {
                                                                    borderRadius: '8px',
                                                                    border: '1px solid #1A1D21',
                                                                },
                                                            '& .MuiOutlinedInput-root.Mui-focused':
                                                                {
                                                                    borderRadius: '8px',
                                                                    boxShadow:
                                                                        '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                                                },
                                                        }}
                                                    />
                                                    <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                        {errors.endDate && touched.endDate
                                                            ? errors.endDate
                                                            : ''}
                                                    </p>
                                                </div>
                                            </LocalizationProvider>
                                            <div>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        id="numOfAdult"
                                                        name="numOfAdult"
                                                        placeholder="Adult count"
                                                        value={values['numOfAdult']}
                                                        onChange={(e) =>
                                                            setFieldValue(
                                                                'numOfAdult',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setFieldTouched('numOfAdult', true)
                                                        }
                                                        className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                    />
                                                    <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                </div>
                                                <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                    {errors.numOfAdult && touched.numOfAdult
                                                        ? errors.numOfAdult
                                                        : ''}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        id="numOfChilder"
                                                        name="numOfChilder"
                                                        placeholder="Child count"
                                                        value={values['numOfChilder']}
                                                        onChange={(e) =>
                                                            setFieldValue(
                                                                'numOfChilder',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setFieldTouched('numOfChilder', true)
                                                        }
                                                        className="border border-[#1A1D21] outline-none w-full py-4 pl-[48px] rounded-[8px] focus:shadow-input hover:border-[#858585] duration-100"
                                                    />
                                                    <EditIcon className="absolute left-5 top-5 w-[14px]" />
                                                </div>
                                                <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                    {errors.numOfChilder && touched.numOfChilder
                                                        ? errors.numOfChilder
                                                        : ''}
                                                </p>
                                            </div>
                                            <button className="col-span-2 bg-primary-1 text-white rounded-lg py-3 uppercase font-bold hover:opacity-95 duration-100 active:scale-[0.99]">
                                                Add Reservation Details
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div
                            className={`mt-10 bg-gray-50 px-4 lg:mt-0 py-8 overflow-hidden duration-500 ${
                                !paymentInfo && reservationInfo ? 'h-[300px]' : 'h-[105px]'
                            }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xl font-medium">Payment Details</p>
                                    <p className="text-gray-400">
                                        Complete your order by providing your payment details.
                                    </p>
                                </div>
                                {paymentInfo && (
                                    <IoCheckmarkDoneCircleOutline size={40} color="green" />
                                )}
                                {!paymentInfo && totalPrice ? (
                                    <span className="text-xl text-primary-1 font-bold">
                                        {totalPrice}TL
                                    </span>
                                ) : (
                                    ''
                                )}
                            </div>

                            <Formik
                                initialValues={{
                                    cardNumber: '',
                                    expirationDate: '',
                                    securityCode: '',
                                    cardHolderName: '',
                                }}
                                enableReinitialize
                                validationSchema={CardValidationSchema}
                                onSubmit={(values) => setPaymentInfo(values)}
                            >
                                {({ values, setFieldValue, errors, touched, setFieldTouched }) => (
                                    <Form>
                                        <div className="flex flex-wrap gap-6 mt-1">
                                            <div>
                                                <label
                                                    htmlFor="card-no"
                                                    className="mt-4 mb-2 block text-sm font-medium"
                                                >
                                                    Card Details
                                                </label>
                                                <div className="w-full ">
                                                    <CreditCardInput
                                                        cardNumberInputProps={{
                                                            value: values['cardNumber'],
                                                            onChange: (e) =>
                                                                setFieldValue(
                                                                    'cardNumber',
                                                                    e.target.value,
                                                                ),
                                                        }}
                                                        cardExpiryInputProps={{
                                                            value: values['expirationDate'],
                                                            onChange: (e) =>
                                                                setFieldValue(
                                                                    'expirationDate',
                                                                    e.target.value,
                                                                ),
                                                        }}
                                                        cardCVCInputProps={{
                                                            value: values['securityCode'],
                                                            onChange: (e) =>
                                                                setFieldValue(
                                                                    'securityCode',
                                                                    e.target.value,
                                                                ),
                                                        }}
                                                        fieldClassName="input grow w-full p-4 w-[400px]"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="card-holder"
                                                    className="mt-5 mb-2 block text-sm font-medium"
                                                >
                                                    Card Holder
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="card-holder"
                                                        name="card-holder"
                                                        value={values['cardHolderName']}
                                                        onChange={(e) =>
                                                            setFieldValue(
                                                                'cardHolderName',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onBlur={() =>
                                                            setFieldTouched('cardHolderName', true)
                                                        }
                                                        className="rounded-md border w-[400px] border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="Your full name here"
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-gray-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="text-red-500 min-h-[24px] -mb-6 mt-1">
                                                    {errors.cardHolderName && touched.cardHolderName
                                                        ? errors.cardHolderName
                                                        : ''}
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                className="col-span-2 bg-primary-1 text-white rounded-lg py-[10px] px-4 h-fit uppercase font-bold hover:opacity-95 duration-100 active:scale-[0.99]"
                                            >
                                                Make Reservation
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </>
                )}
                {makeReservationLoading && (
                    <div className="flex flex-col items-center pt-16">
                        <ClipLoader size={100} color={'#617143'} />
                        <span className="text-primary-1 font-play-fair text-2xl mt-2">
                            Creating reservation...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MakeReservation;
