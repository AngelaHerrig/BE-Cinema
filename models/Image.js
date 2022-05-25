import mongoose from "mongoose";

const required = true;

const imageSchema = new mongoose.Schema(
  {
    imagename: { required, type: String },
    path: { required, type: String },
  },
  { timestamps: true }
);

const Image = mongoose.model("image", imageSchema);

export default Image;
