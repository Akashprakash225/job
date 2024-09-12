const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fplaceholder_1465438&psig=AOvVaw0IAANn76xK08KFiyYs8xhF&ust=1725866085639000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCO2KzmsogDFQAAAAAdAAAAABAE",
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  experienceRequired: {
    type: String,
    required: true,
    default: 0,
  },
  salaryRange: {
    type: String,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
  },
});
const Job = mongoose.model("Job", jobSchema);
module.exports = { Job };
