import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/AxiosInstances";
import { CompanyCards } from "../components/Cards";

const Companies = () => {
  const [data, setData] = useState([]);
  const fetchCompany = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/employer/companyList",
      });
      setData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-3   ">
        {data.map((value) => (
          <CompanyCards employer={value} key={value?._id} />
        ))}
      </div>
    </div>
  );
};
export default Companies;
