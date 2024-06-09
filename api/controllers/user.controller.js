import User from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import tokenGen from "../utils/tokenGen.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const salted = bcrypt.hashSync(password, 10);
  const user = await User.create({ email, name, password: salted });

  if (user) {
    res.status(200).json({
      Message: `${user.name} registered as user.`,
    });
  } else {
    res.status(500);
    throw new Error("User creation failed");
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email / password.");
  }
  const correct = bcrypt.compareSync(password, user.password);
  if (correct) {
    tokenGen(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email / password.");
  }
});

export const getall = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

export const remove = asyncHandler(async (req, res, next) => {
  const checkUser = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json(checkUser._id);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("jwt").status(200).json("Sign out successfull");
});
