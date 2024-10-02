import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { BookMarked } from "lucide-react";
import { DarkMode } from "../ui/DarkMode";

const UserHeader = () => {
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
        <Link to={"/job"}>Jobs</Link>
      </nav>
      <div className="flex items-center  gap-10">
        <Link to={"user/saved"}>
          <BookMarked />
        </Link>
        <DarkMode />
        <Link to={"/user/profile"}>
          <User />
        </Link>
      </div>
    </div>
  );
};

export default UserHeader;
