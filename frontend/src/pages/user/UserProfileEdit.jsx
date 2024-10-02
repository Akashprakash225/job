import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const UserProfileEdit = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      const userData = response?.data?.data;
      setUser({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        experience: userData.experience || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("experience", user.experience);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      await axiosInstance.put("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        value={user.phone}
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
        placeholder="Phone"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="number"
        value={user.experience}
        onChange={(e) => setUser({ ...user, experience: e.target.value })}
        placeholder="Experience"
        className="border p-2 mb-4 w-full"
        required
      />

      <label className="block mb-2">Profile Picture:</label>
      <input
        type="file"
        onChange={(e) => setProfilePic(e.target.files[0])}
        className="border p-2 mb-4 w-full"
        accept="image/*"
      />

      <button
        type="submit"
        className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Update Profile
      </button>
    </form>
  );
};
