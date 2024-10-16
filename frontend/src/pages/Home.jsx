import React from "react";
import Search from "../components/Search";
import JobCards from "../components/Cards";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/AxiosInstances";

const Home = () => {
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
  const handleSearchResults = (searchData) => {
    setData(searchData);
  };

  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <div className="">
      <main className="min-h-96">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl py-8 font-bold ml-5 mr-2">
            Discover your perfect career today
          </h1>
        </div>
        <div className="mb-5 ml-5 mr-5">
          <Search onSearch={handleSearchResults} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((value) => (
            <JobCards job={value} key={value?._id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
