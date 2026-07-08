import bcrypt from "bcrypt";
import User from "../models/User.js";
import {
 generateAccessToken,
 generateRefreshToken
} from "../utils/generateToken.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;


    // Check existing user
    const existingUser = await User.findOne({ email });


    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);


    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });


    // Remove password before sending response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };


    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: userResponse,
      },
    });


  } catch (error) {

    console.error("Register Error:", error);


    res.status(500).json({
      success: false,
      message: "Something went wrong while creating account",
    });

  }
};
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;


    // Find user
    const user = await User.findOne({ email });


    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    }


    // Check account status

    if (!user.isActive) {

      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });

    }



    // Compare password

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    }



    // Update last login

    user.lastLogin = new Date();

    await user.save();



    // Generate token

   const accessToken = generateAccessToken(user);

const refreshToken = generateRefreshToken(user);
user.refreshToken = refreshToken;

await user.save();


    // Safe user data

    const userResponse = {

      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,

    };



   res.status(200).json({

  success: true,

  message: "Login successful",

  data: {

    tokens: {
      accessToken,
      refreshToken,
    },

    user: userResponse,

  },

});



  } catch (error) {

    console.error("Login Error:", error.message);

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

}

};