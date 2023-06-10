import BlogImgSrc from 'images/blog.png';
import React from 'react';

const OurBlog = () => {
    return (
        <div className="my-[60px] md:my-[140px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75">
            <h2 className="font-play-fair text-secondary-1 text-[54px] leading-[71px] md:text-[64px] md:leading-[85px]">
                Our Blog
            </h2>
            <div className="w-[150px] h-1 border-b-[3px] border-primary-1 mt-5 mb-8"></div>
            <p className="text-[#767E86] text-[20px] leading-[23px] md:text-[24px] md:leading-[28px]">
                An insight the incredible experience in the world
            </p>
            <div className="flex flex-col xl:flex-row gap-x-8 items-center mt-[60px]">
                <img src={BlogImgSrc} alt="blog" className="w-full mb-6 xl:mb-0 xl:w-[50%]" />
                <div className="w-full xl:w-[50%]">
                    <h3 className="font-play-fair text-[40px] leading-[48px] mb-6 md:text-[54px] md:leading-[72px] text-secondary-1 font-normal">
                        Beautiful Turkey
                        <br />
                        Let’s travel
                    </h3>
                    <p className="text-[18px] leading-[30px] md:text-[24px] md:leading-[52px]">
                        But I must explain to you how all this mistaken idea of denouncing pleasure
                        and praising pain was born and I will give you a complete account of the
                        system and expound the actual teachings of the great explorer of the truth,
                        the master- builder of human happiness. No one rejects, dislike, or avoids
                        plasure itself, because it is pleasure, but because those who do not know
                        how to pursue pleasure rationally encounter consequences that are extremly
                        painful. Nor again is there anyone who loves or pursues.
                    </p>
                    <button className="inline-block ml-auto text-primary-1 text-[24px] hover:scale-105 duration-100 mt-8">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OurBlog;
