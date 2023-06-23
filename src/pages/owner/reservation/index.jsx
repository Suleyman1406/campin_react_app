import Navbar from 'components/navbar';
import dayjs from 'dayjs';
import { ReactComponent as ChildIcon } from 'images/icons/child.svg';
import { ReactComponent as PersonIcon } from 'images/icons/person.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getReservedCampsites } from 'services/campsite-owner/getReservedCampsite';
import { notifyAxiosError } from 'utils';

const OwnerReservations = () => {
    const [campsiteReserves, setCampsiteReserves] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getReservedCampsites()
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setCampsiteReserves(res.data.body);
                }
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setLoading(false));
    }, []);

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
                className="w-[450px] min-h-screen rounded-3xl bg-white md:w-[768px] xl:w-[1152px] mx-auto duration-75 py-2 lg:py-5 px-10"
            >
                <h2 className="text-4xl font-play-fair font-bold">Reservations</h2>
                {loading ? (
                    <div className="flex items-center flex-col gap-y-3 mt-20">
                        <ClipLoader loading={true} size={60} color="#617143" />
                        <span className="text-2xl text-primary-1 font-play-fair">Loading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-7 mt-8">
                        {campsiteReserves &&
                            campsiteReserves.map((campsiteReserve) => (
                                <div
                                    key={campsiteReserve.campsite.campsiteId}
                                    className="rounded-lg px-4 py-6"
                                    style={{
                                        boxShadow:
                                            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                    }}
                                >
                                    <Link
                                        to={`/campsite/${campsiteReserve.campsite.campsiteId}`}
                                        target="_blank"
                                    >
                                        <h3 className="text-2xl text-primary-1 font-bold hover:underline">
                                            {campsiteReserve.campsite.name}
                                        </h3>
                                    </Link>
                                    <h5 className="mt-3 font-play-fair font-bold">Reservations:</h5>
                                    <div className="flex flex-col gap-y-2 pl-3">
                                        {campsiteReserve.rezervations &&
                                            campsiteReserve.rezervations.map((res, idx) => (
                                                <div key={res.id} className="flex gap-x-3 text-lg">
                                                    <span>{idx + 1}.</span>
                                                    <div className="flex gap-x-2 items-center text-primary-1">
                                                        <PersonIcon />
                                                        <span>{res.numOfAdult}</span>
                                                    </div>
                                                    <div className="flex gap-x-2 items-center text-primary-1">
                                                        <ChildIcon />
                                                        <span>{res.numOfChilder}</span>
                                                    </div>
                                                    <div className="flex gap-x-2 items-center text-primary-1 ">
                                                        <BsCalendarDate className="text-black" />
                                                        <span className="text-sm">
                                                            {dayjs(res.startDate).format(
                                                                'MM/DD/YYYY',
                                                            )}
                                                        </span>
                                                        ~
                                                        <span className="text-sm">
                                                            {dayjs(res.endDate).format(
                                                                'MM/DD/YYYY',
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerReservations;
