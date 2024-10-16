import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-300 px-4 lg:px-20 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/companies"}>Companies</Link>
            </li>
            <li>
              <Link to={"/job"}>Jobs</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="text-xl font-semibold tracking-tight">
          CAREER CONNECT
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <nav className="flex gap-16 items-center font-semibold">
          <Link to={"/"}>Home</Link>
          <Link to={"/companies"}>Companies</Link>
          <Link to={"/job"}>Jobs</Link>
        </nav>
      </div>
      <div className="navbar-end flex items-center gap-5 lg:gap-10">
        <DarkMode />
        <button onClick={() => navigate("/signup")} className="btn btn-neutral">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default Header;
