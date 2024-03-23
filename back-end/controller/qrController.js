import OnetimeQrModel from "../models/OnetimeQr.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import UserModel from "../models/User.js";
import { checkVehicleType, calculateFee } from "../utils/fee.js";

export const createOneTimeQR = catchAsync(async (req, res) => {
  const { publicKey, licensePlate, carProperty } = req.body;
  let data = {
    enterTime: new Date(),
    publicKey: publicKey,
    licensePlate: licensePlate,
    carProperty: carProperty,
  };
  await OnetimeQrModel.create(data);
  res.satatus(200).json({
    status: "success",
    data: {
      data: data,
    },
  });
});

export const checkQR = catchAsync(async (req, res, next) => {
  const { publicKey, licensePlate, carProperty } = req.params;
  let qr = await OnetimeQrModel.findOne({
    licensePlate: licensePlate,
    carProperty: carProperty,
    publicKey: publicKey,
  });
  if (!qr) {
    return new AppError("QR not found", 404);
  }
  // delete one time QR code
  await OnetimeQrModel.deleteOne({
    licensePlate: licensePlate,
    carProperty: carProperty,
    publicKey: publicKey,
  });
  // fee
  const fee = calculateFee(checkVehicleType(licensePlate));
  // charge user
  await UserModel.findOneAndUpdate(
    { publickey: publicKey },
    { $inc: { balance: -fee } }
  );
  res.status(200).json({
    fee: fee,
    status: "success",
  });
});
