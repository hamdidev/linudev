import express from "express";
import {
  create,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);
postRouter.get("/getposts", getPosts);
postRouter.delete("/delete-post/:postId/:userId", verifyToken, deletePost);
postRouter.put("/update-post/:postId/:userId", verifyToken, updatePost);

export default postRouter;
