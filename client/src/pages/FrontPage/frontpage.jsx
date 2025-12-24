import React from "react";
import "./frontpage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Services from "../Services.jsx";

function FrontPage() {
  return (
    <>
      <>
        <Header />
        <section id="banner">
          <div className="banner">
            <div className="banner-info">
              <h1>
                Rio Mobiles
                <i className="bi bi-phone" style={{ color: "blue" }}></i>
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
                At Rio Mobiles, we bring you the latest smartphones with
                cutting-edge technology, exceptional quality, and unbeatable
                prices. As a trusted master showroom, we ensure a seamless
                shopping experience with expert guidance and customer
                satisfaction at the heart of everything we do. Whether you`re
                looking for flagship models, budget-friendly options, or premium
                accessories, our wide range of products caters to every need.
                Visit us today and experience innovation like never before!
              </p>
            </div>
            <div className="course">
              <div className="course-block">
                <h4>Kalmunai</h4>
                <p>opens at 8.00 am</p>
              </div>
              <div className="course-block">
                <h4>Galle</h4>
                <p>opens at 8.00 am</p>
              </div>
              <div className="course-block">
                <h4>Colombo</h4>
                <p>opens at 9.00 am</p>
              </div>
            </div>
            {/* <div className="GetStart">Get Start</div> */}
          </div>
        </section>
        {/* newly added */}
        {/* <div>
          <div className=" absolute w-full h-[500px]">
            <iframe
              src="https://my.spline.design/claritystream-a72K0KUwFoZV82QBzvu52Kai/"
              className="w-full h-full border-0"
            ></iframe>
          </div>

          <div className="relative h-full z-10">
            <div className="container mx-auto px-6 pt-16 md:pt-24">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light  dark:text-white text-white tracking-tighter mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Build faster
                  </span>{" "}
                  with stunning templates
                </h1>
                <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl font-light tracking-wide">
                  Explore free &amp; premium website templates, UI components,
                  and web tools to launch your next project in style — only on
                  TemplateSee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button className="bg-white text-black font-light rounded-md px-8 py-3 hover:bg-opacity-90 transition-all">
                    Browse Models
                  </button>
                  <a
                    href="#"
                    className="flex items-center text-gray-300 hover:text-white transition-colors py-3 px-2 group"
                  >
                    View Demos
                    <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <footer id="footer">
          <div className="footer">
            <div className="footer-content">
              <div className="footer-logo">
                <img
                  src="./smartphone.png"
                  className="w-14 h-22 rounded-2xl "
                  alt="Company Logo"
                />
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
      </>
    </>
  );
}

export default FrontPage;
