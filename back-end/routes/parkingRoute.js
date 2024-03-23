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
  .patch(updateParking)
  .delete(deleteParking);
parkingRouter.get("/:id", getParking);
parkingRouter.get("/owned/:id", getAllOwnedParking);

export default parkingRouter;
