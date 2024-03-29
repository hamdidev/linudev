import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const userRouter = express.Router();

userRouter.put("/update/:userId", verifyToken, updateUser);
userRouter.delete("/delete/:userId", verifyToken, deleteUser);
userRouter.get("/get-users", verifyToken, getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/signout", signout);

export default userRouter;
