import { Link, useSearchParams } from "react-router";
import success from '../assets/success.jpg'
import { useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure()
    const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams?.get("session_id");
    useEffect(() => {
      if (sessionId) {
        axiosSecure.post("/payment-success", { sessionId });
      }
    }, [axiosSecure, sessionId]);
    return (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center text-center">
            <div className='space-y-5'>
                <div>
                    <img className='w-[200px] rounded-2xl md:w-[300px] lg:w-[400px] mx-auto' src={success} alt="" />
                </div>
                <div>
                    <h1 className='text-3xl md:text-5xl font-semibold'>Yor Payment Successful</h1>
                </div>
                <div>
                    <p className='text-gray-500'>Thanks Participate This Contest, Back To (P/C) Participated Contests</p>
                </div>
                <div className="w-fit mx-auto">
                    <Link to={'/dashboard/participated-contests'} className='btn border-2 md:text-[16px] bg-primary text-white rounded-2xl font-bold'>Back To P/C !</Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;