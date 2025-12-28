import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../Header/Header.jsx";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/signup`, { name, email, password })
      .then(() => {
        Swal.fire(
          "Congratulations! You Have Successfully Registered with Us 😊",
          "",
          "success"
        );
        navigate("/login");
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred. Please try again. 😔",
        })
      );
  };

  return (
    <>
     

      <section className="relative py-12 bg-black sm:py-16 lg:py-12 ">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="object-cover object-bottom w-full h-full transform rotate-0 opacity-50"
            src="https://cdn.rareblocks.xyz/collection/clarity/images/features/6/background-pattern.png"
            alt=""
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto mt-10 lg:max-w-xl">
            <div className="absolute inset-x-1.5 top-8 -inset-y-4">
              <div
                className="w-full h-full mx-auto rotate-180 rounded-3xl opacity-90 blur-xl filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                }}
              ></div>
            </div>

            <div className="relative overflow-hidden bg-gray-100 rounded-2xl lg:rounded-3xl">
              <div className="px-6 py-7 sm:px-12 sm:py-10">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 font-pj sm:text-4xl xl:text-5xl">
                    Welcome to Rio Shoes!
                  </h1>
                  <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                    Sign in to access your account and explore new opportunities
                  </p>

                  <a
                    href="#"
                    title=""
                    className="text-decoration-none flex items-center justify-center w-full px-8 py-4 mt-12 text-base font-bold  !text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 font-pj"
                    role="button"
                  >
                    <svg
                      className="w-5 h-5 mr-4"
                      viewBox="0 0 533.5 544.3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.4H272.1v95.3h146.9c-6.3 33.9-25 62.5-53.2 81.5v67.4h85.9c50.3-46.4 81.8-114.8 81.8-193.8z"
                        fill="#4285F4"
                      />
                      <path
                        d="M272.1 544.3c72.6 0 133.6-24 178.1-65.3l-85.9-67.4c-23.9 16-54.4 25.5-92.2 25.5-70.9 0-131-47.9-152.4-112.1H31.1v70.3c44.8 88.4 136.5 149 241 149z"
                        fill="#34A853"
                      />
                      <path
                        d="M119.7 324.9c-10.2-30.3-10.2-62.7 0-93L31.1 161.6C-10.4 243.4-10.4 355.9 31.1 437.7l88.6-68.1z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M272.1 107.7c39.5 0 75.1 13.6 103.2 40.2l77.4-77.4C405.7 25.5 344.7 0 272.1 0 167.6 0 75.9 60.6 31.1 149l88.6 70.3c21.5-64.2 81.6-111.6 152.4-111.6z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </a>

                  <p className="mt-8 text-sm font-normal text-center text-gray-600">
                    or sign in with email
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                  {/* Optional: Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900 font-pj"
                    >
                      Name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="name"
                        required
                        id="name"
                        placeholder="Your name"
                        className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900 font-pj"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col">
                    {/* Label + Forgot password */}
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-base font-medium !text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    {/* Input + Eye button */}
                    <div className="mt-2.5 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="*******"
                        className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                      />

                      {/* Eye Icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-900"
                      >
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent  !rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                  >
                    Sign Up
                  </button>
                </form>

                <svg
                  className="w-auto h-4 mx-auto mt-8 text-gray-300"
                  viewBox="0 0 172 16"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Optional decorative lines */}
                </svg>

                <p className="mt-5 text-base font-normal text-center text-gray-900 font-pj">
                  have an account?{" "}
                  <a
                    href="/login"
                    title=""
                    className="text-decoration-none font-bold rounded focus:outline-none focus:ring-1 focus:ring-gray-900  focus:ring-offset-2"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
