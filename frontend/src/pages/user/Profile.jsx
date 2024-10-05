import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/user/profile",
      });
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "/user/logout",
      });
      toast.success("Logout Sucessfull");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.success("Logout Failed");
    }
  };

  const handleEdit = () => {
    navigate("/user/edit");
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <div className="left-0 p-6 text-left">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-lg text-gray-700 mt-2">
          We're glad to have you here. Let's get started on your journey.
        </p>
      </div>

      <div className="max-w-md ml-auto bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          {user?.name}
        </h1>
        <h1 className="text-lg text-gray-600 mb-2">{user?.email}</h1>
        <h1 className="text-lg text-gray-600 mb-2">{user?.phone}</h1>
        <h1 className="text-lg text-blue-600 mb-4">{user?.resume}</h1>

        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 border-2 border-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <button
          onClick={handleEdit}
          className="btn btn-outline border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition"
        >
          Edit
        </button>
        <br />
        <button
          onClick={handleLogout}
          className="btn btn-secondary bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-gray-600 transition"
        >
          Log-out
        </button>
      </div>
    </div>
  );
};
