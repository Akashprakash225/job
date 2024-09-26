const { SavedJob } = require("../models/savedJobsModel");
const { Job } = require("../models/jobModels");
const { User } = require("../models/userModel");

const addToSavedJob = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const existingSavedJob = await SavedJob.findOne({
      jobSeeker: userId,
      job: jobId,
    });
    if (existingSavedJob) {
      return res
        .status(400)
        .json({ success: false, message: "Job already saved" });
    }

    const savedJob = new SavedJob({
      jobSeeker: userId,
      job: jobId,
    });

    await savedJob.save();

    return res.status(200).json({
      success: true,
      message: "Job saved successfully",
      data: savedJob,
    });
  } catch (error) {
    return next(error);
  }
};

const getSavedJobs = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const savedJobs = await SavedJob.find({ jobSeeker: userId }).populate(
      "job"
    );

    if (!savedJobs.length) {
      return res
        .status(404)
        .json({ success: false, message: "No saved jobs found" });
    }

    return res.status(200).json({
      success: true,
      message: "Saved jobs retrieved successfully",
      data: savedJobs,
    });
  } catch (error) {
    return next(error);
  }
};

const removeSavedJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    const savedJob = await SavedJob.findOneAndDelete({
      jobSeeker: userId,
      job: jobId,
    });

    if (!savedJob) {
      return res
        .status(404)
        .json({ success: false, message: "Saved job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Saved job removed successfully",
      data: savedJob,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addToSavedJob, getSavedJobs, removeSavedJob };
