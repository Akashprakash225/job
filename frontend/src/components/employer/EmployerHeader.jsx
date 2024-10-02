import React from "react";
import { DarkMode } from "../ui/DarkMode";
import { Link } from "react-router-dom";
export const EmployerHeader = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-none"></div>
      <div className="flex-1">
        <Link to={"/"}>
          <h1>CAREER CONNECT</h1>
        </Link>
      </div>
      <div>
        <DarkMode />
      </div>
    </div>
  );
};
