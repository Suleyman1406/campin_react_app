import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Navbar from 'components/navbar';
import { CITIES, PERSON_COUNT } from 'const';
import { ReactComponent as ArrowRightIcon } from 'images/icons/arrow-right.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingSection = () => {
    return (
        <div
            className="min-h-screen bg-bottom bg-no-repeat bg-cover pb-[270px]"
            style={{ backgroundImage: `url(${LandingBg})` }}
        >
            <Navbar />
            <div className="duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto mt-[80px] md:mt-[140px] text-white">
                <h1 className="text-[40px] md:text-[84px] font-play-fair leading-[53px] md:leading-[112px]">
                    Start your unforgettable <br />
                    journey with us.
                </h1>
                <p className="text-[18px] md:text-[24px] leading-[21px] md:leading-[28px] mt-4">
                    The best travel for your jouney begins now
                </p>
            </div>
            <div className="relative mt-[80px] md:mt-[170px] lg:min-h-[216px] flex flex-col lg:block">
                <div className="hidden lg:block absolute bg-white w-[80%] max-w-[1440px] 3xl:w-[65%] h-[216px] duration-100"></div>
                <Link to="/campsite">
                    <div className="order-2 mx-auto lg:absolute bg-primary-1 w-[320px] md:w-[768px] lg:w-[170px] rounded-b-2xl lg:rounded-none lg:rounded-r-2xl lg:ml-[min(80%,1440px)] lg:3xl:ml-[65%] h-[128px] lg:h-[216px] flex gap-x-3 items-center justify-center font-play-fair px-5 hover:cursor-pointer duration-200 group">
                        <h3 className="text-[36px] text-white group-hover:scale-105 duration-150">
                            Book Now
                        </h3>
                        <ArrowRightIcon className="group-hover:scale-110 duration-150" />
                    </div>
                </Link>
                <div className="rounded-t-2xl lg:rounded-none order-1 bg-white lg:bg-transparent duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:flex gap-5 gap-x-1 lg:gap-x-5 py-10 xl:py-[74px]">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={CITIES}
                        sx={{ width: 220 }}
                        className="m-auto lg:m-0"
                        onChange={(e, value) => console.warn(value)}
                        renderInput={(params) => <TextField {...params} label="City" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={PERSON_COUNT}
                        sx={{ width: 220 }}
                        className="m-auto lg:m-0"
                        renderInput={(params) => <TextField {...params} label="Person" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                        <DatePicker
                            label="Check in"
                            sx={{ width: '220px' }}
                            className="m-auto lg:m-0"
                        />
                        <DatePicker
                            label="Check out"
                            sx={{ width: '220px' }}
                            className="m-auto lg:m-0"
                        />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
};

export default LandingSection;
