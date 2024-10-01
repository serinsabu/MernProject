const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user.isAdmin);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied, User is not an admin" });
    }
    next(); // if admin role == true goes to next function
  } catch {
    next(error);
  }
};

module.exports = adminMiddleware;
