import React from 'react';

const AboutUs = () => {
  return (
    <div className="dark:text-white text-gray-800 mt-5 mb-5 rounded-2xl space-y-5">
      <section className="relative bg-secondary dark:bg-[#261B25] dark:text-white py-32 px-6 text-center  rounded-2xl">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">About ContestHub</h1>
        <p className="md:text-xl max-w-2xl mx-auto">
          Empowering creators and participants to share their talent, compete, and celebrate achievements!
        </p>
      </section>
      <section className="py-20 px-6 max-w-6xl mx-auto rounded-2xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="md:text-lg text-center max-w-3xl mx-auto">
          Our goal is to create a vibrant platform where creativity meets opportunity. 
          We enable users to join exciting contests, showcase skills, and connect with like-minded creators globally.
        </p>
      </section>
      <section className="py-20 px-6 max-w-6xl mx-auto bg-primary rounded-2xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className=" p-8 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="font-bold text-2xl mb-4">Create Contests</h3>
            <p>Contest Creators can easily create new contests with images, tasks, prizes, and deadlines.</p>
          </div>
          <div className=" p-8 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="font-bold text-2xl mb-4">Join & Participate</h3>
            <p>Users can browse contests, pay entry fees, submit tasks, and track their progress.</p>
          </div>
          <div className=" p-8 rounded-2xl shadow hover:scale-105 transition">
            <h3 className="font-bold text-2xl mb-4">Celebrate Winners</h3>
            <p>Creators declare winners, and achievements are showcased to inspire the community.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto bg-secondary dark:bg-[#261B25] mt-2 rounded-2xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">Fun Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-2xl font-bold text-pink-500">120+</h3>
            <p>Contests Created</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-500">500+</h3>
            <p>Active Participants</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-indigo-500">50+</h3>
            <p>Winners Celebrated</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-500">10+</h3>
            <p>Contest Categories</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
