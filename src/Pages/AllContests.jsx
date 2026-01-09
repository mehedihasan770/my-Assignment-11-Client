import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loading/Loader";
import { Link} from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import ContestGridSkeleton from "../Components/Skeleton/ContestGridSkeleton";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("Image Design");
  const tabs = [
    "Image Design",
    "Article Writing",
    "Business Idea",
    "Logo Design",
  ];
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/approved/contests");
      return res.data;
    },
  });

  const filteredContests = contests.filter(
    (contest) => contest.contestType === activeTab
  );

  useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, [])
  return (
    <div className="mt-5 mb-5 font-sans">
      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 rounded-2xl py-2 border transition-colors duration-200 
              ${tab === activeTab ? "bg-primary text-white btn" : "btn"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {isLoading ? (
        <ContestGridSkeleton/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredContests.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No contests available in this category yet.
            </p>
          ) : (
            filteredContests.map((contest) => (
              <div
                data-aos="fade-up"
                key={contest._id}
                className="group bg-secondary rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-full">
                      {contest.contestType}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {contest.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-sm font-medium">
                        {contest.participantsCount} Participants
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/contest-details/${contest._id}`}
                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllContests;
