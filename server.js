import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./libs/database.js";
import requestLogger from "./middleware/requestLogger.js";
import userRouter from "./routes/userRouter.js";
import movieRouter from "./routes/movieRouter.js";
// import imageRouter from "./routes/imageRouter.js";

dotenv.config();
await connect();

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use("/users", userRouter);
app.use("/movies", movieRouter);

app.use((req, res, next) =>
  next({ status: 404, message: "Resource not found" })
);

app.use((err, req, res, next) => {
  console.log("GE ", err);
  res
    .status(err.status || 500)
    .send({ error: err.message || "Something went wrong" });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on http://localhost:" + process.env.PORT);
});
