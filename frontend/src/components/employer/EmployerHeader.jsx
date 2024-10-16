import React from "react";
import { DarkMode } from "../ui/DarkMode";
import { Link } from "react-router-dom";

export const EmployerHeader = () => {
  return (
    <div className="navbar bg-base-300 px-4 lg:px-10 h-20">
      <div className="flex items-center flex-1">
        <label htmlFor="my-drawer" className="btn btn-ghost " tabIndex={0}>
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
        </label>
        <div className="flex-1">
          <Link
            to={"/employer/profile"}
            className="text-xl font-semibold tracking-tight"
          >
            CAREER CONNECT
          </Link>
        </div>
      </div>
      <div className="navbar-end flex items-center">
        <DarkMode />
      </div>
    </div>
  );
};
