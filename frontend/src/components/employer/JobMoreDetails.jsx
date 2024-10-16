import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/AxiosInstances";

export const JobMoreDetails = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axiosInstance.get(
          `/application/application/${jobId}/applicants`
        );
        setApplicants(response.data.applicants);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-6 pl-12">
      <h1 className="text-2xl font-bold">Applicants for Job ID: {jobId}</h1>
      {applicants.length > 0 ? (
        <ul className="mt-4">
          {applicants.map((applicant, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>{applicant.name}</span>
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View Resume
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applicants for this job yet.</p>
      )}
    </div>
  );
};
