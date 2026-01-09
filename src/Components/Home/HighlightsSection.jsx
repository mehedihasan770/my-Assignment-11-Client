import React from 'react';
import { 
  FaTrophy, 
  FaUsers, 
  FaRocket,
  FaShieldAlt,
} from 'react-icons/fa';
import Title from '../Title/Title';

const HighlightsSection = () => {
  return (
    <section className='pb-10'>
      <div>
        <div className="text-center mb-12">
          <Title>Why Choose Us</Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-secondary dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FaTrophy className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Big Prize Pools</h3>
            <p className="text-gray-500">
              Compete for substantial cash prizes and rewards in every contest category
            </p>
          </div>

          <div className="bg-secondary dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FaUsers className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Large Community</h3>
            <p className="text-gray-500">
              Join thousands of talented creators and participants from around the world
            </p>
          </div>

          <div className="bg-secondary dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FaRocket className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Fast Growth</h3>
            <p className="text-gray-500">
              Accelerate your career with exposure to industry leaders and opportunities
            </p>
          </div>

          <div className="bg-secondary rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <FaShieldAlt className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Secure & Fair</h3>
            <p className="text-gray-500">
              Transparent judging process with secure payments and data protection
            </p>
          </div>
        </div>

        <div className="bg-linear-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl p-8 mb-12 shadow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl text-primary font-bold mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary font-bold mb-2">99.9%</div>
              <div className="text-sm">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary font-bold mb-2">100%</div>
              <div className="text-sm">Secure Payments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-primary font-bold mb-2">4.9/5</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;