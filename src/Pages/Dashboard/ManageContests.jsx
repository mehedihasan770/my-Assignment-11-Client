import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import Loader from "../../Components/Loading/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useAuth } from "../../Hooks/useAuth";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Title from "../../Components/Title/Title";

const ManageContests = () => {
  const { user } = useAuth();
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myCreatedContests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/pending");
      return res.data;
    },
  });

  const handleDeleteContest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/contests/${id}/delete`);
          Swal.fire({
            title: "Contest deleted",
            text: "Contest deleted successfully",
            icon: "success",
          });
          refetch();
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  const handleManageContest = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${status}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/contest/${id}/admin`, { status: status });
        Swal.fire({
          title: `${status} Successful`,
          text: `${status} Successful`,
          icon: "success",
        });
        refetch();
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <Title>Manage Contests</Title>
      <div className="overflow-x-scroll">
        <table className="min-w-full dark:bg-gray-900 text-sm sm:text-xs">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">ContestType</th>
              <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                Contest price
              </th>
              <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                PrizeMoney
              </th>
              <th className="px-4 py-2 text-left">Deadline</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <>
                <tr key={contest._id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">
                    {contest?.name}
                  </td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">
                    {contest.contestType}
                  </td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">
                    $ {contest.price}
                  </td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">
                    $ {contest.prizeMoney}
                  </td>
                  <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">
                    {new Date(contest.deadline).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 flex gap-1 sm:gap-2">
                    <>
                      <button
                        onClick={() =>
                          handleManageContest(contest._id, "confirmed")
                        }
                        className="bg-green-500 text-white px-2 py-1 btn w-30 rounded-2xl text-xs sm:text-sm"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleDeleteContest(contest._id)}
                        className="bg-red-500 text-white px-2 py-1 btn w-30 rounded-2xl text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </>
                    <Link
                      onClick={() => handleManageContest(contest._id, "Reject")}
                      className="btn font-bold bg-primary text-white rounded-2xl w-30  text-xs sm:text-sm"
                    >
                      Reject
                    </Link>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                      className="bg-lime-500 text-white px-2 py-1 btn w-30 rounded-2xl text-xs sm:text-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
                <dialog id="my_modal_3" ref={modalRef} className="modal">
                  <div className="modal-box">
                    <div className="modal-box space-y-4">
                      <h1 className="text-2xl font-bold">{contest?.name}</h1>

                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-semibold">Contest Type: </span>
                          <span>{contest?.contestType}</span>
                        </p>
                        <p>
                          <span className="font-semibold">Price: </span>
                          <span>${contest?.price}</span>
                        </p>
                        <p>
                          <span className="font-semibold">Prize Money: </span>
                          <span>${contest?.prizeMoney}</span>
                        </p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-semibold">Description:</p>
                        <p>{contest?.description}</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-semibold">Task Instruction:</p>
                        <p>{contest?.taskInstruction}</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_3").close()
                      }
                      className="btn btn-sm btn-circle btn-ghost absolute right-1 top-0"
                    >
                      ✕
                    </button>
                  </div>
                </dialog>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
