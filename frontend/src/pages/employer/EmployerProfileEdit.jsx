import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const EmployerProfileEdit = () => {
  const [employer, setEmployer] = useState({
    companyName: "",
    email: "",
    phone: "",
    companyWebsite: "",
    location: "",
    description: "",
  });
  const [companyLogo, setCompanyLogo] = useState(null);
  const navigate = useNavigate();

  const fetchEmployerProfile = async () => {
    try {
      const response = await axiosInstance.get("/employer/profile");
      const employerData = response?.data?.data;
      setEmployer({
        companyName: employerData.companyName || "",
        email: employerData.email || "",
        phone: employerData.phone || "",
        companyWebsite: employerData.companyWebsite || "",
        location: employerData.location || "",
        description: employerData.description || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch employer profile.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", employer.companyName);
    formData.append("email", employer.email);
    formData.append("phone", employer.phone);
    formData.append("companyWebsite", employer.companyWebsite);
    formData.append("location", employer.location);
    formData.append("description", employer.description);

    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }

    try {
      const response = await axiosInstance.put("/employer/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        navigate("/employer/profile");
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    fetchEmployerProfile();
  }, []);

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-4">Edit Employer Profile</h1>
      <input
        type="text"
        value={employer.companyName}
        onChange={(e) =>
          setEmployer({ ...employer, companyName: e.target.value })
        }
        placeholder="Company Name"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="email"
        value={employer.email}
        onChange={(e) => setEmployer({ ...employer, email: e.target.value })}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        value={employer.phone}
        onChange={(e) => setEmployer({ ...employer, phone: e.target.value })}
        placeholder="Phone"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        value={employer.companyWebsite}
        onChange={(e) =>
          setEmployer({ ...employer, companyWebsite: e.target.value })
        }
        placeholder="Company Website"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={employer.location}
        onChange={(e) => setEmployer({ ...employer, location: e.target.value })}
        placeholder="Location"
        className="border p-2 mb-4 w-full"
      />
      <textarea
        value={employer.description}
        onChange={(e) =>
          setEmployer({ ...employer, description: e.target.value })
        }
        placeholder="Company Description"
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-2">Company Logo:</label>
      <input
        type="file"
        onChange={(e) => setCompanyLogo(e.target.files[0])}
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
