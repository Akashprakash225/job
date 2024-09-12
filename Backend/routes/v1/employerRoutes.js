const express = require("express");
const {
  employerSignup,
  employerLogin,
  employerLogout,
  employerProfile,
  employerUpdate,
} = require("../../controllers/employerController");
const { employerAuth } = require("../../middlewares/employerAuth");
const router = express.Router();

router.post("/signup", employerSignup);
router.post("/login", employerLogin);
router.post("/logout", employerLogout);
router.get("/profile", employerAuth, employerProfile);
router.put("/update", employerAuth, employerUpdate);
router.delete("/delete");

router.get("/userList");
router.get("/check-user");

module.exports = { employerRouter: router };
