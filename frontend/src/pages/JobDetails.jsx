import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/AxiosInstances";
import toast from "react-hot-toast";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const { id } = useParams();

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`/jobs/details/${id}`);
      setJobDetails(response?.data?.data);
      console.log(response, "response========");
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error("Failed to fetch job details.");
    }
  };

  const addToSaved = async () => {
    try {
      const response = await axiosInstance.put("/saved-jobs/add-to-savedjob", {
        jobId: jobDetails._id,
      });
      console.log(response);
      toast.success("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save the job.");
    }
  };

  const applyJob = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    // Note: The jobId is passed via the URL parameter, so no need to include it in formData

    try {
      const response = await axiosInstance.post(
        `/application/jobs/${jobDetails._id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for the job:", error);
      toast.error(
        error.response?.data?.message || "Failed to apply for the job."
      );
    }
  };

  useEffect(() => {
    fetchJobDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Re-fetch if the job ID changes

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Job Details</h1>
      <div className="flex flex-col md:flex-row w-full">
        {/* Job Image Section */}
        <div className="md:w-5/12 mb-6 md:mb-0">
          {jobDetails.jobImage ? (
            <img
              src={jobDetails.jobImage}
              alt="Job"
              className="w-full h-auto rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Job Details Section */}
        <div className="md:w-7/12 md:ml-8">
          <h2 className="text-3xl font-semibold mb-2">{jobDetails.title}</h2>
          <p className="text-xl text-gray-700 mb-4">{jobDetails.company}</p>

          <div className="mb-4">
            <strong>Location:</strong> {jobDetails.location}
          </div>
          <div className="mb-4">
            <strong>Job Type:</strong> {jobDetails.jobType}
          </div>
          <div className="mb-4">
            <strong>Requirements:</strong> {jobDetails.requirements}
          </div>
          <div className="mb-4">
            <strong>Experience Required:</strong>{" "}
            {jobDetails.experienceRequired}
          </div>
          <div className="mb-4">
            <strong>Salary Range:</strong> {jobDetails.salaryRange}
          </div>
          <div className="mb-4">
            <strong>Posted Date:</strong>{" "}
            {new Date(jobDetails.postedDate).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <strong>Application Deadline:</strong>{" "}
            {new Date(jobDetails.applicationDeadline).toLocaleDateString()}
          </div>
          <div className="mb-6">
            <strong>Description:</strong>
            <p className="mt-2">{jobDetails.description}</p>
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <label
              htmlFor="resume"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {resumeFile && (
              <p className="mt-2 text-green-600">
                Selected file: {resumeFile.name}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="btn btn-outline px-4 py-2 rounded"
              onClick={addToSaved}
            >
              Save
            </button>
            <button
              className="btn btn-success px-4 py-2 rounded"
              onClick={applyJob}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
