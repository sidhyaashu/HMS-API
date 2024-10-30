import expressAsyncHandler from "express-async-handler";
import User from "../models/User-model.js";
import generateToken from "../config/generate-token-config.js";

class UserController {
  static register = expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required!",
        });
      }

      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(409).json({
          message: "Email Already Exists",
        });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        return res.status(201).json({
          message: "User Registered Succesfully",
          id: user._id,
          name: user.name,
          token: generateToken(user._id),
        });
      } else {
        return res.status(400).json({
          message: "User registered Faild!",
        });
      }
    } catch (error) {
      console.error("Error in user register", error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  static login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required!",
      });
    }

    try {
      // Use findOne to directly get the user object
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "User Not Found!",
        });
      }

      // Use the matchPassword method of the user instance
      const isPasswordMatch = await user.matchPassword(password);

      if (!isPasswordMatch) {
        return res.status(401).json({
          message: "Invalid Login Information",
        });
      }

      // Successful login response
      return res.status(200).json({
        id: user._id,
        name: user.name,
        token: generateToken(user._id),
        message:"Login Succesfull"
      });
    } catch (error) {
      console.error("Error in logging in user:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
}

export default UserController;
