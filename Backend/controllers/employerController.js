const mongoose = require("mongoose");
const { Employer } = require("../models/employerModel");
const { Job } = require("../models/jobModels");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { handleImageUpload } = require("../utils/imageUpload");

const employerSignup = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      phone,
      companyLogo,
      companyWebsite,
      jobsPosted,
      location,
      description,
    } = req.body;

    if (!companyName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }
    const isEmployerExist = await Employer.findOne({ email });
    if (isEmployerExist) {
      return res.status(400).json({ message: "Employer Already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let companyLogoUrl = null;
    if (req.files && req.files.companyLogo) {
      companyLogoUrl = await handleImageUpload(req.files.companyLogo[0].path);
    }

    const newEmployer = new Employer({
      companyName,
      email,
      password: hashedPassword,
      phone,
      companyLogo: companyLogoUrl,
      location,
      description,
      companyWebsite,
      jobsPosted: [],
    });

    await newEmployer.save();

    const token = generateToken(newEmployer._id, "employer");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res
      .status(201)
      .json({ success: true, message: "Employer created successfully" });
  } catch (error) {
    console.error("Error during employer signup:", error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const employerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    const employerExist = await Employer.findOne({ email });
    if (!employerExist) {
      return res
        .status(404)
        .json({ success: false, message: "Employer does not exist" });
    }
    const passwordMatch = bcrypt.compareSync(password, employerExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(employerExist._id, "employer");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.json({ success: true, message: "Employer logged in successfully" });
  } catch (error) {
    console.error("Error during employer login:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const employerLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.json({ message: "Employer logged out successfully", success: true });
  } catch (error) {
    console.error("Error during employer logout:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const employerProfile = async (req, res) => {
  try {
    const employer = req.user;

    const employerData = await Employer.findById(employer.id).select(
      "-password"
    );
    if (!employerData) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employer data fetched",
      data: employerData,
    });
  } catch (error) {
    console.error("Error fetching employer profile:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const checkEmployer = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Employer unauthorized" });
    }
    res.status(200).json({ success: true, message: "Employer authorized" });
  } catch (error) {
    console.error("Error checking employer authorization:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const employerUpdate = async (req, res) => {
  try {
    const { id: employerId } = req.user;
    const { companyName, email, phone, companyWebsite, location, description } =
      req.body;
    const companyLogo = req.file;

    if (!employerId) {
      return res
        .status(400)
        .json({ success: false, message: "Employer ID is required" });
    }

    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res
        .status(404)
        .json({ success: false, message: "Employer not found" });
    }

    if (companyName) employer.companyName = companyName;
    if (email) employer.email = email;
    if (phone) employer.phone = phone;
    if (companyWebsite) employer.companyWebsite = companyWebsite;
    if (location) employer.location = location;
    if (description) employer.description = description;

    if (companyLogo) {
      const companyLogoUrl = await handleImageUpload(companyLogo.path);
      employer.companyLogo = companyLogoUrl;
    }

    await employer.save();

    res.status(200).json({
      success: true,
      message: "Employer updated successfully",
      data: employer,
    });
  } catch (error) {
    console.error("Error updating employer profile:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const companyList = async (req, res) => {
  try {
    const employers = await Employer.find().populate(
      "jobsPosted.jobId",
      "title companyName"
    );

    if (!employers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No employers found" });
    }

    res.status(200).json({
      success: true,
      data: employers,
    });
  } catch (error) {
    console.error("Error fetching company list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getEmployerJobs = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);
    const employerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employer ID" });
    }

    const jobs = await Job.find({ employer: employerId })
      .populate("employer", "companyName companyLogo companyWebsite")
      .sort({ postedDate: -1 });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching employer's jobs:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  employerSignup,
  employerLogin,
  employerLogout,
  employerProfile,
  checkEmployer,
  employerUpdate,
  companyList,
  getEmployerJobs,
};
