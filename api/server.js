import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/user.route.js";
import shopRoutes from "./routes/shop.route.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGO DB CONNECTED"));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running on PORT:", PORT));
