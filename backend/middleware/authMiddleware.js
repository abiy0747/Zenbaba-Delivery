import jwt from "jsonwebtoken";
import User from "../models/User.js";


const protect = async (req, res, next) => {

  try {

    let token;


    // Get token from Authorization header

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

    }


    // No token

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });

    }


    // Verify token

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // Find user

   const user = await User.findById(decoded.id)
  .select("-password -refreshToken -__v");


    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    }


    // Attach user information

    req.user = user;


    next();


  } catch (error) {


    console.error("Auth Error:", error.message);


    return res.status(401).json({

      success: false,

      message: "Invalid or expired token",

    });

  }

};


export default protect;