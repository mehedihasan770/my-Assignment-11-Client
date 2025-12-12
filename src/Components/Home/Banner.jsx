import banner from '../../assets/bannar.png'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../Loading/Loader';
import { Link } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';

const Banner = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [contestType, setContestType] = useState('')
    const {data : contests = [], isLoading : loading2} = useQuery({
        queryKey : ['findContest', contestType],
        queryFn : async () => {
            const res = await axiosSecure.get(`/find/contest?contestType=${contestType}`)
            return res.data;
        },
    })
    const {data : top6Contests = [], isLoading: loading1} = useQuery({
        queryKey : ['top6Contests', user?.email],
        queryFn : async () => {
            const res = await axiosSecure.get(`/top-6-contests`)
            return res.data;
        },
    })

    return (
        <>
        <div className='w-full rounded-2xl relative'>
            <div className='rounded-2xl h-[48vh] overflow-hidden'>
                <img className='rounded-2xl w-full h-full object-cover' src={banner} alt="Banner" />
            </div>
            <form className="flex items-center justify-center space-x-2 max-w-md mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <input 
                    type="text"
                    value={contestType}
                    onChange={(e) => setContestType(e.target.value)}
                    placeholder="Search by contest type..."
                    className="flex-1 px-4 py-3 rounded-l-full border focus:outline-none text-white focus:ring-2 focus:ring-purple-400"
                />
                <button
                    type="button"
                    className="bg-purple-500 text-white px-6 py-3 rounded-r-full font-semibold"
                >
                    Search
                </button>
            </form>
        </div>
        <div className='mt-10'>
            {loading1 && <Loader/>}
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">{contestType ? 'Find Contest' : 'Top 6 Participants Contest'}</h2>     
            {contestType.length > 0 && contests.length === 0 ? <h1 className='text-3xl text-center font-bold'>No Contest Find</h1> :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        (contestType ? contests : top6Contests || []).map((contest) => (
                            <div key={contest._id} className="bg-secondary dark:bg-[#261B25] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-200 dark:border-gray-700">
      
                                 <img src={contest.image} alt={contest.name} className="w-full h-48 object-cover rounded-lg mb-4"/>

                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{contest.name}</h2>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{contest.description}</p>
                                <span className="px-3 py-1 text-sm bg-[#ff6f0048] text-[#FF6D00] font-bold dark:bg-blue-600 dark:text-white rounded-full">Participants {contest.participantsCount}</span>
                            <div className="flex justify-between items-center mt-4">
                            <span className="px-3 py-1 text-sm bg-[#ff6f0048] text-[#FF6D00] font-bold dark:bg-blue-600 dark:text-white rounded-full">{contest.contestType}</span>
                            <Link to={`/contest-details/${contest._id}`} className="px-4 rounded-2xl py-2 bg-primary btn text-white text-sm transition">Details</Link>
                        </div>
                    </div>
                ))
            }
        </div>}
        </div>
        </>
    );
};

export default Banner;