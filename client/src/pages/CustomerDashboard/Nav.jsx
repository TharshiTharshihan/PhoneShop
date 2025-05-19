import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header id="header">
      <div className="header bg-red sticky top-0 z-10">
        <div className="logo">
          <img src="./smartphone.png" className="w-20 h-20" alt="logo" />
        </div>
        <div className="navbar">
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link to="/services">services</Link>
            </li>
            <li>
              <Link to="/cart"> cart </Link>
            </li>
            <li>
              <Link to="/signup"> Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Nav;
