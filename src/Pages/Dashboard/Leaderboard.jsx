import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loading/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure()
  const {data : topContestWinner = [], isLoading } = useQuery({
    queryKey: ['allUsers'],
      queryFn: async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    }
  })
  const sortedWinner = [...topContestWinner].sort((a, b) => b.wins - a.wins);

  const top3 = sortedWinner.slice(0, 3);
  const rest = sortedWinner.slice(3);
  if(isLoading) return <Loader/>
  return (
      <div className="mx-auto bg-secondary dark:bg-[#261B25] p-8 rounded-2xl shadow-xl">
      <div className="flex justify-center items-center md:items-end flex-col md:flex-row gap-6">
        {top3[0] && (
          <div className="flex flex-col items-center">
            <p className="text-primary font-bold">1</p>
            <div className="bg-yellow-400 w-24 h-40 rounded-t-xl flex justify-center items-end">
              <span className="text-xl font-bold mb-2">{top3[0].wins}</span>
            </div>
            <img
              src={top3[0].image}
              alt=''
              className="w-24 h-24 rounded-full border-4 border-primary -mt-12 object-cover"
            />
            <p className="text-center mt-2 font-bold">{top3[0].name}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{top3[0].email}</p>
            <p className="text-primary font-bold">🏆 Wins: {top3[0].wins}</p>
          </div>
        )}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <p className="text-primary font-bold">2</p>
            <div className="bg-gray-300 w-20 h-32 rounded-t-xl flex justify-center items-end">
              <span className="text-lg font-bold mb-2">{top3[1].wins}</span>
            </div>
            <img
              src={top3[1].image}
              alt=''
              className="w-20 h-20 rounded-full border-4 border-primary -mt-10 object-cover"
            />
            <p className="text-center mt-2 font-semibold">{top3[1].name}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{top3[1].email}</p>
            <p className="text-primary font-bold">🏆 Wins: {top3[1].wins}</p>
          </div>
        )}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <p className="text-primary font-bold">3</p>
            <div className="bg-orange-400 w-20 h-21 rounded-t-xl flex justify-center items-end">
              <span className="text-lg font-bold mb-2">{top3[2].wins}</span>
            </div>
            <img
              src={top3[2].image}
              alt=''
              className="w-20 h-20 rounded-full border-4 border-primary -mt-10 object-cover"
            />
            <p className="text-center mt-2 font-semibold">{top3[2].name}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{top3[2].email}</p>
            <p className="text-primary font-bold">🏆 Wins: {top3[2].wins}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
    {rest.map((user, i) => (
      <div
        key={user._id}
        className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow"
      >
        <p className="text-primary font-bold">{i + 4}</p>
        <img
          src={user.image}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
          <p className="text-primary font-bold">🏆 Wins: {user.wins}</p>
        </div>
      </div>
    ))}
  </div>
      </div>
  );
};

export default Leaderboard;