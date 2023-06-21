import { ReactComponent as FacebookIcon } from 'images/icons/facebook.svg';
import { ReactComponent as InstagramIcon } from 'images/icons/instagram.svg';
import { ReactComponent as PinterestIcon } from 'images/icons/pinterest.svg';
import { ReactComponent as TwitterIcon } from 'images/icons/twitter.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="relative mt-[200px] box-border bg-secondary-2 text-white">
            <div
                style={{
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
                }}
                className="min-w-[60%] xl:min-w-fit absolute -top-[180px] md:-top-[120px] left-[50%] -translate-x-[50%] lg:w-fit py-[60px] w-[calc(100%-36px)] px-[40px] xl:px-[80px] bg-white flex flex-col xl:flex-row items-start gap-y-4 lg:items-center gap-x-[40px] justify-center rounded-[26px]"
            >
                <h1 className="font-play-fair text-[#767E86] text-[40px] leading-[54px] lg:text-[64px] lg:leading-[86px] font-normal">
                    Our Newsletter
                </h1>
                <div className="flex gap-x-8 w-full lg:w-fit flex-col sm:flex-row gap-y-3 md:min-w-[400px]">
                    <div className="text-[20px] w-full lg:w-fit">
                        <p className="mb-4 text-[#767E86]">Email</p>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="bg-primary-1/40 text-primary-1/90 outline-none border border-transparent hover:border-primary-1/50 focus:border-primary-1 rounded-xl py-6 px-10 w-full"
                        />
                    </div>
                    <button className="bg-primary-1 h-fit mt-auto text-white py-[24.5px] px-8 text-[20px] rounded-xl hover:scale-105 duration-100">
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="pt-[280px] lg:pt-[200px] pb-[100px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75 flex justify-between flex-wrap gap-y-6">
                <div>
                    <Link to="/" className="font-play-fair text-4xl">
                        Campin
                    </Link>
                    <p className="text-sm mt-3">Copyright © Campin 2023 All rights reserved</p>
                </div>
                <div className="flex flex-col text-[18px] gap-y-3">
                    <h5 className="font-bold mb-1 text-[24px]">Menu</h5>
                    <a href="#" className="hover:text-primary-1 duration-100">
                        Home
                    </a>
                    <a
                        href="#home_popular_destinations_section"
                        className="hover:text-primary-1 duration-100"
                    >
                        Explore
                    </a>
                    <a
                        href="#home_special_offers_section"
                        className="hover:text-primary-1 duration-100"
                    >
                        Travel
                    </a>
                    <a href="#home_blog_section" className="hover:text-primary-1 duration-100">
                        Blog
                    </a>
                    <a
                        href="#home_experiences_section"
                        className="hover:text-primary-1 duration-100"
                    >
                        Experiences
                    </a>
                </div>
                <div className="flex flex-col text-[18px] gap-y-3">
                    <h5 className="font-bold mb-1 text-[24px]">Information</h5>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Destinations
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Supports
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Terms & Conditions
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Privacy
                    </Link>
                </div>
                <div className="flex flex-col text-[18px] gap-y-3">
                    <h5 className="font-bold mb-1 text-[24px]">Contact Info</h5>
                    <p>+123 456 789</p>
                    <p>info@campin.com</p>
                    <p>Antalya, Turkey</p>
                </div>
                <div className="gap-y-3">
                    <h5 className="font-bold mb-1 text-[24px]">Follow us on</h5>
                    <div className="gap-x-7 flex items-center mt-5">
                        <FacebookIcon className="cursor-pointer hover:fill-primary-1 duration-100 hover:scale-110" />
                        <PinterestIcon className="cursor-pointer hover:fill-primary-1 duration-100 hover:scale-110" />
                        <InstagramIcon className="cursor-pointer hover:fill-primary-1 duration-100 hover:scale-110" />
                        <TwitterIcon className="cursor-pointer hover:fill-primary-1 duration-100 hover:scale-110" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
