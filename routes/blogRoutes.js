import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Setup cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
