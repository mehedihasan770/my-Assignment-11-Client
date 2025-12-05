import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='max-w-10/12 mx-auto'>
            <header><Navbar/></header>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>
    );
};

export default MainLayout;