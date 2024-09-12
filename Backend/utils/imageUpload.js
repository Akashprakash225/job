const { cloudinaryInstance } = require("../config/cloudinaryConfig");

const handleImageUpload = async (path, chunk_size = null) => {
  try {
    const options = {
      resource_type: "raw",
    };

    if (chunk_size) {
      options.chunk_size = chunk_size;
    }

    const uploadResult = await cloudinaryInstance.uploader.upload(
      path,
      options
    );

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Upload failed");
  }
};

module.exports = { handleImageUpload };
