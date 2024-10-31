import jwt from "jsonwebtoken";
import User from "../models/User-model.js";
import createError from "./auth-create-error.js";

const protect =
  (allowedRoles = []) =>
  async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(createError(401, "Authorization token missing"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user and check existence
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return next(createError(401, "User not found"));
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return next(
          createError(403, "Access forbidden: insufficient permissions")
        );
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        next(createError(401, "Token expired, please log in again"));
      } else if (error.name === "JsonWebTokenError") {
        next(createError(401, "Token invalid, authorization failed"));
      } else {
        next(createError(500, "Internal server error"));
      }
    }
  };

export default protect;
