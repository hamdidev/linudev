import express from "express";
import {
  createComment,
  getPostComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/get-post-comments/:postId", getPostComment);

export default commentRouter;
