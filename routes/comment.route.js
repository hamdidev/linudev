import express from "express";
import {
  createComment,
  getPostComment,
  likeComment,
  editComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/get-post-comments/:postId", getPostComment);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);
commentRouter.put("/edit-comment/:commentId", verifyToken, editComment);
commentRouter.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default commentRouter;
