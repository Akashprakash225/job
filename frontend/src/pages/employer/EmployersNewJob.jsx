import React, { useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";

export function EmployersNewJob() {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [data, setData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    requirements: "",
    experienceRequired: "",
    salaryRange: "",
    applicationDeadline: "",
    description: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("jobImage", image.data);
      formData.append("title", data.title);
      formData.append("company", data.company);
      formData.append("location", data.location);
      formData.append("jobType", data.jobType);
      formData.append("requirements", data.requirements);
      formData.append("experienceRequired", data.experienceRequired);
      formData.append("salaryRange", data.salaryRange);
      formData.append("applicationDeadline", data.applicationDeadline);
      formData.append("description", data.description);

      const response = await axiosInstance({
        url: "/jobs/create",
        method: "POST",
        data: formData,
      });
      if (response) {
        setStatus(response.statusText);
        setError(null);

        setData({
          title: "",
          company: "",
          location: "",
          jobType: "",
          requirements: "",
          experienceRequired: "",
          salaryRange: "",
          applicationDeadline: "",
          description: "",
        });
        setImage({ preview: "", data: "" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleInput = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Upload New Job</h1>
      {image.preview && (
        <img src={image.preview} alt="Job Preview" className="w-32 h-32 mb-4" />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {[
          { name: "title", placeholder: "Job Title" },
          { name: "company", placeholder: "Company" },
          { name: "location", placeholder: "Location" },
          { name: "requirements", placeholder: "Requirements" },
          { name: "experienceRequired", placeholder: "Experience Required" },
          { name: "salaryRange", placeholder: "Salary Range" },
        ].map((input) => (
          <div key={input.name}>
            <label className="block text-sm font-medium text-gray-700">
              {input.placeholder}
            </label>
            <input
              type="text"
              name={input.name}
              value={data[input.name]}
              onChange={handleInput}
              placeholder={input.placeholder}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            value={data.jobType}
            onChange={handleInput}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            name="applicationDeadline"
            value={data.applicationDeadline}
            onChange={handleInput}
            className="mt-1 p-2 border rounded-md w-full"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInput}
            placeholder="Job Description"
            className="mt-1 p-2 border rounded-md w-full"
            rows="3"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {status && (
        <h4 className="text-green-600 font-bold mt-4">Status: {status}</h4>
      )}
      {error && <h4 className="text-red-600 font-bold mt-4">{error}</h4>}
    </div>
  );
}
