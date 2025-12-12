import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loading/Loader";
import { Link, useSearchParams } from "react-router";

const AllContests = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const axiosSecure = useAxiosSecure()
  const [activeTab, setActiveTab] = useState("Image Design");
  const tabs = ["Image Design","Article Writing","Business Idea","Logo Design",];
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/approved/contests');
      return res.data;
    },
  });

  useEffect(() => {
    if(sessionId){
      axiosSecure.post('/payment-success', { sessionId })
    }
  }, [axiosSecure, sessionId])

  const filteredContests = contests.filter((contest) => contest.contestType === activeTab);
  return (
    <div className="mt-5 mb-5 font-sans">
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 rounded-2xl py-2 border transition-colors duration-200 
              ${
                tab === activeTab
                  ? "bg-primary text-white btn"
                  : "btn"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {isLoading ? <Loader></Loader> : 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContests.length === 0 ? (
          <p className="text-gray-500 col-span-full">No contests available in this category yet.</p>
        ) : (
          filteredContests.map((contest) => (
            <div key={contest._id} className="bg-secondary dark:bg-[#261B25] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-gray-200 dark:border-gray-700">
      
              <img src={contest.image} alt={contest.name} className="w-full h-48 object-cover rounded-lg mb-4"/>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{contest.name}</h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">{contest.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="px-3 py-1 text-sm bg-[#ff6f0048] text-[#FF6D00] font-bold dark:bg-blue-600 dark:text-white rounded-full">{contest.contestType}</span>
            
                <Link to={`/contest-details/${contest._id}`} className="px-4 rounded-2xl py-2 bg-primary btn text-white text-sm transition">Details</Link>
              </div>
            </div>
          ))
        )}
      </div>}
    </div>
  );
};

export default AllContests;