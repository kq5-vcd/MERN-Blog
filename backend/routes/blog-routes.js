import express from "express";
import { getAllBlogsAdmin, getAllBlogs, addBlog, updateBlog, getById, getByUserId, getByUserIdAdmin, deleteById } from "../controllers/blog-controller";

const blogRouter = express.Router()

blogRouter.get("/", getAllBlogsAdmin)
blogRouter.get("/:id", getById)
blogRouter.get("/user/:id", getByUserIdAdmin)
blogRouter.get("/:userId/all", getAllBlogs)
blogRouter.get("/:userId/user/:id", getByUserId)
blogRouter.post("/:userId", addBlog)
blogRouter.put("/:id", updateBlog)
blogRouter.delete("/:id", deleteById)

export default blogRouter