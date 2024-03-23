import express from "express";
import { createUser,updateUser } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.patch("/:publickey", updateUser);

export default userRouter;
