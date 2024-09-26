import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { useNavigate } from "react-router-dom";

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
      const response = await axiosInstance({
        method: "Post",
        url: "/user/logout",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.phone}</h1>
      <h1>{user?.resume}</h1>
      <img src={user?.profilePic} alt="profile picture" />
      <button className="btn btn-outline">Edit</button>
      <br />
      <button onClick={handleLogout} className="btn btn-secondary">
        Log-out
      </button>
    </div>
  );
};
