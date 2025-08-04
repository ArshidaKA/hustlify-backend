import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blogController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/add", upload.single("image"), createBlog); // 'image' is the field name
router.get("/", getAllBlogs);

export default router;
