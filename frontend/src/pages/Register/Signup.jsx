import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", { name, email, password })
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
      <div className=" w-full h-full mt-[-30px] bg-[#f9f9f9] box-border font-sans pt-0">
        <div
          id="box"
          className="w-[320px] mx-auto bg-white border border-[#ededed]"
        >
          <img
            src="https://image.freepik.com/free-icon/refresh_318-33117.jpg"
            alt="lock"
            className="w-[16px] h-auto block mx-auto py-[30px] pb-[20px]"
          />
          <h3 className="uppercase text-center text-[0.9em] text-gray-500 mb-[35px]">
            Please sign in
          </h3>
          <form onSubmit={handleSubmit} className="w-full text-center">
            <input
              type="text"
              placeholder="USERNAME"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              className="inline-block w-[260px] h-[50px] my-[5px] px-[15px] box-border text-[0.8em] border-[1.5px] border-[#cccccc] transition-all ease duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="inline-block w-[260px] h-[50px] my-[5px] px-[15px] box-border text-[0.8em] border-[1.5px] border-[#cccccc] transition-all ease duration-200"
            />
            <input
              type="password"
              name="pswd"
              placeholder="PASSWORD"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="inline-block w-[260px] h-[50px] my-[5px] px-[15px] box-border text-[0.8em] border-[1.5px] border-[#cccccc] transition-all ease duration-200"
            />
            <input
              type="submit"
              value="go on... click me!"
              className="w-[260px] h-[50px] bg-[#015b7e] text-white uppercase text-center mb-[20px] rounded-[3px] cursor-pointer font-semibold text-[0.7em] transition-all ease duration-200 hover:bg-[#014965]"
            />
          </form>

          <div className="signup w-full bg-[#f5f5f5] p-[20px] text-gray-500 uppercase text-center box-border text-[0.8em]">
            <p className="text-[0.8em] text-light-gray">
              A member ?{" "}
              <Link
                to="/login"
                className="text-[#015b7e] text-[1em] pl-[25px] no-underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
