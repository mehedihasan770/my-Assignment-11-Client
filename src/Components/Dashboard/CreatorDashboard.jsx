import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Components/Loading/Loader";
import { useAuth } from "../../Hooks/useAuth";
import { 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  TrophyIcon,
  CheckCircleIcon,
  PhotoIcon,
  PencilIcon,
  LightBulbIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CreatorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;

  // Fetch creator contests
  const { data: creatorContests = [], isLoading } = useQuery({
    queryKey: ['creatorContests', userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${userEmail}/creator`);
      return res.data;
    },
    enabled: !!userEmail
  });

  console.log("Creator Contests:", creatorContests);

  // Calculate statistics
  const totalContests = creatorContests?.length || 0;
  
  // Calculate total participants from all contests
  const totalParticipants = creatorContests?.reduce((sum, contest) => {
    return sum + (contest.participantsCount || contest.submissionsTask?.length || 0);
  }, 0) || 0;

  // Calculate total prize money distributed
  const totalPrizeDistributed = creatorContests?.reduce((sum, contest) => {
    return sum + (parseFloat(contest.prizeMoney) || 0);
  }, 0) || 0;

  // Calculate average participants per contest
  const avgParticipants = totalContests > 0 ? (totalParticipants / totalContests).toFixed(1) : 0;

  // Calculate completed contests (with winner)
  const completedContests = creatorContests?.filter(contest => 
    contest.winnerDetails && Object.keys(contest.winnerDetails).length > 0
  ).length || 0;

  // Calculate completion rate
  const completionRate = totalContests > 0 
    ? parseFloat(((completedContests / totalContests) * 100).toFixed(1))
    : 0;

  // Group contests by contestType
  const contestTypes = ['Image Design', 'Article Writing', 'Business Idea', 'Logo Design'];
  
  const contestsByType = contestTypes.reduce((acc, type) => {
    const contestsOfType = creatorContests?.filter(contest => contest.contestType === type) || [];
    
    if (contestsOfType.length > 0) {
      acc[type] = {
        count: contestsOfType.length,
        totalPrize: contestsOfType.reduce((sum, contest) => sum + (parseFloat(contest.prizeMoney) || 0), 0),
        totalParticipants: contestsOfType.reduce((sum, contest) => sum + (contest.participantsCount || contest.submissionsTask?.length || 0), 0),
        completed: contestsOfType.filter(contest => contest.winnerDetails && Object.keys(contest.winnerDetails).length > 0).length,
        contests: contestsOfType
      };
    }
    
    return acc;
  }, {});

  const contestTypesArray = Object.entries(contestsByType).map(([type, data]) => ({
    type,
    count: data.count,
    totalPrize: data.totalPrize,
    totalParticipants: data.totalParticipants,
    completed: data.completed,
    avgParticipants: data.count > 0 ? (data.totalParticipants / data.count).toFixed(1) : 0,
    contests: data.contests
  }));

  // Prepare data for Bar Chart
  const contestOverviewData = [
    { 
      category: 'Total Contests', 
      value: totalContests,
      color: '#3B82F6'
    },
    { 
      category: 'Total Participants', 
      value: totalParticipants,
      color: '#10B981'
    },
    { 
      category: 'Total Prize', 
      value: totalPrizeDistributed,
      color: '#8B5CF6',
      isMoney: true
    },
    { 
      category: 'Completion Rate', 
      value: completionRate,
      color: '#F59E0B',
      isPercent: true
    }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Image Design':
        return <PhotoIcon className="h-8 w-8 text-purple-600" />;
      case 'Article Writing':
        return <PencilIcon className="h-8 w-8 text-blue-600" />;
      case 'Business Idea':
        return <LightBulbIcon className="h-8 w-8 text-yellow-600" />;
      case 'Logo Design':
        return <SparklesIcon className="h-8 w-8 text-green-600" />;
      default:
        return <DocumentTextIcon className="h-8 w-8 text-gray-600" />;
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* First: 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Contests Card */}
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Contests</p>
              <p className="text-2xl font-bold text-primary">{totalContests}</p>
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
              Created by you
            </p>
          </div>
        </div>

        {/* Total Participants Card */}
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Participants</p>
              <p className="text-2xl font-bold text-primary">{totalParticipants}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (avgParticipants / 10) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Avg {avgParticipants} per contest
            </p>
          </div>
        </div>

        {/* Total Prize Distributed Card */}
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CurrencyDollarIcon className="h-8 w-8 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Prize</p>
              <p className="text-2xl font-bold text-primary">${totalPrizeDistributed}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (totalPrizeDistributed / 5000) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Distributed to winners
            </p>
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-secondary/50 dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-primary">{completionRate}%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${completionRate}%`,
                  backgroundColor: completionRate >= 70 ? '#10B981' : completionRate >= 40 ? '#F59E0B' : '#EF4444'
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {completedContests}/{totalContests} contests completed
            </p>
          </div>
        </div>
      </div>

      {/* Second: Contest Overview Bar Chart */}
      <div className="bg-secondary dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-primary">Contest Overview</h3>
          <ChartBarIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contestOverviewData}>
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
                {contestOverviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {contestOverviewData.map((item, index) => (
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

      {/* Contest Types Section */}
      {contestTypesArray.length > 0 ? (
        <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary">Contest Types</h3>
              <span className="text-sm text-gray-500">{contestTypesArray.length} types</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contestTypesArray.map((typeData, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${typeData.type === 'Image Design' ? 'bg-purple-100 dark:bg-purple-900' : 
                      typeData.type === 'Article Writing' ? 'bg-blue-100 dark:bg-blue-900' : 
                      typeData.type === 'Business Idea' ? 'bg-yellow-100 dark:bg-yellow-900' : 
                      'bg-green-100 dark:bg-green-900'}`}>
                      {getTypeIcon(typeData.type)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">{typeData.type}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{typeData.count} contests</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Prize</span>
                      </div>
                      <span className="font-bold text-primary">${typeData.totalPrize}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Participants</span>
                      </div>
                      <span className="font-bold text-primary">{typeData.totalParticipants}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                      </div>
                      <span className="font-bold text-primary">{typeData.completed}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Avg Participants per Contest</div>
                      <div className="text-xl font-bold text-primary">{typeData.avgParticipants}</div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="h-2 rounded-full bg-green-600"
                        style={{ width: `${(typeData.completed / typeData.count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-bold text-primary">Contest Types</h3>
          </div>
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <DocumentTextIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Contests Yet</h4>
            <p className="text-gray-500 dark:text-gray-400">Create contests to see them categorized by type here.</p>
          </div>
        </div>
      )}

      {/* Recent Contests Section */}
      <div className="bg-secondary dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary">Recent Contests</h3>
            <span className="text-sm text-gray-500">{creatorContests?.length || 0} total</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-primary">Contest</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Type</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Participants</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Prize</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-primary">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500">
              {creatorContests?.slice(0, 6).map((contest, index) => {
                const isCompleted = contest.winnerDetails && Object.keys(contest.winnerDetails).length > 0;
                const participants = contest.participantsCount || contest.submissionsTask?.length || 0;
                
                return (
                  <tr key={contest._id || index} className="transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {contest.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {contest.contestType === 'Image Design' && <PhotoIcon className="h-4 w-4 text-purple-600" />}
                        {contest.contestType === 'Article Writing' && <PencilIcon className="h-4 w-4 text-blue-600" />}
                        {contest.contestType === 'Business Idea' && <LightBulbIcon className="h-4 w-4 text-yellow-600" />}
                        {contest.contestType === 'Logo Design' && <SparklesIcon className="h-4 w-4 text-green-600" />}
                        <span>{contest.contestType}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{participants}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CurrencyDollarIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">${contest.prizeMoney || 0}</span>
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
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(contest.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {(!creatorContests || creatorContests.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <DocumentTextIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Contests Yet</h4>
            <p className="text-gray-500 dark:text-gray-400">Create your first contest to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;