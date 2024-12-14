import React from "react";
import "./frontpage.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function FrontPage() {
  return (
    <>
      <main id="main">
        <header id="header">
          <div className="header">
            <div className="logo">
              <img src="./logo.png" alt="logo" />
            </div>
            <div className="navbar">
              <ul className="menu">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <section id="banner">
          <div className="banner">
            <div className="banner-info">
              <h1>
                Rio Mobiles
                <i
                  className="fa-brands fa-youtube"
                  style={{ color: "bisque" }}
                ></i>
              </h1>
              <div className="rating">
                <p>Master Show Room</p>
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>50 Ratings</p>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda ratione officiis cupiditate corrupti quisquam iure, a
                minima quidem esse soluta sequi accusamus rem laboriosam
                architecto ea aut odit aspernatur aliquid.
              </p>
            </div>
            <div className="course">
              <div className="course-block">
                <h4>Next Course</h4>
                <p>At 5.00 am</p>
              </div>
              <div className="course-block">
                <h4>Next Course</h4>
                <p>At 5.00 am</p>
              </div>
              <div className="course-block">
                <h4>Next Course</h4>
                <p>At 5.00 am</p>
              </div>
            </div>
          </div>
        </section>
        <section id="service">
          <div className="service"></div>
        </section>
        <section id="features">
          <div className="features"></div>
        </section>

        <footer id="footer">
          <div className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <img src="./logo.png" alt="Company Logo" />
              </div>
              <div className="footer-links">
                <a href="#">About Us</a> | <a href="#">Contact</a> |
                <a href="#">Privacy Policy</a>
              </div>
              <div className="footer-social">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <p>&copy; Tharshihan 2024 . All rights reserved.</p>
          </div>
          <br />
          <br />
        </footer>
      </main>
    </>
  );
}

export default FrontPage;
