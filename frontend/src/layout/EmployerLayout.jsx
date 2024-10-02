import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { EmployerHeader } from "../components/employer/EmployerHeader";
import { SideBar } from "../components/employer/SideBar";
import { EmployerFooter } from "../components/employer/EmployerFooter";

export const EmployerLayout = () => {
  const { isEmployerExist } = useSelector((state) => state.employer);

  return (
    <div>
      <EmployerHeader />

      <div className="min-h-96 flex h-full">
        {isEmployerExist && <SideBar />}
        <Outlet />
      </div>
      <EmployerFooter />
    </div>
  );
};
