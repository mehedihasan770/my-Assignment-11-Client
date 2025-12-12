import { Link } from "react-router";
import error from '../assets/Error.jpg'

const PageNotFound = () => {
    return (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center text-center">
            <div className='space-y-5'>
                <div>
                    <img className='w-[200px] rounded-2xl md:w-[300px] lg:w-[400px] mx-auto' src={error} alt="" />
                </div>
                <div>
                    <h1 className='text-3xl md:text-5xl font-semibold'>Oops, page not found!</h1>
                </div>
                <div>
                    <p className='text-gray-500'>The page you are looking for is not available.</p>
                </div>
                <div className="w-fit mx-auto">
                    <Link to={'/'} className='btn border-2 md:text-[16px] bg-primary text-white rounded-2xl font-bold'>Back To Home!</Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;