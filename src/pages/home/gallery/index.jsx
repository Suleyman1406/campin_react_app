import React from 'react';

import { GALLERY_PHOTOS } from './photos';

const DestinationGallery = () => {
    return (
        <div className="my-[60px] md:my-[140px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75">
            <h2 className="font-play-fair text-secondary-1 text-[54px] leading-[71px] md:text-[64px] md:leading-[85px]">
                Destination Gallery
            </h2>
            <div className="w-[283px] h-1 border-b-[3px] border-primary-1 mt-5 mb-8"></div>
            <p className="text-[#767E86] text-[20px] leading-[23px] md:text-[24px] md:leading-[28px]">
                Our photo gallery on trip
            </p>
            <div className="relative w-full h-[620px] md:h-[650px] mt-2 overflow-x-auto pt-4 md:pt-8 customscrollbar duration-100">
                <div className={`absolute left-0 flex w-fit duration-100`}>
                    {GALLERY_PHOTOS.map((photo, idx) => (
                        <div
                            key={idx}
                            className="relative w-[320px]  md:w-[365px] mr-5 group overflow-hidden rounded-[26px] cursor-pointer hover:-translate-y-5 duration-150"
                        >
                            <img
                                src={photo.img}
                                alt={'gallery photo'}
                                className="w-full h-[570px] object-cover rounded-t-[26px] duration-150"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DestinationGallery;
