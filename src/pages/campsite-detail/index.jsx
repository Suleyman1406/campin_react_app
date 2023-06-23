import Map from 'components/map';
import Navbar from 'components/navbar';
import useAuth from 'context/auth';
import { ReactComponent as CapacityIcon } from 'images/icons/capacity.svg';
import { ReactComponent as ChildIcon } from 'images/icons/child.svg';
import { ReactComponent as FilledStarIcon } from 'images/icons/filled-star.svg';
import { ReactComponent as NotFilledStarIcon } from 'images/icons/not-filled-star.svg';
import { ReactComponent as PersonIcon } from 'images/icons/person.svg';
import LandingBg from 'images/landing_bg.jpeg';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineWifi } from 'react-icons/ai';
import { BiSignal5, BiSolidParking, BiWater } from 'react-icons/bi';
import { BsActivity, BsTree } from 'react-icons/bs';
import { FaBusinessTime, FaShower } from 'react-icons/fa';
import { IoWater } from 'react-icons/io5';
import { LiaToiletSolid } from 'react-icons/lia';
import { MdElectricBolt, MdSecurity } from 'react-icons/md';
import { PiFireExtinguisherDuotone } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { getCampsiteById } from 'services/campsite/getCampsiteById';
import { notifyAxiosError } from 'utils';

import CampsiteImgSlider from './slider';

const CampsiteDetail = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [campsiteDetail, setCampsiteDetail] = useState();
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setDataLoading(true);
        getCampsiteById(id)
            .then((res) => {
                if (res.data && res.data.succeeded) {
                    setCampsiteDetail(res.data.body);
                }
            })
            .catch((err) => notifyAxiosError(err))
            .finally(() => setDataLoading(false));
    }, [id]);

    const makeReservation = useCallback(() => {
        if (!user) return toast.warn('Please login for reservation.');
        if (campsiteDetail?.campsite?.campsiteId) {
            navigate(`/make-reservation/${campsiteDetail.campsite.campsiteId}`);
        }
    }, [campsiteDetail]);

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
                className="duration-75 w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto bg-white min-h-[calc(100vh-130px)] px-10 pb-8"
            >
                {dataLoading && (
                    <div className="flex flex-col items-center pt-16">
                        <ClipLoader size={100} color={'#617143'} />
                        <span className="text-primary-1 font-play-fair text-2xl mt-2">
                            Loading...
                        </span>
                    </div>
                )}
                {!dataLoading && campsiteDetail && (
                    <>
                        <CampsiteImgSlider images={campsiteDetail.imageUrls} />
                        <div className="flex flex-wrap justify-between">
                            <div>
                                <h1 className=" text-5xl">{campsiteDetail.campsite.name}</h1>
                                <h3 className="text-2xl mt-1 text-primary-1/70">
                                    {campsiteDetail.campsite.cityName +
                                        ' - ' +
                                        campsiteDetail.campsite.holidayDestinationName}
                                </h3>
                            </div>
                            <div className="flex flex-col items-end">
                                <button
                                    onClick={makeReservation}
                                    className="mt-4 py-3 px-6 bg-primary-1 text-white uppercase font-bold rounded-lg active:scale-95 hover:opacity-90 duration-100 text-lg"
                                >
                                    Make Reservation
                                </button>
                                <div className="flex gap-x-6 text-2xl mt-4 items-center ">
                                    <div className="flex gap-x-2 items-center text-primary-1">
                                        <CapacityIcon />
                                        <span>{campsiteDetail.campsite.capacity}</span>
                                    </div>
                                    <div className="flex gap-x-2 items-center text-primary-1">
                                        <PersonIcon />
                                        <span>{campsiteDetail.campsite.adultPrice}TL</span>
                                    </div>
                                    <div className="flex gap-x-2 items-center text-primary-1">
                                        <ChildIcon />
                                        <span>{campsiteDetail.campsite.childPrice}TL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-2 mt-2 items-center">
                            {Array(5)
                                .fill(1)
                                .map((_, idx) =>
                                    campsiteDetail.campsite.rate > idx ? (
                                        <FilledStarIcon className="fill-[#FDCC0D] w-7 h-7 " />
                                    ) : (
                                        <NotFilledStarIcon className="w-7 h-7" />
                                    ),
                                )}
                            <span className="translate-y-1 text-xl">
                                {campsiteDetail.campsite.rate + ' rate'}
                            </span>
                        </div>
                        <p className="text-xl mt-6">{campsiteDetail.campsite.description}</p>
                        <div className="flex gap-3 flex-wrap mt-6">
                            {Object.keys(campsiteDetail.features).map((key) =>
                                campsiteDetail.features[key] === true ? (
                                    <div className="bg-green-700 py-2 px-4 rounded-lg text-white capitalize flex items-center gap-x-3">
                                        {feautures[key]}
                                    </div>
                                ) : (
                                    ''
                                ),
                            )}
                        </div>
                        <div className="w-full md:w-[100%] h-[350px] mx-auto items-center mt-10">
                            <Map
                                position={{
                                    lat: Number(campsiteDetail.campsite.lat),
                                    lng: Number(campsiteDetail.campsite.lng),
                                }}
                                containerStyle={{
                                    width: '100%',
                                    height: '350px',
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CampsiteDetail;

const feautures = {
    hasActivities: (
        <>
            <BsActivity className="w-8 h-8" />
            <span>Activity</span>
        </>
    ),
    hasBusinessServices: (
        <>
            <FaBusinessTime className="w-8 h-8" />
            <span>Business Service</span>
        </>
    ),
    hasElectricity: (
        <>
            <MdElectricBolt className="w-8 h-8" />
            <span>Electricity</span>
        </>
    ),
    hasFirePit: (
        <>
            <PiFireExtinguisherDuotone className="w-8 h-8" />
            <span>Fire Pit</span>
        </>
    ),
    hasParking: (
        <>
            <BiSolidParking className="w-8 h-8" />
            <span>Parking</span>
        </>
    ),
    hasSecurity: (
        <>
            <MdSecurity className="w-8 h-8" />
            <span>Security</span>
        </>
    ),
    hasShower: (
        <>
            <FaShower className="w-8 h-8" />
            <span>Shower</span>
        </>
    ),
    hasSignal: (
        <>
            <BiSignal5 className="w-8 h-8" />
            <span>Signal</span>
        </>
    ),
    hasToilet: (
        <>
            <LiaToiletSolid className="w-8 h-8" />
            <span>Toilet</span>
        </>
    ),
    hasTrees: (
        <>
            <BsTree className="w-8 h-8" />
            <span>Trees</span>
        </>
    ),
    hasWater: (
        <>
            <IoWater className="w-8 h-8" />
            <span>Water</span>
        </>
    ),
    hasWiFi: (
        <>
            <AiOutlineWifi className="w-8 h-8" />
            <span>Wifi</span>
        </>
    ),
    isNearSea: (
        <>
            <BiWater className="w-8 h-8" />
            <span>Near Sea</span>
        </>
    ),
};
