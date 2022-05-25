import mongoose from "mongoose";

const required = true;
const unique = true;
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required, unique },
  password: { type: String, required },
  status: { type: String, default: "user" },
  bookings: { type: [Schema.Types.ObjectId], ref: "movie" },
});

const User = model("user", userSchema);

export default User;
