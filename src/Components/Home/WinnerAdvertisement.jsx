import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../Loading/Loader";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mt-20 mb-5 bg-primary text-white text-center border-2 border-primary py-2 rounded-2xl">
        🎉 Recent Contest Winner!
      </h2>
      {isLoading ? <Loader /> : resentWinner.length === 0 ? (<p className="text-3xl text-center font-bold text-gray-400">Pleases Reload Browser</p>) : 
      <section className=" dark:bg-[#261B25]  bg-secondary p-2 rounded-xl shadow-xl">
        <div className="space-y-2">
          {resentWinner.map((winner) => (
            <div
              
              key={winner?._id}
              className="p-5 mx-auto flex flex-col md:flex-row border shadow-xl rounded-2xl border-gray-300 justify-between items-center"
            >
              <div className="flex justify-center">
                <img
                  src={winner?.winnerDetails?.photo}
                  alt="winner"
                  className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/40"
                />
              </div>
              <div>
                <p className="text-xl mb-3 font-semibold">
                  {winner?.winnerDetails?.name}
                </p>

                <p className="text-lg opacity-90 mb-6">
                  {winner?.contestType} – Prize Money:
                  <span className="font-bold"> ${winner?.prizeMoney}</span>
                </p>

                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">
                      Contest Name: {winner?.name}
                    </span>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">
                      Total Participants: {winner?.participantsCount}
                    </span>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">
                      Winner Declared:{" "}
                      {new Date(
                        winner?.winnerDetails?.declaredAt
                      ).toLocaleString()}
                    </span>
                  </p>
                </div>

                <Link
                  to={`/contest-details/${winner?._id}`}
                  className="mt-6 btn bg-primary text-white font-bold rounded-2xl"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>}
    </div>
  );
};

export default WinnerAdvertisement;
