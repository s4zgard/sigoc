import express from "express";
import {
  getall,
  login,
  logout,
  remove,
  signup,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", protect, admin, signup);
router.get("/all", protect, admin, getall);
router.get("/delete/:userId", protect, admin, remove);
router.get("/logout", logout);

export default router;
