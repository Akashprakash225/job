import React from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/AxiosInstances";
import toast from "react-hot-toast";

const JobCards = ({ job }) => {
  return (
    <div className="py-6 pl-12">
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
    <div className="flex w-full h-40 items-center gap-20 mb-10">
      <img
        src={items.jobImage}
        alt="image"
        className="w-full h-40 object-cover"
      />
      <div>
        <h2>{items.title}</h2>
        <h3>
          {items.company} - {items.location}
        </h3>
      </div>
      <button className="btn btn-secondary" onClick={handleRemoveJob}>
        Remove
      </button>
    </div>
  );
};
export const CompanyCards = ({ employer }) => {
  if (!employer) return null;

  return (
    <div className="py-6 pl-12">
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
