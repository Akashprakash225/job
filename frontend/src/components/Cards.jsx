import React from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/AxiosInstances";
import toast from "react-hot-toast";

const JobCards = ({ job }) => {
  return (
    <div className="py-6 pl-8">
      <div className="card card-compact bg-base-100 w-80 shadow-xl  ">
        <figure>
          <img
            src={job?.jobImage}
            alt="Job"
            className="w-full h-36 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{job?.title}</h2>
          <p>{job?.company}</p>
          <p>{job?.requirements}</p>

          <div className="card-actions justify-end">
            <Link to={`/job-details/${job?._id}`}>
              <button className="btn btn-primary">More Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobCards;

export const SavedCards = ({ items, refreshSavedJobs }) => {
  const handleRemoveJob = async () => {
    try {
      await axiosInstance.delete(`/saved-jobs/remove-savedjob/${items._id}`);
      refreshSavedJobs();
      toast.success("Job removed successfully!");
    } catch (error) {
      console.error("Error removing job:", error);
      toast.error("Failed to remove job. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-40 items-center gap-6 mb-10 ">
      <img
        src={items.jobImage}
        alt="image"
        className="w-full h-40 object-cover md:w-1/3"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{items.title}</h2>
        <h3 className="text-md">
          {items.company} - {items.location}
        </h3>
      </div>
      <button
        className="btn btn-secondary mt-4 md:mt-0"
        onClick={handleRemoveJob}
      >
        Remove
      </button>
    </div>
  );
};
export const CompanyCards = ({ employer }) => {
  if (!employer) return null;

  return (
    <div className="py-6 pl-6">
      <div className="card card-compact bg-base-100 w-80 shadow-xl  ">
        <figure>
          <img
            src={employer.companyLogo || "default-logo-url.png"}
            alt={`${employer.companyName || "Company"} Logo`}
            className="w-full h-36 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {employer.companyName || "Unknown Company"}
          </h2>
          <p>{employer.companyWebsite || "No website available"}</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">More Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const EmployerJobCard = ({ job, onDelete }) => {
  const handleDelete = () => {
    onDelete(job._id);
  };

  return (
    <div className="py-6 pl-2">
      <div className="bg-base-100 w-80 shadow-xl">
        <figure>
          {job.jobImage && (
            <img
              src={job.jobImage}
              alt={`${job.title} logo`}
              className="w-full h-36 object-cover"
            />
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{job.title}</h2>
          <p>{job.companyName}</p>
          <p>{job.requirements.join(", ")}</p>
          <div className="card-actions flex justify-between">
            <Link to={`/employer/more-details/${job._id}`}>
              <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                More Details
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="btn ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
