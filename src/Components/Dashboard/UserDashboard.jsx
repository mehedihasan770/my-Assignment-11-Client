import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loading/Loader";
import { useAuth } from "../../Hooks/useAuth";
import { 
  TrophyIcon, 
  CheckCircleIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;

  const { data: participatedData = [], isLoading: participatedLoading } = useQuery({
    queryKey: ['userParticipated', userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Participated/${userEmail}/user`);
      return res.data;
    },
    enabled: !!userEmail
  });

  const { data: winningData = [], isLoading: winningLoading } = useQuery({
    queryKey: ['userWinning', userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winning/${userEmail}/user`);
      return res.data;
    },
    enabled: !!userEmail
  });

  const totalParticipated = participatedData?.length || 0;
  
  let totalWins = 0;
  let totalPrize = 0;
  
  if (winningData && winningData.length > 0) {
    totalWins = winningData.length;
    totalPrize = winningData.reduce((sum, win) => {
      const prize = parseFloat(win.prizeMoney || win.contest_prizeMoney || 0);
      return sum + prize;
    }, 0);
  } 

  else if (participatedData && participatedData.length > 0) {
    participatedData.forEach(contest => {
      if (contest.submissionsTask && contest.submissionsTask.length > 0) {
        contest.submissionsTask.forEach(submission => {
          if (submission.isWinner === true) {
            totalWins++;
            const prize = parseFloat(contest.prizeMoney || contest.contest_prizeMoney || 0);
            totalPrize += prize;
          }
        });
      }
    });
  }

  const successRate = totalParticipated > 0 
    ? parseFloat(((totalWins / totalParticipated) * 100).toFixed(1))
    : 0;

  const participationTrendData = [
    { 
      category: 'Total Earnings', 
      value: totalPrize,
      color: '#8B5CF6',
      isMoney: true
    },
    { 
      category: 'Success Rate', 
      value: successRate,
      color: '#F59E0B',
      isPercent: true
    }
  ];

  const performanceData = [
    { 
      name: 'Total Participated', 
      value: totalParticipated > 0 ? totalParticipated : 1,
      color: '#3B82F6',
      label: `${totalParticipated} contests`
    },
    { 
      name: 'Won Contests', 
      value: totalWins > 0 ? totalWins : 1,
      color: '#10B981',
      label: `${totalWins} wins`
    },
    { 
      name: 'Total Earnings', 
      value: totalPrize > 0 ? 1 : 0.5,
      color: '#8B5CF6',
      label: `$${totalPrize} earned`,
      isMoney: true
    }
  ].filter(item => item.value > 0);

  if (participatedLoading || winningLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm">Total Participated</p>
              <p className="text-2xl font-bold text-primary">{totalParticipated}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {participatedData?.map((contest, idx) => (
              <div key={idx} className="truncate">
                {contest.contest_name || contest.name}
              </div>
            )).slice(0, 2)}
            {participatedData?.length > 2 && (
              <div className="text-blue-600">+{participatedData.length - 2} more</div>
            )}
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm">Won Contests</p>
              <p className="text-2xl font-bold text-primary">{totalWins}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totalWins} wins out of {totalParticipated} contests
            </p>
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-primary">${totalPrize}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {winningData?.map((win, idx) => (
              <div key={idx} className="truncate">
                {win.contest_name || win.name}: ${win.prizeMoney || win.contest_prizeMoney || 0}
              </div>
            )).slice(0, 2)}
            {winningData?.length > 2 && (
              <div className="text-purple-600">+{winningData.length - 2} more</div>
            )}
          </div>
        </div>

        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm">Success Rate</p>
              <p className="text-2xl font-bold text-primary">{successRate}%</p>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm px-2 py-1 rounded-full ${
              successRate >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              successRate >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {successRate >= 70 ? 'Excellent' : successRate >= 40 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Participation Trend</h3>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={participationTrendData}>
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
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                  name="Value"
                >
                  {participationTrendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {participationTrendData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">
                  {item.category}:
                  <span className="font-bold ml-1 text-primary">
                    {item.isMoney ? `$${item.value}` : item.isPercent ? `${item.value}%` : item.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Performance Distribution</h3>
            <TrophyIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.label || entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderColor: '#1F29', 
                    color: '#fff',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name, props) => {
                    const payload = props.payload;
                    if (payload.isMoney) {
                      return [`$${totalPrize}`, name];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-semibold text-primary">
                  {item.isMoney ? `$${totalPrize}` : item.label || item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Participated</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-primary">Contest</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Date</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Prize</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {participatedData?.slice(0, 4).map((contest, index) => {
                const isWinner = contest.submissionsTask?.some(submission => submission.isWinner === true) || winningData?.some(win => win.contestId === contest.contestId || win._id === contest.contestId);
                return (
                  <tr key={index} className="transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {contest.contest_name || contest.name || 'Unknown Contest'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(contest.contest_deadline || contest.deadline || contest.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        isWinner 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {isWinner ? 'Won' : 'Participated'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold ">
                        ${contest.contest_prizeMoney || contest.prizeMoney || contest.price || 0}
                      </div>
                      {isWinner && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Prize earned
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {participatedData?.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <TrophyIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Participations Yet</h4>
            <p className="text-gray-500 dark:text-gray-400">Join contests to see your participation history here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;