import express from "express";
import { checkAuth, checkAdmin } from "../middleware/checkAuth.js";
import Movie from "../models/Movie.js";

const movieRouter = express();

movieRouter.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    next({
      status: 500,
      message: "Server error",
      originalError: error,
    });
  }
});

movieRouter.get("/:id", async (req, res, next) => {
  try {
    const movies = await Movie.findById({ _id: req.params.id });
    res.send(movies);
  } catch (error) {
    next({
      status: 500,
      message: "Server error",
      originalError: error,
    });
  }
});

movieRouter.post("/admin", checkAdmin, async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    const movieAsJson = movie.toJSON();
    delete movieAsJson.__v;
    res.send(movieAsJson);
  } catch (error) {
    next({ status: 400, message: error.message, originalError: error });
  }
});

movieRouter.put("/admin/:id", checkAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndUpdate(id, req.body);
    if (!movie) {
      return next("Movie not found!");
    }
    res.send(movie);
  } catch (error) {
    next({ status: 400, message: error.message, originalError: error });
  }
});

movieRouter.post("/booking", checkAuth, async (req, res, next) => {
  try {
    const movie = req.body.movieName;
    const selectMovie = await Movie.findOne({ movieName: movie });
    const selectedDay = req.body.day;
    selectMovie.shows[selectedDay].seats =
      selectMovie.shows[selectedDay].seats - req.body.seats;
    selectMovie.shows[selectedDay].bookings.push(req.userId);
    selectMovie.save();
    res.send(req.body);
  } catch (error) {
    next({ status: 400, message: error.message, originalError: error });
  }
});

movieRouter.delete("/admin/:id", checkAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return next("Movie not found!!");
    }
    res.send({ deleted: true });
  } catch (error) {
    next({ status: 400, message: error.message, originalError: error });
  }
});

export default movieRouter;
