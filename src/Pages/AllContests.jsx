import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import Loader from "../Components/Loading/Loader";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import ContestGridSkeleton from "../Components/Skeleton/ContestGridSkeleton";
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaSortAmountUp, 
  FaChevronLeft, 
  FaChevronRight,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers
} from "react-icons/fa";
import Title from "../Components/Title/Title";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllContests = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("All");
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("participants");
  const [sortOrder, setSortOrder] = useState("desc");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const tabs = [
    "All",
    "Image Design",
    "Article Writing",
    "Business Idea",
    "Logo Design",
  ];

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/approved/contests");
      return res.data;
    },
  });

  const filteredContests = contests.filter((contest) => {
    if (activeTab !== "All" && contest.contestType !== activeTab) {
      return false;
    }
    
    if (searchTerm && !contest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !contest.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    const prizeMoney = contest.prizeMoney || contest.prize || 0;
    if (prizeMoney < priceRange[0] || prizeMoney > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const sortedContests = [...filteredContests].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case "participants":
        valueA = a.participantsCount || 0;
        valueB = b.participantsCount || 0;
        break;
      case "prize":
        valueA = a.prizeMoney || a.prize || 0;
        valueB = b.prizeMoney || b.prize || 0;
        break;
      case "date":
        break;
      default:
        valueA = a.participantsCount || 0;
        valueB = b.participantsCount || 0;
    }
    
    if (sortOrder === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  const totalItems = sortedContests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedContests = sortedContests.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, priceRange, sortBy, sortOrder, itemsPerPage]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value) || 0;
    const newRange = [...priceRange];
    newRange[index] = newValue;
    if (index === 0 && newValue > priceRange[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < priceRange[0]) {
      newRange[0] = newValue;
    }
    setPriceRange(newRange);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="mt-5 mb-5 font-sans container mx-auto px-4">
      <div className="mb-8 text-center">
        <Title>Explore All Contests</Title>
      </div>
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search contests by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-secondary rounded-xl shadow">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 rounded-full cursor-pointer py-2 border transition-all duration-200 text-sm font-medium
                ${tab === activeTab 
                  ? "bg-primary text-white border-primary shadow-lg" 
                  : "  border-gray-300 dark:border-gray-600 hover:bg-primary hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Prize:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                min="0"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSortOrder}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-all duration-200"
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
            >
              {sortOrder === "asc" ? 
                <FaSortAmountUp className="text-lg" /> : 
                <FaSortAmountDown className="text-lg" />
              }
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary bg-secondary dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            >
              <option value="participants">
                <FaUsers className="inline mr-2" />
                Most Participants
              </option>
              <option value="prize">
                <FaDollarSign className="inline mr-2" />
                Highest Prize
              </option>
              <option value="date">
                <FaCalendarAlt className="inline mr-2" />
                Newest First
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6 text-gray-600 dark:text-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-sm">
          Showing <span className="font-bold text-gray-800 dark:text-white">{startIndex + 1}-{endIndex}</span> of{" "}
          <span className="font-bold text-gray-800 dark:text-white">{totalItems}</span> contests
          {searchTerm && (
            <span className="ml-2">
              for "<span className="font-bold">{searchTerm}</span>"
            </span>
          )}
        </div>
        
        
      </div>

      {isLoading ? (
        <ContestGridSkeleton />
      ) : paginatedContests.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">
            No contests found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 10000]);
              setActiveTab("All");
              setSortBy("participants");
              setSortOrder("desc");
            }}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedContests.map((contest) => (
              <div
                data-aos="fade-up"
                key={contest._id}
                className="flex flex-col justify-between group bg-secondary dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-bold bg-primary text-white rounded-full shadow">
                      {contest.contestType}
                    </span>
                  </div>
                  {(contest.prizeMoney || contest.prize) && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full shadow">
                        ${contest.prizeMoney || contest.prize}
                      </span>
                    </div>
                  )}
                  {contest.createdAt && (
                    <div className="absolute bottom-4 right-4">
                      <span className="px-2 py-1 text-xs bg-gray-800/70 text-white rounded-full backdrop-blur-sm">
                        {formatDate(contest.createdAt)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1">
                    {contest.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {contest.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <FaUsers className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium ">
                        {contest.participantsCount || 0} Participants
                      </span>
                    </div>
                    {contest.entryFee && (
                      <div className="flex items-center space-x-1">
                        <FaDollarSign className="w-3 h-3 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          ${contest.entryFee}
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/contest-details/${contest._id}`}
                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-3xl transition-all duration-300 hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 gap-4">
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                    currentPage === 1
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((pageNum, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNum === 'number' ? goToPage(pageNum) : null}
                    disabled={typeof pageNum !== 'number'}
                    className={`min-w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-primary text-white shadow-lg font-bold border-primary"
                        : typeof pageNum === 'number'
                        ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600"
                        : "bg-transparent text-gray-400 cursor-default border-none"
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum === '...' ? '...' : pageNum}
                  </button>
                ))}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center justify-center ${
                    currentPage === totalPages
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label="Next page"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllContests;