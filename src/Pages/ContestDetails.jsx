import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
// import Loader from "../Components/Loading/Loader";
import { useAuth } from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useDashboardRole from "../Hooks/useDashboardRole";
import toast from "react-hot-toast";
import { FaTrophy, FaUsers, FaLock, FaClock, FaCheckCircle, FaUpload, FaDollarSign, FaTag, FaFileAlt, FaArrowRight } from "react-icons/fa";
import ContestDetailsSkeleton from "../Components/Skeleton/ContestDetailsSkeleton";

const ContestDetails = () => {
  const { roleData, roleLoading } = useDashboardRole()
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState({});
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const {
    data: contest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contestsTask", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}/task`);
      return res.data;
    },
  });

  const { data: paid = {}, isLoading: loading } = useQuery({
    queryKey: ["paidContest", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contest/${id}/paid?email=${user.email}`
      );
      return res.data;
    },
  });
  
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(null);
    }, 0);
    if (!contest?.deadline) return;
    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const deadline = new Date(contest.deadline).getTime();
      const difference = deadline - now;

      if (difference > 1000) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest, axiosSecure]);

  const handleContestData = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    const paymentInfo = {
      contestId: id,
      name: contest.name,
      price: contest.price,
      prizeMoney: contest.prizeMoney,
      creator_email: contest.creator_email,
      creator_name: contest.creator_name,
      deadline: contest.deadline,
      participant: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    window.location.href = res?.data?.url;
  };

  const handleTaskSubmit = async (data) => {
    const task = {
      id,
      contestName: contest.name,
      isWinner: false,
      participant: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      submittedAt: new Date(),
      task: data,
    };
    await axiosSecure.post(`/contest/${id}/task`, task);
    toast.success('Task Submitted Successfully!');
    modalRef.current?.close();
    reset();
    refetch();
  };

  if (!contest || isLoading || loading || roleLoading) return <ContestDetailsSkeleton/>;

  return (
    <div className="min-h-screen py-8 px-4">
      <div>
        {contest.winnerDetails && contest.winnerDetails.name && (
          <div className="mb-8 bg-secondary dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="relative mr-4">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 blur-xl opacity-60 rounded-full"></div>
                  <div className="relative w-16 h-16 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <FaTrophy className="text-2xl text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">CONGRATULATIONS TO</div>
                  <div className="flex items-center mt-1">
                    <img
                      src={contest.winnerDetails.photo}
                      alt={contest.winnerDetails.name}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 mr-3"
                    />
                    <h3 className="text-2xl font-bold text-primary">
                      {contest.winnerDetails.name}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">WINNER OF</div>
                <div className="text-xl font-bold text-primary">{contest.name}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={contest?.image}
                alt={contest?.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {contest?.name}
                </h1>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                    <FaTag className="mr-2" />
                    {contest?.contestType}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-secondary p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Entry Fee</div>
                    <div className="text-2xl font-bold">${contest?.price}</div>
                  </div>
                  <FaDollarSign className="text-2xl text-primary" />
                </div>
              </div>
              
              <div className="bg-secondary p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Prize Pool</div>
                    <div className="text-2xl font-bold">${contest?.prizeMoney}</div>
                  </div>
                  <FaTrophy className="text-2xl text-primary" />
                </div>
              </div>
              
              <div className="bg-secondary dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Participants</div>
                    <div className="text-2xl font-bold">{contest?.participantsCount}</div>
                  </div>
                  <FaUsers className="text-2xl text-primary" />
                </div>
              </div>
              
              <div className="bg-secondary p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <div className={`text-lg font-bold ${timeLeft ? 'text-green-600' : 'text-red-600'}`}>
                      {timeLeft ? 'Active' : 'Ended'}
                    </div>
                  </div>
                  <FaClock className="text-2xl text-primary" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-secondary rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                    <FaFileAlt className="text-primary" />
                  </div>
                  Contest Description
                </h3>
                <p className="leading-relaxed">
                  {contest?.description}
                </p>
              </div>

              <div className="bg-secondary rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                    <FaUpload className="text-primary" />
                  </div>
                  Task Instructions
                </h3>
                <div className=" rounded-2xl p-5">
                  <p className="leading-relaxed">
                    {contest?.taskInstruction}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <FaClock className="mr-3 text-primary" />
                Time Remaining
              </h3>
              
              {timeLeft ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-4xl font-bold text-white">{timeLeft.days}</div>
                    <div className="text-sm text-gray-300 mt-1">Days</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-4xl font-bold text-white">{timeLeft.hours}</div>
                    <div className="text-sm text-gray-300 mt-1">Hours</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-4xl font-bold text-white">{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-300 mt-1">Minutes</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-4xl font-bold text-white">{timeLeft.seconds}</div>
                    <div className="text-sm text-gray-300 mt-1">Seconds</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-3xl font-bold text-red-400 mb-3">⏰</div>
                  <div className="text-2xl font-bold text-white mb-2">Contest Ended</div>
                  <p className="text-gray-400">No longer accepting submissions</p>
                </div>
              )}
            </div>

            <div className="bg-secondary rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-2">
                  Ready to Participate?
                </div>
                <p className="text-gray-500">
                  {!user 
                    ? "Login to join this contest" 
                    : paid?._id 
                      ? "Submit your task below" 
                      : "Complete payment to register"
                  }
                </p>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    navigate('/auth/signin');
                    return;
                  }
                  if (!paid?._id && timeLeft) {
                    handleContestData();
                  }
                  if (paid?._id && timeLeft){
                    document.getElementById('taskModal').showModal();
                  }
                }}
                disabled={!timeLeft || roleData?.role === 'creator' || roleData?.role === 'admin'}
                className={`w-full cursor-pointer py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  !timeLeft || roleData?.role === 'creator' || roleData?.role === 'admin' 
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-primary text-white hover:shadow-2xl hover:scale-[1.02] shadow-lg"
                }`}
              >
                {!user ? (
                  <>
                    <FaLock className="text-lg" />
                    Login to Participate
                  </>
                ) : roleData?.role === 'admin' ? '🚫 Admin Not Allowed' : 
                  roleData?.role === 'creator' ? '🚫 Creator Not Allowed' : 
                  !timeLeft ? "🏁 Contest Ended" :
                  paid?._id ? (
                    <>
                      <FaUpload className="text-lg" />
                      Submit Task
                    </>
                  ) : (
                    <>
                      <FaDollarSign className="text-lg" />
                      Pay ${contest.price} & Register
                    </>
                  )}
                <FaArrowRight className="text-lg" />
              </button>

              {(paid?._id || roleData?.role === 'creator' || roleData?.role === 'admin') && (
                <div className={`mt-6 p-4 rounded-2xl ${
                  roleData?.role === 'creator' || roleData?.role === 'admin' 
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                    : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                }`}>
                  <div className="flex items-center">
                    <FaCheckCircle className={`mr-3 ${
                      roleData?.role === 'creator' || roleData?.role === 'admin' 
                        ? 'text-red-500' 
                        : 'text-green-500'
                    }`} />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {roleData?.role === 'creator' ? 'Creators cannot join contests' : 
                         roleData?.role === 'admin' ? 'Admins cannot participate' : 
                         'You are already registered!'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {paid?._id ? 'You can submit your task now' : 'Only participants can join contests'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-secondary rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Contest Host</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white font-bold mr-4">
                  {contest?.creator_name?.charAt(0) || 'H'}
                </div>
                <div>
                  <div className="font-semibold text-primary">{contest?.creator_name}</div>
                  <div className="text-sm text-gray-500">{contest?.creator_email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="taskModal" ref={modalRef} className="modal">
        <div className="modal-box rounded-3xl p-0 max-w-md overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Task Submission</h3>
                <p className="text-sm text-gray-500 mt-1">Provide your work details</p>
              </div>
              <button 
                onClick={() => document.getElementById('taskModal').close()}
                className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(handleTaskSubmit)} className="p-6">
            <div className="mb-6">
              <label className="block text-gray-500 mb-3 font-medium">
                Task Details
              </label>
              <textarea
                {...register("task", { required: true })}
                placeholder="Paste your task link or describe your submission. Make sure all details are accurate!"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows="5"
              />
              {errors.task && (
                <p className="text-red-500 text-sm mt-2">Please provide your task details</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => document.getElementById('taskModal').close()}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 cursor-pointer font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-3 bg-primary text-white font-semibold cursor-pointer rounded-xl hover:shadow-lg transition shadow-md"
              >
                <div className="flex items-center justify-center gap-2">
                  <FaUpload />
                  Submit Task
                </div>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ContestDetails;