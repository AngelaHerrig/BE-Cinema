import mongoose from "mongoose";

const { Schema, model } = mongoose;

const required = true;
const daysSchema = new Schema({
  room: { type: String },
  date: { type: String },
  time: { type: String },
  seats: { type: Number },
  bookings: [{ type: Schema.Types.ObjectId, ref: "user" }],
});
const scheduleSchema = new Schema({
  monday: {
    type: daysSchema,
  },
  tuesday: {
    type: daysSchema,
  },
  wednesday: {
    type: daysSchema,
  },
  thursday: {
    type: daysSchema,
  },
  friday: {
    type: daysSchema,
  },
  saturday: {
    type: daysSchema,
  },
  sunday: {
    type: daysSchema,
  },
});

const movieSchema = new Schema({
  movieName: { required, type: String, unique: true },
  image: {
    type: String,
    default: () => {
      const size = Math.round(Math.random() * 400 + 100);
      return `http://placekitten.com/${size}/${size}`;
    },
  },
  length: { required, type: Number },
  genre: { required, type: String },
  shows: { type: scheduleSchema },
});

const Movie = model("movie", movieSchema);

export default Movie;
