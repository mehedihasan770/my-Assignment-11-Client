import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loading/Loader';

const ManageUsers = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleRoleChange = async (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Role"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/${id}`, { role: newRole });
        Swal.fire({
          title: "Role Confirmed",
          text: "Role has been confirmed",
          icon: "success"
        });
        refetch();
      }
    });
  };

  if (isLoading) return <Loader />;
  const pageOfLast = currentPage * usersPerPage;
  const pageOfFirst = pageOfLast - usersPerPage;
  const currentUsers = users.slice(pageOfFirst, pageOfLast);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="shadow-md md:px-6 py-8 rounded-2xl">

      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Manage Users
      </h2>

      <div className="overflow-scroll">
        <table className="min-w-full dark:bg-gray-900 text-sm sm:text-xs">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left"></th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2">{pageOfFirst + index + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>

                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-primary">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(user.createdAt).toLocaleString()}
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => handleRoleChange(user._id, 'user')}
                      className={`btn rounded-2xl ${user.role === 'user' ? 'bg-green-500 text-white' : 'font-bold'}`}>
                      Role User
                    </button>

                    <button onClick={() => handleRoleChange(user._id, 'admin')}
                      className={`btn rounded-2xl ${user.role === 'admin' ? 'bg-green-500 text-white' : 'font-bold'}`}>
                      Role Admin
                    </button>

                    <button onClick={() => handleRoleChange(user._id, 'creator')}
                      className={`btn rounded-2xl ${user.role === 'creator' ? 'bg-green-500 text-white' : 'font-bold'}`}>
                      Role Creator
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}className="btn rounded-lg disabled:opacity-50">Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg btn
              ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-500'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="px-4 py-2 btn rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ManageUsers;