// import express from "express";
// import multer from "multer";
// import Image from "../models/Image.js";

// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 1024 * 1024 },
//   imagename: Date.now(),
// });

// const imageRouter = express.Router();

// const handleUpload = upload.fields([{ name: "selectedImage", maxCount: 1 }]);

// imageRouter.post("/", handleUpload, async (req, res) => {
//   try {
//     await Image.create({
//       ...req.files.selectedImage[0],
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     console.log(error);
//     return;
//   }
//   res.json({ success: true });
// });

// export default imageRouter;
