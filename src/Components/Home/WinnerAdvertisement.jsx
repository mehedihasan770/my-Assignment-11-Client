import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import Loader from "../Loading/Loader";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaTrophy, FaUser, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaStar } from "react-icons/fa";
import WinnerSkeleton from "../Skeleton/WinnerSkeleton";
import Title from "../Title/Title";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: resentWinner = [], isLoading } = useQuery({
    queryKey: ["resentWinner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent/winner");
      return res.data;
    },
  });
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, [])

  return (
    <div className="my-16">
      <div className="text-center mb-12">
        <Title>Recent Winners</Title>
      </div>

      {isLoading ? (
        <WinnerSkeleton/>
      ) : resentWinner.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-3xl shadow-xl">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-gray-500 mb-2">No Winners Yet</h3>
          <p className="text-gray-500">Be the first to win exciting contests!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {resentWinner.map((winner) => (
            <div
              data-aos="fade-up"
              key={winner?._id}
              className="group relative overflow-hidden bg-secondary rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-secondary/10 to-transparent rounded-full translate-y-20 -translate-x-20"></div>
              
              <div className="">
                <div className="bg-linear-to-r to-primary text-primary px-6 py-2 rounded shadow-lg flex items-center">
                  <FaTrophy className="mr-2" />
                  <span className="font-bold text-sm">WINNER</span>
                </div>
              </div>

              <div className="p-8 flex flex-col lg:flex-row items-center gap-8 relative z-10">
                {/* Winner Image with Modern Frame */}
                <div className="relative">
                  <div className="relative w-56 h-56 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={winner?.winnerDetails?.photo}
                      alt={winner?.winnerDetails?.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Image Overlay linear */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating Badges around image */}
                  <div className="absolute -bottom-3 -left-3 bg-primary text-white px-4 py-1 rounded-full shadow-lg flex items-center">
                    <FaUser className="mr-2" />
                    <span className="font-semibold text-sm">Champion</span>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-linear-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full shadow-lg">
                    <span className="font-bold">${winner?.prizeMoney}</span>
                  </div>
                </div>

                {/* Winner Details */}
                <div className="flex-1 w-full">
                  {/* Winner Name and Contest Type */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-primary mb-2">
                      {winner?.winnerDetails?.name}
                    </h3>
                    <div className="inline-flex items-center bg-linear-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
                      <FaStar className="text-yellow-500 mr-2" />
                      <span className="font-semibold text-primary dark:text-primary-light">
                        {winner?.contestType} Champion
                      </span>
                    </div>
                  </div>

                  {/* Prize Highlight */}
                  <div className="mb-6 p-4 bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700/30">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-2xl text-yellow-600 dark:text-yellow-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Prize Won</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${winner?.prizeMoney}
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                            Awarded
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contest Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <FaUsers className="text-primary mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Participants</p>
                          <p className="text-xl font-bold text-gray-600 dark:text-white">
                            {winner?.participantsCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-green-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Declared On</p>
                          <p className="font-semibold text-gray-600 dark:text-white">
                            {new Date(winner?.winnerDetails?.declaredAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <FaTrophy className="text-yellow-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Contest</p>
                          <p className="font-semibold text-gray-600">
                            {winner?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="">
                    <Link
                      to={`/contest-details/${winner?._id}`}
                      className="flex-1 bg-linear-to-r from-primary to-primary-dark text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                    >
                      Contest Details
                      <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Border */}
              <div className="h-1 bg-linear-to-r from-primary via-secondary to-primary rounded-b-3xl opacity-50"></div>
            </div>
          ))}
        </div>
      )}

      {/* Celebration Animation */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          <span className="ml-2 text-sm">Congratulations to all our winners!</span>
        </div>
      </div>
    </div>
  );
};

export default WinnerAdvertisement;