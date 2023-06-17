import { ReactComponent as StarIcon } from 'images/icons/star.svg';
import React from 'react';

import { SPECIAL_OFFERS } from './offers';

const SpecialOffers = () => {
    return (
        <div
            id="home_special_offers_section"
            className="my-[60px] md:my-[140px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75"
        >
            <h2 className="font-play-fair text-secondary-1 text-[54px] leading-[71px] md:text-[64px] md:leading-[85px] text-right">
                Special Offer
            </h2>
            <div className="w-[241px] h-1 border-b-[3px] border-primary-1 mt-5 mb-8 ml-auto"></div>
            <p className="text-[#767E86] text-[20px] leading-[23px] md:text-[24px] md:leading-[28px] text-right">
                Check out our special offer and discounts
            </p>
            <div className="relative w-full h-[620px] md:h-[680px] mt-6 md:mt-10 overflow-x-auto customscrollbar duration-100">
                <div className={`absolute left-0 flex w-fit duration-100`}>
                    {SPECIAL_OFFERS.map((offer, idx) => (
                        <div
                            key={idx}
                            className="relative w-[320px]  md:w-[500px] mr-5 group overflow-hidden rounded-[26px]"
                        >
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className="w-full h-[286px] object-cover rounded-t-[26px] group-hover:scale-105 duration-150"
                            />
                            <div className="py-4 md:py-10 px-3 md:px-6 bg-primary-2">
                                <p className="text-[20px] md:text-[28px] leading-9 text-[#767E86]">
                                    {offer.title}
                                </p>
                                <div className="flex gap-x-2 mt-1 md:mt-2 mb-2 md:mb-4">
                                    {new Array(offer.starCount).fill(1).map((_, idx) => (
                                        <StarIcon key={idx} />
                                    ))}
                                </div>
                                <p className="text-sm md:text-[18px] text-secondary-1 mb-6 h-[110px] overflow-y-auto customscrollbar">
                                    {offer.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-[15px] md:text-[20px] text-[#767E86] leading-6">
                                            From
                                        </span>
                                        <span className="text-[24px] md:text-[40px] leading-[48px] text-primary-1">
                                            €{offer.price}
                                        </span>
                                    </div>
                                    <button className="py-5 px-10 uppercase text-white bg-primary-1 rounded-xl hover:opacity-80 duration-75">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialOffers;
