import express from "express";
import {
  createParking,
  getAllParking,
  getParking,
  updateParking,
  deleteParking,
  getAllOwnedParking,
} from "../controller/parkingController.js";
const parkingRouter = express.Router();

parkingRouter
  .route("/")
  .get(getAllParking)
  .post(createParking)
parkingRouter.get("/:id", getParking);
parkingRouter.get("/owned/:id", getAllOwnedParking);
parkingRouter.patch("/:id", updateParking);
parkingRouter.delete("/:id", deleteParking);

export default parkingRouter;
