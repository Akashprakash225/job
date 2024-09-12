const express = require("express");
const {
  createJob,
  updateJob,
  deleteJob,
} = require("../../controllers/jobcontrollers");
const { upload } = require("../../middlewares/multer");
const router = express.Router();
const { employerAuth } = require("../../middlewares/employerAuth");

router.post("/create", employerAuth, upload.single("companyLogo"), createJob);
router.put(
  "/update/:jobId",
  employerAuth,
  upload.single("companyLogo"),
  updateJob
);
router.delete("/delete/:jobId", employerAuth, deleteJob);

module.exports = { jobsRouter: router };
