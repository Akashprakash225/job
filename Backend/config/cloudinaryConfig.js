const { v2 } = require("cloudinary");

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
});
const cloudinaryInstance = v2;
module.exports = { cloudinaryInstance };
