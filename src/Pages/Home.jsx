import React from 'react';
import Banner from '../Components/Home/Banner';
import WinnerAdvertisement from '../Components/Home/WinnerAdvertisement';
import AboutUs from '../Components/Home/AboutUs';
import Guidelines from '../Components/Home/Guidelines';
import FAQ from '../Components/Home/FAQ';
import CategoriesSection from '../Components/Home/CategoriesSection';
import HighlightsSection from '../Components/Home/HighlightsSection';

const Home = () => {
    return (
        <div className='mt-5 mb-5'>
            <header>
                <Banner/>
            </header>
            <main>
                <WinnerAdvertisement/>
                <HighlightsSection/>
                <CategoriesSection/>
                <FAQ/>
                <Guidelines/>
                <AboutUs/>
                
            </main>
        </div>
    );
};

export default Home;