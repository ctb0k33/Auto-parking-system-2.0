import ParkingModel from "../models/Parking.js";
import { catchAsync } from "../utils/catchAsync.js";
export const createParking = catchAsync(
    async(req,res,next)=>{
        const newParking = await ParkingModel.create()
    }
)