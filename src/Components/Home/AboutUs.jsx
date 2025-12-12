import { Link } from "react-router";

const AboutUs = () => {
  return (
    <section className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mt-20 mb-5 bg-primary text-center text-white border-2 border-primary py-2 rounded-2xl">About Us</h2>
      <div className="max-w-5xl mx-auto text-justify">
        <p className="text-gray-500 text-lg mb-6">
         Welcome to our website! We are passionate about delivering high-quality services and solutions to our users. Our goal is to provide a seamless experience with innovative ideas and user-friendly design.
        </p>
        <p className="text-gray-500 text-lg mb-6">
          Our team consists of skilled developers, designers, and content creators who work together to bring the best results for our clients. We value transparency, creativity, and continuous improvement in everything we do.
        </p>
        <p className="text-gray-500 text-lg">
          Whether you are here to explore our services or participate in our contests, we strive to make your experience smooth and enjoyable. Thank you for visiting!
        </p>
      </div>
      <Link to={'/about-us'} className='btn bg-primary text-white font-bold rounded-2xl mt-5'>More About</Link>
    </section>
  );
};

export default AboutUs;