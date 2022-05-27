import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, async (error, payload) => {
      req.userId = payload.uid;

      next();
    });
  } catch (error) {
    next({
      status: 401,
      message: "Access denied",
      originalError: error,
    });
  }
}

export async function checkAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(payload.uid);
    if (user.status !== "admin") {
      return res.status(403).send("Admins only");
    }
    next();
  } catch (error) {
    next({
      status: 401,
      message: "Access denied",
      originalError: error,
    });
  }
}
