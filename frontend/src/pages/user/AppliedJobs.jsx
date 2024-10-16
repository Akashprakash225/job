import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import toast from "react-hot-toast";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get("/application/applications");
        setApplications(response?.data?.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (applicationId) => {
    console.log("Deleting application with ID:", applicationId);
    try {
      await axiosInstance.delete(`/application/applications/${applicationId}`);
      setApplications(applications.filter((app) => app._id !== applicationId));
      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 pb-10">
      <h2 className="text-3xl font-bold mb-6">Applied Jobs</h2>
      {error && <p className="text-red-500">{error}</p>}
      {applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="flex flex-col border rounded shadow-sm mb-4"
            >
              <img
                src={application.jobId.jobImage}
                alt="Job"
                className="w-full h-40 object-cover"
              />
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold">
                  {application.jobId.title}
                </h3>
                <p>Company: {application.jobId.company}</p>
                <p>Location: {application.jobId.location}</p>
                <p>
                  Resume:{" "}
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download Resume
                  </a>
                </p>
                <button
                  onClick={() => handleDelete(application._id)}
                  className="btn btn-secondary mt-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
