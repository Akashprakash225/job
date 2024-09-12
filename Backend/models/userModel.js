const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true,
  },
  phone: String,
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  resume: {
    type: String,
  },
  appliedJobs: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
      appliedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  profilePic: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
