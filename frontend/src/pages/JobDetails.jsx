import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../config/AxiosInstances";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({});
  const { id } = useParams();
  console.log(id);
  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/jobs/details/${id}`,
      });
      setJobDetails(response?.data?.data);
      console.log(response, "response========");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);
  return (
    <div>
      <h1>Job Details Page</h1>
      <div className="flex w-full">
        <div className="w-5/12">
          <img src={jobDetails.companyLogo} alt="image" />
        </div>
        <div className="w-8/12 my-10">
          <h1 className="text-3xl">{jobDetails?.title}</h1>
          <h1>{jobDetails?.company}</h1>
          <h1>{jobDetails?.location}</h1>
          <h1>{jobDetails?.jobType}</h1>
          <h1>{jobDetails?.requirements}</h1>
          <h1>{jobDetails?.experienceRequired}</h1>
          <h1>{jobDetails?.salaryRange}</h1>
          <h1>{jobDetails?.postedDate}</h1>
          <h1>{jobDetails?.applicationDeadline}</h1>
          <h1>{jobDetails?.description}</h1>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
