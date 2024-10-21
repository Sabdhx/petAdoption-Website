import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the menu on small screens

  const 
  toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-gray-100 text-2xl font-extrabold tracking-wide hover:text-indigo-400 transition-colors duration-300"
        >
          Pet Adoption
        </Link>
        {/* Hamburger menu for small screens */}
        <FiAlignJustify
          onClick={toggleMenu}
          className="text-gray-100 text-2xl md:hidden focus:outline-none"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i> {/* Font Awesome icons */}
        </FiAlignJustify>
        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/pets"
            className="text-gray-200 border-b-2 border-t-2 border-transparent hover:border-indigo-400 hover:text-indigo-400 px-3 py-2 rounded-lg transition-all duration-300"
          >
            Available Pets
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-200 border-b-2 border-t-2 border-transparent hover:border-indigo-400 hover:text-indigo-400 px-3 py-2 rounded-lg transition-all duration-300"
          >
            Add a pet
          </Link>
          <Link
            to="/admin"
            className="text-gray-200 border-b-2 border-t-2 border-transparent hover:border-indigo-400 hover:text-indigo-400 px-3 py-2 rounded-lg transition-all duration-300"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/login"
            className="text-gray-200 border-b-2 border-t-2 border-transparent hover:border-indigo-400 hover:text-indigo-400 px-3 py-2 rounded-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-200 border-b-2 border-t-2 border-transparent hover:border-indigo-400 hover:text-indigo-400 px-3 py-2 rounded-lg transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>
      {/* Dropdown menu for small screens */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link
            to="/pets"
            className="block text-gray-200 py-2 px-4 border-b border-gray-700 hover:bg-gray-700 hover:text-indigo-400 transition duration-300"
            onClick={toggleMenu}
          >
            Available Pets
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-200 py-2 px-4 border-b border-gray-700 hover:bg-gray-700 hover:text-indigo-400 transition duration-300"
            onClick={toggleMenu}
          >
            Add a pet
          </Link>
          <Link
            to="/admin"
            className="block text-gray-200 py-2 px-4 border-b border-gray-700 hover:bg-gray-700 hover:text-indigo-400 transition duration-300"
            onClick={toggleMenu}
          >
            Admin Dashboard
          </Link>
          <Link
            to="/login"
            className="block text-gray-200 py-2 px-4 border-b border-gray-700 hover:bg-gray-700 hover:text-indigo-400 transition duration-300"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-gray-200 py-2 px-4 hover:bg-gray-700 hover:text-indigo-400 transition duration-300"
            onClick={toggleMenu}
          >
            Register
          </Link>
          {
  user === null ? (
    <button>logout</button>
  ) : (
    <>
      {/* Other content when user is not null */}
    </>
  )
}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
