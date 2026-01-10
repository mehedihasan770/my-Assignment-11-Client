import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loading/Loader';
import { Link } from 'react-router';
import Title from '../../Components/Title/Title';

const ParticipatedContests = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    
    const { data: ParticipatedContests = [], isLoading } = useQuery({
        queryKey: ["ParticipatedContests ", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/Participated/${user?.email}/user`);
            return res.data;
        },
    });

    if(isLoading) return <Loader/>

    return (
      <div>
      <Title>Participated Contest</Title>
      <div className="overflow-x-scroll">
      <table className="min-w-full dark:bg-gray-900 text-sm sm:text-xs">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Contest Name</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Transaction Id</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Payment Status</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Prize Money</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">UpComing Deadline</th>
            <th className="px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ParticipatedContests.map((contest, index) => (
            <tr key={contest._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.contest_name}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.transactionId}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{contest.transactionId ? 'paid' : 'Un Paid'}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">$ {contest.contest_prizeMoney}</td>
              <td className="px-4 whitespace-nowrap overflow-hidden text-ellipsis py-2">{new Date(contest.contest_deadline).toLocaleString()}</td>
              <td className="px-4 py-2 flex gap-1 sm:gap-2">
                    <Link
                      to={`/contest-details/${contest?.contestId}`}
                      className="bg-green-500 text-white px-2 py-1 btn w-30 rounded-2xl text-xs sm:text-sm"
                    >
                      View Contest
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

export default ParticipatedContests;