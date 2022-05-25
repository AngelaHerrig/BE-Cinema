import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET, async (error, payload) => {
      // const user = await User.findById(payload.uid);
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
  /////
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

  ////

  // const token = req.headers.authorization;

  // if (!token) {
  //   return res.status(403).send("Admins only");
  // }

  // try {
  //   const pureTokenArr = token.split(" ");
  //   const pureToken = pureTokenArr[1];

  //   jwt.verify(pureToken, process.env.SECRET, async (error, payload) => {
  //     if (error) {
  //       res.status(400).send({ error: error.message });
  //       return;
  //     }
  //     const user = await User.findById(payload.uid);

  //     if (user.status !== "admin") {
  //       return res.status(403).send("Admins only");
  //     }
  //     next();
  //   });
  // } catch (error) {
  //   next({
  //     status: 401,
  //     message: "Access denied",
  //     originalError: error,
  //   });
  // }
}
