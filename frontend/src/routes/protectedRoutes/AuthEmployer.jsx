import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveEmployer } from "../../redux/features/employerSlice";

const AuthEmployer = () => {
  const dispatch = useDispatch();
  const { isEmployerExist } = useSelector((state) => state.employer);
  const navigate = useNavigate();
  const checkEmployer = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/employer/check-employer",
      });
      dispatch(saveEmployer());
      console.log(response);
    } catch (error) {
      dispatch(checkEmployer());
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    checkEmployer();
  }, []);

  return isEmployerExist ? <Outlet /> : null;
};

export default AuthEmployer;
