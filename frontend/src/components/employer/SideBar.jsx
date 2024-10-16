import React from "react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className=" ">
      {/* Drawer Toggle Input */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="">
        {/* This is where the page content goes */}
        {/* The content will occupy full space unless drawer is opened */}
      </div>

      {/* Sidebar (Drawer-side) */}
      <div className="drawer-side">
        {/* Overlay for smaller screens when drawer is open */}
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        {/* Sidebar Menu */}
        <ul className="menu p-4 w-50 h-full bg-base-200 text-base-content">
          <li>
            <Link to="/employer/profile">Profile</Link>
          </li>
          <li>
            <Link to="/employer/job">Jobs</Link>
          </li>
          <li>
            <Link to="/employer/new-job">Create Job</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
