// import { ReactComponent as LeftArrowIcon } from 'images/icons/little-arrow-left.svg';
// import { ReactComponent as RightArrowIcon } from 'images/icons/little-arrow-right.svg';
import React from 'react';

import { DESTINATIONS } from './destinations';

const PopularDestinations = () => {
    return (
        <div className="my-[60px] md:my-[140px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75">
            <h2 className="font-play-fair text-secondary-1 text-[54px] leading-[71px] md:text-[64px] md:leading-[85px]">
                Popular Destinations
            </h2>
            <div className="w-[220px] md:w-[365px] h-1 border-b-[3px] border-primary-1 mt-5 mb-8"></div>
            <div className="flex justify-between items-center">
                <p className="text-[#767E86] text-[20px] leading-[23px] md:text-[24px] md:leading-[28px]">
                    Most popular destinations around the world, from historical places to natural
                    wonders.
                </p>
                {/* <div className="flex gap-x-10">
                    <div
                        onClick={() => swipeRight()}
                        className="py-5 px-7 bg-secondary-1 rounded-xl hover:opacity-90 duration-100 cursor-pointer"
                    >
                        <LeftArrowIcon />
                    </div>
                    <div
                        onClick={() => swipeLeft()}
                        className="py-5 px-7 bg-primary-1 rounded-xl hover:opacity-90 duration-100 cursor-pointer"
                    >
                        <RightArrowIcon />
                    </div>
                </div> */}
            </div>
            <div className="relative w-full h-[320px] md:h-[530px] xl:h-[600px] mt-6 md:mt-10 overflow-x-auto customscrollbar duration-100">
                <div className={`absolute left-0 flex w-fit duration-100`}>
                    {DESTINATIONS.map((dest, idx) => (
                        <div
                            key={idx}
                            className="relative w-[250px] md:w-[400px] xl:w-[500px] h-[300px] md:h-[450px] xl:h-[550px] mr-5 cursor-pointer group overflow-hidden rounded-[26px]"
                        >
                            <img
                                src={dest.img}
                                alt={dest.title}
                                className="w-full h-full object-cover rounded-[26px] group-hover:scale-105 duration-150"
                            />
                            <div className="absolute left-0 top-0 z-10 bg-[rgba(255,255,255,0.15)] w-full h-full flex items-start pt-[30px] pl-6 text-white">
                                <p className="text-[28px] leading-8 font-medium">{dest.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularDestinations;
