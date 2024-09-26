import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";

const AuthUser = () => {
  const dispatch = useDispatch();
  const { isUserExist } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(saveUser());
      console.log(response);
    } catch (error) {
      dispatch(checkUser());
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return isUserExist ? <Outlet /> : null;
};

export default AuthUser;
