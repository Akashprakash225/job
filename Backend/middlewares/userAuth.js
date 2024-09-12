const Jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "User NOt Autherized" });
    }
    const tokenVerified = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!tokenVerified) {
      res.status(401).json({ message: "user not autherized" });
    }
    req.user = tokenVerified;

    next();
  } catch (error) {
    console.log(error);
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
module.exports = { userAuth };
