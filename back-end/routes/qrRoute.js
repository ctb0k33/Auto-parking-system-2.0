import express from "express";
import { createOneTimeQR, checkQR } from "../controller/qrController.js";
const qrRouter = express.Router();

qrRouter.post("/", createOneTimeQR);
qrRouter.post("/check", checkQR);

export default qrRouter;