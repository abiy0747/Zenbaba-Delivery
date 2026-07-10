const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the logged-in user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission.",
      });
    }

    next();
  };
};

export default authorize;