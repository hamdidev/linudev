import express from "express";
import { create } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);

export default postRouter;
