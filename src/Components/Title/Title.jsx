import React from 'react';

const Title = ({ children, className = '' }) => {
    return (
        <div className={`relative mb-10 ${className}`}>
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span className="relative inline-block">
                        <span className="absolute -inset-1 bg-linear-to-r from-primary/20 to-secondary/20 blur-lg opacity-70 rounded-lg"></span>
                        <span className="relative">{children}</span>
                    </span>
                </h2>
                
                <div className="relative h-1.5 max-w-2xl mx-auto overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
                    
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
                    
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
                </div>
                
                <div className="flex justify-center items-center mt-8 space-x-6">
                    <div className="w-4 h-4 border-2 border-primary/40 rotate-45"></div>
                    <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 h-2 bg-primary/60 rounded-full"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                        ))}
                    </div>
                    <div className="w-4 h-4 border-2 border-primary/40 rotate-45"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 3s infinite;
                }
            `}</style>
        </div>
    );
};

export default Title;