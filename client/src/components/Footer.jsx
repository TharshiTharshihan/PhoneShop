import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#f4c760]  text-white pb-4 w-full">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-4">
            <img
              src="/shoe.png"
              alt="Company Logo"
              className="w-20 rounded-2xl"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link
              to="#"
              className="text-white no-underline hover:!text-[#50c1e9] transition-all"
            >
              About Us
            </Link>
            <span>|</span>
            <Link
              to="#"
              className="text-white no-underline hover:!text-[#50c1e9] transition-all"
            >
              Contact
            </Link>
            <span>|</span>
            <Link
              to="#"
              className="text-white no-underline hover:!text-[#50c1e9] transition-all"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl mb-4 !text-white ">
            <Link to="#" className="hover:!text-[#50c1e9] transition-all">
              <i className="fab fa-facebook-f text-white hover:!text-[#50c1e9] "></i>
            </Link>
            <Link to="#" className="hover:!text-[#50c1e9] transition-all">
              <i className="fab fa-twitter text-white hover:!text-[#50c1e9]"></i>
            </Link>
            <Link to="#" className="hover:!text-[#50c1e9] transition-all">
              <i className="fab fa-instagram text-white hover:!text-[#50c1e9]"></i>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs">
          {" "}
          Tharshihan © {new Date().getFullYear()} . All rights reserved.
        </p>
      </div>

      <br />
      <br />
    </footer>
  );
}

export default Footer;
