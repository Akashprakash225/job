const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
  },
  jobsPosted: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
      },
      postedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  companyLogo: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Employer = mongoose.model("Employer", employerSchema);
module.exports = { Employer };
