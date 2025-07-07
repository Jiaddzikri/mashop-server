import express from "express";
import { postImageController } from "../../controllers/ImageController.js";
import multer from "multer";

const imageRoutes = express.Router();
const upload = multer({ dest: "public/uploads", preservePath: true }); // Set the destination for uploaded files

imageRoutes.post("/", upload.array("images"), postImageController);

export default imageRoutes;
