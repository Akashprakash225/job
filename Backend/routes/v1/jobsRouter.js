const express = require("express");
const {
  createJob,
  updateJob,
  deleteJob,
  JobList,
  JobDetails,
} = require("../../controllers/jobcontrollers");
const { upload } = require("../../middlewares/multer");
const router = express.Router();
const { employerAuth } = require("../../middlewares/employerAuth");

router.post("/create", employerAuth, upload.single("jobImage"), createJob);
router.get("/details/:jobId", JobDetails);
router.put(
  "/update/:jobId",
  employerAuth,
  upload.single("jobImage"),
  updateJob
);
router.delete("/delete/:jobId", employerAuth, deleteJob);
router.get("/jobList", JobList);

module.exports = { jobsRouter: router };
