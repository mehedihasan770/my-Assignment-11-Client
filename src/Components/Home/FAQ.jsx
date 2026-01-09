import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from "../Title/Title";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaLock, FaTrophy, FaUsers, FaClock, FaShieldAlt } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account on ContestHub?",
      answer: "Creating an account is simple! Click the 'Sign Up' button on the top right, fill in your basic information (name, email, password), verify your email, and you're ready to start participating in contests. The entire process takes less than 2 minutes.",
      icon: <FaQuestionCircle className="text-xl" />
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept multiple secure payment methods including Credit/Debit Cards (Visa, MasterCard), Digital Wallets (Bkash, Nagad, Rocket), and Bank Transfers. All transactions are encrypted and secure.",
      icon: <FaLock className="text-xl" />
    },
    {
      question: "How can I track my contest progress?",
      answer: "After logging in, go to your Dashboard and navigate to 'My Contests' section. Here you can see all your active contests, submission status, judging progress, and results. You'll also receive email notifications at every stage.",
      icon: <FaTrophy className="text-xl" />
    },
    {
      question: "What are the contest participation rules?",
      answer: "Each contest has specific rules mentioned in its description. General rules include original content submission, adherence to deadlines, no plagiarism, and respectful community engagement. Violations may lead to disqualification.",
      icon: <FaUsers className="text-xl" />
    },
    {
      question: "How long does it take to receive prizes?",
      answer: "Winners typically receive their prizes within 7-14 business days after contest results are announced. Digital prizes are delivered instantly, while physical prizes or cash transfers may take additional processing time.",
      icon: <FaClock className="text-xl" />
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolutely! We use bank-level encryption (SSL/TLS) to protect your data. We never share your personal information with third parties without consent. Read our Privacy Policy for detailed information about data protection.",
      icon: <FaShieldAlt className="text-xl" />
    }
  ];

  const [openFAQ, setOpenFAQ] = useState(0);
  const handleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, [])

  return (
    <div className="mt-20 mb-20">
      <div className="mb-12 text-center">
        <Title>Asked Questions</Title>
      </div>
      
      <div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              
              key={i} 
              className={`bg-secondary dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${openFAQ === i ? 'border-primary dark:border-primary/50' : 'border-gray-200 dark:border-gray-700'}`}
            >
              <button
                onClick={() => handleFAQ(i)}
                className="w-full text-left cursor-pointer px-8 py-6 flex justify-between items-center focus:outline-none group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${openFAQ === i ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-colors duration-300`}>
                    {faq.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    <p className={`text-sm text-gray-500 mt-1 ${openFAQ === i ? 'block' : 'hidden'}`}>
                      Click to {openFAQ === i ? 'collapse' : 'expand'}
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${openFAQ === i ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'} transition-all duration-300`}>
                  {openFAQ === i ? (
                    <FaChevronUp className="text-lg" />
                  ) : (
                    <FaChevronDown className="text-lg group-hover:rotate-12 transition-transform" />
                  )}
                </div>
              </button>
              
              <div className={`px-8 overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                  {i === 0 && (
                    <div className="mt-4">
                      <button className="px-5 py-2 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors text-sm">
                        Create Account Now
                      </button>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">VISA</span>
                      </div>
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-bold text-xs">MC</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        + More options available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;