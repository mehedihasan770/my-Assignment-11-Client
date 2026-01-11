import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaEnvelope, FaUser, FaPhone, FaShieldAlt, FaIdCard, FaCalendarPlus, FaSignInAlt, FaCheckCircle } from "react-icons/fa";
import { MdCancel, MdVerified, MdNotInterested } from "react-icons/md";
import useDashboardRole from "../../Hooks/useDashboardRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import Title from "../../Components/Title/Title";
import ProfileSkeleton from "../../Components/Skeleton/ProfileSkeleton";

const Profile = () => {
  const { roleData, roleLoading } = useDashboardRole()
  const { user, loading, setLoading, updateUserPF } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
      bio: user?.bio || "",
    }
  });


  const handleEditProfile = async (data) => {
    setLoading(true);
    const userInfo = {
      name: data?.name,
      img: data?.photoURL,
      bio: data?.bio,
    };
    try {
      await updateUserPF(data?.name, data.photoURL);
      await axiosSecure.patch(`user/${user?.email}/edit`, userInfo);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(`Update failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
  };

  const userData = {
    email: user?.email || "No email provided",
    isVerified: user?.emailVerified || false,
    fullName: user?.displayName || "No name provided",
    phone: user?.phoneNumber || "Not provided",
    role: roleData?.role,
    userId: user?.uid || "No ID",
    created: user?.metadata?.creationTime 
      ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : "Not available",
    lastLogin: user?.metadata?.lastSignInTime
      ? new Date(user.metadata.lastSignInTime).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "Not available",
    status: "Active"
  };

  const calculateAccountAge = () => {
    if (!user?.metadata?.creationTime) return "N/A";
    
    const created = new Date(user.metadata.creationTime);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day";
    if (diffDays < 30) return `${diffDays} days`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''}`;
  };

  if (loading || roleLoading) {
    <ProfileSkeleton/>
  }

  return (
    <div>
      <Title>My Profile</Title>
      <div>
        <div className="bg-secondary/50 rounded-2xl shadow overflow-hidden">
          <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-secondary/50 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {isEditing ? (
                    <div className="text-center w-full">
                      <input
                        {...register("photoURL")}
                        className="w-full p-2 text-sm border rounded"
                        placeholder="Image URL"
                      />
                      <p className="text-xs text-white mt-2">Enter image URL</p>
                    </div>
                  ) : user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={userData.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-5xl font-bold text-blue-600">
                      {userData.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-2 right-2 cursor-pointer bg-white p-2 rounded-full shadow-md hover:shadow-lg transition"
                  >
                    <FaEdit className="text-blue-600" />
                  </button>
                )}
              </div>

              <div className="flex-1 text-white text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? (
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="bg-transparent border-b border-white/50 text-white placeholder-white/70 w-full md:w-auto"
                        placeholder="Enter your name"
                      />
                    ) : (
                      userData.fullName
                    )}
                  </h2>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${userData.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {userData.isVerified ? <MdVerified /> : <MdNotInterested />}
                    <span>{userData.isVerified ? "Verified" : "Not Verified"}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <FaEnvelope />
                  <span className="text-white/90">{userData.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaShieldAlt />
                  <span className="text-white/90">User ID: {userData.userId.substring(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">Bio</label>
                  <textarea
                    {...register("bio")}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                    defaultValue={user?.bio || ""}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit(handleEditProfile)}
                    disabled={loading}
                    className="flex-1 bg-primary cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 bg-gray-200 cursor-pointer text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition flex items-center justify-center gap-2"
                  >
                    <MdCancel /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b flex items-center gap-2">
                    <FaUser className="text-primary" /> Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaUser />
                        <span>Full Name</span>
                      </div>
                      <p className="font-bold">{userData.fullName}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaEnvelope />
                        <span>Email Address</span>
                      </div>
                      <p className="font-bold">{userData.email}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaPhone />
                        <span>Phone Number</span>
                      </div>
                      <p className="font-bold">{userData.phone || "Not provided"}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaShieldAlt />
                        <span>User Role</span>
                      </div>
                      <p className="font-bold">{userData.role}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b flex items-center gap-2">
                    <FaIdCard className="text-blue-600" /> Account Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaIdCard />
                        <span>User ID</span>
                      </div>
                      <p className="font-bold">{userData.userId}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaCalendarPlus />
                        <span>Account Created</span>
                      </div>
                      <p className="font-bold">{userData.created}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaSignInAlt />
                        <span>Last Login</span>
                      </div>
                      <p className="font-bold">{userData.lastLogin}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-500"> 
                        <FaCheckCircle />
                        <span>Account Status</span>
                      </div>
                      <p className="font-bold text-green-600">{userData.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary cursor-pointer text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 mx-auto"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-5">
          <div className=" shadow border border-white/40 p-5 rounded-3xl">
            <div className="flex items-center space-x-2 text-gray-500"> 
              <FaCalendarPlus className="text-blue-600" />
              <span>Account Age</span>
            </div>
            <p className="font-bold">{calculateAccountAge()}</p>
          </div>
          <div className=" shadow border border-white/40 p-5 rounded-3xl">
            <div className="flex items-center space-x-2 text-gray-500"> 
              {userData.isVerified ? <MdVerified className="text-green-600" /> : <MdNotInterested className="text-yellow-600" />}
              <span>Verification</span>
            </div>
            <p className="font-bold text-green-600">{userData.isVerified ? "Verified" : "Pending"}</p>
          </div>
          <div className=" shadow border border-white/40 p-5 rounded-3xl">
            <div className="flex items-center space-x-2 text-gray-500"> 
              <FaShieldAlt className="text-indigo-600" />
              <span>User Role</span>
            </div>
            <p className="font-bold">{userData.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;