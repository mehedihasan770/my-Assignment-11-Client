import { Link } from "react-router";
import { FaRocket } from "react-icons/fa";
import Title from "../Title/Title";

const AboutUs = () => {
  return (
    <section className="py-10 px-4">
      <div>
        {/* Simple Header */}
        <div className="text-center mb-12">
          <Title>About Us</Title>
          <p className="text-gray-600 dark:text-gray-300">
            Empowering creativity through contests
          </p>
        </div>

        {/* Simple Content */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <FaRocket className="text-3xl text-primary" />
            </div>
          </div>
          
          <div className="space-y-4 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              ContestHub connects talented creators with exciting competitions. 
              We provide a platform for innovation, recognition, and rewards.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              Our mission is to build a fair and inspiring community where 
              every participant gets the opportunity to showcase their skills.
            </p>
          </div>
        </div>

        {/* Simple Button */}
        <div className="text-center">
          <Link 
            to={'/about-us'} 
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;