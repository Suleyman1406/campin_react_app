import React from 'react';

import LandingSection from './landing';
import OurBlog from './our-blog';
import PopularDestinations from './pop-destinations';
import SpecialOffers from './special-offers';

const Home = () => {
    return (
        <div>
            <LandingSection />
            <PopularDestinations />
            <SpecialOffers />
            <OurBlog />
        </div>
    );
};

export default Home;
