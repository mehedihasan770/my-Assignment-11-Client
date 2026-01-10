import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loading/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Title from "../../Components/Title/Title";
import { TrophyIcon, UserCircleIcon, FireIcon } from "@heroicons/react/24/solid";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const usersWithWins = users.map(user => ({
    ...user,
    wins: user.wins || user.totalWins || user.winCount || 0
  }));

  const sorted = [...usersWithWins].sort((a, b) => b.wins - a.wins);
  const top3 = sorted.slice(0, 3);
  const totalPages = Math.ceil(sorted.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = sorted.slice(start, start + perPage);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Title>Leaderboard</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
        {top3[1] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="bg-linear-to-b from-gray-300 to-gray-500 w-full h-48 rounded-t-2xl shadow-2xl flex flex-col items-center justify-end pb-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-700 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    🥈 2nd
                  </div>
                </div>
                <div className="text-5xl font-bold text-white mb-4">{top3[1].wins}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-4">
                <div className="absolute -inset-1 bg-linear-to-r from-gray-400 to-gray-600 rounded-full blur opacity-25"></div>
                {top3[1].image ? (
                  <img src={top3[1].image} alt="" className="relative w-24 h-24 rounded-full border-4 border-gray-300 object-cover" />
                ) : (
                  <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-gray-400 to-gray-600 flex items-center justify-center border-4 border-gray-300">
                    <UserCircleIcon className="h-14 w-14 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{top3[1].name}</h3>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full">
                <FireIcon className="h-5 w-5 text-gray-600" />
                <span className="font-bold text-gray-800">{top3[1].wins} Wins</span>
              </div>
            </div>
          </div>
        )}

        {top3[0] && (
          <div className="flex flex-col items-center md:-mt-12">
            <div className="relative mb-6">
              <div className="bg-linear-to-b from-yellow-400 to-yellow-600 w-full h-64 rounded-t-2xl shadow-2xl flex flex-col items-center justify-end pb-12">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-600 text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg">
                    👑 1st
                  </div>
                </div>
                <div className="text-6xl font-bold text-white mb-6">{top3[0].wins}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-4">
                <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 animate-pulse"></div>
                {top3[0].image ? (
                  <img src={top3[0].image} alt="" className="relative w-28 h-28 rounded-full border-4 border-yellow-400 object-cover" />
                ) : (
                  <div className="relative w-28 h-28 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-yellow-400">
                    <UserCircleIcon className="h-16 w-16 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3">{top3[0].name}</h3>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-100 to-orange-100 px-6 py-3 rounded-full shadow">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
                <span className="font-bold text-gray-900 text-lg">{top3[0].wins} Wins</span>
              </div>
            </div>
          </div>
        )}

        {top3[2] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="bg-linear-to-b from-orange-400 to-orange-600 w-full h-40 rounded-t-2xl shadow-2xl flex flex-col items-center justify-end pb-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                    🥉 3rd
                  </div>
                </div>
                <div className="text-5xl font-bold text-white mb-4">{top3[2].wins}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative mb-4">
                <div className="absolute -inset-1 bg-linear-to-r from-orange-400 to-orange-500 rounded-full blur opacity-25"></div>
                {top3[2].image ? (
                  <img src={top3[2].image} alt="" className="relative w-24 h-24 rounded-full border-4 border-orange-400 object-cover" />
                ) : (
                  <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center border-4 border-orange-400">
                    <UserCircleIcon className="h-14 w-14 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{top3[2].name}</h3>
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-orange-100 to-orange-200 px-4 py-2 rounded-full">
                <FireIcon className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-gray-800">{top3[2].wins} Wins</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">All Participants</h2>
          <div className="text-gray-600">
            Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {currentData.map((user, i) => {
            const rank = start + i + 1;
            
            return (
              <div 
                key={user._id} 
                className={`bg-secondary border border-white/50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                      rank === 1 
                        ? 'bg-linear-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' 
                        : rank === 2
                        ? 'bg-linear-to-br from-gray-400 to-gray-600 text-white'
                        : rank === 3
                        ? 'bg-linear-to-br from-orange-400 to-orange-600 text-white'
                        : 'bg-linear-to-br from-blue-500 to-purple-600 text-white'
                    } font-bold text-xl`}>
                      {rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {user.image ? (
                            <img 
                              src={user.image} 
                              alt="" 
                              className="w-12 h-12 rounded-full border-2 border-white shadow object-cover" 
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <UserCircleIcon className="h-7 w-7 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-primary">{user.name}</h3>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                            user.wins >= 10 
                              ? 'bg-linear-to-r from-green-100 to-emerald-100 text-green-800'
                              : user.wins >= 5
                              ? 'bg-linear-to-r from-blue-100 to-cyan-100 text-blue-800'
                              : 'bg-linear-to-r from-gray-100 to-gray-200 text-gray-700'
                          }`}>
                            {user.wins >= 10 ? '🏆 Champion' : user.wins >= 5 ? '⭐ Pro Player' : '🔥 Contender'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                          <TrophyIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{user.wins}</div>
                        <div className="text-sm text-gray-500">Wins</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-lg bg-primary cursor-pointer text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              ← Previous
            </button>
            
            <div className="flex items-center gap-2 mx-4">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`w-12 h-12 rounded-lg font-bold text-lg transition-all duration-300 ${
                      page === pageNum 
                        ? 'bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow-lg scale-110' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-lg bg-primary cursor-pointer text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;