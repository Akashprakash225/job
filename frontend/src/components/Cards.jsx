import React from "react";
import { Link } from "react-router-dom";

const JobCards = ({ job }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={job?.companyLogo} alt="Job" />
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
  );
};

export default JobCards;
