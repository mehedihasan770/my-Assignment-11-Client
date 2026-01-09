import React from 'react';

const WinnerSkeleton = () => {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-secondary p-5 rounded-2xl animate-pulse border border-gray-300">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex justify-center">
                            <div className="relative w-64 h-64 bg-secondary/80 rounded-3xl border-4 border-white/40">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-secondary/60"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="h-7 bg-secondary/80 rounded w-48 mb-4"></div>
                            
                            <div className="h-6 bg-secondary/80 rounded w-72 mb-6"></div>

                            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md mb-6">
                                <div className="space-y-3">
                                    <div className="h-4 bg-secondary/70 rounded w-56"></div>
                                    
                                    <div className="h-4 bg-secondary/70 rounded w-48"></div>
                                    <div className="h-4 bg-secondary/70 rounded w-60"></div>
                                </div>
                            </div>

                            <div className="h-12 bg-secondary/80 rounded-2xl w-48"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WinnerSkeleton;