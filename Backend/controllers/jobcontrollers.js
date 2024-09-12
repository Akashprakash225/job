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
    } = req.body;
    let companyLogoUrl;
    if (
      !title ||
      !company ||
      !location ||
      !jobType ||
      !requirements ||
      !experienceRequired ||
      !salaryRange ||
      !applicationDeadline
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const isJobExist = await Job.findOne({ title });
    if (isJobExist) {
      return res.status(400).json({ message: "Job already exist" });
    }
    if (req.file) {
      companyLogoUrl = await handleImageUpload(req.file.path);
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
      companyLogo: companyLogoUrl && companyLogoUrl,
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
      companyLogo,
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
        companyLogo,
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
module.exports = { createJob, updateJob, deleteJob };
