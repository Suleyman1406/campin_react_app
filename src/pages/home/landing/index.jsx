import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Navbar from 'components/navbar';
import { PERSON_COUNT } from 'const';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import { ReactComponent as ArrowRightIcon } from 'images/icons/arrow-right.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCities } from 'services/city/getCities';
import { notifyAxiosError, removeEmpty } from 'utils';

const LandingSection = () => {
    const [cities, setCities] = useState([]);
    const [getCitiesLoading, setCitiesLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setCitiesLoading(true);
        getCities()
            .then((res) => {
                setCities(res.data);
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setCitiesLoading(false));
    }, []);

    return (
        <div
            className="min-h-screen bg-bottom bg-no-repeat bg-cover pb-[270px]"
            style={{ backgroundImage: `url(${LandingBg})` }}
        >
            <Navbar isLandingPage={true} />
            <div className="duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto mt-[80px] md:mt-[140px] text-white">
                <h1 className="text-[40px] md:text-[84px] font-play-fair leading-[53px] md:leading-[112px]">
                    Start your unforgettable <br />
                    journey with us.
                </h1>
                <p className="text-[18px] md:text-[24px] leading-[21px] md:leading-[28px] mt-4">
                    The best travel for your jouney begins now
                </p>
            </div>
            <Formik
                initialValues={{
                    cityName: '',
                    startDate: '',
                    enDate: '',
                }}
                enableReinitialize
                onSubmit={(values) => {
                    const searchValues = removeEmpty({ ...values });
                    navigate(
                        `/campsite?search=${encodeURIComponent(JSON.stringify(searchValues))}`,
                    );
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="relative mt-[80px] md:mt-[170px] lg:min-h-[216px] flex flex-col lg:block">
                            <div className="hidden lg:block absolute bg-white w-[80%] max-w-[1440px] 3xl:w-[65%] h-[216px] duration-100"></div>
                            <button
                                type="submit"
                                className="order-2 mx-auto lg:absolute bg-primary-1 w-[320px] md:w-[768px] lg:w-[170px] rounded-b-2xl lg:rounded-none lg:rounded-r-2xl lg:ml-[min(80%,1440px)] lg:3xl:ml-[65%] h-[128px] lg:h-[216px] flex gap-x-3 items-center justify-center font-play-fair px-5 hover:cursor-pointer duration-200 group"
                            >
                                <h3 className="text-[36px] text-white group-hover:scale-105 duration-150">
                                    Book Now
                                </h3>
                                <ArrowRightIcon className="group-hover:scale-110 duration-150" />
                            </button>
                            <div className="rounded-t-2xl lg:rounded-none order-1 bg-white lg:bg-transparent duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:flex gap-5 gap-x-1 lg:gap-x-5 py-10 xl:py-[74px]">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    className="m-auto lg:m-0"
                                    loading={getCitiesLoading}
                                    isOptionEqualToValue={(option, value) =>
                                        option.value === value.value
                                    }
                                    options={cities.map((d) => ({
                                        label: d.cityName,
                                        value: d.id,
                                    }))}
                                    onChange={(e, option) => {
                                        setFieldValue('cityName', option?.label ?? null);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="City" />}
                                    sx={{
                                        width: '220px',
                                        minWidth: '200px',
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                            {
                                                borderRadius: '8px',
                                                border: '1px solid #1A1D21',
                                            },
                                        '& .MuiOutlinedInput-root.Mui-focused': {
                                            borderRadius: '8px',
                                            boxShadow: '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                        },
                                    }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={PERSON_COUNT}
                                    className="m-auto lg:m-0"
                                    renderInput={(params) => (
                                        <TextField {...params} label="Person" />
                                    )}
                                    sx={{
                                        width: '220px',
                                        minWidth: '200px',
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                            {
                                                borderRadius: '8px',
                                                border: '1px solid #1A1D21',
                                            },
                                        '& .MuiOutlinedInput-root.Mui-focused': {
                                            borderRadius: '8px',
                                            boxShadow: '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                        },
                                    }}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    {/* <DemoContainer components={['DatePicker']}> */}
                                    <DatePicker
                                        label="Start Date"
                                        value={
                                            values['startDate'] ? dayjs(values['startDate']) : null
                                        }
                                        onChange={(value) =>
                                            setFieldValue(
                                                'startDate',
                                                dayjs(value).format('YYYY/MM/DD'),
                                            )
                                        }
                                        sx={{
                                            width: '220px',
                                            minWidth: '200px',
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                {
                                                    borderRadius: '8px',
                                                    border: '1px solid #1A1D21',
                                                },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                borderRadius: '8px',
                                                boxShadow:
                                                    '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                            },
                                        }}
                                        className="m-auto lg:m-0"
                                    />
                                    <DatePicker
                                        label="End Date"
                                        value={values['enDate'] ? dayjs(values['enDate']) : null}
                                        onChange={(value) =>
                                            setFieldValue(
                                                'enDate',
                                                dayjs(value).format('YYYY/MM/DD'),
                                            )
                                        }
                                        sx={{
                                            width: '220px',
                                            minWidth: '200px',
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                                {
                                                    borderRadius: '8px',
                                                    border: '1px solid #1A1D21',
                                                },
                                            '& .MuiOutlinedInput-root.Mui-focused': {
                                                borderRadius: '8px',
                                                boxShadow:
                                                    '0px 0px 0px 4px rgba(97, 113, 67, 0.34)',
                                            },
                                        }}
                                        className="m-auto lg:m-0"
                                    />
                                    {/* </DemoContainer> */}
                                </LocalizationProvider>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LandingSection;
