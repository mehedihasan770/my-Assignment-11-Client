import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import Loader from "../Loading/Loader";
import { Link } from "react-router";
import { useAuth } from "../../Hooks/useAuth";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from "../Title/Title";
import ContestGridSkeleton from "../Skeleton/ContestGridSkeleton";

const slides = [
  {
    id: 1,
    title: "Design Contests",
    subtitle: "Showcase Your Creativity",
    description: "Participate in graphic design, UI/UX, and logo design competitions",
    buttonText: "Join Contest",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
    contestType: "design"
  },
  {
    id: 2,
    title: "Article Writing",
    subtitle: "Express Your Thoughts",
    description: "Join writing competitions on various topics and showcase your writing skills",
    buttonText: "Join Contest",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80",
    contestType: "writing"
  },
  {
    id: 3,
    title: "Business Ideas",
    subtitle: "Innovate & Win",
    description: "Present your business plans and startup ideas to win funding",
    buttonText: "Join Contest",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    contestType: "business"
  },
  {
    id: 4,
    title: "Photography",
    subtitle: "Capture Moments",
    description: "Participate in photography contests and win amazing prizes",
    buttonText: "Join Contest",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    contestType: "photography"
  }
];

const Banner = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [contestType, setContestType] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const slideInterval = useRef(null);
  const contestSectionRef = useRef(null);
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const startAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoSlide();
  };

  const scrollToContests = () => {
    contestSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSearch = () => {
    if (!contestType.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setTimeout(() => {
        scrollToContests();
      }, 300);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const { data: contests = [], isLoading: contestsLoading } = useQuery({
    queryKey: ["findContest", contestType],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/find/contest?contestType=${contestType}`
      );
      return res.data;
    },
    enabled: !!contestType.trim(),
  });

  const { data: top6Contests = [], isLoading: top6Loading } = useQuery({
    queryKey: ["top6Contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/top-6-contests`);
      return res.data;
    },
  });

  const isLoading = isSearching || contestsLoading;

  return (
    <>
      <div 
        className="relative w-full rounded-2xl overflow-hidden" 
        style={{ height: '65vh', maxHeight: '65vh' }}
      >
        
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'brightness(0.7)' }}
                />
                
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/40"></div>
                <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent"></div>
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-xl">
                    <div 
                      data-aos="fade-right" 
                      data-aos-delay="200"
                    >
                      <p className="text-primary font-semibold text-lg tracking-wide">
                        {slide.subtitle}
                      </p>
                    
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                        {slide.title}
                      </h1>

                      <p className="text-lg text-gray-200 max-w-lg">
                        {slide.description}
                      </p>

                      <div className="pt-6">
                        <Link
                          to={`/contests?type=${slide.contestType}`}
                          className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[180px]"
                        >
                          Join Contest
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 sm:p-2 shadow-2xl">
            <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={contestType}
                onChange={(e) => setContestType(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search contests by type"
                className="flex-1 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-l-full bg-white/95 focus:outline-none text-gray-900 border border-r-0 border-primary/30 focus:border-primary transition-all placeholder-gray-500 text-sm sm:text-base w-full"
              />
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-primary hover:bg-primary-dark text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-r-full font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-20 sm:min-w-[100px] md:min-w-[120px] text-sm sm:text-base"
              >
                Search
              </button>
            </form>
          </div>
          <div 
              className="flex justify-center mt-3 sm:mt-4 cursor-pointer"
              onClick={scrollToContests}
              title="Scroll to see more contests"
            >
              <div className="animate-bounce flex flex-col items-center">
                <span className="text-white text-xs sm:text-sm mb-1">View Contests</span>
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full z-20 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/30 text-white px-2 py-1 rounded-full text-xs sm:text-sm z-20 backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      <div ref={contestSectionRef} className="mt-12">
        <Title>
          {contestType ? "Search Results" : "Top Contests"}
        </Title>
        
        {isLoading && (
          <ContestGridSkeleton/>
        )}
        
        {!isLoading && contestType.length > 0 && contests.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">
              No contests found for "{contestType}"
            </h3>
            <p className="text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        ) : top6Loading ? (
          <ContestGridSkeleton/>
        ) : top6Contests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Please reload the page or check your connection
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {(contestType && !isLoading ? contests : top6Contests || []).map((contest) => (
              <div
                data-aos="fade-up"
                key={contest._id}
                className="group bg-secondary rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-full">
                      {contest.contestType}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {contest.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-sm font-medium">
                        {contest.participantsCount} Participants
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/contest-details/${contest._id}`}
                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link
            to={"/all-contests"}
            className="inline-flex items-center justify-center bg-gray-800 hover:bg-black dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-full transition-all duration-300"
          >
            View All Contests
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;