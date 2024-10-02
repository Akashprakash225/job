const express = require("express");
const { userAuth } = require("../../middlewares/userAuth");
const {
  addToSavedJob,
  getSavedJobs,
  removeSavedJob,
} = require("../../controllers/savedJobController");

const router = express.Router();

router.put("/add-to-savedjob", userAuth, addToSavedJob);

router.get("/", userAuth, getSavedJobs);

router.delete("/remove-savedjob/:jobId", userAuth, removeSavedJob);

module.exports = { savedJobRouter: router };
