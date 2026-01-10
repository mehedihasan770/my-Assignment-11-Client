import React from 'react';

const ContestDetailsSkeleton = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="bg-secondary/50 shadow p-2 rounded-3xl">
        <div className="mb-8 bg-secondary/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow border border-white/20 dark:border-gray-700/50 animate-pulse">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative mr-4">
                <div className="w-16 h-16 bg-secondary/60 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-6 bg-secondary/60 dark:bg-gray-700 rounded w-48"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-secondary/60 dark:bg-gray-700 rounded w-24 mx-auto md:mx-0"></div>
              <div className="h-5 bg-secondary/60 dark:bg-gray-700 rounded w-36 mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
              <div className="w-full h-[400px] bg-linear-to-r from-secondary/40 via-secondary/30 to-secondary/40 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                <div className="h-10 bg-secondary/60 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-secondary/60 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-secondary dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 bg-secondary/60 dark:bg-gray-700 rounded w-16 mb-2"></div>
                      <div className="h-8 bg-secondary/60 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                    <div className="w-8 h-8 bg-secondary/60 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-secondary dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/60 dark:bg-gray-700 rounded-xl mr-3"></div>
                  <div className="h-6 bg-secondary/60 dark:bg-gray-700 rounded w-48"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>

              <div className="bg-secondary dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/60 dark:bg-gray-700 rounded-xl mr-3"></div>
                  <div className="h-6 bg-secondary/60 dark:bg-gray-700 rounded w-48"></div>
                </div>
                <div className="bg-secondary/50 dark:bg-gray-900/50 rounded-2xl p-5">
                  <div className="space-y-3">
                    <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-11/12"></div>
                    <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-br from-gray-900 to-black rounded-3xl p-6 shadow-2xl overflow-hidden relative animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-40 mb-6"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center bg-secondary/20 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="h-12 bg-secondary/40 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-secondary/40 dark:bg-gray-700 rounded w-16 mx-auto"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="text-center mb-6 space-y-3">
                <div className="h-7 bg-secondary/60 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>

              <div className="w-full h-14 bg-secondary/60 dark:bg-gray-700 rounded-2xl mb-6"></div>

              <div className="mt-6 p-4 rounded-2xl bg-secondary/40 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-secondary/60 dark:bg-gray-700 rounded-full mr-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-48"></div>
                    <div className="h-3 bg-secondary/60 dark:bg-gray-700 rounded w-36"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-6 bg-secondary/60 dark:bg-gray-700 rounded w-32 mb-4"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/60 dark:bg-gray-700 rounded-full mr-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-secondary/60 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-3 bg-secondary/60 dark:bg-gray-700 rounded w-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetailsSkeleton;