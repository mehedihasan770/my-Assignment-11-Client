import { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

const Guidelines = () => {


  const guidelines = [
    "All participants must have a registered account on ContestHub.",
    "Ensure your profile information is accurate before joining contests.",
    "Payment must be completed to register for a contest.",
    "Respect deadlines. Late submissions will not be considered.",
    "Each user can participate only once per contest unless specified otherwise."
  ];

  useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
        });
      }, [])

  return (
    <section className="w-full">
       <h2 className="text-2xl md:text-3xl font-bold mt-20 mb-5 bg-primary text-center text-white border-2 border-primary py-2 rounded-2xl">Guidelines</h2>
        <div className="space-y-4">
          {guidelines.map((faq, i) => (
            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" key={i} className="border border-gray-200 rounded-md">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium">{faq}</span>
              </button>
            </div>
          ))}
        </div>
        <Link to={'/guidelines'} className='btn bg-primary text-white font-bold rounded-2xl mt-5'>More Guidelines</Link>
    </section>
  );
};

export default Guidelines;
