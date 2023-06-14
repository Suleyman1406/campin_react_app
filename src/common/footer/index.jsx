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
                className="absolute -top-[100px] left-[50%] -translate-x-[50%] w-fit py-[60px] px-[80px] bg-white flex items-center gap-x-[100px] justify-center rounded-[26px]"
            >
                <h1 className="w-[450px] font-play-fair text-[#767E86] text-[64px] leading-[86px] font-normal">
                    Our Newsletter
                </h1>
                <div className="flex gap-x-8">
                    <div className="text-[20px]">
                        <p className="mb-4 text-[#767E86]">Email</p>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="bg-primary-1/40 text-primary-1/90 outline-none border border-transparent hover:border-primary-1/50 focus:border-primary-1 rounded-xl py-6 px-10"
                        />
                    </div>
                    <button className="bg-primary-1 h-fit mt-auto text-white py-[24.5px] px-8 text-[20px] rounded-xl hover:scale-105 duration-100">
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="pt-[200px] pb-[100px] w-[320px] md:w-[768px] lg:w-[1152px] xl:w-[1440px] mx-auto duration-75 flex justify-between">
                <div>
                    <Link to="/" className="font-play-fair text-4xl">
                        Campin
                    </Link>
                    <p className="text-sm mt-3">Copyright © Campin 2023 All rights reserved</p>
                </div>
                <div className="flex flex-col text-[18px] gap-y-3">
                    <h5 className="font-bold mb-1 text-[24px]">Menu</h5>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Home
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Explore
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Travel
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Blog
                    </Link>
                    <Link className="hover:text-primary-1 duration-100" to="/">
                        Pricing
                    </Link>
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
