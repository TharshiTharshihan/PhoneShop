import React from "react";
import "./frontpage.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Services from "../Services.jsx";
import shoe from "../../assets/shoe.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../../components/Footer"
function FrontPage() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <>
      <>
        <Header />
        <div className="bg-white font-sans">
          <section className="bg-opacity-30 py-2 sm:py-16 lg:py-10">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className=" w-full grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div
                  className="w-auto  text-center md:text-start md:w-3/4 "
                  data-aos="fade-left"
                >
                  <p className="text-base font-semibold tracking-wider text-gray-600 uppercase">
                    Step Into Ultimate Comfort
                  </p>
                  <h1 className="mt-4 text-lg font-bold ! bg-gradient-to-r from-slate-600 to-red-800 bg-clip-text text-transparent lg:mt-8 sm:text-6xl xl:text-6xl">
                    Stylish Footwear,
                    <br /> Designed for Every Step!
                  </h1>
                  <p className="mt-4 text-base font-lavish text-black lg:mt-8 sm:text-lg">
                    Discover premium shoes made with comfort, style, and
                    durability in mind. From sporty sneakers and elegant heels
                    to casual sandals and office classics — find the perfect
                    pair that fits your personality.
                  </p>

                  <Link
                    href="/shops"
                    title=""
                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400 no-underline hover:no-underline"
                    role="button"
                  >
                    Explore Our Shoe Collection{" "}
                    <svg
                      className="w-6 h-6 ml-8 -mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </Link>

                  <p className="mt-5 text-gray-600">Ready to walk in style?</p>
                </div>

                <div
                  className="w-full"
                  data-aos="fade-right"
                  data-aos-delay="5000"
                >
                  <img className="h-auto " src={shoe} alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
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

        <Footer/>
      </>
    </>
  );
}

export default FrontPage;
