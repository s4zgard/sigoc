import jwt from "jsonwebtoken";

const tokenGen = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "dev",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default tokenGen;
