import React from 'react';

const Auth = () => {
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

export default Auth;