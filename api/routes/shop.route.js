import express from "express";
import {
  create,
  getById,
  getall,
  remove,
  update,
} from "../controllers/shop.controller.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);
router.get("/delete/:shopId", protect, admin, remove);
router.put("/edit/:shopId", protect, admin, update);
router.get("/show", protect, admin, getall);
router.get("/show/:shopId", protect, admin, getById);

export default router;
