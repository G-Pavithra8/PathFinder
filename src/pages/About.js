import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const About = () => {
  const navigate = useNavigate(); // Create a navigate function

  const handleStartJourney = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/about-bg.jpg')" }} // Use a suitable background image
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold text-purple-600 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to PathFinder, your one-stop solution for exploring colleges and universities across the country. Our platform is designed specifically for students seeking higher education opportunities that align with their aspirations and career paths.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          At PathFinder, we understand that choosing the right college is a significant decision. It shapes your future, and we are here to simplify that process for you. Our mission is to provide you with comprehensive resources, information, and guidance that empower you to make informed decisions.
        </p>
        <h3 className="text-2xl font-semibold text-purple-600 mb-2">What We Offer:</h3>
        <ul className="list-disc list-inside mb-4 text-left mx-auto">
          <li className="mb-2">✔ Extensive College Listings</li>
          <li className="mb-2">✔ Student Reviews and Ratings</li>
          <li className="mb-2">✔ Personalized College Recommendations</li>
          <li className="mb-2">✔ Expert Guidance from Education Advisors</li>
          <li>✔ Resources for Financial Aid and Scholarships</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          Join us on this journey to discover your educational path and reach your academic goals. Whether you’re looking to enhance your skills or explore new opportunities, PathFinder is here to guide you every step of the way.
        </p>
        <button
          className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg"
          onClick={handleStartJourney} // On click, navigate to the login page
        >
          Start Your Journey
        </button>
      </div>
    </section>
  );
};

export default About;