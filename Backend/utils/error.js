const handleError = async (error, req, res, next) => {
  try {
    const statusCode = error.statusCode || 500;
    const message = error.message || "something went wrong , please try again";
    return res.status(statusCode).json({ message });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
module.exports = { handleError };
