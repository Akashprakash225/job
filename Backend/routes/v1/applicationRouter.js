const express = require("express");
const {
  applyForJob,
  getUserApplications,
  getApplicationById,
  deleteApplication,
  getApplicantsByJobId,
} = require("../../controllers/applicationController");
const { userAuth } = require("../../middlewares/userAuth");
const { upload } = require("../../middlewares/multer");

const router = express.Router();

router.post(
  "/jobs/:jobId/apply",
  userAuth,
  upload.single("resume"),
  applyForJob
);

router.get("/applications", userAuth, getUserApplications);
router.delete("/applications/:applicationId", userAuth, deleteApplication);

router.get("/applications/:applicationId", userAuth, getApplicationById);
router.get("/application/:jobId/applicants", userAuth, getApplicantsByJobId);
module.exports = { applicationRouter: router };
