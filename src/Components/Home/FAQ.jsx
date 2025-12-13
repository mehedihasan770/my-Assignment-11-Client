import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the Sign Up button, fill in the required details, and submit the form."
    },
    {
      question: "How can I make a payment?",
      answer: "You can pay using Credit/Debit cards or digital wallets like Bkash/Nagad."
    },
    {
      question: "Where can I check my contest or order status?",
      answer: "After logging in to the dashboard, check 'My Contests' or 'My Orders' section."
    }
  ];

  const [openFAQ, setOpenFAQ] = useState(null);
  const handleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
        });
      }, [])

  return (
    <div>
    <h2 className="text-2xl md:text-3xl font-bold mt-20 mb-5 bg-primary text-center text-white border-2 border-primary py-2 rounded-2xl">Frequently Asked Questions</h2> 
      <div className="mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" key={i} className="border border-gray-200 rounded-md">
              <button
                onClick={() => handleFAQ(i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="cursor-pointer">{openFAQ === i ? "−" : "+"}</span>
              </button>
              {openFAQ === i && (
                <div className="px-6 pb-4 text-gray-500">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;