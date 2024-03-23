import UserModel from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createUser = catchAsync(async (req, res, next) => { 
    const { publickey } = req.body;
    let data = {
      publickey: publickey,
    };
    await UserModel.create(data);
    res.status(200).json({
        status: 'success', 
        data: {
            data: data
        }
    });
})

export const updateUser = catchAsync(async (req, res, next) => {
    const { publickey } = req.params;
    const { balance } = req.body;
    let user = await UserModel.findOne({    
        publickey: publickey
    }); 
    if (!user) {
        return new AppError("User not found", 404);
    }
    await UserModel.findOneAndUpdate(
        { publickey: publickey },
        { $inc: { balance: balance } }
    );
    res.status(200).json({
        status: 'success',
        data: {
            data: user
        }
    });
})
