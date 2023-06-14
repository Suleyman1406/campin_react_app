import { ReactComponent as StarIcon } from 'images/icons/star.svg';
import React from 'react';

import { EXPERIENCES } from './experiences';

const Experiences = () => {
    return (
        <div className="my-[60px] md:my-[140px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75">
            <h2 className="font-play-fair text-secondary-1 text-[54px] leading-[71px] md:text-[64px] md:leading-[85px]">
                Destination Gallery
            </h2>
            <div className="w-[283px] h-1 border-b-[3px] border-primary-1 mt-5 mb-8"></div>
            <p className="text-[#767E86] text-[20px] leading-[23px] md:text-[24px] md:leading-[28px]">
                Our photo gallery on trip
            </p>
            <div className="relative w-full h-[530px] md:h-[420px] mt-8 overflow-x-auto pt-16 md:pt-20 customscrollbar duration-100">
                <div className={`absolute left-0 flex w-fit duration-100`}>
                    {EXPERIENCES.map((e, idx) => (
                        <div
                            key={idx}
                            className="relative w-[320px] md:w-[663px] mr-5 group rounded-[12px] bg-[#F5F6F7] px-6 md:px-10 pt-14 pb-6 md:pb-10"
                        >
                            <img
                                src={e.img}
                                alt={e.name + ' photo'}
                                className="absolute -top-[65px] left-[110px] md:left-[40px] w-[100px] h-[100px] rounded-full object-cover"
                            />
                            <p className="text-[#767E86] text-[18px] leading-[23px] h-[260px] md:h-[100px] overflow-y-auto customscrollbar">
                                {e.message}
                            </p>
                            <div className="flex gap-x-2 mt-1 md:mt-2 mb-2 md:mb-4">
                                {new Array(e.starCount).fill(1).map((_, idx) => (
                                    <StarIcon key={idx} />
                                ))}
                            </div>
                            <h4 className="text-[#767E86] font-play-fair text-[24px] leading-[31px]">
                                {e.name}
                            </h4>
                            <h5 className="text-[#767E86] text-[18px] leading-[22px] mt-1">
                                {e.title}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experiences;
