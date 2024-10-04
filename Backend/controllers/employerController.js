const { employer, Employer } = require("../models/employerModel");
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
    let companyLogoUrl = null;
    if (!companyName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required" });
    }
    const isEmployerExist = await Employer.findOne({ email });
    if (isEmployerExist) {
      return res.status(400).json({ message: "Employer Already exist" });
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    if (req.files) {
      if (req.files.companyLogo) {
        companyLogoUrl = await handleImageUpload(req.files.companyLogo[0].path);
      }
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
    });
    await newEmployer.save();

    const token = generateToken(newEmployer._id, "employer");
    res.cookie("token", token);
    res.json({ success: true, message: "Employer created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const employerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const employerExist = await Employer.findOne({ email });
    if (!employerExist) {
      return res
        .status(404)
        .json({ success: false, message: "employer dosnot exist" });
    }
    const passwordMatch = bcrypt.compareSync(password, employerExist.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Employer not autherized" });
    }
    const token = generateToken(employerExist._id, "employer");
    res.cookie("token", token);
    res.json({ success: true, message: "Employer logined successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const employerLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Employer Logout Successfull", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const employerProfile = async (req, res, next) => {
  try {
    const employer = req.user;

    const employerData = await Employer.findOne({ _id: employer.id });
    res.status(200).json({
      success: true,
      message: "Employer data fetched",
      data: employerData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
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
    res.status(200).json({ success: true, message: "Employer data fetched" });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const employerUpdate = async (req, res, next) => {
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
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
const companyList = async (req, res, next) => {
  try {
    const employer = await Employer.find().populate(
      "jobsPosted.jobId",
      "companyName"
    );
    if (!employer.length) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({
      success: true,
      data: employer,
    });
  } catch (error) {
    return next(error);
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
};
