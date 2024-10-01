const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

// custom middleware -> manipulating req
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token Not Verified" });
  }

  // Assuming Bearer <jwttoken>, remove "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim(); //remove bearer and extra space after that

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); // if secret key and jwttoken is matched, you get the user data

    // select is used because you dont want password then give 0
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);

    // get the data through token as we cant access the frontend from here
    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized HTTP" });
  }
};

module.exports = authMiddleware;
