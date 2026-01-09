import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from "../Title/Title";
import { FaCheckCircle } from "react-icons/fa";

const Guidelines = () => {
  const guidelines = [
    "All participants must have a registered account on ContestHub.",
    "Ensure your profile information is accurate before joining contests.",
    "Payment must be completed to register for a contest.",
    "Respect deadlines. Late submissions will not be considered.",
    "Each user can participate only once per contest unless specified otherwise.",
    "All submissions must be original work. Plagiarism results in disqualification.",
    "Winners will be announced within 7 days after contest deadline.",
    "Respect other participants and maintain professional conduct."
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="py-16 px-4">
      <div>
        {/* Section Header */}
        <div className="text-center mb-12">
          <Title>Contest Guidelines</Title>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {guidelines.map((item, i) => (
            <div
              data-aos="fade-up"
              data-aos-delay={i * 100}
              key={i}
              className="bg-secondary dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <FaCheckCircle className="text-2xl text-primary" />
              </div>
              
              <p className="text-gray-500 font-medium leading-relaxed">
                {item}
              </p>
              
              <div className="mt-4 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mr-2">
                  {i + 1}
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Rule {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to={'/guidelines'} 
            className="inline-flex items-center justify-center bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary-dark hover:shadow-xl transition-all duration-300 shadow-lg"
          >
            <span className="text-lg">View Complete Guidelines</span>
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Guidelines;