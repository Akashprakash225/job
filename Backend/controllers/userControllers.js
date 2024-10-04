const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { cloudinaryInstance } = require("../config/cloudinaryConfig");
const { handleImageUpload } = require("../utils/imageUpload");
const userSignup = async (req, res) => {
  try {
    const { name, email, password, phone, experience, resume, profilePic } =
      req.body;
    let profilePicUrl = null;
    let resumeUrl = null;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User Already exist" });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if (req.files) {
      if (req.files.profilePic) {
        profilePicUrl = await handleImageUpload(req.files.profilePic[0].path);
      }
      if (req.files.resume) {
        resumeUrl = await handleImageUpload(req.files.resume[0].path);
      }
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      experience,
      resume: resumeUrl,
      profilePic: profilePicUrl,
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "user dosnot exist" });
    }
    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User not autherized" });
    }
    const token = generateToken(userExist._id);
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({ success: true, message: "User logined successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({ message: "User Logout Successfull", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const userProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const userData = await User.findOne({ _id: user.id });
    res
      .status(200)
      .json({ success: true, message: "User data fetched", data: userData });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const checkUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user  autherized" });
    }

    res.status(200).json({ success: true, message: "User data fetched" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const userUpdate = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { name, email, phone, experience } = req.body;
    const profilePic = req.file;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (experience) user.experience = experience;

    if (profilePic) {
      const profilePicUrl = await handleImageUpload(profilePic.path);
      user.profilePic = profilePicUrl;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userProfile,
  checkUser,
  userUpdate,
};
