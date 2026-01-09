import React from 'react';

const ContestGridSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="group bg-secondary rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse"
                >
                    <div className="relative overflow-hidden">
                        <div className="w-full h-56 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer"></div>
                        
                        <div className="absolute top-4 right-4">
                            <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="h-6 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-3 animate-shimmer"></div>
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>

                        <div className="space-y-2 mb-4">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </div>
                        </div>

                        <div className="h-11 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContestGridSkeleton;