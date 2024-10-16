const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { Job } = require("../models/jobModels");
const { handleImageUpload } = require("../utils/imageUpload");

const createJob = async (req, res, next) => {
  try {
    const user = req.user;
    const {
      title,
      company,
      location,
      jobType,
      requirements,
      experienceRequired,
      salaryRange,
      applicationDeadline,
      description,
    } = req.body;
    let jobImageUrl;
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !requirements ||
      !experienceRequired ||
      !salaryRange ||
      !applicationDeadline ||
      !description
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (req.file) {
      jobImageUrl = await handleImageUpload(req.file.path);
    }

    const newJob = new Job({
      title,
      company,
      location,
      jobType,
      requirements,
      experienceRequired,
      salaryRange,
      applicationDeadline,
      description,
      jobImage: jobImageUrl && jobImageUrl,
    });
    if (user.role === "employer") newJob.employer = user.id;
    await newJob.save();
    return res.status(200).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    return next(error);
  }
};
const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const {
      title,
      company,
      location,
      jobType,
      requirements,
      experienceRequired,
      salaryRange,
      applicationDeadline,
      description,
      jobImage,
    } = req.body;
    let imageUrl;
    const isJobExist = await Job.findOne({ _id: jobId });
    if (!isJobExist) {
      return res.status(400).json({ message: "Job does not exist" });
    }
    if (req.file) {
      imageUrl = await handleImageUpload(req.file.path);
    }
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      {
        title,
        company,
        location,
        jobType,
        requirements,
        experienceRequired,
        salaryRange,
        applicationDeadline,
        jobImage,
        description,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    return next(error);
  }
};
const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const deletedjob = await Job.findByIdAndDelete({ _id: jobId });
    if (!deletedjob)
      res.status(400).json({ success: true, message: "job already deleted" });
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: deletedjob,
    });
  } catch (error) {
    return next(error);
  }
};
const JobList = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("employer", "name");
    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    return next(error);
  }
};
const JobDetails = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const jobDetail = await Job.findById(jobId).populate("employer");
    res
      .status(200)
      .json({ success: true, message: "job fetched", data: jobDetail });
  } catch (error) {
    return next(error);
  }
};

const searchJobsByTitle = async (req, res, next) => {
  const { title } = req.query;

  try {
    const jobs = await Job.find({
      title: { $regex: title, $options: "i" },
    });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found with that title" });
    }

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createJob,
  updateJob,
  deleteJob,
  JobList,
  JobDetails,
  searchJobsByTitle,
};
