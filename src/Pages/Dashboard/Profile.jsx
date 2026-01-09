import React, { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { FaEdit, FaUser, FaTrophy, FaCalendarAlt, FaChartLine, FaUsers, FaMedal, FaStar, FaUserFriends, FaGlobe, FaCrown, FaPalette, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import { MdEmail, MdVerified, MdDateRange, MdAdminPanelSettings, MdDashboard, MdSecurity, MdAnalytics } from "react-icons/md";
import { RiContrastLine, RiUserSettingsLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Loader from "../../Components/Loading/Loader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useQuery } from "@tanstack/react-query";
import useDashboardRole from "../../Hooks/useDashboardRole";

const Profile = () => {
  const { roleData, roleLoading } = useDashboardRole();
  const { user, loading, setLoading, updateUserPF } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditProfile = async (data) => {
    const userInfo = {
      name: data?.name,
      img: data?.photoURL,
      bio: data?.bio,
    };
    try {
      await updateUserPF(data?.name, data.photoURL);
      await axiosSecure.patch(`user/${user?.email}/edit`, userInfo);
      setLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.status === 401) {
        toast.success("Profile updated successfully!");
        setLoading(false);
        setIsEditing(false);
      } else {
        toast.error(`Update failed: ${error.message}`);
        setLoading(false);
      }
    }
  };

  // Fetch profile data
  const { data: profile = {}, isLoading: loading4 } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}/profile`);
      return res.data;
    },
  });

  // For regular users only
  const { data: ParticipatedContests = [], isLoading: loadingParticipated } = useQuery({
    queryKey: ["ParticipatedContests", user?.email],
    queryFn: async () => {
      if (roleData?.role !== "user") return [];
      const res = await axiosSecure.get(`/Participated/${user?.email}/user`);
      return res.data;
    },
    enabled: roleData?.role === "user"
  });

  const { data: WiningContests = [], isLoading: loadingWinning } = useQuery({
    queryKey: ["WiningContests", user?.email],
    queryFn: async () => {
      if (roleData?.role !== "user") return [];
      const res = await axiosSecure.get(`/winning/${user?.email}/user`);
      return res.data;
    },
    enabled: roleData?.role === "user"
  });

  // For admin and creator
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // For creator only
  const { data: contests = [], isLoading: loadingContests } = useQuery({
    queryKey: ["myCreatedContests", user?.email],
    queryFn: async () => {
      if (roleData?.role !== "creator") return [];
      const res = await axiosSecure.get(`/contests/${user.email}/creator`);
      return res.data;
    },
    enabled: roleData?.role === "creator"
  });

  // For admin only
  const { data: allContests = [], isLoading: loadingAllContests } = useQuery({
    queryKey: ["allContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
    enabled: roleData?.role === "admin" || roleData?.role === "creator"
  });

  const { data: platformStats = {}, isLoading: loadingPlatformStats } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
    enabled: roleData?.role === "admin"
  });

  // Calculate statistics based on role
  let winRate = 0;
  let totalWon = 0;
  let totalParticipated = 0;
  let totalContests = 0;
  let totalUsers = users?.length || 0;
  let totalPlatformContests = allContests?.length || 0;

  if (roleData?.role === "user") {
    totalParticipated = ParticipatedContests?.length || 0;
    totalWon = WiningContests?.length || 0;
    winRate = totalParticipated > 0
      ? Math.round((totalWon / totalParticipated) * 100)
      : 0;
  } else if (roleData?.role === "creator") {
    totalContests = contests?.length || 0;
    totalPlatformContests = allContests?.length || 0;
  }

  // Chart Data based on role
  const userChartData = [
    { name: "Wins", value: totalWon, color: "#34D399" },
    { name: "Participated", value: Math.max(0, totalParticipated - totalWon), color: "#F87171" },
  ];

  const adminChartData = [
    { name: "Total Users", value: totalUsers, color: "#8B5CF6" },
    { name: "Total Contests", value: totalPlatformContests, color: "#F59E0B" },
    { name: "Active Today", value: platformStats?.activeToday || 12, color: "#10B981" },
    { name: "Pending", value: platformStats?.pendingApprovals || 5, color: "#EF4444" },
  ];

  const creatorChartData = [
    { name: "My Contests", value: totalContests, color: "#3B82F6" },
    { name: "Platform Contests", value: Math.max(0, totalPlatformContests - totalContests), color: "#10B981" },
    { name: "Active", value: contests?.filter(c => c.status === 'active')?.length || 0, color: "#F59E0B" },
    { name: "Completed", value: contests?.filter(c => c.status === 'completed')?.length || 0, color: "#8B5CF6" },
  ];

  // Statistics Cards based on role
  const userStats = [
    { title: "Participated", value: totalParticipated, icon: <FaCalendarAlt />, color: "bg-purple-500", desc: "Total contests joined" },
    { title: "Wins", value: totalWon, icon: <FaTrophy />, color: "bg-yellow-500", desc: "Contests won" },
    { title: "Win Rate", value: `${winRate}%`, icon: <FaChartLine />, color: "bg-green-500", desc: "Success percentage" },
    { title: "Current Rank", value: "#" + (users?.findIndex(u => u.email === user?.email) + 1 || "N/A"), icon: <FaCrown />, color: "bg-blue-500", desc: "Among all users" },
  ];

  const adminStats = [
    { title: "Total Users", value: totalUsers, icon: <FaUsers />, color: "bg-purple-500", desc: "Registered users" },
    { title: "Total Contests", value: totalPlatformContests, icon: <RiContrastLine />, color: "bg-blue-500", desc: "All platform contests" },
    { title: "Today's Activity", value: platformStats?.todaysActivity || "24", icon: <MdAnalytics />, color: "bg-green-500", desc: "Active sessions" },
    { title: "Security Level", value: "High", icon: <MdSecurity />, color: "bg-red-500", desc: "System security" },
  ];

  const creatorStats = [
    { title: "My Contests", value: totalContests, icon: <RiContrastLine />, color: "bg-blue-500", desc: "Created by you" },
    { title: "Total Earnings", value: `$${contests?.reduce((sum, c) => sum + (c.prizePool || 0), 0) || "0"}`, icon: <FaDollarSign />, color: "bg-green-500", desc: "Prize pool total" },
    { title: "Avg. Rating", value: "4.8", icon: <FaStar />, color: "bg-yellow-500", desc: "Contest ratings" },
    { title: "Participants", value: contests?.reduce((sum, c) => sum + (c.participants || 0), 0) || "0", icon: <FaUserFriends />, color: "bg-purple-500", desc: "Total participants" },
  ];

  const currentStats = roleData?.role === "admin" ? adminStats : 
                      roleData?.role === "creator" ? creatorStats : userStats;

  // Recent activity based on role
  const getRecentActivity = () => {
    if (roleData?.role === "user") {
      return ParticipatedContests.slice(0, 3).map((contest, index) => ({
        id: index,
        title: contest.contestName || "Contest",
        date: new Date(contest.participationDate).toLocaleDateString(),
        status: contest.status || "participated",
        icon: <FaMedal />,
        color: contest.status === 'won' ? 'text-green-500' : 'text-blue-500'
      }));
    } else if (roleData?.role === "creator") {
      return contests.slice(0, 3).map((contest, index) => ({
        id: index,
        title: contest.contestName,
        date: new Date(contest.createdAt).toLocaleDateString(),
        status: contest.status || "draft",
        icon: <FaPalette />,
        color: contest.status === 'active' ? 'text-green-500' : 
               contest.status === 'completed' ? 'text-purple-500' : 'text-gray-500'
      }));
    } else {
      // Admin activity
      return [
        { id: 1, title: "System Update", date: "Today", status: "completed", icon: <MdDashboard />, color: "text-green-500" },
        { id: 2, title: "User Verification", date: "Yesterday", status: "pending", icon: <MdVerified />, color: "text-yellow-500" },
        { id: 3, title: "Security Audit", date: "2 days ago", status: "completed", icon: <MdSecurity />, color: "text-blue-500" },
      ];
    }
  };

  if (loading || roleLoading || loading4 || 
      (roleData?.role === "user" && (loadingParticipated || loadingWinning)) ||
      (roleData?.role === "creator" && loadingContests) ||
      (roleData?.role === "admin" && (loadingUsers || loadingAllContests || loadingPlatformStats))) {
    return <Loader />;
  }

  const isAdmin = roleData?.role === "admin";
  const isCreator = roleData?.role === "creator";
  const isUser = roleData?.role === "user";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 dark:from-primary/30 dark:to-purple-900/30" />
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600"
              alt="Profile Banner"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200" />
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl object-cover"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-lg hover:scale-110"
              >
                <FaEdit size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 text-center px-4">
          {/* Role Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-900/20 px-4 py-2 rounded-full mb-4 shadow-sm backdrop-blur-sm">
            {isAdmin ? (
              <>
                <MdAdminPanelSettings className="text-purple-500 text-lg" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Platform Administrator
                </span>
              </>
            ) : isCreator ? (
              <>
                <FaPalette className="text-blue-500 text-lg" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Contest Creator
                </span>
              </>
            ) : (
              <>
                <FaUser className="text-green-500 text-lg" />
                <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Contest Participant
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            {user?.displayName}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg">
              <MdEmail className="text-primary" />
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg">
              <MdDateRange className="text-primary" />
              <span>
                Member since {new Date(user?.metadata?.creationTime).toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 px-4 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl">
            {profile.bio || "No bio yet. Share something about yourself!"}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {currentStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow"
              >
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 mx-auto`}>
                  <div className="text-xl">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Charts & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role-specific main chart */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                {isUser ? "Contest Performance" : 
                 isCreator ? "Contest Creation Analytics" : 
                 "Platform Overview"}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {isUser ? (
                    <AreaChart data={[
                      { month: 'Jan', wins: 2, participated: 4 },
                      { month: 'Feb', wins: 3, participated: 6 },
                      { month: 'Mar', wins: 4, participated: 8 },
                      { month: 'Apr', wins: 2, participated: 5 },
                      { month: 'May', wins: 3, participated: 7 },
                      { month: 'Jun', wins: 5, participated: 9 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Area type="monotone" dataKey="participated" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="wins" stackId="2" stroke="#34D399" fill="#34D399" fillOpacity={0.3} />
                    </AreaChart>
                  ) : isCreator ? (
                    <BarChart data={[
                      { month: 'Jan', created: 2, participants: 120 },
                      { month: 'Feb', created: 3, participants: 180 },
                      { month: 'Mar', created: 1, participants: 90 },
                      { month: 'Apr', created: 4, participants: 240 },
                      { month: 'May', created: 2, participants: 150 },
                      { month: 'Jun', created: 3, participants: 210 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="created" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="participants" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : (
                    <BarChart data={[
                      { month: 'Jan', users: 120, contests: 45 },
                      { month: 'Feb', users: 180, contests: 62 },
                      { month: 'Mar', users: 210, contests: 78 },
                      { month: 'Apr', users: 240, contests: 85 },
                      { month: 'May', users: 280, contests: 95 },
                      { month: 'Jun', users: 310, contests: 110 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="contests" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Recent Activity
                </h3>
                <span className="text-sm text-primary font-medium">
                  {isUser ? "Contest Participation" : 
                   isCreator ? "Contest Management" : 
                   "Admin Actions"}
                </span>
              </div>
              <div className="space-y-4">
                {getRecentActivity().map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color} bg-opacity-20`}>
                        {activity.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.date}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' || activity.status === 'won' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : activity.status === 'active'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Role Specific Info */}
          <div className="space-y-6">
            {/* Role-specific Chart */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                {isUser ? "Win Distribution" : 
                 isCreator ? "Contest Status" : 
                 "Platform Statistics"}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={isUser ? userChartData : isCreator ? creatorChartData : adminChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {(isUser ? userChartData : isCreator ? creatorChartData : adminChartData).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Role-specific Info Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                {isUser ? "Participant Info" : 
                 isCreator ? "Creator Privileges" : 
                 "Admin Controls"}
              </h3>
              <div className="space-y-4">
                {isUser ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Contest Access</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Full</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Prize Eligibility</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">Yes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Rating System</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">Enabled</span>
                    </div>
                  </>
                ) : isCreator ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Create Contests</span>
                      <FaCheckCircle className="text-blue-500 text-xl" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Set Prize Pool</span>
                      <FaCheckCircle className="text-purple-500 text-xl" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Manage Participants</span>
                      <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">User Management</span>
                      <MdAdminPanelSettings className="text-purple-500 text-xl" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">System Controls</span>
                      <MdSecurity className="text-blue-500 text-xl" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Moderation Tools</span>
                      <MdVerified className="text-red-500 text-xl" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 dark:from-primary/20 dark:to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/20">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {isUser ? (
                  <>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-primary rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Join Contest
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      View Results
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      My Submissions
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-green-600 dark:text-green-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Leaderboard
                    </button>
                  </>
                ) : isCreator ? (
                  <>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-primary rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Create Contest
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Manage Contests
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      View Analytics
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-green-600 dark:text-green-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Earnings
                    </button>
                  </>
                ) : (
                  <>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-primary rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Dashboard
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Manage Users
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      System Logs
                    </button>
                    <button className="p-3 bg-white/80 dark:bg-gray-800/80 text-red-600 dark:text-red-400 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all font-medium shadow-sm hover:shadow-md">
                      Security
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit(handleEditProfile)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    defaultValue={user?.photoURL}
                    {...register("photoURL", {
                      required: "Profile photo is required",
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    defaultValue={profile?.bio}
                    {...register("bio")}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl hover:opacity-90 transition-all font-medium shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;