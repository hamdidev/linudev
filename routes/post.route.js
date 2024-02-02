import express from "express";
import { create, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);
postRouter.get("/getposts", getPosts);

export default postRouter;
