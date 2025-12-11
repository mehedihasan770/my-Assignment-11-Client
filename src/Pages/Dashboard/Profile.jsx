import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { FaRegEdit } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Loader from '../../Components/Loading/Loader';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from '@tanstack/react-query';
import useDashboardRole from '../../Hooks/useDashboardRole';

const Profile = () => {
    const { roleData, roleLoading } = useDashboardRole()
    const {user, loading, setLoading, updateUserPF} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {register,handleSubmit,formState: { errors },} = useForm()
    const handleEditProfile =async ( data ) => {
        const userInfo = {
            name: data?.name,
            img: data?.photoURL
        }
        try{
            await updateUserPF(data?.name, data.photoURL)
            await axiosSecure.patch(`user/${user?.email}/edit`, userInfo)
            setLoading(false);
            toast.success('Your Profile Edit Successful')
        } catch(error) {
            if(error.status === 401){
                toast.success('Your Profile Edit Successful')
                setLoading(false);
            }
            else{
                toast.error(`Edit failed: ${error.message}`);
                setLoading(false);
            }
            
        }
    }

    const { data: ParticipatedContests = [], isLoading } = useQuery({
        queryKey: ["ParticipatedContests ", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Participated/${user?.email}/user`);
            return res.data;
        },
    });

    const { data: WiningContests = [], isLoading: loading1 } = useQuery({
        queryKey: ["WiningContestsContests ", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/winning/${user?.email}/user`);
            return res.data;
        },
    });

    const {data : users = [], isLoading: loading2} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const { data: contests = [], isLoading: loading3 } = useQuery({
        queryKey: ["myCreatedContests", user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/contests/${user.email}/creator`);
          return res.data;
        },
    });

    const winRate = ParticipatedContests > 0 ? Math.round((WiningContests?.length / ParticipatedContests?.length ) * 100) : 0;

    const totalWon = WiningContests?.length || 0;
    const totalUser = users?.length || 0;
    const totalContest = contests?.length || 0;
    const totalParticipated = ParticipatedContests?.length || 0;

    const userData = [
        { name: "Win", value: totalWon },
        { name: "Not Win", value: totalParticipated - totalWon},
    ];

    const adminData = [
        { name: "Total User", value: totalUser },
    ];

    const creatorData = [
        { name: "My Created Contest", value: totalContest },
    ];

    const COLORS = ["#34D399", "#F87171"]

    if(loading || isLoading || loading1 || roleLoading || loading2 || loading3) return <Loader/>

    return (
        <div>
        <div className="mx-auto bg-secondary dark:bg-[#261B25] p-8 rounded-2xl shadow-xl overflow-hidden">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">Profile</h2>
            <div className="w-full h-80 rounded-2xl relative">
                <img src="https://images.unsplash.com/photo-1503264116251-35a269479413?w=800" alt="Banner" className="w-full h-full object-cover rounded-2xl"/>
                <img src={user?.photoURL} alt="Profile" className="w-32 h-32 rounded-full border-4 border-primary absolute -bottom-14 left-1/2 transform -translate-x-1/2 shadow-xl object-cover"/>
            </div>

            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide">{user?.displayName}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-[15px]">{user?.email}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Last Login: <span className="font-medium">{new Date(Number(user?.metadata?.lastLoginAt)).toLocaleString()}</span></p>
            </div>

            <div>
                <button className='cursor-pointer' onClick={()=>document.getElementById('my_modal_1').showModal()}><FaRegEdit size={30}/></button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        
                        <form onSubmit={handleSubmit(handleEditProfile)}className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md w-full max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Update Profile</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Name</label>
                                <input type="text" defaultValue={user?.displayName} {...register("name", { required: "Name is required" })} className="w-full border-primary px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none" />
                                {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Profile Image URL</label>
                                <input type="text" defaultValue={user?.photoURL} {...register("photoURL", { required: "Image URL is required" })}className="w-full border-primary px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:outline-none"/>
                                {errors.photoURL && (<p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>)}
                            </div>
                            <button className="btn w-full py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition">Save Changes</button>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>

        { roleData?.role === "user" ?
        (<div className="w-full shadow-xl mt-5 bg-secondary dark:bg-[#261B25] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Win Percentage</h2>
            <PieChart className='mx-auto' width={250} height={250}>
                <Pie
                    data={userData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <div className="mt-4 text-center">
                <p className="text-gray-700 dark:text-gray-300">Total Participated: <span className="font-semibold">{ParticipatedContests?.length}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Total Winning: <span className="font-semibold">{WiningContests?.length}</span></p>
                <p className="text-gray-800 dark:text-white text-lg font-bold mt-2">Win Rate: {winRate}%</p>
            </div>
        </div>)
            : roleData?.role === 'admin' ?
        (<div className="w-full shadow-xl mt-5 bg-secondary dark:bg-[#261B25] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Total Users</h2>
            <PieChart className='mx-auto' width={250} height={250}>
                <Pie
                    data={adminData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {adminData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <div className="mt-4 text-center">
                <p className="text-gray-800 dark:text-white text-lg font-bold mt-2">Total Users: {users?.length}</p>
            </div>
        </div>)
            :
        (<div className="w-full shadow-xl mt-5 bg-secondary dark:bg-[#261B25] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">My Created Contest</h2>
            <PieChart className='mx-auto' width={250} height={250}>
                <Pie
                    data={creatorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {creatorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>

            <div className="mt-4 text-center">
              <p className="text-gray-800 dark:text-white text-lg font-bold mt-2">Created Contest: {contests?.length}</p>
            </div>
        </div>)
        }
    </div>
    );
};

export default Profile;