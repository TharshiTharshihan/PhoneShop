import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-md w-full fixed top-0 left-0 bg-white z-50">
      <div className="flex items-center justify-between py-4 px-6">
       <Link to="/" className="flex items-center gap-2">
          <img src="/shoe.png" alt="logo" className="w-14 h-14" />
          <span className="font-bold text-lg !text-amber-600 font-sans">Rio Shoes </span>
        </Link>

        <ul className="hidden md:flex items-center !space-x-6 !text-gray-700 font-medium">
          <li className="text-gray-700  hover:text-amber-500 transition-all duration-200">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-200">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-amber-500 transition-all duration-200">
            <Link to="/services">Services</Link>
          </li>
        </ul>

        <div className="hidden md:flex !space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-amber-500 rounded-lg text-amber-500 font-medium hover:bg-amber-500 hover:text-white transition"
          >
            Login
          </Link>
          {/* <Link
            to="/signup"
            className="px-4 py-2 bg-amber-500 rounded-lg text-white font-medium hover:bg-amber-600 transition"
          >
            Signup
          </Link> */}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-gray-800"
        >
          {open ? <FiX className="text-3xl text-red-600" /> : <FiMenu className="text-3xl text-amber-600"/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-lg">
         <ul className="flex flex-col text-lg font-medium p-4 text-center space-y-4">
  <li>
    <Link className="!text-amber-500 hover:!text-amber-600" to="/">Home</Link>
  </li>
  <li>
    <Link className="!text-amber-500 hover:!text-amber-600" to="/about">About</Link>
  </li>
  <li>
    <Link className="!text-amber-500 hover:!text-amber-600" to="/services">Services</Link>
  </li>

  {/* Center Login Button */}
  <li className="pt-3 flex justify-center items-center">
    <Link
      to="/login"
      className="px-4 py-2 border !border-amber-500 rounded-lg !text-amber-500 font-medium hover:!bg-amber-500 hover:text-white transition"
    >
      Login
    </Link>
  </li>
</ul>

        </div>
      )}
    </header>
  );
};

export default Header;
