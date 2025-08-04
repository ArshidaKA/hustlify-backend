import Blog from '../model/blog.js';

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, quote } = req.body;
    const image = req.file?.path || "";

    const newBlog = new Blog({ title, content, quote, image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Blog creation failed", error });
  }
};

// Get All Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};

// ✅ Get Blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog", error });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, quote } = req.body;
    const image = req.file?.path;

    const updatedFields = { title, content, quote };
    if (image) updatedFields.image = image;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Blog update failed", error });
  }
};

// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};
