const express = require("express");
const {
  applyForJob,
  getUserApplications,
  getApplicationById,
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

router.get("/applications/:applicationId", userAuth, getApplicationById);
module.exports = { applicationRouter: router };
