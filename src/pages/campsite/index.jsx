import { Autocomplete, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CITIES } from 'const';
import React from 'react';

const Campsites = () => {
    return (
        <div className="w-full bg-primary-1 rounded-b-[50px] py-10">
            <div className="w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75">
                <div className="rounded-t-2xl lg:rounded-none order-1 bg-white lg:bg-transparent duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:flex gap-5 gap-x-1 lg:gap-x-5 py-10 xl:py-[74px]">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={CITIES}
                        sx={{ width: 220 }}
                        className="m-auto lg:m-0"
                        renderInput={(params) => <TextField {...params} label="City" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
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

export default Campsites;
