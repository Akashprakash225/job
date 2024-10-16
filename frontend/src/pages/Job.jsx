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
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   ">
        {data.map((value) => (
          <JobCards job={value} key={value?._id} />
        ))}
      </div>
    </div>
  );
};

export default Job;
