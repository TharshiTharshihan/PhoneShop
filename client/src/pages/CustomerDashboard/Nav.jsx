import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";


const Nav = () => {
  const { currentUser } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cart);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header  className="sticky top-0 z-20 bg-gray-300  shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="logo flex items-center gap-2">
          <img
            src="/shoe.png"
            className="w-14 h-14 rounded-4xl"
            alt="logo"
          />
          <span className="text-xl font-bold text-amber-600">Rio Shoes</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex gap-6 items-center  font-medium">
            <li>

              {
                currentUser ? <Link
                to="/customer"
                style={{ textDecoration: "none" , color:"blue"}}
                className="  hover:text-yellow-200 transition no-underline"
              >
                Home
              </Link> : <Link
                to="/"
                style={{ textDecoration: "none" , color:"blue"}}
                className="  hover:text-yellow-200 transition no-underline"
              >
                Home
              </Link>
              }
              
            </li>
            <li>
              <Link
                to="/about"
                style={{ textDecoration: "none", color:"blue" }}
                className="hover:text-yellow-200 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                style={{ textDecoration: "none", color:"blue" }}
                className="hover:text-yellow-200 transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color:"blue" }}
                className="hover:text-yellow-200 transition flex items-center gap-1"
              >
                Cart
                <span className="bg-amber-300 rounded-full text-black font-bold px-2 py-0.5 text-sm">
                  {cartItems.length}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                style={{ textDecoration: "none", color:"black" }}
                className="hover:text-yellow-200 transition bg-white rounded-full px-3 py-1"
              >
                {currentUser ? currentUser.name : "Signup"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-200 shadow-inner text-center">
          <ul className="flex flex-col gap-4 p-4 text-white font-medium ">
            <li>
              <Link
                to="/customer"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" }}
                className="text-gray-700 no-underline hover:underline hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" }}
                className="text-gray-700 no-underline hover:underline hover:text-blue-600"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" }}
                className="text-gray-700 no-underline hover:underline hover:text-blue-600"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" }}
                className=" items-center gap-1 "
              >
                Cart
                <span className="bg-amber-300 rounded-full text-black font-bold px-2 py-0.5 text-sm">
                  {cartItems.length}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none" , color:"black" }}
                className="text-gray-700 no-underline hover:underline hover:text-blue-600 bg-white rounded-full px-3 py-1"
              >
                {currentUser ? currentUser.name : "Signup"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Nav;
