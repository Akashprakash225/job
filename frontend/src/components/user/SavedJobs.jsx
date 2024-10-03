import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/AxiosInstances";
import { SavedCards } from "../Cards";

export const SavedJobs = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedItems = async () => {
    try {
      const response = await axiosInstance.get("/saved-jobs");
      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        const jobs = response.data.data
          .map((item) => {
            if (item.job && Array.isArray(item.job) && item.job.length > 0) {
              return item.job[0];
            }
            console.warn("Invalid job item structure:", item);
            return null;
          })
          .filter((job) => job !== null);
        setSavedItems(jobs);
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setSavedItems([]);
      }
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching saved jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const refreshSavedJobs = () => {
    fetchSavedItems();
  };

  if (loading) {
    return <p>Loading saved jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">My Saved Jobs</h2>
      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedItems.map((value) =>
            value && value._id ? (
              <SavedCards
                items={value}
                key={value._id}
                refreshSavedJobs={refreshSavedJobs}
              />
            ) : null
          )}
        </div>
      ) : (
        <p>No saved jobs found.</p>
      )}
    </div>
  );
};

export default SavedJobs;
