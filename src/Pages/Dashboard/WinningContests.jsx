import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loading/Loader';

const WinningContests = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    
    const { data: WiningContests = [], isLoading } = useQuery({
        queryKey: ["WiningContestsContests ", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/winning/${user?.email}/user`);
            return res.data;
        },
    });

    (WiningContests.map(con => console.log(con)))

    if(isLoading) return <Loader/>

    return (
      <div className="shadow-md md:px-6 py-8 rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Winning Contests
      </h2>
      <div className="overflow-x-scroll">
      <table className="min-w-full dark:bg-gray-900 text-sm sm:text-xs">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Contest Name</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Contest Type</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Prize Money</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Winning Date</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Creator Email</th>
          </tr>
        </thead>
        <tbody>
          {WiningContests.map((contest, index) => (
            <tr key={contest?._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest?.name}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest?.contestType}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">$ {contest?.prizeMoney}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-5">{new Date(contest?.winnerDetails?.declaredAt).toLocaleString()}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-5">{contest?.creator_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    );
};

export default WinningContests;