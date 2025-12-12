import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loading/Loader";
import { useAuth } from "../Hooks/useAuth";
import { useForm } from "react-hook-form";

const ContestDetails = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { data: contest = {}, isLoading , refetch} = useQuery({
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
  console.log(paid);
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
    window.location.href = res.data.url;
  };

  const handleTaskSubmit =async (data) => {
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
    }
    const res = await axiosSecure.post(`/contest/${id}/task`, task)
    console.log(res)
    reset();
    refetch();
  };

  if (!contest || isLoading || loading) return <Loader />;

  return (
    <div className="mt-5 mb-5">
      <div className="h-fit p-3 md:p-6 lg:p-10 bg-secondary dark:bg-[#261B25] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {contest.winnerDetails && contest.winnerDetails.name && (
          <div className="flex items-center mb-6 bg-green-100 dark:bg-green-800 p-3 rounded-lg">
            <img
              src={contest.winnerDetails.photo}
              alt={contest.winnerDetails.name}
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div>
              <p className="text-gray-800 dark:text-white font-semibold">
                Winner: {contest.winnerDetails.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Congratulations to the winner!
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={contest.image}
              alt={contest.name}
              className="w-full object-cover rounded-xl"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div className="bg-white p-2 rounded-2xl dark:bg-[#261B25]">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {contest.name}
              </h1>

              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Participants:
                <span className="font-semibold">
                  {contest.participantsCount}
                </span>
              </p>

              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Prize Money: ${contest.prizeMoney}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {contest.description}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-semibold">Task:</span>{" "}
                {contest.taskInstruction}
              </p>

              <div className="flex gap-3 flex-wrap mb-6">
                {timeLeft ? (
                  <>
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg flex items-center">
                      <span className="font-bold">Deadline</span>
                    </div>
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg flex flex-col items-center">
                      <span className="text-2xl font-bold">
                        {timeLeft.days}
                      </span>
                      <span className="text-sm">days</span>
                    </div>
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg flex flex-col items-center">
                      <span className="text-2xl font-bold">
                        {timeLeft.hours}
                      </span>
                      <span className="text-sm">hours</span>
                    </div>
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg flex flex-col items-center">
                      <span className="text-2xl font-bold">
                        {timeLeft.minutes}
                      </span>
                      <span className="text-sm">min</span>
                    </div>
                    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg flex flex-col items-center">
                      <span className="text-2xl font-bold">
                        {timeLeft.seconds}
                      </span>
                      <span className="text-sm">sec</span>
                    </div>
                  </>
                ) : (
                  <p className="text-red-600 dark:text-red-400 text-lg font-semibold">
                    Contest Ended
                  </p>
                )}
              </div>
              <label
                htmlFor={paid?._id && timeLeft && 'my_modal_6'}
                onClick={() => {
                  if (!paid?._id && timeLeft) {
                    handleContestData();
                  }
                }}
                className={`w-full py-3 rounded-xl text-white font-semibold btn transition mt-4 ${
                  !timeLeft ? "bg-gray-500" : "bg-primary"
                }`}
                disabled={!timeLeft}
              >
                {!timeLeft
                  ? "Contest Ended"
                  : paid?._id
                  ? "Submit Task"
                  : `Pay $${contest.price} & Register`}
              </label>
            </div>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box space-y-3">
            
              <form onSubmit={handleSubmit(handleTaskSubmit)} className="flex flex-col gap-3">
                <textarea
                  {...register('task', { required: true })}
                  placeholder="Provide your task link or details, Do not submit incorrectly or your task will not be accepted!"
                  className="border p-2 rounded-md w-full"
                />
                {errors.taskLink && <p className="text-red-500">Task link is required</p>}

                <button
                  type="submit"
                  className="bg-primary cursor-pointer text-white py-2 rounded-md font-semibold"
                >
                  Submit
                </button>
              </form>

            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                Close!
              </label>
            </div>
          </div>
        </div>

    </div>
  );
};

export default ContestDetails;
