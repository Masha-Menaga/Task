const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;
  console.log(token);
  if (!token) {
    console.log("Token not Found");
    return res.status(401).json({ message: "Unauthorized access!" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY || "defaultsecret"
    );
    console.log("decodede found");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

module.exports = verifyToken;
