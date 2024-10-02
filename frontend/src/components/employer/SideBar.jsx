import React from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="min-h-full">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className=""
      ></label>
      <ul className=" menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li>
          <Link to={"/employer/profile"}>Profile</Link>
        </li>
        <li>
          <Link to={"/employer/job"}>Jobs</Link>
        </li>
        <li>
          <Link to={"/employer/new-job"}>Create Job</Link>
        </li>
      </ul>
    </div>
  );
};
