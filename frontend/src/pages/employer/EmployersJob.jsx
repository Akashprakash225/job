import React, { useEffect, useState } from "react";
import { EmployerJobCard } from "../../components/Cards";
import { axiosInstance } from "../../config/AxiosInstances";

export const EmployersJob = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/employer/jobs");
        if (Array.isArray(response.data.data)) {
          setJobs(response.data.data);
        } else {
          setJobs([]);
          setError("No jobs found.");
        }
      } catch (error) {
        setError("Error fetching jobs. Please try again.");
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axiosInstance.delete(`/jobs/delete/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      setError("Error deleting job. Please try again.");
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Posted Jobs</h1>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {Array.isArray(jobs) && jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <EmployerJobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        !loading && <p>No jobs posted yet.</p>
      )}
    </div>
  );
};
