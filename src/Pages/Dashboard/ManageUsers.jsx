import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loader from '../../Components/Loading/Loader';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data : users = [], refetch, isLoading} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleRoleChange = async (id, newRole) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Conform Role"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosSecure.patch(`/users/${id}`, {role : newRole})
            Swal.fire({
              title: "Role Confirmed",
              text: "Role has been Confirmed",
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
        Manage Users
      </h2>
      <div className="overflow-scroll">
      <table className="min-w-full bg-white dark:bg-gray-900 text-sm sm:text-xs">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Role</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Created At</th>
            <th className="px-4 py-2 text-left">Actions</th>
            <th className="px-4 py-2 text-left"></th>
            <th className="px-4 py-2 text-left"></th>
            <th className="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{user.name}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{user.email}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-primary text-white"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className='whitespace-nowrap overflow-hidden text-ellipsis'>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <div className="px-4 py-2 flex gap-1 sm:gap-2">
                <button onClick={() => handleRoleChange(user._id ,'user')} className={`rounded-2xl ${user.role === 'user' ? 'bg-green-500 btn text-white' : 'btn font-bold'}`}>role User</button>
                <button onClick={() => handleRoleChange(user._id ,'admin')} className={`rounded-2xl ${user.role === 'admin' ? 'bg-green-500 btn text-white' : 'btn font-bold'}`}>role Admin</button>
                <button onClick={() => handleRoleChange(user._id ,'creator')} className={`rounded-2xl ${user.role === 'creator' ? 'bg-green-500 btn text-white' : 'btn font-bold'}`}>role Creator</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ManageUsers;