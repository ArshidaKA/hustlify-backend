// controllers/blogController.js
import Blog from '../model/blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, quote } = req.body; // ✅ include quote
    const image = req.file?.path || "";

    const newBlog = new Blog({ title, content, quote, image }); // ✅ include quote
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Blog creation failed", error });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};
