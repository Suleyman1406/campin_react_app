import Footer from 'components/footer';
import React from 'react';

import Experiences from './experiences';
import DestinationGallery from './gallery';
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
            <DestinationGallery />
            <Experiences />
            <Footer />
        </div>
    );
};

export default Home;
