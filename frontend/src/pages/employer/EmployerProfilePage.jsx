import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { useNavigate } from "react-router-dom";

export const EmployerProfilePage = () => {
  const [employer, setEmployer] = useState({});
  const navigate = useNavigate();

  const fetchEmployerProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/employer/profile",
      });
      setEmployer(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployerLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/employer/logout",
      });
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    navigate("/employer/edit");
  };

  useEffect(() => {
    fetchEmployerProfile();
  }, []);

  return (
    <div className="flex justify-between items-start w-full  p-2">
      <div className="left-0 p-6 text-left">
        <h1 className="text-2xl font-bold">
          Welcome, {employer?.companyName}!
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          We're glad to have you here. Let's manage your company profile.
        </p>
      </div>

      <div className="max-w-md ml-auto bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          {employer?.companyName}
        </h1>
        <h1 className="text-lg text-gray-600 mb-2">{employer?.email}</h1>
        <h1 className="text-lg text-gray-600 mb-2">{employer?.phone}</h1>

        {employer?.companyLogo ? (
          <img
            src={employer.companyLogo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 border-2 border-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <button
          onClick={handleEditProfile}
          className="btn btn-outline border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Edit
        </button>
        <br />
        <button
          onClick={handleEmployerLogout}
          className="btn btn-secondary bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition"
        >
          Log-out
        </button>
      </div>
    </div>
  );
};
