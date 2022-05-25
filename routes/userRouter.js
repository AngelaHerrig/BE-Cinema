import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import userValidators from "../validators/userValidators.js";
import { compare, hash } from "../libs/crypto.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next({
      status: 500,
      message: "Server error",
      originalError: error,
    });
  }
});

userRouter.post("/register", userValidators, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((e) => e.msg),
    });
  }
  try {
    req.body.password = await hash(req.body.password);
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next({
      status: 400,
      message: error.message,
      originalError: error,
    });
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const loginSuccess = await compare(req.body.password, user.password);

    if (!loginSuccess) {
      throw Error("Password not correct");
    }
    const token = jwt.sign({ uid: user._id }, process.env.SECRET);
    res.send({ user, token });
  } catch (error) {
    next({ status: 400, message: "Login failed", originalError: error });
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next("User not found!!");
    }
    res.send({ deleted: true });
  } catch (error) {
    next();
  }
});

export default userRouter;
