const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-10 bg-gray-400 rounded-lg w-64 mb-3"></div>
        <div className="h-4 bg-gray-400 rounded w-96 max-w-full"></div>
      </div>
      <div className="bg-secondary/50 rounded-2xl shadow-lg overflow-hidden mb-6">

        <div className="bg-linear-to-r from-gray-400 to-gray-500 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white/70 shadow-lg"></div>
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-gray-400 rounded-full"></div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-4">
                <div className="h-8 bg-gray-300 rounded-lg w-48 sm:w-64"></div>
                <div className="h-7 bg-gray-400 rounded-full w-28"></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-72 max-w-full"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-64"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="h-6 bg-gray-400 rounded w-48"></div>
              </div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="h-6 bg-gray-400 rounded w-48"></div>
              </div>
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-400 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-300">
            <div className="flex justify-center">
              <div className="h-12 bg-gray-400 rounded-xl w-48"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/70 shadow-lg border border-gray-300 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              <div className="h-5 bg-gray-400 rounded w-36"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded-lg w-24 mb-2"></div>
            <div className="h-4 bg-gray-400 rounded w-40"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;