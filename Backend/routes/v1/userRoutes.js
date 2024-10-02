const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
  userProfile,
  checkUser,
  userUpdate,
} = require("../../controllers/userControllers");
const { userAuth } = require("../../middlewares/userAuth");
const { upload } = require("../../middlewares/multer");
const router = express.Router();

router.post(
  "/signup",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  userSignup
);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", userAuth, userProfile);
router.put("/update", userAuth, upload.single("profilePic"), userUpdate);
router.delete("/delete");

router.get("/userList");
router.get("/check-user", userAuth, checkUser);

module.exports = { userRouter: router };
