import React from 'react';
import { 
  FaPalette, 
  FaPenFancy, 
  FaLightbulb, 
  FaCamera
} from 'react-icons/fa';
import { Link } from 'react-router';
import Title from '../Title/Title';

const CategoriesSection = () => {
  

  return (
    <section>
      <div>
        <div className="text-center mb-12">
          <Title>Browse Categories</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <Link
            to="/all-contests"
            className="group block"
          >
            <div className="relative bg-secondary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary p-5 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaPalette className="text-4xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  245+
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Image Design
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Graphics, UI/UX, Logos
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium ">
                  Active Contests
                </span>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>


          <Link
            to="/all-contests"
            className="group block"
          >
            <div className="relative bg-secondary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary p-5 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaPenFancy className="text-4xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  210+
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Article Writing
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Blogs, Stories, Essays
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium ">
                  Active Contests
                </span>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          <Link
            to="/all-contests"
            className="group block"
          >
            <div className="relative bg-secondary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary p-5 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaLightbulb className="text-4xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  156+
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Business Idea
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Startups, Innovation Plans
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium ">
                  Active Contests
                </span>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>
          <Link
            to="/all-contests"
            className="group block"
          >
            <div className="relative bg-secondary dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-200 dark:border-gray-700 overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-16 translate-x-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary p-5 flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaCamera className="text-4xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  120+
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                Logo Design
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Brand Identity, Logos
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm font-medium ">
                  Active Contests
                </span>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  View All
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

         
        </div>

        <div className="mt-16 bg-linear-to-r from-primary/5 via-secondary/5 to-primary/5 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">2,000+</div>
              <div className="text-gray-500 font-medium">Total Contests</div>
              <div className=" text-sm mt-1">Across all categories</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-500 font-medium">Participants</div>
              <div className=" text-sm mt-1">Active community</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">$500K+</div>
              <div className="text-gray-500 font-medium">Prize Pool</div>
              <div className=" text-sm mt-1">Awarded to winners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;