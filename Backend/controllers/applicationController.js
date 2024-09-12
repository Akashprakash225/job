const { Application } = require("../models/applicationModel");
const { Job } = require("../models/jobModels");
const { User } = require("../models/userModel");
const { handleImageUpload } = require("../utils/imageUpload");

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    let resumeUrl;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    if (req.file) {
      resumeUrl = await handleImageUpload(req.file.path);
    }

    const newApplication = new Application({
      jobId,
      userId,
      resume: resumeUrl || req.body.resume,
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error applying for the job:", error);
    res.status(500).json({
      message: "Error applying for the job",
      success: false,
      error: error.message,
    });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ userId }).populate("jobId");
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId).populate(
      "jobId"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error });
  }
};

module.exports = {
  applyForJob,
  getUserApplications,
  getApplicationById,
};
