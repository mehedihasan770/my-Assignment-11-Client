import { FaGithub, FaLinkedin, FaPhone, FaTrophy } from 'react-icons/fa';
import { MdMarkEmailUnread } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoIosHome } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className='mx-auto border-2 border-primary rounded-3xl p-8 shadow-md'>
            <div className='flex flex-col lg:flex-row justify-between'>
                <div>
                    <div className="flex items-center text-primary">
                        <FaTrophy size={30} />
                        <h1 className="text-[18px] md:text-2xl font-bold">ContestHub</h1>     
                      </div>
                    <p className='max-w-96 mt-5 mb-5 text-gray-400'>Here you will find different types of online contests where you can join and showcase your creativity.</p>
                    <div className='flex space-x-3 items-center'>
                        <Link to={'https://www.linkedin.com/'} className='text-gray-600'><FaLinkedin size={25}/></Link>
                        <Link to={'https://x.com/'} className='text-gray-600'><FaXTwitter size={25}/></Link>
                        <Link to={'https://www.instagram.com/'} className='text-gray-600'><FiInstagram size={25}/></Link>
                        <Link to={'https://github.com/'} className='text-gray-600'><FaGithub size={25}/></Link>
                    </div>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-15 mt-15 lg:mt-0'>
                    <div>
                        <h1 className='font-bold'>Contact Information</h1>
                        <ul className='text-gray-400 space-y-2 mt-5'>
                            <li><a className='hover:underline' href=""><FaPhone color='gray' className='inline-block mr-1'/>+880 1712345678</a></li>
                            <li><a className='hover:underline' href=""><MdMarkEmailUnread className='inline-block mr-1'/>support@gmail.com</a></li>
                            <li><a className='hover:underline' href=""><MdMarkEmailUnread className='inline-block mr-1'/>contest-hub@gmail.com</a></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className='font-bold'>Company</h1>
                        <ul className='text-gray-400 space-y-2 mt-5'>
                            <li><Link to={'/about-us'}>About Us</Link></li>
                            <li><Link to={'/guidelines'}>GuideLines</Link></li>
                            <li><Link to={'/all-contests'}>Contests</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='border-t-2 border-primary mt-5'>
                <div className='mt-4 text-gray-400 flex justify-between lg:flex-row flex-col-reverse'>
                    <h1>© 2025 Contest Hub. All rights reserved.</h1>
                    <div>
                        <a className='underline mr-4' href="">Privacy Policy</a>
                        <a className='underline' href="">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;