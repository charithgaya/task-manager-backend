import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    // get token from the header
    const authHeader = req.headers.authorization;

    // console.log("AUTH HEADER: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      // 401 Unauthorized
      return res.status(401).json({ message: "Not authorized, please login!" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user details from the token ----> exclude password
    const user = await User.findById(decoded.id).select("-password");

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
      // return;
    }
    // getTasks(decoded.id);

    // set user details in the request object
    req.user = user;

    next();

  } catch (error) {
    // 401 Unauthorized
    return res.status(401).json({ message: "Not authorized, token failed!" });
  }
});

// admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {

    // if user is admin, move to the next middleware/controller
    next();
    return;
  }
  // if not admin, send 403 Forbidden --> terminate the request
  return res.status(403).json({ message: "Only admins can do this!" });
});

export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.user.role === "creator") ||
    (req.user && req.user.role === "admin")
  ) {
    
    // if user is creator, move to the next middleware/controller
    next();
    return;
  }
  // if not creator, send 403 Forbidden --> terminate the request
  return res.status(403).json({ message: "Only creators can do this!" });
});

// verified middleware
export const verifiedMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    // if user is verified, move to the next middleware/controller
    next();
    return;
  }
  // if not verified, send 403 Forbidden --> terminate the request
  return res.status(403).json({ message: "Please verify your email address!" });
});
