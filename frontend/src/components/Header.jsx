import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full  px-20 h-20  bg-base-300">
      <div className="text-xl font-semibold tracking-tight">
        <Link to={"/"}>
          <h1>CAREER CONNECT</h1>
        </Link>
      </div>
      <nav className="flex gap-16 items-center font-semibold">
        <Link to={"/"}>Home</Link>
        <Link to={"/companies"}>Companies</Link>
        <Link to={"/job"}>job</Link>
      </nav>
      <div className="flex items-center  space-x-10">
        <DarkMode />
        <button onClick={() => navigate("/signup")} className="btn btn-neutral">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default Header;
