import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../Components/Loading/Loader';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageContests = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ["myCreatedContests", user?.email],
        queryFn: async () => {
        const res = await axiosSecure.get('/contest/pending');
        return res.data;
        },
    });

const handleDeleteContest = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/contests/${id}/delete`);
        Swal.fire({
            title: "Contest deleted",
            text: "Contest deleted successfully",
            icon: "success"
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
          confirmButtonText: `${status}`
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosSecure.patch(`/contest/${id}/admin`, {status : status})
            Swal.fire({
              title: `${status} Successful`,
              text: `${status} Successful`,
              icon: "success"
            });
            refetch()
          }
        });
    }

    if(isLoading) return <Loader></Loader>

  return (
    <div className="shadow-md md:px-6 py-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Created Contest
      </h2>
      <div className="overflow-x-scroll">
      <table className="min-w-full bg-white dark:bg-gray-900 text-sm sm:text-xs">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">ContestType</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Contest price</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">PrizeMoney</th>
            <th className="px-4 py-2 text-left">Deadline</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={contest._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.name}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.contestType}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.price}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.prizeMoney}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{new Date(contest.deadline).toLocaleString()}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    contest.status === "pending"
                      ? "bg-primary text-white"
                      : contest.status === "confirmed"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {contest.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-1 sm:gap-2">
                  <>
                    <button
                      onClick={() => handleManageContest(contest._id, 'confirmed')}
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
                    onClick={() => handleManageContest(contest._id, 'Reject')}
                    className="btn font-bold bg-primary text-white rounded-2xl w-30  text-xs sm:text-sm"
                >
                    Reject
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ManageContests;