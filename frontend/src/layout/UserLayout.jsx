import React, { useState } from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/user/userHeader";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const UserLayout = () => {
  const { isUserExist } = useSelector((state) => state.user);

  return (
    <div>
      {isUserExist ? <UserHeader /> : <Header />}

      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default UserLayout;
