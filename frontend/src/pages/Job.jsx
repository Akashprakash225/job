import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/AxiosInstances";
import JobCards from "../components/Cards";

const Job = () => {
  const [data, setData] = useState([]);
  const fetchJob = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/jobs/jobList",
      });
      setData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <div>
      <h1>Job List</h1>
      <div className=" grid grid-cols-3   ">
        {data.map((value) => (
          <JobCards job={value} key={value?._id} />
        ))}
      </div>
    </div>
  );
};

export default Job;
