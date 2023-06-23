import Navbar from 'components/navbar';
import dayjs from 'dayjs';
import { ReactComponent as ChildIcon } from 'images/icons/child.svg';
import { ReactComponent as PersonIcon } from 'images/icons/person.svg';
import NotFoundImg from 'images/image-not-found.png';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useEffect, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getReservations } from 'services/reservation/getReservation';
import { notifyAxiosError } from 'utils';

const Reservations = () => {
    const [reservations, setReservations] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getReservations()
            .then((res) => {
                if (res.data) {
                    setReservations(res.data);
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
                className="w-[320px] min-h-screen rounded-3xl bg-white lg:w-[768px] xl:w-[1152px] mx-auto duration-75 py-2 lg:py-5 px-10"
            >
                <h2 className="text-4xl font-play-fair font-bold">Reservations</h2>
                {loading ? (
                    <div className="flex items-center flex-col gap-y-3 mt-20">
                        <ClipLoader loading={true} size={60} color="#617143" />
                        <span className="text-2xl text-primary-1 font-play-fair">Loading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-7 mt-8">
                        {reservations &&
                            reservations.map((reservation) => (
                                <div
                                    key={reservation.campsite.campsiteId}
                                    className="flex rounded-lg"
                                    style={{
                                        boxShadow:
                                            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                    }}
                                >
                                    <img
                                        src={reservation.campsite.defaultImage ?? ''}
                                        alt="campsite"
                                        loading="lazy"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src = NotFoundImg;
                                        }}
                                        className="w-[250px] h-[232px] object-cover rounded-l-lg"
                                    />
                                    <div className="grow px-4 py-3">
                                        <div className="flex justify-between items-center">
                                            <Link
                                                to={`/campsite/${reservation.campsite.campsiteId}`}
                                                target="_blank"
                                            >
                                                <h3 className="text-xl text-primary-1 font-bold hover:underline">
                                                    {reservation.campsite.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center text-xl gap-x-6 mr-2 font-bold">
                                                Total:{' '}
                                                {Number(reservation.numOfAdult) *
                                                    reservation.campsite.adultPrice +
                                                    Number(reservation.numOfChilder) *
                                                        reservation.campsite.childPrice}
                                                TL
                                            </div>
                                        </div>
                                        <p className="h-[132px] overflow-auto mb-2 mt-2 text-lg w-[70%] customscrollbar">
                                            {reservation.campsite.description}
                                        </p>
                                        <div className="flex gap-x-6 text-2xl items-center">
                                            <div className="flex gap-x-2 items-center text-primary-1">
                                                <PersonIcon />
                                                <span>{reservation.numOfAdult}</span>
                                            </div>
                                            <div className="flex gap-x-2 items-center text-primary-1">
                                                <ChildIcon />
                                                <span>{reservation.numOfChilder}</span>
                                            </div>
                                            <div className="flex gap-x-2 items-center text-primary-1 ">
                                                <BsCalendarDate className="text-black" />
                                                <span className="text-sm">
                                                    {dayjs(reservation.startDate).format(
                                                        'MM/DD/YYYY',
                                                    )}
                                                </span>
                                                ~
                                                <span className="text-sm">
                                                    {dayjs(reservation.endDate).format(
                                                        'MM/DD/YYYY',
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reservations;
