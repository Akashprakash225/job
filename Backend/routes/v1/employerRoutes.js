const express = require("express");
const { upload } = require("../../middlewares/multer");
const {
  employerSignup,
  employerLogin,
  employerLogout,
  employerProfile,
  employerUpdate,
  checkEmployer,
  companyList,
  getEmployerJobs,
} = require("../../controllers/employerController");
const { employerAuth } = require("../../middlewares/employerAuth");
const router = express.Router();

router.post(
  "/signup",
  upload.fields([{ name: "companyLogo", maxCount: 1 }]),
  employerSignup
);
router.post("/login", employerLogin);
router.post("/logout", employerLogout);
router.get("/profile", employerAuth, employerProfile);
router.put(
  "/update",
  employerAuth,
  upload.single("companyLogo"),
  employerUpdate
);
router.delete("/delete");

router.get("/userList");
router.get("/check-employer", employerAuth, checkEmployer);
router.get("/companyList", companyList);
router.get("/jobs", employerAuth, getEmployerJobs);

module.exports = { employerRouter: router };
