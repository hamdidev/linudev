import express from "express";
import {
  createComment,
  getPostComment,
  likeComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/get-post-comments/:postId", getPostComment);
commentRouter.put("/like-comment/:commentId", verifyToken, likeComment);

export default commentRouter;
