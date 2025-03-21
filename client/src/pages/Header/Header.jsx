import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <div className="header bg-red">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
        </div>
        <div className="navbar">
          <ul className="menu">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
            <li>
              <Link href="#">services</Link>
            </li>
            <li>
              <Link to="/login"> Login</Link>
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

export default Header;
