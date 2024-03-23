import ParkingModel from "../models/Parking.js";
import { catchAsync } from "../utils/catchAsync.js";
import { createOne, deleteOne, getAllDoc, getOne, updateOne } from './handlerFactory.js';

export const getAllParking = getAllDoc(ParkingModel);
export const getParking = getOne(ParkingModel);
export const createParking = createOne(ParkingModel);
export const updateParking = updateOne(ParkingModel);
export const deleteParking = deleteOne(ParkingModel);

export const getAllOwnedParking = catchAsync(async (req, res, next) => {
  const parking = await ParkingModel.find({ ownerPublicKey: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      data: parking,
    },
  });
});
