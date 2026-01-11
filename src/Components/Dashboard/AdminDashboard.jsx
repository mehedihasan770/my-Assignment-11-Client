import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loading/Loader";
import { 
  UserGroupIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const { data: pendingContests = [], isLoading: pendingLoading } = useQuery({
    queryKey: ['pendingContests'],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/pending");
      return res.data;
    },
  });

  const { data: approvedContests = [], isLoading: approvedLoading } = useQuery({
    queryKey: ['approvedContests'],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/approved/contests");
      return res.data;
    },
  });

  const isLoading = usersLoading || pendingLoading || approvedLoading;

  const totalUsers = users?.length || 0;
  const totalPending = pendingContests?.length || 0;
  const totalApproved = approvedContests?.length || 0;
  const totalContests = totalPending + totalApproved;
  
  const totalPrize = approvedContests?.reduce((sum, contest) => {
    return sum + (parseFloat(contest.prizeMoney) || 0);
  }, 0) || 0;

  const avgPrize = totalApproved > 0 ? (totalPrize / totalApproved).toFixed(2) : 0;

  const approvalRate = totalContests > 0 
    ? parseFloat(((totalApproved / totalContests) * 100).toFixed(1))
    : 0;

  const adminUsers = users?.filter(user => user.role === 'admin').length || 0;
  const creatorUsers = users?.filter(user => user.role === 'creator').length || 0;
  const regularUsers = users?.filter(user => !user.role || user.role === 'user').length || 0;

  const adminOverviewData = [
    { 
      category: 'Total Users', 
      value: totalUsers,
      color: '#3B82F6'
    },
    { 
      category: 'Total Contests', 
      value: totalContests,
      color: '#10B981'
    },
    { 
      category: 'Approval Rate', 
      value: approvalRate,
      color: '#F59E0B',
      isPercent: true
    }
  ];

  const userDistributionData = [
    { 
      name: 'Admin Users', 
      value: adminUsers,
      color: '#EF4444',
      icon: <ShieldCheckIcon className="h-5 w-5" />
    },
    { 
      name: 'Creator Users', 
      value: creatorUsers,
      color: '#3B82F6',
      icon: <UserGroupIcon className="h-5 w-5" />
    },
    { 
      name: 'Regular Users', 
      value: regularUsers,
      color: '#10B981',
      icon: <DocumentTextIcon className="h-5 w-5" />
    }
  ].filter(item => item.value > 0);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-primary">{totalUsers}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: '100%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Platform users
            </p>
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DocumentTextIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Contests</p>
              <p className="text-2xl font-bold text-primary">{totalContests}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(totalApproved / totalContests) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totalApproved} approved • {totalPending} pending
            </p>
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Prize</p>
              <p className="text-2xl font-bold text-primary">${totalPrize}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (totalPrize / 10000) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Avg ${avgPrize} per contest
            </p>
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</p>
              <p className="text-2xl font-bold text-primary">{approvalRate}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${approvalRate}%`,
                  backgroundColor: approvalRate >= 70 ? '#10B981' : approvalRate >= 40 ? '#F59E0B' : '#EF4444'
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totalApproved}/{totalContests} contests approved
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-primary">Admin Overview</h3>
          <ChartBarIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminOverviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category"  
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderColor: '#fff', 
                  color: '#000',
                  borderRadius: '8px'
                }}
                formatter={(value, name, props) => {
                  const payload = props.payload;
                  if (payload.isMoney) {
                    return [`$${value}`, payload.category];
                  }
                  if (payload.isPercent) {
                    return [`${value}%`, payload.category];
                  }
                  return [value, payload.category];
                }}
              />
              <Bar 
                dataKey='value'
                radius={[4, 4, 0, 0]}
                name="Value"
              >
                {adminOverviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around flex-wrap">
          {adminOverviewData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm">
                {item.category}:
                <span className="font-bold ml-1 text-primary">
                  {item.isMoney ? `$${item.value}` : item.isPercent? `${item.value}%` : item.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary">User Distribution</h3>
            <span className="text-sm text-gray-500">{totalUsers} total users</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userDistributionData.map((item, index) => (
              <div 
                key={index} 
                className="bg-secondary/50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${item.name === 'Admin Users' ? 'bg-red-100 dark:bg-red-900' : 
                    item.name === 'Creator Users' ? 'bg-blue-100 dark:bg-blue-900' : 
                    'bg-green-100 dark:bg-green-900'}`}>
                    <div className={`${item.name === 'Admin Users' ? 'text-red-600 dark:text-red-300' : 
                      item.name === 'Creator Users' ? 'text-blue-600 dark:text-blue-300' : 
                      'text-green-600 dark:text-green-300'}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                    <p className="text-sm">{item.value} users</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Percentage of Total</div>
                    <div className="text-xl font-bold text-primary">
                      {totalUsers > 0 ? ((item.value / totalUsers) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${totalUsers > 0 ? (item.value / totalUsers) * 100 : 0}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary">Pending Contests</h3>
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-500">{pendingContests?.length || 0} pending</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-primary">Contest</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Creator</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Prize</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Type</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {pendingContests?.slice(0, 5).map((contest, index) => (
                <tr key={contest._id || index} className="transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium">
                      {contest.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {contest.creator_img && (
                        <img 
                          src={contest.creator_img} 
                          alt="" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span>{contest.creator_name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">${contest.prizeMoney || 0}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                      {contest.contestType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(contest.created_at || contest.deadline).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {(!pendingContests || pendingContests.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <CheckCircleIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Pending Contests</h4>
            <p className="text-gray-500 dark:text-gray-400">All contests have been reviewed and approved.</p>
          </div>
        )}
      </div>

      <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary">Recent Approved Contests</h3>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-500">{approvedContests?.length || 0} approved</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-primary">Contest</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Creator</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Prize</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Type</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Participants</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {approvedContests?.slice(0, 5).map((contest, index) => {
                const participants = contest.participantsCount || contest.submissionsTask?.length || 0;
                const isCompleted = contest.winnerDetails && Object.keys(contest.winnerDetails).length > 0;
                
                return (
                  <tr key={contest._id || index} className="transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {contest.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {contest.creator_img && (
                          <img 
                            src={contest.creator_img} 
                            alt="" 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <span>{contest.creator_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">${contest.prizeMoney || 0}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-sm">
                        {contest.contestType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{participants}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isCompleted 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {isCompleted ? 'Completed' : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {(!approvedContests || approvedContests.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <ClockIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Approved Contests</h4>
            <p className="text-gray-500 dark:text-gray-400">No contests have been approved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;