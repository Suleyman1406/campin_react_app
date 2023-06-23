import useAuth from 'context/auth';
import { ReactComponent as CapacityIcon } from 'images/icons/capacity.svg';
import { ReactComponent as ChildIcon } from 'images/icons/child.svg';
import { ReactComponent as FilledStarIcon } from 'images/icons/filled-star.svg';
import { ReactComponent as LocationIcon } from 'images/icons/location.svg';
import { ReactComponent as NotFilledStarIcon } from 'images/icons/not-filled-star.svg';
import { ReactComponent as PersonIcon } from 'images/icons/person.svg';
import NotFoundImg from 'images/image-not-found.png';
import React, { useCallback } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { addToFavoriteCampsite } from 'services/favorite-campsite/addToFavoriteCampsite';
import { removeFromFavoriteCampsite } from 'services/favorite-campsite/removeFromFavoriteCampsite';
import { notifyAxiosError } from 'utils';

const Campsite = ({ campsite, isFavorite, setFavoriteCampsites }) => {
    const { user } = useAuth();

    const onFavClick = useCallback(() => {
        if (isFavorite) {
            removeFromFavoriteCampsite(campsite.campsiteId)
                .then((res) => {
                    if (res.data && res.data.succeeded) {
                        setFavoriteCampsites((prev) => [
                            ...prev.filter((c) => c.campsiteId !== campsite.campsiteId),
                        ]);
                    }
                })
                .catch((err) => notifyAxiosError(err));
        } else {
            addToFavoriteCampsite(campsite.campsiteId)
                .then((res) => {
                    if (res.data && res.data.succeeded) {
                        setFavoriteCampsites((prev) => [...prev, campsite]);
                    }
                })
                .catch((err) => notifyAxiosError(err));
        }
    }, [user, campsite, isFavorite]);

    return (
        <div
            style={{
                boxShadow:
                    'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
            }}
            className="bg-white max-w-[500px] min-h-[200px] rounded-t-md duration-75 hover:shadow-xl pb-4"
        >
            <img
                src={campsite.defaultImage ?? ''}
                loading="lazy"
                alt="Asset photo"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = NotFoundImg;
                }}
                className="w-full h-[180px]  object-cover rounded-t-md"
            />
            <div className="mt-2 px-3">
                <h3 className="font-play-fair text-xl text-black/70">{campsite.name}</h3>
                <div className="flex gap-x-2 mt-2">
                    {Array(5)
                        .fill(1)
                        .map((_, idx) =>
                            campsite.rate > idx ? (
                                <FilledStarIcon className="fill-[#FDCC0D]" />
                            ) : (
                                <NotFilledStarIcon />
                            ),
                        )}
                </div>
                <p className="mt-4 text-sm tracking-wider h-[80px] overflow-auto customscrollbar">
                    {campsite.description}
                </p>
                <div className="flex gap-x-6 text-lg mt-4 items-center">
                    <div className="flex gap-x-2 items-center text-primary-1">
                        <CapacityIcon />
                        <span>{campsite.capacity}</span>
                    </div>
                    <div className="flex gap-x-2 items-center text-primary-1">
                        <PersonIcon />
                        <span>{campsite.adultPrice}TL</span>
                    </div>
                    <div className="flex gap-x-2 items-center text-primary-1">
                        <ChildIcon />
                        <span>{campsite.childPrice}TL</span>
                    </div>
                </div>
                <div className="flex gap-x-5 mt-3 items-center">
                    <Link
                        to={
                            campsite.lat && campsite.lng
                                ? `https://www.google.com/maps/search/?api=1&query=${campsite.lat},${campsite.lng}`
                                : '/'
                        }
                        target="_blank"
                        className="ml-auto mr-2 flex flex-col items-center"
                    >
                        <LocationIcon className="w-7 h-7" />
                        <span className="text-[9px]">Location</span>
                    </Link>
                    <Link to={`/campsite/${campsite.campsiteId}`} className="grow">
                        <button className="w-full py-2 bg-primary-1 text-white hover:text-primary-1 border-2 border-transparent hover:border-primary-1 hover:bg-transparent rounded-md duration-100 ">
                            Detail
                        </button>
                    </Link>
                    {user && (
                        <button
                            onClick={onFavClick}
                            className="flex flex-col items-center active:scale-95 duration-100"
                        >
                            {isFavorite ? (
                                <AiFillHeart className="w-7 h-7 fill-red-600" />
                            ) : (
                                <AiOutlineHeart className="w-7 h-7 " />
                            )}
                            <span className="text-[9px]">Fav</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Campsite;
