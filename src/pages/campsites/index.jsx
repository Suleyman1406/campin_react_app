import { Autocomplete, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Campsite from 'components/campsite';
import dayjs from 'dayjs';
import { Form, Formik } from 'formik';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getCampsiteWithFilter } from 'services/campsite/getCampsiteWithFilter';
import { getHolidayDestination } from 'services/holiday-destination/getDestination';
import { notifyAxiosError, removeEmpty } from 'utils';

const Campsites = () => {
    const [holidayDestinations, setHolidayDestinations] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [getDataLoading, setDataLoading] = useState(false);
    const [campsites, setCampsites] = useState([]);
    const [getDestinationLoading, setDestinationLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        getHolidayDestination()
            .then((res) => setHolidayDestinations(res.data))
            .catch((err) => notifyAxiosError(err))
            .finally(() => setDestinationLoading(false));
    }, []);

    useEffect(() => {
        setDataLoading(true);
        const searchParametrs = searchParams.get('search');
        getCampsiteWithFilter(JSON.parse(searchParametrs) ?? {})
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setCampsites(res.data.body);
                }
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setDataLoading(false));
    }, [searchParams]);

    return (
        <>
            <img
                src={LandingBg}
                className="w-screen h-screen fixed left-0 top-0 bg-bottom bg-no-repeat bg-cover -z-10"
            />
            <div className="w-full bg-primary-1 rounded-b-[50px] py-2 relative z-10">
                <div className="w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75 pt-4 z-10">
                    <Link to="/" className="font-play-fair text-4xl text-white">
                        Campin
                    </Link>
                    <Formik
                        initialValues={{
                            cityName: '',
                            startDate: '',
                            enDate: '',
                        }}
                        enableReinitialize
                        onSubmit={(values) => {
                            const searchValues = removeEmpty({ ...values });
                            navigate(`?search=${encodeURIComponent(JSON.stringify(searchValues))}`);
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <div
                                    style={{
                                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                                    }}
                                    className="mt-5 flex gap-5 justify-center flex-wrap mx-auto duration-75 bg-white rounded-[25px] py-4 "
                                >
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        loading={getDestinationLoading}
                                        isOptionEqualToValue={(option, value) =>
                                            option.value === value.value
                                        }
                                        options={holidayDestinations.map((d) => ({
                                            label: d.holidayDestinationName,
                                            value: d.id,
                                        }))}
                                        onChange={(e, option) => {
                                            setFieldValue('cityName', option?.label ?? null);
                                        }}
                                        sx={{
                                            width: '27%',
                                            minWidth: '200px',
                                            '& .MuiOutlinedInput-root': {
                                                padding: '9px',
                                            },
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
                                        renderInput={(params) => (
                                            <TextField {...params} label="Destination" />
                                        )}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Season Start Date"
                                            value={
                                                values['startDate']
                                                    ? dayjs(values['startDate'])
                                                    : null
                                            }
                                            onChange={(value) =>
                                                setFieldValue(
                                                    'startDate',
                                                    dayjs(value).format('YYYY/MM/DD'),
                                                )
                                            }
                                            sx={{
                                                width: '27%',
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
                                        />
                                        <DatePicker
                                            label="Season Close Date"
                                            value={
                                                values['enDate'] ? dayjs(values['enDate']) : null
                                            }
                                            onChange={(value) =>
                                                setFieldValue(
                                                    'enDate',
                                                    dayjs(value).format('YYYY/MM/DD'),
                                                )
                                            }
                                            sx={{
                                                width: '27%',
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
                                        />
                                    </LocalizationProvider>
                                    <button
                                        type="submit"
                                        className="py-3 rounded text-white px-6 text-xl bg-primary-1"
                                    >
                                        Search
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div
                style={{
                    boxShadow:
                        'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
                }}
                className="z-[99999] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75 bg-[rgba(255,255,255,0.95)] h-fit min-h-[75vh] mt-6 py-4 px-6"
            >
                {getDataLoading ? (
                    <div className="flex items-center flex-col gap-y-3 mt-20">
                        <ClipLoader loading={true} size={60} color="#617143" />
                        <span className="text-2xl text-primary-1 font-play-fair">Loading...</span>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            }}
                            className="grid gap-4"
                        >
                            {campsites &&
                                campsites.map((campsite) => (
                                    <Campsite key={campsite.campsiteId} campsite={campsite} />
                                ))}
                        </div>
                        {campsites && campsites.length === 0 && (
                            <div className="mt-[200px] font-play-fair text-center text-3xl">
                                Campsite Not Found
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Campsites;
