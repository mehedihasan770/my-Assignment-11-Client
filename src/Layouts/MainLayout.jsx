import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='max-w-11/12 md:max-w-10/12 mx-auto'>
            <header className="sticky top-3 z-50"><Navbar/></header>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>
    );
};

export default MainLayout;