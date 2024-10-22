import React from 'react';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <div className="w-full bg-black text-white py-10 px-6 flex flex-col md:flex-row justify-between items-center">
      {/* Left Section: Join Our Community */}
      <div className="flex flex-col mb-4 md:mb-0">
        <h2 className="text-3xl font-bold">Join Our Community</h2>
        <p className="mt-2 text-gray-400">
          Be the first to get the latest updates on our promotion campaigns, products and services.
        </p>
      </div>

      {/* Right Section: Email Input */}
      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="w-full md:w-72 bg-transparent border-b border-gray-400 focus:outline-none text-white placeholder-gray-400"
        />
        <button className="text-sm font-semibold border-b border-gray-400 hover:border-white transition">
          Join
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-3 mt-4 md:mt-0 md:ml-6">
        <a href="#" className="hover:opacity-75">
          <FaYoutube className="h-6 w-6 text-white" />
        </a>
        <a href="#" className="hover:opacity-75">
          <FaInstagram className="h-6 w-6 text-white" />
        </a>
      </div>
    </div>
  );
};

export default Newsletter;
