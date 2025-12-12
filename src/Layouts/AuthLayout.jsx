import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Home/Footer';

const AuthLayout = () => {
    return (
        <div className='max-w-11/12 md:max-w-10/12 lg:max-w-9/12 mx-auto'>
            <header className="sticky top-3 z-50"><Navbar/></header>
            <main>
                <Outlet/>
            </main>
            <footer><Footer/></footer>
        </div>
    );
};

export default AuthLayout;