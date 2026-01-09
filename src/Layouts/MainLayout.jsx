import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Home/Footer';

const MainLayout = () => {
    return (
        <div>
            <header className="sticky shadow-sm backdrop-blur-2xl bg-secondary/85 top-0 z-50"><Navbar/></header>
            <main className='min-h-screen max-w-11/12 md:max-w-10/12 lg:max-w-9/12 mx-auto'>
                <Outlet/>
            </main>
            <footer className='shadow-sm bg-secondary pt-3'><Footer></Footer></footer>
        </div>
    );
};

export default MainLayout;